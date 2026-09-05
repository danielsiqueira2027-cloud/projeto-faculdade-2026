'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

/* ── Tipos ───────────────────────────────────────────────── */

interface CTAProps {
  /** 'hero'  → botão grande no banner superior
   *  'card'  → botão dentro do card de conversão
   */
  variant: 'hero' | 'card';
}

/* ── Componente ──────────────────────────────────────────── */

export function SejaProCTA({ variant }: CTAProps) {
  const router = useRouter();
  const isHero = variant === 'hero';

  const handleCadastro = () => {
    router.push('/seja-profissional/ativar');
  };

  const label = isHero ? 'Quero me cadastrar agora' : 'Criar conta de profissional';

  /* ── Estilos base compartilhados ─────────────── */
  const baseStyle: React.CSSProperties = {
    border: 'none',
    borderRadius: 8,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'transform 0.2s, background 0.2s, opacity 0.2s',
    opacity: 1,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
  };

  const heroStyle: React.CSSProperties = {
    ...baseStyle,
    background: '#fddfa2',
    color: '#0b2545',
    padding: '14px 32px',
    fontSize: '1.05rem',
  };

  const cardStyle: React.CSSProperties = {
    ...baseStyle,
    background: '#fddfa2',
    color: '#0b2545',
    padding: '14px 28px',
    fontSize: '1rem',
    width: '100%',
    justifyContent: 'center',
  };

  return (
    <button
      id="btnCadastroProfissional"
      style={isHero ? heroStyle : cardStyle}
      onClick={handleCadastro}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.background = '#f5d080';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.background = '#fddfa2';
      }}
    >
      {label}
    </button>
  );
}
