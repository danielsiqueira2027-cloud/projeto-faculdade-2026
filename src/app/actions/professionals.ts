'use server';

import { prisma } from '@/lib/database';
import { Prisma } from '@/generated/prisma';
import { PRINCIPAIS_MUNICIPIOS_POR_UF } from '@/lib/ibge';

/** Texto exibido nos cards quando o profissional não tem cidade/UF cadastrados. */
const LOCATION_FALLBACK = 'Localização não informada';

/**
 * Formata a localidade de um profissional priorizando os campos estruturados
 * do cadastro (addressCity / addressState) sobre o campo legado `location`.
 *
 * Ordem de prioridade:
 *  1. addressCity + addressState  → "Sumaré - SP"
 *  2. apenas addressCity          → "Sumaré"
 *  3. apenas addressState         → "SP"
 *  4. prof.location (legado)      → valor bruto preservado
 *  5. LOCATION_FALLBACK           → "Localização não informada"
 */
function formatProfessionalLocation(prof: {
  addressCity?: string | null;
  addressState?: string | null;
  location?: string | null;
}): string {
  const city  = prof.addressCity?.trim()  || '';
  const state = prof.addressState?.trim().toUpperCase() || '';

  if (city || state) {
    return [city, state].filter(Boolean).join(' - ');
  }

  return prof.location?.trim() || LOCATION_FALLBACK;
}

const UFS_VALIDAS = new Set([
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]);

/**
 * Remove acentos, caracteres diacríticos e normaliza caixa para comparação segura.
 */
function normalizeLocationText(text?: string | null): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Tenta resolver o nome digitado da cidade para o nome oficial com acentuação
 * (ex: "sumare" -> "Sumaré", "santa barbara d'oeste" -> "Santa Bárbara d'Oeste").
 */
function resolveOfficialCity(cidade?: string | null, uf?: string | null): string | null {
  if (!cidade) return null;
  const norm = normalizeLocationText(cidade);
  if (!norm) return null;

  const cleanUf = (uf || '').trim().toUpperCase();
  if (cleanUf && PRINCIPAIS_MUNICIPIOS_POR_UF[cleanUf]) {
    const found = PRINCIPAIS_MUNICIPIOS_POR_UF[cleanUf].find(
      (m) => normalizeLocationText(m) === norm
    );
    if (found) return found;
  }

  for (const list of Object.values(PRINCIPAIS_MUNICIPIOS_POR_UF)) {
    const found = list.find((m) => normalizeLocationText(m) === norm);
    if (found) return found;
  }

  return null;
}

/**
 * Busca profissionais no banco com base em termo de pesquisa (nome ou especialidade),
 * por slug de categoria, e opcionalmente por localidade (UF e Cidade derivados do CEP).
 * Retorna em formato compatível com listagem pública.
 */
