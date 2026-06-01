import React from 'react';
import { Bell, Check, Settings, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Notificações | ClickServiço',
};

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Novo pedido de orçamento: Instalação elétrica moderna para residência de alto padrão.',
    time: 'Há 2 horas',
    read: false,
  },
  {
    id: '2',
    title: 'Interesse em serviço: Projeto de automação residencial com foco em segurança e tecnologia.',
    time: 'Há 1 dia',
    read: true,
  }
];

export default function NotificacoesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter flex items-center gap-3">
            <Bell className="w-8 h-8 text-[#f7941d]" />
            Notificações
          </h2>
          <p className="text-slate-500 font-bold mt-1">Acompanhe seus alertas e mensagens do sistema.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {MOCK_NOTIFICATIONS.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-slate-50 ${
                !notif.read ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="flex items-start gap-4 flex-1">
                <div className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${!notif.read ? 'bg-[#f7941d]' : 'bg-transparent'}`} />
                <div>
                  <p className={`text-[16px] leading-relaxed ${!notif.read ? 'font-bold text-[#103569]' : 'font-medium text-slate-700'}`}>
                    {notif.title}
                  </p>
                  <p className="text-sm text-slate-500 font-medium mt-2">{notif.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 md:ml-auto pl-6 md:pl-0">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {MOCK_NOTIFICATIONS.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              <Bell className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="font-bold text-lg text-slate-400">Nenhuma notificação encontrada.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
