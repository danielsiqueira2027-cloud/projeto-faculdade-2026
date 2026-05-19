'use client';

import React, { useState, useActionState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Briefcase, CheckCircle2, ChevronRight, ShieldCheck, MapPin,
  Wrench, Zap, Paintbrush, Hammer, Layers, Grid2x2, Scissors, Anchor, Phone, CreditCard
} from 'lucide-react';
import { ativarProfissionalAction } from '@/app/actions/auth';

const CATEGORIES = [
  { id: 'encanador',   label: 'Encanador',   icon: <Anchor  size={16} /> },
  { id: 'pintor',      label: 'Pintor',       icon: <Paintbrush size={16} /> },
  { id: 'eletricista', label: 'Eletricista',  icon: <Zap     size={16} /> },
  { id: 'pedreiro',    label: 'Pedreiro',     icon: <Hammer  size={16} /> },
  { id: 'carpinteiro', label: 'Carpinteiro',  icon: <Wrench  size={16} /> },
  { id: 'vidraceiro',  label: 'Vidraceiro',   icon: <Grid2x2 size={16} /> },
  { id: 'gesseiro',    label: 'Gesseiro',     icon: <Layers  size={16} /> },
  { id: 'azulejista',  label: 'Azulejista',   icon: <Scissors size={16} /> },
  { id: 'serralheiro', label: 'Serralheiro',  icon: <Briefcase size={16} /> },
];

interface Endereco {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export default function AtivarPerfilProPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [experiencia, setExperiencia] = useState('');
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState('');
  const [endereco, setEndereco] = useState<Endereco>({
    cep: '', logradouro: '', numero: '', bairro: '', cidade: '', estado: '',
  });

