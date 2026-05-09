'use client';

import React from 'react';
import Link from 'next/link';
import { Professional, PROFESSIONALS_MOCK } from '@/types/professional';

/* ── Subcomponente: StarRating ───────────────────────────── */

function StarRating({ nota }: { nota: number }) {
  const cheias = Math.floor(nota);
  return (
    <div className="flex items-center" style={{ gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ fontSize: '0.85rem', color: s <= cheias ? '#f59e0b' : '#d1d5db' }}>
          ★
        </span>
      ))}
      <span style={{ fontSize: '0.8rem', color: '#666', marginLeft: 4 }}>{nota.toFixed(1)}</span>
    </div>
  );
}

/* ── Subcomponente: ProfissionalCard ─────────────────────── */

function ProfissionalCard({ pro }: { pro: Professional }) {
  return (
    <Link
      href={`/perfil/${pro.id}`}
      style={{ textDecoration: 'none' }}
      aria-label={`Ver perfil de ${pro.name}, ${pro.role}`}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 14,
          padding: '22px 20px',
          boxShadow: '0 3px 12px rgba(0,0,0,0.07)',
          border: '1px solid transparent',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = 'translateY(-4px)';
          el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
          el.style.borderColor = '#103569';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = 'translateY(0)';
          el.style.boxShadow = '0 3px 12px rgba(0,0,0,0.07)';
          el.style.borderColor = 'transparent';
        }}
      >
        {/* Topo: avatar + info principal */}
        <div className="flex items-center" style={{ gap: 14 }}>
          {/* Avatar com inicial */}
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #103569, #1a4a8a)',
              color: '#fddfa2',
              fontWeight: 700,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {pro.name.charAt(0)}
          </div>

          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: '0.95rem',
                color: '#0A1A2F',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {pro.name}
            </div>
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#103569',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {pro.role}
            </div>
          </div>
        </div>

        {/* Avaliação */}
        <StarRating nota={pro.rating} />

        {/* Divisor */}
        <hr style={{ border: 0, borderTop: '1px solid #f0f0f0', margin: 0 }} />

        {/* Rodapé: distância + localização */}
        <div className="flex items-center justify-between">
          <span style={{ fontSize: '0.82rem', color: '#666' }}>
            📍 {pro.location.split(' - ')[0]}
          </span>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              background: '#f0f5ff',
              color: '#103569',
              padding: '3px 10px',
              borderRadius: 20,
            }}
          >
            {pro.distance} km
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Componente principal ────────────────────────────────── */

const DESTAQUE_IDS = ['1', '2', '3', '4'];

export function ProfissionaisDestaque() {
  const destaques = PROFESSIONALS_MOCK.filter((p) => DESTAQUE_IDS.includes(p.id));

  return (
    <section className="w-full" style={{ padding: '70px 20px', backgroundColor: '#ebebeb' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Cabeçalho */}
        <div
          className="flex flex-wrap items-end justify-between"
          style={{ marginBottom: 36, gap: 16 }}
        >
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
              Bem avaliados
            </span>
            <h2
              style={{ fontSize: 'clamp(1.5rem, 3vw, 1.9rem)', fontWeight: 700, color: '#0A1A2F' }}
            >
              Profissionais em destaque
            </h2>
          </div>
          <Link
            href="/busca"
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

        {/* Grid de cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: 20,
          }}
        >
          {destaques.map((pro) => (
            <ProfissionalCard key={pro.id} pro={pro} />
          ))}
        </div>
      </div>
    </section>
  );
}
