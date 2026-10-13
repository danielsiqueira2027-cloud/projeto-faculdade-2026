'use server';

import { prisma } from '@/lib/database';
import { getCurrentUser } from '@/lib/auth';
import { OrderStatus, type Prisma } from '@/generated/prisma';
import { appEvents } from '@/lib/events';
import { uploadToStorage, deleteFromStorage } from '@/lib/supabase/storage';
import { revalidatePath } from 'next/cache';

const ORDER_IMAGE_BUCKET = 'uploads';
const MAX_ORDER_IMAGES = 2;
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export type ActionResponse = {
  success?: boolean;
  error?: string;
  orderId?: string;
};

/**
 * Cria um pedido real no banco de dados com status PENDENTE associado ao cliente logado.
 */
export async function createOrderAction(data: {
  professionalId: string;
  serviceType: string;
  description: string;
  cep: string;
  address: string;
  urgency: string;
  scheduledAt?: string;
  period?: string;
}): Promise<ActionResponse> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: 'Você precisa estar logado para solicitar um orçamento.' };
    }

    const client = await prisma.client.findUnique({
      where: { userId: currentUser.id },
    });

    if (!client) {
      return { error: 'Apenas usuários logados como Cliente podem solicitar orçamentos.' };
    }

    // Validação básica
    if (!data.professionalId) return { error: 'Profissional não especificado.' };
    if (!data.description || !data.description.trim()) return { error: 'Por favor, insira uma descrição do serviço.' };
    if (!data.cep || !data.cep.trim()) return { error: 'Por favor, insira o CEP.' };
    if (!data.address || !data.address.trim()) return { error: 'Por favor, insira o endereço completo.' };

    // Validar tamanho dos campos
    if (data.serviceType && data.serviceType.length > 150) {
      return { error: 'O tipo de serviço não pode exceder 150 caracteres.' };
    }
    if (data.cep && data.cep.length > 10) {
      return { error: 'O CEP fornecido é inválido.' };
    }

    // Verificar se o profissional existe antes de criar o pedido para evitar falha de chave estrangeira
    const professional = await prisma.professional.findUnique({
      where: { id: data.professionalId },
      select: { userId: true },
    });

    if (!professional) {
      return { error: 'O profissional selecionado não foi encontrado ou está inativo.' };
    }

    // Validar data agendada
    let parsedDate: Date | null = null;
    if (data.scheduledAt && data.scheduledAt.trim() !== '') {
      const dateObj = new Date(data.scheduledAt);
      if (isNaN(dateObj.getTime())) {
        return { error: 'A data agendada fornecida é inválida.' };
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dateObj < today) {
        return { error: 'A data agendada não pode ser no passado.' };
      }
      parsedDate = dateObj;
    }

    const order = await prisma.order.create({
      data: {
        clientId: client.id,
        professionalId: data.professionalId,
        status: 'PENDENTE',
        serviceType: data.serviceType || 'Serviço',
        description: data.description,
        locationCep: data.cep,
        address: data.address,
        urgency: data.urgency || 'Normal',
        scheduledAt: parsedDate,
        period: data.period || null,
      },
    });

    // Notificar o profissional
    await prisma.notification.create({
      data: {
        userId: professional.userId,
        title: `Novo pedido de orçamento recebido para o serviço: ${data.serviceType || 'Serviço'}.`,
      },
    });

    // Emitir eventos via SSE
    appEvents.emit(`order:${professional.userId}`, { type: 'create', orderId: order.id });
    appEvents.emit(`notification:${professional.userId}`, { type: 'new_order' });

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error('[createOrderAction] Erro detalhado ao criar orçamento:', error);
    return { error: 'Ocorreu um erro interno ao processar a solicitação. Verifique os logs.' };
  }
}

/**
 * Faz upload de até 2 imagens para um pedido já criado.
 * Deve ser chamada logo após createOrderAction. Se o upload falhar,
 * tenta remover os arquivos já enviados para evitar estado inconsistente.
 */
