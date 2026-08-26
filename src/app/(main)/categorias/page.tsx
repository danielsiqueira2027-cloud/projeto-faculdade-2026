import React from 'react';
import { Metadata } from 'next';
import { CategoryCard } from '@/components/CategoryCard';
import { CATEGORIES_MOCK } from '@/types/category';
import { prisma } from '@/lib/database';

export const metadata: Metadata = {
  title: 'Categorias de Serviços - ClickServiço',
  description: 'Explore as diversas categorias de serviços disponíveis na plataforma.',
};

export default async function CategoriasPage() {
  const dbCategories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  const sourceCategories = dbCategories.length > 0
    ? dbCategories.map(dbCat => ({
        id: dbCat.id,
        name: dbCat.name,
        slug: dbCat.slug,
        icon: '',
        description: dbCat.description || undefined,
      }))
    : CATEGORIES_MOCK;

  return (
    <main className="py-12 md:py-16 min-h-[calc(100vh-220px)] bg-[#f8fafc]">
      <div className="container mx-auto px-4 max-w-295">
        {/* SaaS Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-block bg-[#103569]/5 text-[#103569] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-[#103569]/10">
            Catálogo de Serviços
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1D37] tracking-tight">
            Categorias de Serviços
          </h1>
          <p className="text-slate-500 font-medium text-base sm:text-lg leading-relaxed">
            Selecione a especialidade desejada para encontrar os profissionais mais bem avaliados na sua região.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-7 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {sourceCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </main>
  );
}
