'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/database';
import { createSession, deleteSession } from '@/lib/session';

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

  // Busca o usuário no banco
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: 'E-mail ou senha incorretos.' };
  }

  // Verifica senha
  const senhaCorreta = await bcrypt.compare(password, user.password);
  if (!senhaCorreta) {
    return { error: 'E-mail ou senha incorretos.' };
  }

  // Cria sessão JWT em cookie httpOnly
  await createSession(user.id);
  redirect('/');
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

  // Verifica se e-mail já existe
  const existente = await prisma.user.findUnique({ where: { email } });
  if (existente) {
    return {
      fieldErrors: { email: 'Este e-mail já está cadastrado.' },
      fields: {
        name: name || '',
        email: email || '',
        phone: phone || '',
        tipo: tipo || 'cliente',
      }
    };
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria o usuário e o perfil correto em uma transação
  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: { name, email, phone, password: hashedPassword },
    });

    if (tipo === 'cliente') {
      await tx.client.create({ data: { userId: newUser.id } });
    } else {
      // Profissional: cria o registro base (sem dados extras ainda)
      await tx.professional.create({ data: { userId: newUser.id } });
    }

    return newUser;
  });

  // Cria sessão
  await createSession(user.id);

  // Redireciona para a tela correta
  if (tipo === 'profissional') {
    redirect('/seja-profissional/ativar');
  } else {
    redirect('/');
  }
}

// ─── LOGOUT ───────────────────────────────────────────────────────────────────

export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect('/');
}

// ─── ATIVAR PERFIL PROFISSIONAL ───────────────────────────────────────────────

export async function ativarProfissionalAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const { getSessionPayload } = await import('@/lib/session');
  const payload = await getSessionPayload();
  if (!payload?.userId) redirect('/login');

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
        where: { userId: payload.userId },
        create: {
          userId: payload.userId,
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
