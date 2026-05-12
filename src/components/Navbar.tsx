'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { usePathname, useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, User } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = React.useState<{ name: string; role: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('user');
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (savedUser && loggedIn) {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
    
    // Opcional: ouvir eventos de storage para sincronização entre abas
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [pathname]);

  const handleAmbientePro = () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'professional') {
      window.location.href = '/dashboard/profissional';
    } else {
      window.location.href = '/seja-profissional';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUser(null);
    setMenuOpen(false);
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#fddfa2] shadow-md px-6 py-3 flex items-center justify-between transition-all duration-300">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 no-underline text-[#103569] font-bold text-xl hover:opacity-80 transition-opacity">
        <Image
          src="/imgs/misc/logo.png"
          alt="ClickServiço"
          width={35}
          height={35}
          className="object-contain"
        />
        <span className="tracking-tighter">ClickServiço</span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <Link href="/buscas" className="text-[#0b2545] font-semibold hover:text-[#f7941d] no-underline transition-colors text-sm">
          Explorar
        </Link>
        <Link href="/seja-profissional" className="text-[#0b2545] font-semibold hover:text-[#f7941d] no-underline transition-colors text-sm">
          Trabalhe Conosco
        </Link>
        
        {isLoggedIn ? (
          <div className="flex items-center gap-4 border-l border-[#0b2545]/10 pl-6">
            <button 
              onClick={handleAmbientePro}
              className="bg-[#f7941d] hover:bg-[#f7941d]/90 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-widest hidden md:block"
            >
              Ambiente Pro
            </button>
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-3 hover:bg-[#103569]/5 p-1.5 rounded-2xl transition-all cursor-pointer border-none bg-transparent group"
              >
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest leading-none mb-0.5">Bem-vindo</span>
                  <span className="text-sm font-bold text-[#103569] leading-none">{user?.name.split(' ')[0]}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#103569] text-white flex items-center justify-center text-sm font-black shadow-lg ring-2 ring-white group-hover:ring-[#f7941d] transition-all">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-[#103569]/5 py-3 z-100 animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
                  <div className="px-5 py-2 mb-2">
                    <p className="text-[10px] font-black text-[#103569]/30 uppercase tracking-[0.2em]">Painel de Controle</p>
                  </div>
                  
                  <Link 
                    href={user?.role === 'professional' ? "/dashboard/profissional" : "/dashboard/cliente"} 
                    className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#103569]">
                      <LayoutDashboard size={18} />
                    </div>
                    Dashboard
                  </Link>
                  
                  <Link 
                    href={user?.role === 'professional' ? "/dashboard/profissional/perfil" : "/dashboard/cliente/perfil"} 
                    className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-[#f7941d]">
                      <User size={18} />
                    </div>
                    Meu Perfil
                  </Link>

                  <div className="mx-5 h-px bg-[#103569]/5 my-2" />
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors w-full text-left border-none cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                      <LogOut size={18} />
                    </div>
                    Sair da Conta
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link href="/login" className="bg-[#0b2545] text-white px-8 py-2.5 rounded-2xl font-bold hover:bg-[#103569] hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all no-underline shadow-lg shadow-[#0b2545]/20 text-sm">
            Entrar
          </Link>
        )}
      </div>
    </nav>
  );
}

