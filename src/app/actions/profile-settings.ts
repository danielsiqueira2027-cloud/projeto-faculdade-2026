'use server';

import { prisma } from '@/lib/database';
import { getCurrentUser } from '@/lib/auth';
import { createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getClientProfile() {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error('Não autorizado');

  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatarUrl: true,
    },
  });

  return user;
}

export async function saveClientProfile(data: {
  name: string;
  email: string;
  phone?: string | null;
  password?: string | null;
  avatarUrl?: string | null;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: 'Não autorizado' };

  try {
    const existing = await prisma.user.findFirst({
      where: {
        email: data.email.trim().toLowerCase(),
        id: { not: currentUser.id },
      },
    });

    if (existing) {
      return { error: 'Este e-mail já está cadastrado em outra conta.' };
    }

    if (data.password && data.password.trim().length >= 6) {
      const supabase = await createServerClient();
      const { error: pwdError } = await supabase.auth.updateUser({
        password: data.password.trim(),
      });
      if (pwdError) {
        return { error: `Erro ao atualizar senha: ${pwdError.message}` };
      }
    } else if (data.password && data.password.trim().length > 0) {
      return { error: 'A nova senha deve possuir pelo menos 6 caracteres.' };
    }

    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim() || null,
        avatarUrl: data.avatarUrl || null,
      },
    });

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('[saveClientProfile Error]', error);
    return { error: 'Erro ao salvar perfil.' };
  }
}

export async function getProfessionalProfile() {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error('Não autorizado');

  const prof = await prisma.professional.findUnique({
    where: { userId: currentUser.id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
          avatarUrl: true,
        },
      },
    },
  });

  if (!prof) return null;

  const cpfMasked = prof.cpf
    ? prof.cpf.replace(/(\d{3})\.\d{3}\.\d{3}-(\d{2})/, '$1.***.***-$2')
    : null;

  return {
    id:            prof.id,
    userId:        prof.userId,
    name:          prof.user.name,
    email:         prof.user.email,
    phone:         prof.user.phone      ?? null,
    avatarUrl:     prof.user.avatarUrl  ?? null,
    specialty:     prof.specialty       ?? null,
    bio:           prof.bio             ?? null,
    location:      prof.location        ?? null,
    addressStreet: prof.addressStreet   ?? null,
    addressNumber: prof.addressNumber   ?? null,
    addressComplement: prof.addressComplement ?? null,
    addressNeighborhood: prof.addressNeighborhood ?? null,
    addressCity:   prof.addressCity     ?? null,
    addressState:  prof.addressState    ?? null,
    addressCep:    prof.addressCep      ?? null,
    cpf:           prof.cpf             ?? null,
    cpfMasked,
    isVerified:    prof.isVerified,
    isAvailable:   prof.isAvailable,
    rating:        Number(prof.rating),
    reviewCount:   prof.reviewCount,
    createdAt:     prof.createdAt,
    updatedAt:     prof.updatedAt,
  };
}

export async function saveProfessionalProfile(data: {
  name: string;
  email: string;
  password?: string | null;
  avatarUrl?: string | null;
  specialty?: string | null;
  bio?: string | null;
  phone?: string | null;
  location?: string | null;
  addressStreet?: string | null;
  addressNumber?: string | null;
  addressComplement?: string | null;
  addressNeighborhood?: string | null;
  addressCity?: string | null;
  addressState?: string | null;
  addressCep?: string | null;
  cpf?: string | null;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: 'Não autorizado' };

  try {
    const existing = await prisma.user.findFirst({
      where: {
        email: data.email.trim().toLowerCase(),
        id: { not: currentUser.id },
      },
    });

    if (existing) {
      return { error: 'Este e-mail já está cadastrado em outra conta.' };
    }

    if (data.cpf && data.cpf.trim().length > 0) {
      const formattedCpf = data.cpf.trim();
      const existingCpf = await prisma.professional.findFirst({
        where: {
          cpf: formattedCpf,
          userId: { not: currentUser.id },
        },
      });

      if (existingCpf) {
        return { error: 'Este CPF já está cadastrado em outra conta.' };
      }
    }

    if (data.password && data.password.trim().length >= 6) {
      const supabase = await createServerClient();
      const { error: pwdError } = await supabase.auth.updateUser({
        password: data.password.trim(),
      });
      if (pwdError) {
        return { error: `Erro ao atualizar senha: ${pwdError.message}` };
      }
    } else if (data.password && data.password.trim().length > 0) {
      return { error: 'A nova senha deve possuir pelo menos 6 caracteres.' };
    }

    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        avatarUrl: data.avatarUrl || null,
      },
    });

    await prisma.professional.update({
      where: { userId: currentUser.id },
      data: {
        specialty: data.specialty?.trim() || null,
        bio: data.bio?.trim() || null,
        phone: data.phone?.trim() || null,
        location: data.location?.trim() || null,
        addressStreet: data.addressStreet?.trim() || null,
        addressNumber: data.addressNumber?.trim() || null,
        addressComplement: data.addressComplement?.trim() || null,
        addressNeighborhood: data.addressNeighborhood?.trim() || null,
        addressCity: data.addressCity?.trim() || null,
        addressState: data.addressState?.trim() || null,
        addressCep: data.addressCep?.trim() || null,
        cpf: data.cpf?.trim() || null,
      },
    });

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('[saveProfessionalProfile Error]', error);
    return { error: 'Erro ao salvar perfil profissional.' };
  }
}
