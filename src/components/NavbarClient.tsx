'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LogOut, LayoutDashboard, User, Briefcase, ClipboardList, 
  UserCircle, Search, X, MessageSquare, Bell, Menu, Compass 
} from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';
import type { SessionUser } from '@/lib/auth';
import { getNotifications, markNotificationAsRead, deleteNotification } from '@/app/actions/notifications';

interface NavbarClientProps {
  user: SessionUser | null;
}

export default function NavbarClient({ user }: NavbarClientProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [guestMenuOpen, setGuestMenuOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const router = useRouter();
  const menuRef = React.useRef<HTMLDivElement>(null);
  const guestMenuRef = React.useRef<HTMLDivElement>(null);
  const notifRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (guestMenuRef.current && !guestMenuRef.current.contains(e.target as Node)) {
        setGuestMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => { 
    setMenuOpen(false); 
    setGuestMenuOpen(false);
    setNotifOpen(false); 
    setSearchOpen(false);
  }, [pathname]);

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

  // Não renderizar a topbar laranja no painel do profissional
  if (pathname.startsWith('/dashboard/profissional')) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#fddfa2] shadow-md px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 flex items-center justify-between transition-all duration-300 min-h-[60px] md:min-h-[70px]">
      {searchOpen ? (
        /* --- Mobile Search Mode --- */
        <form onSubmit={handleSearch} className="flex md:hidden items-center justify-between w-full gap-2 py-1 animate-in fade-in zoom-in duration-200">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar serviços, profissionais..."
            autoFocus
            className="w-full outline-none px-3.5 py-2 rounded-2xl text-sm border border-[#103569]/10 bg-white focus:ring-2 focus:ring-[#f7941d]/20 transition-all text-[#0b2545]"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="text-[#103569] p-2 hover:bg-[#103569]/5 rounded-xl transition-all bg-transparent border-none cursor-pointer shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Fechar busca"
          >
            <X size={20} />
          </button>
        </form>
      ) : (
        /* --- Normal Navbar Mode --- */
        <>
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-1.5 sm:gap-2 no-underline text-[#103569] font-bold hover:opacity-80 transition-opacity shrink-0 mr-2"
          >
            <Image 
              src="/imgs/misc/logo.png" 
              alt="ClickServiço" 
              width={35} 
              height={35} 
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-[35px] md:h-[35px] object-contain shrink-0" 
            />
            <span className="tracking-tight text-base sm:text-lg md:text-xl font-bold whitespace-nowrap">
              ClickServiço
            </span>
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#103569]/60 hover:text-[#f7941d] transition-colors bg-transparent border-none cursor-pointer p-1"
              aria-label="Buscar"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-5 ml-auto md:ml-0 shrink-0">
            {/* Mobile Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex md:hidden text-[#103569] p-2 hover:bg-[#103569]/5 rounded-xl transition-all bg-transparent border-none cursor-pointer min-w-[40px] min-h-[40px] items-center justify-center shrink-0"
              title="Buscar"
              aria-label="Abrir busca"
            >
              <Search size={19} />
            </button>

            {/* Links secundários visíveis apenas em desktop */}
            <Link 
              href="/buscas" 
              className="hidden md:inline-flex text-[#0b2545] font-semibold hover:text-[#f7941d] no-underline transition-colors text-sm items-center"
            >
              Explorar
            </Link>

            {user && (
              <Link 
                href="/chats" 
                className="hidden md:inline-flex text-[#0b2545] font-semibold hover:text-[#f7941d] no-underline transition-colors text-sm items-center"
              >
                Conversas
              </Link>
            )}

            {user && (
              <div className="relative shrink-0" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative p-2 rounded-xl hover:bg-[#103569]/5 transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center text-[#103569] min-w-[40px] min-h-[40px]"
                  aria-label="Notificações"
                >
                  <Bell size={19} className="text-[#103569]/80 hover:text-[#f7941d] transition-colors" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#fddfa2]" />
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[calc(100vw-1.5rem)] max-w-[360px] sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 flex flex-col text-[#103569] overflow-hidden">
                    <div className="px-4 sm:px-5 py-3.5 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-bold text-[15px] text-gray-800">Notificações</h3>
                      <button 
                        onClick={() => setNotifOpen(false)} 
                        className="text-gray-400 hover:bg-slate-100 w-9 h-9 flex items-center justify-center rounded-lg transition-colors cursor-pointer border-none bg-transparent"
                        aria-label="Fechar notificações"
                      >
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
                            className={`p-3.5 sm:p-4 hover:bg-slate-50/50 transition-colors flex items-start justify-between gap-3 ${!notif.read ? 'bg-orange-50/20' : ''}`}
                          >
                            <div className="flex-1 cursor-pointer min-h-[44px] flex flex-col justify-center" onClick={() => handleMarkAsRead(notif.id)}>
                              <p className={`text-[13px] leading-snug ${!notif.read ? 'font-bold text-[#103569]' : 'text-slate-600'}`}>{notif.title}</p>
                              <span className="text-[11px] text-slate-400 mt-1 block font-medium">{notif.time}</span>
                            </div>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleDelete(notif.id); }}
                              className="text-slate-400 hover:text-red-500 p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border-none bg-transparent shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
                              aria-label="Excluir notificação"
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

            {/* Botão Seja um Profissional / Acesso Pro (Desktop) */}
            <Link
              href={user?.hasProfessional ? '/dashboard/profissional' : (user ? '/seja-profissional/ativar' : '/seja-profissional')}
              className={`text-[10px] font-black px-4 py-2 rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-widest hidden md:flex items-center gap-1.5 no-underline shrink-0 ${
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
              <div className="flex items-center border-l-0 md:border-l md:border-[#0b2545]/10 pl-0 md:pl-4 shrink-0">
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 hover:bg-[#103569]/5 p-1 rounded-2xl transition-all cursor-pointer border-none bg-transparent group min-w-[40px] min-h-[40px] justify-center"
                    aria-label="Menu do usuário"
                    aria-expanded={menuOpen}
                  >
                    {user.avatarUrl ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden relative shadow-lg ring-2 ring-white group-hover:ring-[#f7941d] transition-all shrink-0">
                        <Image src={user.avatarUrl} alt={user.name} fill sizes="40px" className="object-cover" />
                      </div>
                    ) : (
                      <>
                        <div className="hidden sm:flex flex-col items-end mr-1">
                          <span className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest leading-none mb-0.5">Bem-vindo</span>
                          <span className="text-sm font-bold text-[#103569] leading-none">{user.name.split(' ')[0]}</span>
                        </div>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#103569] text-white flex items-center justify-center text-xs sm:text-sm font-black shadow-lg ring-2 ring-white group-hover:ring-[#f7941d] transition-all shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      </>
                    )}
                  </button>

                  {menuOpen && (
                    <div 
                      className="absolute right-0 mt-2 sm:mt-3 w-[min(280px,calc(100vw-1rem))] max-w-[calc(100vw-1rem)] bg-white rounded-3xl shadow-2xl border border-[#103569]/10 py-3 z-50 animate-in fade-in zoom-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto"
                    >
                      {/* Cabeçalho do usuário */}
                      <div className="px-5 py-2 mb-1 border-b border-[#103569]/5">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Conectado como</p>
                        <p className="text-sm font-bold text-[#103569] truncate">{user.name}</p>
                      </div>

                      {/* ── Links mobile (Explorar e Conversas) ── */}
                      <div className="md:hidden">
                        <div className="px-5 py-1">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Navegação</p>
                        </div>
                        <Link
                          href="/buscas"
                          className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline min-h-[44px]"
                          onClick={() => setMenuOpen(false)}
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#103569]">
                            <Compass size={16} />
                          </div>
                          Explorar Serviços
                        </Link>
                        <Link
                          href="/chats"
                          className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline min-h-[44px]"
                          onClick={() => setMenuOpen(false)}
                        >
                          <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-[#f7941d]">
                            <MessageSquare size={16} />
                          </div>
                          Conversas
                        </Link>
                        <Link
                          href={user?.hasProfessional ? '/dashboard/profissional' : '/seja-profissional'}
                          className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline min-h-[44px]"
                          onClick={() => setMenuOpen(false)}
                        >
                          <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-[#f7941d]">
                            <Briefcase size={16} />
                          </div>
                          {user?.hasProfessional ? 'Acesso Pro' : 'Seja um profissional'}
                        </Link>
                        <div className="mx-5 h-px bg-[#103569]/5 my-1.5" />
                      </div>

                      {/* ── Seção Cliente ── */}
                      {user.hasClient && (
                        <>
                          <div className="px-5 py-1.5">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Painel do Cliente</p>
                          </div>

                          <Link
                            href="/dashboard/cliente/perfil"
                            className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline min-h-[44px]"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-[#f7941d]">
                              <UserCircle size={16} />
                            </div>
                            Meu Perfil
                          </Link>

                          <Link
                            href="/cliente/pedidos"
                            className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline min-h-[44px]"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-[#f7941d]">
                              <ClipboardList size={16} />
                            </div>
                            Meus Pedidos
                          </Link>

                          <Link
                            href="/chats"
                            className="hidden md:flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline min-h-[44px]"
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
                            className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline min-h-[44px]"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#103569]">
                              <LayoutDashboard size={16} />
                            </div>
                            Dashboard Pro
                          </Link>
                          <Link
                            href="/chats"
                            className="hidden md:flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline min-h-[44px]"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#103569]">
                              <MessageSquare size={16} />
                            </div>
                            Mensagens
                          </Link>

                          <Link
                            href="/dashboard/profissional/perfil"
                            className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline min-h-[44px]"
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
                          className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors w-full text-left border-none cursor-pointer bg-transparent min-h-[44px]"
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
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <Link 
                  href="/login" 
                  className="bg-[#0b2545] text-white px-3 sm:px-5 md:px-7 py-2 md:py-2.5 rounded-2xl font-bold hover:bg-[#103569] hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all no-underline shadow-lg shadow-[#0b2545]/20 text-xs sm:text-sm shrink-0 min-h-[38px] flex items-center justify-center"
                >
                  Entrar
                </Link>

                {/* Mobile Menu Hambúrguer para Visitante */}
                <div className="relative md:hidden shrink-0" ref={guestMenuRef}>
                  <button
                    onClick={() => setGuestMenuOpen(!guestMenuOpen)}
                    className="text-[#103569] p-2 hover:bg-[#103569]/5 rounded-xl transition-all bg-transparent border-none cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                    aria-label="Menu"
                    aria-expanded={guestMenuOpen}
                  >
                    {guestMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>

                  {guestMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-[min(260px,calc(100vw-1rem))] max-w-[calc(100vw-1rem)] bg-white rounded-3xl shadow-2xl border border-[#103569]/10 py-3 z-50 animate-in fade-in zoom-in slide-in-from-top-2 duration-200"
                    >
                      <div className="px-5 py-1.5 mb-1 border-b border-[#103569]/5">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Navegação</p>
                      </div>

                      <Link
                        href="/buscas"
                        className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline min-h-[44px]"
                        onClick={() => setGuestMenuOpen(false)}
                      >
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#103569]">
                          <Compass size={16} />
                        </div>
                        Explorar Serviços
                      </Link>

                      <Link
                        href="/seja-profissional"
                        className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline min-h-[44px]"
                        onClick={() => setGuestMenuOpen(false)}
                      >
                        <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-[#f7941d]">
                          <Briefcase size={16} />
                        </div>
                        Seja um profissional
                      </Link>

                      <div className="mx-5 h-px bg-[#103569]/5 my-2" />

                      <Link
                        href="/login"
                        className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#0b2545] hover:bg-[#0b2545]/5 transition-colors no-underline min-h-[44px]"
                        onClick={() => setGuestMenuOpen(false)}
                      >
                        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-[#0b2545]">
                          <User size={16} />
                        </div>
                        Fazer Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
}

