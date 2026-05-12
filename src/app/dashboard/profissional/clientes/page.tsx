'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar,
  ChevronRight,
  UserPlus,
  Users,
  TrendingUp,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MOCK_CLIENTS = [
  {
    id: '1',
    name: 'Daniel Siqueira',
    email: 'daniel.siqueira@email.com',
    phone: '(11) 98765-4321',
    lastService: 'Reforma Residencial',
    lastDate: '2 horas atrás',
    totalSpent: 'R$ 5.400,00',
    status: 'Ativo',
    rating: 5,
    avatar: 'DS'
  },
  {
    id: '2',
    name: 'Marina Lopes',
    email: 'marina.lopes@email.com',
    phone: '(11) 97654-3210',
    lastService: 'Pintura Fachada',
    lastDate: '3 dias atrás',
    totalSpent: 'R$ 2.800,00',
    status: 'Concluído',
    rating: 4,
    avatar: 'ML'
  },
  {
    id: '3',
    name: 'Roberto Almeida',
    email: 'roberto.almeida@email.com',
    phone: '(11) 96543-2109',
    lastService: 'Instalação Elétrica',
    lastDate: '1 semana atrás',
    totalSpent: 'R$ 1.200,00',
    status: 'Ativo',
    rating: 5,
    avatar: 'RA'
  },
  {
    id: '4',
    name: 'Ana Clara Silva',
    email: 'ana.clara@email.com',
    phone: '(11) 95432-1098',
    lastService: 'Reparo de Telhados',
    lastDate: '2 semanas atrás',
    totalSpent: 'R$ 450,00',
    status: 'Inativo',
    rating: 3,
    avatar: 'AC'
  },
  {
    id: '5',
    name: 'Ricardo Souza',
    email: 'ricardo.souza@email.com',
    phone: '(11) 94321-0987',
    lastService: 'Reforma de Banheiro',
    lastDate: '1 mês atrás',
    totalSpent: 'R$ 3.200,00',
    status: 'Concluído',
    rating: 5,
    avatar: 'RS'
  }
];

export default function ProfessionalClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = MOCK_CLIENTS.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter">Meus Clientes</h2>
          <p className="text-slate-500 font-bold">Gerencie sua base de clientes e histórico de atendimentos.</p>
        </div>
        <Button className="bg-[#f7941d] hover:bg-[#f7941d]/90 text-white rounded-2xl h-14 px-8 font-black shadow-xl shadow-[#f7941d]/20 flex items-center gap-2 group transition-all active:scale-95">
          <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
          Adicionar Cliente
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#103569]">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total de Clientes</p>
            <p className="text-2xl font-black text-[#103569]">124</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Novos (Este Mês)</p>
            <p className="text-2xl font-black text-[#103569]">+12</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center text-[#f7941d]">
            <Star size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Média de Avaliação</p>
            <p className="text-2xl font-black text-[#103569]">4.9</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input 
            placeholder="Buscar por nome ou e-mail..." 
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
          <Button variant="outline" className="h-12 px-6 rounded-2xl font-bold border-slate-100 flex items-center gap-2 hover:bg-slate-50">
            Exportar
          </Button>
        </div>
      </div>

      {/* Clients List */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Cliente</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Último Serviço</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Total Gasto</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#103569]/5 flex items-center justify-center font-black text-[#103569] border border-[#103569]/10">
                        {client.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#103569]">{client.name}</h4>
                        <p className="text-xs text-slate-400 font-medium">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700">{client.lastService}</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Calendar size={10} />
                        {client.lastDate}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black text-[#103569]">
                    {client.totalSpent}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      client.status === 'Ativo' ? 'bg-green-50 text-green-600' :
                      client.status === 'Concluído' ? 'bg-blue-50 text-blue-600' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-[#103569] hover:bg-white shadow-sm">
                        <MessageSquare size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-[#103569] hover:bg-white shadow-sm">
                        <Phone size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-[#103569] hover:bg-white shadow-sm">
                        <MoreVertical size={18} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredClients.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mx-auto mb-4">
              <Users size={40} />
            </div>
            <h3 className="text-xl font-black text-[#103569]">Nenhum cliente encontrado</h3>
            <p className="text-slate-400 font-bold mt-1">Tente ajustar sua busca ou filtros.</p>
          </div>
        )}

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-400">
            Mostrando <span className="text-[#103569]">{filteredClients.length}</span> de <span className="text-[#103569]">124</span> clientes
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl font-bold border-slate-200 text-slate-400" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl font-bold border-slate-200 text-[#103569] bg-white">
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
