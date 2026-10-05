'use server';

export interface UF {
  id: number | string;
  sigla: string;
  nome: string;
}

export interface Municipio {
  id?: number | string;
  codigo_ibge?: string;
  nome: string;
}

const STATIC_UFS: UF[] = [
  { id: 12, sigla: 'AC', nome: 'Acre' },
  { id: 27, sigla: 'AL', nome: 'Alagoas' },
  { id: 16, sigla: 'AP', nome: 'Amapá' },
  { id: 13, sigla: 'AM', nome: 'Amazonas' },
  { id: 29, sigla: 'BA', nome: 'Bahia' },
  { id: 23, sigla: 'CE', nome: 'Ceará' },
  { id: 53, sigla: 'DF', nome: 'Distrito Federal' },
  { id: 32, sigla: 'ES', nome: 'Espírito Santo' },
  { id: 52, sigla: 'GO', nome: 'Goiás' },
  { id: 21, sigla: 'MA', nome: 'Maranhão' },
  { id: 51, sigla: 'MT', nome: 'Mato Grosso' },
  { id: 50, sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { id: 31, sigla: 'MG', nome: 'Minas Gerais' },
  { id: 15, sigla: 'PA', nome: 'Pará' },
  { id: 25, sigla: 'PB', nome: 'Paraíba' },
  { id: 41, sigla: 'PR', nome: 'Paraná' },
  { id: 26, sigla: 'PE', nome: 'Pernambuco' },
  { id: 22, sigla: 'PI', nome: 'Piauí' },
  { id: 33, sigla: 'RJ', nome: 'Rio de Janeiro' },
  { id: 24, sigla: 'RN', nome: 'Rio Grande do Norte' },
  { id: 43, sigla: 'RS', nome: 'Rio Grande do Sul' },
  { id: 11, sigla: 'RO', nome: 'Rondônia' },
  { id: 14, sigla: 'RR', nome: 'Roraima' },
  { id: 42, sigla: 'SC', nome: 'Santa Catarina' },
  { id: 35, sigla: 'SP', nome: 'São Paulo' },
  { id: 28, sigla: 'SE', nome: 'Sergipe' },
  { id: 17, sigla: 'TO', nome: 'Tocantins' },
];

/**
 * Busca UFs brasileiras (com cache 24h, User-Agent e fallbacks robustos)
 */
export async function getUfsAction(): Promise<UF[]> {
  try {
    // 1. Tenta API oficial do IBGE com timeout de 2.5s
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch('https://servicos.ibge.gov.br/api/v1/localidades/estados?orderBy=nome', {
      headers: {
        'User-Agent': 'ClickServico/1.0 (+https://clickservico.com.br)',
        Accept: 'application/json',
      },
      next: { revalidate: 86400 },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (res.ok) {
      const data: unknown = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return (data as Array<{ id: number; sigla: string; nome: string }>).map((item) => ({
          id: item.id,
          sigla: item.sigla,
          nome: item.nome,
        }));
      }
    }
  } catch {
    // Falha silenciosa para tentar o fallback
  }

  try {
    // 2. Fallback para BrasilAPI
    const res = await fetch('https://brasilapi.com.br/api/ibge/uf/v1', {
      headers: {
        'User-Agent': 'ClickServico/1.0 (+https://clickservico.com.br)',
        Accept: 'application/json',
      },
      next: { revalidate: 86400 },
    });

    if (res.ok) {
      const data: unknown = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const ufs = (data as Array<{ id: number; sigla: string; nome: string }>).map((item) => ({
          id: item.id,
          sigla: item.sigla,
          nome: item.nome,
        }));
        return ufs.sort((a, b) => a.nome.localeCompare(b.nome));
      }
    }
  } catch {
    // Falha silenciosa para usar lista estática
  }

  // 3. Fallback estático garantido
  return STATIC_UFS;
}

/**
 * Busca municípios por UF (com cache 24h, User-Agent e fallback BrasilAPI)
 */
export async function getMunicipiosByUfAction(uf: string): Promise<{
  success: boolean;
  municipios: Municipio[];
  error?: string;
}> {
  const cleanUf = uf.trim().toUpperCase();
  if (!cleanUf || cleanUf.length !== 2) {
    return { success: false, municipios: [], error: 'UF inválida' };
  }

  // 1. Tenta IBGE oficial
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(
      `https://servicos.ibge.gov.br/api/v1/localidades/estados/${cleanUf}/municipios`,
      {
        headers: {
          'User-Agent': 'ClickServico/1.0 (+https://clickservico.com.br)',
          Accept: 'application/json',
        },
        next: { revalidate: 86400 },
        signal: controller.signal,
      }
    ).finally(() => clearTimeout(timeout));

    if (res.ok) {
      const data: unknown = await res.json();
      if (Array.isArray(data)) {
        const list = (data as Array<{ id: number; nome: string }>).map((item) => ({
          codigo_ibge: String(item.id),
          nome: item.nome,
        }));
        list.sort((a, b) => a.nome.localeCompare(b.nome));
        return { success: true, municipios: list };
      }
    }
  } catch {
    // Falha silenciosa para fallback
  }

  // 2. Fallback BrasilAPI
  try {
    const res = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${cleanUf}`, {
      headers: {
        'User-Agent': 'ClickServico/1.0 (+https://clickservico.com.br)',
        Accept: 'application/json',
      },
      next: { revalidate: 86400 },
    });

    if (res.ok) {
      const data: unknown = await res.json();
      if (Array.isArray(data)) {
        const list = (data as Array<{ nome: string; codigo_ibge?: string }>).map((item) => ({
          codigo_ibge: item.codigo_ibge,
          nome: item.nome,
        }));
        list.sort((a, b) => a.nome.localeCompare(b.nome));
        return { success: true, municipios: list };
      }
    }
  } catch (err: unknown) {
    console.error('[getMunicipiosByUfAction]', err);
  }

  return {
    success: false,
    municipios: [],
    error: 'Não foi possível carregar a lista de municípios. Use a digitação manual.',
  };
}
