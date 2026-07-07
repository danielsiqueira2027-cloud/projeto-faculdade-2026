import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/database';

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

    // Read bytes
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload folder
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'avatars');
    await fs.mkdir(uploadDir, { recursive: true });

    // Try to remove old avatar if it exists locally
    if (currentUser.avatarUrl && currentUser.avatarUrl.startsWith('/uploads/avatars/')) {
      try {
        const oldFileName = path.basename(currentUser.avatarUrl.split('?')[0]);
        const oldFilePath = path.join(uploadDir, oldFileName);
        await fs.unlink(oldFilePath);
      } catch (e) {
        console.warn('[Avatar Upload API] Could not delete old avatar:', e);
      }
    }

    // ── Gera nome seguro ignorando extensão original do cliente ──────────
    const mimeToExt: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
      'image/gif': '.gif',
    };
    const ext = mimeToExt[file.type] || '.jpg';
    const filename = `avatar_${currentUser.id}_${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, filename);

    // Save locally
    await fs.writeFile(filePath, buffer);

    const relativeUrl = `/uploads/avatars/${filename}`;

    // Update the database immediately
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { avatarUrl: relativeUrl },
    });

    return NextResponse.json({ success: true, url: relativeUrl });
  } catch (error: any) {
    console.error('[Avatar Upload API Error]', error);
    return NextResponse.json({ error: 'Erro ao salvar foto de perfil' }, { status: 500 });
  }
}
