import 'server-only';
import { cache } from 'react';
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
 * Memoizado por requisição via React cache() para evitar queries duplicadas.
 * Retorna null se não autenticado, inativo ou se o usuário não existir.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  return getSupabaseUser();
});


