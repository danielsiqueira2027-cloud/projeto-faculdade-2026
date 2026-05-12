'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PROFESSIONALS_MOCK } from '@/types/professional';
import { ProfileCard } from '../../../../perfil/ProfileCard';
import { PortfolioGrid } from '../../../../perfil/PortfolioGrid';
import { ArrowLeft } from 'lucide-react';

export default function ProfessionalProfile() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  // Busca o profissional pelo ID
  const pro = PROFESSIONALS_MOCK.find(p => p.id === id);

  if (!pro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#103569] mb-4">Profissional não encontrado</h1>
          <button 
            onClick={() => router.back()}
            className="text-[#f7941d] font-bold hover:underline"
          >
            Voltar para o Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Mapeia os dados do mock para o tipo esperado pelo ProfileCard se necessário
  // O ProfileCard espera o tipo Professional de @/types
  const professionalData = {
    ...pro,
    specialty: pro.role,
    avatar: pro.avatarUrl,
    description: pro.bio || 'Especialista em serviços residenciais e comerciais com foco em qualidade e segurança.',
    reviewCount: 124, // Mock fixo para o design
    yearsOfExperience: 15,
    certifications: ['ISO 9001 Certificado', 'Mestre de Obras B.Sc.', 'NR-10', 'NR-35'],
    portfolio: [
      { id: '1', title: 'Manutenção Hidráulica', category: 'Hidráulica', imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&h=400&fit=crop', year: 2024 },
      { id: '2', title: 'Reforma Estrutural', category: 'Obras', imageUrl: 'https://images.unsplash.com/photo-1621905252507-b354bcadcabc?w=600&h=400&fit=crop', year: 2024 },
      { id: '3', title: 'Instalação Elétrica', category: 'Elétrica', imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop', year: 2023 },
    ],
    testimonials: [
      { id: '1', author: 'Marcus Thorne', role: 'Cliente', content: 'Excelente profissional, resolveu o problema rapidamente.', rating: 5 },
    ]
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 min-h-screen">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#103569]/60 hover:text-[#103569] font-bold transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para o Dashboard</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <ProfileCard professional={professionalData as any} />
        </div>
        <div className="lg:col-span-3">
          <PortfolioGrid items={professionalData.portfolio} />
        </div>
      </div>
    </div>
  );
}
