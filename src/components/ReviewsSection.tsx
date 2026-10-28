'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, MessageSquare, Info, ShieldCheck, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReviewModal } from '@/components/ReviewModal';
import { ReviewEligibilityResult, ReviewItem } from '@/app/actions/reviews';

interface ReviewsSectionProps {
  professionalId: string;
  professionalName: string;
  rating: number;
  reviewCount: number;
  isOwnProfile: boolean;
  eligibility: ReviewEligibilityResult;
  reviews: ReviewItem[];
}

export function ReviewsSection({
  professionalId,
  professionalName,
  rating,
  reviewCount,
  isOwnProfile,
  eligibility,
  reviews,
}: ReviewsSectionProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(date);
    } catch {
      return '';
    }
  };

  const handleSuccess = () => {
    router.refresh();
  };

  return (
    <div id="avaliacoes" className="bg-white rounded-[2.5rem] shadow-xl shadow-bp-primary/5 border border-bp-outline-variant p-6 sm:p-10 space-y-8">
      {/* Header da seção */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-bp-outline-variant/60 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-[#0b2545] uppercase tracking-tight">
              Avaliações dos Clientes
            </h2>
            <span className="bg-[#103569]/10 text-[#103569] text-xs font-black px-3 py-1 rounded-full">
              {reviewCount === 0
                ? 'Sem avaliações'
                : `${reviewCount} ${reviewCount === 1 ? 'avaliação' : 'avaliações'}`}
            </span>
          </div>
          <p className="text-bp-on-surface/60 font-medium text-sm mt-1">
            Opiniões reais de clientes que já entraram em contato ou contrataram este profissional.
          </p>
        </div>

        {/* Botão de Avaliar para clientes elegíveis */}
        {!isOwnProfile && eligibility.eligible && (
          <Button
            type="button"
            onClick={() => setModalOpen(true)}
            className="h-12 px-6 rounded-2xl bg-[#f7941d] hover:bg-[#e68516] text-white font-bold shadow-md shadow-[#f7941d]/20 transition-all flex items-center gap-2 shrink-0 border-none cursor-pointer"
          >
            <Star size={18} className="fill-white" />
            {eligibility.existingReview ? 'Editar minha avaliação' : 'Avaliar profissional'}
          </Button>
        )}

        {/* Botão de Entre para avaliar para visitantes não autenticados */}
        {!isOwnProfile && !eligibility.eligible && eligibility.reason === 'unauthenticated' && (
          <Link
            href={`/login?callbackUrl=/perfil-profissional?id=${professionalId}`}
            className="no-underline"
          >
            <Button
              type="button"
              variant="outline"
              className="h-12 px-6 rounded-2xl border-2 border-[#103569] text-[#103569] hover:bg-[#103569]/10 font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <LogIn size={18} className="text-[#103569]" />
              Entre para avaliar
            </Button>
          </Link>
        )}
      </div>

      {/* Box de aviso para visitante não autenticado */}
      {!isOwnProfile && !eligibility.eligible && eligibility.reason === 'unauthenticated' && (
        <div className="bg-blue-50/70 border border-blue-200/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-blue-900 text-sm font-medium">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-[#103569] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#103569]">Já contratou ou conversou com este profissional?</p>
              <p className="text-blue-900/80 mt-0.5">
                Faça login na sua conta para avaliar o atendimento recebido e ajudar outros clientes.
              </p>
            </div>
          </div>
          <Link
            href={`/login?callbackUrl=/perfil-profissional?id=${professionalId}`}
            className="shrink-0 no-underline"
          >
            <Button
              type="button"
              size="sm"
              className="bg-[#103569] hover:bg-[#103569]/90 text-white font-bold rounded-xl px-4 py-2 border-none shadow-sm cursor-pointer"
            >
              Fazer login &rarr;
            </Button>
          </Link>
        </div>
      )}

      {/* Box de aviso para quem não tem contato prévio */}
      {!isOwnProfile && !eligibility.eligible && eligibility.reason === 'no_contact' && (
        <div className="bg-blue-50/70 border border-blue-200/60 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-blue-900 text-sm font-medium">
          <Info size={20} className="text-[#103569] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[#103569]">Quer avaliar este profissional?</p>
            <p className="text-blue-900/80 mt-0.5">
              Converse com o profissional ou solicite um orçamento para poder avaliar o atendimento recebido.
            </p>
          </div>
        </div>
      )}

      {/* Resumo da nota geral */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        <div className="text-center sm:text-left shrink-0">
          <div className="text-4xl sm:text-5xl font-black text-[#103569]">
            {reviewCount === 0 ? 'Novo' : rating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                className={
                  star <= Math.round(rating) && reviewCount > 0
                    ? 'fill-[#f7941d] text-[#f7941d]'
                    : 'text-slate-200 fill-slate-200'
                }
              />
            ))}
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1.5">
            {reviewCount === 0
              ? 'Ainda sem nota'
              : `Média de ${reviewCount} ${reviewCount === 1 ? 'avaliação' : 'avaliações'}`}
          </p>
        </div>

        <div className="h-px sm:h-16 w-full sm:w-px bg-slate-200" />

        <div className="space-y-1 text-sm font-medium text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
            <span>Avaliações auditadas com base em orçamentos e conversas confirmadas.</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-[#103569] shrink-0" />
            <span>1 avaliação por cliente com possibilidade de edição a qualquer momento.</span>
          </div>
        </div>
      </div>

      {/* Lista de avaliações recebidas */}
      <div className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-[#0b2545]">Depoimentos recentes</h3>

        {reviews.length === 0 ? (
          <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-2 text-xl">
              💬
            </div>
            <p className="font-bold text-slate-700">Nenhuma avaliação ainda</p>
            <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto mt-1">
              Este profissional ainda não recebeu avaliações de clientes.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#103569] text-[#fddfa2] font-black text-sm flex items-center justify-center shrink-0">
                      {rev.clientName ? rev.clientName.charAt(0).toUpperCase() : 'C'}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#103569] text-sm leading-tight">
                        {rev.clientName}
                      </h4>
                      <p className="text-[11px] font-semibold text-slate-400">
                        {formatDate(rev.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Estrelas da review */}
                  <div className="flex items-center gap-1 shrink-0 bg-yellow-400/10 px-2.5 py-1 rounded-full">
                    <Star size={14} className="fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-bold text-yellow-800">{rev.rating}</span>
                  </div>
                </div>

                {rev.comment && (
                  <p className="text-sm text-slate-700 font-medium leading-relaxed pl-13 pr-2">
                    {rev.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Avaliação */}
      <ReviewModal
        isOpen={modalOpen}
        professionalId={professionalId}
        professionalName={professionalName}
        initialRating={eligibility.existingReview?.rating || 5}
        initialComment={eligibility.existingReview?.comment || ''}
        isEditing={Boolean(eligibility.existingReview)}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
