'use client';

import React from 'react';
import Link from 'next/link';

export default function TempNavFooter() {
  const routes = [
    { label: 'Home', path: '/' },
    { label: 'Seja Profissional', path: '/seja-profissional' },
    { label: 'Missão', path: '/missao' },
    { label: 'Quem Somos', path: '/quem-somos' },
    { label: 'Login', path: '/login' },
    { label: 'Categorias', path: '/categorias' },
    { label: 'Buscas', path: '/buscas' },
    { label: 'Orçamento', path: '/orcamento' },
    { label: 'Perfil', path: '/perfil' },
    { label: 'Perfil Profissional', path: '/perfil-profissional' },
  ];

  return (
    <div className="bg-gray-100 p-4 border-t-2 border-gray-300 mt-auto">
      <p className="text-center font-bold mb-2 text-gray-700">Menu Temporário de Navegação:</p>
      <div className="flex flex-wrap justify-center gap-4">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
