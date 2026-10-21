'use client';

import { useEffect } from 'react';
import { AlertTriangle, X, Loader2 } from 'lucide-react';
import type { AdminCategoryItem } from '@/app/actions/admin';

interface ConfirmCategoryToggleModalProps {
  category: AdminCategoryItem | null;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: (category: AdminCategoryItem) => void;
}

export function ConfirmCategoryToggleModal({
  category,
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: ConfirmCategoryToggleModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen || !category) return null;

  const isDeactivating = category.isActive;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="toggle-modal-title"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${isDeactivating ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <AlertTriangle size={24} />
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="min-h-[44px] min-w-[44px] p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center disabled:opacity-50"
              aria-label="Fechar modal"
            >
              <X size={18} />
            </button>
          </div>

          <h3 id="toggle-modal-title" className="text-lg font-bold text-slate-800">
            {isDeactivating ? 'Desativar Categoria' : 'Reativar Categoria'}
          </h3>

          <div className="text-sm text-slate-600 mt-2 space-y-2">
            <p>
              Deseja {isDeactivating ? 'desativar' : 'reativar'} a categoria{' '}
              <strong className="text-slate-800">{category.name}</strong>?
            </p>
            {isDeactivating && (
              <div className="p-3 bg-amber-50 rounded-xl text-amber-800 text-xs space-y-1 border border-amber-200">
                <p className="font-semibold">Aviso de impacto:</p>
                <p>
                  Esta categoria possui <strong>{category.professionalsCount}</strong> profissional(is) vinculado(s).
                  Profissionais já vinculados continuarão exibidos normalmente no catálogo e busca. A categoria apenas deixará de aparecer em novas seleções de cadastro.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="min-h-[44px] px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => onConfirm(category)}
              disabled={isLoading}
              className={`min-h-[44px] inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl text-white transition-all disabled:opacity-50 ${
                isDeactivating
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Processando...
                </>
              ) : isDeactivating ? (
                'Confirmar Desativação'
              ) : (
                'Confirmar Reativação'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
