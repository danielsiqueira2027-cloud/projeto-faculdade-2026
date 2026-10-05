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
  emailRedirectTo?: string;
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
  emailRedirectTo,
}: SignUpInput): Promise<SupabaseAuthResult> {
  const normalizedEmail = email.trim().toLowerCase();
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
    options: {
      ...(emailRedirectTo ? { emailRedirectTo } : {}),
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
      // Se já existe um usuário com este e-mail no Prisma (ex: seed ou recriação após exclusão no Auth),
      // sincroniza o ID antigo para o novo ID do Supabase Auth (CASCADE atualiza tabelas filhas).
      const existingByEmail = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (existingByEmail) {
        await prisma.user.update({
          where: { id: existingByEmail.id },
          data: {
            id: userId,
            name: name || existingByEmail.name,
            phone: phone || existingByEmail.phone,
          },
        });
      } else {
        await prisma.$transaction(async (tx) => {
          const newUser = await tx.user.create({
            data: {
              id: userId,
              name,
              email: normalizedEmail,
              phone: phone || null,
            },
          });

          if (tipo === 'cliente') {
            await tx.client.create({
              data: { userId: newUser.id },
            });
          }
          // Nota: para tipo === 'profissional', NÃO criamos linha vazia em Professional aqui.
          // A linha nasce exclusivamente em ativarProfissionalAction (upsert) com perfil completo.
        });
      }
    }
  } catch (err: unknown) {
    console.error('[supabaseSignUp sync error]', err);
    const prismaError = err as { code?: string; message?: string };
    if (prismaError?.code === 'P2002') {
      return {
        success: false,
        error: 'Este e-mail já está cadastrado. Faça login para continuar.',
      };
    }
    return {
      success: false,
      error: 'Erro ao registrar usuário no banco de dados. Tente novamente.',
    };
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
  const normalizedEmail = email.trim().toLowerCase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
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

    // Se o usuário não foi localizado pelo ID mas existe pelo e-mail,
    // sincroniza o ID no banco público com CASCADE.
    if (!profile && data.user.email) {
      const existingByEmail = await prisma.user.findUnique({
        where: { email: data.user.email.toLowerCase() },
      });
      if (existingByEmail) {
        await prisma.user.update({
          where: { id: existingByEmail.id },
          data: { id: data.user.id },
        });
        profile = await prisma.user.findUnique({
          where: { id: data.user.id },
          include: {
            client: { select: { id: true } },
            professional: { select: { id: true } },
          },
        });
      }
    }
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

    let dbUser = await prisma.user.findUnique({
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

    // Se não encontrou pelo ID do Supabase Auth, tenta auto-reconciliação pelo e-mail
    if (!dbUser && user.email) {
      const normalizedEmail = user.email.toLowerCase();
      const existingByEmail = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (existingByEmail) {
        await prisma.user.update({
          where: { id: existingByEmail.id },
          data: { id: user.id },
        });
      } else {
        const metadata = (user.user_metadata || {}) as Record<string, string | undefined>;
        await prisma.user.create({
          data: {
            id: user.id,
            name: metadata.name || user.email.split('@')[0],
            email: normalizedEmail,
            phone: metadata.phone || null,
          },
        });
        if (metadata.tipo === 'cliente') {
          await prisma.client.create({
            data: { userId: user.id },
          }).catch(() => {});
        }
      }

      dbUser = await prisma.user.findUnique({
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
    }

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
  } catch (err) {
    console.error('[getSupabaseUser error]', err);
    return null;
  }
}

export { updateSupabaseSession } from './middleware';

