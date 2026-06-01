'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MessageSquare, 
  Search, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  ChevronRight, 
  Loader2,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { getChatRooms } from '@/app/actions/chat';
import { getCurrentUserAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatRoomItem {
  roomId: string;
  orderId: string;
  serviceType: string;
  orderStatus: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO' | 'CANCELADO';
  interlocutorName: string;
  interlocutorAvatar: string | null;
  lastMessage: {
    content: string;
    createdAt: Date;
    senderName: string;
  } | null;
  updatedAt: Date;
}

export default function ChatsPage() {
  const [chatRooms, setChatRooms] = useState<ChatRoomItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Verifica a sessão do usuário
  useEffect(() => {
    async function checkAuth() {
      setUserLoading(true);
      const user = await getCurrentUserAction();
      if (!user) {
        setIsLogged(false);
        router.push('/login?callbackUrl=/chats');
        setUserLoading(false);
        return;
      }
      setIsLogged(true);
      setUserLoading(false);
    }
    checkAuth();
  }, [router]);

  // Carrega as salas de chat do banco
  const loadChatRooms = async () => {
    setLoading(true);
    try {
      const rooms = await getChatRooms();
      setChatRooms(rooms as any[]);
    } catch (err) {
      console.error('Erro ao carregar salas de chat:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogged) {
      loadChatRooms();
    }
  }, [isLogged]);

  // Filtra as salas pelo termo de busca
  const filteredRooms = chatRooms.filter(room => {
    return (
      room.interlocutorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Retorna a etiqueta de status formatada
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'EM_ANDAMENTO':
        return (
          <span className="flex items-center gap-1 text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 uppercase tracking-widest shrink-0">
            <TrendingUp size={10} /> Em Andamento
          </span>
        );
      case 'CONCLUIDO':
        return (
          <span className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100 uppercase tracking-widest shrink-0">
            <CheckCircle size={10} /> Concluído
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[10px] font-black text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100 uppercase tracking-widest shrink-0">
            {status}
          </span>
        );
    }
  };

  // Formata a data/hora de forma amigável
  const formatTime = (dateInput: Date | string) => {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '';
    
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    
    if (isToday) {
      return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
    
    // Ontem
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = d.toDateString() === yesterday.toDateString();
    
    if (isYesterday) {
      return 'Ontem';
    }
    
    // Outros dias
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#fefccf]/20 flex flex-col items-center justify-center font-sans">
        <Loader2 className="animate-spin text-[#103569] mb-4" size={40} />
        <p className="text-[#103569] font-bold">Verificando credenciais...</p>
      </div>
    );
  }

  if (!isLogged) {
    return (
      <div className="min-h-screen bg-[#fefccf]/20 flex items-center justify-center font-sans px-6">
        <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-2xl max-w-lg w-full text-center space-y-6 border border-red-100 animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-3xl font-black text-[#103569] leading-tight">Acesso Restrito</h2>
          <p className="text-slate-600 font-semibold leading-relaxed">
            Você precisa estar logado para acessar seu histórico de conversas.
          </p>
          <button
            onClick={() => router.push('/login?callbackUrl=/chats')}
            className="w-full bg-[#103569] hover:bg-[#103569]/90 text-white py-4 rounded-2xl font-black transition-all shadow-md"
          >
            Ir para Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto p-6 md:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-black text-[#103569] tracking-tighter uppercase flex items-center gap-3">
          <MessageSquare className="text-[#f7941d] shrink-0" size={32} />
          Minhas Conversas
        </h2>
        <p className="text-slate-500 font-bold mt-1">Acesse e gerencie a comunicação de seus pedidos em tempo real.</p>
      </div>

      {/* Search Input */}
      {chatRooms.length > 0 && (
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input 
            placeholder="Buscar conversa por nome ou serviço..." 
            className="pl-12 h-13 rounded-2xl border-slate-100 focus:ring-[#f7941d] bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Main List */}
      {loading ? (
        <div className="bg-white p-16 text-center rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-[#103569]" size={40} />
          <p className="text-[#103569] font-bold">Carregando histórico de conversas...</p>
        </div>
      ) : filteredRooms.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100">
          {filteredRooms.map((room) => (
            <div 
              key={room.roomId}
              onClick={() => router.push(`/chat/${room.orderId}`)}
              className="p-6 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer group active:bg-slate-100"
            >
              {/* Interlocutor Details */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-[#103569] text-white font-black text-lg flex items-center justify-center shadow-md ring-2 ring-white group-hover:ring-[#f7941d] transition-all shrink-0">
                  {room.interlocutorName.charAt(0).toUpperCase()}
                </div>

                {/* Text info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-black text-[#103569] text-md leading-tight truncate">
                      {room.interlocutorName}
                    </h4>
                    {renderStatusBadge(room.orderStatus)}
                  </div>
                  
                  <p className="text-xs text-[#f7941d] font-black uppercase tracking-wider">
                    {room.serviceType}
                  </p>

                  <p className="text-sm font-semibold text-slate-500 truncate leading-snug">
                    {room.lastMessage ? (
                      <>
                        <span className="font-bold text-slate-700">{room.lastMessage.senderName.split(' ')[0]}:</span>{' '}
                        {room.lastMessage.content}
                      </>
                    ) : (
                      <span className="text-slate-400 italic">Nenhuma mensagem enviada ainda.</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Time & Arrow Details */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-xs font-bold text-slate-400">
                  {formatTime(room.updatedAt)}
                </span>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-[#f7941d] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white p-16 text-center rounded-[35px] border border-slate-100 shadow-sm space-y-5">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto border border-slate-100 shadow-inner">
            <MessageSquare size={36} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-[#103569]">Nenhuma conversa ativa</h3>
            <p className="text-slate-400 font-bold max-w-sm mx-auto text-sm leading-relaxed">
              O chat interno fica disponível para seus pedidos assim que eles entram em <strong>Andamento</strong>!
            </p>
          </div>
          <Button 
            onClick={() => router.push('/cliente/pedidos')}
            className="bg-[#103569] hover:bg-[#103569]/90 text-white font-black px-6 py-2.5 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider"
          >
            Ver Meus Pedidos
          </Button>
        </div>
      )}
    </div>
  );
}
