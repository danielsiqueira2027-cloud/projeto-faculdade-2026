import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/database';
import { uploadChatImage } from '@/lib/supabase/storage';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const orderId = formData.get('orderId') as string | null;

    if (!file || !orderId) {
      return NextResponse.json({ error: 'Arquivo ou ID do pedido ausente' }, { status: 400 });
    }

    // ── Validação de tipo MIME ────────────────────────────────────────────
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo não permitido. Envie uma imagem JPG, PNG, WebP ou GIF.' },
        { status: 400 }
      );
    }

    // ── Validação de tamanho (5MB) ────────────────────────────────────────
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. O limite é 5MB.' },
        { status: 400 }
      );
    }

    // Valida o pedido e a permissão do usuário
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        client: true,
        professional: true,
        chatRoom: true,
      },
    });

    if (!order || !order.chatRoom) {
      return NextResponse.json({ error: 'Pedido ou sala de chat não encontrados' }, { status: 404 });
    }

    const isClient = order.client.userId === currentUser.id;
    const isProfessional = order.professional.userId === currentUser.id;

    if (!isClient && !isProfessional) {
      return NextResponse.json({ error: 'Acesso negado para este pedido' }, { status: 403 });
    }

    if (order.status !== 'EM_ANDAMENTO') {
      return NextResponse.json({ error: 'Não é permitido enviar imagens para pedidos concluídos, cancelados ou pendentes' }, { status: 400 });
    }

    // Lê os bytes do arquivo enviado
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ── Determina extensão segura ─────────────────────────────────────────
    const mimeToExt: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif',
    };
    const ext = mimeToExt[file.type] || 'jpg';

    // ── Faz o upload no Supabase Storage ───────────────────────────────────
    const { url } = await uploadChatImage(
      orderId,
      buffer,
      ext,
      file.type
    );

    return NextResponse.json({ success: true, url });
  } catch (error: unknown) {
    console.error('[Upload API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro interno ao salvar arquivo' },
      { status: 500 }
    );
  }
}

