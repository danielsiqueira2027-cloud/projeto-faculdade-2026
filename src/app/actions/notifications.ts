'use server';

import { prisma } from '@/lib/database';
import { getCurrentUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getNotifications() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return [];

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: currentUser.id },
      orderBy: { createdAt: 'desc' },
    });

    // Format relative time helper
    return notifications.map((n) => {
      const diffMs = Date.now() - new Date(n.createdAt).getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      let timeLabel = 'Agora mesmo';
      if (diffDays > 0) {
        timeLabel = `Há ${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
      } else if (diffHours > 0) {
        timeLabel = `Há ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
      } else if (diffMins > 0) {
        timeLabel = `Há ${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'}`;
      }

      return {
        id: n.id,
        title: n.title,
        time: timeLabel,
        read: n.read,
      };
    });
  } catch (error) {
    console.error('[getNotifications]', error);
    return [];
  }
}

export async function markNotificationAsRead(id: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: 'Não autorizado' };

  try {
    await prisma.notification.update({
      where: { id, userId: currentUser.id },
      data: { read: true },
    });
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('[markNotificationAsRead]', error);
    return { error: 'Erro ao marcar como lida' };
  }
}

export async function deleteNotification(id: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: 'Não autorizado' };

  try {
    await prisma.notification.delete({
      where: { id, userId: currentUser.id },
    });
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('[deleteNotification]', error);
    return { error: 'Erro ao excluir notificação' };
  }
}
