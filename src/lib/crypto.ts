import crypto from 'node:crypto';

/**
 * Obtém a chave de 32 bytes para cifragem AES-256-GCM a partir de CPF_ENCRYPTION_KEY.
 */
function getEncryptionKey(): Buffer {
  const keyHex = process.env.CPF_ENCRYPTION_KEY;
  if (!keyHex) {
    throw new Error('Chave de criptografia de CPF (CPF_ENCRYPTION_KEY) não definida nas variáveis de ambiente.');
  }

  const keyBuffer = /^[0-9a-fA-F]{64}$/.test(keyHex)
    ? Buffer.from(keyHex, 'hex')
    : Buffer.from(keyHex, 'utf-8');

  if (keyBuffer.length !== 32) {
    throw new Error(
      `CPF_ENCRYPTION_KEY inválida: esperado 32 bytes (64 caracteres hexadecimais), obtido ${keyBuffer.length} bytes.`
    );
  }

  return keyBuffer;
}

/**
 * Obtém o pepper para geração de HMAC-SHA256 a partir de CPF_HASH_PEPPER.
 */
function getHashPepper(): Buffer {
  const pepper = process.env.CPF_HASH_PEPPER;
  if (!pepper) {
    throw new Error('Pepper de hash de CPF (CPF_HASH_PEPPER) não definido nas variáveis de ambiente.');
  }

  return /^[0-9a-fA-F]{64}$/.test(pepper)
    ? Buffer.from(pepper, 'hex')
    : Buffer.from(pepper, 'utf-8');
}

/**
 * Normaliza um CPF mantendo exclusivamente seus dígitos numéricos.
 */
export function normalizarCPF(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

/**
 * Cifra o CPF utilizando AES-256-GCM.
 * Retorna uma string em base64 contendo: IV (12 bytes) + AuthTag (16 bytes) + Ciphertext.
 *
 * @param cpf CPF em texto (com ou sem pontuação)
 * @returns String codificada em Base64
 */
export function cifrarCPF(cpf: string): string {
  if (!cpf) {
    throw new Error('CPF não pode ser vazio para cifragem.');
  }

  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12); // Padrão seguro para AES-GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  const ciphertext = Buffer.concat([
    cipher.update(cpf, 'utf8'),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag(); // 16 bytes de tag de autenticação

  // Concatena: [IV 12B][AuthTag 16B][Ciphertext NB]
  const combined = Buffer.concat([iv, authTag, ciphertext]);
  return combined.toString('base64');
}

/**
 * Decifra um CPF cifrado com AES-256-GCM codificado em Base64.
 *
 * @param cpfCifrado String base64 gerada por cifrarCPF()
 * @returns CPF original em texto
 */
export function decifrarCPF(cpfCifrado: string): string {
  if (!cpfCifrado) {
    throw new Error('Dado de CPF cifrado vazio.');
  }

  const key = getEncryptionKey();
  const combined = Buffer.from(cpfCifrado, 'base64');

  if (combined.length < 28) {
    throw new Error('Carga cifrada corrompida ou incompleta: tamanho inferior aos 28 bytes do cabeçalho GCM.');
  }

  const iv = combined.subarray(0, 12);
  const authTag = combined.subarray(12, 28);
  const ciphertext = combined.subarray(28);

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
}

/**
 * Gera um hash HMAC-SHA256 determinístico a partir do CPF normalizado (apenas dígitos).
 * Usado exclusivamente para validação de unicidade / busca de duplicidade sem expor o dado.
 *
 * @param cpf CPF em texto (com ou sem pontuação)
 * @returns Hash hexadecimal de 64 caracteres
 */
export function hashCPF(cpf: string): string {
  if (!cpf) {
    throw new Error('CPF não fornecido para hash.');
  }

  const pepper = getHashPepper();
  const normalized = normalizarCPF(cpf);

  return crypto
    .createHmac('sha256', pepper)
    .update(normalized)
    .digest('hex');
}
