/**
 * Repositorio de tipos para o módulo de Categorias.
 * Baseado na estrutura legada e inferências de uso.
 */

export interface Category {
  /** Identificador único da categoria (ex: 'encanador') */
  id: string;
  
  /** Nome de exibição da categoria (ex: 'ENCANADOR') */
  name: string;
  
  /** Ícone ou Emoji representativo (ex: '💧') */
  icon: string;
  
  /** Descrição curta opcional */
  description?: string;
  
  /** Slug para navegação na URL */
  slug: string;
}

/**
 * Mock data inicial para desenvolvimento, mantendo a compatibilidade
 * com os dados vistos no arquivo categorias.html legado.
 */
export const CATEGORIES_MOCK: Category[] = [
  { id: '1', name: 'ENCANADOR', icon: '💧', slug: 'encanador' },
  { id: '2', name: 'PINTOR', icon: '🎨', slug: 'pintor' },
  { id: '3', name: 'ELETRICISTA', icon: '⚡', slug: 'eletricista' },
  { id: '4', name: 'PEDREIRO', icon: '🧱', slug: 'pedreiro' },
  { id: '5', name: 'CARPINTEIRO', icon: '🪚', slug: 'carpinteiro' },
];
