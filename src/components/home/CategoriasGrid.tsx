'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

const todasSubcategorias: Record<string, string[]> = {
  'Assistência Técnica': [
    'Técnico de Informática', 'Técnico de Celulares / Smartphones', 'Técnico em Redes',
    'Técnico em Eletrodomésticos', 'Técnico em TV / Áudio e Vídeo', 'Técnico em Ar-Condicionado',
    'Técnico em Refrigeração', 'Técnico em Impressoras', 'Técnico em Notebooks',
    'Manutenção de Consoles', 'Suporte Técnico Remoto', 'Recuperação de Dados',
    'Manutenção de Portões Eletrônicos', 'Instalador de Alarmes', 'Instalador de CFTV',
    'Técnico em Energia Solar', 'Conserto de Bicicletas', 'Conserto de Patinetes Elétricos',
  ],
  'Aulas e Consultoria': [
    'Professor Particular', 'Professor de Inglês', 'Professor de Espanhol', 'Professor de Matemática',
    'Professor de Música', 'Professor de Dança', 'Professor de Informática',
    'Consultor Financeiro', 'Consultor de Carreira', 'Consultor de Marketing', 'Consultor de TI',
    'Consultor de RH', 'Personal Trainer', 'Coach de Produtividade', 'Consultor Jurídico',
    'Aulas de Reforço Escolar', 'Aulas de Programação', 'Preparador para Concursos',
    'Consultor de Negócios',
  ],
  'Autos': [
    'Mecânico', 'Eletricista Automotivo', 'Funilaria e Pintura', 'Chaveiro Automotivo',
    'Instalador de Acessórios', 'Martelinho de Ouro', 'Limpador Automotivo (Detailing)',
    'Estética Automotiva', 'Guincho', 'Lavagem de Carros a Domicílio',
    'Troca de Óleo a Domicílio', 'Instalador de Película', 'Inspeção Automotiva',
    'Conserto de Moto', 'Conserto de Caminhão',
  ],
  'Design e Tecnologia': [
    'Designer Gráfico', 'Designer de Logotipos', 'Designer de Interfaces (UI/UX)',
    'Criação de Sites', 'Desenvolvedor Front-End', 'Desenvolvedor Back-End',
    'Desenvolvedor Mobile', 'Editor de Vídeo', 'Social Media', 'Fotógrafo', 'Ilustrador',
    'Criador de Conteúdo', 'Gestor de Tráfego Pago', 'Animador 2D / Motion',
    'Modelador 3D', 'Técnico em Impressão 3D',
  ],
  'Eventos': [
    'Fotógrafo para Eventos', 'Filmaker / Cinegrafista', 'DJ', 'Bartender', 'Garçom / Copeira',
    'Buffet', 'Decorador de Eventos', 'Cerimonialista', 'Locutor / MC', 'Organizador de Casamentos',
    'Banda para Eventos', 'Som e Iluminação', 'Monitor Infantil', 'Recreador',
    'Segurança para Eventos', 'Aluguel de Mesas e Cadeiras',
  ],
  'Moda e Beleza': [
    'Cabeleireiro', 'Barbeiro', 'Manicure / Pedicure', 'Maquiador(a)',
    'Designer de Sobrancelhas', 'Esteticista', 'Depiladora', 'Especialista em Cílios',
    'Massoterapeuta', 'Consultor de Moda', 'Personal Stylist', 'Bronzeamento',
    'Podóloga', 'Técnico em Unhas de Gel',
  ],
  'Casa e Reformas': [
    'Pedreiro', 'Eletricista', 'Encanador', 'Pintor', 'Gesseiro', 'Marceneiro',
    'Serralheiro', 'Vidraceiro', 'Paisagista', 'Jardineiro', 'Diarista / Faxineira',
    'Montador de Móveis', 'Arquiteto', 'Engenheiro Civil', 'Instalador de Gesso',
    'Instalador de Pisos', 'Técnico de Energia Solar', 'Dedetizador',
    'Bombeiro Hidráulico', 'Técnico de Segurança Residencial',
  ],
  'Saúde': [
    'Massoterapeuta', 'Fisioterapeuta', 'Psicólogo (online)', 'Nutricionista',
    'Terapeuta Holístico', 'Quiropraxista', 'Enfermeiro(a) domiciliar',
    'Cuidadores de Idosos', 'Acompanhante Terapêutico', 'Instrutor de Yoga',
    'Instrutor de Pilates', 'Educador Físico', 'Consultor de Bem-Estar',
  ],
};

