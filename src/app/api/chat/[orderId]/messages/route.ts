import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/database';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { orderId } = await params;

    // Busca o pedido, a sala e verifica a segurança
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        client: true,
        professional: true,
        chatRoom: true,
      },
    });

    if (!order || !order.chatRoom) {
      return NextResponse.json({ error: 'Chat não encontrado' }, { status: 404 });
    }

    const isClient = order.client.userId === currentUser.id;
    const isProfessional = order.professional.userId === currentUser.id;

    if (!isClient && !isProfessional) {
      return NextResponse.json({ error: 'Acesso negado para este pedido' }, { status: 403 });
    }

    // Busca as mensagens em ordem cronológica
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

    const formattedMessages = messages.map((m) => ({
      id: m.id,
      senderId: m.senderId,
      senderName: m.sender.name,
      type: m.type as 'texto' | 'imagem',
      content: m.content,
      createdAt: m.createdAt,
      isMe: m.senderId === currentUser.id,
    }));

    // Retorna as mensagens com cabeçalhos para prevenir caching agressivo no navegador
    return NextResponse.json(
      { messages: formattedMessages, orderStatus: order.status },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error: any) {
    console.error('[Messages Polling API Error]', error);
    return NextResponse.json({ error: 'Erro interno ao carregar mensagens' }, { status: 500 });
  }
}
