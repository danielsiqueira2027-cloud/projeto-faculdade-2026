'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Image as ImageIcon, MapPin, Tag, DollarSign, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createServiceAction, updateServiceAction, getCategoriesAction, getServiceByIdAction } from '@/app/actions/services';

function NovoServicoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    priceText: '',
    description: '',
    location: '',
    imageUrls: [] as string[]
  });

  useEffect(() => {
    async function loadData() {
      try {
        const cats = await getCategoriesAction();
        setCategories(cats);

        if (editId) {
          const service = await getServiceByIdAction(editId);
          if (service) {
            setFormData({
              title: service.title,
              categoryId: service.categoryId || '',
              priceText: service.priceText || '',
              description: service.description || '',
              location: service.location || '',
              imageUrls: ((service.imageUrls as string[]) || [])
            });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setInitLoading(false);
      }
    }
    loadData();
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        await updateServiceAction(editId, formData);
      } else {
        await createServiceAction(formData);
      }
      router.push('/dashboard/profissional/meus-servicos');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar serviço. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (initLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin w-10 h-10 text-[#103569]" />
        <p className="mt-4 font-bold text-slate-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full bg-white shadow-sm border border-slate-100 hover:bg-slate-50">
          <Link href="/dashboard/profissional/meus-servicos">
            <ChevronLeft size={24} />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter">
            {editId ? 'Editar Serviço' : 'Divulgar Novo Serviço'}
          </h2>
          <p className="text-slate-500 font-bold">
            {editId ? 'Atualize os dados do seu serviço.' : 'Preencha os detalhes para atrair mais clientes.'}
          </p>
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
                <Input 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Reforma de Banheiros com Acabamento Fino" 
                  className="h-12 rounded-xl" 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">Categoria</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
                    <select 
                      value={formData.categoryId}
                      onChange={e => setFormData({...formData, categoryId: e.target.value})}
                      className="w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-background/50 focus:ring-2 focus:ring-[#f7941d] focus:outline-none appearance-none"
                      required
                    >
                      <option value="" disabled>Selecione uma categoria...</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">Preço Sugerido</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f7941d]" size={16} />
                    <Input 
                      value={formData.priceText}
                      onChange={e => setFormData({...formData, priceText: e.target.value})}
                      placeholder="Ex: A partir de R$ 800" 
                      className="h-12 pl-10 rounded-xl" 
                      required 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">Descrição do Serviço</label>
                <Textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
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
                <Input 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  placeholder="Ex: São Paulo e Grande ABC" 
                  className="h-12 pl-10 rounded-xl" 
                  required 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-bp-outline-variant bg-white rounded-3xl overflow-hidden shadow-sm opacity-60">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6 pt-8">
              <CardTitle className="text-[#103569] font-black">Mídia</CardTitle>
              <CardDescription className="font-black text-slate-400 uppercase tracking-widest text-xs">Upload de Imagens Em Breve</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-4 pointer-events-none">
              <div className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6 bg-slate-50">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                  <ImageIcon size={24} />
                </div>
                <p className="mt-4 text-xs font-bold text-slate-400">Recurso de upload em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-16 bg-[#103569] hover:bg-[#103569]/90 text-white rounded-3xl font-black text-lg shadow-xl shadow-[#103569]/20 flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save />}
            {loading ? "Salvando..." : (editId ? 'Atualizar Serviço' : 'Publicar Serviço')}
          </Button>
          
          <p className="text-center text-[10px] text-slate-400 uppercase font-black tracking-widest">
            Ao publicar, seu serviço ficará visível imediatamente para clientes da sua região.
          </p>
        </div>
      </form>
    </div>
  );
}

export default function NovoServicoPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-blue-900" /></div>}>
      <NovoServicoForm />
    </Suspense>
  );
}
