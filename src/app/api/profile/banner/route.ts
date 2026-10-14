import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/database';
import { uploadBanner, deleteFromStorage } from '@/lib/supabase/storage';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

/**
 * POST /api/profile/banner
 * Faz upload de um banner de capa para o perfil profissional.
 * Valida sessão, MIME e tamanho no servidor. O userId vem exclusivamente da sessão.
 */
export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Garante que o usuário tem perfil profissional
    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
      select: { id: true, bannerUrl: true },
    });
    if (!prof) {
      return NextResponse.json(
        { error: 'Perfil profissional não encontrado.' },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    // ── Validação de tipo MIME ────────────────────────────────────────────────
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Formato inválido. Use JPG, PNG ou WebP.' },
        { status: 400 }
      );
    }

    // ── Validação de tamanho (2 MB) ──────────────────────────────────────────
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. O limite para a capa é 2 MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = MIME_TO_EXT[file.type] || 'jpg';

    // ── Upload do novo banner ─────────────────────────────────────────────────
    const { url, path: newPath } = await uploadBanner(
      currentUser.id,
      buffer,
      ext,
      file.type
    );

    // ── Grava nova URL no banco ANTES de remover o antigo ─────────────────────
    const oldBannerUrl = prof.bannerUrl;
    await prisma.professional.update({
      where: { id: prof.id },
      data: { bannerUrl: url },
    });

    // ── Remove o arquivo antigo do Storage (falha não impeditiva) ─────────────
    if (oldBannerUrl) {
      const marker = '/storage/v1/object/public/uploads/';
      const idx = oldBannerUrl.indexOf(marker);
      if (idx !== -1) {
        const oldPath = decodeURIComponent(oldBannerUrl.substring(idx + marker.length));
        try {
          await deleteFromStorage([oldPath], 'uploads');
        } catch (delErr) {
          console.warn('[banner/POST] Falha ao remover capa antiga do Storage:', delErr);
          // Não falha a requisição; nova referência já foi gravada
          return NextResponse.json({
            success: true,
            url,
            warning: 'Capa atualizada, mas não foi possível remover a imagem anterior do Storage.',
          });
        }
      }
    }

    return NextResponse.json({ success: true, url, path: newPath });
  } catch (error: unknown) {
    console.error('[Banner Upload API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao salvar capa do perfil.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/profile/banner
 * Remove a capa personalizada do perfil profissional.
 * Se o Storage falhar, não zera a referência no banco e retorna erro.
 */
export async function DELETE() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
      select: { id: true, bannerUrl: true },
    });
    if (!prof) {
      return NextResponse.json(
        { error: 'Perfil profissional não encontrado.' },
        { status: 404 }
      );
    }

    if (!prof.bannerUrl) {
      return NextResponse.json({ success: true, message: 'Nenhuma capa para remover.' });
    }

    // ── Remove do Storage PRIMEIRO; se falhar, mantém a referência no banco ───
    const marker = '/storage/v1/object/public/uploads/';
    const idx = prof.bannerUrl.indexOf(marker);
    if (idx !== -1) {
      const oldPath = decodeURIComponent(prof.bannerUrl.substring(idx + marker.length));
      try {
        await deleteFromStorage([oldPath], 'uploads');
      } catch (delErr) {
        console.error('[banner/DELETE] Falha ao remover capa do Storage:', delErr);
        return NextResponse.json(
          { error: 'Não foi possível remover a imagem do Storage. A capa não foi alterada.' },
          { status: 500 }
        );
      }
    }

    // ── Zera a referência no banco somente após remoção bem-sucedida ──────────
    await prisma.professional.update({
      where: { id: prof.id },
      data: { bannerUrl: null },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('[Banner DELETE API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao remover capa.' },
      { status: 500 }
    );
  }
}
