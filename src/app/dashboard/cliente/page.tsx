'use client';

import React, { useState, useEffect } from 'react';
import { PROFESSIONALS_MOCK } from '@/types/professional';
import { ProfessionalCard } from '@/components/cliente/ProfessionalCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

export default function ClienteDashboard() {
  const [userName, setUserName] = useState('Cliente');
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.name || 'Cliente');
      } catch (e) {
        console.error('Erro ao ler usuário do localStorage', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <main className="max-w-6xl mx-auto">
        {/* Title Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#103569] tracking-tight mb-2">
            Olá, <span className="text-[#f7941d]">{userName}</span>!
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            O que você precisa consertar hoje? Encontre os melhores profissionais.
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-xl shadow-blue-900/5 mb-10 flex flex-col md:flex-row gap-4 items-center border border-gray-100">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por profissional ou serviço (ex: encanador, eletricista...)"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f7941d]/20 focus:border-[#f7941d] transition-all"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex items-center gap-2 px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-600 font-bold hover:bg-gray-100 transition-colors">
              <Filter size={18} />
              Filtrar
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-[#103569] text-white rounded-xl font-bold hover:bg-[#103569]/90 transition-colors shadow-lg">
              <SlidersHorizontal size={18} />
              Ordenar
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-4 overflow-x-auto pb-6 mb-8 scrollbar-hide">
          {['Todos', 'Encanador', 'Eletricista', 'Pintor', 'Pedreiro', 'Mecânico'].map((cat) => (
            <button 
              key={cat}
              className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
                cat === 'Todos' 
                ? 'bg-[#f7941d] text-white shadow-lg' 
                : 'bg-white text-gray-500 border border-gray-100 hover:border-[#f7941d]/30 hover:text-[#f7941d]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-[#103569] uppercase tracking-tight">
            Profissionais Recomendados
          </h2>
          <span className="text-sm font-bold text-gray-400">
            {PROFESSIONALS_MOCK.length} profissionais encontrados
          </span>
        </div>

        {/* Grid of Professionals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROFESSIONALS_MOCK.map((pro) => (
            <ProfessionalCard key={pro.id} pro={pro} />
          ))}
        </div>
      </main>
    </div>
  );
}