export async function uploadOrderImagesAction(
  orderId: string,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { error: 'Não autorizado.' };

    // Verifica que o pedido pertence ao cliente logado
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { client: { select: { userId: true } } },
    });
    if (!order) return { error: 'Pedido não encontrado.' };
    if (order.client.userId !== currentUser.id) return { error: 'Não autorizado para este pedido.' };

    const files = formData.getAll('images') as File[];
    if (!files || files.length === 0) return { success: true }; // sem imagens é válido

    // Validações no servidor
    if (files.length > MAX_ORDER_IMAGES) {
      return { error: `Máximo de ${MAX_ORDER_IMAGES} imagens permitidas.` };
    }

    for (const file of files) {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return { error: `Tipo de arquivo inválido: ${file.type}. Use JPG, PNG ou WEBP.` };
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return { error: `Arquivo "${file.name}" excede o tamanho máximo de 2 MB.` };
      }
    }

    const uploadedPaths: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.type.split('/')[1].replace('jpeg', 'jpg');
        const fileName = `${crypto.randomUUID()}.${ext}`;
        // Caminho: {userId}/orders/{orderId}/{uuid}.{ext}
        const path = `${currentUser.id}/orders/${orderId}/${fileName}`;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await uploadToStorage({
          bucket: ORDER_IMAGE_BUCKET,
          path,
          file: buffer,
          contentType: file.type,
          upsert: false,
        });

        uploadedPaths.push(result.path);

        await prisma.orderImage.create({
          data: {
            id: crypto.randomUUID(),
            orderId,
            storagePath: result.path,
            position: i,
          },
        });
      }
    } catch (uploadErr: unknown) {
      // Rollback: remove arquivos já enviados do Storage
      if (uploadedPaths.length > 0) {
        try {
          await deleteFromStorage(uploadedPaths, ORDER_IMAGE_BUCKET);
        } catch (cleanErr) {
          console.warn('[uploadOrderImagesAction] Falha ao limpar arquivos após erro:', cleanErr);
        }
      }
      // Rollback: remove registros eventualmente criados no banco para este pedido
      try {
        await prisma.orderImage.deleteMany({ where: { orderId } });
      } catch (cleanDbErr) {
        console.warn('[uploadOrderImagesAction] Falha ao limpar registros de imagem no banco:', cleanDbErr);
      }
      const msg = uploadErr instanceof Error ? uploadErr.message : 'Erro no upload das imagens.';
      console.error('[uploadOrderImagesAction] Erro:', msg);
      return { error: `Falha no upload das imagens: ${msg}` };
    }

    return { success: true };
  } catch (error) {
    console.error('[uploadOrderImagesAction] Erro inesperado:', error);
    return { error: 'Erro interno ao processar imagens.' };
  }
}

/**
 * Busca todas as solicitações de orçamento/pedidos recebidos pelo profissional logado.
 */
export async function getProfessionalOrders() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
    });

    if (!prof) return [];

    const orders = await prisma.order.findMany({
      where: { professionalId: prof.id },
      include: {
        client: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                phone: true,
                avatarUrl: true,
              },
            },
          },
        },
        images: {
          orderBy: { position: 'asc' },
          select: { id: true, storagePath: true, position: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const toPublicUrl = (path: string) =>
      `${supabaseUrl}/storage/v1/object/public/${ORDER_IMAGE_BUCKET}/${path}`;

    return orders.map((order) => ({
      id: order.id,
      clientName: order.client.user.name,
      clientEmail: order.client.user.email,
      clientPhone: order.client.user.phone || '',
      serviceType: order.serviceType || 'Serviço',
      description: order.description || '',
      locationCep: order.locationCep || '',
      address: order.address || '',
      urgency: order.urgency || 'Normal',
      agreedPrice: order.agreedPrice 
        ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(order.agreedPrice))
        : 'A combinar',
      scheduledAt: order.scheduledAt ? new Date(order.scheduledAt).toLocaleString('pt-BR') : 'Sem agendamento',
      status: order.status,
      createdAt: new Date(order.createdAt).toLocaleDateString('pt-BR'),
      avatar: order.client.user.name.charAt(0).toUpperCase(),
      period: order.period || '',
      images: order.images.map((img) => toPublicUrl(img.storagePath)),
    }));
  } catch (error) {
    console.error('[getProfessionalOrders]', error);
    return [];
  }
}

/**
 * Busca todas as solicitações de orçamento/pedidos enviadas pelo cliente logado.
 */
