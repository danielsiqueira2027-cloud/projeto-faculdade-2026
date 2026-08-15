'use server';

import { prisma } from '@/lib/database';
import { getCurrentUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getCategoriesAction() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true }
    });
  } catch (error) {
    console.error('[getCategoriesAction]', error);
    return [];
  }
}

export async function getMyServicesAction() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Não autorizado');

    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
    });

    if (!prof) throw new Error('Profissional não encontrado');

    const services = await prisma.service.findMany({
      where: { 
        professionalId: prof.id,
        status: 'ativo'
      },
      include: {
        category: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return services.map(s => ({
      ...s,
      priceValue: s.priceValue ? Number(s.priceValue) : null,
      categoryName: s.category?.name || 'Geral'
    }));
  } catch (error) {
    console.error('[getMyServicesAction]', error);
    return [];
  }
}

export async function getServiceByIdAction(serviceId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Não autorizado');

    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
    });
    if (!prof) return null;

    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });

    if (!service || service.professionalId !== prof.id) {
      return null;
    }

    return service;
  } catch (error) {
    console.error('[getServiceByIdAction]', error);
    return null;
  }
}

export async function createServiceAction(data: {
  title: string;
  categoryId?: string;
  priceText?: string;
  description?: string;
  location?: string;
  imageUrls?: string[];
}) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { error: 'Não autorizado' };

    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
    });

    if (!prof) return { error: 'Apenas profissionais podem criar serviços.' };

    const service = await prisma.service.create({
      data: {
        professionalId: prof.id,
        title: data.title,
        categoryId: data.categoryId || null,
        priceText: data.priceText,
        description: data.description,
        location: data.location,
        imageUrls: data.imageUrls || [],
        status: 'ativo'
      }
    });

    revalidatePath('/dashboard/profissional');
    revalidatePath('/dashboard/profissional/meus-servicos');

    return { success: true, serviceId: service.id };
  } catch (error) {
    console.error('[createServiceAction]', error);
    return { error: 'Erro ao criar serviço.' };
  }
}

export async function updateServiceAction(serviceId: string, data: {
  title: string;
  categoryId?: string;
  priceText?: string;
  description?: string;
  location?: string;
  imageUrls?: string[];
}) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { error: 'Não autorizado' };

    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
    });

    if (!prof) return { error: 'Profissional não encontrado.' };

    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });

    if (!service || service.professionalId !== prof.id) {
      return { error: 'Serviço não encontrado ou acesso negado.' };
    }

    await prisma.service.update({
      where: { id: serviceId },
      data: {
        title: data.title,
        categoryId: data.categoryId || null,
        priceText: data.priceText,
        description: data.description,
        location: data.location,
        imageUrls: data.imageUrls || [],
      }
    });

    revalidatePath('/dashboard/profissional/meus-servicos');
    return { success: true };
  } catch (error) {
    console.error('[updateServiceAction]', error);
    return { error: 'Erro ao atualizar serviço.' };
  }
}

export async function deleteServiceAction(serviceId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { error: 'Não autorizado' };

    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
    });

    if (!prof) return { error: 'Profissional não encontrado.' };

    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });

    if (!service || service.professionalId !== prof.id) {
      return { error: 'Serviço não encontrado ou acesso negado.' };
    }

    // Soft delete (inativo) para preservar histórico com orders
    await prisma.service.update({
      where: { id: serviceId },
      data: { status: 'inativo' }
    });

    revalidatePath('/dashboard/profissional/meus-servicos');
    return { success: true };
  } catch (error) {
    console.error('[deleteServiceAction]', error);
    return { error: 'Erro ao remover o serviço.' };
  }
}
