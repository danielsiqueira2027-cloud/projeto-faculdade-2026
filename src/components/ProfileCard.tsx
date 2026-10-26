import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Professional } from '@/types';
import { Star, MapPin, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfessionalAvatar } from '@/components/ProfessionalAvatar';

interface ProfileCardProps {
  professional: Professional;
  isOwnProfile?: boolean;
}

export function ProfileCard({ professional, isOwnProfile = false }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-bp-primary/5 border border-bp-outline-variant overflow-hidden">
      {/* Banner / Capa */}
      <div className="h-48 bg-bp-primary relative overflow-hidden">
        {professional.bannerUrl ? (
          <Image
            src={professional.bannerUrl}
            alt="Capa do perfil"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        )}
      </div>
      
      <div className="px-5 sm:px-8 pb-8">
        {/* Top row: Avatar (overlapping banner) & Action Button (in white area) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 mb-6">
          <div className="relative -mt-20 w-fit shrink-0">
            <ProfessionalAvatar 
              src={professional.avatar || professional.avatarUrl} 
              name={professional.name}
              size={148}
              roundedClassName="rounded-[2rem]"
              className="border-8 border-white shadow-xl bg-white"
              priority
            />
            {professional.isVerified && (
              <div className="absolute -bottom-2 -right-2 bg-bp-secondary-container p-2 rounded-xl border-4 border-white shadow-lg text-bp-on-secondary-container" title="Profissional verificado">
                <CheckCircle2 size={22} />
              </div>
            )}
          </div>

          {/* Action button — fully inside the white card area */}
          <div className="w-full md:w-auto shrink-0 pb-1">
            {isOwnProfile ? (
              <Link href="/dashboard/profissional/perfil" className="block w-full md:w-auto">
                <Button 
                  size="lg" 
                  className="w-full md:w-auto min-h-[48px] md:h-14 bg-[#f7941d] hover:bg-[#f7941d]/90 active:bg-[#f7941d]/95 text-white rounded-2xl px-8 shadow-lg font-bold transition-all duration-200 focus-visible:ring-4 focus-visible:ring-[#f7941d]/20 focus-visible:outline-none"
                >
                  Editar meu perfil
                </Button>
              </Link>
            ) : (
              <Link href={`/orcamento?profId=${professional.id}`} className="block w-full md:w-auto">
                <Button 
                  size="lg" 
                  className="w-full md:w-auto min-h-[48px] md:h-14 bg-bp-primary hover:bg-bp-primary/90 active:bg-bp-primary/95 text-white rounded-2xl px-8 shadow-lg font-bold transition-all duration-200 focus-visible:ring-4 focus-visible:ring-bp-primary/20 focus-visible:outline-none"
                >
                  Solicitar Orçamento
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Name, rating and categories — always below the cover, never overlapping */}
        <div className="mb-6 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 mb-3">
            <h1 className="text-4xl font-black text-bp-primary tracking-tight leading-tight">{professional.name}</h1>
            <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold shrink-0">
              <Star size={16} className="fill-yellow-400" />
              {professional.rating} ({professional.reviewCount} avaliações)
            </div>
          </div>
          
          {professional.categories && professional.categories.length > 0 && (
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
              {professional.categories.map((cat, i) => (
                <span 
                  key={i} 
                  className="bg-bp-primary/10 text-bp-primary px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-bp-on-surface/60 font-semibold">
            {professional.specialty && (
              <span className="flex items-center gap-1.5"><Briefcase size={18} className="text-bp-primary" /> {professional.specialty}</span>
            )}
            <span className="flex items-center gap-1.5"><MapPin size={18} className="text-bp-primary" /> {professional.location || 'Grande São Paulo'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-bp-outline-variant">
          {professional.certifications.map((cert, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-bp-surface-low border border-bp-outline-variant/50">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-bp-primary shadow-sm">
                <Award size={20} />
              </div>
              <span className="font-bold text-bp-on-surface text-sm">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
