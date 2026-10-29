import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ProfileCard } from '@/components/ProfileCard';
import { PortfolioGrid } from '@/components/PortfolioGrid';
import { ReviewsSection } from '@/components/ReviewsSection';
import { ProfessionalServices } from '@/components/ProfessionalServices';
import { getProfessionalDetails } from '@/app/actions/professionals';
import { getProfessionalServices } from '@/app/actions/services';
import {
  checkReviewEligibility,
  getProfessionalReviews,
  ReviewEligibilityResult,
} from '@/app/actions/reviews';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/database';

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function PerfilProfissionalPage({ searchParams }: PageProps) {
  const { id } = await searchParams;

  // Se nenhum ID for fornecido, tenta buscar o primeiro profissional do banco
  const profId = id;
  if (!profId) {
    const firstProf = await prisma.professional.findFirst({
      select: { id: true },
    });
    if (firstProf) {
      redirect(`/perfil-profissional?id=${firstProf.id}`);
    }
  }

  const [professional, currentUser, eligibility, reviews, services] = await Promise.all([
    profId ? getProfessionalDetails(profId) : Promise.resolve(null),
    getCurrentUser(),
    profId ? checkReviewEligibility(profId) : Promise.resolve<ReviewEligibilityResult>({ eligible: false }),
    profId ? getProfessionalReviews(profId) : Promise.resolve([]),
    profId ? getProfessionalServices(profId) : Promise.resolve([]),
  ]);

  const isOwnProfile = Boolean(currentUser && professional && currentUser.id === professional.userId);

  if (!professional) {
    return (
      <div className="container mx-auto p-8 max-w-200 min-h-[55vh] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-3xl shadow-inner">
          🔍
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-[#0b2545]">Nenhum profissional encontrado</h2>
          <p className="text-slate-500 font-medium max-w-md mx-auto">
            Não encontramos nenhum profissional com os dados informados ou ainda não há prestadores cadastrados no sistema.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center pt-2">
          <Link
            href="/buscas"
            className="bg-[#103569] hover:bg-[#103569]/90 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md no-underline"
          >
            Explorar profissionais
          </Link>
          <Link
            href="/categorias"
            className="bg-[#fddfa2] hover:bg-[#f5d080] text-[#0b2545] font-bold px-6 py-3 rounded-xl transition-all no-underline"
          >
            Ver categorias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-300">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-[#0b2545] tracking-tight uppercase">Perfil do Profissional</h1>
        <Link href="/buscas" className="text-[#f7941d] font-bold no-underline hover:underline flex items-center gap-1">
          &larr; Voltar para buscas
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <ProfileCard
            professional={professional}
            isOwnProfile={isOwnProfile}
            canReview={eligibility.eligible}
            hasExistingReview={Boolean(eligibility.existingReview)}
            isUnauthenticated={eligibility.reason === 'unauthenticated'}
            existingReview={eligibility.existingReview}
          />
        </div>

        {/* Seção de Serviços Oferecidos */}
        <div className="lg:col-span-3">
          <ProfessionalServices
            services={services}
            professionalId={professional.id}
            isOwnProfile={isOwnProfile}
          />
        </div>

        {/* Seção Bio / Sobre o profissional — aparece somente quando preenchida */}
        {professional.bio && (
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-bp-primary/5 border border-bp-outline-variant p-8 md:p-10">
              <h2 className="text-xl font-black text-[#0b2545] mb-4 uppercase tracking-tight">
                Sobre o profissional
              </h2>
              <p className="text-bp-on-surface/80 font-medium leading-relaxed whitespace-pre-line">
                {professional.bio}
              </p>
            </div>
          </div>
        )}

        {professional.portfolio && professional.portfolio.length > 0 && (
          <div className="lg:col-span-3">
            <PortfolioGrid items={professional.portfolio} />
          </div>
        )}

        {/* Seção de Avaliações */}
        <div className="lg:col-span-3">
          <ReviewsSection
            professionalId={professional.id}
            professionalName={professional.name}
            rating={professional.rating}
            reviewCount={professional.reviewCount}
            isOwnProfile={isOwnProfile}
            eligibility={eligibility}
            reviews={reviews}
          />
        </div>
      </div>
    </div>
  );
}