  const [state, action, pending] = useActionState(ativarProfissionalAction, null);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleExperiencia = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExperiencia(e.target.value);
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 8);
    const masked = raw.length > 5 ? `${raw.slice(0, 5)}-${raw.slice(5)}` : raw;
    setEndereco((prev) => ({ ...prev, cep: masked }));
    setCepError('');

    if (raw.length === 8) {
      setCepLoading(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
        const data = await res.json();
        if (data.erro) {
          setCepError('CEP não encontrado.');
          setEndereco((prev) => ({ ...prev, logradouro: '', bairro: '', cidade: '', estado: '' }));
        } else {
          setEndereco((prev) => ({
            ...prev,
            logradouro: data.logradouro || '',
            bairro:     data.bairro || '',
            cidade:     data.localidade || '',
            estado:     data.uf || '',
          }));
        }
      } catch {
        setCepError('Erro ao buscar CEP.');
      } finally {
        setCepLoading(false);
      }
    }
  };

  const fieldClass =
    'w-full rounded-2xl border-slate-100 bg-slate-50/50 focus:ring-[#f7941d] h-14 px-4';

  return (
    <div className="min-h-screen bg-[#fdfaf2] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#103569] text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
            <ShieldCheck size={14} />
            Verificação de Profissional
          </div>
          <h1 className="text-4xl font-black text-[#103569] tracking-tighter">
            Ativar Perfil Profissional 👋
          </h1>
          <p className="text-slate-500 font-bold max-w-lg mx-auto">
            Preencha seus dados profissionais para começar a receber orçamentos.
          </p>
        </div>

        {state?.error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold px-6 py-4 rounded-3xl text-center">
            {state.error}
          </div>
        )}

        <form action={action} className="space-y-8">
          {/* Hidden input for categories */}
          <input type="hidden" name="categories" value={JSON.stringify(selectedCategories)} />

          {/* Especialidades */}
          <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader className="bg-slate-50 border-b border-slate-100 p-10">
              <CardTitle className="text-2xl font-black text-[#103569]">Suas Especialidades</CardTitle>
              <CardDescription className="font-bold">Selecione todas as categorias que você domina.</CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-8">

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all group ${
                      selectedCategories.includes(cat.id)
                        ? 'border-[#f7941d] bg-[#f7941d]/5 text-[#f7941d]'
                        : 'border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600'
                    }`}
                  >
                    <div className={`p-2 rounded-xl transition-all ${
                      selectedCategories.includes(cat.id) ? 'bg-[#f7941d] text-white' : 'bg-slate-50 text-slate-400 group-hover:scale-110'
                    }`}>
                      {cat.icon}
                    </div>
                    <span className="font-black text-[10px] uppercase tracking-wide leading-tight text-center">{cat.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">
                      CPF / CNPJ
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input
                        name="cpf"
                        placeholder="000.000.000-00"
                        className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">
                      Telefone Profissional
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input
                        name="phone"
                        placeholder="(00) 00000-0000"
                        className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">
                    Bio / Experiência (Resumo)
                  </label>
                  <Textarea
                    name="bio"
                    placeholder="Ex: Trabalho há 10 anos com reformas residenciais e pintura de alto padrão..."
                    className="min-h-[120px] rounded-2xl p-4 resize-none border-slate-100 bg-slate-50/50 focus:bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">
                    Tempo de Experiência
                  </label>
                  <p className="text-[10px] text-slate-400 ml-1">
                    💡 Se tiver menos de 1 ano, informe como: <strong>0.6 meses</strong>, <strong>0.3 meses</strong>, etc.
                  </p>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <Input
                      name="experiencia"
                      value={experiencia}
                      onChange={handleExperiencia}
                      placeholder="Ex: 5 anos  |  Menos de 1 ano: 0.6 meses"
                      className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50"
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader className="bg-slate-50 border-b border-slate-100 p-10">
              <CardTitle className="text-2xl font-black text-[#103569]">Endereço de Atuação</CardTitle>
              <CardDescription className="font-bold">Informe onde você atende. O CEP preenche os campos automaticamente.</CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-4">

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">CEP</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <Input
                    name="cep"
                    value={endereco.cep}
                    onChange={handleCepChange}
                    placeholder="00000-000"
                    maxLength={9}
                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50"
                    required
                  />
                  {cepLoading && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold">
                      Buscando...
                    </span>
                  )}
                </div>
                {cepError && <p className="text-[11px] text-red-500 ml-1 font-bold">{cepError}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">Logradouro</label>
                  <Input
                    name="logradouro"
                    value={endereco.logradouro}
                    onChange={(e) => setEndereco((p) => ({ ...p, logradouro: e.target.value }))}
                    placeholder="Rua, Av., Travessa..."
                    className={fieldClass}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">Número</label>
                  <Input
                    name="numero"
                    value={endereco.numero}
                    onChange={(e) => setEndereco((p) => ({ ...p, numero: e.target.value }))}
                    placeholder="123"
                    className={fieldClass}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">Bairro</label>
                <Input
                  name="bairro"
                  value={endereco.bairro}
                  onChange={(e) => setEndereco((p) => ({ ...p, bairro: e.target.value }))}
                  placeholder="Bairro"
                  className={fieldClass}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">Cidade</label>
                  <Input
                    name="cidade"
                    value={endereco.cidade}
                    onChange={(e) => setEndereco((p) => ({ ...p, cidade: e.target.value }))}
                    placeholder="Cidade"
                    className={fieldClass}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">UF</label>
                  <Input
                    name="estado"
                    value={endereco.estado}
                    onChange={(e) => setEndereco((p) => ({ ...p, estado: e.target.value.toUpperCase() }))}
                    placeholder="SP"
                    maxLength={2}
                    className={fieldClass}
                    required
                  />
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex flex-col items-center gap-6">
            <Button
              type="submit"
              disabled={pending || selectedCategories.length === 0}
              className="w-full max-w-md h-16 bg-[#103569] hover:bg-[#103569]/90 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-[#103569]/20 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
            >
              {pending ? (
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
