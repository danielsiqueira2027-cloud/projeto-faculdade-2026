'use client';

import React from 'react';
import { OrderList } from '@/components/orders/OrderList';
import { ClipboardList, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PedidosClientePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-bp-on-surface">Meus Pedidos</h2>
          <p className="text-bp-on-surface/60">Gerencie todos os seus serviços solicitados.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="rounded-lg border-bp-outline-variant">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg border-bp-outline-variant">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Card className="border-bp-outline-variant shadow-sm">
        <CardHeader className="border-b bg-bp-surface-low/50">
          <CardTitle className="text-lg flex items-center gap-2">
            <ClipboardList className="text-bp-primary" />
            Lista de Pedidos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* We use the existing OrderList component */}
          <div className="p-6">
            <OrderList />
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-bp-primary/5 border border-bp-primary/10 rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-bp-primary/10 flex items-center justify-center text-bp-primary">
            <ClipboardList size={24} />
          </div>
          <div>
            <h4 className="font-bold text-bp-primary">Precisa de um novo orçamento?</h4>
            <p className="text-sm text-bp-primary/70">Nossa rede de profissionais está pronta para te atender.</p>
          </div>
        </div>
        <Button className="bg-bp-primary hover:bg-bp-primary/90 text-white rounded-xl">
          Solicitar Agora
        </Button>
      </div>
    </div>
  );
}
