'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback, useId, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { getUfsAction, getMunicipiosByUfAction, UF, Municipio } from '@/app/actions/locations';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Loader2, AlertCircle, Check, ChevronDown } from 'lucide-react';

interface CitySelectorProps {
  valueCity: string;
  valueState: string;
  legacyLocation?: string;
  onChange: (city: string, state: string) => void;
  required?: boolean;
  disabled?: boolean;
}

interface DropdownPosition {
  top: number;
  left: number;
  width: number;
  openUpwards: boolean;
  maxHeight: number;
}

/**
 * Converte nomes de cidades para Title Case elegante (ex: "AMERICANA" -> "Americana")
 */
function toTitleCase(str: string): string {
  if (!str) return '';
  const lowerWords = new Set(['de', 'da', 'do', 'dos', 'das', 'e', 'em', 'para', 'com']);
  return str
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((word, index) => {
      if (word.includes("'")) {
        return word
          .split("'")
          .map((part) => (lowerWords.has(part) ? part : part.charAt(0).toUpperCase() + part.slice(1)))
          .join("'");
      }
      if (index > 0 && lowerWords.has(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

const emptySubscribe = () => () => {};

export function CitySelector({
  valueCity,
  valueState,
  legacyLocation,
  onChange,
  required = false,
  disabled = false,
}: CitySelectorProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [ufs, setUfs] = useState<UF[]>([]);
  const [selectedUf, setSelectedUf] = useState<string>(valueState || '');
  const [selectedCity, setSelectedCity] = useState<string>(valueCity ? toTitleCase(valueCity) : '');

  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [loadingUfs, setLoadingUfs] = useState(false);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Controle do combobox de cidades
  const [searchTerm, setSearchTerm] = useState<string>(valueCity ? toTitleCase(valueCity) : '');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [manualMode, setManualMode] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dropdownId = useId();



  // Padrão oficial React 19: Ajuste de estado durante render quando props mudam (sem efeito em cascata)
  const [prevProps, setPrevProps] = useState({ city: valueCity, state: valueState });
  if (prevProps.city !== valueCity || prevProps.state !== valueState) {
    setPrevProps({ city: valueCity, state: valueState });
    setSelectedUf(valueState || '');
    const titleCity = valueCity ? toTitleCase(valueCity) : '';
    setSelectedCity(titleCity);
    setSearchTerm(titleCity);
  }

  // Carrega lista de UFs ao montar
  useEffect(() => {
    let mounted = true;
    async function loadUfs() {
      setLoadingUfs(true);
      try {
        const data = await getUfsAction();
        if (mounted) {
          setUfs(data);
        }
      } catch (err) {
        console.error('Erro ao carregar UFs:', err);
      } finally {
        if (mounted) setLoadingUfs(false);
      }
    }
    loadUfs();
    return () => {
      mounted = false;
    };
  }, []);

  // Carrega municípios sempre que o estado muda
  useEffect(() => {
    let mounted = true;
    if (!selectedUf) {
      return;
    }

    async function loadMunicipios() {
      setLoadingMunicipios(true);
      try {
        const res = await getMunicipiosByUfAction(selectedUf);
        if (mounted) {
          if (res.success && res.municipios.length > 0) {
            setMunicipios(res.municipios);
            setFetchError(null);
            setManualMode(false);
          } else {
            setMunicipios([]);
            setFetchError(res.error || 'Lista de municípios indisponível.');
            setManualMode(true);
          }
        }
      } catch {
        if (mounted) {
          setMunicipios([]);
          setFetchError('Não foi possível carregar as cidades da API. Digite manualmente.');
          setManualMode(true);
        }
      } finally {
        if (mounted) setLoadingMunicipios(false);
      }
    }

    loadMunicipios();
    return () => {
      mounted = false;
    };
  }, [selectedUf]);

  // Calcula posicionamento flutuante do dropdown em relação ao input
  const updatePosition = useCallback(() => {
    if (!inputRef.current) return;
    const rect = inputRef.current.getBoundingClientRect();
    const dropdownEstimatedHeight = 240;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openUpwards = spaceBelow < dropdownEstimatedHeight && spaceAbove > spaceBelow;

    setDropdownPosition({
      top: openUpwards ? rect.top - 6 : rect.bottom + 6,
      left: rect.left,
      width: rect.width,
      openUpwards,
      maxHeight: Math.min(240, Math.max(120, openUpwards ? spaceAbove - 20 : spaceBelow - 20)),
    });
  }, []);

  // Atualiza posição do portal ao abrir, rolar ou redimensionar a janela
  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  // Filtra municípios com base no termo digitado
  const filteredMunicipios = useMemo(() => {
    if (!selectedUf) return [];
    if (!searchTerm.trim()) return municipios.slice(0, 80);
    const term = searchTerm.trim().toLowerCase();
    return municipios
      .filter((m) => m.nome.toLowerCase().includes(term))
      .slice(0, 80);
  }, [municipios, searchTerm, selectedUf]);

  // Fecha dropdown ao clicar fora (verificando container do input E portal do dropdown)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const isInsideContainer = containerRef.current && containerRef.current.contains(target);
      const isInsideDropdown = dropdownRef.current && dropdownRef.current.contains(target);
      if (!isInsideContainer && !isInsideDropdown) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectUf = (uf: string) => {
    setSelectedUf(uf);
    setSelectedCity('');
    setSearchTerm('');
    setMunicipios([]);
    setFetchError(null);
    setIsOpen(false);
    onChange('', uf);
  };

  const handleSelectCity = useCallback(
    (cityName: string) => {
      const titleCaseName = toTitleCase(cityName);
      setSelectedCity(titleCaseName);
      setSearchTerm(titleCaseName);
      setIsOpen(false);
      setHighlightedIndex(-1);
      onChange(titleCaseName, selectedUf);
    },
    [onChange, selectedUf]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        updatePosition();
        return;
      }
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredMunicipios.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredMunicipios.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredMunicipios.length) {
          handleSelectCity(filteredMunicipios[highlightedIndex].nome);
        } else if (searchTerm.trim()) {
          handleSelectCity(searchTerm.trim());
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  // Garante scroll automático até o item destacado ao navegar por setas
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const activeEl = listRef.current.children[highlightedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className="space-y-4" ref={containerRef}>
      {/* Aviso de compatibilidade com localização legada */}
      {legacyLocation && !valueCity && !valueState && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
          <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Localização cadastrada anteriormente: </span>
            <span className="font-semibold underline">{legacyLocation}</span>
            <p className="mt-1 text-[11px] text-amber-700">
              Selecione o Estado e a Cidade estruturados abaixo para atualizar seu serviço para o novo padrão de busca.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Seletor de Estado (UF) */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-[#103569]/50 uppercase tracking-widest block">
            Estado (UF) {required && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <select
              value={selectedUf}
              onChange={(e) => handleSelectUf(e.target.value)}
              disabled={disabled || loadingUfs}
              className="w-full h-12 px-3 rounded-xl border border-input bg-white text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#f7941d] focus:outline-none appearance-none cursor-pointer disabled:opacity-50"
              required={required}
            >
              <option value="" disabled>
                {loadingUfs ? 'Carregando UFs...' : 'Selecione a UF'}
              </option>
              {ufs.map((uf) => (
                <option key={uf.sigla} value={uf.sigla}>
                  {uf.sigla} - {uf.nome}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Combobox de Cidade */}
        <div className="sm:col-span-2 space-y-1.5 relative">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black text-[#103569]/50 uppercase tracking-widest block">
              Cidade {required && <span className="text-red-500">*</span>}
            </label>
            {fetchError && (
              <button
                type="button"
                onClick={() => setManualMode(!manualMode)}
                className="text-[10px] font-bold text-[#f7941d] hover:underline"
              >
                {manualMode ? 'Voltar para lista' : 'Digitar manualmente'}
              </button>
            )}
          </div>

          <div className="relative">
            <MapPin
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

            <Input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (manualMode) {
                  setSelectedCity(e.target.value);
                  onChange(e.target.value, selectedUf);
                } else {
                  setIsOpen(true);
                  setHighlightedIndex(-1);
                  updatePosition();
                }
              }}
              onFocus={() => {
                if (!manualMode && selectedUf && municipios.length > 0) {
                  setIsOpen(true);
                  updatePosition();
                }
              }}
              onKeyDown={handleKeyDown}
              disabled={disabled || !selectedUf}
              placeholder={
                !selectedUf
                  ? 'Primeiro selecione o estado (UF)'
                  : loadingMunicipios
                  ? 'Carregando cidades do IBGE...'
                  : manualMode
                  ? 'Digite o nome da sua cidade...'
                  : 'Digite para buscar sua cidade...'
              }
              className="h-12 pl-10 pr-10 rounded-xl bg-white text-sm font-semibold"
              required={required}
              autoComplete="off"
              role="combobox"
              aria-expanded={isOpen}
              aria-autocomplete="list"
              aria-controls={isOpen ? dropdownId : undefined}
              aria-activedescendant={
                isOpen && highlightedIndex >= 0 ? `${dropdownId}-opt-${highlightedIndex}` : undefined
              }
            />

            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-400">
              {loadingMunicipios ? (
                <Loader2 size={16} className="animate-spin text-[#103569]" />
              ) : selectedCity ? (
                <Check size={16} className="text-green-600" />
              ) : (
                <Search size={16} />
              )}
            </div>
          </div>

          {/* Fallback de erro e instrução manual */}
          {fetchError && (
            <p className="text-[11px] font-medium text-amber-700 mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {fetchError}
            </p>
          )}

          {/* Menu Dropdown do Combobox via Portal (não cortado por overflow-hidden) */}
          {isMounted &&
            typeof document !== 'undefined' &&
            isOpen &&
            !manualMode &&
            selectedUf &&
            municipios.length > 0 &&
            dropdownPosition &&
            createPortal(
              <div
                ref={dropdownRef}
                style={{
                  position: 'fixed',
                  top: `${dropdownPosition.top}px`,
                  left: `${dropdownPosition.left}px`,
                  width: `${dropdownPosition.width}px`,
                  maxHeight: `${dropdownPosition.maxHeight}px`,
                  transform: dropdownPosition.openUpwards ? 'translateY(-100%)' : 'none',
                  zIndex: 9999,
                }}
                className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-y-auto animate-in fade-in-50 zoom-in-95 duration-150"
              >
                {filteredMunicipios.length === 0 ? (
                  <div className="p-4 text-center">
                    <p className="text-xs text-slate-500 font-bold">Nenhuma cidade encontrada.</p>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelectCity(searchTerm);
                        setManualMode(true);
                      }}
                      className="mt-2 text-xs font-bold text-[#103569] hover:underline"
                    >
                      Usar &quot;{searchTerm}&quot; mesmo assim
                    </button>
                  </div>
                ) : (
                  <ul
                    id={dropdownId}
                    ref={listRef}
                    role="listbox"
                    className="p-1.5 space-y-0.5"
                  >
                    {filteredMunicipios.map((m, idx) => {
                      const titleCaseName = toTitleCase(m.nome);
                      const isSelected = selectedCity.toLowerCase() === titleCaseName.toLowerCase();
                      const isHighlighted = highlightedIndex === idx;
                      return (
                        <li
                          id={`${dropdownId}-opt-${idx}`}
                          key={m.codigo_ibge || `${m.nome}-${idx}`}
                          role="option"
                          aria-selected={isSelected}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSelectCity(m.nome);
                          }}
                          onMouseEnter={() => setHighlightedIndex(idx)}
                          className={`px-3 py-2.5 rounded-xl text-sm font-semibold cursor-pointer flex items-center justify-between transition-colors ${
                            isHighlighted
                              ? 'bg-[#103569]/10 text-[#103569]'
                              : isSelected
                              ? 'bg-[#103569] text-white'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{titleCaseName}</span>
                          {isSelected && <Check size={14} className="text-current" />}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>,
              document.body
            )}
        </div>
      </div>
    </div>
  );
}
