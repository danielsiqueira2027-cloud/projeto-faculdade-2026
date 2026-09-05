import React from 'react';
import { Check, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Meu Plano | ClickServiço Pro',
  description: 'Gerencie seu plano de assinatura profissional',
};

export default function PlanosPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-[#103569] mb-4">Escolha o plano ideal para você</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Aumente sua visibilidade e consiga mais clientes com nossos planos exclusivos para profissionais.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Plano Padrão */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col relative transition-transform hover:-translate-y-1">
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Zap className="text-blue-500" />
                Padrão
              </h3>
              <span className="bg-green-100 text-green-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-green-200">
                1º Mês Grátis
              </span>
            </div>
            <div className="mt-6 flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-semibold text-gray-400 line-through decoration-red-400/70 decoration-2">R$ 15,90</span>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-200">100% OFF</span>
              </div>
              <div className="flex items-baseline text-[#103569]">
                <span className="text-5xl font-black tracking-tight">Grátis</span>
                <span className="text-gray-500 ml-2 font-medium">nos primeiros 30 dias</span>
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 bg-slate-50 text-slate-600 text-sm font-medium px-4 py-2 rounded-lg border border-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Após o período, apenas R$ 15,90/mês
            </div>
            <p className="mt-5 text-gray-600 leading-relaxed text-sm">
              A melhor forma de começar. Teste a plataforma sem risco e comece a receber orçamentos hoje mesmo.
            </p>
          </div>
          <ul className="flex-1 space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-700 font-medium">Perfil profissional básico</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-700 font-medium">Receba solicitações de orçamento</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-700 font-medium">Apareça nos resultados de busca</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-700 font-medium">Cancele quando quiser, sem taxas</span>
            </li>
          </ul>
          <Button className="w-full bg-[#103569] hover:bg-[#0a2347] text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02]">
            Começar 1º Mês Grátis
          </Button>
        </div>

        {/* Plano Premium */}
        <div className="bg-gradient-to-br from-[#103569] to-[#0a2347] rounded-2xl shadow-xl border border-[#103569] p-8 flex flex-col relative transition-transform hover:-translate-y-1 transform scale-105">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f7941d] text-white text-sm font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
            Recomendado
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Star className="text-[#f7941d] fill-[#f7941d]" />
              Premium
            </h3>
            <div className="mt-4 flex items-baseline text-white">
              <span className="text-4xl font-black tracking-tight">R$ 25,90</span>
              <span className="text-blue-200 ml-1 font-medium">/mês</span>
            </div>
            <p className="mt-4 text-blue-100">
              Para profissionais que buscam destaque máximo e mais oportunidades.
            </p>
          </div>
          <ul className="flex-1 space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#f7941d] shrink-0 mt-0.5" />
              <span className="text-blue-50">Tudo do plano Padrão</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#f7941d] shrink-0 mt-0.5" />
              <span className="text-blue-50 font-bold">Destaque nas buscas na sua região</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#f7941d] shrink-0 mt-0.5" />
              <span className="text-blue-50">Selo de profissional Premium no perfil</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#f7941d] shrink-0 mt-0.5" />
              <span className="text-blue-50">Prioridade de suporte</span>
            </li>
          </ul>
          <Button className="w-full bg-[#f7941d] hover:bg-[#e0861a] text-white font-black py-6 text-lg rounded-xl shadow-lg shadow-[#f7941d]/30">
            Assinar Premium
          </Button>
        </div>
      </div>
    </div>
  );
}
