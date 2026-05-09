export type OrderStatus = 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado';

export interface Order {
  id: string;
  date: string;
  provider: string;
  type: string;
  status: OrderStatus;
  total: number;
  imageUrl?: string;
}