export async function getClientOrders() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const client = await prisma.client.findUnique({
      where: { userId: currentUser.id },
    });

    if (!client) return [];

    const orders = await prisma.order.findMany({
      where: { clientId: client.id },
      include: {
        professional: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                phone: true,
                avatarUrl: true,
              },
            },
          },
        },
        images: {
          orderBy: { position: 'asc' },
          select: { id: true, storagePath: true, position: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const toPublicUrl = (path: string) =>
      `${supabaseUrl}/storage/v1/object/public/${ORDER_IMAGE_BUCKET}/${path}`;

    return orders.map((order) => ({
      id: order.id,
      professionalId: order.professional.id,
      professionalName: order.professional.user.name,
      professionalEmail: order.professional.user.email,
      professionalPhone: order.professional.phone || order.professional.user.phone || '',
      serviceType: order.serviceType || 'Serviço',
      description: order.description || '',
      locationCep: order.locationCep || '',
      address: order.address || '',
      urgency: order.urgency || 'Normal',
      agreedPrice: order.agreedPrice 
        ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(order.agreedPrice))
        : 'A combinar',
      scheduledAt: order.scheduledAt ? new Date(order.scheduledAt).toLocaleString('pt-BR') : 'Sem agendamento',
      status: order.status,
      createdAt: new Date(order.createdAt).toLocaleDateString('pt-BR'),
      avatar: order.professional.user.name.charAt(0).toUpperCase(),
      period: order.period || '',
      hasTestimonial: Boolean(order.notes && order.notes.includes('[AVALIAÇÃO:')),
      images: order.images.map((img) => toPublicUrl(img.storagePath)),
    }));
  } catch (error) {
    console.error('[getClientOrders]', error);
    return [];
  }
}


/**
 * Atualiza o status e/ou preço acordado de um pedido pelo profissional.
 */
export async function updateOrderStatusAction(
  orderId: string,
  status: OrderStatus,
  agreedPrice?: number
): Promise<ActionResponse> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { error: 'Não autorizado.' };

    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
    });
    if (!prof) return { error: 'Perfil de profissional não encontrado.' };

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) return { error: 'Pedido não encontrado.' };
    if (order.professionalId !== prof.id) return { error: 'Não autorizado para este pedido.' };

    const updateData: Prisma.OrderUpdateInput = { status };
    if (agreedPrice !== undefined && agreedPrice !== null) {
      updateData.agreedPrice = agreedPrice;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    // Notificar o cliente
    const orderWithClient = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        client: {
          select: { userId: true },
        },
        professional: {
          select: { userId: true },
        },
      },
    });

    if (orderWithClient?.client) {
      let statusText = status.toLowerCase();
      if (status === 'PENDENTE') statusText = 'pendente';
      else if (status === 'EM_ANDAMENTO') statusText = 'em andamento';
      else if (status === 'CONCLUIDO') statusText = 'concluído';
      else if (status === 'CANCELADO') statusText = 'cancelado';

      await prisma.notification.create({
        data: {
          userId: orderWithClient.client.userId,
          title: `O status do seu pedido para o serviço "${orderWithClient.serviceType || 'Serviço'}" foi atualizado para: ${statusText}.`,
        },
      });

      // Emitir eventos via SSE
      const clientUserId = orderWithClient.client.userId;
      const professionalUserId = orderWithClient.professional.userId;

      appEvents.emit(`order:${clientUserId}`, { type: 'update', orderId, status });
      appEvents.emit(`order:${professionalUserId}`, { type: 'update', orderId, status });

      appEvents.emit(`notification:${clientUserId}`, { type: 'notification_update' });
      appEvents.emit(`notification:${professionalUserId}`, { type: 'notification_update' });
    }

    return { success: true };
  } catch (error) {
    console.error('[updateOrderStatusAction] Erro ao atualizar status:', error);
    return { error: 'Ocorreu um erro ao atualizar o status.' };
  }
}

/**
 * Define ou atualiza o preço do serviço a partir do chat pelo profissional.
 */
export async function updateOrderPriceAction(
  orderId: string,
  price: number
): Promise<ActionResponse> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { error: 'Não autorizado.' };

    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
    });
    if (!prof) return { error: 'Perfil de profissional não encontrado.' };

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        chatRoom: true,
        client: { select: { userId: true } },
        professional: { select: { userId: true } },
      },
    });
    if (!order) return { error: 'Pedido não encontrado.' };
    if (order.professionalId !== prof.id) return { error: 'Não autorizado para este pedido.' };

    const isFirstTime = order.agreedPrice === null;
    const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

    await prisma.order.update({
      where: { id: orderId },
      data: { agreedPrice: price },
    });

    if (order.chatRoom) {
      const systemContent = isFirstTime
        ? `Valor definido para este serviço: ${formattedPrice}.`
        : `Valor atualizado para este serviço: ${formattedPrice}.`;

      const systemMessage = await prisma.chatMessage.create({
        data: {
          roomId: order.chatRoom.id,
          senderId: currentUser.id,
          type: 'sistema',
          content: systemContent,
        },
      });

      const clientUserId = order.client.userId;
      const professionalUserId = order.professional.userId;

      const formattedMsg = {
        id: systemMessage.id,
        senderId: systemMessage.senderId,
        senderName: 'Sistema',
        type: 'sistema',
        content: systemMessage.content,
        createdAt: systemMessage.createdAt,
        isMe: false,
      };

      // Emitir eventos via SSE
      appEvents.emit(`message:${clientUserId}`, { orderId, message: formattedMsg });
      appEvents.emit(`message:${professionalUserId}`, { orderId, message: { ...formattedMsg, isMe: true } });

      appEvents.emit(`order:${clientUserId}`, { type: 'price_update', orderId });
      appEvents.emit(`order:${professionalUserId}`, { type: 'price_update', orderId });

      // Atualizar notificações
      await prisma.notification.create({
        data: {
          userId: clientUserId,
          title: `O profissional definiu o valor do serviço "${order.serviceType || 'Serviço'}" como ${formattedPrice}.`,
        },
      });
      appEvents.emit(`notification:${clientUserId}`, { type: 'notification_update' });
    }

    return { success: true };
  } catch (error) {
    console.error('[updateOrderPriceAction]', error);
    return { error: 'Ocorreu um erro ao atualizar o valor do pedido.' };
  }
}

