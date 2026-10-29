'use server';

import { prisma } from '@/lib/database';
import {
  ESTADOS_BRASIL,
  UFS_VALIDAS,
  PRINCIPAIS_MUNICIPIOS_POR_UF,
  type IbgeEstado,
  type IbgeMunicipio,
} from '@/lib/ibge';

interface RawIbgeEstado {
  id: number | string;
  sigla: string;
  nome: string;
}

interface RawIbgeMunicipio {
  id: number | string;
  nome: string;
}

/**
 * Obtém a lista de todos os 27 estados do Brasil.
 * Tenta buscar da API do IBGE com cache de 24 horas e timeout de 4 segundos.
 * Em caso de falha de rede/timeout na Vercel, retorna imediatamente o fallback estático.
 */
export async function getIbgeEstados(): Promise<IbgeEstado[]> {
  try {
    const res = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
      {
        next: { revalidate: 86400 },
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        signal: AbortSignal.timeout(4000),
      }
    );

    if (!res.ok) {
      console.warn(`[getIbgeEstados] Resposta da API do IBGE com status ${res.status}. Usando fallback estático.`);
      return ESTADOS_BRASIL;
    }

    const data: unknown = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return ESTADOS_BRASIL;
    }

    return (data as RawIbgeEstado[]).map((item) => ({
      id: Number(item.id),
      sigla: String(item.sigla).toUpperCase(),
      nome: String(item.nome),
    }));
  } catch (error) {
    console.warn('[getIbgeEstados] Falha ao consultar API externa do IBGE. Usando fallback estático dos 27 estados:', error);
    return ESTADOS_BRASIL;
  }
}

/**
 * Obtém a lista de municípios para uma determinada UF brasileira.
 * 1. Coleta cidades reais de profissionais cadastrados no banco para a UF selecionada.
 * 2. Tenta complementar com a lista completa do IBGE (com cache de 24h e timeout seguro).
 * 3. Se a API do IBGE falhar/der timeout, usa a lista de principais municípios de referência daquela UF.
 * 4. Combina tudo sem duplicatas, garantindo que o autocomplete NUNCA fique vazio.
 */
export async function getIbgeMunicipios(uf: string): Promise<IbgeMunicipio[]> {
  const cleanUf = (uf || '').trim().toUpperCase();

  if (!cleanUf || !UFS_VALIDAS.has(cleanUf)) {
    return [];
  }

  // 1. Cidades reais dos profissionais cadastrados no banco para esta UF
  const dbCities = new Set<string>();
  try {
    const profs = await prisma.professional.findMany({
      where: {
        addressState: cleanUf,
        isAvailable: true,
        addressCity: { not: null },
      },
      select: { addressCity: true },
    });

    for (const p of profs) {
      const c = (p.addressCity || '').trim();
      if (c) dbCities.add(c);
    }
  } catch {
    // Falha silenciosa no banco não bloqueia a listagem
  }

  // 2. Tenta consultar a API do IBGE
  let ibgeCities: IbgeMunicipio[] = [];
  try {
    const res = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${encodeURIComponent(cleanUf)}/municipios?orderBy=nome`,
      {
        next: { revalidate: 86400 },
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        signal: AbortSignal.timeout(8000),
      }
    );

    if (res.ok) {
      const data: unknown = await res.json();
      if (Array.isArray(data)) {
        ibgeCities = (data as RawIbgeMunicipio[]).map((item) => ({
          id: Number(item.id),
          nome: String(item.nome),
        }));
      }
    } else {
      console.warn(`[getIbgeMunicipios] Resposta da API do IBGE para UF ${cleanUf} com status ${res.status}. Usando fallback local.`);
    }
  } catch (error) {
    console.warn(`[getIbgeMunicipios] Timeout ou erro ao consultar IBGE para UF ${cleanUf}. Usando fallback local:`, error);
  }

  // 3. Se o IBGE não retornou nada, usa os municípios de referência da UF
  if (ibgeCities.length === 0) {
    const fallbackList = PRINCIPAIS_MUNICIPIOS_POR_UF[cleanUf] || [];
    ibgeCities = fallbackList.map((nome, idx) => ({
      id: idx + 1,
      nome,
    }));
  }

  // 4. Junta as cidades do banco e do IBGE sem duplicatas
  const seenNorm = new Set<string>();
  const combined: IbgeMunicipio[] = [];

  const addCity = (id: number, nome: string) => {
    const norm = nome.trim().toLowerCase();
    if (!norm || seenNorm.has(norm)) return;
    seenNorm.add(norm);
    combined.push({ id, nome: nome.trim() });
  };

  // Dá prioridade para as cidades reais do banco de profissionais
  let tempId = 100000;
  for (const c of dbCities) {
    addCity(tempId++, c);
  }

  // Adiciona as cidades do IBGE / fallback
  for (const m of ibgeCities) {
    addCity(m.id, m.nome);
  }

  // Ordena alfabeticamente
  combined.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

  return combined;
}
