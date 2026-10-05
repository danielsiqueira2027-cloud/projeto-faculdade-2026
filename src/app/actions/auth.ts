'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/database';
import {
  supabaseSignUp,
  supabaseSignIn,
  supabaseSignOut,
  getSupabaseUser,
} from '@/lib/supabase/auth';
import { cifrarCPF, hashCPF } from '@/lib/crypto';
import { validarCpfOuCnpj, validarTelefoneBR, normalizarTelefone, validarRedirectSeguro } from '@/lib/validators';

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
  const userMetadataTipo = (result.user as { user_metadata?: { tipo?: string } })?.user_metadata?.tipo;

  const rawNext = (formData.get('next') as string) || (formData.get('callbackUrl') as string);
  const safeNext = validarRedirectSeguro(rawNext);

  if (safeNext) {
    redirect(safeNext);
  } else if (hasProfessional && !hasClient) {
    redirect('/dashboard/profissional');
  } else if (!hasClient && !hasProfessional && userMetadataTipo === 'profissional') {
    redirect('/seja-profissional/ativar');
  } else {
    redirect('/');
  }
}

// ─── REGISTRO DE CLIENTE ──────────────────────────────────────────────────────

export async function registerAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name     = (formData.get('name') as string)?.trim();
  const email    = (formData.get('email') as string)?.trim().toLowerCase();
  const rawPhone = (formData.get('phone') as string)?.trim() || '';
  const password = formData.get('password') as string;
  const confirm  = formData.get('confirm') as string;
  const rawNext  = (formData.get('next') as string) || '';

  // Validações no servidor
  const fieldErrors: Record<string, string> = {};
  if (!name || name.length < 2) {
    fieldErrors.name = 'Nome precisa ter pelo menos 2 caracteres.';
  }
  if (!email || !email.includes('@') || !email.includes('.')) {
    fieldErrors.email = 'Informe um e-mail válido.';
  }
  if (rawPhone && !validarTelefoneBR(rawPhone)) {
    fieldErrors.phone = 'Informe um telefone celular ou fixo válido com DDD.';
  }
  if (!password || password.length < 8) {
    fieldErrors.password = 'A senha deve ter pelo menos 8 caracteres.';
  }
  if (password !== confirm) {
    fieldErrors.confirm = 'As senhas não coincidem.';
  }

  const currentFields: Record<string, string> = {
    name: name || '',
    email: email || '',
    phone: rawPhone,
    next: rawNext,
  };

  if (Object.keys(fieldErrors).length > 0) {
    return {
      fieldErrors,
      fields: currentFields,
    };
  }

  const safeNext = validarRedirectSeguro(rawNext);
  const targetRedirect = safeNext || '/';

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || '';
  const emailRedirectTo = siteUrl ? `${siteUrl}/auth/callback?next=${encodeURIComponent(targetRedirect)}` : undefined;
  const sanitizedPhone = rawPhone ? normalizarTelefone(rawPhone).slice(0, 20) : null;

  // Força tipo='cliente' no servidor (ignora qualquer valor do form)
  const result = await supabaseSignUp({
    name,
    email,
    password,
    phone: sanitizedPhone,
    tipo: 'cliente',
    emailRedirectTo,
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
        fields: currentFields,
      };
    }

    return {
      error: result.error || 'Erro ao criar conta. Tente novamente.',
      fields: currentFields,
    };
  }

  redirect(targetRedirect);
}

// ─── REGISTRO DE PROFISSIONAL ─────────────────────────────────────────────────

