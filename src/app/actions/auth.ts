'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/database';
import {
  supabaseSignUp,
  supabaseSignIn,
  supabaseSignOut,
  getSupabaseUser,
} from '@/lib/supabase/auth';

// ─── Tipos de estado retornado pelas actions ──────────────────────────────────

export type AuthState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  fields?: Record<string, string>;
} | null;

// ─── LOGIN ────────────────────────────────────────────────────────────────────

export async function loginAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const password = formData.get('password') as string;

  // Validação básica
  if (!email || !password) {
    return { error: 'Preencha e-mail e senha.' };
  }

  const result = await supabaseSignIn({ email, password });

  if (!result.success) {
    const errorMsg = result.error || '';
    if (
      errorMsg.toLowerCase().includes('invalid login credentials') ||
      errorMsg.toLowerCase().includes('invalid credential') ||
      errorMsg.toLowerCase().includes('invalid grant')
    ) {
      return { error: 'E-mail ou senha incorretos.' };
    }
    return { error: result.error || 'E-mail ou senha incorretos.' };
  }

  const userProfile = (result.user as unknown as { profile?: { isActive?: boolean; client?: unknown; professional?: unknown } })?.profile;
  if (userProfile && userProfile.isActive === false) {
    await supabaseSignOut();
    return { error: 'Conta suspensa. Entre em contato com o suporte.' };
  }

  const hasClient = !!userProfile?.client;
  const hasProfessional = !!userProfile?.professional;

  if (hasProfessional && !hasClient) {
    redirect('/dashboard/profissional');
  } else {
    redirect('/');
  }
}

// ─── REGISTRO ─────────────────────────────────────────────────────────────────

export async function registerAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name     = (formData.get('name') as string)?.trim();
  const email    = (formData.get('email') as string)?.trim().toLowerCase();
  const phone    = (formData.get('phone') as string)?.trim() || null;
  const password = formData.get('password') as string;
  const confirm  = formData.get('confirm') as string;
  const tipo     = formData.get('tipo') as 'cliente' | 'profissional';

  // Validações
  const fieldErrors: Record<string, string> = {};
  if (!name || name.length < 2)         fieldErrors.name     = 'Nome precisa ter pelo menos 2 caracteres.';
  if (!email || !email.includes('@'))    fieldErrors.email    = 'E-mail inválido.';
  if (!password || password.length < 6) fieldErrors.password = 'Senha deve ter pelo menos 6 caracteres.';
  if (password !== confirm)              fieldErrors.confirm  = 'As senhas não coincidem.';

  if (Object.keys(fieldErrors).length > 0) {
    return {
      fieldErrors,
      fields: {
        name: name || '',
        email: email || '',
        phone: phone || '',
        tipo: tipo || 'cliente',
      }
    };
  }

  const result = await supabaseSignUp({
    name,
    email,
    password,
    phone,
    tipo: tipo || 'cliente',
  });

  if (!result.success) {
    const errorMsg = result.error || '';
    if (
      errorMsg.toLowerCase().includes('already registered') ||
      errorMsg.toLowerCase().includes('already in use') ||
      errorMsg.toLowerCase().includes('already exists') ||
      errorMsg.toLowerCase().includes('duplicate') ||
      errorMsg.toLowerCase().includes('user already exists')
    ) {
      return {
        fieldErrors: { email: 'Este e-mail já está cadastrado.' },
        fields: {
          name: name || '',
          email: email || '',
          phone: phone || '',
          tipo: tipo || 'cliente',
        },
      };
    }

    return {
      error: result.error || 'Erro ao criar conta. Tente novamente.',
      fields: {
        name: name || '',
        email: email || '',
        phone: phone || '',
        tipo: tipo || 'cliente',
      },
    };
  }

  // Redireciona para a tela correta
  if (tipo === 'profissional') {
    redirect('/seja-profissional/ativar');
  } else {
    redirect('/');
  }
}

// ─── LOGOUT ───────────────────────────────────────────────────────────────────

export async function logoutAction(): Promise<void> {
  await supabaseSignOut();
  redirect('/');
}

// ─── ATIVAR PERFIL PROFISSIONAL ───────────────────────────────────────────────

export async function ativarProfissionalAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const currentUser = await getSupabaseUser();
  if (!currentUser?.id) redirect('/login');

  const bio         = (formData.get('bio') as string)?.trim() || null;
  const experiencia = (formData.get('experiencia') as string)?.trim() || null;
  const cpf         = (formData.get('cpf') as string)?.trim() || null;
  const phone       = (formData.get('phone') as string)?.trim() || null;

  // Endereço
  const addressCep          = (formData.get('cep') as string)?.trim() || null;
  const addressStreet       = (formData.get('logradouro') as string)?.trim() || null;
  const addressNumber       = (formData.get('numero') as string)?.trim() || null;
  const addressNeighborhood = (formData.get('bairro') as string)?.trim() || null;
  const addressCity         = (formData.get('cidade') as string)?.trim() || null;
  const addressState        = (formData.get('estado') as string)?.trim() || null;

  // Categorias selecionadas (campo oculto com JSON)
  const categoriesRaw = formData.get('categories') as string;
  const categoryIds: string[] = categoriesRaw ? JSON.parse(categoriesRaw) : [];

  try {
    await prisma.$transaction(async (tx) => {
      // Upsert: pode já existir o Professional (criado no cadastro)
      const prof = await tx.professional.upsert({
        where: { userId: currentUser.id },
        create: {
          userId: currentUser.id,
          bio,
          phone,
          cpf,
          addressCep,
          addressStreet,
          addressNumber,
          addressNeighborhood,
          addressCity,
          addressState,
          specialty: experiencia,
        },
        update: {
          bio,
          phone,
          cpf,
          addressCep,
          addressStreet,
          addressNumber,
          addressNeighborhood,
          addressCity,
          addressState,
          specialty: experiencia,
        },
      });

      // Remove categorias antigas e insere as novas
      await tx.professionalCategory.deleteMany({
        where: { professionalId: prof.id },
      });

      // Busca os IDs reais das categorias pelo slug
      if (categoryIds.length > 0) {
        const cats = await tx.category.findMany({
          where: { slug: { in: categoryIds } },
          select: { id: true },
        });

        await tx.professionalCategory.createMany({
          data: cats.map((c) => ({ professionalId: prof.id, categoryId: c.id })),
          skipDuplicates: true,
        });
      }
    });
  } catch (e) {
    console.error('[ativarProfissionalAction]', e);
    return { error: 'Erro ao salvar perfil. Tente novamente.' };
  }

  redirect('/dashboard/profissional');
}

export async function getCurrentUserAction() {
  return await getSupabaseUser();
}
