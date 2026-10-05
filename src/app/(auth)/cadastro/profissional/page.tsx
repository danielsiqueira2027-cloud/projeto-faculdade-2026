'use client';

import React, { useState, useActionState, useEffect, Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BriefcaseBusiness, ShieldCheck, Star, Users, Loader2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { registerProfissionalAction } from '@/app/actions/auth';
import { mascararTelefone, validarRedirectSeguro } from '@/lib/validators';

function ProfissionalForm() {
  const searchParams = useSearchParams();
  const rawNext = searchParams.get('next') ?? '';
  const safeNext = validarRedirectSeguro(rawNext) ?? '/seja-profissional/ativar';

  const [state, action, pending] = useActionState(registerProfissionalAction, null);
  const [phone, setPhone] = useState(state?.fields?.phone || '');
  const [termos, setTermos] = useState(false);

  // Sincroniza o telefone com o estado retornado pelo servidor em caso de erro
  useEffect(() => {
    if (state?.fields?.phone !== undefined) {
      setPhone(mascararTelefone(state.fields.phone));
    }
  }, [state]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(mascararTelefone(e.target.value));
  };

  const loginHref = `/login?next=${encodeURIComponent(safeNext)}`;
  const clienteHref = `/cadastro/cliente`;
  const chooseHref = `/cadastro?next=${encodeURIComponent(safeNext)}`;

  return (
    <Card className="w-full max-w-3xl border-0 shadow-2xl rounded-3xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Lado esquerdo azul com Logo e Benefícios para Profissionais */}
        <div className="md:col-span-2 bg-[#103569] p-8 text-white flex flex-col items-center justify-between text-center min-h-[500px]">
          <div className="w-full flex justify-start">
            <Link
              href={chooseHref}
              className="text-white/70 hover:text-white flex items-center gap-1.5 text-xs font-bold transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </Link>
          </div>

          <div className="my-auto space-y-4">
            <div className="flex justify-center">
              <Image
                src="/imgs/misc/logo.png"
                alt="ClickServiço"
                width={110}
                height={110}
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-black tracking-tight">ClickServiço Pro</h1>
            <p className="text-amber-200 text-xs font-semibold px-2">
              Conecte-se com clientes da sua região e aumente sua renda.
            </p>
          </div>

          <div className="space-y-3 opacity-90 w-full pt-4 border-t border-white/10 text-left">
            <div className="flex items-center gap-2.5 text-xs">
              <Users size={16} className="text-[#f7941d] shrink-0" />
              <span>Pedidos de orçamento direto no seu perfil</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
              <span>Sem mensalidades fixas obrigatórias</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Star size={16} className="text-yellow-400 shrink-0" />
              <span>Construa sua reputação com avaliações</span>
            </div>
          </div>
        </div>

        {/* Formulário de Cadastro de Profissional (Lado Direito) */}
        <CardContent className="md:col-span-3 p-8 bg-white space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f7941d]/15 text-[#f7941d] flex items-center justify-center">
              <BriefcaseBusiness size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#103569]">Cadastro de Profissional</h2>
              <p className="text-gray-400 text-xs">Crie sua conta para começar a prestar serviços</p>
            </div>
          </div>

          <form action={action} className="space-y-4">
            <input type="hidden" name="next" value={safeNext} />

            {/* Erro geral */}
            {state?.error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-bold px-3 py-2 rounded-lg">
                {state.error}
              </div>
            )}

            <div className="space-y-3">
              {/* Nome */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#103569]/60 uppercase tracking-widest ml-1">
                  Nome Completo
                </label>
                <Input
                  name="name"
                  defaultValue={state?.fields?.name}
                  placeholder="Seu nome completo"
                  className={`h-11 bg-gray-50 border-gray-100 rounded-xl text-sm ${
                    state?.fieldErrors?.name ? 'border-red-400 focus-visible:ring-red-400' : ''
                  }`}
                  required
                />
                {state?.fieldErrors?.name && (
                  <p className="text-[11px] text-red-500 font-bold ml-1">{state.fieldErrors.name}</p>
                )}
              </div>

              {/* E-mail */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#103569]/60 uppercase tracking-widest ml-1">
                  E-mail Profissional
                </label>
                <Input
                  name="email"
                  type="email"
                  defaultValue={state?.fields?.email}
                  placeholder="seuemail@exemplo.com"
                  className={`h-11 bg-gray-50 border-gray-100 rounded-xl text-sm ${
                    state?.fieldErrors?.email ? 'border-red-400 focus-visible:ring-red-400' : ''
                  }`}
                  required
                />
                {state?.fieldErrors?.email && (
                  <div className="flex flex-wrap items-center gap-1.5 ml-1 mt-1 text-red-500 font-bold text-[11px]">
                    <span>{state.fieldErrors.email}</span>
                    <Link
                      href={loginHref}
                      className="text-[#103569] underline hover:text-[#f7941d] transition-colors"
                    >
                      Fazer login
                    </Link>
                  </div>
                )}
              </div>

              {/* Telefone / WhatsApp com DDD (OBRIGATÓRIO) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[10px] font-black text-[#103569]/60 uppercase tracking-widest">
                    Telefone / WhatsApp com DDD
                  </label>
                  <span className="text-[10px] font-bold text-[#f7941d] uppercase tracking-wider">Obrigatório</span>
                </div>
                <Input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  className={`h-11 bg-gray-50 border-gray-100 rounded-xl text-sm ${
                    state?.fieldErrors?.phone ? 'border-red-400 focus-visible:ring-red-400' : ''
                  }`}
                  required
                />
                {state?.fieldErrors?.phone && (
                  <p className="text-[11px] text-red-500 font-bold ml-1">{state.fieldErrors.phone}</p>
                )}
              </div>

              {/* Senhas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#103569]/60 uppercase tracking-widest ml-1">
                    Senha (mín. 8)
                  </label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    className={`h-11 bg-gray-50 border-gray-100 rounded-xl text-sm ${
                      state?.fieldErrors?.password ? 'border-red-400 focus-visible:ring-red-400' : ''
                    }`}
                    required
                  />
                  {state?.fieldErrors?.password && (
                    <p className="text-[11px] text-red-500 font-bold ml-1">{state.fieldErrors.password}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#103569]/60 uppercase tracking-widest ml-1">
                    Confirmar Senha
                  </label>
                  <Input
                    name="confirm"
                    type="password"
                    placeholder="Repita a senha"
                    className={`h-11 bg-gray-50 border-gray-100 rounded-xl text-sm ${
                      state?.fieldErrors?.confirm ? 'border-red-400 focus-visible:ring-red-400' : ''
                    }`}
                    required
                  />
                  {state?.fieldErrors?.confirm && (
                    <p className="text-[11px] text-red-500 font-bold ml-1">{state.fieldErrors.confirm}</p>
                  )}
                </div>
              </div>

              {/* Aceite dos Termos de Uso */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="termos"
                    checked={termos}
                    onChange={(e) => setTermos(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#f7941d] focus:ring-[#f7941d] accent-[#f7941d]"
                  />
                  <span className="text-xs text-gray-600 leading-tight">
                    Li e concordo com os{' '}
                    <span className="text-[#103569] font-bold underline">Termos de Uso</span> e a{' '}
                    <span className="text-[#103569] font-bold underline">Política de Privacidade</span> do ClickServiço.
                  </span>
                </label>
                {state?.fieldErrors?.termos && (
                  <p className="text-[11px] text-red-500 font-bold mt-1 ml-1">{state.fieldErrors.termos}</p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={pending}
                className="w-full h-11 bg-[#f7941d] hover:bg-[#f7941d]/90 text-white rounded-xl shadow-md font-bold text-sm"
              >
                {pending ? <Loader2 className="animate-spin" size={18} /> : 'CRIAR CONTA PROFISSIONAL'}
              </Button>
            </div>
          </form>

          {/* Links auxiliares */}
          <div className="pt-3 border-t border-gray-100 text-center space-y-2">
            <p className="text-[11px] text-gray-500">
              Já tem conta profissional?{' '}
              <Link href={loginHref} className="text-[#103569] font-bold hover:underline">
                Entre aqui
              </Link>
            </p>
            <p className="text-[11px] text-gray-400">
              Quer apenas contratar serviços?{' '}
              <Link href={clienteHref} className="text-[#103569] font-bold hover:underline">
                Cadastre-se como cliente
              </Link>
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default function CadastroProfissionalPage() {
  return (
    <div className="min-h-screen bg-[#efefef] flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div className="text-gray-400 text-sm">Carregando...</div>}>
        <ProfissionalForm />
      </Suspense>
    </div>
  );
}
