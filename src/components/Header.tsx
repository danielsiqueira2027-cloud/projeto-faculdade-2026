'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Briefcase, LogIn, UserPlus } from 'lucide-react';

export function Header() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => setQuery('');

  return (
    <header className="bg-brand-accent py-3.5 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-[1200px] flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 no-underline group">
          <div className="bg-white p-1.5 rounded-lg transition-transform group-hover:scale-105">
            <Briefcase className="w-8 h-8 text-brand-accent" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            ClickServiço
          </span>
        </Link>

        {/* Search */}
        <form 
          onSubmit={handleSearch}
          className="flex-1 max-w-[450px] relative group"
        >
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar serviços, profissionais..." 
            className="w-full bg-white text-gray-900 py-2.5 pl-4 pr-10 rounded-lg border-none outline-none text-[0.95rem] shadow-sm transition-shadow focus:ring-2 focus:ring-white/50"
          />
          {query && (
            <button 
              type="button"
              onClick={clearSearch}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
          )}
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-accent transition-colors"
          >
            <Search size={20} />
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-4 mr-2">
            <Link href="/categorias" className="no-underline text-white font-semibold transition-colors hover:text-[#ffeecb]">
              Categorias
            </Link>
            <Link href="#" className="no-underline text-white font-semibold transition-colors hover:text-[#ffeecb]">
              Meus pedidos
            </Link>
          </nav>

          {/* Login button */}
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white no-underline backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/20 hover:shadow-md"
          >
            <LogIn className="h-4 w-4" />
            Entrar
          </Link>

          {/* Register button */}
          <Link
            href="#"
            className="flex items-center gap-2 rounded-xl bg-[#FDE9C9] px-4 py-2 text-sm font-bold text-[#0A1D37] no-underline shadow-sm transition-all hover:bg-[#F5D4A0] hover:shadow-md hover:-translate-y-0.5"
          >
            <UserPlus className="h-4 w-4" />
            Cadastrar
          </Link>
        </div>
      </div>
    </header>
  );
}
