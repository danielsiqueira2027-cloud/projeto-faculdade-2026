'use server';

import { prisma } from '@/lib/database';
import { getCurrentUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { appEvents } from '@/lib/events';

export type AppointmentResult = {
  success?: boolean;
  error?: string;
  appointmentId?: string;
  conflict?: {
    existingAt: string;
  };
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDateTimePtBr(date: Date): string {
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ─── Criar ou Atualizar Agendamento ──────────────────────────────────────────

export async function createOrUpdateAppointment(data: {
  orderId: string;
  scheduledAt: string; // ISO string
  notes?: string;
}): Promise<AppointmentResult> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { error: 'Não autorizado.' };

    // Busca o pedido com vínculos
    const order = await prisma.order.findUnique({
      where: { id: data.orderId },
      include: {
        client: { include: { user: { select: { id: true, name: true } } } },
        professional: { include: { user: { select: { id: true, name: true } } } },
        chatRoom: true,
      },
    });

    if (!order) return { error: 'Pedido não encontrado.' };
    if (order.professional.userId !== currentUser.id) {
      return { error: 'Apenas o profissional responsável pode definir o agendamento.' };
    }
    if (order.status !== 'EM_ANDAMENTO') {
      return { error: 'Agendamentos só podem ser criados para pedidos Em Andamento.' };
    }
    if (!order.chatRoom) {
      return { error: 'Sala de chat não encontrada para este pedido.' };
    }

    const scheduledAt = new Date(data.scheduledAt);

    // Validação: data no passado
    if (scheduledAt < new Date()) {
      return { error: 'Não é possível agendar para uma data/hora no passado.' };
    }

    // ── Verificação de conflito (±30 min) ───────────────────────────────────
    const windowStart = new Date(scheduledAt.getTime() - 30 * 60 * 1000);
    const windowEnd   = new Date(scheduledAt.getTime() + 30 * 60 * 1000);

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        professionalId: order.professional.id,
        status: 'CONFIRMADO',
        scheduledAt: { gte: windowStart, lte: windowEnd },
        // Excluir o próprio agendamento do pedido (reagendamento)
        NOT: { orderId: data.orderId },
      },
    });

    if (existingAppointment) {
      return {
        error: 'Conflito de agenda',
        conflict: {
          existingAt: formatDateTimePtBr(existingAppointment.scheduledAt),
        },
      };
    }

    // ── Salvar ou Atualizar Appointment ────────────────────────────────────
    const existingForOrder = await prisma.appointment.findFirst({
      where: { orderId: data.orderId },
    });

    const isReschedule = !!existingForOrder;

    let appointmentId: string;
    let systemMessage: any;

    await prisma.$transaction(async (tx) => {
      if (existingForOrder) {
        // Reagendamento
        await tx.appointment.update({
          where: { id: existingForOrder.id },
          data: {
            scheduledAt,
            notes: data.notes ?? existingForOrder.notes,
            status: 'CONFIRMADO',
          },
        });
        appointmentId = existingForOrder.id;
      } else {
        // Novo agendamento
        const created = await tx.appointment.create({
          data: {
            orderId: data.orderId,
            professionalId: order.professional.id,
            clientId: order.client.id,
            scheduledAt,
            serviceName: order.serviceType ?? 'Serviço',
            status: 'CONFIRMADO',
            notes: data.notes ?? null,
          },
        });
        appointmentId = created.id;
      }

      // Atualiza scheduledAt no Order também
      await tx.order.update({
        where: { id: data.orderId },
        data: { scheduledAt },
      });

      // ── Mensagem automática de sistema no chat ──────────────────────────
      const formattedDate = formatDateTimePtBr(scheduledAt);
      const systemContent = isReschedule
        ? `📅 Agendamento atualizado para ${formattedDate}.`
        : `📅 Agendamento definido para ${formattedDate}.`;

      systemMessage = await tx.chatMessage.create({
        data: {
          roomId: order.chatRoom!.id,
          senderId: currentUser.id,
          type: 'sistema',
          content: systemContent,
        },
        include: {
          sender: {
            select: {
              name: true,
            },
          },
        },
      });

      // Notificação para o cliente
      await tx.notification.create({
        data: {
          userId: order.client.user.id,
          title: isReschedule
            ? `Seu serviço "${order.serviceType ?? 'Serviço'}" foi reagendado para ${formattedDate}.`
            : `Seu serviço "${order.serviceType ?? 'Serviço'}" foi agendado para ${formattedDate}.`,
        },
      });
    });

    // Emitir eventos SSE para ambos os usuários
    const clientUserId = order.client.user.id;
    const professionalUserId = order.professional.user.id;

    appEvents.emit(`appointment:${clientUserId}`, { orderId: data.orderId });
    appEvents.emit(`appointment:${professionalUserId}`, { orderId: data.orderId });

    appEvents.emit(`notification:${clientUserId}`, { type: 'new_notification' });

    appEvents.emit(`order:${clientUserId}`, { type: 'update', orderId: data.orderId });
    appEvents.emit(`order:${professionalUserId}`, { type: 'update', orderId: data.orderId });

    const formattedMsg = {
      id: systemMessage.id,
      senderId: systemMessage.senderId,
      senderName: systemMessage.sender.name,
      type: systemMessage.type as 'texto' | 'imagem' | 'sistema',
      content: systemMessage.content,
      createdAt: systemMessage.createdAt,
      isMe: false,
    };

    appEvents.emit(`message:${clientUserId}`, { orderId: data.orderId, message: { ...formattedMsg, isMe: clientUserId === currentUser.id } });
    appEvents.emit(`message:${professionalUserId}`, { orderId: data.orderId, message: { ...formattedMsg, isMe: professionalUserId === currentUser.id } });

    revalidatePath('/', 'layout');

    return { success: true, appointmentId: appointmentId! };
  } catch (error) {
    console.error('[createOrUpdateAppointment]', error);
    return { error: 'Erro interno ao salvar o agendamento.' };
  }
}

