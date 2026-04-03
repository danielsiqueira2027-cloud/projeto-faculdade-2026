'use client';

import React from 'react';
import { Send, MapPin, ClipboardList, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { BlueprintButton } from '@/components/ui/BlueprintButton';
import { BlueprintInput } from '@/components/ui/BlueprintInput';
import { BlueprintFileUpload } from '@/components/ui/BlueprintFileUpload';
import { BudgetRange } from '@/types';
import { cn } from '@/lib/utils';

const budgetOptions: BudgetRange[] = ['$1k-5k', '$5k-10k', '$10k-25k', '$25k+'];

export function BudgetForm() {
  const [selectedRange, setSelectedRange] = React.useState<BudgetRange>('$5k-10k');

  return (
    <div className="bg-bp-surface-lowest rounded-[3rem] p-8 md:p-12 shadow-[0_48px_140px_-30px_rgba(0,50,125,0.12)] border border-bp-outline-variant/10 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-bp-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <form className="space-y-10 relative z-10" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-bp-on-surface font-manrope tracking-tight">
              Especificação do Projeto
            </h2>
            <p className="text-bp-on-surface/80 font-work-sans">
              Forneça o máximo de detalhes possível para receber uma estimativa precisa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project Description */}
            <div className="md:col-span-2 space-y-3">
              <label className="text-sm font-bold text-bp-on-surface/90 uppercase tracking-widest flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-bp-primary" />
                No que você está trabalhando?
              </label>
              <textarea 
                className="w-full min-h-[120px] rounded-2xl bg-bp-surface-low p-5 text-sm outline-none focus:bg-bp-surface-lowest focus:ring-2 focus:ring-bp-primary transition-all border-b-2 border-transparent focus:border-bp-primary font-work-sans"
                placeholder="Ex: Reforma estrutural de fundação residencial com 120m2..."
              />
            </div>

            {/* Site Location */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-bp-on-surface/90 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4 text-bp-primary" />
                Local da Obra
              </label>
              <BlueprintInput placeholder="Cidade, Estado ou CEP" />
            </div>

            {/* Project Type */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-bp-on-surface/90 uppercase tracking-widest flex items-center gap-2">
                <Send className="w-4 h-4 text-bp-primary" />
                Tipo de Projeto
              </label>
              <select className="w-full h-12 rounded-xl bg-bp-surface-low px-4 py-2 text-sm text-bp-on-surface outline-none focus:bg-bp-surface-lowest focus:ring-2 focus:ring-bp-primary transition-all border-b-2 border-transparent focus:border-bp-primary cursor-pointer appearance-none">
                <option>Reforma de Interiores</option>
                <option>Reparo Estrutural</option>
                <option>Construção Nova</option>
                <option>Consultoria</option>
              </select>
            </div>

            {/* Budget Range */}
            <div className="md:col-span-2 space-y-4">
              <label className="text-sm font-bold text-bp-on-surface/90 uppercase tracking-widest flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-bp-primary" />
                Faixa de Orçamento
              </label>
              <div className="flex flex-wrap gap-3">
                {budgetOptions.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setSelectedRange(range)}
                    className={cn(
                      "px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                      selectedRange === range 
                        ? "bg-bp-primary text-white shadow-lg ring-2 ring-bp-primary/20" 
                        : "bg-bp-surface-low text-bp-on-surface/60 hover:bg-bp-surface hover:text-bp-on-surface"
                    )}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Desired Completion */}
            <div className="md:col-span-2 space-y-3">
              <label className="text-sm font-bold text-bp-on-surface/90 uppercase tracking-widest flex items-center gap-2">
                <Calendar className="w-4 h-4 text-bp-primary" />
                Conclusão Desejada
              </label>
              <BlueprintInput type="date" className="max-w-xs" />
            </div>

            {/* Attachments */}
            <div className="md:col-span-2 space-y-3">
              <label className="text-sm font-bold text-bp-on-surface/90 uppercase tracking-widest">
                Plantas e Documentação
              </label>
              <BlueprintFileUpload />
            </div>
          </div>
        </div>

        <BlueprintButton size="xl" className="w-full gap-3 group relative overflow-hidden">
          <span className="relative z-10 flex items-center gap-3">
            Enviar Solicitação de Orçamento
            <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
          </span>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:animate-shimmer" />
        </BlueprintButton>
      </form>
    </div>
  );
}
