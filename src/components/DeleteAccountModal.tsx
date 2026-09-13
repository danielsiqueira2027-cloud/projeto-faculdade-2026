'use client';

import React, { useState } from 'react';
import { AlertTriangle, Trash2, X, AlertCircle, Loader2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteAccountAction } from '@/app/actions/account';


interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'cliente' | 'profissional';
}

export function DeleteAccountModal({ isOpen, onClose, userType }: DeleteAccountModalProps) {
  const [confirmationInput, setConfirmationInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const isConfirmed = confirmationInput.trim().toUpperCase() === 'EXCLUIR';

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfirmed) return;

    setLoading(true);
    setError(null);

    try {
      const result = await deleteAccountAction();

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // Sucesso: redireciona para a home com recarregamento completo
      window.location.href = '/?accountDeleted=true';
    } catch (err: unknown) {
      console.error('[DeleteAccountModal Error]', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado ao excluir sua conta. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!loading ? onClose : undefined}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full sm:max-w-[500px] bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in duration-300 max-h-[95dvh] flex flex-col">
        {/* Header de Alerta Crítico */}
        <div className="bg-rose-700 text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <ShieldAlert size={22} className="text-white" />
            </div>
            <div>
              <h3 className="font-black text-base tracking-tight">Exclusão Definitiva de Conta</h3>
              <p className="text-xs text-rose-100 font-medium">Ação irreversível · LGPD</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all border-none cursor-pointer disabled:opacity-50"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleDelete} className="p-6 overflow-y-auto space-y-5">
          {/* Mensagem de Erro / Bloqueio */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs font-medium animate-in fade-in">
              <AlertCircle size={18} className="shrink-0 text-rose-600 mt-0.5" />
              <p className="leading-relaxed">{error}</p>
            </div>
          )}

          {/* Advertência */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle size={16} className="text-amber-600" />
              <span>Atenção: Esta ação não pode ser desfeita</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Todos os seus dados cadastrais, autenticação e arquivos serão permanentemente
              apagados de nossos servidores.
            </p>
          </div>

          {/* O que será apagado */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest">
              O que será excluído permanentemente:
            </h4>
            <ul className="text-xs text-gray-600 space-y-1.5 pl-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span>Perfil de {userType === 'cliente' ? 'Cliente' : 'Profissional'} e dados pessoais</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span>Histórico de pedidos, agendamentos e propostas finalizadas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span>Mensagens e mídias enviadas no chat</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span>Avaliações, depoimentos e fotos de perfil/portfólio</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span>Credenciais de login no sistema de autenticação</span>
              </li>
            </ul>
          </div>

          {/* Confirmação textual */}
          <div className="space-y-2 pt-2">
            <label className="text-[11px] font-black text-gray-700 uppercase tracking-widest block">
              Para confirmar, digite <span className="text-rose-600 font-extrabold">EXCLUIR</span> abaixo:
            </label>
            <input
              type="text"
              value={confirmationInput}
              onChange={(e) => setConfirmationInput(e.target.value)}
              placeholder="Digite EXCLUIR"
              disabled={loading}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all uppercase"
              autoComplete="off"
            />
          </div>

          {/* Ações */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-1/2 rounded-2xl h-12 border-gray-200 font-bold text-gray-600 hover:bg-gray-100"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isConfirmed || loading}
              className="w-full sm:w-1/2 rounded-2xl h-12 bg-rose-600 hover:bg-rose-700 text-white font-black shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Excluindo...</span>
                </>
              ) : (
                <>
                  <Trash2 size={18} />
                  <span>Excluir Conta</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
