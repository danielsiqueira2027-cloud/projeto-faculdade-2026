'use client';

import React from 'react';
import { OrderList } from '@/components/orders/OrderList';
import { ClipboardList, Filter, Download, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function PedidosClientePage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link href="/dashboard/cliente" className="inline-flex items-center text-sm font-bold text-[#103569]/40 hover:text-[#103569] mb-4 transition-colors">
            <ChevronLeft size={16} className="mr-1" />
            Voltar para Dashboard
          </Link>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter">Meus Pedidos</h2>
          <p className="text-slate-500 font-bold">Gerencie todos os seus serviços solicitados.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50 h-12 px-6">
            <Filter className="mr-2 h-5 w-5" />
            Filtrar
          </Button>
          <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50 h-12 px-6">
            <Download className="mr-2 h-5 w-5" />
            Exportar
          </Button>
        </div>
      </div>

      <Card className="border border-slate-100 shadow-xl shadow-blue-900/5 rounded-[2rem] overflow-hidden bg-white">
        <CardHeader className="border-b border-slate-50 bg-slate-50/50 p-8">
          <CardTitle className="text-xl font-black text-[#103569] flex items-center gap-3">
            <div className="bg-[#103569] p-2 rounded-lg text-white">
              <ClipboardList size={20} />
            </div>
            Histórico de Serviços
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-8">
            <OrderList />
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-slate-100 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-[#103569]">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#f7941d] shadow-sm">
            <ClipboardList size={32} />
          </div>
          <div>
            <h4 className="text-2xl font-black tracking-tight">Precisa de um novo orçamento?</h4>
            <p className="text-slate-500 font-bold text-lg">Nossa rede de profissionais está pronta para te atender.</p>
          </div>
        </div>
        <Button asChild className="bg-[#f7941d] hover:bg-[#f7941d]/90 text-white rounded-2xl h-14 px-10 text-lg font-black shadow-lg">
          <Link href="/dashboard/cliente">Solicitar Agora</Link>
        </Button>
      </div>
    </div>
  );
}
