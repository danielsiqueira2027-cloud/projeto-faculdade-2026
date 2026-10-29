export interface IbgeEstado {
  id: number;
  sigla: string;
  nome: string;
}

export interface IbgeMunicipio {
  id: number;
  nome: string;
}

export const UFS_VALIDAS = new Set([
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]);

/**
 * Lista estática oficial de todas as 27 Unidades Federativas do Brasil (IBGE).
 * Garante que a aplicação NUNCA fique indisponível mesmo se a API pública
 * do IBGE estiver fora do ar ou com bloqueio de rede na nuvem (ex: Vercel).
 */
export const ESTADOS_BRASIL: IbgeEstado[] = [
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
 * Principais municípios de referência por UF.
 * Garante sugestões imediatas caso a API do IBGE esteja instável ou fora do ar.
 */
export const PRINCIPAIS_MUNICIPIOS_POR_UF: Record<string, string[]> = {
  SP: [
    'São Paulo', 'Campinas', 'Guarulhos', 'São Bernardo do Campo', 'Santo André',
    'Osasco', 'Sorocaba', 'Ribeirão Preto', 'São José dos Campos', 'Santos',
    'Sumaré', "Santa Bárbara d'Oeste", 'Americana', 'Piracicaba', 'Limeira',
    'Hortolândia', 'Nova Odessa', 'Indaiatuba', 'Valinhos', 'Vinhedo',
    'Jundiaí', 'Barueri', 'Bauru', 'Franca', 'São Carlos', 'Taubaté',
    'Praia Grande', 'São Vicente', 'Mogi das Cruzes', 'Diadema', 'Mauá',
    'Carapicuíba', 'Itaquaquecetuba', 'Suzano', 'Taboão da Serra', 'Embu das Artes',
    'Marília', 'Presidente Prudente', 'Araraquara', 'Jacareí', 'Cotia', 'Itu'
  ],
  RJ: [
    'Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói',
    'Belford Roxo', 'Campos dos Goytacazes', 'São João de Meriti', 'Petrópolis',
    'Volta Redonda', 'Macaé', 'Magé', 'Itaboraí', 'Cabo Frio', 'Angra dos Reis',
    'Nova Friburgo', 'Barra Mansa', 'Mesquita', 'Teresópolis', 'Araruama'
  ],
  MG: [
    'Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim',
    'Montes Claros', 'Ribeirão das Neves', 'Uberaba', 'Governador Valadares',
    'Ipatinga', 'Sete Lagoas', 'Divinópolis', 'Santa Luzia', 'Ibirité', 'Poços de Caldas'
  ],
  PR: [
    'Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais',
    'Foz do Iguaçu', 'Colombo', 'Guarapuava', 'Paranaguá', 'Araucária', 'Toledo'
  ],
  RS: [
    'Porto Alegre', 'Caxias do Sul', 'Canoas', 'Pelotas', 'Santa Maria', 'Gravataí',
    'Viamão', 'Novo Hamburgo', 'São Leopoldo', 'Rio Grande', 'Alvorada', 'Passo Fundo'
  ],
  SC: [
    'Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Criciúma', 'Chapecó',
    'Itajaí', 'Jaraguá do Sul', 'Palhoça', 'Lages', 'Balneário Camboriú', 'Brusque'
  ],
  BA: [
    'Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Juazeiro',
    'Itabuna', 'Lauro de Freitas', 'Ilhéus', 'Jequié', 'Teixeira de Freitas', 'Barreiras'
  ],
  PE: [
    'Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina',
    'Paulista', 'Cabo de Santo Agostinho', 'Camaragibe', 'Garanhuns', 'Vitória de Santo Antão'
  ],
  CE: [
    'Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral',
    'Crato', 'Itapipoca', 'Maranguape', 'Iguatu', 'Quixadá'
  ],
  GO: [
    'Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Águas Lindas de Goiás',
    'Luziânia', 'Valparaíso de Goiás', 'Trindade', 'Formosa', 'Senador Canedo', 'Itumbiara'
  ],
  DF: ['Brasília', 'Ceilândia', 'Taguatinga', 'Samambaia', 'Plano Piloto', 'Águas Claras', 'Guará'],
  ES: ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Cachoeiro de Itapemirim', 'Linhares', 'Colatina'],
  MT: ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra', 'Sorriso'],
  MS: ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã'],
  AM: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari'],
  PA: ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Parauapebas', 'Castanhal'],
  RN: ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Macaíba'],
  PB: ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux'],
  AL: ['Maceió', 'Arapiraca', 'Rio Largo', 'Palmeira dos Índios'],
  MA: ['São Luís', 'Imperatriz', 'São José de Ribamar', 'Timon', 'Caxias'],
  PI: ['Teresina', 'Parnaíba', 'Picos', 'Piripiri'],
  SE: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana'],
  RO: ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal'],
  TO: ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional'],
  AC: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira'],
  AP: ['Macapá', 'Santana', 'Laranjal do Jari'],
  RR: ['Boa Vista', 'Rorainópolis', 'Caracaraí'],
};

