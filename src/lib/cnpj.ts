/**
 * Utilitários para normalização de dados de CNPJ (ex: BrasilAPI).
 */

export interface EnderecoCnpj {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  municipio: string;
  uf: string;
}

/**
 * Converte textos em MAIÚSCULAS para Caixa de Título (Title Case),
 * respeitando preposições comuns da língua portuguesa.
 * Se o texto já possuir caracteres minúsculos, preserva a grafia original.
 */
export function paraTitleCase(str: string): string {
  if (!str) return '';
  const trimmed = str.trim();
  // Se contiver minúsculas (não for tudo maiúsculo), mantém o original
  const hasLowerCase = /[a-záàâãéèêíïóôõöúçñ]/i.test(trimmed) && trimmed !== trimmed.toUpperCase();
  if (hasLowerCase) {
    return trimmed;
  }

  const preposicoes = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'com', 'para', 'por', 'a', 'o']);
  return trimmed
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      if (word === 'sn' || word === 's/n') return 'S/N';
      if (index > 0 && preposicoes.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

/**
 * Normaliza os dados brutos de endereço retornados pela BrasilAPI:
 * - CEP formatado com máscara (00000-000)
 * - UF em 2 letras maiúsculas
 * - Textos em Caixa de Título (logradouro, bairro, municipio, numero)
 */
export function normalizarDadosCnpj(raw: Record<string, unknown> | null | undefined): EnderecoCnpj {
  const rawCep = typeof raw?.cep === 'string' ? raw.cep.replace(/\D/g, '').slice(0, 8) : '';
  const cep = rawCep.length === 8 ? `${rawCep.slice(0, 5)}-${rawCep.slice(5)}` : rawCep;

  const rawUf = typeof raw?.uf === 'string' ? raw.uf.trim().toUpperCase().slice(0, 2) : '';

  const tipo = typeof raw?.descricao_tipo_de_logradouro === 'string'
    ? raw.descricao_tipo_de_logradouro.trim() : '';
  const base = typeof raw?.logradouro === 'string' ? raw.logradouro.trim() : '';
  const rawLogradouro = tipo && !base.toUpperCase().includes(tipo.toUpperCase())
    ? `${tipo} ${base}` : base;
  const logradouro = paraTitleCase(rawLogradouro);

  let numero = '';
  if (raw?.numero !== undefined && raw?.numero !== null) {
    const numStr = String(raw.numero).trim();
    numero = numStr.toUpperCase() === 'SN' || numStr.toUpperCase() === 'S/N' ? 'S/N' : paraTitleCase(numStr);
  }

  const rawBairro = typeof raw?.bairro === 'string' ? raw.bairro : '';
  const bairro = paraTitleCase(rawBairro);

  const rawMunicipio = typeof raw?.municipio === 'string' ? raw.municipio : '';
  const municipio = paraTitleCase(rawMunicipio);

  return {
    cep,
    logradouro,
    numero,
    bairro,
    municipio,
    uf: rawUf,
  };
}
