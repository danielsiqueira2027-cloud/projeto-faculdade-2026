/**
 * Helpers puros de validação e formatação (máscaras) para CPF, CNPJ e Telefone BR.
 * Não possui dependências externas.
 */

// Lista oficial de DDDs válidos no Brasil
const DDDS_BRASIL_VALIDOS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, // SP
  21, 22, 24,                         // RJ
  27, 28,                             // ES
  31, 32, 33, 34, 35, 37, 38,         // MG
  41, 42, 43, 44, 45, 46,             // PR
  47, 48, 49,                         // SC
  51, 53, 54, 55,                     // RS
  61,                                 // DF/GO
  62, 64,                             // GO
  63,                                 // TO
  65, 66,                             // MT
  67,                                 // MS
  68,                                 // AC
  69,                                 // RO
  71, 73, 74, 75, 77,                 // BA
  79,                                 // SE
  81, 87,                             // PE
  82,                                 // AL
  83,                                 // PB
  84,                                 // RN
  85, 88,                             // CE
  86, 89,                             // PI
  91, 93, 94,                         // PA
  92, 97,                             // AM
  95,                                 // RR
  96,                                 // AP
  98, 99,                             // MA
]);

/**
 * Remove todos os caracteres não numéricos de uma string de telefone.
 */
export function normalizarTelefone(str: string): string {
  if (!str) return '';
  return str.replace(/\D/g, '');
}

/**
 * Valida um CPF calculando os dois dígitos verificadores (módulo 11).
 * Exige 11 dígitos numéricos e rejeita sequências repetidas (000..., 111...).
 */
export function validarCPF(str: string): boolean {
  if (!str) return false;
  const digits = str.replace(/\D/g, '');

  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  // Primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(digits[i], 10) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(digits[9], 10)) return false;

  // Segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(digits[i], 10) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(digits[10], 10)) return false;

  return true;
}

/**
 * Valida um CNPJ calculando os dois dígitos verificadores (módulo 11 com pesos).
 * Exige 14 dígitos numéricos e rejeita sequências repetidas (000..., 111...).
 */
export function validarCNPJ(str: string): boolean {
  if (!str) return false;
  const digits = str.replace(/\D/g, '');

  if (digits.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(digits)) return false;

  // Primeiro dígito verificador
  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(digits[i], 10) * pesos1[i];
  }
  let resto = soma % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;
  if (digito1 !== parseInt(digits[12], 10)) return false;

  // Segundo dígito verificador
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  soma = 0;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(digits[i], 10) * pesos2[i];
  }
  resto = soma % 11;
  const digito2 = resto < 2 ? 0 : 11 - resto;
  if (digito2 !== parseInt(digits[13], 10)) return false;

  return true;
}

/**
 * Decide se o documento é CPF ou CNPJ baseado no número de dígitos (11 ou 14).
 * Retorna { valido, tipo: 'CPF' | 'CNPJ' | null }.
 */
export function validarCpfOuCnpj(str: string): {
  valido: boolean;
  tipo: 'CPF' | 'CNPJ' | null;
} {
  if (!str) return { valido: false, tipo: null };
  const digits = str.replace(/\D/g, '');

  if (digits.length === 11) {
    return {
      valido: validarCPF(digits),
      tipo: 'CPF',
    };
  }

  if (digits.length === 14) {
    return {
      valido: validarCNPJ(digits),
      tipo: 'CNPJ',
    };
  }

  return {
    valido: false,
    tipo: null,
  };
}

/**
 * Valida número de telefone brasileiro (fixo ou celular).
 * - Exige 10 ou 11 dígitos numéricos
 * - DDD válido no Brasil (11 a 99 existente)
 * - Se celular (11 dígitos): o 3º dígito deve ser obrigatoriamente 9
 * - Rejeita números com todos os dígitos iguais
 */
export function validarTelefoneBR(str: string): boolean {
  if (!str) return false;
  const digits = str.replace(/\D/g, '');

  if (digits.length !== 10 && digits.length !== 11) return false;
  if (/^(\d)\1+$/.test(digits)) return false;

  const ddd = parseInt(digits.slice(0, 2), 10);
  if (!DDDS_BRASIL_VALIDOS.has(ddd)) return false;

  // Celular (11 dígitos): nono dígito obrigatório
  if (digits.length === 11) {
    if (digits[2] !== '9') return false;
  } else {
    // Fixo (10 dígitos): primeiro dígito do número deve ser 2, 3, 4 ou 5
    if (!['2', '3', '4', '5'].includes(digits[2])) return false;
  }

  return true;
}

/**
 * Aplica máscara progressiva em CPF (até 11 dígitos) ou CNPJ (até 14 dígitos).
 * - CPF: 000.000.000-00
 * - CNPJ: 00.000.000/0000-00
 * Limita automaticamente ao tamanho máximo de 14 dígitos (18 caracteres formatados).
 */
export function mascararCpfCnpj(str: string): string {
  if (!str) return '';
  const digits = str.replace(/\D/g, '').slice(0, 14);

  if (digits.length <= 11) {
    return digits
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
  }

  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
}

/**
 * Aplica máscara progressiva em telefone brasileiro.
 * - Fixo (10 dígitos): (00) 0000-0000
 * - Celular (11 dígitos): (00) 00000-0000
 * Limita automaticamente a 11 dígitos numéricos.
 */
export function mascararTelefone(str: string): string {
  if (!str) return '';
  const digits = str.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 2) {
    return digits.length > 0 ? `(${digits}` : '';
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Valida um caminho de redirecionamento interno contra open redirect.
 * Permite apenas caminhos relativos seguros iniciados com '/' (ex: '/dashboard', '/seja-profissional/ativar').
 * Rejeita valores nulos, caminhos com protocolo ('http://', 'javascript:'), '//evil.com' e barras invertidas '\\'.
 */
export function validarRedirectSeguro(url: unknown): string | null {
  if (typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Deve iniciar com '/' único e não com '//' (protocol-relative) ou conter ':\' ou '://'
  if (
    trimmed.startsWith('/') &&
    !trimmed.startsWith('//') &&
    !trimmed.includes('://') &&
    !trimmed.includes('\\')
  ) {
    return trimmed;
  }

  return null;
}

