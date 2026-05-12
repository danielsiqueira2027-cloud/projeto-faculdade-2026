'use client';

import React, { useState } from 'react';
import { PROFESSIONALS_MOCK, Professional } from '@/types/professional';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Star, MapPin, Briefcase } from 'lucide-react';
import Image from 'next/image';

export default function VitrinePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfessionals = PROFESSIONALS_MOCK.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-bp-surface font-work-sans">
      {/* Header / Hero Section */}
      <section className="bg-bp-primary text-bp-on-primary py-8 px-4 shadow-md">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold font-manrope tracking-tight">
                Olá, Cliente!
              </h1>
              <p className="text-bp-outline-variant text-base opacity-90">
                Encontre os melhores profissionais para o seu serviço.
              </p>
            </div>
            
            <div className="w-full md:max-w-sm relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
              </div>
              <Input
                type="text"
                placeholder="O que você precisa hoje?"
                className="pl-10 bg-white text-gray-900 border-none h-11 shadow-sm focus-visible:ring-bp-secondary text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl py-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-bp-primary">
            Profissionais Disponíveis
          </h2>
          <Badge variant="secondary" className="bg-bp-secondary-container text-bp-on-secondary-container">
            {filteredProfessionals.length} resultados
          </Badge>
        </div>

        {filteredProfessionals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProfessionals.map((prof) => (
              <ProfessionalCard key={prof.id} professional={prof} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-bp-outline-variant">
            <p className="text-xl text-gray-500">Nenhum profissional encontrado para "{searchTerm}"</p>
          </div>
        )}
      </main>
    </div>
  );
}

function ProfessionalCard({ professional }: { professional: Professional }) {
  // Lista expandida de IDs do Unsplash com foco em profissionais homens (diversos estilos)
  const unsplashIds = [
    'photo-1560250097-0b93528c311a', // Business man
    'photo-1540569014015-19a7be504e3a', // Worker / Tech
    'photo-1506794778202-cad84cf45f1d', // Portrait
    'photo-1519085360753-af0119f7cbe7', // Young professional
    'photo-1507003211169-0a1dd7228f2d', // Smiling man
    'photo-1566492031773-4f4e44671857', // Professional portrait
    'photo-1537511446984-935f663eb1f4', // Corporate man
    'photo-1552058544-f2b08422138a', // Casual professional
    'photo-1539571696357-5a69c17a67c6', // Portrait
    'photo-1500648767791-00dcc994a43e', // Man portrait
  ];
  
  // Garante uma foto única baseada no ID do profissional (sem repetir até 10 profissionais)
  const imageIndex = (parseInt(professional.id) - 1) % unsplashIds.length;
  const imageId = unsplashIds[imageIndex];
  const imageUrl = `https://images.unsplash.com/${imageId}?auto=format&fit=crop&q=80&w=400&h=400`;

  return (
    <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-xl hover:-translate-y-1 bg-white group">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={professional.name}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-white/90 text-bp-primary border-none backdrop-blur-sm">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" />
            {professional.rating.toFixed(1)}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-bp-primary">
              {professional.name}
            </CardTitle>
            <p className="text-xs font-semibold text-bp-secondary uppercase tracking-wider mt-1">
              {professional.role}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <MapPin size={14} className="text-bp-secondary" />
          <span>{professional.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Briefcase size={14} className="text-bp-secondary" />
          <span>Serviços a partir de <strong className="text-bp-primary">R$ 80,00</strong></span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2">
        <Button className="flex-1 bg-bp-primary hover:bg-bp-primary-container text-white">
          Ver Perfil
        </Button>
        <Button variant="outline" className="border-bp-primary text-bp-primary hover:bg-bp-surface">
          Orçamento
        </Button>
      </CardFooter>
    </Card>
  );
}
