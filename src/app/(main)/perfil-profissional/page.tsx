import React from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ProfileCard } from '@/components/ProfileCard';
import { PortfolioGrid } from '@/components/PortfolioGrid';
import { getProfessionalDetails } from '@/app/actions/professionals';
import { prisma } from '@/lib/database';

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function PerfilProfissionalPage({ searchParams }: PageProps) {
  const { id } = await searchParams;

  // Se nenhum ID for fornecido, tenta buscar o primeiro profissional do banco
  if (!id) {
    const firstProf = await prisma.professional.findFirst({
      select: { id: true },
    });
    if (firstProf) {
      redirect(`/perfil-profissional?id=${firstProf.id}`);
    }
    return notFound();
  }

  const professional = await getProfessionalDetails(id);

  if (!professional) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-[1200px]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-[#0b2545] tracking-tight uppercase">Perfil do Profissional</h1>
        <Link href="/buscas" className="text-[#f7941d] font-bold no-underline hover:underline flex items-center gap-1">
          &larr; Voltar para buscas
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <ProfileCard professional={professional} />
        </div>
        
        {professional.portfolio && professional.portfolio.length > 0 && (
          <div className="lg:col-span-3">
            <PortfolioGrid items={professional.portfolio} />
          </div>
        )}
      </div>
    </div>
  );
}
