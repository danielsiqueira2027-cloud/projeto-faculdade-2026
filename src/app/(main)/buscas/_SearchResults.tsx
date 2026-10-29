'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MapPin, X, RotateCcw } from 'lucide-react';
import { SearchResultCard } from '@/components/SearchResultCard';
import { MunicipioCombobox } from '@/components/MunicipioCombobox';
import { searchProfessionals } from '@/app/actions/professionals';
import { getCurrentUserAction } from '@/app/actions/auth';
import { getIbgeMunicipios } from '@/app/actions/ibge';
import { ESTADOS_BRASIL, type IbgeEstado, type IbgeMunicipio } from '@/lib/ibge';
import { Professional } from '@/types/professional';

interface SearchResultsProps {
  /** Lista de estados pré-carregada via SSR pelo Server Component pai. */
  estadosIniciais: IbgeEstado[];
}

/**
 * Componente cliente da página de buscas.
 * Recebe a lista de estados via SSR (pré-buscada no Server Component)
 * para evitar round-trips cliente → servidor → API IBGE em produção.
 */
export function SearchResults({ estadosIniciais }: SearchResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parâmetros vindos da URL (fonte da verdade)
  const urlQuery    = searchParams.get('q')         || '';
  const urlCategory = searchParams.get('categoria') || '';
  const urlUf       = (searchParams.get('uf')        || '').toUpperCase();
  const urlCidade   = searchParams.get('cidade')    || '';

  // Input de busca de texto controlado
  const [search, setSearch] = useState(urlQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);

  // Sincroniza o input quando a URL muda (ex: botão voltar/avançar) sem efeito em cascata
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    setSearch(urlQuery);
  }

  // Estados pré-carregados pelo servidor com fallback estático de alta disponibilidade
  const estados = estadosIniciais && estadosIniciais.length > 0 ? estadosIniciais : ESTADOS_BRASIL;
  const estadosError = estados.length === 0;

  // Municípios: ainda carregados sob demanda no cliente (dependem da UF escolhida pelo usuário)
  const [municipios, setMunicipios] = useState<IbgeMunicipio[]>([]);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);

  // Estados dos profissionais e ordenação
  const [dbResults, setDbResults] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'name'>('distance');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Carrega usuário autenticado atual para destacar card próprio
  useEffect(() => {
    let active = true;
    async function loadUser() {
      const u = await getCurrentUserAction();
      if (active && u) setCurrentUserId(u.id);
    }
    loadUser();
    return () => {
      active = false;
    };
  }, []);

  // Carrega municípios sempre que o estado (UF) da URL mudar
  useEffect(() => {
    if (!urlUf) return;

    let active = true;

    async function fetchMunicipios() {
      setLoadingMunicipios(true);
      try {
        const data = await getIbgeMunicipios(urlUf);
        if (active) {
          setMunicipios(data);
        }
      } catch {
        if (active) setMunicipios([]);
      } finally {
        if (active) setLoadingMunicipios(false);
      }
    }

    fetchMunicipios();
    return () => {
      active = false;
    };
  }, [urlUf]);

  // Municípios exibidos (limpos se não houver UF selecionada)
  const displayedMunicipios = useMemo(() => {
    return urlUf ? municipios : [];
  }, [urlUf, municipios]);

  // Atualiza a URL mantendo ou alterando os parâmetros existentes
  const updateUrl = useCallback(
    (updates: { q?: string; categoria?: string; uf?: string; cidade?: string }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.q !== undefined) {
        if (updates.q.trim()) params.set('q', updates.q.trim());
        else params.delete('q');
      }

      if (updates.categoria !== undefined) {
        if (updates.categoria.trim()) params.set('categoria', updates.categoria.trim());
        else params.delete('categoria');
      }

      if (updates.uf !== undefined) {
        const cleanUf = updates.uf.trim().toUpperCase();
        if (cleanUf) {
          params.set('uf', cleanUf);
        } else {
          params.delete('uf');
          params.delete('cidade'); // Ao remover estado, remove cidade
        }
      }

      if (updates.cidade !== undefined) {
        const cleanCidade = updates.cidade.trim();
        if (cleanCidade) params.set('cidade', cleanCidade);
        else params.delete('cidade');
      }

      const queryString = params.toString();
      router.push(queryString ? `/buscas?${queryString}` : '/buscas', { scroll: false });
    },
    [router, searchParams]
  );

  // Busca profissionais no banco usando termo, categoria e localidade
  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      const data = await searchProfessionals(urlQuery, urlCategory, urlUf, urlCidade);
      if (active) {
        setDbResults(data);
        setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [urlQuery, urlCategory, urlUf, urlCidade]);

  // Manipuladores de alteração de filtros
  const handleUfChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUf = e.target.value.toUpperCase();
    updateUrl({ uf: newUf, cidade: '' });
  };

  const handleCidadeSelect = (novaCidade: string) => {
    updateUrl({ cidade: novaCidade });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl({ q: search });
  };

  const handleClearLocation = () => {
    updateUrl({ uf: '', cidade: '' });
  };

  const handleClearAll = () => {
    setSearch('');
    setSortBy('distance');
    router.push('/buscas', { scroll: false });
  };

  // Ordenação dos resultados em memória
  const results = useMemo(() => {
    const list = [...dbResults];

    list.sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating')   return b.rating   - a.rating;
      if (sortBy === 'name')     return a.name.localeCompare(b.name);
      return 0;
    });

    return list;
  }, [dbResults, sortBy]);

  const hasLocationFilter = Boolean(urlUf || urlCidade);
  const displayTitle = urlCategory || urlQuery || 'Todos os Serviços';

  // Texto contextual de localidade para o estado vazio
  const localityEmptyText = useMemo(() => {
    if (urlCidade && urlUf) {
      return `em ${urlCidade} - ${urlUf}`;
    }
    if (urlUf) {
      return `no estado de ${urlUf}`;
    }
    return '';
  }, [urlCidade, urlUf]);

  return (
    <div className="busca-page">
      <div className="busca-container">

        {/* ── Sidebar ── */}
        <aside className="busca-sidebar">
          <h1 className="busca-category-title">{displayTitle.toUpperCase()}</h1>
          <p className="busca-count" aria-live="polite">
            {loading ? 'Carregando...' : `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'}`}
          </p>

          {/* Refinar busca (texto) */}
          <form onSubmit={handleSearchSubmit} className="busca-refine-wrap">
            <label htmlFor="busca-refine-input" className="sr-only">
              Refinar busca por nome ou especialidade
            </label>
            <input
              id="busca-refine-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={() => updateUrl({ q: search })}
              placeholder="Refinar busca..."
              className="busca-refine-input"
              aria-label="Refinar busca por nome ou especialidade"
            />
          </form>

          {/* ── Bloco Localidade ── */}
          <div className="busca-locality-block">
            <h2 className="busca-locality-title">
              <MapPin size={15} className="text-[#f7941d] shrink-0" aria-hidden="true" />
              Localidade
            </h2>

            {/* Select Estado (UF) */}
            <div className="busca-filter-group">
              <label htmlFor="select-uf" className="busca-filter-label">
                Estado (UF)
              </label>
              <select
                id="select-uf"
                value={urlUf}
                onChange={handleUfChange}
                disabled={estadosError}
                className="busca-filter-select"
                aria-label="Selecione o Estado"
              >
                <option value="">Todos os estados</option>
                {estados.map((uf) => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.sigla} - {uf.nome}
                  </option>
                ))}
              </select>
              {estadosError && (
                <span className="text-[11px] text-amber-600 block mt-1">
                  Lista de estados temporariamente indisponível.
                </span>
              )}
            </div>

            {/* Combobox de Município com Autocomplete */}
            <div className="busca-filter-group">
              <label htmlFor="select-municipio" className="busca-filter-label">
                Município
              </label>
              <MunicipioCombobox
                id="select-municipio"
                municipios={displayedMunicipios}
                value={urlCidade}
                disabled={!urlUf}
                loading={loadingMunicipios}
                onSelect={handleCidadeSelect}
              />
            </div>

            {/* Botão limpar filtros de localidade */}
            {hasLocationFilter && (
              <button
                type="button"
                onClick={handleClearLocation}
                className="busca-filter-clear-btn"
                aria-label="Limpar filtros de localidade"
              >
                <X size={13} aria-hidden="true" />
                Limpar localidade
              </button>
            )}
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
              aria-label="Ordenar resultados por"
            >
              <option value="distance">Distância</option>
              <option value="rating">Avaliação</option>
              <option value="name">Nome</option>
            </select>
          </div>

          {/* Grid de Resultados */}
          {loading ? (
            <div className="busca-loading py-12 text-center text-slate-500 font-bold" aria-busy="true">
              Carregando profissionais qualificados...
            </div>
          ) : results.length > 0 ? (
            <div className="busca-grid">
              {results.map(prof => (
                <SearchResultCard
                  key={prof.id}
                  professional={prof}
                  isSelf={Boolean(currentUserId && prof.userId === currentUserId)}
                />
              ))}
            </div>
          ) : (
            <div className="busca-empty p-8 text-center space-y-3">
              <p className="busca-empty-title font-black text-xl text-[#103569]">
                {localityEmptyText
                  ? `Nenhum profissional encontrado ${localityEmptyText}`
                  : 'Nenhum profissional encontrado'}
              </p>
              <p className="busca-empty-sub text-slate-500 text-sm max-w-md mx-auto">
                {localityEmptyText
                  ? 'Tente selecionar outro município, outro estado ou limpar os filtros de localidade.'
                  : 'Tente ajustar os termos de busca ou remover os filtros aplicados.'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                {hasLocationFilter && (
                  <button
                    type="button"
                    onClick={handleClearLocation}
                    className="font-bold text-xs uppercase tracking-wider bg-[#103569] text-white px-4 py-2.5 rounded-xl hover:bg-[#103569]/90 transition-all cursor-pointer shadow-sm"
                  >
                    Limpar localidade
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="font-bold text-xs uppercase tracking-wider text-slate-600 hover:text-slate-900 border border-slate-200 bg-white px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw size={13} />
                  Limpar todos os filtros
                </button>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
