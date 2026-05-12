import React from 'react';
import Link from 'next/link';
import { ProfileCard } from '../perfil/ProfileCard';
import { PortfolioGrid } from '../perfil/PortfolioGrid';
import { Professional } from '@/types';

const MOCK_PROFESSIONAL: Professional = {
  id: '1',
  name: 'Guilherme Freitas',
  avatar: '/imgs/who/lucas.jpg',
  specialty: 'Eletricista Residencial',
  description: 'Especialista em instalações elétricas modernas e automação residencial.',
  rating: 5.0,
  reviewCount: 85,
  yearsOfExperience: 8,
  certifications: ['Técnico em Eletrotécnica', 'Automação Predial'],
  portfolio: [
    { id: '1', title: 'Iluminação LED Jardim', category: 'Elétrica', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', year: 2024 },
    { id: '2', title: 'Painel Elétrico Industrial', category: 'Elétrica', imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop', year: 2024 },
    { id: '3', title: 'Instalação Solar Residencial', category: 'Energia', imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop', year: 2023 },
  ],
  testimonials: [
    { id: '1', author: 'João Pedro', role: 'Cliente', content: 'Muito profissional e pontual.', rating: 5 },
  ]
};

export default function PerfilProfissionalPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#0A1A2F]">Perfil do Profissional</h1>
        <Link href="/buscas" className="text-blue-600 hover:underline">
          &larr; Voltar para buscas
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <ProfileCard professional={MOCK_PROFESSIONAL} />
        </div>
        <div className="lg:col-span-3">
          <PortfolioGrid items={MOCK_PROFESSIONAL.portfolio} />
        </div>
      </div>
    </div>
  );
}
