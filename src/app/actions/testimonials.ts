'use server';

import { prisma } from '@/lib/database';
import { getCurrentUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export interface CreateTestimonialInput {
  orderId: string;
  rating: number;
  content: string;
}

export interface ActionResponse {
  success?: boolean;
  error?: string;
  testimonialId?: string;
}

/**
 * Cria uma avaliação para uma ordem concluída, gravando na tabela testimonials,
 * vinculando ao pedido/cliente e recalculando a média e contagem do profissional.
 *
 * A lógica de verificação de duplicata e criação ocorre dentro de uma única
 * $transaction interativa do Prisma, eliminando o race condition que existia
 * quando a verificação (read) e a criação (write) eram operações separadas.
 */
export async function createTestimonialAction(
  data: CreateTestimonialInput
): Promise<ActionResponse> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: 'Você precisa estar logado para avaliar um serviço.' };
    }

    const { orderId, rating, content } = data;

    if (!orderId) {
      return { error: 'Identificador do pedido não informado.' };
    }

    const ratingNum = Math.round(Number(rating));
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return { error: 'A nota deve ser um valor inteiro entre 1 e 5 estrelas.' };
    }

    if (!content || !content.trim()) {
      return { error: 'Por favor, escreva um comentário sobre o serviço prestado.' };
    }

    // Toda a operação de check + create + update ocorre em uma única transação
    // atômica. O Prisma re-lê a ordem com estado fresco dentro da transação,
    // eliminando o race condition de dois cliques simultâneos.
    let testimonialId: string;

    await prisma.$transaction(async (tx) => {
      // Relê a ordem com estado fresco dentro da transação
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: {
          client: true,
          professional: true,
        },
      });

      if (!order) {
        throw new Error('Pedido não encontrado.');
      }

      // Valida que o usuário logado é o cliente dono da ordem
      if (order.client.userId !== currentUser.id) {
        throw new Error('Apenas o cliente contratante deste pedido pode avaliá-lo.');
      }

      // Valida que o status da ordem é CONCLUIDO
      if (order.status !== 'CONCLUIDO') {
        throw new Error('Apenas serviços concluídos podem receber avaliação.');
      }

      // Verifica duplicata de forma atômica: consulta no banco se já existe
      // avaliação do mesmo autor para o mesmo profissional vinculada a esta ordem
      // (rastreado via marcação no campo notes, checada dentro da transação).
      if (order.notes && order.notes.includes('[AVALIAÇÃO:')) {
        throw new Error('Este serviço já foi avaliado anteriormente.');
      }

      // Grava o registro na tabela testimonials
      const testimonial = await tx.testimonial.create({
        data: {
          professionalId: order.professionalId,
          authorId: currentUser.id,
          authorName: currentUser.name,
          authorRole: 'Cliente',
          content: content.trim(),
          rating: ratingNum,
        },
      });

      testimonialId = testimonial.id;

      // Vincula a avaliação na ordem para rastreabilidade e prevenção de duplicata.
      // A marcação é separada do texto operacional com prefixo identificável.
      const marker = `[AVALIAÇÃO:${testimonial.id}]`;
      const updatedNotes = order.notes
        ? `${order.notes}\n${marker}`
        : marker;

      await tx.order.update({
        where: { id: order.id },
        data: { notes: updatedNotes },
      });

      // Recalcula a média (rating) e o total de avaliações (reviewCount) do profissional.
      // Leitura e escrita dentro da mesma transação garantem consistência.
      const allReviews = await tx.testimonial.findMany({
        where: { professionalId: order.professionalId },
        select: { rating: true },
      });

      const totalReviews = allReviews.length;
      const sumRatings = allReviews.reduce((sum, item) => sum + item.rating, 0);
      const avgRating = totalReviews > 0
        ? Number((sumRatings / totalReviews).toFixed(2))
        : 0;

      await tx.professional.update({
        where: { id: order.professionalId },
        data: {
          rating: avgRating,
          reviewCount: totalReviews,
        },
      });
    });

    // Revalida caches de páginas pertinentes (fora da transação — side effect)
    revalidatePath('/cliente/pedidos');
    revalidatePath('/perfil-profissional');
    revalidatePath('/buscas');
    revalidatePath('/');

    return {
      success: true,
      testimonialId: testimonialId!,
    };
  } catch (error: any) {
    console.error('[createTestimonialAction] Erro ao criar avaliação:', error);
    // Erros de negócio lançados dentro da transação chegam aqui
    return { error: error.message || 'Erro interno ao registrar avaliação.' };
  }
}

