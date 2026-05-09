'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CATEGORIES_MOCK } from '@/types/category';
import { Professional, Service } from '@/types/professional';
import { Plus, Trash2, CheckCircle2, User, Briefcase, Camera, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProfessionalCadastroPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    role: '',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
  });

  const [services, setServices] = useState<Service[]>([
    { id: '1', title: '', price: 0, category: '', duration: '' }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addService = () => {
    const newService: Service = {
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      price: 0,
      category: '',
      duration: ''
    };
    setServices([...services, newService]);
  };

  const removeService = (id: string) => {
    if (services.length > 1) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleServiceChange = (id: string, field: keyof Service, value: string | number) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleFinalize = () => {
    const finalData: Professional = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      role: formData.role || (services.length > 0 ? services[0].category : 'Profissional'),
      rating: 5.0,
      distance: 0,
      location: formData.location,
      avatarUrl: formData.avatarUrl,
      bio: formData.bio,
      services: services.filter(s => s.title && s.price > 0)
    };

    console.log('✅ Cadastro Finalizado:', JSON.stringify(finalData, null, 2));
    alert('Cadastro finalizado com sucesso! Verifique o console para os dados formatados.');
  };

  const isStep1Valid = formData.name && formData.location && formData.bio;

  return (
    <div className="min-h-screen bg-bp-surface font-work-sans py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Stepper Header */}
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="flex flex-col items-center">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors",
              step >= 1 ? "bg-bp-primary text-white" : "bg-gray-200 text-gray-500"
            )}>
              1
            </div>
            <span className="text-xs mt-2 font-bold text-bp-primary">Dados</span>
          </div>
          <div className="flex-1 h-[2px] mx-4 bg-gray-200 relative overflow-hidden">
            <div className={cn(
              "absolute inset-0 bg-bp-primary transition-all duration-500",
              step === 2 ? "translate-x-0" : "-translate-x-full"
            )} />
          </div>
          <div className="flex flex-col items-center">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors",
              step === 2 ? "bg-bp-primary text-white" : "bg-gray-200 text-gray-500"
            )}>
              2
            </div>
            <span className="text-xs mt-2 font-bold text-gray-400">Catálogo</span>
          </div>
        </div>

        {step === 1 && (
          <Card className="border-none shadow-xl bg-white">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-bp-primary font-manrope">Dados Profissionais</CardTitle>
              <CardDescription>Vamos começar com o básico sobre você.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Photo Simulation */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="relative w-32 h-32 rounded-3xl bg-bp-surface flex items-center justify-center border-2 border-dashed border-bp-outline-variant overflow-hidden group">
                  <img src={formData.avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
                <Label className="text-bp-primary font-bold">Foto de Perfil</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Ex: João da Silva" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-12 border-gray-200 focus:ring-bp-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localização (Cidade/Estado)</Label>
                <Input 
                  id="location" 
                  name="location" 
                  placeholder="Ex: São Paulo, SP" 
                  value={formData.location}
                  onChange={handleInputChange}
                  className="h-12 border-gray-200 focus:ring-bp-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio / Descrição Profissional</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  placeholder="Conte um pouco sobre sua experiência e especialidades..." 
                  className="min-h-[120px] border-gray-200 focus:ring-bp-primary"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full h-14 bg-bp-primary hover:bg-bp-primary-container text-lg font-bold gap-2 shadow-lg transition-all"
                disabled={!isStep1Valid}
                onClick={() => setStep(2)}
              >
                Próximo Passo <ArrowRight size={20} />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Card className="border-none shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-bp-primary font-manrope">Catálogo de Serviços</CardTitle>
                <CardDescription>Defina os serviços que você oferece e seus valores.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {services.map((service, index) => (
                  <div key={service.id} className="space-y-6 relative p-6 bg-bp-surface/30 rounded-2xl border border-bp-outline-variant/30">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-bp-secondary flex items-center gap-2">
                        <Briefcase size={18} /> Serviço #{index + 1}
                      </h4>
                      {services.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeService(service.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Categoria</Label>
                        <select 
                          className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-bp-primary outline-none"
                          value={service.category}
                          onChange={(e) => handleServiceChange(service.id, 'category', e.target.value)}
                        >
                          <option value="">Selecione...</option>
                          {CATEGORIES_MOCK.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Nome do Serviço</Label>
                        <Input 
                          placeholder="Ex: Troca de fiação" 
                          className="h-12 border-gray-200"
                          value={service.title}
                          onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Valor Base (R$)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
                          <Input 
                            type="number"
                            className="h-12 pl-10 border-gray-200"
                            placeholder="0,00"
                            value={service.price || ''}
                            onChange={(e) => handleServiceChange(service.id, 'price', Number(e.target.value))}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Tempo Médio</Label>
                        <Input 
                          placeholder="Ex: 2 horas" 
                          className="h-12 border-gray-200"
                          value={service.duration}
                          onChange={(e) => handleServiceChange(service.id, 'duration', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button 
                  variant="outline" 
                  className="w-full h-12 border-dashed border-2 border-bp-primary text-bp-primary hover:bg-bp-surface font-bold gap-2"
                  onClick={addService}
                >
                  <Plus size={20} /> Adicionar outro serviço
                </Button>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 h-14 border-bp-outline-variant text-gray-500 font-bold gap-2"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft size={20} /> Voltar
                </Button>
                <Button 
                  className="flex-2 h-14 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold gap-2 shadow-lg transition-all"
                  onClick={handleFinalize}
                >
                  Finalizar Cadastro <CheckCircle2 size={20} />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
