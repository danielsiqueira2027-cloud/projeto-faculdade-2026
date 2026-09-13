'use server';

import { prisma } from '@/lib/database';
import { getCurrentUser } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { createServerClient } from '@/lib/supabase/server';
import { deleteFromStorage } from '@/lib/supabase/storage';
import { revalidatePath } from 'next/cache';

/**
 * Extrai o caminho relativo dentro do bucket "uploads" a partir de uma URL pública.
 */
function extractStoragePath(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') return null;
  const marker = '/storage/v1/object/public/uploads/';
  const idx = url.indexOf(marker);
  if (idx !== -1) {
    return decodeURIComponent(url.substring(idx + marker.length));
  }
  return null;
}

export interface DeleteAccountResult {
  success?: boolean;
  error?: string;
}

/**
 * Exclui permanentemente a conta de um usuário (cliente ou profissional)
 * em conformidade com a LGPD.
 *
 * Etapas:
 * 1. Autenticação e autorização rigorosa via sessão atual.
 * 2. Validação de bloqueio caso haja pedidos EM_ANDAMENTO ou DISPUTA.
 * 3. Mapeamento de arquivos a remover do Supabase Storage.
 * 4. Execução transacional (Prisma $transaction) respeitando a ordem de FKs.
 * 5. Remoção física dos arquivos do Storage.
 * 6. Exclusão do usuário no Supabase Auth via Admin Client (com fallback SQL).
 * 7. Encerramento da sessão (logout).
 */
export async function deleteAccountAction(): Promise<DeleteAccountResult> {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return { error: 'Usuário não autenticado. Por favor, faça login novamente.' };
  }

  return executeDeleteAccount(currentUser.id);
}

