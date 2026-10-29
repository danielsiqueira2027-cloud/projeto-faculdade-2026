'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPin, Image as ImageIcon } from 'lucide-react';
import { ProfessionalAvatar } from '@/components/ProfessionalAvatar';
import { FeaturedServiceDto } from '@/app/actions/services';
import { formatPrice, isNextImageAllowed } from '@/lib/service-format';

interface FeaturedServicesCarouselProps {
  services: FeaturedServiceDto[];
}

export function FeaturedServicesCarousel({ services }: FeaturedServicesCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, services]);

  if (!services || services.length === 0) {
    return null;
  }

  const handleScroll = (direction: 'prev' | 'next') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.75, 280);
    el.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      role="region"
      aria-label="Serviços em destaque"
      className="w-full"
      style={{ padding: '70px 20px', backgroundColor: '#ffffff' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Cabeçalho */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span
              style={{
                display: 'inline-block',
                background: '#103569',
                color: '#fddfa2',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '4px 14px',
                borderRadius: 20,
                marginBottom: 10,
              }}
            >
              Serviços em destaque
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 1.9rem)',
                fontWeight: 700,
                color: '#0A1A2F',
              }}
            >
              Serviços para o seu projeto
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Botões do carrossel (desktop/tablet) */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll('prev')}
                disabled={!canScrollLeft}
                aria-label="Serviço anterior"
                className={`w-10 h-10 rounded-full border border-slate-200 bg-white text-[#103569] flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'hover:bg-[#103569] hover:text-white hover:border-[#103569] cursor-pointer shadow-sm active:scale-95'
                    : 'opacity-30 cursor-not-allowed pointer-events-none'
                } focus-visible:ring-2 focus-visible:ring-[#103569] focus-visible:outline-none`}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('next')}
                disabled={!canScrollRight}
                aria-label="Próximo serviço"
                className={`w-10 h-10 rounded-full border border-slate-200 bg-white text-[#103569] flex items-center justify-center transition-all ${
                  canScrollRight
                    ? 'hover:bg-[#103569] hover:text-white hover:border-[#103569] cursor-pointer shadow-sm active:scale-95'
                    : 'opacity-30 cursor-not-allowed pointer-events-none'
                } focus-visible:ring-2 focus-visible:ring-[#103569] focus-visible:outline-none`}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <Link
              href="/buscas"
              style={{
                color: '#103569',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                borderBottom: '1px solid #103569',
                paddingBottom: 2,
              }}
            >
              Ver todos →
            </Link>
          </div>
        </div>

        {/* Carrossel horizontal */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-1 -mx-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {services.map((service) => {
            const locationText =
              service.city && service.state
                ? `${service.city} - ${service.state}`
                : service.city || service.state || null;

            return (
              <div
                key={service.id}
                className="w-[280px] sm:w-[300px] md:w-[320px] shrink-0 snap-start flex flex-col"
              >
                <Link
                  href={`/perfil-profissional?id=${service.professional.id}`}
                  className="flex flex-col h-full bg-white rounded-3xl border border-slate-200/90 shadow-[0_3px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-200 overflow-hidden group no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#103569]"
                  aria-label={`Serviço: ${service.title} por ${service.professional.name}`}
                >
                  {/* Capa do serviço */}
                  <div className="aspect-video bg-slate-100 relative overflow-hidden shrink-0">
                    {service.imageUrl ? (
                      isNextImageAllowed(service.imageUrl) ? (
                        <Image
                          src={service.imageUrl}
                          alt={service.title}
                          fill
                          sizes="(max-width: 640px) 280px, 320px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={service.imageUrl}
                          alt={service.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 bg-slate-50">
                        <ImageIcon size={32} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                          Sem foto
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[#103569]/5 group-hover:bg-transparent transition-colors pointer-events-none" />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black text-[#103569] uppercase tracking-wider shadow-sm z-10">
                      {service.categoryName}
                    </div>
                  </div>

                  {/* Corpo do card */}
                  <div className="p-5 flex flex-col flex-1 min-w-0">
                    <h3
                      className="text-base font-bold text-[#103569] leading-snug mb-1.5 line-clamp-2 min-w-0"
                      title={service.title}
                    >
                      {service.title}
                    </h3>

                    {service.description ? (
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3 min-w-0">
                        {service.description}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 italic mb-3 min-w-0">
                        Sem descrição detalhada.
                      </p>
                    )}

                    {locationText && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-3 min-w-0">
                        <MapPin size={13} className="text-slate-400 shrink-0" />
                        <span className="truncate min-w-0" title={locationText}>
                          {locationText}
                        </span>
                      </div>
                    )}

                    {/* Mini-linha do profissional */}
                    <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100 mb-3 min-w-0">
                      <ProfessionalAvatar
                        src={service.professional.avatarUrl}
                        name={service.professional.name}
                        size={28}
                        className="shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">
                          Profissional
                        </span>
                        <span
                          className="text-xs font-bold text-[#0A1A2F] truncate block min-w-0"
                          title={service.professional.name}
                        >
                          {service.professional.name}
                        </span>
                      </div>
                    </div>

                    {/* Rodapé: Preço e link */}
                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between min-w-0">
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block leading-tight">
                          Preço
                        </span>
                        <span className="text-base font-black text-[#f7941d] truncate block">
                          {formatPrice(service.priceText, service.priceValue)}
                        </span>
                      </div>

                      <span className="text-xs font-bold text-[#103569] group-hover:text-[#f7941d] transition-colors shrink-0 ml-2">
                        Ver perfil →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

