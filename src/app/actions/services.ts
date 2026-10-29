'use server';

import { prisma } from '@/lib/database';
import { getCurrentUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import {
  createServiceImageSignedUploadUrl,
  deleteServiceImagesFromStorage,
  getServiceImagePublicUrl,
} from '@/lib/supabase/storage';

export interface ServiceImageInput {
  storagePath: string;
  position: number;
}

export interface ServiceImageDto {
  id: string;
  storagePath: string;
  position: number;
  url: string;
}

export interface ServiceItemDto {
  id: string;
  title: string;
  categoryName: string;
  priceText: string;
  location: string;
  status: string;
  coverImage: string | null;
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export async function getCategoriesAction() {
  try {
    return await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      select: { id: true, name: true, slug: true, icon: true },
    });
  } catch (error) {
    console.error('[getCategoriesAction]', error);
    return [];
  }
}

/**
 * Prepara o upload de imagem validando autenticação, propriedade do serviço,
 * MIME type e gerando nome seguro e Signed Upload URL no Supabase Storage.
 */
export async function prepareServiceImageUploadAction(
  serviceId: string,
  fileMeta: { name: string; type: string; size: number }
): Promise<{
  success: boolean;
  signedUrl?: string;
  path?: string;
  token?: string;
  error?: string;
}> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { success: false, error: 'Não autorizado.' };

    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
      select: { id: true },
    });
    if (!prof) {
      return { success: false, error: 'Apenas profissionais podem enviar fotos de serviços.' };
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(serviceId)) {
      return { success: false, error: 'Identificador do serviço inválido.' };
    }

    // Se o serviço já existe, valida propriedade no servidor
    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
      select: { professionalId: true },
    });
    if (existingService && existingService.professionalId !== prof.id) {
      return { success: false, error: 'Acesso negado: o serviço não pertence ao seu perfil.' };
    }

    // Validação estrita de tipo MIME no servidor
    if (!ALLOWED_MIME_TYPES.includes(fileMeta.type)) {
      return {
        success: false,
        error: 'Formato de arquivo não suportado. Envie apenas imagens JPG, PNG ou WebP.',
      };
    }

    // Validação de tamanho no servidor
    if (fileMeta.size > MAX_FILE_SIZE_BYTES) {
      return {
        success: false,
        error: 'Arquivo muito grande. O limite máximo permitido é de 5 MB por foto.',
      };
    }

    const ext = MIME_TO_EXT[fileMeta.type] || 'jpg';
    const fileId = crypto.randomUUID();
    const storagePath = `${currentUser.id}/${serviceId}/${fileId}.${ext}`;

    const { signedUrl, path, token } = await createServiceImageSignedUploadUrl(storagePath);

    return {
      success: true,
      signedUrl,
      path,
      token,
    };
  } catch (err: unknown) {
    console.error('[prepareServiceImageUploadAction]', err instanceof Error ? err.message : 'Erro');
    return { success: false, error: 'Falha ao autorizar upload de imagem.' };
  }
}

/**
 * Remove imagens recém-enviadas caso o usuário cancele ou remova da fila antes de salvar.
 * Valida rigorosamente que o usuário só apaga da sua própria pasta.
 */
export async function cleanupServiceUploadAction(paths: string[]): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { success: false, error: 'Não autorizado.' };

    if (!paths.length) return { success: true };

    const userPrefix = `${currentUser.id}/`;
    const safePaths = paths.filter((p) => typeof p === 'string' && p.startsWith(userPrefix));

    if (safePaths.length > 0) {
      await deleteServiceImagesFromStorage(safePaths);
    }

    return { success: true };
  } catch (err: unknown) {
    console.error('[cleanupServiceUploadAction]', err instanceof Error ? err.message : 'Erro');
    return { success: false, error: 'Erro ao limpar imagens temporárias.' };
  }
}