// ─── Buscar Agendamentos do Profissional Logado ───────────────────────────────

export async function getProfessionalAppointments() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
    });
    if (!prof) return [];

    const appointments = await prisma.appointment.findMany({
      where: { professionalId: prof.id },
      orderBy: { scheduledAt: 'asc' },
      include: {
        order: {
          include: {
            client: {
              include: {
                user: { select: { name: true, phone: true, avatarUrl: true } },
              },
            },
          },
        },
      },
    });

    return appointments.map((a) => ({
      id: a.id,
      orderId: a.orderId ?? '',
      clientName: a.order?.client.user.name ?? 'Cliente',
      clientPhone: a.order?.client.user.phone ?? '',
      clientAvatar: a.order?.client.user.avatarUrl ?? null,
      serviceName: a.serviceName ?? a.order?.serviceType ?? 'Serviço',
      scheduledAt: a.scheduledAt,
      status: a.status,
      address: a.address ?? a.order?.address ?? '',
      notes: a.notes ?? '',
    }));
  } catch (error) {
    console.error('[getProfessionalAppointments]', error);
    return [];
  }
}

// ─── Buscar Agendamento de um Pedido Específico ───────────────────────────────

export async function getOrderAppointment(orderId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return null;

    // Busca o order com vínculos de client e professional para verificar ownership
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        scheduledAt: true,
        serviceType: true,
        client: { select: { userId: true } },
        professional: { select: { userId: true } },
        appointments: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            id: true,
            scheduledAt: true,
            status: true,
            notes: true,
          },
        },
      },
    });

    // ── Verificação de ownership ────────────────────────────────────────────
    const isClient       = order?.client.userId       === currentUser.id;
    const isProfessional = order?.professional.userId === currentUser.id;

    if (!order || (!isClient && !isProfessional)) {
      return null; // usuário não é parte deste pedido
    }

    return {
      suggestedAt: order.scheduledAt,  // data que o cliente sugeriu no formulário
      appointment: order.appointments[0] ?? null, // agendamento confirmado (se houver)
      serviceType: order.serviceType,
    };
  } catch (error) {
    console.error('[getOrderAppointment]', error);
    return null;
  }
}
