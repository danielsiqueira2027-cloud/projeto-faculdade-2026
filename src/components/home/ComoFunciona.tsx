import React from 'react';
import Image from 'next/image';

interface Passo {
  numero: string;
  src: string;
  titulo: string;
  descricao: string;
}

const passos: Passo[] = [
  {
    numero: '01',
    src: '/imgs/geral_index/lupa_escura.png',
    titulo: 'Busque um profissional',
    descricao: 'Encontre especialistas próximos a você por categoria ou serviço específico',
  },
  {
    numero: '02',
    src: '/imgs/geral_index/trabalhador.png',
    titulo: 'Compare e escolha',
    descricao: 'Veja avaliações reais, peça orçamentos e escolha o melhor profissional',
  },
  {
    numero: '03',
    src: '/imgs/geral_index/escudo.png',
    titulo: 'Contrate com segurança',
    descricao: 'Do cadastro ao pagamento, tudo verificado e protegido pela plataforma',
  },
];

export function ComoFunciona() {
  return (
    <section
      className="w-full"
      style={{ padding: '70px 20px', backgroundColor: '#ebebeb' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Cabeçalho */}
        <div className="text-center" style={{ marginBottom: 60 }}>
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
              marginBottom: 14,
            }}
          >
            Simples e rápido
          </span>
          <h2
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 700, color: '#0A1A2F', marginBottom: 8 }}
          >
            Como funciona?
          </h2>
          <p style={{ color: '#666', fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}>
            Em 3 passos simples você encontra o profissional ideal para o seu serviço
          </p>
        </div>

        {/* Passos */}
        <div
          className="flex flex-wrap justify-center"
          style={{ gap: 40, position: 'relative' }}
        >
          {passos.map((passo, i) => (
            <div
              key={passo.numero}
              className="flex flex-col items-center text-center"
              style={{
                flex: '1 1 260px',
                maxWidth: 300,
                background: '#fff',
                borderRadius: 16,
                padding: '36px 28px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
                position: 'relative',
              }}
            >
              {/* Número absoluto no canto */}
              <span
                style={{
                  position: 'absolute',
                  top: 16,
                  left: 20,
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  color: 'rgba(16,53,105,0.08)',
                  lineHeight: 1,
                  fontFamily: 'monospace',
                }}
              >
                {passo.numero}
              </span>

              {/* Ícone */}
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: '50%',
                  background: '#f0f5ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <div style={{ position: 'relative', width: 50, height: 50 }}>
                  <Image src={passo.src} alt={passo.titulo} fill className="object-contain" />
                </div>
              </div>

              {/* Conteúdo */}
              <h3
                style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0A1A2F', marginBottom: 10 }}
              >
                {passo.titulo}
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#666', lineHeight: 1.6 }}>
                {passo.descricao}
              </p>

              {/* Conector visual entre cards (exceto o último) */}
              {i < passos.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden"
                  style={{
                    position: 'absolute',
                    right: -24,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1.4rem',
                    color: '#103569',
                    opacity: 0.3,
                  }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
