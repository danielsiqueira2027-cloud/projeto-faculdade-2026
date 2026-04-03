'use client';

import React from 'react';
import { Category } from '@/types/category';
import { useRouter } from 'next/navigation';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();

  const handleNavigate = () => {
    // Redireciona para a busca usando a slug da categoria
    router.push(`/busca?categoria=${encodeURIComponent(category.slug)}`);
  };

  return (
    <article 
      onClick={handleNavigate}
      className="bg-white rounded-[18px] p-[30px_20px] flex flex-col items-center text-center shadow-[0_2px_5px_rgba(0,0,0,0.07)] transition-all duration-200 ease-in-out cursor-pointer hover:-translate-y-[5px] hover:shadow-[0_6px_12px_rgba(0,0,0,0.12)] hover:border-b-4 hover:border-brand-accent group"
    >
      <div className="text-[3.5rem] mb-[15px] transition-transform group-hover:scale-110">
        {category.icon}
      </div>
      <div className="card-body">
        <h3 className="text-[1.2rem] font-bold mb-[6px] uppercase text-brand-text">
          {category.name}
        </h3>
        <p className="text-[#666] text-[0.9rem]">
          Ver profissionais
        </p>
      </div>
    </article>
  );
}
