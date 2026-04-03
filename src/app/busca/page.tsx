'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PROFESSIONALS_MOCK, Professional } from '@/types/professional';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

function SearchResults() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('categoria') || '';

  const [search, setSearch] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('distance');

  const filteredAndSortedProfessionals = useMemo(() => {
    let result = [...PROFESSIONALS_MOCK];

    // 1. Filtragem por categoria (URL)
    if (initialCategory) {
      result = result.filter(p => 
        p.role.toLowerCase().includes(initialCategory.toLowerCase())
      );
    }

    // 2. Filtragem por busca (Input)
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.role.toLowerCase().includes(q)
      );
    }

    // 3. Ordenação
    result.sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [search, initialCategory, sortBy]);

  return (
    <div className="py-10 bg-brand-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 mb-4 text-brand-accent">
                <Filter className="w-5 h-5" />
                <h2 className="font-bold uppercase tracking-wider">Filtros</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-brand-text mb-1 uppercase">
                  {initialCategory || 'Todos os Serviços'}
                </h3>
                <p className="text-sm text-gray-400 font-medium">
                  {filteredAndSortedProfessionals.length} resultados encontrados
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Refinar busca..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="grow">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h1 className="text-2xl font-bold text-brand-text hidden sm:block">
                Profissionais Disponíveis
              </h1>
              
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 w-full sm:w-auto">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <label htmlFor="sort" className="text-sm font-medium text-gray-500 whitespace-nowrap">Ordenar por:</label>
                <select 
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm font-bold text-brand-text outline-none cursor-pointer"
                >
                  <option value="distance">🛡️ Distância</option>
                  <option value="rating">⭐ Avaliação</option>
                  <option value="name">📝 Nome</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {filteredAndSortedProfessionals.length > 0 ? (
                filteredAndSortedProfessionals.map((prof) => (
                  <ProfessionalCard key={prof.id} professional={prof} />
                ))
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-text mb-2">Nenhum profissional encontrado</h3>
                  <p className="text-gray-500">Tente ajustar seus termos de busca ou filtros.</p>
                  <button 
                    onClick={() => {setSearch(''); setSortBy('distance');}}
                    className="mt-6 text-brand-accent font-bold hover:underline"
                  >
                    Limpar todos os filtros
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function BuscaPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Carregando profissionais...</div>}>
      <SearchResults />
    </Suspense>
  );
}
