import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { User, BriefcaseBusiness, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { validarRedirectSeguro } from '@/lib/validators';

interface PageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function CadastroPage({ searchParams }: PageProps) {
  const { next: rawNext } = await searchParams;
  const safeNext = validarRedirectSeguro(rawNext);

  const clientHref = safeNext ? `/cadastro/cliente?next=${encodeURIComponent(safeNext)}` : '/cadastro/cliente';
  const proHref = safeNext ? `/cadastro/profissional?next=${encodeURIComponent(safeNext)}` : '/cadastro/profissional';
  const loginHref = safeNext ? `/login?next=${encodeURIComponent(safeNext)}` : '/login';

  return (
    <div className="min-h-screen bg-[#efefef] flex flex-col items-center justify-center p-4 py-8">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header com Logo */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <Image
              src="/imgs/misc/logo.png"
              alt="ClickServiço"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-black text-[#103569] tracking-tight">Crie sua conta no ClickServiço</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Escolha o tipo de perfil que melhor atende às suas necessidades para começar.
          </p>
        </div>

        {/* Dois Cards de Escolha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Cliente */}
          <Link href={clientHref} className="group block focus:outline-none">
            <Card className="h-full border-2 border-transparent hover:border-[#103569] transition-all duration-200 rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden bg-white group-hover:-translate-y-1">
              <CardContent className="p-8 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#103569]/10 text-[#103569] flex items-center justify-center group-hover:bg-[#103569] group-hover:text-white transition-colors duration-200">
                    <User size={28} />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#103569]/60">Para você</span>
                    <h2 className="text-2xl font-black text-[#103569]">Sou Cliente</h2>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Quero encontrar e contratar profissionais qualificados para reformas, instalações, reparos e serviços do dia a dia.
                  </p>
                  <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                      <span>Solicite orçamentos gratuitamente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-yellow-500 shrink-0" />
                      <span>Profissionais avaliados e recomendados</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between font-bold text-sm text-[#103569] group-hover:text-[#f7941d] transition-colors">
                  <span>Criar conta como Cliente</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Card Profissional */}
          <Link href={proHref} className="group block focus:outline-none">
            <Card className="h-full border-2 border-transparent hover:border-[#f7941d] transition-all duration-200 rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden bg-white group-hover:-translate-y-1">
              <CardContent className="p-8 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#f7941d]/15 text-[#f7941d] flex items-center justify-center group-hover:bg-[#f7941d] group-hover:text-white transition-colors duration-200">
                    <BriefcaseBusiness size={28} />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#f7941d]">Para prestadores de serviço</span>
                    <h2 className="text-2xl font-black text-[#103569]">Sou Profissional</h2>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Quero divulgar meu trabalho, receber pedidos de orçamento de clientes da minha região e expandir meus serviços.
                  </p>
                  <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                      <span>Divulgue seus serviços sem mensalidade fixa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-yellow-500 shrink-0" />
                      <span>Painel exclusivo de orçamentos e agendamentos</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between font-bold text-sm text-[#f7941d] group-hover:text-[#103569] transition-colors">
                  <span>Criar conta como Profissional</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Rodapé: Login */}
        <p className="text-center text-xs text-gray-500 pt-4">
          Já possui uma conta?{' '}
          <Link href={loginHref} className="text-[#103569] font-bold hover:underline">
            Entre aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