export async function executeDeleteAccount(userId: string): Promise<DeleteAccountResult> {
  try {
    // ── 1. Busca perfis de Cliente e Profissional vinculados ───────────────────
    const [client, professional, userDb] = await Promise.all([
      prisma.client.findUnique({ where: { userId } }),
      prisma.professional.findUnique({ where: { userId } }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, avatarUrl: true },
      }),
    ]);

    if (!userDb) {
      return { error: 'Registro de usuário não encontrado no sistema.' };
    }

    // ── 2. Verificação de pendências / pedidos impeditivos ─────────────────────
    const pendingFilters: Array<{ clientId?: string; professionalId?: string }> = [];
    if (client) pendingFilters.push({ clientId: client.id });
    if (professional) pendingFilters.push({ professionalId: professional.id });

    if (pendingFilters.length > 0) {
      const activeOrders = await prisma.order.findMany({
        where: {
          OR: pendingFilters,
          status: { in: ['EM_ANDAMENTO', 'DISPUTA'] },
        },
        select: { id: true, status: true },
      });

      if (activeOrders.length > 0) {
        return {
          error: `Você possui ${activeOrders.length} pedido(s) em andamento ou em disputa. Conclua ou cancele seus pedidos pendentes antes de excluir sua conta.`,
        };
      }
    }

    // ── 3. Coleta de arquivos no Supabase Storage para posterior exclusão ──────
    const filesToDelete = new Set<string>();

    // 3.1. Avatar do usuário
    const userAvatarPath = extractStoragePath(userDb.avatarUrl);
    if (userAvatarPath) filesToDelete.add(userAvatarPath);

    // 3.2. Fotos de portfólio e serviços do profissional
    if (professional) {
      const portfolioItems = await prisma.portfolioItem.findMany({
        where: { professionalId: professional.id },
        select: { imageUrl: true },
      });
      portfolioItems.forEach((item) => {
        const path = extractStoragePath(item.imageUrl);
        if (path) filesToDelete.add(path);
      });

      const services = await prisma.service.findMany({
        where: { professionalId: professional.id },
        select: { imageUrls: true },
      });
      services.forEach((s) => {
        if (Array.isArray(s.imageUrls)) {
          s.imageUrls.forEach((url: unknown) => {
            if (typeof url === 'string') {
              const path = extractStoragePath(url);
              if (path) filesToDelete.add(path);
            }
          });
        }
      });
    }

    // 3.3. Imagens de chat enviadas pelo usuário
    const chatImages = await prisma.chatMessage.findMany({
      where: {
        senderId: userId,
        type: 'imagem',
      },
      select: { content: true },
    });
    chatImages.forEach((msg) => {
      const path = extractStoragePath(msg.content);
      if (path) filesToDelete.add(path);
    });

    // ── 4. Exclusão no Banco de Dados em Transação ($transaction) ──────────────
    await prisma.$transaction(async (tx) => {
      // 4.1. Mapeia todos os pedidos vinculados (como cliente ou profissional)
      const relatedOrders = await tx.order.findMany({
        where: {
          OR: [
            ...(client ? [{ clientId: client.id }] : []),
            ...(professional ? [{ professionalId: professional.id }] : []),
          ],
        },
        select: { id: true, attachments: true },
      });

      const orderIds = relatedOrders.map((o) => o.id);

      // Adiciona anexos de pedidos à lista de exclusão do storage
      relatedOrders.forEach((o) => {
        if (Array.isArray(o.attachments)) {
          o.attachments.forEach((att: unknown) => {
            if (typeof att === 'string') {
              const path = extractStoragePath(att);
              if (path) filesToDelete.add(path);
            }
          });
        }
      });

      // 4.2. Deleta agendamentos (appointments) vinculados às ordens, ao profissional ou ao cliente
      await tx.appointment.deleteMany({
        where: {
          OR: [
            ...(orderIds.length > 0 ? [{ orderId: { in: orderIds } }] : []),
            ...(professional ? [{ professionalId: professional.id }] : []),
            ...(client ? [{ clientId: client.id }] : []),
          ],
        },
      });

      // 4.3. Deleta salas de chat e mensagens das ordens
      if (orderIds.length > 0) {
        const chatRooms = await tx.chatRoom.findMany({
          where: { orderId: { in: orderIds } },
          select: { id: true },
        });
        const roomIds = chatRooms.map((r) => r.id);

        if (roomIds.length > 0) {
          await tx.chatMessage.deleteMany({
            where: { roomId: { in: roomIds } },
          });
          await tx.chatRoom.deleteMany({
            where: { id: { in: roomIds } },
          });
        }

        // 4.4. Deleta as ordens (concluídas/canceladas)
        await tx.order.deleteMany({
          where: { id: { in: orderIds } },
        });
      }

      // 4.5. Deleta depoimentos/avaliações escritas pelo usuário (como autor)
      await tx.testimonial.deleteMany({
        where: { authorId: userId },
      });

      // 4.6. Deleta notificações do usuário
      await tx.notification.deleteMany({
        where: { userId },
      });

      // 4.7. Deleta o registro central na tabela users
      // Devido ao onDelete: Cascade no schema.prisma, isso remove automaticamente:
      // - clients
      // - professionals (e suas categories, services, portfolio_items, certifications e testimonials recebidos)
      // - chat_messages enviadas pelo usuário
      // - notifications
      await tx.user.delete({
        where: { id: userId },
      });
    });

    // ── 5. Limpeza de arquivos no Supabase Storage ────────────────────────────
    if (filesToDelete.size > 0) {
      try {
        const paths = Array.from(filesToDelete);
        console.log(`[deleteAccount] Removendo ${paths.length} arquivo(s) do Supabase Storage...`);
        await deleteFromStorage(paths, 'uploads');
      } catch (storageErr: unknown) {
        console.warn('[deleteAccount] Aviso ao limpar arquivos do Storage (não bloqueia exclusão):', storageErr instanceof Error ? storageErr.message : String(storageErr));
      }
    }

    // ── 6. Exclusão no Supabase Auth ──────────────────────────────────────────
    // Prioriza SEMPRE o Admin Client (service_role)
    const adminClient = createAdminClient();

    if (!adminClient) {
      console.warn(
        '[deleteAccount] ATENÇÃO: SUPABASE_SERVICE_ROLE_KEY não configurada no .env. Utilizando fallback SQL direto em auth.users.'
      );
      await prisma.$executeRawUnsafe('DELETE FROM auth.users WHERE id = $1', userId);
      console.log(`[deleteAccount] Usuário ${userId} excluído de auth.users via fallback SQL.`);
    } else {
      const { error: adminError } = await adminClient.auth.admin.deleteUser(userId);

      if (adminError) {
        console.warn(
          '[deleteAccount] Falha técnica ao deletar usuário via Supabase Auth Admin client. Ativando fallback SQL direto em auth.users:',
          adminError.message
        );
        await prisma.$executeRawUnsafe('DELETE FROM auth.users WHERE id = $1', userId);
        console.log(`[deleteAccount] Usuário ${userId} excluído de auth.users via fallback SQL.`);
      } else {
        console.log(`[deleteAccount] Usuário ${userId} excluído com sucesso do Supabase Auth via Admin Client.`);
      }
    }

    // ── 7. Encerra a sessão ativa (Logout) ────────────────────────────────────
    try {
      const supabase = await createServerClient();
      await supabase.auth.signOut();
    } catch (signOutErr: unknown) {
      console.warn('[deleteAccount] Aviso ao deslogar sessão:', signOutErr instanceof Error ? signOutErr.message : String(signOutErr));
    }

    try {
      revalidatePath('/', 'layout');
    } catch {
      // Ignorado com segurança quando executado fora do contexto de requisição Next.js
    }
    return { success: true };
  } catch (err: unknown) {
    console.error('[deleteAccountAction Error]', err);
    return {
      error:
        err instanceof Error
          ? err.message
          : 'Ocorreu um erro ao processar a exclusão da sua conta. Tente novamente mais tarde.',
    };
  }
}
