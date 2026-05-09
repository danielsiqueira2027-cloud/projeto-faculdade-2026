'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PROFESSIONALS_MOCK } from '@/types/professional';
import { SearchResultCard } from '@/components/SearchResultCard';

// ─── Inner component (needs useSearchParams inside Suspense) ───────────────────
function SearchResults() {
  const searchParams = useSearchParams();
  const initialQuery    = searchParams.get('q')         || '';
  const initialCategory = searchParams.get('categoria') || '';

  const [search, setSearch] = useState(initialQuery);
  const [sortBy,  setSortBy]  = useState<'distance' | 'rating' | 'name'>('distance');

  const results = useMemo(() => {
    let list = [...PROFESSIONALS_MOCK];

    // Filter by URL category param
    if (initialCategory) {
      list = list.filter(p =>
        p.role.toLowerCase().includes(initialCategory.toLowerCase())
      );
    }

    // Filter by search box
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q)
      );
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating')   return b.rating   - a.rating;
      if (sortBy === 'name')     return a.name.localeCompare(b.name);
      return 0;
    });

    return list;
  }, [search, initialCategory, sortBy]);

  const displayTitle = initialCategory || initialQuery || 'Todos os Serviços';

  return (
    <div className="busca-page">
      <div className="busca-container">

        {/* ── Sidebar ── */}
        <aside className="busca-sidebar">
          <h1 className="busca-category-title">{displayTitle.toUpperCase()}</h1>
          <p className="busca-count">{results.length} resultados</p>

          {/* Refine search */}
          <div className="busca-refine-wrap">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Refinar busca..."
              className="busca-refine-input"
              aria-label="Refinar busca"
            />
          </div>
        </aside>

        {/* ── Main ── */}
        <section className="busca-main">

          {/* Sort bar */}
          <div className="busca-sort-bar">
            <label htmlFor="sort-select" className="busca-sort-label">Ordenar por:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'distance' | 'rating' | 'name')}
              className="busca-sort-select"
            >
              <option value="distance">Distância</option>
              <option value="rating">Avaliação</option>
              <option value="name">Nome</option>
            </select>
          </div>

          {/* Grid */}
          {results.length > 0 ? (
            <div className="busca-grid">
              {results.map(prof => (
                <SearchResultCard key={prof.id} professional={prof} />
              ))}
            </div>
          ) : (
            <div className="busca-empty">
              <p className="busca-empty-title">Nenhum profissional encontrado</p>
              <p className="busca-empty-sub">Tente ajustar os termos de busca.</p>
              <button
                onClick={() => { setSearch(''); setSortBy('distance'); }}
                className="busca-empty-btn"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────
export default function BuscaPage() {
  return (
    <Suspense fallback={<div className="busca-loading">Carregando profissionais...</div>}>
      <SearchResults />
    </Suspense>
  );
}
