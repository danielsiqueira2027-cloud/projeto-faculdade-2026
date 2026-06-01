'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
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
import { getClientOrders } from '@/app/actions/orders';
import { getOrCreateChatRoom } from '@/app/actions/chat';
import { getCurrentUserAction } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

type OrderStatusType = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO' | 'CANCELADO';

interface OrderItem {
  id: string;
  professionalId: string;
  professionalName: string;
  professionalEmail: string;
  professionalPhone: string;
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
  const router = useRouter();

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
      if (!user.hasClient) {
        setHasClientRole(false);
        setUserLoading(false);
        return;
      }

      setHasClientRole(true);
      setUserLoading(false);
    }
    checkSession();
  }, [router]);

  // Load orders from database
  const loadOrders = async () => {
    if (!isLogged || !hasClientRole) return;
    setLoading(true);
    const dbOrders = await getClientOrders();
    setOrders(dbOrders as any[]);
    setLoading(false);
  };

  useEffect(() => {
    if (isLogged && hasClientRole) {
      loadOrders();
    }
  }, [isLogged, hasClientRole]);

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
    const matchesSearch = 
      order.professionalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
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

  if (!isLogged || !hasClientRole) {
    return (
      <div className="min-h-screen bg-[#fefccf]/20 flex items-center justify-center font-sans px-6">
        <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-2xl max-w-lg w-full text-center space-y-6 border border-red-100 animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-3xl font-black text-[#103569] leading-tight">Acesso Restrito</h2>
          <p className="text-slate-600 font-semibold leading-relaxed">
            Você precisa estar logado com uma conta de <strong>Cliente</strong> para visualizar seus pedidos.
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pendentes</p>
            <p className="text-2xl font-black text-[#103569]">{getCount('PENDENTE')}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Em Andamento</p>
            <p className="text-2xl font-black text-[#103569]">{getCount('EM_ANDAMENTO')}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
            <CheckCircle size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Concluídos</p>
            <p className="text-2xl font-black text-[#103569]">{getCount('CONCLUIDO')}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
            <XCircle size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cancelados</p>
            <p className="text-2xl font-black text-[#103569]">{getCount('CANCELADO')}</p>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="bg-slate-100/80 p-2 rounded-2xl flex flex-wrap gap-1 md:flex-nowrap">
        <button
          onClick={() => setActiveTab('PENDENTE')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer border-none outline-none ${
            activeTab === 'PENDENTE'
              ? 'bg-[#103569] text-white shadow-md'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
          }`}
        >
          <Clock size={16} />
          <span>Pendentes</span>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
            activeTab === 'PENDENTE' ? 'bg-[#f7941d] text-white' : 'bg-slate-200 text-slate-600'
          }`}>{getCount('PENDENTE')}</span>
        </button>

        <button
          onClick={() => setActiveTab('EM_ANDAMENTO')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer border-none outline-none ${
            activeTab === 'EM_ANDAMENTO'
              ? 'bg-[#103569] text-white shadow-md'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
          }`}
        >
          <TrendingUp size={16} />
          <span>Em Andamento</span>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
            activeTab === 'EM_ANDAMENTO' ? 'bg-[#f7941d] text-white' : 'bg-slate-200 text-slate-600'
          }`}>{getCount('EM_ANDAMENTO')}</span>
        </button>

        <button
          onClick={() => setActiveTab('CONCLUIDO')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer border-none outline-none ${
            activeTab === 'CONCLUIDO'
              ? 'bg-[#103569] text-white shadow-md'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
          }`}
        >
          <CheckCircle size={16} />
          <span>Concluídos</span>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
            activeTab === 'CONCLUIDO' ? 'bg-[#f7941d] text-white' : 'bg-slate-200 text-slate-600'
          }`}>{getCount('CONCLUIDO')}</span>
        </button>

        <button
          onClick={() => setActiveTab('CANCELADO')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer border-none outline-none ${
            activeTab === 'CANCELADO'
              ? 'bg-[#103569] text-white shadow-md'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
          }`}
        >
          <XCircle size={16} />
          <span>Cancelados</span>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
            activeTab === 'CANCELADO' ? 'bg-[#f7941d] text-white' : 'bg-slate-200 text-slate-600'
          }`}>{getCount('CANCELADO')}</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input 
            placeholder="Buscar por código do pedido ou nome do profissional..." 
            className="pl-12 h-12 rounded-2xl border-slate-100 focus:ring-[#f7941d] bg-slate-50/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="h-12 px-6 rounded-2xl font-bold border-slate-100 flex items-center gap-2 hover:bg-slate-50">
            <Filter size={18} />
            Filtros
          </Button>
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
                      <span className="text-[10px] font-black text-slate-400">{order.id}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-400 font-bold">
                      <span className="flex items-center gap-1"><Mail size={12} /> {order.professionalEmail}</span>
                      <span className="flex items-center gap-1"><Phone size={12} /> {order.professionalPhone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                    order.urgency === 'Urgente' || order.urgency === 'Imediato'
                      ? 'bg-red-50 text-red-500 border border-red-100'
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
                </div>

                <div className="space-y-4 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-8">
                  <div>
                    <span className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest flex items-center gap-1"><MapPin size={12} /> Local do Serviço</span>
                    <p className="text-slate-700 text-xs font-bold mt-1 leading-normal">{order.address}</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">CEP: {order.locationCep}</p>
                  </div>

                  <div className="flex justify-between items-end pt-2">
                    <div>
                      <span className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest flex items-center gap-1"><Calendar size={12} /> Agendamento</span>
                      <p className="text-slate-700 text-xs font-black mt-0.5">{order.scheduledAt}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest flex items-center gap-1 justify-end"><CircleDollarSign size={12} /> Valor Combinado</span>
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
                  <Button 
                    asChild
                    variant="outline" 
                    className="h-10 rounded-xl font-bold border-slate-200 text-slate-500 text-xs"
                  >
                    <a href={`tel:${order.professionalPhone.replace(/\D/g, '')}`} className="flex items-center gap-2">
                      <Phone size={14} />
                      Ligar para Profissional
                    </a>
                  </Button>
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
                    <span className="flex items-center gap-1.5 text-xs font-black text-green-600 bg-green-50/80 px-4 py-2 rounded-xl border border-green-100">
                      <CheckCircle size={14} /> Serviço Concluído
                    </span>
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
    </div>
  );
}