const categorias = [
  { nome: 'Encanador', img: '/imgs/categorias/assistencia.png' },
  { nome: 'Pintor', img: '/imgs/categorias/aulas.png' },
  { nome: 'Eletricista',               img: '/imgs/categorias/autos.png' },
  { nome: 'Pedreiro ', img: '/imgs/categorias/design.png' },
  { nome: 'Carpinteiro',             img: '/imgs/categorias/eventos.png' },
  { nome: 'Vidraceiro',       img: '/imgs/categorias/moda.png' },
  { nome: 'Gesseiro',     img: '/imgs/categorias/casa.png' },
  { nome: 'Serralheiro',               img: '/imgs/categorias/saude.png' },
];

export function CategoriasGrid() {
  const [ativa, setAtiva] = useState<string | null>(null);
  const [arrowX, setArrowX] = useState('50%');
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleClick = (nome: string, index: number) => {
    if (ativa === nome) {
      setAtiva(null);
      return;
    }

    setAtiva(nome);

    // Calcula posição da seta dinamicamente (igual ao JS original)
    const btn = itemRefs.current[index];
    const grid = gridRef.current;
    if (btn && grid) {
      const rectBtn = btn.getBoundingClientRect();
      const rectGrid = grid.getBoundingClientRect();
      const centro = rectBtn.left + rectBtn.width / 2 - rectGrid.left;
      setArrowX(`${centro}px`);
    }
  };

  return (
    <section className="w-full py-2 flex flex-col items-center" style={{ backgroundColor: '#ebebeb' }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 1100, width: '90%' }}>
        <h2 className="font-semibold mb-6" style={{ fontSize: '1.8rem', color: '#000' }}>
          CATEGORIAS
        </h2>

        {/* Grid de categorias */}
        <div
          ref={gridRef}
          className="w-full grid gap-6"
          style={{ gridTemplateColumns: 'repeat(8, 1fr)', justifyItems: 'center' }}
        >
          {categorias.map((cat, i) => (
            <button
              key={cat.nome}
              ref={(el) => { itemRefs.current[i] = el; }}
              onClick={() => handleClick(cat.nome, i)}
              className="flex flex-col items-center text-center cursor-pointer rounded-xl transition-all"
              style={{
                padding: 10,
                background: 'transparent',
                border: 'none',
                transform: ativa === cat.nome ? 'scale(1.05)' : 'scale(1)',
              }}
              onMouseEnter={e => { if (ativa !== cat.nome) e.currentTarget.style.backgroundColor = 'rgba(16,53,105,0.05)'; }}
              onMouseLeave={e => { if (ativa !== cat.nome) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <div className="relative mb-2" style={{ width: 90, height: 90 }}>
                <Image
                  src={cat.img}
                  alt={cat.nome}
                  fill
                  className="object-cover"
                  style={{ borderRadius: 45, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}
                />
              </div>
              <span className="text-sm font-medium" style={{ color: '#000' }}>{cat.nome}</span>
            </button>
          ))}
        </div>

        {/* Painel de subcategorias — estilo balão com seta */}
        {ativa && (
          <div
            id="subcategorias"
            className="w-full mt-4 relative overflow-visible"
            style={{
              padding: 25,
              background: '#fff',
              borderRadius: 15,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              animation: 'slideDown 0.2s ease-out',
            }}
          >
            {/* Seta do balão */}
            <span
              className="absolute"
              style={{
                top: -12,
                left: arrowX,
                transform: 'translateX(-50%)',
                width: 0, height: 0,
                borderLeft: '12px solid transparent',
                borderRight: '12px solid transparent',
                borderBottom: '12px solid #fff',
                zIndex: 10,
              }}
            />

            <h2
              id="subcat-titulo"
              className="font-semibold mb-5"
              style={{ fontSize: '1.4rem', color: '#103569', borderBottom: '1px solid #eee', paddingBottom: 10 }}
            >
              {ativa}
            </h2>

            <div
              id="subcat-grid"
              className="grid overflow-y-auto pr-2"
              style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 12, maxHeight: 400,
              }}
            >
              {todasSubcategorias[ativa]?.map((sub) => (
                <div
                  key={sub}
                  className="cursor-pointer rounded-md transition-all text-sm"
                  style={{
                    color: '#444', padding: '8px 12px',
                    background: '#f9f9f9', border: '1px solid transparent',
                    fontSize: '0.95rem',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#103569';
                    e.currentTarget.style.background = '#eef4ff';
                    e.currentTarget.style.borderColor = '#103569';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#444';
                    e.currentTarget.style.background = '#f9f9f9';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  {sub}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
