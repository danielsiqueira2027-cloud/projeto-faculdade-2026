'use client';

import { useState, useRef, useEffect, type ComponentType } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import { logoutAdminAction } from '@/app/actions/auth-admin';

interface NavItem {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

interface AdminMobileNavProps {
  user: { name?: string | null; email?: string | null };
  navItems: NavItem[];
}

export function AdminMobileNav({ user, navItems }: AdminMobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Floating hamburger button — only visible below md */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white border border-slate-200 shadow-lg hover:bg-slate-50 transition-all active:scale-95"
        aria-label="Abrir menu de navegação"
      >
        <Menu size={22} className="text-slate-700" />
      </button>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />

          {/* Sidebar overlay */}
          <aside
            ref={sidebarRef}
            className="absolute left-0 top-0 h-full w-64 bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <Link href="/admin">
                  <h1 className="text-2xl font-bold text-blue-600">
                    Click<span className="text-slate-800">Admin</span>
                  </h1>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Fechar menu"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 font-medium">Conectado como</p>
                <p className="text-sm text-slate-800 font-semibold truncate">
                  {user.name ?? user.email}
                </p>
                <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                  Administrador
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-6 border-t border-slate-100">
              <form action={logoutAdminAction}>
                <button
                  type="submit"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sair</span>
                </button>
              </form>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
