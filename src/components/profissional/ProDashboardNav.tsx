'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Briefcase, Bell, User as UserIcon, LogOut,
  LayoutDashboard, FileText, Settings, Search, ClipboardList, Check, X, Star, ArrowLeft
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { logoutAction } from '@/app/actions/auth';
import { getNotifications, markNotificationAsRead, deleteNotification } from '@/app/actions/notifications';

interface ProDashboardNavProps {
  userName: string;
  hasClient?: boolean;
  avatarUrl?: string | null;
}

const navLinks = [
  { name: 'Dashboard',     href: '/dashboard/profissional',              icon: LayoutDashboard },
  { name: 'Agenda',        href: '/dashboard/profissional/agenda',        icon: Briefcase },
  { name: 'Meus Serviços', href: '/dashboard/profissional/meus-servicos', icon: FileText },
  { name: 'Pedidos',       href: '/dashboard/profissional/pedidos',       icon: ClipboardList },
];

export default function ProDashboardNav({ userName, hasClient, avatarUrl }: ProDashboardNavProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const notifRef = React.useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = React.useState<any[]>([]);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
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
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDelete = async (id: string) => {
    await deleteNotification(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const initials = userName
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 bg-[#103569] text-white shadow-md px-6 py-3 flex items-center justify-between transition-all duration-300 min-h-[70px] overflow-visible">
      <div className="flex items-center gap-2 xl:gap-4 min-w-0">
        <Link href="/" className="flex items-center gap-2 no-underline text-white font-bold text-xl hover:opacity-80 transition-opacity shrink-0">
          <Image src="/imgs/misc/logo.png" alt="ClickServiço" width={35} height={35} className="object-contain" />
          <span className="tracking-tighter text-[#f7941d]">ClickServiço</span>
          <span className="bg-[#f7941d] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ml-1">Pro</span>
        </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1 xl:gap-2 whitespace-nowrap shrink-0 ${
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

        <div className="flex items-center gap-2 lg:gap-4 shrink-0">
          <div className="hidden lg:flex relative w-32 xl:w-56 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            <Input
              placeholder="Buscar orçamentos..."
              className="bg-white/10 border-white/10 text-white placeholder:text-white/30 pl-10 rounded-xl h-10 focus:ring-[#f7941d]"
            />
          </div>

          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center"
            >
              <Bell size={20} className="text-white/80" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#103569]" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-[400px] bg-white rounded-lg shadow-2xl border border-gray-100 z-50 flex flex-col text-[#103569] overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-bold text-[15px] text-gray-800">Notificações</h3>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setNotifOpen(false)} className="text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer border-none bg-transparent">
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-100">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 font-medium">
                      Nenhuma notificação no momento.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`p-4 hover:bg-slate-50/50 transition-colors flex items-start justify-between gap-3 ${!notif.read ? 'bg-blue-50/30' : ''}`}
                      >
                        <div className="flex-1 cursor-pointer" onClick={() => handleMarkAsRead(notif.id)}>
                          <p className={`text-[13px] leading-snug ${!notif.read ? 'font-bold text-[#103569]' : 'text-gray-600'}`}>{notif.title}</p>
                          <span className="text-[11px] text-gray-400 mt-1 block">{notif.time}</span>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDelete(notif.id); }}
                          className="text-gray-400 hover:text-red-500 p-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border-none bg-transparent shrink-0"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-3 bg-slate-50/80 text-center rounded-b-lg border-t border-gray-100">
                  <Link 
                    href="/dashboard/profissional/notificacoes" 
                    onClick={() => setNotifOpen(false)}
                    className="text-[15px] text-blue-500 hover:underline"
                  >
                    Mostrar todos
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="h-8 w-px bg-white/10 mx-1 lg:mx-2 shrink-0" />

          <div className="relative flex items-center gap-2 lg:gap-3 shrink-0" ref={menuRef}>
            {hasClient && (
              <Link
                href="/dashboard/cliente"
                className="bg-linear-to-r from-[#f7941d] to-[#ffb35c] text-white hover:from-[#f08a11] hover:to-[#ffa946] text-[11px] font-black px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 uppercase tracking-widest hidden md:flex items-center gap-2 whitespace-nowrap shrink-0 no-underline ring-1 ring-white/20"
              >
                <Briefcase size={14} className="opacity-90" />
                <span>Acesso Cliente</span>
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 hover:bg-white/5 p-1.5 rounded-2xl transition-all cursor-pointer border-none bg-transparent group shrink-0"
            >
              {avatarUrl ? (
                <div className="w-10 h-10 rounded-full overflow-hidden relative shadow-lg ring-2 ring-white/20 group-hover:ring-white/40 transition-all shrink-0">
                  <Image src={avatarUrl} alt={userName} fill sizes="40px" className="object-cover" />
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#f7941d] to-[#ffb35c] text-white flex items-center justify-center font-black shadow-lg ring-2 ring-white/20 group-hover:ring-white/40 transition-all shrink-0">
                    {initials}
                  </div>
                  <div className="text-left hidden 2xl:block max-w-[120px]">
                    <p className="text-[13px] font-black text-white truncate">{userName}</p>
                    <p className="text-[10px] font-bold text-[#f7941d] uppercase tracking-widest truncate">Profissional</p>
                  </div>
                </>
              )}
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
                  <UserIcon size={16} />
                  Meu Perfil
                </Link>

                <Link
                  href="/dashboard/profissional/planos"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  <Star size={16} />
                  Meu Plano
                </Link>

                {hasClient && (
                  <>
                    <div className="h-px bg-[#103569]/5 my-1" />
                    <Link
                      href="/dashboard/cliente"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-[#103569] hover:bg-[#103569]/5 transition-colors no-underline"
                      onClick={() => setMenuOpen(false)}
                    >
                      <ArrowLeft size={16} />
                      Acesso Cliente
                    </Link>
                  </>
                )}

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
    </header>
  );
}
