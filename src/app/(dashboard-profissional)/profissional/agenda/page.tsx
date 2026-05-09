import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, User } from 'lucide-react';

export default function AgendaProfissionalPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-bp-primary">Sua Agenda</h2>
          <p className="text-bp-primary/60">Gerencie seus compromissos e visitas técnicas.</p>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-xl border border-bp-outline-variant p-1">
          <Button variant="ghost" size="sm" className="rounded-lg bg-bp-primary text-white">Semana</Button>
          <Button variant="ghost" size="sm" className="rounded-lg">Mês</Button>
          <Button variant="ghost" size="sm" className="rounded-lg">Dia</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-bp-outline-variant">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-bold uppercase tracking-widest">Maio 2026</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft size={16} /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight size={16} /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Mini Calendar Mock */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => <div key={d} className="font-bold text-bp-on-surface/40 pb-2">{d}</div>)}
                {Array.from({ length: 31 }).map((_, i) => (
                  <div key={i} className={`h-8 flex items-center justify-center rounded-lg cursor-pointer hover:bg-bp-primary/10 transition-colors ${i + 1 === 7 ? 'bg-bp-primary text-white font-bold shadow-md' : ''}`}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-bp-outline-variant bg-bp-primary text-white">
            <CardContent className="p-6">
              <h4 className="font-bold mb-2">Visibilidade</h4>
              <p className="text-xs text-white/70 mb-4">Seu perfil está visível para novos clientes hoje.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Status: Disponível</span>
                <div className="w-10 h-5 bg-white/20 rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule List */}
        <div className="lg:col-span-3 space-y-6">
          <h3 className="text-xl font-bold text-bp-primary flex items-center gap-2">
            <Clock className="text-bp-secondary" />
            Compromissos de Hoje
          </h3>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-20 pt-2 text-right shrink-0">
                <span className="text-sm font-bold text-bp-primary">09:00</span>
                <p className="text-[10px] text-bp-primary/40 uppercase">Amanhã</p>
              </div>
              <Card className="flex-1 border-l-4 border-l-bp-secondary-container hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-bp-primary">Visita Técnica: Daniel Siqueira</h4>
                    <p className="text-sm text-bp-primary/60 flex items-center gap-1 mt-1">
                      <MapPin size={14} /> Rua das Flores, 123 - Centro
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="rounded-xl">Detalhes</Button>
                    <Button className="bg-bp-primary text-white rounded-xl shadow-sm">Iniciar Rota</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4">
              <div className="w-20 pt-2 text-right shrink-0">
                <span className="text-sm font-bold text-bp-primary">14:30</span>
                <p className="text-[10px] text-bp-primary/40 uppercase">Quinta</p>
              </div>
              <Card className="flex-1 border-l-4 border-l-bp-primary hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-bp-primary">Reparo Elétrico: Maria Oliveira</h4>
                    <p className="text-sm text-bp-primary/60 flex items-center gap-1 mt-1">
                      <MapPin size={14} /> Av. Brasil, 500 - Ap 42
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="rounded-xl">Detalhes</Button>
                    <Button variant="ghost" size="sm" className="rounded-xl text-bp-primary">Reagendar</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
