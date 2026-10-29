'use server';

import { ESTADOS_BRASIL, UFS_VALIDAS, type IbgeEstado, type IbgeMunicipio } from '@/lib/ibge';

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
 * Obtém a lista de municípios para uma determinada UF brasileira via API do IBGE.
 * Os dados são cacheados no servidor por 24 horas (revalidate: 86400).
 * Se a UF for inválida ou a API falhar, retorna lista vazia de forma segura.
 */
export async function getIbgeMunicipios(uf: string): Promise<IbgeMunicipio[]> {
  const cleanUf = (uf || '').trim().toUpperCase();

  if (!cleanUf || !UFS_VALIDAS.has(cleanUf)) {
    return [];
  }

  try {
    const res = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${encodeURIComponent(cleanUf)}/municipios?orderBy=nome`,
      {
        next: { revalidate: 86400 },
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        signal: AbortSignal.timeout(6000),
      }
    );

    if (!res.ok) {
      console.warn(`[getIbgeMunicipios] Resposta da API do IBGE para UF ${cleanUf} com status ${res.status}`);
      return [];
    }

    const data: unknown = await res.json();
    if (!Array.isArray(data)) return [];

    return (data as RawIbgeMunicipio[]).map((item) => ({
      id: Number(item.id),
      nome: String(item.nome),
    }));
  } catch (error) {
    console.error(`[getIbgeMunicipios] Erro ao consultar municípios para UF ${cleanUf}:`, error);
    return [];
  }
}