export async function getMyServicesAction(): Promise<ServiceItemDto[]> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Não autorizado');

    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
      select: { id: true },
    });

    if (!prof) throw new Error('Profissional não encontrado');

    const services = await prisma.service.findMany({
      where: {
        professionalId: prof.id,
        status: 'ativo',
      },
      include: {
        category: { select: { name: true } },
        images: {
          orderBy: { position: 'asc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return await Promise.all(
      services.map(async (s) => {
        let coverImage: string | null = null;
        if (s.images.length > 0) {
          coverImage = await getServiceImagePublicUrl(s.images[0].storagePath);
        } else if (
          Array.isArray(s.imageUrls) &&
          s.imageUrls.length > 0 &&
          typeof s.imageUrls[0] === 'string'
        ) {
          coverImage = s.imageUrls[0];
        }

        return {
          id: s.id,
          title: s.title,
          categoryName: s.category?.name || 'Geral',
          priceText: s.priceText || (s.priceValue ? `R$ ${s.priceValue}` : 'A combinar'),
          location:
            s.location ||
            (s.city && s.state ? `${s.city} - ${s.state}` : 'Local a combinar'),
          status: s.status,
          coverImage,
        };
      })
    );
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
      select: { id: true },
    });
    if (!prof) return null;

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        images: {
          orderBy: { position: 'asc' },
        },
      },
    });

    if (!service || service.professionalId !== prof.id) {
      return null;
    }

    const imagesWithUrls: ServiceImageDto[] = await Promise.all(
      service.images.map(async (img) => ({
        id: img.id,
        storagePath: img.storagePath,
        position: img.position,
        url: await getServiceImagePublicUrl(img.storagePath),
      }))
    );

    return {
      id: service.id,
      title: service.title,
      categoryId: service.categoryId,
      priceText: service.priceText,
      priceValue: service.priceValue ? Number(service.priceValue) : null,
      duration: service.duration,
      description: service.description,
      location: service.location,
      city: service.city,
      state: service.state,
      imageUrls: Array.isArray(service.imageUrls) ? (service.imageUrls as string[]) : [],
      images: imagesWithUrls,
    };
  } catch (error) {
    console.error('[getServiceByIdAction]', error);
    return null;
  }
}

export async function createServiceAction(data: {
  id?: string;
  title: string;
  categoryId?: string;
  priceText?: string;
  description?: string;
  city?: string;
  state?: string;
  location?: string;
  images?: ServiceImageInput[];
}) {
  const uploadedPaths: string[] = [];
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { error: 'Não autorizado' };

    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
      select: { id: true },
    });

    if (!prof) return { error: 'Apenas profissionais podem criar serviços.' };

    const serviceId = data.id || crypto.randomUUID();
    const city = data.city?.trim() || null;
    const state = data.state?.trim().toUpperCase() || null;
    const location = city && state ? `${city} - ${state}` : data.location?.trim() || null;

    const images = (data.images || []).map((img, idx) => ({
      storagePath: img.storagePath,
      position: typeof img.position === 'number' ? img.position : idx,
    }));

    // Valida que todos os paths pertencem à pasta deste usuário e serviço
    const expectedPrefix = `${currentUser.id}/${serviceId}/`;
    for (const img of images) {
      if (!img.storagePath.startsWith(expectedPrefix)) {
        return { error: 'Caminho de imagem inválido ou não autorizado.' };
      }
      uploadedPaths.push(img.storagePath);
    }

    // Resolve URLs públicas para manter imageUrls em sincronia
    const publicUrls = await Promise.all(
      images.map(async (img) => await getServiceImagePublicUrl(img.storagePath))
    );

    await prisma.$transaction(async (tx) => {
      await tx.service.create({
        data: {
          id: serviceId,
          professionalId: prof.id,
          title: data.title.trim(),
          categoryId: data.categoryId || null,
          priceText: data.priceText?.trim() || null,
          description: data.description?.trim() || null,
          city,
          state,
          location,
          imageUrls: publicUrls,
          status: 'ativo',
        },
      });

      if (images.length > 0) {
        await tx.serviceImage.createMany({
          data: images.map((img) => ({
            serviceId,
            storagePath: img.storagePath,
            position: img.position,
          })),
        });
      }
    });

    revalidatePath('/dashboard/profissional');
    revalidatePath('/dashboard/profissional/meus-servicos');

    return { success: true, serviceId };
  } catch (error: unknown) {
    console.error('[createServiceAction]', error instanceof Error ? error.message : error);
    // Limpeza de rollback para evitar arquivos órfãos no storage
    if (uploadedPaths.length > 0) {
      try {
        await deleteServiceImagesFromStorage(uploadedPaths);
      } catch (cleanErr) {
        console.error('[createServiceAction] Falha no rollback de imagens:', cleanErr);
      }
    }
    return { error: 'Erro ao criar serviço. Tente novamente.' };
  }
}

