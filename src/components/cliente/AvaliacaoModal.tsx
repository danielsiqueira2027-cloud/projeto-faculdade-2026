'use client';

import React, { useState } from 'react';
import { X, Star, Check, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createTestimonialAction } from '@/app/actions/testimonials';

interface AvaliacaoModalProps {
  orderId: string;
  professionalName: string;
  serviceType: string;
  onClose: () => void;
  onSuccess: () => void;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Muito insatisfeito',
  2: 'Insatisfeito',
  3: 'Regular / Bom',
  4: 'Muito bom',
  5: 'Excelente serviço!',
};

export function AvaliacaoModal({
  orderId,
  professionalName,
  serviceType,
  onClose,
  onSuccess,
}: AvaliacaoModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const activeRating = hoverRating !== null ? hoverRating : rating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Por favor, escreva um breve comentário sobre o atendimento recebido.');
      return;
    }

    setLoading(true);
    setError(null);

    const result = await createTestimonialAction({
      orderId,
      rating,
      content: comment.trim(),
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!loading ? onClose : undefined}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full sm:max-w-[480px] bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in duration-300 max-h-[95dvh] flex flex-col">
        {/* Header */}
        <div className="bg-[#103569] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-[#f7941d] fill-[#f7941d]" />
              <h3 className="font-black text-base">Avaliar Serviço</h3>
            </div>
            <p className="text-xs text-white/70 font-medium mt-0.5">
              {serviceType} · {professionalName}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all border-none cursor-pointer disabled:opacity-50"
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
                Avaliação enviada com sucesso!
              </p>
              <p className="text-sm text-slate-500 font-semibold text-center">
                Obrigado pelo seu feedback! Sua opinião ajuda a manter a qualidade dos serviços.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating Selector */}
              <div className="flex flex-col items-center justify-center gap-2 pt-2">
                <p className="text-xs font-black text-[#103569]/50 uppercase tracking-widest">
                  Como foi sua experiência?
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

              {/* Comment Textarea */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#103569]/70 uppercase tracking-widest">
                  Seu depoimento
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Conte os detalhes do serviço prestado: pontualidade, qualidade, atendimento e se você recomenda o profissional..."
                  rows={4}
                  className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#103569] focus:border-transparent text-sm text-slate-800 placeholder-slate-400 resize-none font-medium transition-all"
                  maxLength={500}
                />
                <div className="flex justify-between items-center text-[11px] text-slate-400 font-semibold px-1">
                  <span>Mínimo de detalhes para ajudar outros clientes</span>
                  <span>{comment.length}/500</span>
                </div>
              </div>

              {/* Error state */}
              {error && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3 animate-in fade-in duration-200">
                  <AlertTriangle size={18} className="text-red-500 shrink-0" />
                  <p className="text-xs font-bold text-red-700">{error}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-2 flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 h-12 rounded-xl font-bold text-sm text-slate-500 border-slate-200 hover:bg-slate-50"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-12 rounded-xl font-black text-sm text-white bg-[#103569] hover:bg-[#103569]/90 shadow-md shadow-blue-950/10 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      Enviar Avaliação
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