/**
 * Exclui permanentemente um orçamento/pedido do cliente e todos os seus recursos vinculados.
 * Apenas pedidos em status PENDENTE ou CANCELADO podem ser excluídos.
 * Remove fotos do Storage e, em transação no banco: mensagens do chat, sala de chat,
 * agendamentos, imagens do pedido e o próprio pedido.
 */
export async function deleteOrderAction(orderId: string): Promise<ActionResponse> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { error: 'Não autorizado. Faça login novamente.' };

    const client = await prisma.client.findUnique({
      where: { userId: currentUser.id },
      select: { id: true },
    });
    if (!client) {
      return { error: 'Apenas clientes podem excluir orçamentos.' };
    }

    // Busca o pedido garantindo que pertence ao cliente logado
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        professional: { select: { userId: true } },
        images: { select: { storagePath: true } },
      },
    });

    if (!order) {
      return { error: 'Pedido não encontrado.' };
    }

    if (order.clientId !== client.id) {
      return { error: 'Você não tem permissão para excluir este pedido.' };
    }

    // Regra de status: permitir excluir apenas pedidos ainda não concluídos (PENDENTE, CANCELADO)
    // Status bloqueados: EM_ANDAMENTO, CONCLUIDO, DISPUTA
    const ALLOWED_STATUSES: OrderStatus[] = [OrderStatus.PENDENTE, OrderStatus.CANCELADO];
    if (!ALLOWED_STATUSES.includes(order.status)) {
      return { error: 'Este pedido não pode ser excluído neste status.' };
    }

    // 1. Remover arquivos de fotos do Supabase Storage
    const storagePaths = order.images
      .map((img) => img.storagePath)
      .filter((p): p is string => Boolean(p));

    if (storagePaths.length > 0) {
      try {
        await deleteFromStorage(storagePaths, ORDER_IMAGE_BUCKET);
      } catch (storageErr) {
        console.error('[deleteOrderAction] Falha ao remover fotos do Storage:', storageErr);
        return {
          error: 'Falha ao remover fotos do pedido. O pedido não foi excluído para evitar arquivos órfãos.',
        };
      }
    }

    // 2. Transação atômica no banco de dados para limpar dependências
    await prisma.$transaction(async (tx) => {
      // (a) Chat: se houver chatRoom vinculado ao pedido, remover mensagens e a sala
      const chatRoom = await tx.chatRoom.findUnique({
        where: { orderId },
        select: { id: true },
      });

      if (chatRoom) {
        await tx.chatMessage.deleteMany({
          where: { roomId: chatRoom.id },
        });
        await tx.chatRoom.delete({
          where: { id: chatRoom.id },
        });
      }

      // (b) Agendamentos (appointments) vinculados a este pedido
      await tx.appointment.deleteMany({
        where: { orderId },
      });

      // (c) Registros de imagens vinculadas
      await tx.orderImage.deleteMany({
        where: { orderId },
      });

      // (d) Exclui o próprio pedido
      await tx.order.delete({
        where: { id: orderId },
      });
    });

    // 3. Notifica o profissional em tempo real via SSE
    if (order.professional?.userId) {
      appEvents.emit(`order:${order.professional.userId}`, { type: 'delete', orderId });
    }

    // 4. Revalidação das telas de pedidos do cliente e do profissional
    revalidatePath('/cliente/pedidos');
    revalidatePath('/dashboard/profissional/pedidos');

    return { success: true };
  } catch (error) {
    console.error('[deleteOrderAction] Erro inesperado:', error);
    return { error: 'Erro interno ao excluir pedido.' };
  }
}