export async function searchProfessionals(
  query?: string,
  categorySlug?: string,
  uf?: string,
  cidade?: string
) {
  try {
    const where: Prisma.ProfessionalWhereInput = {
      isAvailable: true,
      user: {
        isActive: true,
      },
    };

    // Validação estrita da UF no servidor (apenas as 27 siglas válidas do Brasil)
    const cleanUf = (uf || '').trim().toUpperCase();
    const isUfValid = cleanUf.length === 2 && UFS_VALIDAS.has(cleanUf);

    if (isUfValid) {
      where.addressState = cleanUf;
    }

    if (categorySlug) {
      where.categories = {
        some: {
          category: {
            slug: categorySlug.toLowerCase(),
          },
        },
      };
    }

    // Nota: O filtro textual com contains do Prisma usa ILIKE no Postgres, que não ignora
    // acentos (ex: "Joao" não encontra "João"). Para não excluir candidatos válidos no banco
    // sem alterar o schema/extensões, os filtros de visibilidade, UF, categoria e cidade continuam
    // no banco, e a filtragem textual sem acento (nome, bio, especialidade, categorias) é aplicada
    // em memória após a consulta estrutural.

    // Filtro refinado de município sem diferença de caixa ou acentuação
    const cleanCidade = (cidade || '').trim().slice(0, 100);
    const normalizedCidade = cleanCidade ? normalizeLocationText(cleanCidade) : '';

    // Otimização: se a cidade for resolvida para o nome oficial, filtra no banco
    if (normalizedCidade) {
      const resolvedCity = resolveOfficialCity(cleanCidade, cleanUf);
      if (resolvedCity) {
        where.addressCity = {
          equals: resolvedCity,
          mode: 'insensitive',
        };
      }
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

    // Filtro em memória por cidade sem acento
    let filtered = normalizedCidade
      ? professionals.filter((prof) => {
          const profCity = normalizeLocationText(prof.addressCity);
          return profCity === normalizedCidade;
        })
      : professionals;

    // Filtro em memória por query sem acento (cobre "Joao" ↔ "João", bio, especialidade e categorias)
    if (query) {
      const q = query.trim();
      const qNorm = normalizeLocationText(q);
      const words = qNorm.split(/\s+/).filter(Boolean);

      if (qNorm) {
        filtered = filtered.filter((prof) => {
          const nameNorm = normalizeLocationText(prof.user.name);
          const specialtyNorm = normalizeLocationText(prof.specialty);
          const bioNorm = normalizeLocationText(prof.bio);
          const catNorms = prof.categories.map((c) => normalizeLocationText(c.category.name));

          // 1. Busca termo/frase completa em qualquer campo relevante
          const matchPhrase =
            nameNorm.includes(qNorm) ||
            specialtyNorm.includes(qNorm) ||
            bioNorm.includes(qNorm) ||
            catNorms.some((c) => c.includes(qNorm));

          if (matchPhrase) return true;

          // 2. Múltiplos termos no nome (ex: nome e sobrenome)
          if (words.length > 1 && words.every((w) => nameNorm.includes(w))) {
            return true;
          }

          // 3. Múltiplos termos distribuídos nos campos
          if (
            words.length > 1 &&
            words.every((w) =>
              nameNorm.includes(w) ||
              bioNorm.includes(w) ||
              specialtyNorm.includes(w) ||
              catNorms.some((c) => c.includes(w))
            )
          ) {
            return true;
          }

          return false;
        });
      }
    }

    return filtered.map((prof) => {
      return {
        id: prof.id,
        userId: prof.userId,
        name: prof.user.name,
        role: prof.specialty || prof.categories.map((c) => c.category.name).join(' / ') || 'Profissional',
        rating: Number(prof.rating) || 0,
        distance: 1.5, // Fallback visual (placeholder mantido)
        location: formatProfessionalLocation(prof),
        avatarUrl: prof.user.avatarUrl || '',
        bio: prof.bio || '',
      };
    });
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
        certifications: true,
      },
    });

    if (!prof) return null;

    // Converte o Decimal decimal do Prisma para number do JS
    return {
      id: prof.id,
      userId: prof.userId,
      name: prof.user.name,
      avatar: prof.user.avatarUrl || null,
      avatarUrl: prof.user.avatarUrl || null,
      specialty: prof.specialty || null,
      description: prof.bio || '',
      bio: prof.bio || null,
      rating: Number(prof.rating) || 0,
      reviewCount: prof.reviewCount || 0,
      phone: '', // Segurança: telefone não é exposto no perfil público
      email: prof.user.email,
      location: formatProfessionalLocation(prof),
      certifications: prof.certifications.map((c) => c.name) || [],
      portfolio: prof.portfolio.map((item) => ({
        id: item.id,
        title: item.title,
        category: prof.specialty || 'Serviço',
        imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        year: item.year || 2026,
      })),
      testimonials: [],
      categories: prof.categories.map((c) => c.category.name),
      bannerUrl: prof.bannerUrl || null,
      isVerified: prof.isVerified,
    };
  } catch (error) {
    console.error('[getProfessionalDetails] Erro ao obter detalhes do profissional:', error);
    return null;
  }
}

/**
 * Busca os profissionais mais bem avaliados (destaques da home) no banco via Prisma.
 * Ordenados por nota (rating) decrescente, limitando aos top 4.
 */
export async function getTopProfessionals(limit: number = 4) {
  try {
    const professionals = await prisma.professional.findMany({
      where: {
        isAvailable: true,
        user: {
          isActive: true,
        },
      },
      orderBy: [
        { rating: 'desc' },
        { reviewCount: 'desc' },
      ],
      take: limit,
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
      userId: prof.userId,
      name: prof.user.name,
      role: prof.specialty || prof.categories.map((c) => c.category.name).join(' / ') || 'Profissional',
      rating: prof.rating !== null ? Number(prof.rating) : 0,
      distance: 1.5,
      location: formatProfessionalLocation(prof),
      avatarUrl: prof.user.avatarUrl || null,
      bio: prof.bio || '',
    }));
  } catch (error) {
    console.error('[getTopProfessionals] Erro ao buscar profissionais em destaque:', error);
    return [];
  }
}

