'use client';

import React from 'react';
import { Briefcase, LayoutDashboard, ShoppingBag, User, LogOut, Home, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function ClienteLayout({
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
    <div className="flex min-h-screen bg-bp-surface-low">
      {/* Sidebar Cliente */}
      <aside className="w-64 bg-bp-primary text-white flex flex-col fixed h-full">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-white p-1.5 rounded-lg">
            <Briefcase className="w-6 h-6 text-bp-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight">ClickServiço</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wider px-2 mb-4">Menu Cliente</p>
          
          <Link 
            href="/cliente/dashboard" 
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/cliente/dashboard') ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/80'}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            href="/cliente/pedidos" 
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/cliente/pedidos') ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/80'}`}
          >
            <ShoppingBag size={20} />
            <span>Meus Pedidos</span>
          </Link>

          <Link 
            href="/cliente/perfil" 
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/cliente/perfil') ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/80'}`}
          >
            <User size={20} />
            <span>Meu Perfil</span>
          </Link>

          <div className="pt-4 mt-4 border-t border-white/10">
            <Link href="/busca" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-white/80">
              <Search size={20} />
              <span>Buscar Profissionais</span>
            </Link>
            <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-white/80">
              <Home size={20} />
              <span>Ir para Home</span>
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-destructive/20 hover:text-destructive-foreground transition-colors text-white/80 cursor-pointer"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-bp-on-surface">Área do Cliente</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-bp-on-surface">Caputi</p>
              <p className="text-xs text-bp-on-surface/60 italic">Cliente Premium</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-bp-secondary-container flex items-center justify-center text-bp-on-secondary-container font-bold">
              C
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
