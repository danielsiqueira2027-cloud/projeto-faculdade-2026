'use client';

import React from 'react';
import Link from 'next/link';
import { ClipboardList, Clock, CheckCircle2, MessageSquare, ExternalLink, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MOCK_ORDERS = [
  { id: '1', professional: 'Marcos Silva', service: 'Reparo Elétrico', date: '2026-05-10', status: 'Em Andamento', price: 150.00 },
  { id: '2', professional: 'Ana Júlia', service: 'Pintura Residencial', date: '2026-04-28', status: 'Concluído', price: 450.00 },
  { id: '3', professional: 'Ricardo Oliveira', service: 'Limpeza de Ar Condicionado', date: '2026-05-05', status: 'Pendente', price: 200.00 },
  { id: '4', professional: 'Patrícia Lima', service: 'Jardinagem', date: '2026-04-15', status: 'Concluído', price: 320.00 },
];

export default function ClientOrdersPage() {
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
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#103569]">
          <ClipboardList size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter">Meus Pedidos</h2>
          <p className="text-slate-500 font-bold">Acompanhe o status de suas solicitações e contratações.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#103569] border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-white/80 text-sm uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> Concluídos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">
              {MOCK_ORDERS.filter(o => o.status === 'Concluído').length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#f7941d] border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-white/80 text-sm uppercase tracking-wider flex items-center gap-2">
              <Clock size={16} /> Em Aberto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">
              {MOCK_ORDERS.filter(o => o.status !== 'Concluído').length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-sm uppercase tracking-wider flex items-center gap-2">
              <DollarSign size={16} /> Investimento Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#103569]">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(MOCK_ORDERS.reduce((acc, o) => acc + o.price, 0))}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#103569] text-white">
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Profissional / Serviço</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Data</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider text-right">Valor</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#103569] text-lg">{order.professional}</span>
                      <span className="text-sm text-slate-400">{order.service}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-slate-600">{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                  </td>
                  <td className="px-6 py-6">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex items-center justify-end gap-1 font-bold text-[#103569]">
                      <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.price)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0 border-slate-200 hover:bg-slate-50" title="Ver Detalhes">
                        <ExternalLink size={16} className="text-[#103569]" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-9 px-3 gap-2 border-[#103569] text-[#103569] hover:bg-slate-50">
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

        {MOCK_ORDERS.length === 0 && (
          <div className="text-center py-20">
            <ClipboardList size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-xl text-slate-400 font-medium">Você ainda não tem nenhum pedido.</p>
            <Button asChild className="mt-6 bg-[#103569] text-white rounded-2xl">
              <Link href="/buscas">Explorar Profissionais</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
