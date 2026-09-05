import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
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
  const profId = id;
  if (!profId) {
    const firstProf = await prisma.professional.findFirst({
      select: { id: true },
    });
    if (firstProf) {
      redirect(`/perfil-profissional?id=${firstProf.id}`);
    }
  }

  const professional = profId ? await getProfessionalDetails(profId) : null;

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
