'use client';

import React, { useState, useEffect } from 'react';
import { X, Star, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { saveReviewAction } from '@/app/actions/reviews';

interface ReviewModalProps {
  isOpen: boolean;
  professionalId: string;
  professionalName: string;
  initialRating?: number;
  initialComment?: string | null;
  isEditing?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Muito insatisfeito',
  2: 'Insatisfeito',
  3: 'Regular / Bom',
  4: 'Muito bom',
  5: 'Excelente serviço!',
};

export function ReviewModal({
  isOpen,
  professionalId,
  professionalName,
  initialRating = 5,
  initialComment = '',
  isEditing = false,
  onClose,
  onSuccess,
}: ReviewModalProps) {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>(initialComment || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setRating(initialRating || 5);
      setComment(initialComment || '');
      setError(null);
      setSuccess(false);
      setHoverRating(null);
    }
  }, [isOpen, initialRating, initialComment]);

  if (!isOpen) return null;

  const activeRating = hoverRating !== null ? hoverRating : rating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await saveReviewAction({
      professionalId,
      rating,
      comment: comment.trim() || null,
    });

    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Erro ao registrar avaliação.');
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      onSuccess?.();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!loading ? onClose : undefined}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full sm:max-w-[480px] bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in duration-300 max-h-[95dvh] flex flex-col">
        {/* Header */}
        <div className="bg-[#103569] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-[#f7941d] fill-[#f7941d]" />
              <h3 className="font-black text-base">
                {isEditing ? 'Editar Avaliação' : 'Avaliar Profissional'}
              </h3>
            </div>
            <p className="text-xs text-white/70 font-medium mt-0.5">
              {professionalName}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            type="button"
            className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all border-none cursor-pointer disabled:opacity-50"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-8 gap-4 animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={32} className="text-green-600" />
              </div>
              <p className="font-black text-[#103569] text-center text-lg">
                {isEditing ? 'Avaliação atualizada com sucesso!' : 'Avaliação registrada com sucesso!'}
              </p>
              <p className="text-sm text-slate-500 font-semibold text-center">
                Obrigado pelo seu feedback! Sua nota ajuda outros clientes na escolha.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating Selector */}
              <div className="flex flex-col items-center justify-center gap-2 pt-2">
                <p className="text-xs font-black text-[#103569]/50 uppercase tracking-widest">
                  Selecione sua nota
                </p>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= activeRating;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 hover:scale-110 active:scale-95 transition-transform border-none bg-transparent cursor-pointer"
                        aria-label={`${star} estrelas`}
                      >
                        <Star
                          size={36}
                          className={`transition-colors ${
                            isFilled
                              ? 'text-[#f7941d] fill-[#f7941d]'
                              : 'text-slate-200 fill-slate-100'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-sm font-bold text-[#103569] h-5">
                  {RATING_LABELS[activeRating] || ''}
                </span>
              </div>

              {/* Comment Textarea (Opcional) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-[#103569]/70 uppercase tracking-widest">
                    Comentário
                  </label>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Opcional
                  </span>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Conte como foi sua experiência com este profissional (pontualidade, atendimento, qualidade)..."
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 font-medium focus:bg-white focus:border-[#f7941d] focus:ring-2 focus:ring-[#f7941d]/20 transition-all outline-none resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-xs font-bold">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 h-12 rounded-2xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-12 rounded-2xl bg-[#f7941d] hover:bg-[#e68516] text-white font-bold shadow-md shadow-[#f7941d]/20 transition-all border-none flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {isEditing ? 'Atualizar Avaliação' : 'Salvar Avaliação'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
