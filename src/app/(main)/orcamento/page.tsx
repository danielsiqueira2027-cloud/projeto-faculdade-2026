'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  MapPin,
  Calendar,
  Upload,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface Endereco {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export default function OrcamentoPage() {
  const [endereco, setEndereco] = useState<Endereco>({
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
  });
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState('');

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mascara: 00000-000
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
    'w-full bg-[#fefccf]/30 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#103569]/10 outline-none transition-all font-medium text-[#103569] placeholder:text-[#103569]/20';
  const labelClass = 'text-[10px] font-black text-[#103569] uppercase tracking-widest ml-1';

  return (
    <div className="min-h-screen bg-[#fefccf]/20 pt-12 pb-24 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* --- COLUNA ESQUERDA: HEADER & INFO --- */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="inline-block bg-[#103569]/5 text-[#103569] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#103569]/10 mb-6">
                FASE 01: PLANEJAMENTO DE PRECISÃO
              </span>
              <h1 className="text-6xl md:text-7xl font-black text-[#103569] leading-[0.9] tracking-tighter mb-8">
                Peça um<br/>
                <span className="text-[#f7941d]">Orçamento</span><br/>
                de Precisão.
              </h1>
              <p className="text-lg text-[#103569]/60 leading-relaxed font-medium max-w-md">
                Toda obra de sucesso começa com um plano calculado. Forneça sua visão e nossos profissionais construirão o cronograma detalhado para seu projeto.
              </p>
            </div>

            {/* Imagem Blueprint Style */}
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-white aspect-video bg-[#103569]">
              <img
                src="https://images.unsplash.com/photo-1503387762-592dee58c460?q=80&w=1000&auto=format&fit=crop"
                alt="Blueprint Design"
                className="w-full h-full object-cover opacity-40 mix-blend-overlay"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-white/20 animate-pulse flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-2 border-white/40" />
                </div>
              </div>
            </div>

            {/* Feature Card - somente Resposta em 48h */}
            <div>
              <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm">
                <Clock className="text-[#103569] mb-4" size={24} />
                <h3 className="text-sm font-black text-[#103569] uppercase tracking-tight mb-2">Resposta em 48h</h3>
                <p className="text-[11px] text-[#103569]/50 font-bold leading-tight">Análise estrutural rápida da sua solicitação inicial.</p>
              </div>
            </div>
          </div>

          {/* --- COLUNA DIREITA: O FORMULÁRIO --- */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-2xl shadow-blue-900/5 border border-gray-100">
              <form className="space-y-12">

                {/* Section 1: Especificação do Projeto */}
                <div className="space-y-8">
                  <div className="flex gap-4 items-start">
                    <div className="w-1.5 h-10 bg-[#f7941d] rounded-full" />
                    <div>
                      <h2 className="text-2xl font-black text-[#103569] tracking-tight">Especificação do Projeto</h2>
                      <p className="text-xs text-[#103569]/40 font-bold uppercase tracking-widest mt-1">Defina a intenção estrutural da sua obra.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className={labelClass}>Descrição do Projeto</label>
                      <textarea
                        className="w-full bg-[#fefccf]/30 border-none rounded-2xl p-5 focus:ring-2 focus:ring-[#103569]/10 outline-none transition-all min-h-[140px] placeholder:text-[#103569]/20 font-medium text-[#103569]"
                        placeholder="Descreva sua visão, estilos arquitetônicos específicos ou requisitos estruturais..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={labelClass}>Tipo de Projeto</label>
                      <div className="relative">
                        <select className={`${fieldClass} appearance-none cursor-pointer`}>
                          <option>Residencial</option>
                          <option>Comercial</option>
                          <option>Industrial</option>
                          <option>Reforma</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#103569]/30 pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Endereço */}
                <div className="space-y-8">
                  <div className="flex gap-4 items-start">
                    <div className="w-1.5 h-10 bg-[#f7941d] rounded-full" />
                    <div>
                      <h2 className="text-2xl font-black text-[#103569] tracking-tight">Endereço do Serviço</h2>
                      <p className="text-xs text-[#103569]/40 font-bold uppercase tracking-widest mt-1">Localização onde o serviço será realizado.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* CEP */}
                    <div className="space-y-2">
                      <label className={labelClass}>CEP</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#103569]/30" size={18} />
                        <input
                          type="text"
                          value={endereco.cep}
                          onChange={handleCepChange}
                          placeholder="00000-000"
                          maxLength={9}
                          className={`${fieldClass} pl-12`}
                        />
                        {cepLoading && (
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-[#103569]/50 font-bold">Buscando...</span>
                        )}
                      </div>
                      {cepError && <p className="text-[11px] text-red-500 ml-1 font-bold">{cepError}</p>}
                    </div>

                    {/* Logradouro + Número */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-2">
                        <label className={labelClass}>Logradouro</label>
                        <input
                          type="text"
                          value={endereco.logradouro}
                          onChange={(e) => setEndereco((p) => ({ ...p, logradouro: e.target.value }))}
                          placeholder="Rua, Av., Travessa..."
                          className={fieldClass}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={labelClass}>Número</label>
                        <input
                          type="text"
                          value={endereco.numero}
                          onChange={(e) => setEndereco((p) => ({ ...p, numero: e.target.value }))}
                          placeholder="Ex: 123"
                          className={fieldClass}
                        />
                      </div>
                    </div>

                    {/* Bairro */}
                    <div className="space-y-2">
                      <label className={labelClass}>Bairro</label>
                      <input
                        type="text"
                        value={endereco.bairro}
                        onChange={(e) => setEndereco((p) => ({ ...p, bairro: e.target.value }))}
                        placeholder="Bairro"
                        className={fieldClass}
                      />
                    </div>

                    {/* Cidade + Estado */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-2">
                        <label className={labelClass}>Cidade</label>
                        <input
                          type="text"
                          value={endereco.cidade}
                          onChange={(e) => setEndereco((p) => ({ ...p, cidade: e.target.value }))}
                          placeholder="Cidade"
                          className={fieldClass}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={labelClass}>Estado (UF)</label>
                        <input
                          type="text"
                          value={endereco.estado}
                          onChange={(e) => setEndereco((p) => ({ ...p, estado: e.target.value }))}
                          placeholder="SP"
                          maxLength={2}
                          className={`${fieldClass} uppercase`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Prazo */}
                <div className="space-y-8">
                  <div className="flex gap-4 items-start">
                    <div className="w-1.5 h-10 bg-[#f7941d] rounded-full" />
                    <div>
                      <h2 className="text-2xl font-black text-[#103569] tracking-tight">Prazo</h2>
                      <p className="text-xs text-[#103569]/40 font-bold uppercase tracking-widest mt-1">Quando você precisa do serviço?</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className={labelClass}>Data Estimada</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#103569]/30" size={18} />
                      <input
                        type="date"
                        className={`${fieldClass} pl-12`}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Documentação */}
                <div className="space-y-8">
                  <div className="flex gap-4 items-start">
                    <div className="w-1.5 h-10 bg-[#f7941d] rounded-full" />
                    <div>
                      <h2 className="text-2xl font-black text-[#103569] tracking-tight">Documentação</h2>
                      <p className="text-xs text-[#103569]/40 font-bold uppercase tracking-widest mt-1">Upload de fotos, plantas ou referências.</p>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-[#103569]/10 rounded-[30px] p-12 flex flex-col items-center justify-center bg-[#fefccf]/10 hover:bg-[#fefccf]/20 transition-all cursor-pointer group">
                    <div className="w-16 h-16 bg-[#103569]/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="text-[#103569]" size={28} />
                    </div>
                    <p className="text-sm font-black text-[#103569] mb-1">Arraste os arquivos aqui ou clique para buscar</p>
                    <p className="text-[10px] font-bold text-[#103569]/40 uppercase tracking-widest">PDF, JPG ou PNG (Max 50MB)</p>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-6">
                  <button className="w-full bg-[#103569] hover:bg-[#103569]/90 text-white py-6 rounded-3xl font-black text-xl transition-all shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-3 group">
                    Solicitar Orçamento
                    <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                  <p className="text-center text-[10px] text-[#103569]/40 font-bold uppercase tracking-widest mt-6">
                    Ao enviar, você concorda com nossos termos de compromisso de projeto.
                  </p>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
