import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/database';

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

    // Caminho da pasta correspondente no diretório public/
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'chat', `pedido_${orderId}`);
    
    // Cria as pastas se não existirem
    await fs.mkdir(uploadDir, { recursive: true });

    // Gera um nome seguro mantendo a extensão
    const ext = path.extname(file.name) || '.jpg';
    const timestamp = Date.now();
    const filename = `foto_${timestamp}${ext}`;
    const filePath = path.join(uploadDir, filename);

    // Grava o arquivo localmente
    await fs.writeFile(filePath, buffer);

    // Caminho público que será salvo no banco e exibido nas páginas
    const relativeUrl = `/uploads/chat/pedido_${orderId}/${filename}`;

    return NextResponse.json({ success: true, url: relativeUrl });
  } catch (error: any) {
    console.error('[Upload API Error]', error);
    return NextResponse.json({ error: 'Erro interno ao salvar arquivo localmente' }, { status: 500 });
  }
}