export async function updateServiceAction(
  serviceId: string,
  data: {
    title: string;
    categoryId?: string;
    priceText?: string;
    description?: string;
    city?: string;
    state?: string;
    location?: string;
    images?: ServiceImageInput[];
  }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { error: 'Não autorizado' };

    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
      select: { id: true },
    });

    if (!prof) return { error: 'Profissional não encontrado.' };

    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        images: true,
      },
    });

    if (!existingService || existingService.professionalId !== prof.id) {
      return { error: 'Serviço não encontrado ou acesso negado.' };
    }

    const city = data.city?.trim() || null;
    const state = data.state?.trim().toUpperCase() || null;
    const location = city && state ? `${city} - ${state}` : data.location?.trim() || null;

    const newImages = (data.images || []).map((img, idx) => ({
      storagePath: img.storagePath,
      position: typeof img.position === 'number' ? img.position : idx,
    }));

    // Valida prefixo de todas as novas imagens
    const userPrefix = `${currentUser.id}/`;
    for (const img of newImages) {
      if (!img.storagePath.startsWith(userPrefix)) {
        return { error: 'Caminho de imagem não autorizado.' };
      }
    }

    const newPathsSet = new Set(newImages.map((i) => i.storagePath));
    const removedImages = existingService.images.filter(
      (img) => !newPathsSet.has(img.storagePath)
    );
    const removedPaths = removedImages.map((img) => img.storagePath);

    const publicUrls = await Promise.all(
      newImages.map(async (img) => await getServiceImagePublicUrl(img.storagePath))
    );

    // Executa em transação atômica
    await prisma.$transaction(async (tx) => {
      await tx.service.update({
        where: { id: serviceId },
        data: {
          title: data.title.trim(),
          categoryId: data.categoryId || null,
          priceText: data.priceText?.trim() || null,
          description: data.description?.trim() || null,
          city,
          state,
          location,
          imageUrls: publicUrls,
        },
      });

      // Remove do banco registros que saíram da lista
      if (removedPaths.length > 0) {
        await tx.serviceImage.deleteMany({
          where: {
            serviceId,
            storagePath: { in: removedPaths },
          },
        });
      }

      // Limpa remanescentes e reinsere com as novas posições
      await tx.serviceImage.deleteMany({
        where: { serviceId },
      });

      if (newImages.length > 0) {
        await tx.serviceImage.createMany({
          data: newImages.map((img) => ({
            serviceId,
            storagePath: img.storagePath,
            position: img.position,
          })),
        });
      }
    });

    // Remove fisicamente do Storage as fotos deletadas
    if (removedPaths.length > 0) {
      try {
        await deleteServiceImagesFromStorage(removedPaths);
      } catch (delErr) {
        console.error('[updateServiceAction] Aviso ao limpar imagens do Storage:', delErr);
      }
    }

    revalidatePath('/dashboard/profissional');
    revalidatePath('/dashboard/profissional/meus-servicos');
    return { success: true };
  } catch (error: unknown) {
    console.error('[updateServiceAction]', error instanceof Error ? error.message : error);
    return { error: 'Erro ao atualizar serviço.' };
  }
}

export async function deleteServiceAction(serviceId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { error: 'Não autorizado' };

    const prof = await prisma.professional.findUnique({
      where: { userId: currentUser.id },
      select: { id: true },
    });

    if (!prof) return { error: 'Profissional não encontrado.' };

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        images: true,
      },
    });

    if (!service || service.professionalId !== prof.id) {
      return { error: 'Serviço não encontrado ou acesso negado.' };
    }

    const pathsToDelete: string[] = service.images.map((img) => img.storagePath);

    // Compatibilidade com arquivos legados no bucket service-images
    if (Array.isArray(service.imageUrls)) {
      for (const url of service.imageUrls) {
        if (typeof url === 'string') {
          const marker = '/storage/v1/object/public/service-images/';
          const idx = url.indexOf(marker);
          if (idx !== -1) {
            const p = decodeURIComponent(url.substring(idx + marker.length));
            if (!pathsToDelete.includes(p)) pathsToDelete.push(p);
          }
        }
      }
    }

    // Executa em transação: remove registros da tabela de imagens e inativa o serviço
    await prisma.$transaction(async (tx) => {
      await tx.serviceImage.deleteMany({
        where: { serviceId },
      });

      await tx.service.update({
        where: { id: serviceId },
        data: {
          status: 'inativo',
          imageUrls: [],
        },
      });
    });

    // Remove do Storage
    if (pathsToDelete.length > 0) {
      try {
        await deleteServiceImagesFromStorage(pathsToDelete);
      } catch (storageErr) {
        console.warn('[deleteServiceAction] Aviso ao remover fotos do Storage:', storageErr);
      }
    }

    revalidatePath('/dashboard/profissional');
    revalidatePath('/dashboard/profissional/meus-servicos');
    return { success: true };
  } catch (error: unknown) {
    console.error('[deleteServiceAction]', error instanceof Error ? error.message : error);
    return { error: 'Erro ao remover o serviço.' };
  }
}

/**
 * Resolve as URLs das fotos de um serviço, suportando Supabase Storage e fallback para URLs legadas.
 */
