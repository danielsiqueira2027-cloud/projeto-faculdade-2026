'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { PortfolioItem } from '@/types';

interface PortfolioGridProps {
  items: PortfolioItem[];
}

export function PortfolioGrid({ items }: PortfolioGridProps) {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-bp-on-surface font-manrope">
            Galeria de Portfólio
          </h2>
          <p className="text-lg text-bp-on-surface/60 font-work-sans">
            Obras estruturais e construções residenciais selecionadas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="group relative rounded-[2rem] overflow-hidden bg-bp-surface-low shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-4/5 overflow-hidden">
              <Image 
                src={item.imageUrl} 
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-bp-on-surface/90 via-bp-on-surface/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-bp-secondary uppercase tracking-[0.2em]">
                    {item.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white font-manrope leading-tight">
                    {item.title}
                  </h3>
                </div>
                
                <div className="flex items-center justify-between pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <span className="text-sm font-medium text-white/60 italic">
                    Finalizado em {item.year}
                  </span>
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
