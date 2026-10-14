'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

const slides = [
  { src: '/imgs/banners/banner1.png', alt: 'ClickServiço - Profissionais de alta qualidade a um clique de você' },
  { src: '/imgs/banners/banner2.png', alt: 'ClickServiço - Sua vida mais fácil, encontre seu profissional ideal em segundos' },
  { src: '/imgs/banners/banner3.png', alt: 'ClickServiço - Conectando você aos melhores profissionais' },
];

export function Carousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const showSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const prev = useCallback(() => {
    setCurrent((curr) => (curr - 1 + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => {
    setCurrent((curr) => (curr + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#fddfa2] select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Carrossel de novidades"
    >
      {/* Slides */}
      <div
        className="flex"
        style={{ transition: 'transform 0.8s ease-in-out', transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={slide.src} 
            className="relative shrink-0 w-full h-[140px] xs:h-[180px] sm:h-[240px] md:h-[300px] lg:h-[350px] bg-[#fddfa2] flex items-center justify-center"
          >
            <Image 
              src={slide.src} 
              alt={slide.alt} 
              fill 
              className="object-contain" 
              priority={index === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
            />
          </div>
        ))}
      </div>

      {/* Botão Anterior */}
      <button
        type="button"
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white/85 hover:bg-white text-[#2a7be4] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-none active:scale-95 text-base sm:text-xl font-bold backdrop-blur-xs"
      >
        &#10094;
      </button>

      {/* Botão Próximo */}
      <button
        type="button"
        onClick={next}
        aria-label="Próximo slide"
        className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white/85 hover:bg-white text-[#2a7be4] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-none active:scale-95 text-base sm:text-xl font-bold backdrop-blur-xs"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute flex gap-1.5 sm:gap-2 bottom-2 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-20">
        {slides.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => showSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className="min-h-[24px] min-w-[24px] flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === current ? 18 : 7,
                height: 7,
                backgroundColor: i === current ? '#103569' : 'rgba(16, 53, 105, 0.35)',
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

