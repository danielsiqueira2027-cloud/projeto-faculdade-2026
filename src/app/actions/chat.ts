'use server';

import { prisma } from '@/lib/database';
import { getCurrentUser } from '@/lib/auth';

/**
 * Encontra ou cria uma sala de chat vinculada a um pedido.
 * Garante segurança verificando se o usuário logado é o cliente ou o profissional do pedido.
 */
export async function getOrCreateChatRoom(orderId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error('Não autorizado');

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      client: true,
      professional: true,
    },
  });

  if (!order) throw new Error('Pedido não encontrado');

  const isClient = order.client.userId === currentUser.id;
  const isProfessional = order.professional.userId === currentUser.id;

  if (!isClient && !isProfessional) {
    throw new Error('Não autorizado para acessar este pedido');
  }

  // O chat só é permitido para pedidos EM_ANDAMENTO ou CONCLUIDO
  if (order.status !== 'EM_ANDAMENTO' && order.status !== 'CONCLUIDO') {
    throw new Error('O chat só está disponível para pedidos em andamento ou concluídos.');
  }

  let room = await prisma.chatRoom.findUnique({
    where: { orderId },
  });

  if (!room) {
    room = await prisma.chatRoom.create({
      data: { orderId },
    });
  }

  return { roomId: room.id };
}

/**
 * Obtém todas as salas de chat ativas vinculadas aos pedidos do usuário logado (Cliente ou Pro).
 */
export async function getChatRooms() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return [];

  // Busca pedidos do usuário que possuem chatRoom
  const orders = await prisma.order.findMany({
    where: {
      OR: [
        { client: { userId: currentUser.id } },
        { professional: { userId: currentUser.id } },
      ],
      chatRoom: { isNot: null },
    },
    include: {
      chatRoom: true,
      client: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      },
      professional: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  });

  const chatRooms = [];

  for (const order of orders) {
    if (!order.chatRoom) continue;

    const lastMessage = await prisma.chatMessage.findFirst({
      where: { roomId: order.chatRoom.id },
      orderBy: { createdAt: 'desc' },
      include: {
        sender: {
          select: {
            name: true,
          },
        },
      },
    });

    const isUserClient = order.client.userId === currentUser.id;
    const interlocutorName = isUserClient
      ? order.professional.user.name
      : order.client.user.name;
    const interlocutorAvatar = isUserClient
      ? order.professional.user.avatarUrl
      : order.client.user.avatarUrl;

    chatRooms.push({
      roomId: order.chatRoom.id,
      orderId: order.id,
      serviceType: order.serviceType || 'Serviço',
      orderStatus: order.status,
      interlocutorName,
      interlocutorAvatar,
      lastMessage: lastMessage
        ? {
            content: lastMessage.type === 'imagem' ? '📷 Foto' : lastMessage.content,
            createdAt: lastMessage.createdAt,
            senderName: lastMessage.sender.name,
          }
        : null,
      updatedAt: lastMessage ? lastMessage.createdAt : order.chatRoom.createdAt,
    });
  }

  // Ordena por data de atualização (mais recente primeiro)
  return chatRooms.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

/**
 * Busca todas as mensagens de um chat pelo orderId.
 */
export async function getChatMessagesAction(orderId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error('Não autorizado');

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      client: true,
      professional: true,
      chatRoom: true,
    },
  });

  if (!order || !order.chatRoom) throw new Error('Chat não encontrado');

  const isClient = order.client.userId === currentUser.id;
  const isProfessional = order.professional.userId === currentUser.id;

  if (!isClient && !isProfessional) {
    throw new Error('Não autorizado');
  }

  const messages = await prisma.chatMessage.findMany({
    where: { roomId: order.chatRoom.id },
    orderBy: { createdAt: 'asc' },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return messages.map((m) => ({
    id: m.id,
    senderId: m.senderId,
    senderName: m.sender.name,
    type: m.type as 'texto' | 'imagem',
    content: m.content,
    createdAt: m.createdAt,
    isMe: m.senderId === currentUser.id,
  }));
}

/**
 * Envia uma mensagem para o chat de um pedido.
 */
export async function sendMessageAction(
  orderId: string,
  type: 'texto' | 'imagem',
  content: string
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error('Não autorizado');

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      client: true,
      professional: true,
      chatRoom: true,
    },
  });

  if (!order || !order.chatRoom) throw new Error('Chat não encontrado');

  const isClient = order.client.userId === currentUser.id;
  const isProfessional = order.professional.userId === currentUser.id;

  if (!isClient && !isProfessional) {
    throw new Error('Não autorizado');
  }

  if (order.status !== 'EM_ANDAMENTO') {
    throw new Error('Não é possível enviar mensagens para um pedido concluído, pendente ou cancelado.');
  }

  const message = await prisma.chatMessage.create({
    data: {
      roomId: order.chatRoom.id,
      senderId: currentUser.id,
      type,
      content,
    },
    include: {
      sender: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    id: message.id,
    senderId: message.senderId,
    senderName: message.sender.name,
    type: message.type as 'texto' | 'imagem',
    content: message.content,
    createdAt: message.createdAt,
    isMe: true,
  };
}

/**
 * Busca detalhes sobre uma sala de chat e seus integrantes pelo orderId.
 */
export async function getChatRoomDetails(orderId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error('Não autorizado');

  const order = await prisma.order.findUnique({
    where: { id: orderId },
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
      chatRoom: true,
    },
  });

  if (!order) throw new Error('Pedido não encontrado');

  const isClient = order.client.userId === currentUser.id;
  const isProfessional = order.professional.userId === currentUser.id;

  if (!isClient && !isProfessional) {
    throw new Error('Não autorizado');
  }

  const interlocutor = isClient
    ? {
        name: order.professional.user.name,
        role: 'Profissional',
        phone: order.professional.phone || order.professional.user.phone || '',
        email: order.professional.user.email,
        avatar: order.professional.user.avatarUrl || '',
      }
    : {
        name: order.client.user.name,
        role: 'Cliente',
        phone: order.client.user.phone || '',
        email: order.client.user.email,
        avatar: order.client.user.avatarUrl || '',
      };

  return {
    orderId: order.id,
    serviceType: order.serviceType || 'Serviço',
    status: order.status,
    agreedPrice: order.agreedPrice ? `R$ ${Number(order.agreedPrice).toFixed(2)}` : 'A combinar',
    scheduledAt: order.scheduledAt ? new Date(order.scheduledAt).toLocaleString('pt-BR') : 'Sem agendamento',
    interlocutor,
    myRole: isClient ? 'client' : 'professional',
    clientName: order.client.user.name,
    professionalName: order.professional.user.name,
  };
}
