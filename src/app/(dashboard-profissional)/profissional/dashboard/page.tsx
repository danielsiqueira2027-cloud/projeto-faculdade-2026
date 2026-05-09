import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Bell, Star, Calendar, Settings, ChevronRight, User } from 'lucide-react';
import Link from 'next/link';

const PROXIMAS_VISITAS = [
  { id: 1, cliente: 'Daniel Siqueira', servico: 'Orçamento Reforma', data: 'Amanhã, 09:00', endereco: 'Rua das Flores, 123' },
  { id: 2, cliente: 'Maria Oliveira', servico: 'Reparo Elétrico', data: 'Quinta, 14:30', endereco: 'Av. Brasil, 500' },
  { id: 3, cliente: 'Carlos Santos', servico: 'Pintura Quarto', data: 'Sexta, 08:00', endereco: 'Rua 7 de Setembro, 45' },
];

export default function ProfissionalDashboard() {
  return (
    <div className="space-y-8">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-bp-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <DollarSign size={80} />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70 uppercase">Ganhos do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ 4.250,00</div>
            <p className="text-xs text-white/50 mt-1">+15% em relação a Abril</p>
          </CardContent>
        </Card>
        
        <Card className="border-bp-outline-variant shadow-sm border-t-4 border-t-bp-secondary-container">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex justify-between items-center">
              Novas Solicitações
              <Bell className="h-4 w-4 text-bp-secondary-container animate-bounce" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-bp-primary">5</div>
            <p className="text-xs text-muted-foreground mt-1">Responder nas próximas 2h</p>
          </CardContent>
        </Card>

        <Card className="border-bp-outline-variant shadow-sm border-t-4 border-t-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex justify-between items-center">
              Avaliação Média
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-bp-primary">4.9 / 5.0</div>
            <p className="text-xs text-muted-foreground mt-1">Baseado em 24 avaliações</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Agenda & Management */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-bp-outline-variant">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-bp-primary flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Agenda da Semana
                </CardTitle>
                <CardDescription>Suas próximas visitas técnicas confirmadas.</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/profissional/agenda">Ver agenda completa</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {PROXIMAS_VISITAS.map((visita) => (
                  <div key={visita.id} className="flex items-start gap-4 p-4 rounded-xl bg-bp-surface/30 border border-bp-outline-variant hover:border-bp-primary transition-all">
                    <div className="w-10 h-10 rounded-lg bg-bp-primary/10 flex items-center justify-center text-bp-primary font-bold shrink-0">
                      {visita.data.substring(0, 1)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-bp-on-surface">{visita.cliente}</h4>
                        <span className="text-xs font-bold text-bp-primary bg-bp-primary/5 px-2 py-1 rounded">{visita.data}</span>
                      </div>
                      <p className="text-sm text-bp-on-surface/70 font-semibold">{visita.servico}</p>
                      <p className="text-xs text-bp-on-surface/50 mt-1">{visita.endereco}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-bp-primary">
                      <ChevronRight size={20} />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Management Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/profissional/meus-servicos" className="group">
              <div className="p-6 rounded-2xl bg-white border border-bp-outline-variant shadow-sm hover:shadow-md hover:border-bp-primary transition-all flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-bp-secondary-container/20 flex items-center justify-center text-bp-secondary-container group-hover:scale-110 transition-transform">
                  <Settings size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-bp-primary">Configurar Serviços</h4>
                  <p className="text-xs text-bp-primary/60">Atualize seus preços e especialidades</p>
                </div>
              </div>
            </Link>

            <Link href="/profissional/perfil" className="group">
              <div className="p-6 rounded-2xl bg-white border border-bp-outline-variant shadow-sm hover:shadow-md hover:border-bp-primary transition-all flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-bp-primary">Meu Perfil Público</h4>
                  <p className="text-xs text-bp-primary/60">Veja como os clientes visualizam você</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Column: Tips / Community */}
        <div className="space-y-6">
          <Card className="border-bp-outline-variant bg-linear-to-br from-bp-surface to-white">
            <CardHeader>
              <CardTitle className="text-bp-secondary">Dica do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-bp-on-surface/80 leading-relaxed">
                "Profissionais que respondem orçamentos em menos de 1 hora têm 40% mais chances de fechar o serviço."
              </p>
              <Button variant="link" className="p-0 h-auto mt-4 text-bp-secondary font-bold">Ler mais dicas &rarr;</Button>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl border border-dashed border-bp-outline-variant flex flex-col items-center text-center space-y-3">
             <div className="w-16 h-1 bg-bp-outline-variant rounded-full mb-2"></div>
             <p className="text-xs text-bp-on-surface/40 uppercase font-bold tracking-widest">Espaço Publicitário</p>
             <p className="text-sm font-semibold text-bp-on-surface/60">Destaque seu perfil no topo das buscas!</p>
             <Button variant="outline" size="sm" className="rounded-full">Saiba Mais</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