async function resolveServiceImages(
  images: Array<{ storagePath: string }>,
  imageUrls: unknown
): Promise<{ coverUrl: string | null; allImages: string[] }> {
  const resolvedImages = await Promise.all(
    images.map(async (img) => {
      try {
        if (img.storagePath.startsWith('http://') || img.storagePath.startsWith('https://')) {
          return img.storagePath;
        }
        return await getServiceImagePublicUrl(img.storagePath);
      } catch {
        return null;
      }
    })
  );

  const validImages = resolvedImages.filter((url): url is string => Boolean(url));

  const fallbackImages = (
    Array.isArray(imageUrls) ? (imageUrls as string[]) : []
  ).filter((url): url is string => typeof url === 'string' && url.trim().length > 0);

  const allImages = validImages.length > 0 ? validImages : fallbackImages;
  return {
    coverUrl: allImages[0] || null,
    allImages,
  };
}

/**
 * Normaliza cidade e estado de um serviço a partir dos campos diretos ou da string composta `location`.
 */
function resolveServiceCityState(
  sCity?: string | null,
  sState?: string | null,
  sLocation?: string | null
): { city: string | null; state: string | null } {
  let city = sCity || null;
  let state = sState || null;
  if (!city && !state && sLocation) {
    const parts = sLocation.split(' - ');
    if (parts.length === 2) {
      city = parts[0].trim();
      state = parts[1].trim();
    } else {
      city = sLocation.trim();
    }
  }
  return { city, state };
}

export interface PublicServiceDto {
  id: string;
  title: string;
  description: string | null;
  priceText: string | null;
  priceValue: number | null;
  duration: string | null;
  city: string | null;
  state: string | null;
  categoryName: string;
  imageUrl: string | null;
  images: string[];
}

/**
 * Busca os serviços publicados/ativos de um profissional para exibição em seu perfil público.
 */
export async function getProfessionalServices(
  professionalId: string
): Promise<PublicServiceDto[]> {
  try {
    if (!professionalId) return [];

    const services = await prisma.service.findMany({
      where: {
        professionalId,
        status: 'ativo',
      },
      include: {
        category: {
          select: { name: true },
        },
        images: {
          orderBy: { position: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return await Promise.all(
      services.map(async (s) => {
        const { coverUrl, allImages } = await resolveServiceImages(s.images, s.imageUrls);
        const imageUrl = coverUrl;
        const otherImages = allImages.slice(1);
        const { city, state } = resolveServiceCityState(s.city, s.state, s.location);

        return {
          id: s.id,
          title: s.title,
          description: s.description || null,
          priceText: s.priceText || null,
          priceValue: s.priceValue ? Number(s.priceValue) : null,
          duration: s.duration || null,
          city,
          state,
          categoryName: s.category?.name || 'Geral',
          imageUrl,
          images: otherImages,
        };
      })
    );
  } catch (error) {
    console.error('[getProfessionalServices] Erro ao buscar serviços:', error);
    return [];
  }
}

export interface FeaturedServiceDto {
  id: string;
  title: string;
  description: string | null;
  priceText: string | null;
  priceValue: number | null;
  city: string | null;
  state: string | null;
  categoryName: string;
  imageUrl: string | null;
  professional: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
}

/**
 * Busca os serviços em destaque para exibição na landing page.
 * Retorna os serviços mais recentes de profissionais ativos, sem expor dados privados.
 */
export async function getFeaturedServices(limit = 12): Promise<FeaturedServiceDto[]> {
  try {
    const safeLimit = Math.max(1, Math.min(limit, 50));

    const services = await prisma.service.findMany({
      where: {
        status: 'ativo',
        professional: {
          isAvailable: true,
          user: {
            isActive: true,
          },
        },
      },
      include: {
        category: {
          select: { name: true },
        },
        images: {
          orderBy: { position: 'asc' },
        },
        professional: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: safeLimit,
    });

    return await Promise.all(
      services.map(async (s) => {
        const { coverUrl } = await resolveServiceImages(s.images, s.imageUrls);
        const { city, state } = resolveServiceCityState(s.city, s.state, s.location);

        return {
          id: s.id,
          title: s.title,
          description: s.description || null,
          priceText: s.priceText || null,
          priceValue: s.priceValue ? Number(s.priceValue) : null,
          city,
          state,
          categoryName: s.category?.name || 'Geral',
          imageUrl: coverUrl,
          professional: {
            id: s.professional.id,
            name: s.professional.user.name,
            avatarUrl: s.professional.user.avatarUrl || null,
          },
        };
      })
    );
  } catch (error) {
    console.error('[getFeaturedServices] Erro ao buscar serviços em destaque:', error);
    return [];
  }
}