export async function registerProfissionalAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name     = (formData.get('name') as string)?.trim();
  const email    = (formData.get('email') as string)?.trim().toLowerCase();
  const rawPhone = (formData.get('phone') as string)?.trim() || '';
  const password = formData.get('password') as string;
  const confirm  = formData.get('confirm') as string;
  const termos   = formData.get('termos');
  const rawNext  = (formData.get('next') as string) || '';

  // Validações no servidor
  const fieldErrors: Record<string, string> = {};
  if (!name || name.length < 2) {
    fieldErrors.name = 'Nome precisa ter pelo menos 2 caracteres.';
  }
  if (!email || !email.includes('@') || !email.includes('.')) {
    fieldErrors.email = 'Informe um e-mail válido.';
  }
  // Telefone obrigatório para profissionais com validação completa (celular 11 dígitos ou fixo 10 dígitos)
  if (!rawPhone) {
    fieldErrors.phone = 'Telefone com DDD é obrigatório.';
  } else if (!validarTelefoneBR(rawPhone)) {
    fieldErrors.phone = 'Informe um telefone celular ou fixo válido com DDD.';
  }
  if (!password || password.length < 8) {
    fieldErrors.password = 'A senha deve ter pelo menos 8 caracteres.';
  }
  if (password !== confirm) {
    fieldErrors.confirm = 'As senhas não coincidem.';
  }
  if (termos !== 'on' && termos !== 'true') {
    fieldErrors.termos = 'Você deve concordar com os termos de uso para continuar.';
  }

  const currentFields: Record<string, string> = {
    name: name || '',
    email: email || '',
    phone: rawPhone,
    next: rawNext,
  };

  if (Object.keys(fieldErrors).length > 0) {
    return {
      fieldErrors,
      fields: currentFields,
    };
  }

  const safeNext = validarRedirectSeguro(rawNext);
  const targetRedirect = safeNext || '/seja-profissional/ativar';

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || '';
  const emailRedirectTo = siteUrl ? `${siteUrl}/auth/callback?next=${encodeURIComponent(targetRedirect)}` : undefined;
  const sanitizedPhone = normalizarTelefone(rawPhone).slice(0, 20);

  // Cadastro de profissional: cria User no Supabase Auth e no Prisma,
  // mas NÃO cria linha em professionals (nascerá em ativarProfissionalAction).
  const result = await supabaseSignUp({
    name,
    email,
    password,
    phone: sanitizedPhone,
    tipo: 'profissional',
    emailRedirectTo,
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
        fields: currentFields,
      };
    }

    return {
      error: result.error || 'Erro ao criar conta. Tente novamente.',
      fields: currentFields,
    };
  }

  redirect(targetRedirect);
}

// ─── LOGOUT ───────────────────────────────────────────────────────────────────

export async function logoutAction(): Promise<void> {
  await supabaseSignOut();
  redirect('/');
}

// ─── ATIVAR PERFIL PROFISSIONAL ───────────────────────────────────────────────

const UFS_VALIDAS = new Set([
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]);

