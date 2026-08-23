import 'server-only';
import { getSupabaseUser } from '@/lib/supabase/auth';

// Tipo retornado com os perfis incluídos
export type SessionUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  hasClient: boolean;
  hasProfessional: boolean;
};

/**
 * Lê a sessão ativa do Supabase Auth e busca o usuário no banco
 * com seus perfis (client + professional).
 * Retorna null se não autenticado, inativo ou se o usuário não existir.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  return getSupabaseUser();
}

