'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, User, Briefcase, Star, ClipboardList, FileText, UserCircle, Search, X, MessageSquare, Bell } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';
import type { SessionUser } from '@/lib/auth';
import { getNotifications, markNotificationAsRead, deleteNotification } from '@/app/actions/notifications';

interface NavbarClientProps {
  user: SessionUser | null;
}

export default function NavbarClient({ user }: NavbarClientProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const router = useRouter();
  const menuRef = React.useRef<HTMLDivElement>(null);
  const notifRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => { setMenuOpen(false); setNotifOpen(false); }, [pathname]);

  React.useEffect(() => {
    if (!user) return;
    async function loadNotifs() {
      const data = await getNotifications();
      setNotifications(data);
    }
    loadNotifs();

    const eventSource = new EventSource('/api/sse');
    eventSource.addEventListener('notification', () => {
      loadNotifs();
    });

    return () => {
      eventSource.close();
    };
  }, [user]);

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDelete = async (id: string) => {
    await deleteNotification(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/buscas?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  // ─── Lógica de navegação ───────────────────
  const isProDashboard = pathname.startsWith('/dashboard/profissional');

  // Não renderizar a topbar laranja no painel do profissional
  if (pathname.startsWith('/dashboard/profissional')) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#fddfa2] shadow-md px-6 py-3 flex items-center justify-between transition-all duration-300 min-h-[70px]">
      {searchOpen ? (
        /* --- Mobile Search Mode --- */
        <form onSubmit={handleSearch} className="flex md:hidden items-center justify-between w-full gap-3 py-1 animate-in fade-in zoom-in duration-200">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar serviços, profissionais..."
            autoFocus
            className="w-full outline-none px-4 py-2.5 rounded-2xl text-sm border border-[#103569]/10 bg-white focus:ring-2 focus:ring-[#f7941d]/20 transition-all text-[#0b2545]"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="text-[#103569] p-2 hover:bg-[#103569]/5 rounded-xl transition-all bg-transparent border-none cursor-pointer"
            aria-label="Fechar busca"
          >
            <X size={20} />
          </button>
        </form>
      ) : (
        /* --- Normal Navbar Mode --- */
        <>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline text-[#103569] font-bold text-xl hover:opacity-80 transition-opacity">
            <Image src="/imgs/misc/logo.png" alt="ClickServiço" width={35} height={35} className="object-contain" />
            <span className="tracking-tighter">ClickServiço</span>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex relative w-1/3 max-w-[400px]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar serviços, profissionais..."
              className="w-full outline-none pl-4 pr-10 py-2 rounded-2xl text-sm border border-[#103569]/10 bg-white/60 focus:bg-white focus:ring-2 focus:ring-[#f7941d]/20 transition-all text-[#0b2545]"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#103569]/60 hover:text-[#f7941d] transition-colors bg-transparent border-none cursor-pointer"
              aria-label="Buscar"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6 ml-auto md:ml-0">
            {/* Mobile Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex md:hidden text-[#103569] p-2 hover:bg-[#103569]/5 rounded-xl transition-all bg-transparent border-none cursor-pointer"
              title="Buscar"
              aria-label="Abrir busca"
            >
              <Search size={20} />
            </button>

            <Link href="/buscas" className="text-[#0b2545] font-semibold hover:text-[#f7941d] no-underline transition-colors text-sm">
              Explorar
            </Link>


            {user && (
              <Link href="/chats" className="text-[#0b2545] font-semibold hover:text-[#f7941d] no-underline transition-colors text-sm">
                Conversas
              </Link>
            )}

            {user && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative p-2 rounded-xl hover:bg-[#103569]/5 transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center text-[#103569]"
                >
                  <Bell size={20} className="text-[#103569]/80 hover:text-[#f7941d] transition-colors" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#fddfa2]" />
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[320px] sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 flex flex-col text-[#103569] overflow-hidden">
                    <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-bold text-[15px] text-gray-800">Notificações</h3>
                      <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:bg-slate-100 w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer border-none bg-transparent">
                        <X size={18} />
                      </button>
                    </div>

                    <div className="max-h-[300px] overflow-y-auto divide-y divide-gray-100">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-slate-400 text-sm font-medium">
                          Nenhuma notificação no momento.
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={`p-4 hover:bg-slate-50/50 transition-colors flex items-start justify-between gap-3 ${!notif.read ? 'bg-orange-50/20' : ''}`}
                          >
                            <div className="flex-1 cursor-pointer" onClick={() => handleMarkAsRead(notif.id)}>
                              <p className={`text-[13px] leading-snug ${!notif.read ? 'font-bold text-[#103569]' : 'text-slate-600'}`}>{notif.title}</p>
                              <span className="text-[11px] text-slate-400 mt-1 block font-medium">{notif.time}</span>
                            </div>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleDelete(notif.id); }}
                              className="text-slate-400 hover:text-red-500 p-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border-none bg-transparent shrink-0"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <Link
              href={user?.hasProfessional ? '/dashboard/profissional' : (user ? '/seja-profissional/ativar' : '/seja-profissional')}
              className={`text-[10px] font-black px-4 py-2 rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-widest hidden md:flex items-center gap-1.5 no-underline ${
                user?.hasProfessional
                  ? 'bg-[#f7941d] text-white hover:bg-[#f7941d]/90'
                  : 'bg-[#0b2545] text-white hover:bg-[#103569]'
              }`}
            >
              <Briefcase size={13} />
              {user?.hasProfessional ? 'Acesso Pro' : 'Seja um profissional'}
            </Link>

            {user ? (
              /* ── Usuário autenticado ── */
              <div className="flex items-center gap-4 border-l border-[#0b2545]/10 pl-4 md:pl-6">
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 md:gap-3 hover:bg-[#103569]/5 p-1.5 rounded-2xl transition-all cursor-pointer border-none bg-transparent group"
                  >
                    {user.avatarUrl ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden relative shadow-lg ring-2 ring-white group-hover:ring-[#f7941d] transition-all shrink-0">
                        <Image src={user.avatarUrl} alt={user.name} fill sizes="40px" className="object-cover" />
                      </div>
                    ) : (
                      <>
                        <div className="hidden sm:flex flex-col items-end">
                          <span className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest leading-none mb-0.5">Bem-vindo</span>
                          <span className="text-sm font-bold text-[#103569] leading-none">{user.name.split(' ')[0]}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#103569] text-white flex items-center justify-center text-sm font-black shadow-lg ring-2 ring-white group-hover:ring-[#f7941d] transition-all shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      </>
                    )}
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-[#103569]/5 py-3 z-50 animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
                      {/* ── Seção Cliente ── */}
                      {user.hasClient && (
                        <>
                          <div className="px-5 py-1.5">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Painel do Cliente</p>
                          </div>

                          <Link
                            href="/dashboard/cliente/perfil"
                            className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-[#f7941d]">
                              <UserCircle size={16} />
                            </div>
                            Meu Perfil
                          </Link>

                          <Link
                            href="/cliente/pedidos"
                            className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-[#f7941d]">
                              <ClipboardList size={16} />
                            </div>
                            Meus Pedidos
                          </Link>

                          <Link
                            href="/chats"
                            className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-[#f7941d]">
                              <MessageSquare size={16} />
                            </div>
                            Mensagens
                          </Link>
                          <div className="mx-5 h-px bg-[#103569]/5 my-1.5" />
                        </>
                      )}

                      {/* ── Seção Profissional ── */}
                      {user.hasProfessional && (
                        <>
                          <div className="px-5 py-1.5">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Painel do Profissional</p>
                          </div>
                          <Link
                            href="/dashboard/profissional"
                            className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#103569]">
                              <LayoutDashboard size={16} />
                            </div>
                            Dashboard Pro
                          </Link>
                          <Link
                            href="/chats"
                            className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#103569]">
                              <MessageSquare size={16} />
                            </div>
                            Mensagens
                          </Link>

                          <Link
                            href="/dashboard/profissional/perfil"
                            className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-[#f7941d]">
                              <User size={16} />
                            </div>
                            Meu Perfil Pro
                          </Link>

                          <div className="mx-5 h-px bg-[#103569]/5 my-1.5" />
                        </>
                      )}

                      <form action={logoutAction}>
                        <button
                          type="submit"
                          className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors w-full text-left border-none cursor-pointer bg-transparent"
                        >
                          <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                            <LogOut size={16} />
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
              <Link href="/login" className="bg-[#0b2545] text-white px-6 md:px-8 py-2 md:py-2.5 rounded-2xl font-bold hover:bg-[#103569] hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all no-underline shadow-lg shadow-[#0b2545]/20 text-sm shrink-0">
                Entrar
              </Link>
            )}
          </div>
        </>
      )}
    </nav>
  );
}
