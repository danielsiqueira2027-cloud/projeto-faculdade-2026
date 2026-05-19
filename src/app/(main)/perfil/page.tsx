import React from 'react';
import { ProfileCard } from './ProfileCard';
import { PortfolioGrid } from './PortfolioGrid';
import { Professional } from '@/types';

const MOCK_PROFESSIONAL: Professional = {
  id: '1',
  name: 'Rodolfo Guimarães',
  avatar: '/imgs/who/daniel.jpeg',
  specialty: 'Mestre de Obras & Encanador',
  description: 'Profissional com mais de 15 anos de experiência em reformas residenciais e comerciais.',
  rating: 4.9,
  reviewCount: 128,
  yearsOfExperience: 15,
  certifications: ['NR-10', 'NR-35', 'Mestre de Obras SENAI'],
  portfolio: [
    { id: '1', title: 'Reforma Banheiro Luxo', category: 'Hidráulica', imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop', year: 2023 },
    { id: '2', title: 'Instalação Elétrica Prédio', category: 'Elétrica', imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop', year: 2022 },
    { id: '3', title: 'Reforma Cozinha Completa', category: 'Obras', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop', year: 2024 },
  ],
  testimonials: [
    { id: '1', author: 'Maria Silva', role: 'Cliente', content: 'Excelente trabalho!', rating: 5 },
  ]
};

export default function PerfilPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-3xl font-bold text-[#0A1A2F]">Meu Perfil</h1>
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
