'use server';

import { prisma } from '@/lib/database';
import { getCurrentUser } from '@/lib/auth';
import { OrderStatus } from '@/generated/prisma';

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
    if (!data.description) return { error: 'Por favor, insira uma descrição do serviço.' };
    if (!data.cep) return { error: 'Por favor, insira o CEP.' };
    if (!data.address) return { error: 'Por favor, insira o endereço completo.' };

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
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
      },
    });

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error('[createOrderAction] Erro ao criar orçamento:', error);
    return { error: 'Ocorreu um erro interno ao processar a solicitação.' };
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
      agreedPrice: order.agreedPrice ? `R$ ${Number(order.agreedPrice).toFixed(2)}` : 'A combinar',
      scheduledAt: order.scheduledAt ? new Date(order.scheduledAt).toLocaleString('pt-BR') : 'Sem agendamento',
      status: order.status,
      createdAt: new Date(order.createdAt).toLocaleDateString('pt-BR'),
      avatar: order.client.user.name.charAt(0).toUpperCase(),
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
      agreedPrice: order.agreedPrice ? `R$ ${Number(order.agreedPrice).toFixed(2)}` : 'A combinar',
      scheduledAt: order.scheduledAt ? new Date(order.scheduledAt).toLocaleString('pt-BR') : 'Sem agendamento',
      status: order.status,
      createdAt: new Date(order.createdAt).toLocaleDateString('pt-BR'),
      avatar: order.professional.user.name.charAt(0).toUpperCase(),
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

    return { success: true };
  } catch (error) {
    console.error('[updateOrderStatusAction] Erro ao atualizar status:', error);
    return { error: 'Ocorreu um erro ao atualizar o status.' };
  }
}
