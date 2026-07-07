'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ChevronDown,
  MapPin,
  Calendar,
  Upload,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { getProfessionalDetails } from '@/app/actions/professionals';
import { createOrderAction } from '@/app/actions/orders';
import { getCurrentUserAction } from '@/app/actions/auth';

interface Endereco {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
}

function OrcamentoForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const profId = searchParams.get('profId') || '';

  const [professionalName, setProfessionalName] = useState<string>('');
  const [professionalSpecialty, setProfessionalSpecialty] = useState<string>('');
  const [userLoading, setUserLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [hasClientRole, setHasClientRole] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState<number | null>(null);

  // Form states
  const [description, setDescription] = useState('');
  const [serviceType, setServiceType] = useState('Residencial');
  const [urgency, setUrgency] = useState('Sem pressa');
  const [scheduledAt, setScheduledAt] = useState('');
  const [period, setPeriod] = useState('Manhã');
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
  const [submitLoading, setSubmitLoading] = useState(false);

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

  // Load user session and professional details
  useEffect(() => {
    async function loadSessionAndProf() {
      setUserLoading(true);
      const user = await getCurrentUserAction();
      if (!user) {
        setIsLogged(false);
        setHasClientRole(false);
        // Start countdown to redirect
        let count = 4;
        setRedirectTimer(count);
        const interval = setInterval(() => {
          count -= 1;
          setRedirectTimer(count);
          if (count <= 0) {
            clearInterval(interval);
            router.push('/login?callbackUrl=/orcamento?profId=' + profId);
          }
        }, 1000);
        setUserLoading(false);
        return;
      }

      setIsLogged(true);
      if (!user.hasClient) {
        setHasClientRole(false);
        setUserLoading(false);
        return;
      }

      setHasClientRole(true);

      if (profId) {
        const prof = await getProfessionalDetails(profId);
        if (prof) {
          setProfessionalName(prof.name);
          setProfessionalSpecialty(prof.categories?.[0] || prof.specialty || 'Profissional');
        }
      }
      setUserLoading(false);
    }

    loadSessionAndProf();
  }, [profId, router]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogged) return;
    if (!hasClientRole) {
      setToast({ message: 'Apenas usuários com perfil de Cliente podem solicitar orçamentos.', type: 'error' });
      return;
    }

    if (!profId) {
      setToast({ message: 'Por favor, selecione um profissional válido a partir da busca.', type: 'error' });
      return;
    }

    if (!description.trim()) {
      setToast({ message: 'Descreva detalhadamente o serviço necessário.', type: 'error' });
      return;
    }

    if (!endereco.cep || !endereco.logradouro || !endereco.numero || !endereco.cidade) {
      setToast({ message: 'Por favor, preencha todos os campos do endereço.', type: 'error' });
      return;
    }

    if (scheduledAt) {
      const dateObj = new Date(scheduledAt);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dateObj < today) {
        setToast({ message: 'A data agendada não pode ser no passado.', type: 'error' });
        return;
      }
    }

    setSubmitLoading(true);
    const fullAddress = `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}`;

    try {
      const res = await createOrderAction({
        professionalId: profId,
        serviceType,
        description,
        cep: endereco.cep,
        address: fullAddress,
        urgency,
        scheduledAt,
        period,
      });

      if (res.error) {
        setToast({ message: res.error, type: 'error' });
      } else {
        setToast({ message: 'Orçamento solicitado com sucesso! Redirecionando para a tela de pedidos...', type: 'success' });
        setTimeout(() => {
          router.push('/cliente/pedidos');
        }, 2000);
      }
    } catch (err: any) {
      console.error('[OrcamentoForm] Erro inesperado:', err);
      setToast({ message: 'Ocorreu um erro interno ao processar a solicitação. Tente novamente mais tarde.', type: 'error' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const fieldClass =
    'w-full bg-[#fefccf]/30 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#103569]/10 outline-none transition-all font-medium text-[#103569] placeholder:text-[#103569]/20';
  const labelClass = 'text-[10px] font-black text-[#103569] uppercase tracking-widest ml-1';

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#fefccf]/20 flex flex-col items-center justify-center font-sans">
        <Loader2 className="animate-spin text-[#103569] mb-4" size={40} />
        <p className="text-[#103569] font-bold">Verificando credenciais do projeto...</p>
      </div>
    );
  }

  // Se não estiver logado
  if (!isLogged) {
    return (
      <div className="min-h-screen bg-[#fefccf]/20 flex items-center justify-center font-sans px-6">
        <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-2xl max-w-lg w-full text-center space-y-6 border border-red-100 animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-3xl font-black text-[#103569] leading-tight">Acesso Restrito</h2>
          <p className="text-slate-600 font-semibold leading-relaxed">
            Você precisa estar logado com uma conta de <strong>Cliente</strong> para solicitar um orçamento.
          </p>
          <div className="bg-red-50/50 p-4 rounded-2xl border border-red-100">
            <p className="text-red-600 font-bold text-sm">
              Redirecionando para a tela de login em {redirectTimer} segundos...
            </p>
          </div>
          <button
            onClick={() => router.push('/login?callbackUrl=/orcamento?profId=' + profId)}
            className="w-full bg-[#103569] hover:bg-[#103569]/90 text-white py-4 rounded-2xl font-black transition-all shadow-md"
          >
            Ir para Login Agora
          </button>
        </div>
      </div>
    );
  }

  // Se estiver logado mas não for cliente (for profissional apenas)
  if (!hasClientRole) {
    return (
      <div className="min-h-screen bg-[#fefccf]/20 flex items-center justify-center font-sans px-6">
        <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-2xl max-w-lg w-full text-center space-y-6 border border-orange-100 animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-orange-500">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-3xl font-black text-[#103569] leading-tight">Perfil Profissional</h2>
          <p className="text-slate-600 font-semibold leading-relaxed">
            Profissionais não podem solicitar orçamentos para outros profissionais no ClickServiço. Acesse a plataforma como <strong>Cliente</strong> para utilizar essa função.
          </p>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-[#103569] hover:bg-[#103569]/90 text-white py-4 rounded-2xl font-black transition-all shadow-md"
          >
            Voltar para a Página Inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fefccf]/20 pt-12 pb-24 px-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 font-bold border ${
            toast.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
              : 'bg-red-50 text-red-800 border-red-100'
          }`}>
            {toast.type === 'success' ? <CheckCircle2 className="text-emerald-600" /> : <AlertTriangle className="text-red-500" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

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
              {professionalName ? (
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm mb-8">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Solicitando para:</p>
                  <p className="text-xl font-black text-[#103569] leading-none mb-1">{professionalName}</p>
                  <p className="text-xs font-bold text-[#f7941d]">{professionalSpecialty}</p>
                </div>
              ) : (
                <p className="text-lg text-[#103569]/60 leading-relaxed font-medium max-w-md">
                  Toda obra de sucesso começa com um plano calculado. Forneça sua visão e nossos profissionais construirão o cronograma detalhado para seu projeto.
                </p>
              )}
            </div>

            {/* Feature Card */}
            <div>
              <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm">
                <Clock className="text-[#103569] mb-4" size={24} />
                <h3 className="text-sm font-black text-[#103569] uppercase tracking-tight mb-2">Resposta Rápida</h3>
                <p className="text-[11px] text-[#103569]/50 font-bold leading-tight">Análise estrutural da sua solicitação em poucas horas.</p>
              </div>
            </div>
          </div>

          {/* --- COLUNA DIREITA: O FORMULÁRIO --- */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-2xl shadow-blue-900/5 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-12">

                {/* Section 1: Especificação do Projeto */}
                <div className="space-y-8">
                  <div className="flex gap-4 items-start">
                    <div className="w-1.5 h-10 bg-[#f7941d] rounded-full" />
                    <div>
                      <h2 className="text-2xl font-black text-[#103569] tracking-tight">Especificação do Projeto</h2>
                      <p className="text-xs text-[#103569]/40 font-bold uppercase tracking-widest mt-1">Escreva o que precisa ser feito.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className={labelClass}>Descrição do Projeto</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full bg-[#fefccf]/30 border-none rounded-2xl p-5 focus:ring-2 focus:ring-[#103569]/10 outline-none transition-all min-h-[140px] placeholder:text-[#103569]/20 font-medium text-[#103569]"
                        placeholder="Descreva detalhadamente sua visão, requisitos específicos do serviço ou reparo..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={labelClass}>Tipo de Projeto</label>
                      <div className="relative">
                        <select
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                          className={`${fieldClass} appearance-none cursor-pointer`}
                        >
                          <option value="Residencial">Residencial</option>
                          <option value="Comercial">Comercial</option>
                          <option value="Industrial">Industrial</option>
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
                          required
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
                          required
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
                          required
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
                        required
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
                          required
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
                          required
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
                      <h2 className="text-2xl font-black text-[#103569] tracking-tight">Prazo e Urgência</h2>
                      <p className="text-xs text-[#103569]/40 font-bold uppercase tracking-widest mt-1">Quando você precisa do serviço?</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className={labelClass}>Data Estimada</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#103569]/30" size={18} />
                        <input
                          type="date"
                          value={scheduledAt}
                          onChange={(e) => setScheduledAt(e.target.value)}
                          className={`${fieldClass} pl-12`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={labelClass}>Turno de Preferência</label>
                      <div className="relative">
                        <select
                          value={period}
                          onChange={(e) => setPeriod(e.target.value)}
                          className={`${fieldClass} appearance-none cursor-pointer`}
                        >
                          <option value="Manhã">Manhã</option>
                          <option value="Tarde">Tarde</option>
                          <option value="Noite">Noite</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#103569]/30 pointer-events-none" size={18} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={labelClass}>Urgência</label>
                      <div className="relative">
                        <select
                          value={urgency}
                          onChange={(e) => setUrgency(e.target.value)}
                          className={`${fieldClass} appearance-none cursor-pointer`}
                        >
                          <option value="Urgente">Urgente (O mais rápido possível)</option>
                          <option value="Dentro de 15 dias">Dentro de 15 dias</option>
                          <option value="Sem pressa">Sem pressa / Flexível</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#103569]/30 pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="w-full bg-[#103569] hover:bg-[#103569]/90 text-white py-6 rounded-3xl font-black text-xl transition-all shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-3 group disabled:opacity-50"
                  >
                    {submitLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={24} />
                        Processando Orçamento...
                      </>
                    ) : (
                      <>
                        Solicitar Orçamento
                        <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-[#103569]/40 font-bold uppercase tracking-widest mt-6">
                    Ao enviar, você concorda em compartilhar sua solicitação com o profissional selecionado.
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

export default function OrcamentoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fefccf]/20 flex flex-col items-center justify-center font-sans">
        <Loader2 className="animate-spin text-[#103569] mb-4" size={40} />
        <p className="text-[#103569] font-bold">Carregando formulário de orçamento...</p>
      </div>
    }>
      <OrcamentoForm />
    </Suspense>
  );
}
