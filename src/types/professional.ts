/**
 * Repositorio de tipos para o módulo de Profissionais/Busca.
 * Baseado na estrutura legada vista em busca.html e busca.js.
 */

export interface Service {
  id: string;
  title: string;
  price: number;
  category: string;
  duration?: string;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  rating: number;
  distance: number;
  location: string;
  avatarUrl: string;
  bio?: string;
  services?: Service[];
}

/**
 * Mock data inicial para desenvolvimento, mantendo a compatibilidade
 * com os dados vistos no arquivo busca.html legado.
 */
export const PROFESSIONALS_MOCK: Professional[] = [
  { 
    id: '1', 
    name: 'Rodolfo Guimarães', 
    role: 'ENCANADOR', 
    rating: 4.9, 
    distance: 1.2, 
    location: "Santa Bárbara d'Oeste - SP", 
    avatarUrl: '/img/homem1.jpg',
    bio: 'Especialista em reparos hidráulicos residenciais e comerciais com mais de 10 anos de experiência.',
    services: [
      { id: 's1', title: 'Troca de Torneira', price: 80, category: 'Hidráulica' },
      { id: 's2', title: 'Reparo de Vazamento', price: 150, category: 'Hidráulica' },
      { id: 's3', title: 'Desentupimento', price: 120, category: 'Hidráulica' }
    ]
  },
  { 
    id: '2', 
    name: 'Guilherme Freitas', 
    role: 'ENCANADOR / ELETRICISTA', 
    rating: 5.0, 
    distance: 1.5, 
    location: "Santa Bárbara d'Oeste - SP", 
    avatarUrl: '/img/homem2.jpg',
    bio: 'Profissional multitarefas focado em soluções rápidas e seguras para sua casa.',
    services: [
      { id: 's4', title: 'Instalação de Chuveiro', price: 100, category: 'Elétrica' },
      { id: 's5', title: 'Troca de Fiação', price: 300, category: 'Elétrica' },
      { id: 's6', title: 'Reparo Hidráulico', price: 150, category: 'Hidráulica' }
    ]
  },
  { 
    id: '3', 
    name: 'Joaquim Silva', 
    role: 'ENCANADOR', 
    rating: 4.8, 
    distance: 2.3, 
    location: "Santa Bárbara d'Oeste - SP", 
    avatarUrl: '/img/homem3.jpg',
    services: [
      { id: 's7', title: 'Limpeza de Caixa d\'Água', price: 200, category: 'Hidráulica' },
      { id: 's8', title: 'Instalação de Vaso Sanitário', price: 180, category: 'Hidráulica' }
    ]
  },
  { 
    id: '4', 
    name: 'Carlos Santos', 
    role: 'ENCANADOR', 
    rating: 4.9, 
    distance: 3.0, 
    location: "Santa Bárbara d'Oeste - SP", 
    avatarUrl: '/img/homem4.jpg',
    services: [
      { id: 's9', title: 'Reparo de Válvula de Descarga', price: 120, category: 'Hidráulica' }
    ]
  },
  { 
    id: '5', 
    name: 'Filipe Mendonça', 
    role: 'ENCANADOR', 
    rating: 4.9, 
    distance: 3.2, 
    location: "Santa Bárbara d'Oeste - SP", 
    avatarUrl: '/img/homem2.jpg',
    services: [
      { id: 's10', title: 'Instalação de Filtro', price: 90, category: 'Hidráulica' }
    ]
  },
  { 
    id: '6', 
    name: 'Saulo Pedro', 
    role: 'ENCANADOR / MECÂNICO', 
    rating: 4.7, 
    distance: 4.1, 
    location: "Santa Bárbara d'Oeste - SP", 
    avatarUrl: '/img/homem3.jpg',
    services: [
      { id: 's11', title: 'Manutenção de Bomba', price: 250, category: 'Mecânica' }
    ]
  },
  { 
    id: '7', 
    name: 'João Souza', 
    role: 'ENCANADOR', 
    rating: 4.8, 
    distance: 4.6, 
    location: "Santa Bárbara d'Oeste - SP", 
    avatarUrl: '/img/homem1.jpg',
    services: [
      { id: 's12', title: 'Troca de Sifão', price: 70, category: 'Hidráulica' }
    ]
  },
  { 
    id: '8', 
    name: 'Lucas Fernando', 
    role: 'ENCANADOR / ELETRICISTA', 
    rating: 5.0, 
    distance: 5.2, 
    location: "Santa Bárbara d'Oeste - SP", 
    avatarUrl: '/img/homem4.jpg',
    services: [
      { id: 's13', title: 'Instalação de Luminária', price: 60, category: 'Elétrica' }
    ]
  },
];
