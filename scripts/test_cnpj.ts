import { normalizarDadosCnpj, paraTitleCase } from '../src/lib/cnpj';

function assertEqual(actual: unknown, expected: unknown, testName: string) {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr === expectedStr) {
    console.log(`✅ OK: ${testName}`);
  } else {
    console.error(`❌ FALHA: ${testName}`);
    console.error(`   Esperado: ${expectedStr}`);
    console.error(`   Obtido:   ${actualStr}`);
    process.exit(1);
  }
}

console.log('--- TESTANDO paraTitleCase ---');
assertEqual(paraTitleCase('SAUN QUADRA 5 LOTE B'), 'Saun Quadra 5 Lote B', 'Converte caixa alta para Title Case');
assertEqual(paraTitleCase('RUA DAS FLORES'), 'Rua das Flores', 'Respeita preposições em caixa alta (das)');
assertEqual(paraTitleCase('AVENIDA DO ESTADO'), 'Avenida do Estado', 'Respeita preposições em caixa alta (do)');
assertEqual(paraTitleCase('BRASILIA'), 'Brasilia', 'Palavra única em caixa alta');
assertEqual(paraTitleCase('ASA NORTE'), 'Asa Norte', 'Duas palavras em caixa alta');
assertEqual(paraTitleCase('Rua das Flores'), 'Rua das Flores', 'Preserva texto que já tem minúsculas');
assertEqual(paraTitleCase('SN'), 'S/N', 'Normaliza SN para S/N');
assertEqual(paraTitleCase(''), '', 'String vazia retorna vazia');

console.log('\n--- TESTANDO normalizarDadosCnpj COM MOCK DA BRASILAPI ---');

const mockBrasilApiBancoDoBrasil = {
  cnpj: '00000000000191',
  razao_social: 'BANCO DO BRASIL SA',
  nome_fantasia: 'DIRECAO GERAL',
  logradouro: 'SAUN QUADRA 5 LOTE B',
  numero: 'SN',
  complemento: 'TORRE I, II, III',
  bairro: 'ASA NORTE',
  cep: '70040912',
  uf: 'df',
  municipio: 'BRASILIA',
};

const normalized = normalizarDadosCnpj(mockBrasilApiBancoDoBrasil);

assertEqual(normalized.cep, '70040-912', 'CEP formatado com máscara e 8 dígitos');
assertEqual(normalized.uf, 'DF', 'UF convertida para 2 letras maiúsculas');
assertEqual(normalized.logradouro, 'Saun Quadra 5 Lote B', 'Logradouro em Title Case');
assertEqual(normalized.numero, 'S/N', 'Número SN normalizado para S/N');
assertEqual(normalized.bairro, 'Asa Norte', 'Bairro em Title Case');
assertEqual(normalized.municipio, 'Brasilia', 'Município em Title Case');

console.log('\n--- TESTANDO normalizarDadosCnpj COM DADOS NULOS / VAZIOS ---');
const emptyNormalized = normalizarDadosCnpj(null);
assertEqual(emptyNormalized, {
  cep: '',
  logradouro: '',
  numero: '',
  bairro: '',
  municipio: '',
  uf: '',
}, 'Trata null retornando estrutura vazia segura');

const partialMock = {
  cep: '13450000',
  uf: 'SP',
  logradouro: 'Rua Quinze de Novembro',
  numero: '123',
  bairro: 'Centro',
  municipio: 'Santa Bárbara d\'Oeste',
};
const partialNormalized = normalizarDadosCnpj(partialMock);
assertEqual(partialNormalized.cep, '13450-000', 'CEP parcial formatado');
assertEqual(partialNormalized.numero, '123', 'Número numérico preservado');
assertEqual(partialNormalized.logradouro, 'Rua Quinze de Novembro', 'Logradouro misto preservado');

console.log('\n🎉 TODOS OS TESTES DE CNPJ PASSARAM COM SUCESSO!');
