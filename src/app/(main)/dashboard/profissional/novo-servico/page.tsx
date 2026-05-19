'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Image as ImageIcon, MapPin, Tag, DollarSign, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NovoServicoPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock save logic
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard/profissional');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full bg-white shadow-sm border border-slate-100 hover:bg-slate-50">
          <Link href="/dashboard/profissional">
            <ChevronLeft size={24} />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter">Divulgar Novo Serviço</h2>
          <p className="text-slate-500 font-bold">Preencha os detalhes para atrair mais clientes.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-bp-outline-variant bg-white rounded-3xl overflow-hidden shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6 pt-8">
              <CardTitle className="text-[#103569] font-black">Informações Básicas</CardTitle>
              <CardDescription className="font-bold">Detalhes principais do seu serviço.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">Título do Serviço</label>
                <Input placeholder="Ex: Reforma de Banheiros com Acabamento Fino" className="h-12 rounded-xl" required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">Categoria</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <Input placeholder="Ex: Construção Civil" className="h-12 pl-10 rounded-xl" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">Preço Sugerido</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f7941d]" size={16} />
                    <Input placeholder="Ex: A partir de R$ 800" className="h-12 pl-10 rounded-xl" required />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">Descrição do Serviço</label>
                <Textarea 
                  placeholder="Descreva em detalhes o que está incluso no serviço, materiais utilizados e prazos médios..." 
                  className="min-h-[150px] rounded-2xl p-4 resize-none"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-bp-outline-variant bg-white rounded-3xl overflow-hidden shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6 pt-8">
              <CardTitle className="text-[#103569] font-black">Localização</CardTitle>
              <CardDescription className="font-bold">Onde você realiza este serviço.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <Input placeholder="Ex: São Paulo e Grande ABC" className="h-12 pl-10 rounded-xl" required />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-bp-outline-variant bg-white rounded-3xl overflow-hidden shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6 pt-8">
              <CardTitle className="text-[#103569] font-black">Mídia</CardTitle>
              <CardDescription className="font-bold">Fotos do serviço.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              <div className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6 hover:bg-slate-50 hover:border-[#f7941d]/50 transition-all cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-white group-hover:text-[#f7941d] transition-all">
                  <ImageIcon size={24} />
                </div>
                <p className="mt-4 text-xs font-bold text-slate-400 group-hover:text-[#103569]">Clique para enviar ou arraste imagens</p>
                <p className="text-[10px] text-slate-300 mt-1 uppercase font-black">PNG, JPG até 5MB</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-square rounded-xl bg-slate-50 border border-slate-100 border-dashed"></div>
                <div className="aspect-square rounded-xl bg-slate-50 border border-slate-100 border-dashed"></div>
              </div>
            </CardContent>
          </Card>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-16 bg-[#103569] hover:bg-[#103569]/90 text-white rounded-3xl font-black text-lg shadow-xl shadow-[#103569]/20 flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save />}
            {loading ? "Salvando..." : "Publicar Serviço"}
          </Button>
          
          <p className="text-center text-[10px] text-slate-400 uppercase font-black tracking-widest">
            Ao publicar, seu serviço ficará visível imediatamente para clientes da sua região.
          </p>
        </div>
      </form>
    </div>
  );
}
