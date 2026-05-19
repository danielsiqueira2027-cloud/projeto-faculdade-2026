'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const categorias = [
  { nome: 'Encanador',   slug: 'encanador',   img: '/imgs/categorias/casa.png' },
  { nome: 'Pintor',      slug: 'pintor',      img: '/imgs/categorias/moda.png' },
  { nome: 'Eletricista', slug: 'eletricista', img: '/imgs/categorias/assistencia.png' },
  { nome: 'Pedreiro',    slug: 'pedreiro',    img: '/imgs/categorias/aulas.png' },
  { nome: 'Carpinteiro', slug: 'carpinteiro', img: '/imgs/categorias/design.png' },
  { nome: 'Vidraceiro',  slug: 'vidraceiro',  img: '/imgs/categorias/eventos.png' },
  { nome: 'Gesseiro',    slug: 'gesseiro',    img: '/imgs/categorias/saude.png' },
  { nome: 'Azulejista',  slug: 'azulejista',  img: '/imgs/categorias/autos.png' },
  { nome: 'Serralheiro', slug: 'serralheiro', img: '/imgs/categorias/aulas.png' },
];

export function CategoriasGrid() {
  return (
    <section className="w-full py-8 flex flex-col items-center" style={{ backgroundColor: '#ebebeb' }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 1200, width: '92%' }}>
        <h2 className="font-semibold mb-8" style={{ fontSize: '1.8rem', color: '#000' }}>
          CATEGORIAS
        </h2>

        {/* Grid de 9 categorias — clique vai direto para busca */}
        <div
          className="w-full grid gap-4"
          style={{ gridTemplateColumns: 'repeat(9, 1fr)', justifyItems: 'center' }}
        >
          {categorias.map((cat) => (
            <Link
              key={cat.slug}
              href={`/buscas?categoria=${encodeURIComponent(cat.slug)}`}
              className="flex flex-col items-center text-center rounded-xl no-underline transition-all hover:scale-105"
              style={{ padding: '10px 6px', gap: 8 }}
            >
              <div className="relative" style={{ width: 78, height: 78 }}>
                <Image
                  src={cat.img}
                  alt={cat.nome}
                  fill
                  className="object-cover"
                  style={{ borderRadius: 39, boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}
                />
              </div>
              <span className="font-semibold" style={{ fontSize: '0.78rem', color: '#111', lineHeight: 1.2 }}>
                {cat.nome}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
