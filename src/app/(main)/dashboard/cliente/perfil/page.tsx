'use client';

import React from 'react';
import { UserCircle, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fieldClass =
  'w-full bg-[#fefccf]/30 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#103569]/10 outline-none transition-all font-medium text-[#103569] placeholder:text-[#103569]/20';
const labelClass = 'text-[10px] font-black text-[#103569] uppercase tracking-widest ml-1';

export default function ClientProfilePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-[#f7941d]">
          <UserCircle size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter">Meu Perfil</h2>
          <p className="text-slate-500 font-bold">Mantenha seus dados sempre atualizados.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Avatar Card */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-28 h-28 rounded-full bg-[#103569] text-white flex items-center justify-center text-4xl font-black shadow-lg ring-4 ring-white">
                M
              </div>
              <button className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-[#f7941d] text-white flex items-center justify-center shadow-lg hover:bg-[#f7941d]/90 transition-colors border-4 border-white cursor-pointer">
                <Camera size={16} />
              </button>
            </div>
            <h3 className="text-xl font-black text-[#103569]">Maria Silva</h3>
            <p className="text-sm text-slate-400 font-medium mt-1">Cliente</p>
            <p className="text-xs text-slate-300 mt-6 leading-relaxed">
              Clique no ícone da câmera para atualizar sua foto de perfil.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-[#103569] mb-8">Informações Pessoais</h3>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClass}>Nome Completo</label>
                  <div className="relative">
                    <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-[#103569]/30" size={18} />
                    <input type="text" placeholder="Seu nome" defaultValue="Maria Silva" className={`${fieldClass} pl-12`} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#103569]/30" size={18} />
                    <input type="email" placeholder="seu@email.com" defaultValue="maria@email.com" className={`${fieldClass} pl-12`} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClass}>Telefone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#103569]/30" size={18} />
                    <input type="tel" placeholder="(11) 99999-9999" defaultValue="(11) 98765-4321" className={`${fieldClass} pl-12`} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>CEP</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#103569]/30" size={18} />
                    <input type="text" placeholder="00000-000" defaultValue="01310-100" className={`${fieldClass} pl-12`} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Endereço</label>
                <input type="text" placeholder="Rua, número, bairro" defaultValue="Av. Paulista, 1000 - Bela Vista" className={fieldClass} />
              </div>

              <div className="pt-4">
                <Button className="bg-[#103569] hover:bg-[#103569]/90 text-white rounded-2xl h-14 px-10 font-black shadow-xl flex items-center gap-3 transition-all active:scale-95">
                  <Save size={20} />
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
