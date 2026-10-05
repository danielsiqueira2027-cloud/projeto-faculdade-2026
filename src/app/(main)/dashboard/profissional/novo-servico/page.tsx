'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Tag, DollarSign, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import {
  createServiceAction,
  updateServiceAction,
  getCategoriesAction,
  getServiceByIdAction,
} from '@/app/actions/services';
import { CitySelector } from '@/components/common/CitySelector';
import {
  ServiceImageDropzone,
  UploadedImageItem,
} from '@/components/profissional/ServiceImageDropzone';

function NovoServicoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  // ID persistente para upload de imagens antes de salvar o serviço
  const [newServiceId] = useState<string>(() => crypto.randomUUID());
  const activeServiceId = editId || newServiceId;

  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    priceText: '',
    description: '',
    city: '',
    state: '',
    location: '',
  });

  const [images, setImages] = useState<UploadedImageItem[]>([]);

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
              city: service.city || '',
              state: service.state || '',
              location: service.location || '',
            });

            if (service.images && service.images.length > 0) {
              setImages(
                service.images.map((img) => ({
                  id: img.id,
                  storagePath: img.storagePath,
                  url: img.url,
                  position: img.position,
                }))
              );
            }
          }
        }
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      } finally {
        setInitLoading(false);
      }
    }
    loadData();
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isUploadingImages) {
      alert('Aguarde o envio de todas as imagens antes de salvar.');
      return;
    }

    if (!formData.city && !formData.location) {
      alert('Por favor, informe a cidade e o estado onde realiza este serviço.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        categoryId: formData.categoryId,
        priceText: formData.priceText,
        description: formData.description,
        city: formData.city,
        state: formData.state,
        location: formData.location,
        images: images.map((img, idx) => ({
          storagePath: img.storagePath,
          position: idx,
        })),
      };

      if (editId) {
        const res = await updateServiceAction(editId, payload);
        if (res.error) {
          alert(res.error);
          return;
        }
      } else {
        const res = await createServiceAction({
          id: activeServiceId,
          ...payload,
        });
        if (res.error) {
          alert(res.error);
          return;
        }
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
        <p className="mt-4 font-bold text-slate-500">Carregando dados do serviço...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="rounded-full bg-white shadow-sm border border-slate-100 hover:bg-slate-50"
        >
          <Link href="/dashboard/profissional/meus-servicos">
            <ChevronLeft size={24} />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter">
            {editId ? 'Editar Serviço' : 'Divulgar Novo Serviço'}
          </h2>
          <p className="text-slate-500 font-bold">
            {editId ? 'Atualize os dados e fotos do seu serviço.' : 'Preencha os detalhes para atrair mais clientes.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Card Informações Básicas */}
          <Card className="border-bp-outline-variant bg-white rounded-3xl overflow-hidden shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6 pt-8">
              <CardTitle className="text-[#103569] font-black">Informações Básicas</CardTitle>
              <CardDescription className="font-bold">Detalhes principais do seu serviço.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest block">
                  Título do Serviço <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Reforma de Banheiros com Acabamento Fino"
                  className="h-12 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest block">
                    Categoria <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Tag
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
                      size={16}
                    />
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-white focus:ring-2 focus:ring-[#f7941d] focus:outline-none appearance-none font-semibold text-slate-700"
                      required
                    >
                      <option value="" disabled>
                        Selecione uma categoria...
                      </option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest block">
                    Preço Sugerido <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f7941d]"
                      size={16}
                    />
                    <Input
                      value={formData.priceText}
                      onChange={(e) => setFormData({ ...formData, priceText: e.target.value })}
                      placeholder="Ex: A partir de R$ 800"
                      className="h-12 pl-10 rounded-xl"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest block">
                  Descrição do Serviço <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva em detalhes o que está incluso no serviço, materiais utilizados e prazos médios..."
                  className="min-h-[140px] rounded-2xl p-4 resize-none"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Card Localização Estruturada */}
          <Card className="border-bp-outline-variant bg-white rounded-3xl overflow-hidden shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6 pt-8">
              <CardTitle className="text-[#103569] font-black">Localização</CardTitle>
              <CardDescription className="font-bold">
                Onde você realiza este serviço (Estado e Município).
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <CitySelector
                valueCity={formData.city}
                valueState={formData.state}
                legacyLocation={formData.location}
                onChange={(city, state) => {
                  setFormData((prev) => ({
                    ...prev,
                    city,
                    state,
                    location: city && state ? `${city} - ${state}` : prev.location,
                  }));
                }}
                required
              />
            </CardContent>
          </Card>
        </div>

        {/* Coluna Lateral: Mídia e Publicação */}
        <div className="space-y-6">
          <Card className="border-bp-outline-variant bg-white rounded-3xl overflow-hidden shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6 pt-8">
              <CardTitle className="text-[#103569] font-black">Fotos do Serviço</CardTitle>
              <CardDescription className="font-bold text-xs">
                Adicione fotos reais dos seus trabalhos para atrair mais clientes.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ServiceImageDropzone
                serviceId={activeServiceId}
                images={images}
                onChange={setImages}
                onUploadingChange={setIsUploadingImages}
                maxFiles={5}
                disabled={loading}
              />
            </CardContent>
          </Card>

          <Button
            type="submit"
            disabled={loading || isUploadingImages}
            className="w-full h-16 bg-[#103569] hover:bg-[#103569]/90 text-white rounded-3xl font-black text-lg shadow-xl shadow-[#103569]/20 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : isUploadingImages ? (
              <Loader2 className="animate-spin text-[#f7941d]" />
            ) : (
              <Save />
            )}
            {loading
              ? 'Salvando...'
              : isUploadingImages
              ? 'Enviando Fotos...'
              : editId
              ? 'Atualizar Serviço'
              : 'Publicar Serviço'}
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
    <Suspense
      fallback={
        <div className="p-20 text-center">
          <Loader2 className="w-10 h-10 animate-spin mx-auto text-blue-900" />
        </div>
      }
    >
      <NovoServicoForm />
    </Suspense>
  );
}
