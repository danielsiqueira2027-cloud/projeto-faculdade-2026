'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink,
  Calendar,
  DollarSign
} from 'lucide-react';

const CLIENT_ORDERS_MOCK = [
  { id: '1', professional: 'Marcos Silva', service: 'Reparo Elétrico', date: '2026-05-10', status: 'Em Andamento', price: 150.00 },
  { id: '2', professional: 'Ana Júlia', service: 'Pintura Residencial', date: '2026-04-28', status: 'Concluído', price: 450.00 },
  { id: '3', professional: 'Ricardo Oliveira', service: 'Limpeza de Ar Condicionado', date: '2026-05-05', status: 'Pendente', price: 200.00 },
  { id: '4', professional: 'Patrícia Lima', service: 'Jardinagem', date: '2026-04-15', status: 'Concluído', price: 320.00 },
];

export default function PedidosPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Concluído':
        return <Badge variant="success" className="gap-1"><CheckCircle2 size={12} /> Concluído</Badge>;
      case 'Em Andamento':
        return <Badge variant="info" className="gap-1"><Clock size={12} /> Em Andamento</Badge>;
      case 'Pendente':
        return <Badge variant="warning" className="gap-1"><Clock size={12} /> Pendente</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-bp-surface font-work-sans">
      {/* Header */}
      <section className="bg-bp-primary text-bp-on-primary py-12 px-4 shadow-lg">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-manrope">
                Meus Pedidos
              </h1>
              <p className="text-bp-outline-variant">
                Acompanhe o status de suas solicitações e contratações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl py-12 px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-bp-outline-variant">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-bp-primary-container text-white">
                  <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Profissional / Serviço</th>
                  <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Data</th>
                  <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider text-right">Valor</th>
                  <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bp-outline-variant">
                {CLIENT_ORDERS_MOCK.map((order) => (
                  <tr key={order.id} className="hover:bg-bp-surface-low transition-colors group">
                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-bp-primary text-lg">{order.professional}</span>
                        <span className="text-sm text-gray-500">{order.service}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={14} className="text-bp-secondary" />
                        <span>{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex items-center justify-end gap-1 font-bold text-bp-primary">
                        <span className="text-xs text-gray-400">R$</span>
                        <span>{order.price.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="h-9 w-9 p-0 border-bp-outline-variant hover:bg-bp-surface" title="Ver Detalhes">
                          <ExternalLink size={16} className="text-bp-primary" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-9 px-3 gap-2 border-bp-primary text-bp-primary hover:bg-bp-surface">
                          <MessageSquare size={16} />
                          <span className="hidden sm:inline">Chat</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {CLIENT_ORDERS_MOCK.length === 0 && (
            <div className="text-center py-20">
              <ClipboardList size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-500 font-medium">Você ainda não tem nenhum pedido.</p>
              <Button className="mt-6 bg-bp-primary text-white">
                Explorar Profissionais
              </Button>
            </div>
          )}
        </div>

        {/* Summary Card (Premium Detail) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-bp-secondary-container border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-bp-on-secondary-container text-sm uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 size={16} /> Total Concluídos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-bp-on-secondary-container">
                {CLIENT_ORDERS_MOCK.filter(o => o.status === 'Concluído').length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-bp-primary border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-white/80 text-sm uppercase tracking-wider flex items-center gap-2">
                <Clock size={16} /> Em Aberto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">
                {CLIENT_ORDERS_MOCK.filter(o => o.status !== 'Concluído').length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-bp-outline-variant shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-500 text-sm uppercase tracking-wider flex items-center gap-2">
                <DollarSign size={16} /> Investimento Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-bp-primary">
                R$ {CLIENT_ORDERS_MOCK.reduce((acc, o) => acc + o.price, 0).toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
