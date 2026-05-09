import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nossa Missão — ClickServiço',
  description:
    'Conheça a missão e os valores do ClickServiço: conectar necessidades reais a soluções qualificadas.',
};

const valores = [
  { icone: '🔍', titulo: 'Transparência', desc: 'Comunicação clara em todas as etapas do serviço' },
  { icone: '⭐', titulo: 'Qualidade',      desc: 'Serviços realizados por profissionais qualificados' },
  { icone: '⚡', titulo: 'Rapidez',        desc: 'Encontre o profissional ideal em segundos' },
  { icone: '🛡️', titulo: 'Segurança',     desc: 'Sua segurança sempre em primeiro lugar' },
  { icone: '💼', titulo: 'Oportunidade',  desc: 'Mais renda e visibilidade para profissionais' },
];

export default function MissaoPage() {
  return (
    <main
      style={{
        width: '100%',
        maxWidth: 1300,
        margin: '90px auto',
        padding: '0 20px',
      }}
    >
      <section
        style={{
          background: '#fff',
          padding: 40,
          borderRadius: 14,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        {/* Hero */}
        <div style={{ textAlign: 'center', paddingBottom: 40 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 10, color: '#000' }}>
            Nossa Missão
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#444' }}>
            Conectando necessidades reais a soluções qualificadas
          </p>
        </div>

        {/* Texto destacado */}
        <div
          style={{
            background: '#FFF7D6',
            padding: 25,
            borderRadius: 12,
            marginBottom: 30,
            lineHeight: 1.7,
            fontSize: '1rem',
            color: '#0A1A2F',
          }}
        >
          {[
            'No ClickServiço, nossa missão é transformar a forma como pessoas encontram, contratam e prestam serviços, criando um ecossistema digital que realmente funcione para todos — tanto para quem precisa de um profissional quanto para quem busca novas oportunidades de trabalho.',
            'Acreditamos no potencial da tecnologia como ferramenta de inclusão e crescimento. Por isso, trabalhamos para democratizar o acesso a serviços qualificados, permitindo que profissionais autônomos ampliem sua renda, conquistem visibilidade e construam reputação, enquanto oferecemos aos clientes uma experiência segura, simples e totalmente transparente.',
            'Nosso propósito vai muito além de apenas conectar clientes e prestadores de serviço. Queremos fortalecer relações de confiança, tornando cada etapa — da busca ao atendimento — algo claro, humano e confiável. Buscamos criar um ambiente onde qualidade, responsabilidade e credibilidade sejam prioridades, contribuindo para um mercado mais justo, organizado e acessível.',
            'Aqui, acreditamos que cada profissional tem potencial para crescer e cada cliente merece ser bem atendido. Estamos aqui para aproximar essas duas realidades e entregar soluções que facilitem a vida de todos.',
          ].map((p, i) => (
            <p key={i} style={{ marginBottom: i < 3 ? 15 : 0 }}>
              {p}
            </p>
          ))}
        </div>

        {/* Nossos Valores */}
        <h2
          style={{
            textAlign: 'center',
            margin: '40px 0 25px',
            fontSize: 32,
            fontWeight: 700,
            color: '#000',
          }}
        >
          Nossos Valores
        </h2>

        <div className="values-grid">
          {valores.map((v) => (
            <div key={v.titulo} className="value-card">
              <div style={{ fontSize: '2.3rem', marginBottom: 10 }}>{v.icone}</div>
              <div
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#000',
                  marginBottom: 8,
                }}
              >
                {v.titulo}
              </div>
              <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.5 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
