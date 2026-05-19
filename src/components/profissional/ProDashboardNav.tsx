'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Briefcase, Bell, User as UserIcon, LogOut,
  LayoutDashboard, FileText, Settings, Search, ClipboardList
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { logoutAction } from '@/app/actions/auth';

interface ProDashboardNavProps {
  userName: string;
}

const navLinks = [
  { name: 'Dashboard',     href: '/dashboard/profissional',              icon: LayoutDashboard },
  { name: 'Agenda',        href: '/dashboard/profissional/agenda',        icon: Briefcase },
  { name: 'Meus Serviços', href: '/dashboard/profissional/meus-servicos', icon: FileText },
  { name: 'Pedidos',       href: '/dashboard/profissional/pedidos',       icon: ClipboardList },
  { name: 'Perfil',        href: '/dashboard/profissional/perfil',        icon: Settings },
];

export default function ProDashboardNav({ userName }: ProDashboardNavProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = userName
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-[60px] z-40 bg-[#103569] text-white shadow-lg overflow-visible">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between overflow-visible">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-white p-1.5 rounded-lg shadow-inner">
              <Briefcase className="w-6 h-6 text-[#103569]" />
            </div>
            <span className="text-xl font-black tracking-tighter">ClickServiço</span>
            <span className="bg-[#f7941d] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ml-1">Pro</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  pathname === link.href
                    ? 'bg-white/10 text-white shadow-inner'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon size={16} />
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            <Input
              placeholder="Buscar orçamentos..."
              className="bg-white/10 border-white/10 text-white placeholder:text-white/30 pl-10 rounded-xl h-10 focus:ring-[#f7941d]"
            />
          </div>

          <button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors">
            <Bell size={20} className="text-white/80" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#103569]" />
          </button>

          <div className="h-8 w-px bg-white/10 mx-2" />

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-3 hover:bg-white/5 p-1 rounded-xl transition-all cursor-pointer border-none bg-transparent"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-white">{userName}</p>
                <p className="text-[10px] font-bold text-[#f7941d] uppercase tracking-widest">Profissional</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#f7941d] to-[#ffb35c] border-2 border-white/20 flex items-center justify-center font-black shadow-lg text-white">
                {initials}
              </div>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-2xl shadow-2xl border border-[#103569]/10 py-2 z-100 animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 border-b border-[#103569]/5 mb-1 bg-slate-50/50 rounded-t-2xl">
                  <p className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest mb-1">Logado como Profissional</p>
                  <p className="text-sm font-bold text-[#103569]">{userName}</p>
                </div>

                <Link
                  href="/dashboard/profissional/perfil"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings size={16} />
                  Configurações
                </Link>

                <div className="h-px bg-[#103569]/5 my-1" />

                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-sm font-bold text-red-600 hover:bg-red-50 transition-colors border-none cursor-pointer bg-transparent"
                  >
                    <LogOut size={16} />
                    Sair da Conta
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
