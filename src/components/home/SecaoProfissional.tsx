'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Beneficio {
  icone: string;
  texto: string;
}

const beneficios: Beneficio[] = [
  { icone: '👁️', texto: 'Visibilidade para clientes na sua região' },
  { icone: '💰', texto: 'Aumento real nas oportunidades de renda' },
  { icone: '📅', texto: 'Gestão de agenda e serviços pelo app' },
  { icone: '🔒', texto: 'Credibilidade com pagamentos seguros' },
  { icone: '⭐', texto: 'Construa sua reputação com avaliações reais' },
];

export function SecaoProfissional() {
  return (
    <section className="w-full" style={{ padding: '70px 20px', backgroundColor: '#ebebeb' }}>
      <div
        className="flex flex-wrap items-center"
        style={{ maxWidth: 1100, margin: '0 auto', gap: 60 }}
      >
        {/* Imagem */}
        <div style={{ flex: '1 1 340px', maxWidth: 480 }}>
          <Image
            src="/imgs/geral_index/acordo.png"
            alt="Acordo entre profissional e cliente"
            width={480}
            height={380}
            className="w-full h-auto"
            style={{ borderRadius: 16, objectFit: 'cover', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
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
            Para profissionais
          </span>

          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2rem)',
              fontWeight: 700,
              color: '#0A1A2F',
              lineHeight: 1.3,
              marginBottom: 12,
            }}
          >
            Quer se tornar um profissional ClickServiço?
          </h2>

          <p style={{ color: '#555', fontSize: '0.97rem', lineHeight: 1.65, marginBottom: 28 }}>
            Cadastre-se gratuitamente e comece a receber clientes de elétrica,
            hidráulica, construção e muito mais na sua região.
          </p>

          {/* Benefícios */}
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
            {beneficios.map((b) => (
              <li
                key={b.texto}
                className="flex items-center"
                style={{ gap: 12, marginBottom: 12 }}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: '#f0f5ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    flexShrink: 0,
                  }}
                >
                  {b.icone}
                </span>
                <span style={{ fontSize: '0.95rem', color: '#333' }}>{b.texto}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link href="/seja-profissional">
            <button
              className="cursor-pointer transition-all"
              style={{
                background: '#103569',
                color: '#fff',
                border: 'none',
                padding: '13px 28px',
                borderRadius: 8,
                fontSize: '1rem',
                fontWeight: 700,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0b2545';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#103569';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Quero ser profissional →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
