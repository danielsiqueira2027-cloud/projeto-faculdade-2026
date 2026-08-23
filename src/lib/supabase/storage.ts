import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createServerClient } from './server';

/**
 * Cliente Supabase com escopo para operações de Storage (SSR com fallback para anon client)
 */
export async function getStorageClient() {
  try {
    return await createServerClient();
  } catch {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL ou Anon Key ausente nas variáveis de ambiente');
    }
    return createSupabaseClient(supabaseUrl, supabaseAnonKey);
  }
}

export interface UploadOptions {
  bucket?: string;
  path: string;
  file: File | Blob | Buffer | Uint8Array | ArrayBuffer;
  contentType?: string;
  upsert?: boolean;
}

export interface UploadResult {
  url: string;
  path: string;
}

/**
 * Faz upload de um arquivo para o Supabase Storage e retorna a URL pública.
 * @param options Opções de upload contendo o arquivo, caminho e bucket (padrão: 'uploads')
 */
export async function uploadToStorage({
  bucket = 'uploads',
  path,
  file,
  contentType,
  upsert = true,
}: UploadOptions): Promise<UploadResult> {
  const supabase = await getStorageClient();

  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType,
    upsert,
  });

  if (error) {
    throw new Error(`Falha no upload para o Supabase Storage: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return {
    url: publicUrlData.publicUrl,
    path: data.path,
  };
}

/**
 * Retorna a URL pública de um arquivo no Supabase Storage.
 */
export async function getStoragePublicUrl(path: string, bucket = 'uploads'): Promise<string> {
  const supabase = await getStorageClient();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Remove um ou mais arquivos do Supabase Storage.
 */
export async function deleteFromStorage(paths: string[], bucket = 'uploads'): Promise<void> {
  const supabase = await getStorageClient();
  const { error } = await supabase.storage.from(bucket).remove(paths);
  if (error) {
    throw new Error(`Erro ao remover arquivo do Supabase Storage: ${error.message}`);
  }
}

/**
 * Helper específico para upload de fotos de perfil (avatars)
 */
export async function uploadAvatar(
  userId: string,
  file: File | Blob | Buffer | Uint8Array | ArrayBuffer,
  fileExtension = 'jpg',
  contentType = 'image/jpeg'
): Promise<UploadResult> {
  const cleanExt = fileExtension.replace(/^\./, '');
  const filename = `${userId}-${Date.now()}.${cleanExt}`;
  const path = `avatars/${filename}`;
  return uploadToStorage({
    bucket: 'uploads',
    path,
    file,
    contentType,
    upsert: true,
  });
}

/**
 * Helper específico para upload de imagens de serviços / portfólio
 */
export async function uploadServiceImage(
  identifier: string,
  file: File | Blob | Buffer | Uint8Array | ArrayBuffer,
  fileExtension = 'jpg',
  contentType = 'image/jpeg'
): Promise<UploadResult> {
  const cleanExt = fileExtension.replace(/^\./, '');
  const filename = `${identifier}-${Date.now()}.${cleanExt}`;
  const path = `services/${filename}`;
  return uploadToStorage({
    bucket: 'uploads',
    path,
    file,
    contentType,
    upsert: true,
  });
}

/**
 * Helper específico para upload de imagens de chat
 */
export async function uploadChatImage(
  orderId: string,
  file: File | Blob | Buffer | Uint8Array | ArrayBuffer,
  fileExtension = 'jpg',
  contentType = 'image/jpeg'
): Promise<UploadResult> {
  const cleanExt = fileExtension.replace(/^\./, '');
  const filename = `${Date.now()}.${cleanExt}`;
  const path = `chat/pedido_${orderId}/${filename}`;
  return uploadToStorage({
    bucket: 'uploads',
    path,
    file,
    contentType,
    upsert: true,
  });
}
