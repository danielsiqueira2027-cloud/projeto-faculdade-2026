'use client';

import React, { useState, useActionState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, ShieldCheck, BriefcaseBusiness, Star, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { registerAction } from '@/app/actions/auth';

export default function CadastroPage() {
  const [state, action, pending] = useActionState(registerAction, null);
  const [userType, setUserType] = useState<'cliente' | 'profissional'>(
    (state?.fields?.tipo as 'cliente' | 'profissional') || 'cliente'
  );

  // Sincroniza o tipo de usuário se o formulário retornar erro
  useEffect(() => {
    if (state?.fields?.tipo) {
      setUserType(state.fields.tipo as 'cliente' | 'profissional');
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-[#efefef] flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl border-0 shadow-2xl rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Lado esquerdo azul com Logo */}
          <div className="md:col-span-2 bg-[#103569] p-8 text-white flex flex-col items-center justify-center text-center">
            <div className="mb-6">
              <Image 
                src="/imgs/misc/logo.png" 
                alt="ClickServiço" 
                width={120} 
                height={120} 
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-black tracking-tighter mb-4">ClickServiço</h1>
            <div className="space-y-4 opacity-70">
              <div className="flex items-center gap-3 justify-center text-xs">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>Segurança Garantida</span>
              </div>
              <div className="flex items-center gap-3 justify-center text-xs">
                <Star size={16} className="text-yellow-400" />
                <span>Melhores Profissionais</span>
              </div>
            </div>
          </div>

          {/* Formulário (Lado Direito) */}
          <CardContent className="md:col-span-3 p-8 bg-white space-y-5">
            <div>
              <h2 className="text-xl font-bold text-[#103569]">Crie sua conta</h2>
              <p className="text-gray-400 text-xs">Escolha seu perfil para começar</p>
            </div>

            {/* Seletor de tipo */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('cliente')}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                  userType === 'cliente'
                    ? 'border-[#103569] bg-[#103569]/5 text-[#103569]'
                    : 'border-gray-100 text-gray-300 hover:border-[#103569]/20 hover:text-[#103569]'
                }`}
              >
                <User size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Cliente</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('profissional')}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                  userType === 'profissional'
                    ? 'border-[#f7941d] bg-[#f7941d]/5 text-[#f7941d]'
                    : 'border-gray-100 text-gray-300 hover:border-[#f7941d]/20 hover:text-[#f7941d]'
                }`}
              >
                <BriefcaseBusiness size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Profissional</span>
              </button>
            </div>

            <form action={action} className="space-y-3">
              <input type="hidden" name="tipo" value={userType} />

              {state?.error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-bold px-3 py-2 rounded-lg">
                  {state.error}
                </div>
              )}

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">Nome Completo</label>
                  <Input 
                    name="name" 
                    defaultValue={state?.fields?.name} 
                    placeholder="Nome Completo" 
                    className="h-11 bg-gray-50 border-gray-100 rounded-xl text-sm" 
                    required 
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">E-mail</label>
                  <Input 
                    name="email" 
                    type="email" 
                    defaultValue={state?.fields?.email} 
                    placeholder="E-mail" 
                    className="h-11 bg-gray-50 border-gray-100 rounded-xl text-sm" 
                    required 
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">Telefone</label>
                  <Input 
                    name="phone" 
                    type="tel" 
                    defaultValue={state?.fields?.phone} 
                    placeholder="Telefone (opcional)" 
                    className="h-11 bg-gray-50 border-gray-100 rounded-xl text-sm" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">Senha</label>
                    <Input 
                      name="password" 
                      type="password" 
                      placeholder="Senha" 
                      className="h-11 bg-gray-50 border-gray-100 rounded-xl text-sm" 
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">Confirmar</label>
                    <Input 
                      name="confirm" 
                      type="password" 
                      placeholder="Confirmar" 
                      className="h-11 bg-gray-50 border-gray-100 rounded-xl text-sm" 
                      required 
                    />
                  </div>
                </div>
              </div>

              {state?.fieldErrors && (
                <div className="space-y-1">
                  {Object.values(state.fieldErrors).map((err, i) => (
                    <p key={i} className="text-[10px] text-red-500 font-bold">{err}</p>
                  ))}
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={pending}
                  className="w-full h-11 bg-[#f7941d] hover:bg-[#f7941d]/90 text-white rounded-xl shadow-md font-bold text-sm"
                >
                  {pending ? <Loader2 className="animate-spin" size={18} /> : 'CRIAR CONTA'}
                </Button>
              </div>
            </form>

            <p className="text-center text-[10px] text-gray-400 border-t pt-4">
              Já tem conta? <Link href="/login" className="text-[#103569] font-bold hover:underline">Entre aqui</Link>
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
