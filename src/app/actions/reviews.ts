'use server';

import { prisma } from '@/lib/database';
import { getCurrentUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export interface ReviewEligibilityResult {
  eligible: boolean;
  isOwnProfile?: boolean;
  reason?: 'unauthenticated' | 'self' | 'no_contact' | 'not_found';
  existingReview?: {
    id: string;
    rating: number;
    comment: string | null;
  } | null;
}

export interface SaveReviewInput {
  professionalId: string;
  rating: number;
  comment?: string | null;
}

export interface ActionResponse {
  success: boolean;
  error?: string;
}

export interface ReviewItem {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  clientName: string;
  clientAvatar: string | null;
}

/**
 * Verifica a elegibilidade do usuário logado para avaliar o profissional.
 * Regra:
 * - Deve estar autenticado.
 * - Não pode avaliar a si mesmo (profissional visualizando o próprio perfil).
 * - Deve haver contato real prévio:
 *   1) Pedido de serviço/orçamento entre o cliente e o profissional, OU
 *   2) Conversa com pelo menos 1 mensagem enviada pelo cliente E 1 resposta do profissional.
 */
export async function checkReviewEligibility(
  professionalId: string
): Promise<ReviewEligibilityResult> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { eligible: false, reason: 'unauthenticated' };
    }

    const professional = await prisma.professional.findUnique({
      where: { id: professionalId },
      select: { id: true, userId: true },
    });

    if (!professional) {
      return { eligible: false, reason: 'not_found' };
    }

    if (currentUser.id === professional.userId) {
      return { eligible: false, isOwnProfile: true, reason: 'self' };
    }

    const client = await prisma.client.findUnique({
      where: { userId: currentUser.id },
      select: { id: true },
    });

    if (!client) {
      return { eligible: false, reason: 'no_contact' };
    }

    // 1. Checa se existe pedido entre cliente e profissional
    const order = await prisma.order.findFirst({
      where: {
        clientId: client.id,
        professionalId: professional.id,
      },
      select: { id: true },
    });

    let hasContact = Boolean(order);

    // 2. Se não houver pedido, checa conversa bidirecional (1 msg cliente + 1 msg profissional)
    if (!hasContact) {
      const chatRooms = await prisma.chatRoom.findMany({
        where: {
          order: {
            clientId: client.id,
            professionalId: professional.id,
          },
        },
        include: {
          messages: {
            select: { senderId: true, type: true },
          },
        },
      });

      hasContact = chatRooms.some((room) => {
        const hasClientMsg = room.messages.some(
          (m) => m.senderId === currentUser.id && m.type !== 'sistema'
        );
        const hasProMsg = room.messages.some(
          (m) => m.senderId === professional.userId && m.type !== 'sistema'
        );
        return hasClientMsg && hasProMsg;
      });
    }

    if (!hasContact) {
      return { eligible: false, reason: 'no_contact' };
    }

    // Busca avaliação existente para permitir edição
    const existing = await prisma.review.findUnique({
      where: {
        clientId_professionalId: {
          clientId: client.id,
          professionalId: professional.id,
        },
      },
      select: {
        id: true,
        rating: true,
        comment: true,
      },
    });

    return {
      eligible: true,
      existingReview: existing
        ? {
            id: existing.id,
            rating: existing.rating,
            comment: existing.comment,
          }
        : null,
    };
  } catch (error) {
    console.error('[checkReviewEligibility] Erro ao checar elegibilidade:', error);
    return { eligible: false, reason: 'no_contact' };
  }
}

/**
 * Cria ou atualiza a avaliação de um profissional por um cliente elegível.
 * Garante que:
 * - O usuário esteja autenticado.
 * - Não avalie a si mesmo.
 * - Haja contato real prévio (pedido ou conversa bidirecional).
 * - A nota seja um inteiro entre 1 e 5.
 * - Recalcula de forma atômica média e total de avaliações do profissional via agregação.
 */
