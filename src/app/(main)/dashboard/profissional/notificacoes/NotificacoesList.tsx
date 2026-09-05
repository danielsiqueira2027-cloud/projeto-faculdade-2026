'use client';

import React from 'react';
import { Bell, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteNotification, markNotificationAsRead } from '@/app/actions/notifications';

interface NotificacoesListProps {
  initialNotifications: any[];
}

export default function NotificacoesList({ initialNotifications }: NotificacoesListProps) {
  const [notifications, setNotifications] = React.useState(initialNotifications);

  const handleDelete = async (id: string) => {
    await deleteNotification(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="divide-y divide-slate-100">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-slate-50 ${
              !notif.read ? 'bg-blue-50/30' : ''
            }`}
          >
            <div className="flex items-start gap-4 flex-1 cursor-pointer" onClick={() => handleMarkAsRead(notif.id)}>
              <div className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${!notif.read ? 'bg-[#f7941d]' : 'bg-transparent'}`} />
              <div>
                <p className={`text-[16px] leading-relaxed ${!notif.read ? 'font-bold text-[#103569]' : 'font-medium text-slate-700'}`}>
                  {notif.title}
                </p>
                <p className="text-sm text-slate-500 font-medium mt-2">{notif.time}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:ml-auto pl-6 md:pl-0">
              <Button 
                onClick={(e) => { e.stopPropagation(); handleDelete(notif.id); }}
                variant="ghost" 
                size="sm" 
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            <Bell className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="font-bold text-lg text-slate-400">Nenhuma notificação encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}
