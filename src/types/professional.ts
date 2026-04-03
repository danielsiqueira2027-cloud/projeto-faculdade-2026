/**
 * Repositorio de tipos para o módulo de Profissionais/Busca.
 * Baseado na estrutura legada vista em busca.html e busca.js.
 */

export interface Professional {
  id: string;
  name: string;
  role: string;
  rating: number;
  distance: number;
  location: string;
  avatarUrl: string;
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
    avatarUrl: '/img/homem1.jpg' 
  },
  { 
    id: '2', 
    name: 'Guilherme Freitas', 
    role: 'ENCANADOR / ELETRICISTA', 
    rating: 5.0, 
    distance: 1.5, 
    location: "Santa Bárbara d'Oeste - SP", 
    avatarUrl: '/img/homem2.jpg' 
  },
  { 
    id: '3', 
    name: 'Joaquim Silva', 
    role: 'ENCANADOR', 
    rating: 4.8, 
    distance: 2.3, 
    location: "Santa Bárbara d'Oeste - SP", 
    avatarUrl: '/img/homem3.jpg' 
  },
  { 
    id: '4', 
    name: 'Carlos Santos', 
    role: 'ENCANADOR', 
    rating: 4.9, 
    distance: 3.0, 
    location: "Santa Bárbara d'Oeste - SP", 
    avatarUrl: '/img/homem4.jpg' 
  },
  { 
    id: '5', 
    name: 'Filipe Mendonça', 
    role: 'ENCANADOR', 
    rating: 4.9, 
    distance: 3.2, 
    location: "Santa Bárbara d'Oeste - SP", 
    avatarUrl: '/img/homem2.jpg' 
  },
  { 
    id: '6', 
    name: 'Saulo Pedro', 
    role: 'ENCANADOR / MECÂNICO', 
    rating: 4.7, 
    distance: 4.1, 
    location: "Santa Bárbara d'Oeste - SP", 
    avatarUrl: '/img/homem3.jpg' 
  },
  { 
    id: '7', 
    name: 'João Souza', 
    role: 'ENCANADOR', 
    rating: 4.8, 
    distance: 4.6, 
    location: "Santa Bárbara d'Oeste - SP", 
    avatarUrl: '/img/homem1.jpg' 
  },
  { 
    id: '8', 
    name: 'Lucas Fernando', 
    role: 'ENCANADOR / ELETRICISTA', 
    rating: 5.0, 
    distance: 5.2, 
    location: "Santa Bárbara d'Oeste - SP", 
    avatarUrl: '/img/homem4.jpg' 
  },
];
