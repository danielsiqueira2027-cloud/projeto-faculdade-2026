import 'server-only';
import { createClient } from '@supabase/supabase-js';

/**
 * Cliente administrativo do Supabase com privilégios de service_role.
 * ATENÇÃO: Nunca importar nem utilizar este cliente no lado do cliente (browser).
 */
export function createAdminClient() {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error('SUPABASE_URL não configurada nas variáveis de ambiente.');
  }

  if (!serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
