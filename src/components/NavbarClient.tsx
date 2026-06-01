'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, User, Briefcase, Star, ClipboardList, FileText, UserCircle } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';
import type { SessionUser } from '@/lib/auth';

interface NavbarClientProps {
  user: SessionUser | null;
}

export default function NavbarClient({ user }: NavbarClientProps) {
  const pathname = usePathname();
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

  // Fecha o menu ao trocar de rota
  React.useEffect(() => { setMenuOpen(false); }, [pathname]);

  // ─── Lógica do botão "Seja um profissional" / "Área Profissional" / "Área Cliente" ───────────────────
  // - Não logado OU logado sem perfil profissional → "Seja um profissional"
  // - Logado com perfil profissional e no dashboard profisional → "Área Cliente"
  // - Logado com perfil profissional e em outras telas → "Área Profissional"
  const isProDashboard = pathname.startsWith('/dashboard/profissional');

  let proButtonLabel = 'Seja um profissional';
  let proButtonHref = user ? '/seja-profissional/ativar' : '/seja-profissional';

  if (user?.hasProfessional) {
    if (isProDashboard) {
      proButtonLabel = 'Área Cliente';
      proButtonHref = '/dashboard/cliente';
    } else {
      proButtonLabel = 'Área Profissional';
      proButtonHref = '/dashboard/profissional';
    }
  }

  // Não renderizar a topbar laranja no painel do profissional
  if (pathname.startsWith('/dashboard/profissional')) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#fddfa2] shadow-md px-6 py-3 flex items-center justify-between transition-all duration-300">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 no-underline text-[#103569] font-bold text-xl hover:opacity-80 transition-opacity">
        <Image src="/imgs/misc/logo.png" alt="ClickServiço" width={35} height={35} className="object-contain" />
        <span className="tracking-tighter">ClickServiço</span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <Link href="/buscas" className="text-[#0b2545] font-semibold hover:text-[#f7941d] no-underline transition-colors text-sm">
          Explorar
        </Link>

        {/* Botão pro — contexto-sensível */}
        {!pathname.startsWith('/dashboard/profissional') && (
          <Link
            href={proButtonHref}
            className={`text-[10px] font-black px-4 py-2 rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-widest hidden md:flex items-center gap-1.5 no-underline ${
              user?.hasProfessional
                ? 'bg-[#f7941d] text-white hover:bg-[#f7941d]/90'
                : 'bg-[#0b2545] text-white hover:bg-[#103569]'
            }`}
          >
            <Briefcase size={13} />
            {proButtonLabel}
          </Link>
        )}

        {user ? (
          /* ── Usuário autenticado ── */
          <div className="flex items-center gap-4 border-l border-[#0b2545]/10 pl-6">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-3 hover:bg-[#103569]/5 p-1.5 rounded-2xl transition-all cursor-pointer border-none bg-transparent group"
              >
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest leading-none mb-0.5">Bem-vindo</span>
                  <span className="text-sm font-bold text-[#103569] leading-none">{user.name.split(' ')[0]}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#103569] text-white flex items-center justify-center text-sm font-black shadow-lg ring-2 ring-white group-hover:ring-[#f7941d] transition-all">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-[#103569]/5 py-3 z-100 animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
                  {/* ── Seção Cliente (exibido para todo usuário logado) ── */}
                  <div className="px-5 py-2 mb-2">
                    <p className="text-[10px] font-black text-[#103569]/30 uppercase tracking-[0.2em]">Minha Conta</p>
                  </div>

                  <Link
                    href="/dashboard/cliente/pedidos"
                    className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#103569]">
                      <ClipboardList size={18} />
                    </div>
                    Meus Pedidos
                  </Link>

                  <Link
                    href="/orcamento"
                    className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                      <FileText size={18} />
                    </div>
                    Orçamentos
                  </Link>

                  <Link
                    href="/dashboard/cliente/perfil"
                    className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-[#f7941d]">
                      <UserCircle size={18} />
                    </div>
                    Perfil
                  </Link>

                  {/* ── Seção Profissional (somente se tiver perfil pro) ── */}
                  {user.hasProfessional && (
                    <>
                      <div className="mx-5 h-px bg-[#103569]/5 my-2" />
                      <div className="px-5 py-2 mb-2">
                        <p className="text-[10px] font-black text-[#103569]/30 uppercase tracking-[0.2em]">Painel de Controle</p>
                      </div>

                      <Link
                        href="/dashboard/profissional"
                        className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                        onClick={() => setMenuOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#103569]">
                          <LayoutDashboard size={18} />
                        </div>
                        Dashboard
                      </Link>

                      <Link
                        href="/dashboard/profissional/perfil"
                        className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                        onClick={() => setMenuOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-[#f7941d]">
                          <User size={18} />
                        </div>
                        Meu Perfil
                      </Link>
                      <Link
                        href="/dashboard/profissional/planos"
                        className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                        onClick={() => setMenuOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-xl bg-yellow-50 flex items-center justify-center text-[#eab308]">
                          <Star size={18} />
                        </div>
                        Meu Plano
                      </Link>

                      <div className="mx-5 h-px bg-[#103569]/5 my-2" />
                    </>
                  )}

                  {/* ── Footer do dropdown ── */}
                  <div className="mx-5 h-px bg-[#103569]/5 my-2" />

                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors w-full text-left border-none cursor-pointer bg-transparent"
                    >
                      <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                        <LogOut size={18} />
                      </div>
                      Sair da Conta
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ── Visitante ── */
          <Link href="/login" className="bg-[#0b2545] text-white px-8 py-2.5 rounded-2xl font-bold hover:bg-[#103569] hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all no-underline shadow-lg shadow-[#0b2545]/20 text-sm">
            Entrar
          </Link>
        )}
      </div>
    </nav>
  );
}
