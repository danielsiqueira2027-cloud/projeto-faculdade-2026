'use server';

import { getCurrentUser } from '@/lib/auth';
import { createServerClient } from '@/lib/supabase/server';

const AVATAR_BUCKET = 'profile-photos';
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export interface PrepareAvatarUploadResult {
  success: boolean;
  signedUrl?: string;
  path?: string;
  token?: string;
  publicUrl?: string;
  error?: string;
}

/**
 * Gera uma Signed Upload URL para que o cliente envie diretamente ao Supabase Storage.
 * O caminho é {user_id}/avatar/{uuid}.{ext}, garantindo que cada usuário escreva
 * apenas na própria pasta (validado pelo RLS do bucket profile-photos).
 *
 * Validação de MIME e tamanho ocorre no servidor antes de gerar a URL.
 */
export async function prepareAvatarUploadAction(fileMeta: {
  type: string;
  size: number;
}): Promise<PrepareAvatarUploadResult> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return { success: false, error: 'Não autorizado.' };
    }

    if (!ALLOWED_MIME_TYPES.includes(fileMeta.type)) {
      return {
        success: false,
        error: 'Formato de arquivo não suportado. Envie apenas JPG, PNG ou WebP.',
      };
    }

    if (fileMeta.size > MAX_FILE_SIZE_BYTES) {
      return {
        success: false,
        error: 'Arquivo muito grande. O limite máximo é de 5 MB.',
      };
    }

    const ext = MIME_TO_EXT[fileMeta.type] || 'jpg';
    const fileId = crypto.randomUUID();
    const storagePath = `${currentUser.id}/avatar/${fileId}.${ext}`;

    const supabase = await createServerClient();
    const { data, error } = await supabase.storage
      .from(AVATAR_BUCKET)
      .createSignedUploadUrl(storagePath);

    if (error || !data) {
      throw new Error(error?.message || 'Erro ao gerar URL de upload.');
    }

    const { data: publicData } = supabase.storage
      .from(AVATAR_BUCKET)
      .getPublicUrl(storagePath);

    return {
      success: true,
      signedUrl: data.signedUrl,
      path: data.path,
      token: data.token,
      publicUrl: publicData.publicUrl,
    };
  } catch (err: unknown) {
    console.error(
      '[prepareAvatarUploadAction]',
      err instanceof Error ? err.message : 'Erro desconhecido'
    );
    return { success: false, error: 'Falha ao autorizar upload de foto.' };
  }
}

/**
 * Remove um arquivo de avatar antigo do bucket profile-photos via Storage API.
 * Valida que o caminho pertence ao próprio usuário.
 */
export async function deleteAvatarFromStorageAction(path: string): Promise<{ success: boolean; error?: string }> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return { success: false, error: 'Não autorizado.' };
    }

    // Garante que o path começa com o próprio user_id
    if (!path.startsWith(`${currentUser.id}/`)) {
      return { success: false, error: 'Acesso negado ao arquivo.' };
    }

    const supabase = await createServerClient();
    const { error } = await supabase.storage.from(AVATAR_BUCKET).remove([path]);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  } catch (err: unknown) {
    console.error(
      '[deleteAvatarFromStorageAction]',
      err instanceof Error ? err.message : 'Erro'
    );
    return { success: false, error: 'Falha ao remover foto anterior.' };
  }
}
