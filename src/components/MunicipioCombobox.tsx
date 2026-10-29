'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import { IbgeMunicipio } from '@/lib/ibge';

export interface MunicipioComboboxProps {
  municipios: IbgeMunicipio[];
  value: string;
  disabled?: boolean;
  loading?: boolean;
  onSelect: (cidade: string) => void;
  id?: string;
}

/**
 * Normaliza caractere para decomposição NFD sem diacríticos e em caixa baixa.
 */
function normalizeChar(c: string): string {
  return c.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/**
 * Normaliza string preservando a relação de 1 caractere para 1 caractere base.
 */
function normalizeString(str: string): string {
  return Array.from(str).map(normalizeChar).join('');
}

/**
 * Renderiza o nome do município destacando em negrito o trecho coincidente.
 */
function HighlightedText({ text, query }: { text: string; query: string }) {
  const normQuery = normalizeString(query);
  if (!normQuery) {
    return <span>{text}</span>;
  }

  const normText = normalizeString(text);
  const idx = normText.indexOf(normQuery);

  if (idx === -1) {
    return <span>{text}</span>;
  }

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + normQuery.length);
  const after = text.slice(idx + normQuery.length);

  return (
    <span>
      {before}
      <strong className="font-extrabold text-[#103569] bg-amber-100/70 rounded-xs px-0.5">
        {match}
      </strong>
      {after}
    </span>
  );
}

