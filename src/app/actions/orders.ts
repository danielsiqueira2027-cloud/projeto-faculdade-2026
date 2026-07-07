'use server';

import { prisma } from '@/lib/database';
import { getCurrentUser } from '@/lib/auth';
import { OrderStatus } from '@/generated/prisma';
import { appEvents } from '@/lib/events';

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
  } catch (error: any) {
    console.error('[createOrderAction] Erro detalhado ao criar orçamento:', error);
    return { error: 'Ocorreu um erro interno ao processar a solicitação. Verifique os logs.' };
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
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders.map((order) => ({
      id: order.id,
      clientName: order.client.user.name,
      clientEmail: order.client.user.email,
      clientPhone: order.client.user.phone || order.client.user.phone || '',
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
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

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

    const updateData: any = { status };
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
