import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlueprintBadge } from '@/components/ui/BlueprintBadge';
import { Search, PlusCircle, ShoppingBag, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const MOCK_PEDIDOS = [
  { id: 'ORD-001', servico: 'Reforma de Banheiro', profissional: 'João Pedreiro', data: '12/05/2026', status: 'Em Aberto', cor: 'blue' },
  { id: 'ORD-002', servico: 'Instalação Elétrica', profissional: 'Eletro-Max', data: '10/05/2026', status: 'Confirmado', cor: 'green' },
  { id: 'ORD-003', servico: 'Pintura de Fachada', profissional: 'Pinturas Silva', data: '05/05/2026', status: 'Finalizado', cor: 'gray' },
];

export default function ClienteDashboard() {
  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-bp-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-bp-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 desde o último mês</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-bp-secondary-container">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serviços em Aberto</CardTitle>
            <Clock className="h-4 w-4 text-bp-on-secondary-container" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Aguardando confirmação</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">Sucesso total</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button asChild className="bg-bp-primary hover:bg-bp-primary/90 text-white h-12 px-6 rounded-xl shadow-lg">
          <Link href="/busca">
            <Search className="mr-2 h-5 w-5" />
            Buscar Profissional
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-12 px-6 rounded-xl border-bp-primary text-bp-primary hover:bg-bp-primary/5">
          <Link href="/orcamento">
            <PlusCircle className="mr-2 h-5 w-5" />
            Solicitar Novo Orçamento
          </Link>
        </Button>
      </div>

      {/* Recent Orders List */}
      <Card className="border-bp-outline-variant shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Pedidos Recentes</CardTitle>
              <CardDescription>Acompanhe o status dos seus últimos serviços solicitados.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/cliente/pedidos" className="text-bp-primary font-semibold flex items-center">
                Ver todos <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOCK_PEDIDOS.map((pedido) => (
              <div key={pedido.id} className="flex items-center justify-between p-4 rounded-xl border border-bp-outline-variant hover:bg-bp-surface-low transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${pedido.cor}-100 text-${pedido.cor}-600`}>
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-bp-on-surface">{pedido.servico}</h4>
                    <p className="text-sm text-bp-on-surface/60">{pedido.profissional} • {pedido.data}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    pedido.status === 'Confirmado' ? 'bg-green-100 text-green-700' : 
                    pedido.status === 'Em Aberto' ? 'bg-blue-100 text-blue-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {pedido.status}
                  </span>
                  <ChevronRight className="text-bp-outline-variant group-hover:text-bp-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
