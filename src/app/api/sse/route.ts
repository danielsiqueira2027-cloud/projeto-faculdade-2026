import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { appEvents } from '@/lib/events';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userId = currentUser.id;
  const encoder = new TextEncoder();

  const customReadable = new ReadableStream({
    start(controller) {
      // Send connection established event
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'connected' })}\n\n`));

      const onMessage = (data: any) => {
        controller.enqueue(encoder.encode(`event: message\ndata: ${JSON.stringify(data)}\n\n`));
      };

      const onOrder = (data: any) => {
        controller.enqueue(encoder.encode(`event: order\ndata: ${JSON.stringify(data)}\n\n`));
      };

      const onNotification = (data: any) => {
        controller.enqueue(encoder.encode(`event: notification\ndata: ${JSON.stringify(data)}\n\n`));
      };

      const onAppointment = (data: any) => {
        controller.enqueue(encoder.encode(`event: appointment\ndata: ${JSON.stringify(data)}\n\n`));
      };

      // Listen to events targeting this specific user ID
      appEvents.on(`message:${userId}`, onMessage);
      appEvents.on(`order:${userId}`, onOrder);
      appEvents.on(`notification:${userId}`, onNotification);
      appEvents.on(`appointment:${userId}`, onAppointment);

      // 15 seconds keep-alive ping
      const keepAlive = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': ping\n\n'));
        } catch {
          // Stream might be closed
          clearInterval(keepAlive);
        }
      }, 15000);

      req.signal.addEventListener('abort', () => {
        clearInterval(keepAlive);
        appEvents.off(`message:${userId}`, onMessage);
        appEvents.off(`order:${userId}`, onOrder);
        appEvents.off(`notification:${userId}`, onNotification);
        appEvents.off(`appointment:${userId}`, onAppointment);
        try {
          controller.close();
        } catch {
          // Already closed
        }
      });
    },
  });

  return new Response(customReadable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
