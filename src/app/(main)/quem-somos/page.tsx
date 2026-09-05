import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quem Somos — ClickServiço',
  description: 'Conheça a história e os integrantes do projeto ClickServiço.',
};

const membros = [
  {
    foto: '/imgs/who/daniel.jpeg',
    nome: 'Daniel Siqueira',
    idade: '28 anos',
    bio: 'Estou no 9º semestre de Engenharia de Computação, atualmente trabalho com suporte técnico em ERP e banco de dados SQL. Busco experiência em programação em Java e outras linguagens. No tempo livre gosto de jogos eletrônicos, fazer lives e jogar tênis.',
  },
  {
    foto: '/imgs/who/lucas.jpg',
    nome: 'Lucas Antonio',
    idade: '22 anos',
    bio: 'Estou no 9º semestre de Engenharia de Computação e também me dedico às Artes Cênicas. Sou formado em Mecânica de Usinagem, tenho interesse em redes e dados e experiência com suporte técnico. Gosto de trabalhar em equipe, assistir séries e animes.',
  },
  {
    foto: '/imgs/who/pedro.jpeg',
    nome: 'Pedro Lima',
    idade: '22 anos',
    bio: 'Estou cursando o 9° semestre. Trabalho com implementações SAP e possuo conhecimentos em desenvolvimento Web com JavaScript e Node.js. Sou organizado, tenho experiência em trabalho em grupo e gosto de praticar esportes.',
  },
  {
    foto: '/imgs/who/caputi.jpg',
    nome: 'Pedro Caputi',
    idade: '21 anos',
    bio: 'Tenho formação técnica em Desenvolvimento de Sistemas e curso o 9° semestre de Engenharia da Computação. Sou proativo, objetivo e focado.',
  },
  {
    foto: '/imgs/who/vinicius.jpeg',
    nome: 'Vinicius Mateus',
    idade: '22 anos',
    bio: 'Estou no 9º semestre de Engenharia de Computação. Tenho interesse em programação e estou fazendo curso de Python e MySQL. Tenho facilidade em trabalho em equipe e gosto de videogames e séries.',
  },
];

export default function QuemSomosPage() {
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
        {/* Título principal */}
        <h1
          style={{
            textAlign: 'center',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: 700,
          marginBottom: 25,
          color: '#0A1A2F',
        }}
      >
        Nossa História
        </h1>

        {/* Caixa de história */}
        <div
          style={{
            backgroundColor: '#FFF7D6',
            padding: 30,
            borderRadius: 14,
            lineHeight: 1.6,
            marginBottom: 50,
            color: '#0A1A2F',
            fontSize: 17,
            textAlign: 'justify',
          }}
        >
          <h3 style={{ marginBottom: 12, fontWeight: 700 }}>Do passado ao presente...</h3>
          <p>
            Nossa jornada começou em 2022, no primeiro ano da faculdade UNISAL, quando desenvolvemos
            nosso primeiro projeto: um sistema simples e acessível para monitorar a umidade do solo
            de plantas domésticas. No ano seguinte, aprimoramos a ideia utilizando Arduino e conexão
            Wi-Fi, permitindo acompanhar tudo pelo celular. Com o tempo, expandimos nossos projetos e
            criamos um aplicativo voltado à área da saúde, oferecendo atendimento remoto semelhante
            ao TeleSUS. Depois disso, desenvolvemos para a própria instituição um site para facilitar
            o envio de documentos dos alunos bolsistas, modernizando um processo que antes era manual.
            Agora, seguimos evoluindo com o ClickServiço, plataforma que conecta prestadores de
            serviços a contratantes, fortalecendo oportunidades e trazendo soluções digitais úteis
            para a comunidade.
          </p>
        </div>

        {/* Título dos membros */}
        <h2
          style={{
            textAlign: 'center',
            marginBottom: 40,
          fontSize: 'clamp(1.3rem, 3.5vw, 1.625rem)',
          fontWeight: 700,
          color: '#0A1A2F',
        }}
      >
        Integrantes do Projeto
        </h2>

        {/* Grid de membros */}
        <div className="grid-equipe">
          {membros.map((m, i) => (
            <div key={i} className="member-card">
              <div style={{ position: 'relative', width: 150, height: 150, margin: '0 auto 18px' }}>
                <Image
                  src={m.foto}
                  alt={m.nome}
                  fill
                  className="object-cover"
                  style={{ borderRadius: '50%', border: '3px solid #ddd' }}
                />
              </div>
              <h3
                style={{
                  fontSize: 'clamp(1rem, 3vw, 1.375rem)',
                  fontWeight: 700,
                  color: '#0A1A2F',
                  marginBottom: 6,
                }}
              >
                {m.nome}
              </h3>
              <span
                style={{
                  display: 'block',
                  fontSize: 17,
                  color: '#555',
                  fontWeight: 500,
                }}
              >
                {m.idade}
              </span>

              {/* Divisor dourado */}
              <div
                style={{
                  width: 40,
                  height: 3,
                  backgroundColor: '#fddfa2',
                  margin: '15px auto',
                }}
              />

              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: '#333',
                  textAlign: 'center',
                  padding: '0 5px',
                }}
              >
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
