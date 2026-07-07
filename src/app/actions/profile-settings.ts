'use server';

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/database';
import { getCurrentUser } from '@/lib/auth';
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

    const updateData: any = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || null,
      avatarUrl: data.avatarUrl || null,
    };

    if (data.password && data.password.trim().length >= 6) {
      updateData.password = await bcrypt.hash(data.password, 10);
    } else if (data.password && data.password.trim().length > 0) {
      return { error: 'A nova senha deve possuir pelo menos 6 caracteres.' };
    }

    await prisma.user.update({
      where: { id: currentUser.id },
      data: updateData,
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

  // Prisma Decimal cannot be passed to Client Components — serialize to plain object
  return {
    ...prof,
    rating: Number(prof.rating),
    agreedPrice: prof.agreedPrice !== undefined && prof.agreedPrice !== null
      ? Number(prof.agreedPrice)
      : null,
  };
}

export async function saveProfessionalProfile(data: {
  name: string;
  email: string;
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
  password?: string | null;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: 'Não autorizado' };

  try {
    // Validate unique email
    const existing = await prisma.user.findFirst({
      where: {
        email: data.email.trim().toLowerCase(),
        id: { not: currentUser.id },
      },
    });

    if (existing) {
      return { error: 'Este e-mail já está cadastrado em outra conta.' };
    }

    // Validate unique CPF if provided
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

    // Update User model
    const userUpdateData: any = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      avatarUrl: data.avatarUrl || null,
    };

    if (data.password && data.password.trim().length >= 6) {
      userUpdateData.password = await bcrypt.hash(data.password, 10);
    } else if (data.password && data.password.trim().length > 0) {
      return { error: 'A nova senha deve possuir pelo menos 6 caracteres.' };
    }

    await prisma.user.update({
      where: { id: currentUser.id },
      data: userUpdateData,
    });

    // Update Professional model
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
