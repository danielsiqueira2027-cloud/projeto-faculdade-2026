'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, LogOut, User, Briefcase, LogIn, UserPlus } from 'lucide-react';

export function Header() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-md" style={{ backgroundColor: '#fddfa2', padding: '12px 24px' }}>
      <div className="flex items-center justify-between gap-4 mx-auto max-w-[1200px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline" style={{ color: '#103569', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <Image
            src="/imgs/misc/logo.png"
            alt="ClickServiço"
            width={35}
            height={35}
            className="object-contain"
          />
          <span>ClickServiço</span>
        </Link>

        {/* Busca */}
        <form onSubmit={handleSearch} className="relative" style={{ width: '35%' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar serviços, profissionais..."
            className="w-full outline-none"
            style={{
              padding: '8px 45px 8px 14px',
              borderRadius: '20px',
              border: '1px solid rgba(0,0,0,0.15)',
              backgroundColor: '#ebebeb',
              color: '#222',
              fontSize: '0.9rem',
            }}
          />
          {/* Divisor */}
          <span className="absolute" style={{ right: 40, top: '50%', transform: 'translateY(-50%)', height: '60%', width: 1, backgroundColor: '#ccc' }} />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="absolute" style={{ right: 44, top: '50%', transform: 'translateY(-50%)', color: '#999' }} aria-label="Limpar">
              <X size={14} />
            </button>
          )}
          <button type="submit" className="absolute" style={{ right: 12, top: '50%', transform: 'translateY(-50%)' }} aria-label="Buscar">
            <Search size={18} style={{ opacity: 0.6 }} />
          </button>
        </form>

        {/* Ações e Menu do Usuário */}
        <div className="flex items-center gap-4">

          {/* Nav links (Pedro + develop) */}
          <nav className="hidden lg:flex items-center gap-4 mr-2">
            <Link href="/categorias" className="no-underline font-medium hover:underline" style={{ color: '#0b2545' }}>
              Categorias
            </Link>
            <Link href="/cliente/pedidos" className="no-underline font-medium hover:underline" style={{ color: '#0b2545' }}>
              Meus pedidos
            </Link>
          </nav>

          {/* Botão "Seja profissional" (develop) */}
          <Link href="/cadastro">
            <button
              className="cursor-pointer transition-colors font-semibold"
              style={{ backgroundColor: '#0b2545', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 14px' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#103569')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0b2545')}
            >
              <Briefcase size={14} className="inline mr-1" />
              Seja um profissional
            </button>
          </Link>

          {/* Botão Cadastrar (Pedro) */}
          <Link
            href="#"
            className="flex items-center gap-2 rounded-xl bg-[#FDE9C9] px-4 py-2 text-sm font-bold text-[#0A1D37] no-underline shadow-sm transition-all hover:bg-[#F5D4A0] hover:shadow-md hover:-translate-y-0.5"
          >
            <UserPlus className="h-4 w-4" />
            Cadastrar
          </Link>

          {/* Área do usuário com Dropdown (develop) */}
          <div className="relative" ref={menuRef}>
            <a
              id="btnEntrar"
              href="#"
              onClick={(e) => { e.preventDefault(); setMenuOpen((o) => !o); }}
              className="flex items-center gap-2 font-semibold no-underline transition-all"
              style={{ color: '#0b2545', border: '1px solid #0b2545', padding: '6px 14px', borderRadius: 6 }}
            >
              <LogIn size={14} />
              Entrar
            </a>

            {menuOpen && (
              <div
                className="absolute"
                style={{
                  top: '150%', right: 0,
                  background: 'white', minWidth: 180,
                  padding: '15px 20px', borderRadius: 8,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                  border: '1px solid #e0e0e0',
                  zIndex: 9999, textAlign: 'left',
                }}
              >
                {/* Seta do dropdown */}
                <span
                  className="absolute"
                  style={{
                    top: -6, right: 11,
                    width: 12, height: 12,
                    background: 'white',
                    transform: 'rotate(45deg)',
                    borderLeft: '1px solid #e0e0e0',
                    borderTop: '1px solid #e0e0e0',
                  }}
                />
                <div className="mb-3 text-sm text-center" style={{ color: '#333', borderBottom: '1px solid #eee', paddingBottom: 10 }}>
                  Olá, <strong>Visitante</strong>
                </div>

                <Link href="/cliente/dashboard" className="flex items-center gap-2 py-2 text-sm no-underline" style={{ color: '#555' }} onClick={() => setMenuOpen(false)}>
                  <User size={14} /> Dashboard
                </Link>

                <Link href="/cliente/pedidos" className="flex items-center gap-2 py-2 text-sm no-underline" style={{ color: '#555' }} onClick={() => setMenuOpen(false)}>
                  Meus pedidos
                </Link>

                <Link href="/login" className="flex items-center gap-2 py-2 text-sm no-underline font-bold" style={{ color: '#0b2545' }} onClick={() => setMenuOpen(false)}>
                  Fazer login
                </Link>

                <hr style={{ border: 0, borderTop: '1px solid #eee', margin: '8px 0' }} />

                <button
                  id="logoutBtn"
                  className="w-full cursor-pointer transition-colors"
                  style={{ background: 'transparent', color: '#b30000', fontWeight: 'bold', border: '1px solid #b30000', padding: '6px 12px', borderRadius: 4 }}
                >
                  <LogOut size={14} className="inline mr-1" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
