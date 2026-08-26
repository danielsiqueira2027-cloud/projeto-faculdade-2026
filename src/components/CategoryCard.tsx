'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Droplets, 
  Paintbrush, 
  Zap, 
  Hammer, 
  Axe, 
  AppWindow, 
  Layers, 
  Grid2x2, 
  Settings, 
  Wrench,
  ArrowRight,
  LucideIcon
} from 'lucide-react';
import { Category } from '@/types/category';

interface CategoryCardProps {
  category: Category;
}

interface CategoryStyleConfig {
  icon: LucideIcon;
  color: string;
  bgGradient: string;
  borderColor: string;
  shadowColor: string;
  badgeBg: string;
}

const CATEGORY_CONFIG: Record<string, CategoryStyleConfig> = {
  encanador: {
    icon: Droplets,
    color: '#0284c7', // Sky 600
    bgGradient: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
    borderColor: '#7dd3fc',
    shadowColor: 'rgba(2, 132, 199, 0.18)',
    badgeBg: '#f0f9ff',
  },
  pintor: {
    icon: Paintbrush,
    color: '#e11d48', // Rose 600
    bgGradient: 'linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)',
    borderColor: '#fda4af',
    shadowColor: 'rgba(225, 29, 72, 0.18)',
    badgeBg: '#fff1f2',
  },
  eletricista: {
    icon: Zap,
    color: '#d97706', // Amber 600
    bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    borderColor: '#fcd34d',
    shadowColor: 'rgba(217, 119, 6, 0.18)',
    badgeBg: '#fffbeb',
  },
  pedreiro: {
    icon: Hammer,
    color: '#ea580c', // Orange 600
    bgGradient: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
    borderColor: '#fdba74',
    shadowColor: 'rgba(234, 88, 12, 0.18)',
    badgeBg: '#fff7ed',
  },
  carpinteiro: {
    icon: Axe,
    color: '#b45309', // Amber 700
    bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    borderColor: '#fcd34d',
    shadowColor: 'rgba(180, 83, 9, 0.18)',
    badgeBg: '#fffbeb',
  },
  vidraceiro: {
    icon: AppWindow,
    color: '#0891b2', // Cyan 600
    bgGradient: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)',
    borderColor: '#67e8f9',
    shadowColor: 'rgba(8, 145, 178, 0.18)',
    badgeBg: '#ecfeff',
  },
  gesseiro: {
    icon: Layers,
    color: '#6366f1', // Indigo 500
    bgGradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
    borderColor: '#a5b4fc',
    shadowColor: 'rgba(99, 102, 241, 0.18)',
    badgeBg: '#eef2ff',
  },
  azulejista: {
    icon: Grid2x2,
    color: '#059669', // Emerald 600
    bgGradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
    borderColor: '#6ee7b7',
    shadowColor: 'rgba(5, 150, 105, 0.18)',
    badgeBg: '#ecfdf5',
  },
  serralheiro: {
    icon: Settings,
    color: '#475569', // Slate 600
    bgGradient: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    borderColor: '#cbd5e1',
    shadowColor: 'rgba(71, 85, 105, 0.18)',
    badgeBg: '#f8fafc',
  },
};

const DEFAULT_CONFIG: CategoryStyleConfig = {
  icon: Wrench,
  color: '#103569',
  bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
  borderColor: '#bfdbfe',
  shadowColor: 'rgba(16, 53, 105, 0.15)',
  badgeBg: '#f8fafc',
};

export function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();
  const config = CATEGORY_CONFIG[category.slug.toLowerCase()] || DEFAULT_CONFIG;
  const IconComponent = config.icon;

  const handleNavigate = () => {
    router.push(`/buscas?categoria=${encodeURIComponent(category.slug)}`);
  };

  return (
    <article
      onClick={handleNavigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNavigate();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Ver profissionais da categoria ${category.name}`}
      className="group relative bg-white rounded-3xl p-6 md:p-7 flex flex-col items-center text-center border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.10)] transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:border-slate-200 outline-none focus-visible:ring-2 focus-visible:ring-[#103569]"
    >
      {/* Top Icon Badge with gradient and micro-interaction */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 shadow-sm"
        style={{
          background: config.bgGradient,
          border: `1px solid ${config.borderColor}`,
          boxShadow: `0 8px 16px ${config.shadowColor}`,
        }}
      >
        <IconComponent
          size={38}
          strokeWidth={2}
          style={{ color: config.color }}
          className="transition-transform duration-300 group-hover:rotate-3"
        />
      </div>

      {/* Category Info */}
      <div className="w-full flex flex-col items-center">
        <h3 className="text-base md:text-lg font-black text-[#0A1D37] mb-2 uppercase tracking-tight transition-colors group-hover:text-[#103569]">
          {category.name}
        </h3>

        {/* Action Button Label with smooth hover animation */}
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200"
          style={{
            backgroundColor: config.badgeBg,
            color: config.color,
          }}
        >
          <span>Ver profissionais</span>
          <ArrowRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
