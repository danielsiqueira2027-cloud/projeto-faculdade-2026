'use client';

import React from 'react';
import { Calendar, Package, MoreHorizontal, CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';
import { Order } from '@/types/order';
import { BlueprintBadge } from '@/components/ui/BlueprintBadge';
import { BlueprintButton } from '@/components/ui/BlueprintButton';

interface OrderCardProps {
  order: Order;
}

const statusConfig = {
  'Pendente': {
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    badge: 'border-amber-200 text-amber-700 bg-amber-50'
  },
  'Em Andamento': {
    icon: Package,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    badge: 'border-blue-200 text-blue-700 bg-blue-50'
  },
  'Concluído': {
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    badge: 'border-emerald-200 text-emerald-700 bg-emerald-50'
  },
  'Cancelado': {
    icon: XCircle,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    badge: 'border-rose-200 text-rose-700 bg-rose-50'
  }
};

export function OrderCard({ order }: OrderCardProps) {
  const config = statusConfig[order.status] || statusConfig['Pendente'];
  const StatusIcon = config.icon;

  return (
    <div className="bg-white border-2 border-bp-outline-variant/30 rounded-2xl p-5 transition-all hover:shadow-lg hover:border-bp-secondary-container/50 group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Order Info */}
        <div className="flex gap-4">
          <div className={`hidden sm:flex items-center justify-center w-12 h-12 rounded-xl ${config.bg} ${config.color} shrink-0`}>
            <StatusIcon size={24} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-bp-primary uppercase tracking-widest">
                Pedido {order.id}
              </span>
              <BlueprintBadge className={config.badge}>
                {order.status}
              </BlueprintBadge>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 group-hover:text-bp-primary transition-colors">
              {order.provider}
            </h3>
            <p className="text-sm text-zinc-500 font-medium">
              {order.type}
            </p>
          </div>
        </div>

        {/* Details & Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10">
          <div className="flex items-center gap-2 text-zinc-600">
            <Calendar size={18} className="text-zinc-400" />
            <span className="text-sm font-semibold">
              {new Date(order.date).toLocaleDateString('pt-BR')}
            </span>
          </div>
          
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-tighter">Total</span>
            <span className="text-xl font-black text-bp-secondary">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total)}
            </span>
          </div>

          <BlueprintButton variant="outline" size="sm" className="w-full sm:w-auto border-2">
            Ver Detalhes
          </BlueprintButton>
        </div>
      </div>
    </div>
  );
}
