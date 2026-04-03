'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Download, ShieldCheck, MapPin } from 'lucide-react';
import { BlueprintButton } from '@/components/ui/BlueprintButton';
import { BlueprintBadge } from '@/components/ui/BlueprintBadge';
import { Professional } from '@/types';

interface ProfileCardProps {
  professional: Professional;
}

export function ProfileCard({ professional }: ProfileCardProps) {
  return (
    <div className="bg-bp-surface rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_120px_-20px_rgba(0,50,125,0.08)] relative overflow-hidden">
      {/* Decorative Blueprint Lines */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-bp-primary">
          <path d="M0,0 L100,100 M20,0 L100,80 M0,20 L80,100" stroke="currentColor" strokeWidth="0.1" />
        </svg>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start relative z-10">
        {/* Avatar Section */}
        <div className="relative group shrink-0">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-2xl relative">
            <Image 
              src={professional.avatar} 
              alt={professional.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Rating Badge Overlay */}
            <div className="absolute bottom-4 left-4 bg-bp-surface-lowest px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg border border-bp-outline-variant/10">
              <Star className="w-4 h-4 text-bp-secondary fill-bp-secondary" />
              <span className="text-sm font-bold text-bp-on-surface">{professional.rating}</span>
            </div>
          </div>
          
          {/* Status Glow */}
          <div className="absolute -inset-1 bg-linear-to-br from-bp-primary/20 to-transparent blur-2xl opacity-40 -z-10 group-hover:opacity-60 transition-opacity" />
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <BlueprintBadge className="bg-bp-primary/5 border-bp-primary/10 text-bp-primary">
                {professional.specialty}
              </BlueprintBadge>
              {professional.certifications.map((cert) => (
                <BlueprintBadge key={cert} className="bg-bp-surface-lowest border-bp-outline-variant/20 italic">
                  {cert}
                </BlueprintBadge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-bp-on-surface font-manrope tracking-tight leading-tight">
              {professional.name}
            </h1>
          </div>

          <p className="text-lg md:text-xl text-bp-on-surface/70 font-work-sans leading-relaxed max-w-2xl">
            {professional.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-bp-on-surface/60">
              <ShieldCheck className="w-5 h-5 text-bp-primary" />
              <span className="text-sm font-medium">Profissional Verificado</span>
            </div>
            <div className="flex items-center gap-2 text-bp-on-surface/60">
              <MapPin className="w-5 h-5 text-bp-primary" />
              <span className="text-sm font-medium">São Paulo, SP</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-8">
            <BlueprintButton size="lg" className="rounded-2xl px-12">
              Solicitar Orçamento
            </BlueprintButton>
            <BlueprintButton variant="ghost" className="gap-2 group">
              <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="font-semibold">Baixar CV</span>
            </BlueprintButton>
          </div>
        </div>

        {/* Stats Section */}
        <div className="lg:w-48 flex flex-col items-center justify-center p-8 rounded-3xl bg-bp-surface-lowest shadow-xl border border-bp-outline-variant/10 hover:shadow-2xl transition-all duration-500">
           <div className="w-24 h-24 rounded-full border-4 border-bp-secondary/20 flex items-center justify-center relative mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-bp-secondary border-t-transparent animate-spin-slow" />
              <span className="text-3xl font-bold text-bp-secondary font-manrope">
                {professional.yearsOfExperience}+
              </span>
           </div>
           <p className="text-center text-sm font-bold text-bp-on-surface uppercase tracking-widest leading-tight">
              Anos de<br />Ofício
           </p>
        </div>
      </div>
    </div>
  );
}
