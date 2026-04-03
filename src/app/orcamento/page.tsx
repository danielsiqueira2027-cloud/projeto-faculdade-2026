import React from 'react';
import { BudgetForm } from './BudgetForm';
import { Clock, ShieldCheck, BadgeCheck } from 'lucide-react';

export default function BudgetPage() {
  return (
    <div className="min-h-screen bg-bp-surface font-work-sans overflow-hidden">
      <main className="container mx-auto px-4 py-12 md:py-24 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Column: Context & Creative */}
          <div className="space-y-16 py-12">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-bp-primary/5 border border-bp-primary/10 text-bp-primary text-sm font-bold uppercase tracking-widest animate-in fade-in slide-in-from-left-4">
                <BadgeCheck className="w-5 h-5" />
                Orçamentos de Construção Precisos
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-manrope text-bp-on-surface tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-left-6 duration-700">
                Solicite um <br />
                <span className="text-bp-primary">Orçamento Preciso.</span>
              </h1>
              <p className="text-xl text-bp-on-surface/90 max-w-lg leading-relaxed animate-in fade-in slide-in-from-left-8 duration-1000">
                AtelierConstruct preenche a lacuna entre a visão arquitetônica e a realidade técnica. Envie suas plantas para uma análise detalhada.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-bp-surface-lowest p-8 rounded-[2rem] shadow-xl border border-bp-outline-variant/5 space-y-4 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-bp-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-bp-primary" />
                </div>
                <h3 className="text-xl font-bold font-manrope text-bp-on-surface">Resposta em 48h</h3>
                <p className="text-sm text-bp-on-surface/80 font-work-sans">
                  Nossos engenheiros profissionais revisam seus dados e respondem com um orçamento preliminar em dois dias úteis.
                </p>
              </div>

              <div className="bg-bp-surface-lowest p-8 rounded-[2rem] shadow-xl border border-bp-outline-variant/5 space-y-4 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-bp-secondary/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-bp-secondary" />
                </div>
                <h3 className="text-xl font-bold font-manrope text-bp-on-surface">Preço Fixo</h3>
                <p className="text-sm text-bp-on-surface/80 font-work-sans">
                  Garantimos transparência. A construção final corresponde ao orçamento assinado, sem surpresas arquitetônicas.
                </p>
              </div>
            </div>

            {/* Quote Checklist */}
            <div className="space-y-6 pt-4">
              <h4 className="text-sm font-bold text-bp-on-surface/80 uppercase tracking-[0.3em]">O Padrão Blueprint</h4>
              <ul className="space-y-4">
                {[
                  'Aquisição de materiais e logística detalhadas',
                  'Cronograma de construção em fases',
                  'Verificação de conformidade regulatória',
                  'Avaliação de integridade estrutural'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-bp-on-surface font-medium">
                    <div className="w-2 h-2 rounded-full bg-bp-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="relative">
             {/* Decorative Background for Form */}
             <div className="absolute -inset-10 bg-bp-primary/5 rounded-[4rem] blur-[80px] -z-10" />
             <BudgetForm />
          </div>

        </div>
      </main>

      {/* Decorative Technical Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[-1]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}
