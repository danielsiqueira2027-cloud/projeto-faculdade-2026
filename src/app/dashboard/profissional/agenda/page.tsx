'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, User } from 'lucide-react';

export default function AgendaProfissionalPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter uppercase">Minha Agenda</h2>
          <p className="text-slate-500 font-bold">Gerencie seus compromissos e visitas técnicas de forma otimizada.</p>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-2xl border border-slate-100 p-2 shadow-sm">
          <Button variant="ghost" size="sm" className="rounded-xl bg-[#103569] text-white font-bold px-4">Semana</Button>
          <Button variant="ghost" size="sm" className="rounded-xl font-bold px-4 text-slate-500">Mês</Button>
          <Button variant="ghost" size="sm" className="rounded-xl font-bold px-4 text-slate-500">Dia</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-2xl shadow-blue-900/5 rounded-[2rem] bg-white overflow-hidden">
            <CardHeader className="pb-4 bg-slate-50/50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-[#103569]">Maio 2026</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-[#103569]"><ChevronLeft size={16} /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-[#103569]"><ChevronRight size={16} /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Mini Calendar Mock */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => <div key={d} className="font-black text-[#103569]/30 pb-2">{d}</div>)}
                {Array.from({ length: 31 }).map((_, i) => (
                  <div key={i} className={`h-8 flex items-center justify-center rounded-xl cursor-pointer hover:bg-[#103569]/5 transition-all font-bold ${i + 1 === 7 ? 'bg-[#f7941d] text-white shadow-lg' : 'text-[#103569]'}`}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-linear-to-br from-[#103569] to-[#1a4a8a] text-white rounded-[2rem] shadow-2xl shadow-blue-900/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#f7941d]">
                  <CalendarIcon size={20} />
                </div>
                <h4 className="font-black tracking-tight">Status de Visibilidade</h4>
              </div>
              <p className="text-sm text-blue-100/70 font-bold mb-6">Seu perfil está visível para novos clientes hoje.</p>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-xs font-black uppercase tracking-widest">Disponível</span>
                <div className="w-10 h-5 bg-[#f7941d] rounded-full relative shadow-inner">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#f7941d]/10 rounded-lg text-[#f7941d]">
              <Clock size={20} />
            </div>
            <h3 className="text-xl font-black text-[#103569] uppercase tracking-tight">
              Compromissos de Hoje
            </h3>
          </div>
          
          <div className="space-y-6 relative before:absolute before:left-18 before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100">
            <div className="flex gap-8 relative z-10">
              <div className="w-20 pt-3 text-right shrink-0">
                <span className="text-lg font-black text-[#103569]">09:00</span>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">AM</p>
              </div>
              <div className="absolute left-18 top-5 w-4 h-4 bg-[#f7941d] rounded-full border-4 border-white shadow-sm -translate-x-1/2"></div>
              <Card className="flex-1 border-none shadow-xl shadow-blue-900/5 rounded-[2rem] hover:shadow-blue-900/10 transition-all group">
                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-[#103569] text-[10px] font-black uppercase tracking-widest">Visita Técnica</span>
                      <span className="text-[10px] font-black text-slate-300">#ORD-2026-001</span>
                    </div>
                    <h4 className="text-xl font-black text-[#103569] group-hover:text-[#f7941d] transition-colors">Daniel Siqueira</h4>
                    <p className="text-sm text-slate-500 font-bold flex items-center gap-2">
                      <MapPin size={16} className="text-slate-300" /> Rua das Flores, 123 - Centro
                    </p>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none rounded-xl border-slate-100 font-bold text-slate-600">Detalhes</Button>
                    <Button className="flex-1 md:flex-none bg-[#103569] hover:bg-[#103569]/90 text-white rounded-xl shadow-lg shadow-blue-900/20 font-bold">Iniciar Rota</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-8 relative z-10">
              <div className="w-20 pt-3 text-right shrink-0">
                <span className="text-lg font-black text-[#103569]">14:30</span>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">PM</p>
              </div>
              <div className="absolute left-18 top-5 w-4 h-4 bg-[#103569] rounded-full border-4 border-white shadow-sm -translate-x-1/2"></div>
              <Card className="flex-1 border-none shadow-xl shadow-blue-900/5 rounded-[2rem] hover:shadow-blue-900/10 transition-all group">
                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-orange-50 text-[#f7941d] text-[10px] font-black uppercase tracking-widest">Reparo Elétrico</span>
                      <span className="text-[10px] font-black text-slate-300">#ORD-2026-042</span>
                    </div>
                    <h4 className="text-xl font-black text-[#103569] group-hover:text-[#f7941d] transition-colors">Maria Oliveira</h4>
                    <p className="text-sm text-slate-500 font-bold flex items-center gap-2">
                      <MapPin size={16} className="text-slate-300" /> Av. Brasil, 500 - Ap 42
                    </p>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none rounded-xl border-slate-100 font-bold text-slate-600">Detalhes</Button>
                    <Button variant="ghost" className="flex-1 md:flex-none rounded-xl font-bold text-[#103569]">Reagendar</Button>
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
