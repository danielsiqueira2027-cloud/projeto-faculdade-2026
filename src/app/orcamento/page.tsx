import React from 'react';

export default function OrcamentoPage() {
  return (
    <div className="min-h-screen bg-bp-surface py-16 px-4 md:px-8 font-sans text-bp-on-surface">
      <div className="max-w-4xl mx-auto">
        {/* Header Section with Intentional Asymmetry */}
        <header className="mb-12 relative">
          <div className="inline-block bg-bp-secondary-container text-bp-on-secondary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 font-manrope">
            Solicitação de Serviço
          </div>
          <h1 className="text-5xl md:text-6xl font-manrope font-extrabold tracking-tighter leading-tight mb-4">
            Solicitar <span className="text-bp-primary">Orçamento</span>
          </h1>
          <p className="text-lg md:text-xl font-work-sans text-bp-on-surface/70 max-w-2xl leading-relaxed">
            Preencha os detalhes abaixo para receber propostas personalizadas dos melhores profissionais da sua região.
          </p>
          
          {/* Subtle Decorative Element */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-bp-primary/5 rounded-full blur-3xl -z-10" />
        </header>

        {/* Main Form Container - Using Tonal Layering (No Borders) */}
        <div className="bg-bp-surface-lowest rounded-2xl p-8 md:p-12 shadow-[0_48px_48px_-12px_rgba(0,50,125,0.06)]">
          <form className="space-y-10">
            {/* Section: Informações Básicas */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-6 bg-bp-primary rounded-full" />
                <h2 className="text-xl font-manrope font-bold uppercase tracking-tight">O que você precisa?</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-bp-on-surface/60 font-work-sans ml-1">
                    Tipo de Serviço
                  </label>
                  <select className="w-full bg-bp-surface-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-bp-primary outline-none transition-all appearance-none cursor-pointer">
                    <option>Pintura Residencial</option>
                    <option>Elétrica</option>
                    <option>Hidráulica</option>
                    <option>Reforma Geral</option>
                    <option>Design de Interiores</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-bp-on-surface/60 font-work-sans ml-1">
                    Urgência
                  </label>
                  <select className="w-full bg-bp-surface-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-bp-primary outline-none transition-all appearance-none cursor-pointer">
                    <option>O mais rápido possível</option>
                    <option>Para as próximas semanas</option>
                    <option>Apenas pesquisando preços</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Section: Detalhes do Projeto */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-6 bg-bp-primary rounded-full" />
                <h2 className="text-xl font-manrope font-bold uppercase tracking-tight">Descrição do Projeto</h2>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-bp-on-surface/60 font-work-sans ml-1">
                  Conte-nos mais detalhes
                </label>
                <textarea 
                  rows={4}
                  placeholder="Ex: Preciso pintar 3 quartos e uma sala, totalizando aproximadamente 80m² de parede..."
                  className="w-full bg-bp-surface-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-bp-primary outline-none transition-all resize-none placeholder:text-bp-on-surface/30"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-bp-on-surface/60 font-work-sans ml-1">
                  Localização (CEP)
                </label>
                <input 
                  type="text" 
                  placeholder="00000-000"
                  className="w-full md:w-1/3 bg-bp-surface-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-bp-primary outline-none transition-all placeholder:text-bp-on-surface/30"
                />
              </div>
            </section>

            {/* Section: Upload de Fotos */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-6 bg-bp-primary rounded-full" />
                <h2 className="text-xl font-manrope font-bold uppercase tracking-tight">Fotos e Referências</h2>
              </div>
              
              <div className="border-2 border-dashed border-bp-outline-variant/30 rounded-2xl p-10 flex flex-col items-center justify-center bg-bp-surface-low/30 hover:bg-bp-surface-low/50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-bp-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-bp-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className="text-sm font-work-sans font-medium">Arraste fotos ou clique para fazer upload</p>
                <p className="text-xs text-bp-on-surface/50 mt-1">PNG, JPG ou PDF até 10MB</p>
              </div>
            </section>

            {/* CTA Section */}
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-sm text-bp-on-surface/60 max-w-sm">
                Ao enviar este pedido, você concorda com nossos <span className="underline cursor-pointer">Termos de Uso</span> e autoriza o contato de profissionais.
              </p>
              <button className="w-full md:w-auto bg-linear-to-br from-bp-primary to-bp-primary-container text-white px-10 py-4 rounded-xl font-manrope font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-bp-primary/20">
                Enviar Solicitação
              </button>
            </div>
          </form>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-bp-secondary-container flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-bp-on-secondary-container" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-manrope font-bold text-sm">Profissionais Verificados</h3>
              <p className="text-xs text-bp-on-surface/60 mt-1 font-work-sans">Todos os parceiros passam por rigorosa análise documental.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-bp-secondary-container flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-bp-on-secondary-container" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-manrope font-bold text-sm">Garantia de Preço</h3>
              <p className="text-xs text-bp-on-surface/60 mt-1 font-work-sans">Receba múltiplas propostas e escolha a que melhor cabe no bolso.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-bp-secondary-container flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-bp-on-secondary-container" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-manrope font-bold text-sm">Suporte 24/7</h3>
              <p className="text-xs text-bp-on-surface/60 mt-1 font-work-sans">Nossa equipe está pronta para ajudar em qualquer etapa do serviço.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
