'use client';

import React, { useState } from 'react';
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
  ArrowRight,
  MapPin,
  CircleDollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
}

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'PED-1024',
    clientName: 'Daniel Siqueira',
    clientEmail: 'daniel.siqueira@email.com',
    clientPhone: '(11) 98765-4321',
    serviceType: 'Reforma Residencial',
    description: 'Preciso de pintura completa de 3 quartos, sala e pequenos reparos de gesso no teto da cozinha. Gostaria de iniciar o quanto antes.',
    locationCep: '13450-000',
    address: 'Rua das Flores, 123 - Centro, Santa Bárbara d\'Oeste - SP',
    urgency: 'Urgente',
    agreedPrice: 'A combinar',
    scheduledAt: 'Sem agendamento',
    status: 'PENDENTE',
    createdAt: '2 horas atrás',
    avatar: 'DS'
  },
  {
    id: 'PED-1025',
    clientName: 'Marina Lopes',
    clientEmail: 'marina.lopes@email.com',
    clientPhone: '(11) 97654-3210',
    serviceType: 'Pintura Fachada',
    description: 'Pintura externa de sobrado de dois andares. Tenho todo o material de pintura disponível, preciso da mão de obra.',
    locationCep: '13460-120',
    address: 'Av. Paulista, 456 - Vila Medon, Americana - SP',
    urgency: 'Dentro de 15 dias',
    agreedPrice: 'R$ 2.800,00',
    scheduledAt: '20/05/2026 às 08:30',
    status: 'EM_ANDAMENTO',
    createdAt: '3 dias atrás',
    avatar: 'ML'
  },
  {
    id: 'PED-1026',
    clientName: 'Roberto Almeida',
    clientEmail: 'roberto.almeida@email.com',
    clientPhone: '(11) 96543-2109',
    serviceType: 'Instalação Elétrica',
    description: 'Troca de fiação completa da cozinha, instalação de 6 tomadas adicionais e um disjuntor DR para segurança dos eletrodomésticos.',
    locationCep: '13455-300',
    address: 'Rua do Cobre, 789 - Mollon, Santa Bárbara d\'Oeste - SP',
    urgency: 'Urgente',
    agreedPrice: 'R$ 1.200,00',
    scheduledAt: '15/05/2026 às 14:00',
    status: 'CONCLUIDO',
    createdAt: '1 semana atrás',
    avatar: 'RA'
  },
  {
    id: 'PED-1027',
    clientName: 'Ana Clara Silva',
    clientEmail: 'ana.clara@email.com',
    clientPhone: '(11) 95432-1098',
    serviceType: 'Reparo de Telhados',
    description: 'Identificar e corrigir goteiras na sala após as últimas chuvas. Possível troca de algumas telhas quebradas.',
    locationCep: '13470-000',
    address: 'Rua Sete de Setembro, 32 - Centro, Americana - SP',
    urgency: 'Imediato',
    agreedPrice: 'R$ 450,00',
    scheduledAt: '12/05/2026 às 10:00',
    status: 'CONCLUIDO',
    createdAt: '2 semanas atrás',
    avatar: 'AC'
  },
  {
    id: 'PED-1028',
    clientName: 'Ricardo Souza',
    clientEmail: 'ricardo.souza@email.com',
    clientPhone: '(11) 94321-0987',
    serviceType: 'Reforma de Banheiro',
    description: 'Troca do revestimento cerâmico antigo do piso e das paredes, instalação de box blindex e vaso sanitário novo.',
    locationCep: '13452-150',
    address: 'Rua Limeira, 88 - Vila Linópolis, Santa Bárbara d\'Oeste - SP',
    urgency: 'Sem pressa',
    agreedPrice: 'R$ 3.500,00',
    scheduledAt: 'Sem agendamento',
    status: 'CANCELADO',
    createdAt: '1 mês atrás',
    avatar: 'RS'
  }
];

export default function ProfessionalOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<OrderStatusType>('PENDENTE');

  // Filtragem
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch && order.status === activeTab;
  });

  // Contador de status
  const getCount = (status: OrderStatusType) => {
    return orders.filter(o => o.status === status).length;
  };

  // Atualização do status
  const handleUpdateStatus = (id: string, newStatus: OrderStatusType, price?: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        return { 
          ...order, 
          status: newStatus,
          agreedPrice: price !== undefined ? price : order.agreedPrice
        };
      }
      return order;
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-black text-[#103569] tracking-tighter uppercase">Meus Pedidos</h2>
        <p className="text-slate-500 font-bold">Acompanhe orçamentos, mude status e organize o fluxo de trabalho.</p>
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
            placeholder="Buscar por código do pedido ou nome do cliente..." 
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
                    <span className="text-[10px] font-black text-slate-400">{order.id}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-400 font-bold">
                    <span className="flex items-center gap-1"><Mail size={12} /> {order.clientEmail}</span>
                    <span className="flex items-center gap-1"><Phone size={12} /> {order.clientPhone}</span>
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
                    <span className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest flex items-center gap-1 justify-end"><CircleDollarSign size={12} /> Valor</span>
                    <p className="text-lg font-black text-[#f7941d] leading-none mt-0.5">{order.agreedPrice}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Actions Footer */}
            <div className="p-4 md:px-8 bg-slate-50/50 border-t border-slate-50 flex flex-wrap gap-3 items-center justify-between">
              <div className="flex gap-2">
                <Button 
                  asChild
                  variant="outline" 
                  className="h-10 rounded-xl font-bold border-slate-200 text-[#103569] text-xs"
                >
                  <a 
                    href={`https://api.whatsapp.com/send?phone=55${order.clientPhone.replace(/\D/g, '')}&text=Olá%20${order.clientName},%20vi%20sua%20solicitação%20no%20ClickServiço!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <MessageSquare size={14} className="text-emerald-500" />
                    Enviar WhatsApp
                  </a>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  className="h-10 rounded-xl font-bold border-slate-200 text-slate-500 text-xs"
                >
                  <a href={`tel:${order.clientPhone.replace(/\D/g, '')}`} className="flex items-center gap-2">
                    <Phone size={14} />
                    Ligar
                  </a>
                </Button>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                {order.status === 'PENDENTE' && (
                  <>
                    <Button 
                      onClick={() => {
                        const price = prompt('Digite o valor acordado para o serviço (ex: R$ 850,00):');
                        if (price) {
                          handleUpdateStatus(order.id, 'EM_ANDAMENTO', price);
                        } else {
                          handleUpdateStatus(order.id, 'EM_ANDAMENTO');
                        }
                      }}
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
                  <>
                    <span className="flex items-center gap-1.5 text-xs font-black text-red-500 bg-red-50/80 px-4 py-2 rounded-xl border border-red-100">
                      <XCircle size={14} /> Pedido Cancelado
                    </span>
                    <Button 
                      onClick={() => handleUpdateStatus(order.id, 'PENDENTE')}
                      variant="ghost" 
                      className="h-10 rounded-xl font-bold text-xs hover:bg-slate-100"
                    >
                      Reabrir
                    </Button>
                  </>
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
    </div>
  );
}
