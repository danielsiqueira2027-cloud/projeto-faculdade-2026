'use client';


interface Avaliacao {
  nome: string;
  servico: string;
  nota: number;
  texto: string;
  inicial: string;
  cor: string;
}

const avaliacoes: Avaliacao[] = [
  {
    nome: 'Ana Paula M.',
    servico: 'Elétrica residencial',
    nota: 5,
    texto: 'Encontrei um eletricista excelente em menos de 1 hora! Resolveu o problema rapidamente e o preço foi justo. Super recomendo a plataforma.',
    inicial: 'A',
    cor: '#103569',
  },
  {
    nome: 'Roberto C.',
    servico: 'Encanamento',
    nota: 5,
    texto: 'Já usei três vezes e sempre fui muito bem atendido. O sistema de avaliações me dá segurança de contratar alguém de qualidade.',
    inicial: 'R',
    cor: '#845400',
  },
  {
    nome: 'Mariana S.',
    servico: 'Pintura',
    nota: 4,
    texto: 'Ótima experiência! Pintou todo meu apartamento em dois dias. Muito cuidadoso e profissional. Recomendo sem hesitar.',
    inicial: 'M',
    cor: '#1a6b3c',
  },
];

function StarRating({ nota }: { nota: number }) {
  return (
    <div className="flex" style={{ gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ fontSize: '1rem', color: star <= nota ? '#f59e0b' : '#d1d5db' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function AvaliacaoClientes() {
  return (
    <section className="w-full" style={{ padding: '70px 20px', backgroundColor: '#ebebeb' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Cabeçalho */}
        <div className="text-center" style={{ marginBottom: 50 }}>
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
            Quem usa, aprova
          </span>
          <h2
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 700, color: '#0A1A2F', marginBottom: 8 }}
          >
            O que nossos clientes dizem
          </h2>
          <p style={{ color: '#666', fontSize: '1rem' }}>
            Mais de 12.000 serviços realizados com avaliação média de 4.8 estrelas
          </p>
        </div>

        {/* Cards de avaliação */}
        <div
          className="flex flex-wrap justify-center"
          style={{ gap: 24 }}
        >
          {avaliacoes.map((av) => (
            <div
              key={av.nome}
              style={{
                flex: '1 1 280px',
                maxWidth: 340,
                background: '#fff',
                borderRadius: 16,
                padding: '28px 24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)';
              }}
            >
              {/* Avaliação de estrelas */}
              <StarRating nota={av.nota} />

              {/* Texto */}
              <p
                style={{
                  fontSize: '0.95rem',
                  color: '#444',
                  lineHeight: 1.65,
                  fontStyle: 'italic',
                  flexGrow: 1,
                }}
              >
                &ldquo;{av.texto}&rdquo;
              </p>

              {/* Divisor */}
              <hr style={{ border: 0, borderTop: '1px solid #f0f0f0' }} />

              {/* Autor */}
              <div className="flex items-center" style={{ gap: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: av.cor,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {av.inicial}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0A1A2F' }}>
                    {av.nome}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>
                    {av.servico}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