export function MunicipioCombobox({
  municipios,
  value,
  disabled = false,
  loading = false,
  onSelect,
  id = 'municipio-combobox',
}: MunicipioComboboxProps) {
  // Input controlado
  const [inputValue, setInputValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  // Sincroniza com a URL caso mude externamente (ex: botão voltar/avançar, trocar UF, limpar localidade)
  if (value !== prevValue) {
    setPrevValue(value);
    setInputValue(value);
  }

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  // Filtra municípios priorizando "começa com" e depois "contém"
  const { visibleSuggestions, totalCount } = useMemo(() => {
    const trimmed = inputValue.trim();
    if (!trimmed || disabled) {
      return { visibleSuggestions: [], totalCount: 0 };
    }

    const normQuery = normalizeString(trimmed);
    const startsWithMatches: IbgeMunicipio[] = [];
    const containsMatches: IbgeMunicipio[] = [];

    for (const m of municipios) {
      const normNome = normalizeString(m.nome);
      if (normNome.startsWith(normQuery)) {
        startsWithMatches.push(m);
      } else if (normNome.includes(normQuery)) {
        containsMatches.push(m);
      }
    }

    const allMatches = [...startsWithMatches, ...containsMatches];
    return {
      visibleSuggestions: allMatches.slice(0, 8),
      totalCount: allMatches.length,
    };
  }, [inputValue, municipios, disabled]);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
        // Se o usuário digitou sem selecionar nenhuma sugestão, restaura o valor confirmado
        if (inputValue !== value) {
          setInputValue(value);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [inputValue, value]);

  // Rola o item ativo para a visão ao navegar com teclado
  useEffect(() => {
    if (activeIndex >= 0 && listboxRef.current) {
      const activeEl = listboxRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setActiveIndex(-1);
    // Só abre se houver pelo menos 1 caractere digitado
    setIsOpen(val.trim().length > 0);
  };

  const handleSelect = useCallback(
    (cidadeNome: string) => {
      setInputValue(cidadeNome);
      setIsOpen(false);
      setActiveIndex(-1);
      onSelect(cidadeNome);
    },
    [onSelect]
  );

  const handleClear = () => {
    setInputValue('');
    setIsOpen(false);
    setActiveIndex(-1);
    onSelect('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen && inputValue.trim().length > 0) {
        setIsOpen(true);
        setActiveIndex(0);
      } else if (visibleSuggestions.length > 0) {
        setActiveIndex((prev) => (prev + 1) % visibleSuggestions.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isOpen && visibleSuggestions.length > 0) {
        setActiveIndex((prev) => (prev <= 0 ? visibleSuggestions.length - 1 : prev - 1));
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (isOpen && activeIndex >= 0 && activeIndex < visibleSuggestions.length) {
        // Seleciona o item destacado
        handleSelect(visibleSuggestions[activeIndex].nome);
      } else if (isOpen && visibleSuggestions.length === 1) {
        // Se houver exatamente uma sugestão, seleciona ela
        handleSelect(visibleSuggestions[0].nome);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setActiveIndex(-1);
    } else if (e.key === 'Tab') {
      setIsOpen(false);
      setActiveIndex(-1);
      if (inputValue !== value) {
        setInputValue(value);
      }
    }
  };

  // Define o placeholder adequado para o estado atual
  const placeholderText = disabled
    ? 'Escolha o estado primeiro'
    : loading
    ? 'Carregando municípios...'
    : 'Digite o município...';

  const listboxId = `${id}-listbox`;
  const activeDescendantId =
    isOpen && activeIndex >= 0 ? `${id}-opt-${activeIndex}` : undefined;

  return (
    <div ref={containerRef} className="busca-combobox-wrap relative">
      <div className="busca-combobox-input-wrap relative flex items-center">
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeDescendantId}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled || loading}
          placeholder={placeholderText}
          autoComplete="off"
          className="busca-filter-select pr-8"
          aria-label="Município"
        />

        {/* Indicador de carregamento ou Botão Limpar */}
        <div className="absolute right-2.5 flex items-center gap-1">
          {loading ? (
            <Loader2 size={14} className="text-slate-400 animate-spin" aria-hidden="true" />
          ) : inputValue && !disabled ? (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-hidden focus:ring-1 focus:ring-[#103569]"
              aria-label="Limpar município digitado"
              title="Limpar município"
            >
              <X size={13} aria-hidden="true" />
            </button>
          ) : (
            <Search size={13} className="text-slate-400 pointer-events-none" aria-hidden="true" />
          )}
        </div>
      </div>

      {/* Dropdown de sugestões */}
      {isOpen && !disabled && (
        <div
          className="busca-combobox-dropdown absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100"
          style={{ minWidth: '100%' }}
        >
          {visibleSuggestions.length > 0 ? (
            <>
              <ul
                ref={listboxRef}
                id={listboxId}
                role="listbox"
                aria-label="Sugestões de municípios"
                className="max-h-60 overflow-y-auto py-1 divide-y divide-slate-50 focus:outline-hidden"
              >
                {visibleSuggestions.map((mun, idx) => {
                  const isSelected = activeIndex === idx;
                  const isCurrentFilter = mun.nome.toLowerCase() === value.toLowerCase();

                  return (
                    <li
                      key={mun.id}
                      id={`${id}-opt-${idx}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(mun.nome)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`px-3 py-2.5 text-xs font-semibold cursor-pointer flex items-center justify-between transition-colors min-h-[40px] ${
                        isSelected
                          ? 'bg-blue-50 text-[#103569]'
                          : isCurrentFilter
                          ? 'bg-slate-50 text-[#103569] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">
                        <HighlightedText text={mun.nome} query={inputValue} />
                      </span>
                      {isCurrentFilter && (
                        <span className="text-[10px] uppercase font-extrabold text-[#f7941d] bg-[#f7941d]/10 px-1.5 py-0.5 rounded-sm shrink-0 ml-1">
                          Ativo
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Dica de refinamento quando há mais de 8 correspondências */}
              {totalCount > 8 && (
                <div className="busca-combobox-refine-hint px-3 py-1.5 text-[11px] font-medium text-slate-500 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span>+{totalCount - 8} outros municípios</span>
                  <span className="text-[10px] text-slate-400">Continue digitando para refinar</span>
                </div>
              )}
            </>
          ) : (
            <div className="p-3 text-xs text-slate-500 text-center font-medium">
              Nenhum município encontrado
            </div>
          )}
        </div>
      )}
    </div>
  );
}

