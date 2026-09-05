import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Professional } from '@/types';
import { Star, MapPin, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileCardProps {
  professional: Professional;
}

export function ProfileCard({ professional }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-bp-primary/5 border border-bp-outline-variant overflow-hidden">
      <div className="h-48 bg-bp-primary relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>
      
      <div className="px-8 pb-8">
        {/* Avatar row — only the avatar overlaps the cover */}
        <div className="relative -mt-20 mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="relative w-fit">
            <Image 
              src={professional.avatar} 
              alt={professional.name}
              width={148}
              height={148}
              className="rounded-[2rem] object-cover border-8 border-white shadow-xl bg-white"
            />
            <div className="absolute -bottom-2 -right-2 bg-bp-secondary-container p-2 rounded-xl border-4 border-white shadow-lg text-bp-on-secondary-container">
              <CheckCircle2 size={22} />
            </div>
          </div>

          {/* Action buttons — aligned to bottom of avatar on desktop */}
          <div className="flex gap-4 pb-2">
            <Link href={`/orcamento?profId=${professional.id}`}>
              <Button size="lg" className="bg-bp-primary hover:bg-bp-primary/90 text-white rounded-2xl px-8 h-14 shadow-lg font-bold">
                Solicitar Orçamento
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-bp-primary text-bp-primary rounded-2xl px-8 h-14 font-bold hover:bg-bp-primary/5">
              Enviar Mensagem
            </Button>
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
            <span className="flex items-center gap-1.5"><Briefcase size={18} className="text-bp-primary" /> {professional.specialty}</span>
            <span className="flex items-center gap-1.5"><MapPin size={18} className="text-bp-primary" /> Grande São Paulo</span>
            <span className="flex items-center gap-1.5"><Award size={18} className="text-bp-primary" /> {professional.yearsOfExperience} anos exp.</span>
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
