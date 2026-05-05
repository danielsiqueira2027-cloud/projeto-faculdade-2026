'use client';

import React from 'react';
import { OrderList } from '@/components/orders/OrderList';
import { ClipboardList, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export default function MeusPedidosPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      {/* Page Header / Breadcrumbs */}
      <div className="bg-bp-primary text-white pt-12 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
            <ClipboardList size={400} strokeWidth={1} />
          </div>
        </div>
        
        <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
          <nav className="flex items-center gap-2 text-white/60 text-sm font-bold uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Home size={14} />
              Início
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">Meus Pedidos</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-white/80 text-xs font-black uppercase tracking-tighter mb-4 border border-white/10">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Painel do Cliente
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Meus Pedidos
              </h1>
              <p className="text-white/60 mt-3 text-lg font-medium max-w-xl">
                Acompanhe o status de suas solicitações, orçamentos e serviços contratados em um só lugar.
              </p>
            </div>
            
            <div className="hidden md:block">
              <div className="bg-bp-secondary-container/20 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="bg-bp-secondary-container p-3 rounded-xl">
                    <ClipboardList className="text-bp-on-secondary-container" size={24} />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-bold uppercase">Total de pedidos</p>
                    <p className="text-2xl font-black">05</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-[1200px] -mt-12 pb-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-zinc-200/50 p-6 md:p-10 border border-zinc-100">
          <OrderList />
        </div>
        
        {/* Support Banner */}
        <div className="mt-12 bg-bp-surface border-2 border-bp-secondary-container/30 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-bold text-bp-on-surface">Precisa de ajuda com algum pedido?</h4>
            <p className="text-bp-on-surface/60 font-medium">Nossa equipe de suporte está disponível de segunda a sexta, das 08h às 18h.</p>
          </div>
          <button className="bg-bp-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-bp-primary-container transition-all shadow-lg hover:-translate-y-1">
            Falar com Suporte
          </button>
        </div>
      </div>
    </div>
  );
}
