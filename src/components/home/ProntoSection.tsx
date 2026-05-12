'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Estatistica {
  valor: string;
  label: string;
}

const estatisticas: Estatistica[] = [
  { valor: '+5.000', label: 'Profissionais ativos' },
  { valor: '+12.000', label: 'Serviços realizados' },
  { valor: '4.8★', label: 'Avaliação média' },
];

export function ProntoSection() {
  return (
    <section
      className="w-full"
      style={{ padding: '70px 20px', backgroundColor: '#103569' }}
    >
      <div
        className="flex flex-wrap items-center justify-center"
        style={{ maxWidth: 1100, margin: '0 auto', gap: 60 }}
      >
        {/* Imagem */}
        <div style={{ flex: '1 1 340px', maxWidth: 460 }}>
          <Image
            src="/imgs/geral_index/furadeira.png"
            alt="Profissional com furadeira"
            width={460}
            height={380}
            className="w-full h-auto object-contain"
            style={{
              borderRadius: 16,
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
            }}
          />
        </div>

        {/* Conteúdo */}
        <div style={{ flex: '1 1 340px', maxWidth: 480 }}>
          <span
            style={{
              display: 'inline-block',
              background: '#fddfa2',
              color: '#0b2545',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '4px 14px',
              borderRadius: 20,
              marginBottom: 16,
            }}
          >
            Encontre agora
          </span>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.25,
              marginBottom: 16,
            }}
          >
            Pronto para encontrar o profissional ideal?
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 32 }}>
            Conectamos você aos melhores profissionais da sua região,
            com avaliações reais e pagamento seguro.
          </p>

          {/* Estatísticas */}
          <div className="flex flex-wrap" style={{ gap: 24, marginBottom: 36 }}>
            {estatisticas.map((e) => (
              <div key={e.label}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fddfa2' }}>
                  {e.valor}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>
                  {e.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap" style={{ gap: 12 }}>
            <Link href="/categorias">
              <button
                className="cursor-pointer transition-all"
                style={{
                  background: '#fddfa2',
                  color: '#0b2545',
                  border: 'none',
                  padding: '13px 28px',
                  borderRadius: 8,
                  fontSize: '1rem',
                  fontWeight: 700,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5d080';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fddfa2';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Escolher categoria
              </button>
            </Link>
            <Link href="/buscas">
              <button
                className="cursor-pointer transition-all"
                style={{
                  background: 'transparent',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.4)',
                  padding: '13px 28px',
                  borderRadius: 8,
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Buscar profissional
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
