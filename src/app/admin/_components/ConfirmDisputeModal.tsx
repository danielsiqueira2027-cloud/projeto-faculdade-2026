'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

interface ConfirmDisputeModalProps {
  orderId: string | null;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: (orderId: string, reason: string) => void;
}

export function ConfirmDisputeModal({
  orderId,
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: ConfirmDisputeModalProps) {
  const [reason, setReason] = useState('');

  const handleClose = () => {
    setReason('');
    onClose();
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && !isLoading) {
        setReason('');
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

  if (!isOpen || !orderId) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(orderId, reason);
    setReason('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dispute-modal-title"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-red-50 text-red-600">
              <AlertTriangle size={24} />
            </div>
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="min-h-[44px] min-w-[44px] p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center disabled:opacity-50"
              aria-label="Fechar modal"
            >
              <X size={18} />
            </button>
          </div>

          <h3 id="dispute-modal-title" className="text-lg font-bold text-slate-800">
            Marcar Pedido em Disputa
          </h3>
          <p className="text-sm text-slate-600 mt-1.5">
            Deseja marcar o pedido <strong className="text-slate-800 font-mono">#{orderId.slice(0, 8)}</strong> como <strong>Em Disputa</strong>? 
            Esta ação sinaliza intervenção administrativa necessária entre cliente e profissional.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label htmlFor="dispute-reason" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Motivo da Disputa (opcional)
              </label>
              <textarea
                id="dispute-reason"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Descreva o motivo informado pelas partes ou da moderação..."
                className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="min-h-[44px] px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Atualizando...
                  </>
                ) : (
                  'Confirmar Disputa'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
