'use client';

import React, { useState } from 'react';
import { Order, OrderStatus } from '@/types/order';
import { OrderCard } from './OrderCard';
import { Search, Filter, HardHat } from 'lucide-react';

const MOCK_ORDERS: Order[] = [
  {
    id: '#89231',
    date: '2026-05-01',
    provider: 'ConstruMais Materiais',
    type: 'Loja de Construção',
    status: 'Concluído',
    total: 1250.80
  },
  {
    id: '#89245',
    date: '2026-05-03',
    provider: 'Ricardo Silva',
    type: 'Eletricista Profissional',
    status: 'Em Andamento',
    total: 450.00
  },
  {
    id: '#89250',
    date: '2026-05-04',
    provider: 'Ana Paula Arquitetura',
    type: 'Arquitetura e Design',
    status: 'Pendente',
    total: 2800.00
  },
  {
    id: '#89210',
    date: '2026-04-28',
    provider: 'Pedreira São Jorge',
    type: 'Fornecedor de Agregados',
    status: 'Concluído',
    total: 3400.00
  },
  {
    id: '#89260',
    date: '2026-05-05',
    provider: 'Mário Encanador',
    type: 'Serviços Hidráulicos',
    status: 'Cancelado',
    total: 150.00
  }
];

type FilterType = 'Todos' | 'Ativos' | 'Finalizados';

export function OrderList() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = MOCK_ORDERS.filter(order => {
    // Search filter
    const matchesSearch = order.provider.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    // Status filter
    if (activeFilter === 'Todos') return true;
    if (activeFilter === 'Ativos') return order.status === 'Pendente' || order.status === 'Em Andamento';
    if (activeFilter === 'Finalizados') return order.status === 'Concluído' || order.status === 'Cancelado';
    
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Filters Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-bp-surface/30 p-6 rounded-3xl border-2 border-bp-outline-variant/20 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {(['Todos', 'Ativos', 'Finalizados'] as FilterType[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all border-2 ${
                activeFilter === filter
                  ? 'bg-bp-primary text-white border-bp-primary shadow-md'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-bp-primary/30 hover:bg-zinc-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-xs group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-bp-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Buscar por ID ou nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-zinc-200 rounded-2xl outline-none focus:border-bp-primary/50 focus:ring-4 focus:ring-bp-primary/5 transition-all font-medium text-zinc-900"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400 bg-zinc-50/50 rounded-3xl border-2 border-dashed border-zinc-200">
            <div className="bg-white p-6 rounded-full shadow-sm mb-4">
              <HardHat size={48} className="text-zinc-200" />
            </div>
            <p className="text-lg font-bold text-zinc-500">Nenhum pedido encontrado</p>
            <p className="text-sm">Tente ajustar seus filtros ou busca.</p>
          </div>
        )}
      </div>
    </div>
  );
}
