'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, X, Loader2 } from 'lucide-react';
import type { User } from '../types';

interface ConfirmStatusModalProps {
  user: User | null;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function ConfirmStatusModal({
  user,
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: ConfirmStatusModalProps) {
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

  if (!isOpen || !user) return null;

  const isSuspending = user.status === 'Ativo';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(reason);
    setReason('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${isSuspending ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {isSuspending ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <h3 className="text-lg font-bold text-slate-800">
            {isSuspending ? 'Suspender Usuário' : 'Reativar Usuário'}
          </h3>
          <p className="text-sm text-slate-600 mt-1.5">
            {isSuspending ? (
              <>
                Deseja suspender a conta de <strong className="text-slate-800">{user.name}</strong> ({user.email})? O acesso à plataforma será imediatamente bloqueado.
              </>
            ) : (
              <>
                Deseja reativar a conta de <strong className="text-slate-800">{user.name}</strong> ({user.email})? O usuário poderá voltar a acessar a plataforma normalmente.
              </>
            )}
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label htmlFor="reason" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Motivo da {isSuspending ? 'suspensão' : 'reativação'} (opcional)
              </label>
              <textarea
                id="reason"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={isSuspending ? 'Ex: Violação das diretrizes da comunidade...' : 'Ex: Regularização solicitada pelo usuário...'}
                className="w-full text-sm p-3 border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                maxLength={300}
              />
              <span className="text-[11px] text-slate-400 block text-right mt-1">
                {reason.length}/300 caracteres
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all flex items-center gap-2 shadow-sm ${
                  isSuspending 
                    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500/20' 
                    : 'bg-green-600 hover:bg-green-700 focus:ring-green-500/20'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processando...
                  </>
                ) : isSuspending ? (
                  'Confirmar Suspensão'
                ) : (
                  'Confirmar Reativação'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
