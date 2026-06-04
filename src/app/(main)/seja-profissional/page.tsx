import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { SejaProCTA } from './SejaProCTA';

export const metadata: Metadata = {
  title: 'Seja um Profissional — ClickServiço',
  description:
    'Cadastre-se como profissional no ClickServiço e comece a receber clientes na sua região. Elétrica, hidráulica, construção e muito mais.',
};

/* ── Dados estáticos ─────────────────────────────────────── */

const beneficios = [
  { icone: '👁️', titulo: 'Visibilidade local',      desc: 'Seja encontrado por clientes na sua cidade e bairro, todos os dias.' },
  { icone: '💰', titulo: 'Mais renda',               desc: 'Aumente seus ganhos recebendo novos pedidos de serviço regularmente.' },
  { icone: '📍', titulo: 'Perto de você',            desc: 'Atenda clientes próximos e economize tempo e deslocamento.' },
  { icone: '🔒', titulo: 'Pagamentos seguros',       desc: 'Receba pelo serviço sem preocupações — tudo dentro da plataforma.' },
  { icone: '📅', titulo: 'Agenda inteligente',       desc: 'Organize seus horários e aceite apenas o que couber na sua rotina.' },
  { icone: '📱', titulo: 'Gestão no celular',        desc: 'Controle pedidos, avaliações e histórico diretamente pelo app.' },
];

const passos = [
  { num: '01', titulo: 'Crie sua conta',        desc: 'Preencha seu perfil com suas especialidades e região de atendimento.' },
  { num: '02', titulo: 'Valide seus dados',     desc: 'Envie seus documentos para garantir a segurança da plataforma.' },
  { num: '03', titulo: 'Receba pedidos',        desc: 'Clientes próximos vão te encontrar e solicitar seus serviços.' },
  { num: '04', titulo: 'Execute e seja avaliado', desc: 'Conclua o serviço e construa sua reputação com avaliações reais.' },
];

const requisitos = [
  'Ser maior de 18 anos',
  'Ter habilidade comprovada na área de atuação',
  'Documentos pessoais (RG e CPF)',
  'Comprovante de residência',
  'Foto de perfil profissional',
];

/* ── Page ────────────────────────────────────────────────── */

