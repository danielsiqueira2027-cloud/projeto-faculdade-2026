'use client';

import React from 'react';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star, MapPin, ChevronRight } from 'lucide-react';
import { Professional } from '@/types/professional';

interface ProfessionalCardProps {
  professional: Professional;
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const router = useRouter();

  const handleNavigate = () => {
    // Redireciona para o perfil (futuro)
    router.push(`/profissional/${professional.id}`);
  };

  return (
    <article 
      onClick={handleNavigate}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_5px_rgba(0,0,0,0.07)] hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col sm:flex-row group border border-transparent hover:border-brand-accent/20"
    >
      {/* Avatar Wrap */}
      <div className="relative w-full sm:w-40 h-48 sm:h-auto bg-gray-100 shrink-0 overflow-hidden">
        {/* Placeholder if image fails, using a nice gradient/icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-brand-accent/5 to-brand-accent/20">
          <span className="text-brand-accent/40 font-bold text-4xl">
            {professional.name.charAt(0)}
          </span>
        </div>
        {/* Real Image (commented out as public images might not exist yet) */}
        {/* <Image 
          src={professional.avatarUrl} 
          alt={professional.name} 
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        /> */}
      </div>

      <div className="p-5 flex flex-col justify-between grow">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-brand-text uppercase group-hover:text-brand-accent transition-colors">
              {professional.name}
            </h3>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-bold text-yellow-700">{professional.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-sm font-semibold text-brand-accent mb-3 tracking-wide">
            {professional.role}
          </p>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{professional.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs italic">
              <span>A {professional.distance} km de você</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end text-brand-accent font-bold text-sm group-hover:translate-x-1 transition-transform">
          Ver perfil
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </article>
  );
}