export async function saveReviewAction(
  data: SaveReviewInput
): Promise<ActionResponse> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        error: 'Você precisa estar logado para avaliar um profissional.',
      };
    }

    const { professionalId, rating, comment } = data;

    if (!professionalId) {
      return { success: false, error: 'Identificador do profissional não informado.' };
    }

    const ratingNum = Math.round(Number(rating));
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return {
        success: false,
        error: 'A nota deve ser um valor inteiro entre 1 e 5 estrelas.',
      };
    }

    const professional = await prisma.professional.findUnique({
      where: { id: professionalId },
      select: { id: true, userId: true },
    });

    if (!professional) {
      return { success: false, error: 'Profissional não encontrado.' };
    }

    if (currentUser.id === professional.userId) {
      return {
        success: false,
        error: 'Você não pode avaliar seu próprio perfil.',
      };
    }

    // Garante que o usuário possua registro de client
    const client = await prisma.client.upsert({
      where: { userId: currentUser.id },
      create: { userId: currentUser.id },
      update: {},
    });

    // Validação estrita de contato prévio no servidor
    const order = await prisma.order.findFirst({
      where: {
        clientId: client.id,
        professionalId: professional.id,
      },
      select: { id: true },
    });

    let hasContact = Boolean(order);

    if (!hasContact) {
      const chatRooms = await prisma.chatRoom.findMany({
        where: {
          order: {
            clientId: client.id,
            professionalId: professional.id,
          },
        },
        include: {
          messages: {
            select: { senderId: true, type: true },
          },
        },
      });

      hasContact = chatRooms.some((room) => {
        const hasClientMsg = room.messages.some(
          (m) => m.senderId === currentUser.id && m.type !== 'sistema'
        );
        const hasProMsg = room.messages.some(
          (m) => m.senderId === professional.userId && m.type !== 'sistema'
        );
        return hasClientMsg && hasProMsg;
      });
    }

    if (!hasContact) {
      return {
        success: false,
        error:
          'Você precisa ter entrado em contato ou solicitado um orçamento com este profissional para avaliá-lo.',
      };
    }

    // Upsert atômico e recálculo das métricas em transação
    await prisma.$transaction(async (tx) => {
      await tx.review.upsert({
        where: {
          clientId_professionalId: {
            clientId: client.id,
            professionalId: professional.id,
          },
        },
        create: {
          clientId: client.id,
          professionalId: professional.id,
          rating: ratingNum,
          comment: comment?.trim() || null,
        },
        update: {
          rating: ratingNum,
          comment: comment?.trim() || null,
        },
      });

      // Recalcular métricas do profissional via agregação
      const agg = await tx.review.aggregate({
        where: { professionalId: professional.id },
        _avg: { rating: true },
        _count: { rating: true },
      });

      const avgRating = agg._avg.rating
        ? Number(agg._avg.rating.toFixed(2))
        : 0;
      const totalReviews = agg._count.rating || 0;

      await tx.professional.update({
        where: { id: professional.id },
        data: {
          rating: avgRating,
          reviewCount: totalReviews,
        },
      });
    });

    // Revalidar rotas afetadas
    revalidatePath('/perfil-profissional');
    revalidatePath('/buscas');
    revalidatePath('/');
    revalidatePath('/cliente/pedidos');

    return { success: true };
  } catch (error: any) {
    console.error('[saveReviewAction] Erro ao salvar avaliação:', error);
    return {
      success: false,
      error: error.message || 'Erro interno ao salvar avaliação.',
    };
  }
}

/**
 * Retorna as avaliações recebidas por um profissional para exibição no perfil.
 */
export async function getProfessionalReviews(
  professionalId: string
): Promise<ReviewItem[]> {
  try {
    const reviews = await prisma.review.findMany({
      where: { professionalId },
      include: {
        client: {
          include: {
            user: {
              select: {
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt.toISOString(),
      clientName: r.client.user.name,
      clientAvatar: r.client.user.avatarUrl,
    }));
  } catch (error) {
    console.error('[getProfessionalReviews] Erro ao carregar avaliações:', error);
    return [];
  }
}
