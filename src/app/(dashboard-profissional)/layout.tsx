'use client';

import React from 'react';
import { Briefcase, LayoutDashboard, Calendar, Settings, ListChecks, LogOut, Home, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function ProfissionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // In a real app, clear session/cookies here
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex min-h-screen bg-bp-surface">
      {/* Sidebar Profissional */}
      <aside className="w-64 bg-bp-primary-container text-white flex flex-col fixed h-full shadow-xl">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-bp-secondary-container p-1.5 rounded-lg">
            <Briefcase className="w-6 h-6 text-bp-on-secondary-container" />
          </div>
          <span className="text-xl font-bold tracking-tight">ClickServiço</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <p className="text-xs font-semibold text-bp-secondary-container uppercase tracking-wider px-2 mb-4">Painel do Profissional</p>
          
          <Link 
            href="/profissional/dashboard" 
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/profissional/dashboard') ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/80'}`}
          >
            <LayoutDashboard size={20} />
            <span>Painel Geral</span>
          </Link>
          
          <Link 
            href="/profissional/meus-servicos" 
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/profissional/meus-servicos') ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/80'}`}
          >
            <ListChecks size={20} />
            <span>Meus Serviços</span>
          </Link>

          <Link 
            href="/profissional/agenda" 
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/profissional/agenda') ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/80'}`}
          >
            <Calendar size={20} />
            <span>Agenda</span>
          </Link>

          <div className="pt-4 mt-4 border-t border-white/10">
            <Link href="/profissional/configuracoes" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-white/80">
              <Settings size={20} />
              <span>Configurações</span>
            </Link>
            <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-white/80">
              <Home size={20} />
              <span>Ver Site Público</span>
            </Link>
          </div>
        </nav>

        <div className="bg-bp-primary/30 p-4 m-4 rounded-xl border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-bp-secondary-container" />
            <span className="text-xs font-bold uppercase">Status Pro</span>
          </div>
          <p className="text-[10px] text-white/70">Sua avaliação média é 4.9. Continue assim!</p>
        </div>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-destructive/20 hover:text-destructive-foreground transition-colors text-white/80 cursor-pointer"
          >
            <LogOut size={20} />
            <span>Encerrar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8 flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-bp-outline-variant backdrop-blur-sm">
          <div>
            <h1 className="text-2xl font-bold text-bp-primary">Painel de Gestão</h1>
            <p className="text-sm text-bp-primary/60">Bem-vindo de volta, Construtora Silva</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-bp-primary">Construtora Silva</p>
              <div className="flex items-center gap-1 justify-end">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-bp-on-surface/60">Online</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-bp-primary flex items-center justify-center text-white font-bold shadow-lg">
              CS
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
