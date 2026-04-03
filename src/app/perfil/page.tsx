import React from 'react';
import { ProfileCard } from './ProfileCard';
import { PortfolioGrid } from './PortfolioGrid';
import { Professional } from '@/types';
import { MapPin, Clock, Star, Quote } from 'lucide-react';

const MOCK_PROFESSIONAL: Professional = {
  id: '1',
  name: 'Arthur J. Vance',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
  specialty: 'Engenheiro Civil',
  description: 'Especialista em alvenaria estrutural e fundações históricas reforçadas. Trazendo precisão arquitetônica para integridade estrutural de grande porte.',
  rating: 4.9,
  reviewCount: 124,
  yearsOfExperience: 15,
  certifications: ['Pedreiro Estrutural Certificado', 'Líder de Projeto 2024'],
  portfolio: [
    {
      id: 'p1',
      title: 'A Torre de Obsidiana',
      category: 'Comercial',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      year: 2023
    },
    {
      id: 'p2',
      title: 'Pavilhão do Lago',
      category: 'Residencial',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
      year: 2022
    },
    {
      id: 'p3',
      title: 'Fundação Patrimônio',
      category: 'Restauração',
      imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',
      year: 2023
    }
  ],
  testimonials: [
    {
      id: 't1',
      author: 'Marcus Thorne',
      role: 'Grupo Thorne Dev',
      content: "A especialidade do Arthur em alvenaria estrutural é incomparável. Ele salvou nosso projeto de fundação de uma falha crítica com sua visão técnica.",
      rating: 5
    },
    {
      id: 't2',
      author: 'Elena Rodriguez',
      role: 'Cliente Particular',
      content: "Um verdadeiro profissional. Preços transparentes, plantas detalhadas e um canteiro de obras impecável. Recomendadíssimo para qualquer obra civil.",
      rating: 5
    }
  ]
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-bp-surface font-work-sans">
      <main className="container mx-auto px-4 pt-6 pb-12 md:pt-8 md:pb-20 space-y-24 max-w-7xl">
        {/* Hero Section */}
        <ProfileCard professional={MOCK_PROFESSIONAL} />

        {/* Info Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-manrope text-bp-on-surface">Sobre o Arthur</h2>
            <p className="text-lg text-bp-on-surface/70 leading-relaxed">
              Com mais de uma década de experiência em engenharia estrutural, Arthur foca na intersecção entre estética arquitetônica e integridade física. Seu trabalho é reconhecido pela precisão técnica e atenção aos detalhes em projetos de grande escala.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-bp-primary">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold text-xl uppercase tracking-tighter">Disponibilidade</span>
                </div>
                <p className="text-bp-on-surface/50 font-medium">Projetos para o 3º Tri. de 2024</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-bp-primary">
                  <MapPin className="w-5 h-5" />
                  <span className="font-bold text-xl uppercase tracking-tighter">Área de Atendimento</span>
                </div>
                <p className="text-bp-on-surface/50 font-medium">Grande São Paulo & Interior</p>
              </div>
            </div>
          </div>

          <div className="bg-bp-surface-low rounded-[2rem] p-10 space-y-8 relative overflow-hidden">
             <Quote className="absolute top-8 right-8 w-16 h-16 text-bp-primary/5" />
             <h3 className="text-2xl font-bold font-manrope text-bp-on-surface">Depoimentos de Clientes</h3>
             <div className="space-y-8">
                {MOCK_PROFESSIONAL.testimonials.map(t => (
                  <div key={t.id} className="space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-bp-secondary fill-bp-secondary' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-bp-on-surface italic font-medium">&quot;{t.content}&quot;</p>
                    <div>
                      <p className="font-bold text-bp-on-surface">{t.author}</p>
                      <p className="text-sm text-bp-on-surface/40 uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <PortfolioGrid items={MOCK_PROFESSIONAL.portfolio} />
      </main>
    </div>
  );
}