export default function SejaProPage() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 1300,
        margin: '90px auto',
        padding: '0 20px',
      }}
    >
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0b2545 0%, #103569 60%, #1a4a8a 100%)',
          borderRadius: 14,
          padding: '60px 40px',
          textAlign: 'center',
          marginBottom: 30,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Detalhe decorativo */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'rgba(253,223,162,0.08)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: -40,
            left: -40,
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: 'rgba(253,223,162,0.06)',
          }}
        />

        <span
          style={{
            display: 'inline-block',
            background: '#fddfa2',
            color: '#0b2545',
            fontWeight: 700,
            fontSize: '0.8rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '4px 14px',
            borderRadius: 20,
            marginBottom: 18,
          }}
        >
          Para profissionais
        </span>

        <h1
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          Transforme sua habilidade em<br />
          <span style={{ color: '#fddfa2' }}>renda de verdade</span>
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', maxWidth: 560, margin: '0 auto 32px' }}>
          Cadastre-se no ClickServiço e comece a receber clientes de
          elétrica, hidráulica, construção e manutenção residencial
          na sua região — sem taxa de cadastro.
        </p>

        <SejaProCTA variant="hero" />
      </section>

      {/* ── BENEFÍCIOS ────────────────────────────────────── */}
      <section
        style={{
          background: '#fff',
          borderRadius: 14,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          marginBottom: 30,
          overflow: 'hidden',
        }}
      >
        {/* Imagem integrada ao card */}
        <div style={{ position: 'relative', width: '100%', height: 'auto', maxHeight: '350px', overflow: 'hidden' }}>
          <Image
            src="/imgs/profissionais/trabalhadores.png"
            alt="Profissionais trabalhando"
            width={1200}
            height={350}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Overlay suave para transição */}
          <div 
            style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              height: '60px', 
              background: 'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))' 
            }} 
          />
        </div>

        <div className="pro-section-padding" style={{ padding: '20px 40px 50px' }}>
          <h2
            style={{
              textAlign: 'center',
              fontSize: 28,
              fontWeight: 700,
              color: '#0A1A2F',
              marginBottom: 8,
            }}
          >
            Por que ser um profissional ClickServiço?
          </h2>
          <p style={{ textAlign: 'center', color: '#555', marginBottom: 36, fontSize: '1rem' }}>
            Vantagens reais para quem trabalha com serviços domésticos
          </p>

          <div className="benefits-pro-grid">
            {beneficios.map((b) => (
              <div key={b.titulo} className="benefit-pro-card">
                <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>{b.icone}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0A1A2F', marginBottom: 6 }}>
                  {b.titulo}
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#555', lineHeight: 1.55 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ─────────────────────────────────── */}
      <section
        className="pro-section-padding"
        style={{
          background: '#FFF7D6',
          padding: '40px 40px 50px',
          borderRadius: 14,
          marginBottom: 30,
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: 28,
            fontWeight: 700,
            color: '#0A1A2F',
            marginBottom: 8,
          }}
        >
          Como funciona
        </h2>
        <p style={{ textAlign: 'center', color: '#5a4a00', marginBottom: 40, fontSize: '1rem' }}>
          Em 4 passos simples você já está atendendo clientes
        </p>

        <div className="steps-pro-grid">
          {passos.map((p, i) => (
            <div key={p.num} className="step-pro-card">
              {/* Linha conectora (exceto no último) */}
              {i < passos.length - 1 && (
                <div aria-hidden="true" className="step-connector" />
              )}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: '#0b2545',
                  color: '#fddfa2',
                  fontWeight: 700,
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  flexShrink: 0,
                }}
              >
                {p.num}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0A1A2F', marginBottom: 6 }}>
                {p.titulo}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#5a4a00', lineHeight: 1.55 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── REQUISITOS + CTA ──────────────────────────────── */}
      <section
        className="pro-section-padding"
        style={{
          background: '#fff',
          padding: '40px 40px 50px',
          borderRadius: 14,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          marginBottom: 30,
        }}
      >
        <div className="req-cta-wrapper">
          {/* Requisitos */}
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0A1A2F', marginBottom: 20 }}>
              Requisitos para cadastro
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {requisitos.map((r) => (
                <li
                  key={r}
                  style={{
                    padding: '12px 0',
                    borderBottom: '1px solid #ebebeb',
                    fontSize: '1rem',
                    color: '#222',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: '#0b2545',
                      color: '#fddfa2',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card */}
          <div
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #0b2545 0%, #103569 100%)',
              borderRadius: 12,
              padding: '40px 36px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
            }}
          >
            <span style={{ fontSize: '2.5rem' }}>🛠️</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
              Pronto para começar?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', maxWidth: 280 }}>
              Cadastre-se agora e comece a receber pedidos de clientes
              próximos a você em minutos.
            </p>
            <SejaProCTA variant="card" />
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
              Já tem conta?{' '}
              <a href="/login" style={{ color: '#fddfa2', fontWeight: 600, textDecoration: 'underline' }}>
                Faça login aqui
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTO ────────────────────────────────────── */}
      <section
        className="pro-section-padding"
        style={{
          background: '#fff',
          borderRadius: 14,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: '40px 50px',
          marginBottom: 60,
          borderLeft: '5px solid #fddfa2',
          position: 'relative',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 20,
            left: 24,
            fontSize: '4rem',
            color: '#fddfa2',
            lineHeight: 1,
            fontFamily: 'Georgia, serif',
          }}
        >
          "
        </span>
        <blockquote
          style={{
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: '#333',
            lineHeight: 1.7,
            margin: 0,
            paddingLeft: 30,
            textAlign: 'center',
          }}
        >
          Desde que me cadastrei no ClickServiço, minha renda aumentou 40%. Agora consigo
          atender clientes próximos da minha casa, controlar minha agenda com facilidade
          e receber de forma segura, sem burocracia.
        </blockquote>
        <footer
          style={{
            marginTop: 20,
            textAlign: 'center',
            fontWeight: 700,
            color: '#0b2545',
            fontSize: '0.95rem',
          }}
        >
          — Carlos Silva,{' '}
          <span style={{ color: '#555', fontWeight: 500 }}>Eletricista · São Paulo, SP</span>
        </footer>
      </section>
    </div>
  );
}
