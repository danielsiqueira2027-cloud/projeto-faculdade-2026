'use server';

export interface IbgeEstado {
  id: number;
  sigla: string;
  nome: string;
}

export interface IbgeMunicipio {
  id: number;
  nome: string;
}

interface RawIbgeEstado {
  id: number | string;
  sigla: string;
  nome: string;
}

interface RawIbgeMunicipio {
  id: number | string;
  nome: string;
}

const UFS_VALIDAS = new Set([
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]);

/**
 * Obtém a lista de todos os 27 estados do Brasil via API do IBGE.
 * Os dados são cacheados no servidor por 24 horas (revalidate: 86400).
 * Se a API falhar, retorna uma lista vazia sem quebrar a aplicação.
 */
export async function getIbgeEstados(): Promise<IbgeEstado[]> {
  try {
    const res = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
      {
        next: { revalidate: 86400 },
        headers: { Accept: 'application/json' },
      }
    );

    if (!res.ok) {
      console.warn(`[getIbgeEstados] Resposta da API do IBGE com status ${res.status}`);
      return [];
    }

    const data: unknown = await res.json();
    if (!Array.isArray(data)) return [];

    return (data as RawIbgeEstado[]).map((item) => ({
      id: Number(item.id),
      sigla: String(item.sigla).toUpperCase(),
      nome: String(item.nome),
    }));
  } catch (error) {
    console.error('[getIbgeEstados] Erro ao consultar API do IBGE:', error);
    return [];
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
        headers: { Accept: 'application/json' },
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
