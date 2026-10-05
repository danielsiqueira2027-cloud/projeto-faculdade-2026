'use client';

import React, { useState, useActionState, useEffect, useRef, startTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Briefcase, ChevronRight, ShieldCheck, MapPin,
  Wrench, Zap, Paintbrush, Hammer, Layers, Grid2x2, Scissors, Anchor, Phone, CreditCard,
  Loader2, AlertCircle
} from 'lucide-react';
import { ativarProfissionalAction } from '@/app/actions/auth';
import { buscarCnpjAction } from '@/app/actions/cnpj';
import { mascararCpfCnpj, mascararTelefone, validarCNPJ } from '@/lib/validators';

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

interface AtivarPerfilProFormProps {
  initialPhone?: string;
}

// Ordem visual dos campos para scroll e foco após validação
const FIELD_ORDER = [
  'categories',
  'cpf',
  'phone',
  'bio',
  'experiencia',
  'cep',
  'logradouro',
  'numero',
  'bairro',
  'cidade',
  'estado',
];

export default function AtivarPerfilProForm({ initialPhone = '' }: AtivarPerfilProFormProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [fields, setFields] = useState({ cpf: '', phone: initialPhone, bio: '', experiencia: '' });
  const { cpf, phone, bio, experiencia } = fields;
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState('');
  const [endereco, setEndereco] = useState<Endereco>({
    cep: '', logradouro: '', numero: '', bairro: '', cidade: '', estado: '',
  });

  // Estado de erros locais para limpeza em tempo real ao digitar
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Estados para consulta de CNPJ via BrasilAPI
  const [cnpjLoading, setCnpjLoading] = useState(false);
  const [cnpjMessage, setCnpjMessage] = useState<string | null>(null);
  const [cnpjAvisoPreenchido, setCnpjAvisoPreenchido] = useState(false);
  const lastSearchedCnpjRef = useRef<string>('');
  // Ref espelho de endereco — sempre atual, sem closure stale
  const enderecoRef = useRef<Endereco>({ cep: '', logradouro: '', numero: '', bairro: '', cidade: '', estado: '' });

  const [state, action, pending] = useActionState(ativarProfissionalAction, null);

  // Mantém enderecoRef sincronizado com o estado (nunca durante o render)
  useEffect(() => {
    enderecoRef.current = endereco;
  }, [endereco]);

  // Sincroniza e preserva os campos preenchidos caso o servidor retorne erros
  useEffect(() => {
    startTransition(() => {
      if (state?.fields) {
        setFields((prev) => ({
          cpf: state.fields?.cpf !== undefined ? state.fields.cpf : prev.cpf,
          phone: state.fields?.phone !== undefined ? mascararTelefone(state.fields.phone) : prev.phone,
          bio: state.fields?.bio !== undefined ? state.fields.bio : prev.bio,
          experiencia: state.fields?.experiencia !== undefined ? state.fields.experiencia : prev.experiencia,
        }));
        if (state.fields.categories) {
          try {
            const parsed = JSON.parse(state.fields.categories);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setSelectedCategories(parsed);
            }
          } catch {
            // Mantém as atuais se o parse falhar
          }
        }
        setEndereco((prev) => ({
          ...prev,
          cep: state.fields?.cep !== undefined ? state.fields.cep : prev.cep,
          logradouro: state.fields?.logradouro !== undefined ? state.fields.logradouro : prev.logradouro,
          numero: state.fields?.numero !== undefined ? state.fields.numero : prev.numero,
          bairro: state.fields?.bairro !== undefined ? state.fields.bairro : prev.bairro,
          cidade: state.fields?.cidade !== undefined ? state.fields.cidade : prev.cidade,
          estado: state.fields?.estado !== undefined ? state.fields.estado : prev.estado,
        }));
      }

      if (state?.fieldErrors) {
        setErrors(state.fieldErrors);
      } else {
        setErrors({});
      }
    });

    // Rola até o primeiro campo com erro na ordem visual da tela e dá foco
    // (efeito colateral no DOM — fica fora do startTransition)
    if (state?.fieldErrors) {
      const firstErrorKey = FIELD_ORDER.find((key) => state.fieldErrors?.[key]);
      if (firstErrorKey) {
        const el = document.getElementById(`field-${firstErrorKey}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            if (typeof (el as HTMLElement).focus === 'function') {
              (el as HTMLElement).focus();
            }
          }, 150);
        }
      }
    }
  }, [state]);

  // Função para limpar o erro de um campo específico ao ser editado
  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    clearError('categories');
  };

  const handleExperiencia = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, experiencia: e.target.value }));
    clearError('experiencia');
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, bio: e.target.value }));
    clearError('bio');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, phone: mascararTelefone(e.target.value) }));
    clearError('phone');
  };

  // Consulta automática de CNPJ ao atingir 14 dígitos válidos
  const handleCpfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = mascararCpfCnpj(e.target.value);
    setFields((prev) => ({ ...prev, cpf: masked }));
    clearError('cpf');
    setCnpjMessage(null);

    const digits = masked.replace(/\D/g, '');

    // Consulta somente quando for CNPJ (14 dígitos) e válido
    if (digits.length === 14 && validarCNPJ(digits)) {
      if (digits !== lastSearchedCnpjRef.current) {
        // Marca a busca atual antes do await
        lastSearchedCnpjRef.current = digits;
        setCnpjLoading(true);
        try {
          const res = await buscarCnpjAction(digits);
          // Descarta resposta se o usuário já digitou outro CNPJ
          if (lastSearchedCnpjRef.current !== digits) return;
          if (res.success && res.data) {
            const data = res.data;
            // Lê o endereço atual via ref (sem closure stale)
            const cur = enderecoRef.current;
            // Determina quais campos estão vazios e têm dado da API
            const preenchidos: (keyof Endereco)[] = [];
            if (!cur.cep.trim()        && data.cep)       preenchidos.push('cep');
            if (!cur.logradouro.trim() && data.logradouro) preenchidos.push('logradouro');
            if (!cur.numero.trim()     && data.numero)     preenchidos.push('numero');
            if (!cur.bairro.trim()     && data.bairro)     preenchidos.push('bairro');
            if (!cur.cidade.trim()     && data.municipio)  preenchidos.push('cidade');
            if (!cur.estado.trim()     && data.uf)         preenchidos.push('estado');

            // Aplica a mesclagem (só preenche campos vazios em prev)
            setEndereco((prev) => ({
              cep:        prev.cep.trim()        ? prev.cep        : data.cep,
              logradouro: prev.logradouro.trim() ? prev.logradouro : data.logradouro,
              numero:     prev.numero.trim()     ? prev.numero     : data.numero,
              bairro:     prev.bairro.trim()     ? prev.bairro     : data.bairro,
              cidade:     prev.cidade.trim()     ? prev.cidade     : data.municipio,
              estado:     prev.estado.trim()     ? prev.estado     : data.uf,
            }));

            // Limpa erros somente dos campos que foram preenchidos pela API
            preenchidos.forEach((campo) => clearError(campo));

            setCnpjAvisoPreenchido(preenchidos.length > 0);
            setCnpjMessage(null);
          } else {
            setCnpjMessage(res.error || 'Não foi possível buscar os dados. Preencha o endereço manualmente.');
          }
        } catch {
          if (lastSearchedCnpjRef.current === digits) {
            setCnpjMessage('Não foi possível buscar os dados. Preencha o endereço manualmente.');
          }
        } finally {
          // Só baixa o spinner se ainda for a consulta atual
          if (lastSearchedCnpjRef.current === digits) {
            setCnpjLoading(false);
          }
        }
      }
    } else {
      // CPF ou entrada incompleta/inválida: reseta estado de CNPJ
      lastSearchedCnpjRef.current = '';
      setCnpjLoading(false);
      setCnpjMessage(null);
      setCnpjAvisoPreenchido(false);
    }
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 8);
    const masked = raw.length > 5 ? `${raw.slice(0, 5)}-${raw.slice(5)}` : raw;
    setEndereco((prev) => ({ ...prev, cep: masked }));
    setCepError('');
    clearError('cep');

    if (raw.length === 8) {
      setCepLoading(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
        const data = await res.json();
        if (data.erro) {
          // Apenas informa o erro; não apaga endereço pré-existente
          setCepError('CEP não encontrado.');
        } else {
          setEndereco((prev) => ({
            ...prev,
            // Usa dado do ViaCEP se existir; caso contrário preserva o que já estava
            logradouro: data.logradouro || prev.logradouro,
            bairro:     data.bairro     || prev.bairro,
            cidade:     data.localidade || prev.cidade,
            estado:     data.uf         || prev.estado,
          }));
          if (data.logradouro) clearError('logradouro');
          if (data.bairro)     clearError('bairro');
          if (data.localidade) clearError('cidade');
          if (data.uf)         clearError('estado');
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

  const hasFieldErrors = Object.keys(errors).length > 0;

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

              <div id="field-categories" className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
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

              {errors.categories && (
                <p className="text-[12px] text-red-500 font-bold text-center mt-2">
                  {errors.categories}
                </p>
              )}

              <div className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* CPF / CNPJ */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">
                      CPF / CNPJ
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input
                        id="field-cpf"
                        name="cpf"
                        value={cpf}
                        onChange={handleCpfChange}
                        placeholder="000.000.000-00 ou 00.000.000/0000-00"
                        maxLength={18}
                        inputMode="numeric"
                        className={`pl-12 pr-10 h-14 rounded-2xl border-slate-100 bg-slate-50/50 ${
                          errors.cpf ? 'border-red-400 focus:ring-red-400' : ''
                        }`}
                        required
                      />
                      {cnpjLoading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <Loader2 className="animate-spin text-[#f7941d]" size={18} />
                        </div>
                      )}
                    </div>
                    {cnpjMessage && (
                      <p className="text-[11px] text-amber-700 font-semibold ml-1">{cnpjMessage}</p>
                    )}
                    {errors.cpf && (
                      <p className="text-[11px] text-red-500 font-bold ml-1">{errors.cpf}</p>
                    )}
                  </div>

                  {/* Telefone Profissional */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">
                      Telefone Profissional
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input
                        id="field-phone"
                        name="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                        inputMode="tel"
                        className={`pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 ${
                          errors.phone ? 'border-red-400 focus:ring-red-400' : ''
                        }`}
                        required
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 font-bold ml-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">
                    Bio / Experiência (Resumo)
                  </label>
                  <Textarea
                    id="field-bio"
                    name="bio"
                    value={bio}
                    onChange={handleBioChange}
                    placeholder="Ex: Trabalho há 10 anos com reformas residenciais e pintura de alto padrão..."
                    className={`min-h-[120px] rounded-2xl p-4 resize-none border-slate-100 bg-slate-50/50 focus:bg-white ${
                      errors.bio ? 'border-red-400 focus:ring-red-400' : ''
                    }`}
                    required
                  />
                  {errors.bio && (
                    <p className="text-[11px] text-red-500 font-bold ml-1">{errors.bio}</p>
                  )}
                  <p className="text-[10px] text-slate-400 ml-1">Mínimo 20 caracteres.</p>
                </div>

                {/* Experiência */}
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
                      id="field-experiencia"
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
              <CardDescription className="font-bold">Informe onde você atende. O CEP ou CNPJ preenche os campos automaticamente.</CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-4">

              {/* CEP */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">CEP</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <Input
                    id="field-cep"
                    name="cep"
                    value={endereco.cep}
                    onChange={handleCepChange}
                    placeholder="00000-000"
                    maxLength={9}
                    inputMode="numeric"
                    className={`pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 ${
                      errors.cep || cepError ? 'border-red-400 focus:ring-red-400' : ''
                    }`}
                    required
                  />
                  {cepLoading && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold">
                      Buscando...
                    </span>
                  )}
                </div>
                {(cepError || errors.cep) && (
                  <p className="text-[11px] text-red-500 ml-1 font-bold">{cepError || errors.cep}</p>
                )}
              </div>

              {/* Logradouro e Número */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">Logradouro</label>
                  <Input
                    id="field-logradouro"
                    name="logradouro"
                    value={endereco.logradouro}
                    onChange={(e) => {
                      setEndereco((p) => ({ ...p, logradouro: e.target.value }));
                      clearError('logradouro');
                    }}
                    placeholder="Rua, Av., Travessa..."
                    className={fieldClass}
                    required
                  />
                  {errors.logradouro && (
                    <p className="text-[11px] text-red-500 font-bold ml-1">{errors.logradouro}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">Número</label>
                  <Input
                    id="field-numero"
                    name="numero"
                    value={endereco.numero}
                    onChange={(e) => {
                      setEndereco((p) => ({ ...p, numero: e.target.value }));
                      clearError('numero');
                    }}
                    placeholder="123"
                    className={fieldClass}
                    required
                  />
                  {errors.numero && (
                    <p className="text-[11px] text-red-500 font-bold ml-1">{errors.numero}</p>
                  )}
                </div>
              </div>

              {/* Bairro */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">Bairro</label>
                <Input
                  id="field-bairro"
                  name="bairro"
                  value={endereco.bairro}
                  onChange={(e) => {
                    setEndereco((p) => ({ ...p, bairro: e.target.value }));
                    clearError('bairro');
                  }}
                  placeholder="Bairro"
                  className={fieldClass}
                  required
                />
                {errors.bairro && (
                  <p className="text-[11px] text-red-500 font-bold ml-1">{errors.bairro}</p>
                )}
              </div>

              {/* Cidade e UF */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">Cidade</label>
                  <Input
                    id="field-cidade"
                    name="cidade"
                    value={endereco.cidade}
                    onChange={(e) => {
                      setEndereco((p) => ({ ...p, cidade: e.target.value }));
                      clearError('cidade');
                    }}
                    placeholder="Cidade"
                    className={fieldClass}
                    required
                  />
                  {errors.cidade && (
                    <p className="text-[11px] text-red-500 font-bold ml-1">{errors.cidade}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">UF</label>
                  <Input
                    id="field-estado"
                    name="estado"
                    value={endereco.estado}
                    onChange={(e) => {
                      setEndereco((p) => ({ ...p, estado: e.target.value.toUpperCase() }));
                      clearError('estado');
                    }}
                    placeholder="SP"
                    maxLength={2}
                    className={`${fieldClass} ${errors.estado ? 'border-red-400 focus:ring-red-400' : ''}`}
                    required
                  />
                  {errors.estado && (
                    <p className="text-[11px] text-red-500 font-bold ml-1">{errors.estado}</p>
                  )}
                </div>
              </div>

              {/* Aviso quando endereço foi preenchido via CNPJ */}
              {cnpjAvisoPreenchido && (
                <div className="mt-4 p-3 bg-blue-50/80 border border-blue-100 rounded-2xl flex items-center gap-2 text-xs text-[#103569] font-medium">
                  <ShieldCheck size={16} className="text-[#103569] shrink-0" />
                  <span>Endereço do cadastro do CNPJ. Confira e ajuste se atende em outro local.</span>
                </div>
              )}

            </CardContent>
          </Card>

          {/* Submit com Feedback de erros destacados */}
          <div className="flex flex-col items-center gap-4">
            {/* Mensagem geral de erro retornada pelo servidor */}
            {state?.error && (
              <div className="w-full max-w-md bg-red-50 border border-red-200 text-red-700 text-sm font-semibold px-4 py-3 rounded-2xl text-center">
                {state.error}
              </div>
            )}

            {/* Aviso acima do botão indicando campos com erro */}
            {hasFieldErrors && (
              <div className="w-full max-w-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-4 py-3 rounded-2xl text-center flex items-center justify-center gap-2">
                <AlertCircle size={16} className="text-amber-600 shrink-0" />
                <span>Corrija os campos destacados para continuar</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={pending}
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
