import React from 'react';
import { Bell } from 'lucide-react';
import { getNotifications } from '@/app/actions/notifications';
import NotificacoesList from './NotificacoesList';

export const metadata = {
  title: 'Notificações | ClickServiço',
};

export default async function NotificacoesPage() {
  const notifications = await getNotifications();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h2 className="text-3xl font-black text-[#103569] tracking-tighter flex items-center gap-3">
          <Bell className="w-8 h-8 text-[#f7941d]" />
          Notificações
        </h2>
        <p className="text-slate-500 font-bold mt-1">Acompanhe seus alertas e mensagens do sistema.</p>
      </div>

      <NotificacoesList initialNotifications={notifications} />
    </div>
  );
}
