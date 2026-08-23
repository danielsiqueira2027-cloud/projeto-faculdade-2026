import 'server-only';
import { createClient as createServerClient } from './server';
import { prisma } from '@/lib/database';
import type { SessionUser } from '@/lib/auth';
import type { User, Session } from '@supabase/supabase-js';

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  tipo?: 'cliente' | 'profissional';
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SupabaseAuthResult {
  success: boolean;
  user?: (User & { profile?: unknown }) | User | null;
  session?: Session | null;
  error?: string;
}

/**
 * Cadastro de novo usuário via Supabase Auth.
 * Cria o registro em auth.users e sincroniza na tabela pública users do Prisma.
 */
export async function supabaseSignUp({
  name,
  email,
  password,
  phone,
  tipo = 'cliente',
}: SignUpInput): Promise<SupabaseAuthResult> {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone: phone || null,
        tipo,
      },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  if (!data.user) {
    return { success: false, error: 'Não foi possível criar o usuário no Supabase Auth.' };
  }

  // No Supabase com confirmação de e-mail / proteção contra enumeração,
  // quando o e-mail já existe, o Supabase retorna um usuário com identities vazio ([]).
  if (data.user.identities && data.user.identities.length === 0) {
    return { success: false, error: 'User already registered' };
  }

  const userId = data.user.id;

  // Sincroniza o usuário criado no Supabase com o banco de dados público via Prisma
  try {
    const existing = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existing) {
      await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            id: userId,
            name,
            email: email.toLowerCase(),
            phone: phone || null,
            password: '', // Gerenciado de forma segura pelo Supabase Auth
          },
        });

        if (tipo === 'cliente') {
          await tx.client.create({
            data: { userId: newUser.id },
          });
        } else {
          await tx.professional.create({
            data: { userId: newUser.id },
          });
        }
      });
    }
  } catch (err) {
    console.error('[supabaseSignUp sync error]', err);
    // Mesmo se falhar na sincronização do Prisma, o usuário foi criado no Supabase Auth
  }

  return {
    success: true,
    user: data.user,
    session: data.session,
  };
}

/**
 * Login com e-mail e senha via Supabase Auth.
 */
export async function supabaseSignIn({
  email,
  password,
}: SignInInput): Promise<SupabaseAuthResult> {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  if (!data.user) {
    return { success: false, error: 'Não foi possível autenticar o usuário.' };
  }

  // Busca perfil no banco de dados
  let profile = null;
  try {
    profile = await prisma.user.findUnique({
      where: { id: data.user.id },
      include: {
        client: { select: { id: true } },
        professional: { select: { id: true } },
      },
    });
  } catch (e) {
    console.error('[supabaseSignIn profile fetch error]', e);
  }

  return {
    success: true,
    user: {
      ...data.user,
      profile,
    },
    session: data.session,
  };
}

/**
 * Encerra a sessão ativa no Supabase Auth.
 */
export async function supabaseSignOut(): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Obtém o usuário atual autenticado via Supabase Auth no servidor.
 */
export async function getSupabaseUser(): Promise<SessionUser | null> {
  try {
    const supabase = await createServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatarUrl: true,
        isActive: true,
        client: { select: { id: true } },
        professional: { select: { id: true } },
      },
    });

    if (!dbUser || !dbUser.isActive) {
      return null;
    }

    return {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      phone: dbUser.phone,
      avatarUrl: dbUser.avatarUrl,
      hasClient: !!dbUser.client,
      hasProfessional: !!dbUser.professional,
    };
  } catch {
    return null;
  }
}

export { updateSupabaseSession } from './middleware';