export async function ativarProfissionalAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const currentUser = await getSupabaseUser();
  if (!currentUser?.id) redirect('/login?next=/seja-profissional/ativar');

  const bio         = (formData.get('bio') as string)?.trim() || null;
  const experiencia = (formData.get('experiencia') as string)?.trim() || null;
  const rawCpf      = (formData.get('cpf') as string)?.trim() || null;
  const rawPhone    = (formData.get('phone') as string)?.trim() || null;

  // Endereço
  const addressCep          = (formData.get('cep') as string)?.trim() || null;
  const addressStreet       = (formData.get('logradouro') as string)?.trim() || null;
  const addressNumber       = (formData.get('numero') as string)?.trim() || null;
  const addressNeighborhood = (formData.get('bairro') as string)?.trim() || null;
  const addressCity         = (formData.get('cidade') as string)?.trim() || null;
  const addressState        = (formData.get('estado') as string)?.trim()?.toUpperCase() || null;

  // Categorias selecionadas (campo oculto com JSON)
  const categoriesRaw = formData.get('categories') as string;
  let categoryIds: string[] = [];
  try {
    categoryIds = categoriesRaw ? JSON.parse(categoriesRaw) : [];
  } catch {
    categoryIds = [];
  }

  // Mapa de campos preenchidos para preservação em caso de erro
  const currentFields: Record<string, string> = {
    cpf: rawCpf || '',
    phone: rawPhone || '',
    bio: bio || '',
    experiencia: experiencia || '',
    cep: addressCep || '',
    logradouro: addressStreet || '',
    numero: addressNumber || '',
    bairro: addressNeighborhood || '',
    cidade: addressCity || '',
    estado: addressState || '',
    categories: categoriesRaw || '[]',
  };

  const fieldErrors: Record<string, string> = {};

  // 1. Validação de CPF / CNPJ
  if (!rawCpf) {
    fieldErrors.cpf = 'Informe seu CPF ou CNPJ.';
  } else {
    const docCheck = validarCpfOuCnpj(rawCpf);
    if (!docCheck.valido) {
      const cleanLen = rawCpf.replace(/\D/g, '').length;
      fieldErrors.cpf = cleanLen > 11
        ? 'CNPJ inválido. Verifique os dígitos.'
        : 'CPF inválido. Verifique os dígitos.';
    }
  }

  // 2. Validação de Telefone
  if (!rawPhone) {
    fieldErrors.phone = 'Informe o telefone de contato profissional.';
  } else if (!validarTelefoneBR(rawPhone)) {
    fieldErrors.phone = 'Telefone inválido. Informe DDD e número válidos (10 ou 11 dígitos).';
  }

  // 3. Validação da Bio (mín. 20, máx. 1000)
  if (!bio) {
    fieldErrors.bio = 'Preencha um resumo sobre sua experiência profissional.';
  } else if (bio.length < 20) {
    fieldErrors.bio = 'A bio deve ter pelo menos 20 caracteres.';
  } else if (bio.length > 1000) {
    fieldErrors.bio = 'A bio deve ter no máximo 1000 caracteres.';
  }

  // 4. Validação de Categorias
  if (categoryIds.length === 0) {
    fieldErrors.categories = 'Selecione pelo menos uma especialidade.';
  }

  // 5. Validação do CEP (8 dígitos numéricos)
  const cepDigits = addressCep ? addressCep.replace(/\D/g, '') : '';
  if (!cepDigits || cepDigits.length !== 8) {
    fieldErrors.cep = 'Informe um CEP válido com 8 dígitos.';
  }

  // 6. Validação de UF (27 siglas brasileiras)
  if (!addressState || !UFS_VALIDAS.has(addressState)) {
    fieldErrors.estado = 'Informe uma UF válida (ex: SP, RJ, MG).';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      fieldErrors,
      fields: currentFields,
    };
  }

  // Sanitização do telefone: grava apenas dígitos (<= 20 caracteres, sem estourar VARCHAR)
  const sanitizedPhone = normalizarTelefone(rawPhone!).slice(0, 20);

  // Formatação do CEP para persistência
  const formattedCep = cepDigits.length === 8 ? `${cepDigits.slice(0, 5)}-${cepDigits.slice(5)}` : cepDigits;

  let cpfEncrypted: string | null = null;
  let cpfHash: string | null = null;

  if (rawCpf) {
    cpfHash = hashCPF(rawCpf);
    cpfEncrypted = cifrarCPF(rawCpf);

    // Validação de unicidade por hash para evitar duplicidade
    const existingCpf = await prisma.professional.findFirst({
      where: {
        cpfHash,
        userId: { not: currentUser.id },
      },
    });

    if (existingCpf) {
      return {
        fieldErrors: { cpf: 'Este CPF/CNPJ já está cadastrado em outra conta.' },
        fields: currentFields,
      };
    }
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Upsert: pode já existir o Professional (criado no cadastro)
      const prof = await tx.professional.upsert({
        where: { userId: currentUser.id },
        create: {
          userId: currentUser.id,
          bio,
          phone: sanitizedPhone,
          cpfEncrypted,
          cpfHash,
          addressCep: formattedCep,
          addressStreet,
          addressNumber,
          addressNeighborhood,
          addressCity,
          addressState,
          specialty: experiencia,
        },
        update: {
          bio,
          phone: sanitizedPhone,
          ...(rawCpf ? { cpfEncrypted, cpfHash } : {}),
          addressCep: formattedCep,
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
    return {
      error: 'Erro ao salvar perfil. Tente novamente.',
      fields: currentFields,
    };
  }

  redirect('/dashboard/profissional');
}

export async function getCurrentUserAction() {
  return await getSupabaseUser();
}
