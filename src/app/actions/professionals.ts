'use server';

import { prisma } from '@/lib/database';

/**
 * Busca profissionais no banco com base em termo de pesquisa (nome ou especialidade)
 * ou por slug de categoria. Retorna em formato compatível com listagem.
 */
export async function searchProfessionals(query?: string, categorySlug?: string) {
  try {
    const where: any = {
      isAvailable: true,
    };

    if (categorySlug) {
      where.categories = {
        some: {
          category: {
            slug: categorySlug.toLowerCase(),
          },
        },
      };
    }

    if (query) {
      const q = query.trim().toLowerCase();
      where.OR = [
        {
          user: {
            name: {
              contains: q,
            },
          },
        },
        {
          specialty: {
            contains: q,
          },
        },
        {
          categories: {
            some: {
              category: {
                name: {
                  contains: q,
                },
              },
            },
          },
        },
      ];
    }

    const professionals = await prisma.professional.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            avatarUrl: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return professionals.map((prof) => ({
      id: prof.id,
      name: prof.user.name,
      role: prof.specialty || prof.categories.map((c) => c.category.name).join(' / ') || 'Profissional',
      rating: Number(prof.rating) || 5.0,
      distance: 1.5, // Fallback visual
      location: prof.location || `${prof.addressCity || "Santa Bárbara D'Oeste"} - ${prof.addressState || "SP"}`,
      avatarUrl: prof.user.avatarUrl || null,
      bio: prof.bio || '',
    }));
  } catch (error) {
    console.error('[searchProfessionals] Erro ao buscar profissionais:', error);
    return [];
  }
}

/**
 * Busca os detalhes completos de um profissional específico a partir do seu ID.
 */
export async function getProfessionalDetails(id: string) {
  try {
    const prof = await prisma.professional.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            avatarUrl: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        portfolio: true,
        testimonials: {
          include: {
            author: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        certifications: true,
      },
    });

    if (!prof) return null;

    // Converte o Decimal decimal do Prisma para number do JS
    return {
      id: prof.id,
      userId: prof.userId,
      name: prof.user.name,
      avatar: prof.user.avatarUrl || '/imgs/who/lucas.jpg',
      specialty: prof.specialty || prof.categories.map((c) => c.category.name).join(' / ') || 'Profissional',
      description: prof.bio || 'Sem descrição detalhada disponível.',
      rating: Number(prof.rating) || 5.0,
      reviewCount: prof.reviewCount || 0,
      yearsOfExperience: 5, // Fallback padrão
      phone: prof.phone || prof.user.phone || '',
      email: prof.user.email,
      location: prof.location || `${prof.addressCity || "Santa Bárbara D'Oeste"} - ${prof.addressState || "SP"}`,
      certifications: prof.certifications.map((c) => c.name) || [],
      portfolio: prof.portfolio.map((item) => ({
        id: item.id,
        title: item.title,
        category: prof.specialty || 'Serviço',
        imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        year: item.year || 2026,
      })),
      testimonials: prof.testimonials.map((t) => ({
        id: t.id,
        author: t.author?.name || t.authorName || 'Cliente',
        role: t.authorRole || 'Cliente',
        content: t.content,
        rating: t.rating,
      })),
      categories: prof.categories.map((c) => c.category.name),
    };
  } catch (error) {
    console.error('[getProfessionalDetails] Erro ao obter detalhes do profissional:', error);
    return null;
  }
}
