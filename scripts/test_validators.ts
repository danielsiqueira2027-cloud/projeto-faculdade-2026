import {
  validarCPF,
  validarCNPJ,
  validarCpfOuCnpj,
  validarTelefoneBR,
  mascararCpfCnpj,
  mascararTelefone,
  normalizarTelefone,
  validarRedirectSeguro,
} from '../src/lib/validators';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FALHA: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ OK: ${message}`);
  }
}

console.log('--- TESTANDO VALIDAÇÃO DE CPF ---');
// CPFs válidos conhecidos com algoritmo oficial
assert(validarCPF('52998224725'), 'CPF válido sem formatação deve ser aceito');
assert(validarCPF('529.982.247-25'), 'CPF válido com formatação deve ser aceito');
assert(validarCPF('01234567890'), 'CPF válido iniciando em 0 deve ser aceito');

// CPFs inválidos
assert(!validarCPF('52998224726'), 'CPF com dígito verificador incorreto deve ser rejeitado');
assert(!validarCPF('12345678901'), 'CPF fictício com DV errado deve ser rejeitado');
assert(!validarCPF('00000000000'), 'CPF repetido (zeros) deve ser rejeitado');
assert(!validarCPF('11111111111'), 'CPF repetido (uns) deve ser rejeitado');
assert(!validarCPF('123'), 'CPF incompleto deve ser rejeitado');
assert(!validarCPF(''), 'CPF vazio deve ser rejeitado');

console.log('\n--- TESTANDO VALIDAÇÃO DE CNPJ ---');
// CNPJs válidos conhecidos
assert(validarCNPJ('11222333000181'), 'CNPJ válido sem formatação deve ser aceito');
assert(validarCNPJ('11.222.333/0001-81'), 'CNPJ válido com formatação deve ser aceito');
assert(validarCNPJ('00000000000191'), 'CNPJ Banco do Brasil válido deve ser aceito');

// CNPJs inválidos
assert(!validarCNPJ('11222333000182'), 'CNPJ com dígito incorreto deve ser rejeitado');
assert(!validarCNPJ('00000000000000'), 'CNPJ repetido deve ser rejeitado');
assert(!validarCNPJ('11111111111111'), 'CNPJ repetido deve ser rejeitado');
assert(!validarCNPJ('123456789'), 'CNPJ incompleto deve ser rejeitado');

console.log('\n--- TESTANDO validarCpfOuCnpj ---');
const r1 = validarCpfOuCnpj('529.982.247-25');
assert(r1.valido && r1.tipo === 'CPF', 'validarCpfOuCnpj reconhece CPF válido');

const r2 = validarCpfOuCnpj('11.222.333/0001-81');
assert(r2.valido && r2.tipo === 'CNPJ', 'validarCpfOuCnpj reconhece CNPJ válido');

const r3 = validarCpfOuCnpj('000.000.000-00');
assert(!r3.valido && r3.tipo === 'CPF', 'validarCpfOuCnpj reconhece tipo CPF mas com valido=false');

const r4 = validarCpfOuCnpj('12345');
assert(!r4.valido && r4.tipo === null, 'validarCpfOuCnpj retorna tipo null para tamanho inválido');

console.log('\n--- TESTANDO VALIDAÇÃO DE TELEFONE BR ---');
// Celulares válidos (11 dígitos, 9º dígito obrigatório)
assert(validarTelefoneBR('19985478596'), 'Celular 11 dígitos válido (DDD 19) deve ser aceito');
assert(validarTelefoneBR('(19) 98547-8596'), 'Celular formatado deve ser aceito');
assert(validarTelefoneBR('(11) 91234-5678'), 'Celular SP (DDD 11) deve ser aceito');

// Telefones fixos válidos (10 dígitos)
assert(validarTelefoneBR('1934567890'), 'Telefone fixo 10 dígitos (DDD 19) deve ser aceito');
assert(validarTelefoneBR('(11) 2345-6789'), 'Telefone fixo formatado deve ser aceito');

// Telefones inválidos
assert(!validarTelefoneBR('19885478596'), 'Celular 11 dígitos sem 9 no início deve ser rejeitado');
assert(!validarTelefoneBR('00999999999'), 'Telefone com DDD 00 inválido deve ser rejeitado');
assert(!validarTelefoneBR('20999999999'), 'Telefone com DDD 20 inexistente deve ser rejeitado');
assert(!validarTelefoneBR('11111111111'), 'Telefone repetido deve ser rejeitado');
assert(!validarTelefoneBR('12345'), 'Telefone com dígitos insuficientes deve ser rejeitado');

console.log('\n--- TESTANDO MÁSCARAS E NORMALIZAÇÃO ---');
assert(mascararCpfCnpj('52998224725') === '529.982.247-25', 'Máscara CPF completa correta');
assert(mascararCpfCnpj('529982') === '529.982', 'Máscara CPF progressiva parcial correta');
assert(mascararCpfCnpj('11222333000181') === '11.222.333/0001-81', 'Máscara CNPJ completa correta');
assert(mascararCpfCnpj('1122233300018199999') === '11.222.333/0001-81', 'Máscara CNPJ limita ao máximo de 14 dígitos');

assert(mascararTelefone('19985478596') === '(19) 98547-8596', 'Máscara celular completa correta');
assert(mascararTelefone('1934567890') === '(19) 3456-7890', 'Máscara fixo completa correta');
assert(mascararTelefone('1998') === '(19) 98', 'Máscara telefone progressiva parcial correta');

assert(normalizarTelefone('(19) 98547-8596') === '19985478596', 'Normalização de telefone extrai apenas dígitos');

console.log('\n--- TESTANDO VALIDAÇÃO DE REDIRECT SEGURO ---');
assert(validarRedirectSeguro('/seja-profissional/ativar') === '/seja-profissional/ativar', 'Caminho interno válido aceito');
assert(validarRedirectSeguro('/dashboard/profissional') === '/dashboard/profissional', 'Caminho de dashboard aceito');
assert(validarRedirectSeguro('/cadastro?tipo=profissional&next=/ativar') === '/cadastro?tipo=profissional&next=/ativar', 'Caminho com query aceito');
assert(validarRedirectSeguro('https://evil.com') === null, 'URL externa com https rejeitada');
assert(validarRedirectSeguro('http://evil.com') === null, 'URL externa com http rejeitada');
assert(validarRedirectSeguro('//evil.com') === null, 'Protocol-relative URL rejeitada');
assert(validarRedirectSeguro('/\\evil.com') === null, 'URL com barra invertida rejeitada');
assert(validarRedirectSeguro('javascript:alert(1)') === null, 'URL javascript: rejeitada');
assert(validarRedirectSeguro(null) === null, 'null rejeitado');
assert(validarRedirectSeguro('') === null, 'String vazia rejeitada');

console.log('\n🎉 TODOS OS TESTES PASSARAM COM SUCESSO!\n');

