'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const slides = [
  { src: '/imgs/banners/banner1.png', alt: 'Banner 1' },
  { src: '/imgs/banners/banner2.png', alt: 'Banner 2' },
  { src: '/imgs/banners/banner3.png', alt: 'Banner 3' },
];

export function Carousel() {
  const [current, setCurrent] = useState(0);

  const showSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const prev = () => {
    const idx = (current - 1 + slides.length) % slides.length;
    showSlide(idx);
  };

  const next = useCallback(() => {
    const idx = (current + 1) % slides.length;
    showSlide(idx);
  }, [current, showSlide]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden" style={{ maxHeight: 350 }}>
      {/* Slides */}
      <div
        className="flex"
        style={{ transition: 'transform 0.8s ease-in-out', transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.src} className="relative shrink-0 w-full" style={{ height: 350 }}>
            <Image src={slide.src} alt={slide.alt} fill className="object-cover" priority />
          </div>
        ))}
      </div>

      {/* Botão Anterior */}
      <button
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute flex items-center justify-center transition-opacity hover:opacity-100"
        style={{
          top: '50%', left: 0, transform: 'translateY(-50%)',
          width: 50, height: 50, border: 'none',
          background: 'white', borderRadius: '0 50px 50px 0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
          fontSize: 28, color: '#2a7be4', cursor: 'pointer', opacity: 0.92, zIndex: 20,
        }}
      >
        &#10094;
      </button>

      {/* Botão Próximo */}
      <button
        onClick={next}
        aria-label="Próximo slide"
        className="absolute flex items-center justify-center transition-opacity hover:opacity-100"
        style={{
          top: '50%', right: 0, transform: 'translateY(-50%)',
          width: 50, height: 50, border: 'none',
          background: 'white', borderRadius: '50px 0 0 50px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
          fontSize: 28, color: '#2a7be4', cursor: 'pointer', opacity: 0.92, zIndex: 20,
        }}
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute flex gap-2" style={{ bottom: 15, left: '50%', transform: 'translateX(-50%)' }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => showSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: 9, height: 9, border: 'none', cursor: 'pointer',
              backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.6)',
              transform: i === current ? 'scale(1.2)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
