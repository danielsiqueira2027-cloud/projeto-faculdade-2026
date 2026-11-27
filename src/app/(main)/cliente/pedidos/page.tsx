'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MessageSquare, 
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
  RefreshCw,
  Star,
  Trash2,
  CheckCircle2,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getClientOrders, deleteOrderAction } from '@/app/actions/orders';
import { getOrCreateChatRoom } from '@/app/actions/chat';
import { getCurrentUserAction } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { AvaliacaoModal } from '@/components/cliente/AvaliacaoModal';
import { DeleteOrderModal } from '@/components/DeleteOrderModal';

type OrderStatusType = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO' | 'CANCELADO';

interface OrderItem {
  id: string;
  professionalId: string;
  professionalName: string;
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
  hasTestimonial?: boolean;
  images?: string[];
}

export default function ClientOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [hasClientRole, setHasClientRole] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<OrderStatusType>('PENDENTE');
  const [chatLoadingId, setChatLoadingId] = useState<string | null>(null);
  const [evaluatingOrder, setEvaluatingOrder] = useState<OrderItem | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<OrderItem | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const handleConfirmDelete = async () => {
    if (!orderToDelete) return;
    setIsDeleteLoading(true);
    setDeleteError(null);

    try {
      const res = await deleteOrderAction(orderToDelete.id);
      if (res.error) {
        setDeleteError(res.error);
        setIsDeleteLoading(false);
        return;
      }

      // Atualiza a lista local imediatamente
      setOrders((prev) => prev.filter((o) => o.id !== orderToDelete.id));
      setOrderToDelete(null);
      setToast({ message: 'Orçamento excluído com sucesso.', type: 'success' });
      setTimeout(() => setToast(null), 3500);
    } catch (err: unknown) {
      console.error('[handleConfirmDelete]', err);
      setDeleteError(err instanceof Error ? err.message : 'Erro ao excluir orçamento.');
    } finally {
      setIsDeleteLoading(false);
    }
  };

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

  // Load user session
  useEffect(() => {
    async function checkSession() {
      setUserLoading(true);
      const user = await getCurrentUserAction();
      if (!user) {
        setIsLogged(false);
        setHasClientRole(false);
        router.push('/login?callbackUrl=/cliente/pedidos');
        setUserLoading(false);
        return;
      }

      setIsLogged(true);
      setHasClientRole(true);
      setUserLoading(false);
    }
    checkSession();
  }, [router]);

  // Load orders from database
  const loadOrders = async () => {
    if (!isLogged) return;
    setLoading(true);
    const dbOrders = await getClientOrders();
    setOrders(dbOrders as any[]);
    setLoading(false);
  };

  useEffect(() => {
    if (isLogged) {
      loadOrders();

      const eventSource = new EventSource('/api/sse');
      eventSource.addEventListener('order', () => {
        loadOrders();
      });

      return () => {
        eventSource.close();
      };
    }
  }, [isLogged]);

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
      order.professionalName.toLowerCase().includes(term) ||
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
            Você precisa estar logado para visualizar seus pedidos.
          </p>
          <button
            onClick={() => router.push('/login?callbackUrl=/cliente/pedidos')}
            className="w-full bg-[#103569] hover:bg-[#103569]/90 text-white py-4 rounded-2xl font-black transition-all shadow-md"
          >
            Ir para Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter uppercase">Meus Pedidos</h2>
          <p className="text-slate-500 font-bold">Acompanhe o status e atualizações dos seus orçamentos em tempo real.</p>
        </div>
        <Button 
          onClick={loadOrders} 
          disabled={loading}
          variant="outline" 
          className="h-11 rounded-2xl font-bold border-slate-200 text-[#103569] flex items-center gap-2 hover:bg-slate-50 shrink-0"
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
            placeholder="Buscar por código ou nome do profissional..." 
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
          <p className="text-[#103569] font-bold">Buscando seus orçamentos do banco de dados...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group animate-in fade-in duration-300"
            >
              {/* Card Top */}
              <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#f7941d]/5 flex items-center justify-center font-black text-xl text-[#f7941d] border border-[#f7941d]/10">
                    {order.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-[#103569] text-lg leading-tight">{order.professionalName}</h4>
                      <span className="text-[10px] font-black text-slate-400">#{order.id.slice(0, 8)}</span>
                    </div>
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
                  {/* Fotos do serviço */}
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
                      </div>
                    )}
                    <div className="text-right ml-auto">
                      <span className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest flex items-center gap-1 justify-end"><CircleDollarSign size={12} /> Valor Combinado</span>
                      <p className="text-lg font-black text-[#f7941d] leading-none mt-0.5">{order.agreedPrice}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Actions Footer */}
              <div className="p-4 md:px-8 bg-slate-50/50 border-t border-slate-50 flex flex-wrap gap-3 items-center justify-between">
                <div className="flex flex-wrap gap-2 items-center">
                  {(order.status === 'EM_ANDAMENTO' || order.status === 'CONCLUIDO') && (
                    <Button 
                      onClick={() => handleStartChat(order.id)}
                      disabled={chatLoadingId === order.id}
                      variant="outline" 
                      className="h-10 min-h-[44px] rounded-xl font-bold border-slate-200 text-[#103569] text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <MessageSquare size={14} className="text-blue-500" />
                      {chatLoadingId === order.id ? 'Carregando...' : 'Conversar no Chat'}
                    </Button>
                  )}

                  {/* Botão Excluir orçamento — apenas em status PENDENTE ou CANCELADO */}
                  {(order.status === 'PENDENTE' || order.status === 'CANCELADO') && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setDeleteError(null);
                        setOrderToDelete(order);
                      }}
                      className="h-10 min-h-[44px] px-3.5 rounded-xl font-bold border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Trash2 size={14} className="text-red-500 shrink-0" />
                      <span>Excluir orçamento</span>
                    </Button>
                  )}
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  {order.status === 'PENDENTE' && (
                    <span className="flex items-center gap-1.5 text-xs font-black text-yellow-600 bg-yellow-50/80 px-4 py-2 rounded-xl border border-yellow-100">
                      <Clock size={14} /> Aguardando Profissional
                    </span>
                  )}

                  {order.status === 'EM_ANDAMENTO' && (
                    <span className="flex items-center gap-1.5 text-xs font-black text-blue-600 bg-blue-50/80 px-4 py-2 rounded-xl border border-blue-100">
                      <TrendingUp size={14} /> Serviço Em Andamento
                    </span>
                  )}

                  {order.status === 'CONCLUIDO' && (
                    <div className="flex flex-wrap items-center gap-2">
                      {order.hasTestimonial ? (
                        <span className="flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
                          <Star size={14} className="fill-emerald-600 text-emerald-600" /> Avaliação enviada
                        </span>
                      ) : (
                        <Button
                          onClick={() => setEvaluatingOrder(order)}
                          className="h-9 px-4 rounded-xl font-black bg-[#f7941d] hover:bg-[#e68516] text-white text-xs flex items-center gap-1.5 shadow-sm cursor-pointer border-none"
                        >
                          <Star size={14} className="fill-white" /> Avaliar serviço
                        </Button>
                      )}
                      <Button
                        onClick={() => router.push(`/orcamento?profId=${order.professionalId}`)}
                        variant="outline"
                        className="h-9 px-4 rounded-xl font-black border-[#103569]/20 text-[#103569] text-xs flex items-center gap-1.5 cursor-pointer hover:bg-[#103569]/5"
                      >
                        <UserPlus size={14} /> Solicitar novo serviço
                      </Button>
                      <span className="flex items-center gap-1.5 text-xs font-black text-green-600 bg-green-50/80 px-4 py-2 rounded-xl border border-green-100">
                        <CheckCircle size={14} /> Serviço Concluído
                      </span>
                    </div>
                  )}

                  {order.status === 'CANCELADO' && (
                    <span className="flex items-center gap-1.5 text-xs font-black text-red-500 bg-red-50/80 px-4 py-2 rounded-xl border border-red-100">
                      <XCircle size={14} /> Pedido Cancelado/Recusado
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
                {activeTab === 'PENDENTE' && 'Você não possui orçamentos pendentes de aprovação.'}
                {activeTab === 'EM_ANDAMENTO' && 'Nenhum dos seus pedidos está em andamento.'}
                {activeTab === 'CONCLUIDO' && 'Você ainda não concluiu nenhum orçamento nesta conta.'}
                {activeTab === 'CANCELADO' && 'Nenhum pedido foi cancelado.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modal de Avaliação de Serviço Concluído */}
      {evaluatingOrder && (
        <AvaliacaoModal
          orderId={evaluatingOrder.id}
          professionalId={evaluatingOrder.professionalId}
          professionalName={evaluatingOrder.professionalName}
          serviceType={evaluatingOrder.serviceType}
          onClose={() => setEvaluatingOrder(null)}
          onSuccess={() => {
            loadOrders();
          }}
        />
      )}

      {/* Modal de Exclusão Definitiva de Orçamento */}
      <DeleteOrderModal
        isOpen={Boolean(orderToDelete)}
        orderId={orderToDelete?.id || null}
        serviceType={orderToDelete?.serviceType}
        onClose={() => {
          if (!isDeleteLoading) {
            setOrderToDelete(null);
            setDeleteError(null);
          }
        }}
        onConfirm={handleConfirmDelete}
        loading={isDeleteLoading}
        error={deleteError}
      />

      {/* Toast de Feedback */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[250] animate-in fade-in slide-in-from-top-4 duration-300">
          <div
            className={`px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 font-bold text-xs border ${
              toast.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle size={16} className="text-red-500 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

