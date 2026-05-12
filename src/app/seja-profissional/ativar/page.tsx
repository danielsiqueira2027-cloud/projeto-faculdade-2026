'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, CheckCircle2, ChevronRight, Star, ShieldCheck, MapPin, Toolbox, Zap } from 'lucide-react';

const CATEGORIES = [
  { id: 'eletrica', label: 'Elétrica', icon: <Zap size={18} /> },
  { id: 'hidraulica', label: 'Hidráulica', icon: <Toolbox size={18} /> },
  { id: 'pintura', label: 'Pintura', icon: <Star size={18} /> },
  { id: 'construcao', label: 'Construção', icon: <Briefcase size={18} /> },
  { id: 'limpeza', label: 'Limpeza', icon: <CheckCircle2 size={18} /> },
];

export default function AtivarPerfilProPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      router.push('/login');
    }
  }, [router]);

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem('userRole', 'professional');
      
      // Update user object if needed
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        userData.role = 'professional';
        localStorage.setItem('user', JSON.stringify(userData));
      }

      setLoading(false);
      router.push('/dashboard/profissional');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fdfaf2] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#103569] text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
            <ShieldCheck size={14} />
            Verificação de Profissional
          </div>
          <h1 className="text-4xl font-black text-[#103569] tracking-tighter">
            Olá, {user?.name || 'Daniel Siqueira'}! 👋
          </h1>
          <p className="text-slate-500 font-bold max-w-lg mx-auto">
            Falta pouco para você começar a faturar. Preencha seus dados profissionais para ativar seu perfil.
          </p>
        </div>

        <form onSubmit={handleActivate} className="space-y-8">
          <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader className="bg-slate-50 border-b border-slate-100 p-10">
              <CardTitle className="text-2xl font-black text-[#103569]">Suas Especialidades</CardTitle>
              <CardDescription className="font-bold">Selecione as categorias que você domina.</CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all group ${
                      selectedCategories.includes(cat.id)
                        ? 'border-[#f7941d] bg-[#f7941d]/5 text-[#f7941d]'
                        : 'border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600'
                    }`}
                  >
                    <div className={`p-3 rounded-2xl transition-all ${
                      selectedCategories.includes(cat.id) ? 'bg-[#f7941d] text-white' : 'bg-slate-50 text-slate-400 group-hover:scale-110'
                    }`}>
                      {cat.icon}
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest">{cat.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">Fale um pouco sobre sua experiência</label>
                  <Textarea 
                    placeholder="Ex: Trabalho há 10 anos com reformas residenciais e pintura de alto padrão..." 
                    className="min-h-[120px] rounded-2xl p-4 resize-none border-slate-100 bg-slate-50/50 focus:bg-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">Cidade / Região de Atuação</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input placeholder="Ex: São Paulo, SP" className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">Tempo de Experiência</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input placeholder="Ex: 5 anos" className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50" required />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center gap-6">
            <Button 
              type="submit" 
              disabled={loading || selectedCategories.length === 0}
              className="w-full max-w-md h-16 bg-[#103569] hover:bg-[#103569]/90 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-[#103569]/20 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  Ativando Perfil...
                </>
              ) : (
                <>
                  Ativar Meu Perfil Profissional
                  <ChevronRight size={24} />
                </>
              )}
            </Button>
            
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] text-center">
              Ao ativar, você concorda com os termos de uso do prestador de serviço.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
