import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/database';
import { uploadAvatar } from '@/lib/supabase/storage';

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

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
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

    // Lê os bytes do arquivo
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
    const { url } = await uploadAvatar(
      currentUser.id,
      buffer,
      ext,
      file.type
    );

    // Atualiza o banco de dados com a URL pública do Supabase Storage
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { avatarUrl: url },
    });

    return NextResponse.json({ success: true, url });
  } catch (error: unknown) {
    console.error('[Avatar Upload API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao salvar foto de perfil' },
      { status: 500 }
    );
  }
}

