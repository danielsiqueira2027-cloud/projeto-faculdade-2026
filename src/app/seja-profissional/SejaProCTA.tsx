'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

/* ── Tipos ───────────────────────────────────────────────── */

interface CTAProps {
  /** 'hero'  → botão grande no banner superior
   *  'card'  → botão dentro do card de conversão
   */
  variant: 'hero' | 'card';
}

type CadastroStatus = 'idle' | 'loading' | 'success' | 'error';

/* ── Serviço fictício (pronto para integração) ───────────── */

async function iniciarCadastroProfissional(): Promise<{ ok: boolean }> {
  /**
   * TODO: substituir pelo endpoint real quando o backend estiver pronto.
   * Exemplo:
   *   const res = await fetch('/api/profissionais/cadastro', { method: 'POST' });
   *   return res.json();
   */
  return new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 900));
}

/* ── Componente ──────────────────────────────────────────── */

export function SejaProCTA({ variant }: CTAProps) {
  const router = useRouter();
  const [status, setStatus] = useState<CadastroStatus>('idle');

  const isHero = variant === 'hero';

  const handleCadastro = async (): Promise<void> => {
    if (status === 'loading') return;

    setStatus('loading');
    console.log('[SejaProCTA] Iniciando fluxo de cadastro de profissional…');

    try {
      const result = await iniciarCadastroProfissional();

      if (result.ok) {
        setStatus('success');
        console.log('[SejaProCTA] Cadastro iniciado com sucesso. Redirecionando…');

        /**
         * TODO: quando a rota /cadastro/profissional existir, ativar:
         *   router.push('/cadastro/profissional');
         */
        router.push('/');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('[SejaProCTA] Erro ao iniciar cadastro:', err);
      setStatus('error');
    }
  };

  /* ── Textos dinâmicos por estado ────────────── */
  const label: Record<CadastroStatus, string> = {
    idle:    isHero ? 'Quero me cadastrar agora' : 'Criar conta de profissional',
    loading: 'Aguarde…',
    success: 'Redirecionando…',
    error:   'Tente novamente',
  };

  const isDisabled = status === 'loading' || status === 'success';

  /* ── Estilos base compartilhados ─────────────── */
  const baseStyle: React.CSSProperties = {
    border: 'none',
    borderRadius: 8,
    fontWeight: 700,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'transform 0.2s, background 0.2s, opacity 0.2s',
    opacity: isDisabled ? 0.75 : 1,
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
    <>
      <button
        id="btnCadastroProfissional"
        style={isHero ? heroStyle : cardStyle}
        onClick={handleCadastro}
        disabled={isDisabled}
        aria-busy={status === 'loading'}
        onMouseEnter={(e) => {
          if (!isDisabled) {
            e.currentTarget.style.transform = 'scale(1.03)';
            e.currentTarget.style.background = '#f5d080';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.background = '#fddfa2';
        }}
      >
        {status === 'loading' && (
          <span
            aria-hidden="true"
            style={{
              width: 16,
              height: 16,
              border: '2px solid #0b2545',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'spin-slow 0.7s linear infinite',
            }}
          />
        )}
        {label[status]}
      </button>

      {status === 'error' && (
        <p
          role="alert"
          style={{
            marginTop: 8,
            color: '#b30000',
            fontSize: '0.85rem',
            fontWeight: 500,
          }}
        >
          Ocorreu um erro. Por favor, tente novamente.
        </p>
      )}
    </>
  );
}
