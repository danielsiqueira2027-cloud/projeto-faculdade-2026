'use client';

import React, { useEffect, useRef } from 'react';
import { Trash2, X, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeleteOrderModalProps {
  isOpen: boolean;
  orderId: string | null;
  serviceType?: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
  error?: string | null;
}

export function DeleteOrderModal({
  isOpen,
  orderId,
  serviceType,
  onClose,
  onConfirm,
  loading,
  error,
}: DeleteOrderModalProps) {
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  // Fecha no ESC e foca no botão Cancelar ao abrir
  useEffect(() => {
    if (!isOpen) return;

    // Foco automático no botão de cancelar para evitar confirmação acidental
    cancelBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, loading, onClose]);

  if (!isOpen || !orderId) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-order-title"
      aria-describedby="delete-order-desc"
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={!loading ? onClose : undefined}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full sm:max-w-[460px] bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in duration-300 max-h-[95dvh] flex flex-col">
        {/* Header */}
        <div className="bg-rose-600 text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Trash2 size={20} className="text-white" />
            </div>
            <div>
              <h3 id="delete-order-title" className="font-black text-base tracking-tight leading-snug">
                Excluir este orçamento?
              </h3>
              {serviceType && (
                <p className="text-xs text-rose-100 font-medium line-clamp-1">
                  {serviceType}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all border-none cursor-pointer disabled:opacity-50 min-w-[44px] min-h-[44px] flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {error && (
            <div className="flex items-start gap-3 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs font-medium animate-in fade-in">
              <AlertCircle size={16} className="shrink-0 text-rose-600 mt-0.5" />
              <p className="leading-relaxed">{error}</p>
            </div>
          )}

          <p id="delete-order-desc" className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            As fotos e a conversa deste pedido também serão apagadas. Essa ação não pode ser desfeita.
          </p>

          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
            <p className="text-[11px] font-bold text-slate-500 leading-normal">
              O orçamento será removido permanentemente do seu painel e do profissional.
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col-reverse sm:flex-row items-center gap-2.5 pt-2">
            <Button
              ref={cancelBtnRef}
              type="button"
              variant="outline"
              disabled={loading}
              onClick={onClose}
              className="w-full sm:flex-1 min-h-[44px] rounded-xl font-bold border-slate-200 text-slate-600 text-xs hover:bg-slate-100 cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              disabled={loading}
              onClick={onConfirm}
              className="w-full sm:flex-1 min-h-[44px] rounded-xl font-bold bg-rose-600 hover:bg-rose-700 text-white text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Excluindo...</span>
                </>
              ) : (
                <>
                  <Trash2 size={15} />
                  <span>Excluir</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
