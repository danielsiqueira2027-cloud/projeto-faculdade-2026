import React from 'react';
import { Metadata } from 'next';
import { CategoryCard } from '@/components/CategoryCard';
import { CATEGORIES_MOCK } from '@/types/category';

export const metadata: Metadata = {
  title: 'Categorias de Serviços - ClickServiço',
  description: 'Explore as diversas categorias de serviços disponíveis na plataforma.',
};

export default function CategoriasPage() {
  return (
    <div className="py-10 min-h-[calc(100vh-220px)] bg-brand-bg">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h2 className="text-3xl font-bold mb-8 text-brand-text text-center md:text-4xl">
          Categorias de Serviços
        </h2>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {CATEGORIES_MOCK.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
