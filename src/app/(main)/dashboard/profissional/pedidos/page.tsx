'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MessageSquare, 
  Phone, 
  Mail,
  Calendar,
  ClipboardList,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  MapPin,
  CircleDollarSign,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getProfessionalOrders, updateOrderStatusAction } from '@/app/actions/orders';
import type { OrderStatus } from '@/generated/prisma';
import { useRouter } from 'next/navigation';
import { getOrCreateChatRoom } from '@/app/actions/chat';

type OrderStatusType = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO' | 'CANCELADO';

interface OrderItem {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceType: string;
  description: string;
  locationCep: string;
  address: string;
  urgency: string;
  agreedPrice: string;
  scheduledAt: string;
  status: OrderStatusType;
  createdAt: string;
  avatar: string;
  period: string;
  images?: string[];
}

export default function ProfessionalOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<OrderStatusType>('PENDENTE');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();
  const [chatLoadingId, setChatLoadingId] = useState<string | null>(null);

  const handleStartChat = async (orderId: string) => {
    try {
      setChatLoadingId(orderId);
      await getOrCreateChatRoom(orderId);
      router.push(`/chat/${orderId}`);
    } catch (err: any) {
      alert(err.message || 'Erro ao abrir o chat');
    } finally {
      setChatLoadingId(null);
    }
  };

  // Load orders from database
  const loadOrders = async () => {
    setLoading(true);
    const dbOrders = await getProfessionalOrders();
    setOrders(dbOrders as any[]);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();

    const eventSource = new EventSource('/api/sse');
    eventSource.addEventListener('order', () => {
      loadOrders();
    });

    return () => {
      eventSource.close();
    };
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Helper for displaying status in Portuguese
  const getStatusLabel = (status: OrderStatusType) => {
    switch (status) {
      case 'PENDENTE': return 'Pendente';
      case 'EM_ANDAMENTO': return 'Em Andamento';
      case 'CONCLUIDO': return 'Concluído';
      case 'CANCELADO': return 'Cancelado';
    }
  };

  // Filtragem
  const filteredOrders = orders.filter(order => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return order.status === activeTab;

    const cleanTerm = term.replace(/^#+/, '').trim();
    const matchesSearch = 
      order.clientName.toLowerCase().includes(term) ||
      order.serviceType.toLowerCase().includes(term) ||
      order.id.toLowerCase().includes(term) ||
      (cleanTerm.length > 0 && (
        order.id.toLowerCase().includes(cleanTerm) ||
        order.id.slice(0, 8).toLowerCase().includes(cleanTerm)
      ));
    
    return matchesSearch && order.status === activeTab;
  });

  // Contador de status
  const getCount = (status: OrderStatusType) => {
    return orders.filter(o => o.status === status).length;
  };

  // Atualização do status no banco de dados
  const handleUpdateStatus = async (id: string, newStatus: OrderStatusType, price?: string) => {
    let numericPrice: number | undefined = undefined;
    if (price) {
      // Converte preço formatado para número (ex: R$ 850,00 ou 850.00 -> 850)
      const clean = price.replace(/[^\d,]/g, '').replace(',', '.');
      numericPrice = Number(clean);
      if (isNaN(numericPrice)) {
        showToast('Por favor, insira um preço válido.', 'error');
        return;
      }
    }

    setLoading(true);
    const res = await updateOrderStatusAction(id, newStatus as OrderStatus, numericPrice);
    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast(`Pedido atualizado para "${getStatusLabel(newStatus)}" com sucesso!`, 'success');
      await loadOrders(); // Recarrega dados reais do banco
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 font-bold border ${
            toast.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
              : 'bg-red-50 text-red-800 border-red-100'
          }`}>
            {toast.type === 'success' ? <CheckCircle className="text-emerald-600" /> : <AlertTriangle className="text-red-500" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter uppercase">Meus Pedidos</h2>
          <p className="text-slate-500 font-bold">Acompanhe orçamentos, mude status e organize o fluxo de trabalho.</p>
        </div>
        <Button 
          onClick={loadOrders} 
          disabled={loading}
          variant="outline" 
          className="h-11 rounded-2xl font-bold border-slate-200 text-[#103569] flex items-center gap-2 hover:bg-slate-50 shrink-0 cursor-pointer"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Sincronizar Pedidos
        </Button>
      </div>

      {/* Stats & Status Integrados em um só local */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <button
          type="button"
          onClick={() => setActiveTab('PENDENTE')}
          className={`p-5 md:p-6 rounded-3xl border text-left transition-all cursor-pointer flex items-center gap-4 ${
            activeTab === 'PENDENTE'
              ? 'bg-white border-[#103569] ring-2 ring-[#103569]/15 shadow-md scale-[1.02]'
              : 'bg-white/80 border-slate-100 hover:border-slate-200 hover:bg-white shadow-sm'
          }`}
        >
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-colors ${
            activeTab === 'PENDENTE' ? 'bg-yellow-500 text-white shadow-sm' : 'bg-yellow-50 text-yellow-600'
          }`}>
            <Clock size={26} />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Pendentes</p>
            <p className="text-xl md:text-2xl font-black text-[#103569]">{getCount('PENDENTE')}</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('EM_ANDAMENTO')}
          className={`p-5 md:p-6 rounded-3xl border text-left transition-all cursor-pointer flex items-center gap-4 ${
            activeTab === 'EM_ANDAMENTO'
              ? 'bg-white border-[#103569] ring-2 ring-[#103569]/15 shadow-md scale-[1.02]'
              : 'bg-white/80 border-slate-100 hover:border-slate-200 hover:bg-white shadow-sm'
          }`}
        >
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-colors ${
            activeTab === 'EM_ANDAMENTO' ? 'bg-blue-600 text-white shadow-sm' : 'bg-blue-50 text-blue-600'
          }`}>
            <TrendingUp size={26} />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Em Andamento</p>
            <p className="text-xl md:text-2xl font-black text-[#103569]">{getCount('EM_ANDAMENTO')}</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('CONCLUIDO')}
          className={`p-5 md:p-6 rounded-3xl border text-left transition-all cursor-pointer flex items-center gap-4 ${
            activeTab === 'CONCLUIDO'
              ? 'bg-white border-[#103569] ring-2 ring-[#103569]/15 shadow-md scale-[1.02]'
              : 'bg-white/80 border-slate-100 hover:border-slate-200 hover:bg-white shadow-sm'
          }`}
        >
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-colors ${
            activeTab === 'CONCLUIDO' ? 'bg-green-600 text-white shadow-sm' : 'bg-green-50 text-green-600'
          }`}>
            <CheckCircle size={26} />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Concluídos</p>
            <p className="text-xl md:text-2xl font-black text-[#103569]">{getCount('CONCLUIDO')}</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('CANCELADO')}
          className={`p-5 md:p-6 rounded-3xl border text-left transition-all cursor-pointer flex items-center gap-4 ${
            activeTab === 'CANCELADO'
              ? 'bg-white border-[#103569] ring-2 ring-[#103569]/15 shadow-md scale-[1.02]'
              : 'bg-white/80 border-slate-100 hover:border-slate-200 hover:bg-white shadow-sm'
          }`}
        >
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-colors ${
            activeTab === 'CANCELADO' ? 'bg-red-500 text-white shadow-sm' : 'bg-red-50 text-red-500'
          }`}>
            <XCircle size={26} />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Cancelados</p>
            <p className="text-xl md:text-2xl font-black text-[#103569]">{getCount('CANCELADO')}</p>
          </div>
        </button>
      </div>

      {/* Busca */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input 
            placeholder="Buscar por código ou nome do cliente..." 
            className="pl-12 h-12 rounded-2xl border-slate-100 focus:ring-[#f7941d] bg-slate-50/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders View */}
      {loading && orders.length === 0 ? (
        <div className="bg-white p-16 text-center rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-[#103569]" size={40} />
          <p className="text-[#103569] font-bold">Buscando solicitações reais no banco de dados...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
              {/* Card Top */}
              <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#103569]/5 flex items-center justify-center font-black text-xl text-[#103569] border border-[#103569]/10">
                    {order.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-[#103569] text-lg leading-tight">{order.clientName}</h4>
                      <span className="text-[10px] font-black text-slate-400">#{order.id.slice(0, 8)}</span>
                    </div>
                    {(order.clientEmail || order.clientPhone) && (
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-400 font-bold">
                        {order.clientEmail && <span className="flex items-center gap-1"><Mail size={12} /> {order.clientEmail}</span>}
                        {order.clientPhone && (
                          <span className="flex items-center gap-1"><Phone size={12} /> {order.clientPhone}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                    order.urgency === 'Alta' || order.urgency === 'Urgente' || order.urgency === 'Imediato'
                      ? 'bg-red-50 text-red-500 border border-red-100'
                      : order.urgency === 'Média' || order.urgency === 'Dentro de 15 dias'
                      ? 'bg-amber-50 text-amber-600 border border-amber-100'
                      : 'bg-slate-50 text-slate-500 border border-slate-100'
                  }`}>
                    {order.urgency}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{order.createdAt}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-50/20">
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">Serviço Solicitado</span>
                    <p className="font-black text-[#103569] text-md mt-0.5">{order.serviceType}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">Descrição detalhada</span>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed mt-1">{order.description}</p>
                  </div>
                  {/* Fotos do serviço enviadas pelo cliente */}
                  {order.images && order.images.length > 0 && (
                    <div>
                      <span className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">Fotos do Serviço</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {order.images.map((url, i) => (
                          <a key={i} href={url} target="_blank" rel="noopener noreferrer" aria-label={`Ver imagem ${i + 1}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={url}
                              alt={`Foto ${i + 1}`}
                              className="w-20 h-20 object-cover rounded-xl border border-slate-100 shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-8">
                  <div>
                    <span className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest flex items-center gap-1"><MapPin size={12} /> Local do Serviço</span>
                    <p className="text-slate-700 text-xs font-bold mt-1 leading-normal">{order.address}</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">CEP: {order.locationCep}</p>
                  </div>

                  <div className="flex justify-between items-end pt-2">
                    {order.scheduledAt !== 'Sem agendamento' && (
                      <div>
                        <span className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest flex items-center gap-1"><Calendar size={12} /> Agendamento</span>
                        <p className="text-slate-700 text-xs font-black mt-0.5">{order.scheduledAt}</p>
                        {order.period && (
                          <p className="text-[10px] text-[#f7941d] font-bold mt-0.5">Turno: {order.period}</p>
                        )}
                      </div>
                    )}
                    <div className="text-right ml-auto">
                      <span className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest flex items-center gap-1 justify-end"><CircleDollarSign size={12} /> Valor</span>
                      <p className="text-lg font-black text-[#f7941d] leading-none mt-0.5">{order.agreedPrice}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Actions Footer */}
              <div className="p-4 md:px-8 bg-slate-50/50 border-t border-slate-50 flex flex-wrap gap-3 items-center justify-between">
                <div className="flex gap-2">
                  {(order.status === 'EM_ANDAMENTO' || order.status === 'CONCLUIDO') && (
                    <Button 
                      onClick={() => handleStartChat(order.id)}
                      disabled={chatLoadingId === order.id}
                      variant="outline" 
                      className="h-10 rounded-xl font-bold border-slate-200 text-[#103569] text-xs flex items-center gap-2"
                    >
                      <MessageSquare size={14} className="text-blue-500" />
                      {chatLoadingId === order.id ? 'Carregando...' : 'Conversar no Chat'}
                    </Button>
                  )}
                  {order.clientPhone && (
                    <Button 
                      asChild
                      variant="outline" 
                      className="h-10 rounded-xl font-bold border-slate-200 text-slate-500 text-xs"
                    >
                      <a href={`tel:+55${order.clientPhone.replace(/\D/g, '')}`} className="flex items-center gap-2">
                        <Phone size={14} />
                        Ligar
                      </a>
                    </Button>
                  )}
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  {order.status === 'PENDENTE' && (
                    <>
                      <Button 
                        onClick={() => handleUpdateStatus(order.id, 'EM_ANDAMENTO')}
                        className="flex-1 sm:flex-none h-10 rounded-xl font-black bg-[#f7941d] hover:bg-[#f7941d]/90 text-white text-xs px-6 shadow-sm active:scale-95 transition-all"
                      >
                        Aceitar & Combinar
                      </Button>
                      <Button 
                        onClick={() => handleUpdateStatus(order.id, 'CANCELADO')}
                        variant="outline" 
                        className="flex-1 sm:flex-none h-10 rounded-xl font-bold border-red-100 hover:border-red-200 text-red-500 hover:bg-red-50 text-xs"
                      >
                        Recusar
                      </Button>
                    </>
                  )}

                  {order.status === 'EM_ANDAMENTO' && (
                    <>
                      <Button 
                        onClick={() => handleUpdateStatus(order.id, 'CONCLUIDO')}
                        className="flex-1 sm:flex-none h-10 rounded-xl font-black bg-green-600 hover:bg-green-700 text-white text-xs px-6 shadow-sm active:scale-95 transition-all"
                      >
                        Concluir Serviço
                      </Button>
                      <Button 
                        onClick={() => handleUpdateStatus(order.id, 'CANCELADO')}
                        variant="outline" 
                        className="flex-1 sm:flex-none h-10 rounded-xl font-bold border-red-100 hover:border-red-200 text-red-500 hover:bg-red-50 text-xs"
                      >
                        Cancelar
                      </Button>
                    </>
                  )}

                  {order.status === 'CONCLUIDO' && (
                    <span className="flex items-center gap-1.5 text-xs font-black text-green-600 bg-green-50/80 px-4 py-2 rounded-xl border border-green-100">
                      <CheckCircle size={14} /> Serviço Concluído
                    </span>
                  )}

                  {order.status === 'CANCELADO' && (
                    <span className="flex items-center gap-1.5 text-xs font-black text-red-500 bg-red-50/80 px-4 py-2 rounded-xl border border-red-100">
                      <XCircle size={14} /> Pedido Cancelado
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="bg-white p-16 text-center rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mx-auto mb-4 border border-slate-100 shadow-inner">
                <ClipboardList size={36} />
              </div>
              <h3 className="text-xl font-black text-[#103569]">Nenhum pedido nesta aba</h3>
              <p className="text-slate-400 font-bold mt-1 max-w-sm mx-auto text-sm">
                {activeTab === 'PENDENTE' && 'Você não possui novas solicitações de orçamento pendentes no momento.'}
                {activeTab === 'EM_ANDAMENTO' && 'Nenhum serviço está marcado como em andamento no momento.'}
                {activeTab === 'CONCLUIDO' && 'Você ainda não concluiu nenhum pedido ou orçamento nesta conta.'}
                {activeTab === 'CANCELADO' && 'Nenhum pedido foi cancelado ou recusado.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
