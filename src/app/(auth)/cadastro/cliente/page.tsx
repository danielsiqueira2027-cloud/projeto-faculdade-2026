'use client';

import React, { useState, useActionState, useEffect, Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, ShieldCheck, Star, Loader2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { registerAction } from '@/app/actions/auth';
import { mascararTelefone, validarRedirectSeguro } from '@/lib/validators';

function ClienteForm() {
  const searchParams = useSearchParams();
  const rawNext = searchParams.get('next') ?? '';
  const safeNext = validarRedirectSeguro(rawNext) ?? '';

  const [state, action, pending] = useActionState(registerAction, null);
  const [phone, setPhone] = useState(state?.fields?.phone || '');

  // Sincroniza o telefone com o estado retornado pelo servidor em caso de erro
  useEffect(() => {
    if (state?.fields?.phone !== undefined) {
      setPhone(mascararTelefone(state.fields.phone));
    }
  }, [state]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(mascararTelefone(e.target.value));
  };

  const loginHref = safeNext ? `/login?next=${encodeURIComponent(safeNext)}` : '/login';
  const proHref = safeNext ? `/cadastro/profissional?next=${encodeURIComponent(safeNext)}` : '/cadastro/profissional';
  const chooseHref = safeNext ? `/cadastro?next=${encodeURIComponent(safeNext)}` : '/cadastro';

  return (
    <Card className="w-full max-w-3xl border-0 shadow-2xl rounded-3xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Lado esquerdo azul com Logo e informações */}
        <div className="md:col-span-2 bg-[#103569] p-8 text-white flex flex-col items-center justify-between text-center min-h-[460px]">
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
            <h1 className="text-2xl font-black tracking-tight">ClickServiço</h1>
            <p className="text-blue-100/70 text-xs px-2">
              A maneira mais fácil e segura de contratar profissionais para sua casa ou empresa.
            </p>
          </div>

          <div className="space-y-3 opacity-80 w-full pt-4 border-t border-white/10">
            <div className="flex items-center gap-2.5 justify-center text-xs">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>100% Gratuito para Clientes</span>
            </div>
            <div className="flex items-center gap-2.5 justify-center text-xs">
              <Star size={16} className="text-yellow-400" />
              <span>Profissionais Avaliados</span>
            </div>
          </div>
        </div>

        {/* Formulário de Cadastro de Cliente (Lado Direito) */}
        <CardContent className="md:col-span-3 p-8 bg-white space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#103569]/10 text-[#103569] flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#103569]">Cadastro de Cliente</h2>
              <p className="text-gray-400 text-xs">Preencha seus dados para começar</p>
            </div>
          </div>

          <form action={action} className="space-y-4">
            {safeNext && <input type="hidden" name="next" value={safeNext} />}

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
                  E-mail
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
                  <p className="text-[11px] text-red-500 font-bold ml-1">{state.fieldErrors.email}</p>
                )}
              </div>

              {/* Telefone (opcional) */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#103569]/60 uppercase tracking-widest ml-1">
                  Telefone (opcional)
                </label>
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
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={pending}
                className="w-full h-11 bg-[#103569] hover:bg-[#103569]/90 text-white rounded-xl shadow-md font-bold text-sm"
              >
                {pending ? <Loader2 className="animate-spin" size={18} /> : 'CRIAR CONTA DE CLIENTE'}
              </Button>
            </div>
          </form>

          {/* Links auxiliares */}
          <div className="pt-3 border-t border-gray-100 text-center space-y-2">
            <p className="text-[11px] text-gray-500">
              Já tem conta?{' '}
              <Link href={loginHref} className="text-[#103569] font-bold hover:underline">
                Entre aqui
              </Link>
            </p>
            <p className="text-[11px] text-gray-400">
              Quer prestar serviços na plataforma?{' '}
              <Link href={proHref} className="text-[#f7941d] font-bold hover:underline">
                Cadastre-se como profissional
              </Link>
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default function CadastroClientePage() {
  return (
    <div className="min-h-screen bg-[#efefef] flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div className="text-gray-400 text-sm">Carregando...</div>}>
        <ClienteForm />
      </Suspense>
    </div>
  );
}
