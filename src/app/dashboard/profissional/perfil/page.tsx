'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  User, 
  Camera, 
  Save, 
  ExternalLink, 
  MapPin, 
  Briefcase, 
  Clock, 
  Award,
  Plus,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function EditProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Guilherme Freitas',
    specialty: 'Eletricista Residencial',
    location: 'Grande São Paulo, SP',
    experience: '8 anos',
    description: 'Especialista em instalações elétricas modernas e automação residencial. Atuo há mais de 8 anos transformando casas com segurança e tecnologia.',
    avatar: '/imgs/who/lucas.jpg',
    cover: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&h=400&fit=crop',
    certifications: ['Técnico em Eletrotécnica', 'Automação Predial']
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter">Editar Perfil</h2>
          <p className="text-slate-500 font-bold">Gerencie como seu perfil aparece para os clientes.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="rounded-2xl border-slate-200 font-bold text-[#103569] h-12">
            <Link href="/perfil-profissional" target="_blank" className="flex items-center gap-2">
              <ExternalLink size={18} />
              Ver Perfil Público
            </Link>
          </Button>
          <Button 
            onClick={handleSave}
            disabled={saving}
            className={`rounded-2xl h-12 px-8 font-black shadow-xl transition-all active:scale-95 flex items-center gap-2 ${
              success ? 'bg-green-500 hover:bg-green-600' : 'bg-[#f7941d] hover:bg-[#f7941d]/90'
            } text-white`}
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : success ? (
              <CheckCircle2 size={20} />
            ) : (
              <Save size={20} />
            )}
            {success ? 'Salvo!' : saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>

      {/* Visual Assets (Cover & Avatar) */}
      <div className="relative">
        {/* Cover Image */}
        <div className="relative h-64 w-full rounded-3xl overflow-hidden group bg-slate-100 border border-slate-200">
          <Image 
            src={profile.cover} 
            alt="Cover" 
            width={1200}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <button 
              onClick={() => coverInputRef.current?.click()}
              className="bg-white/90 hover:bg-white text-[#103569] px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all scale-90 group-hover:scale-100"
            >
              <Camera size={18} />
              Alterar Capa
            </button>
          </div>
          <input type="file" ref={coverInputRef} className="hidden" accept="image/*" />
        </div>

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-8 group">
          <div className="relative w-40 h-40 rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-white">
            <Image 
              src={profile.avatar} 
              alt="Avatar" 
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <Camera size={24} className="text-white" />
            </div>
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
        </div>
      </div>

      <div className="pt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Information Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
              <User className="text-[#f7941d]" size={20} />
              <h3 className="text-xl font-black text-[#103569]">Informações Básicas</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Nome Completo</label>
                <Input 
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Especialidade Principal</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <Input 
                    value={profile.specialty}
                    onChange={(e) => setProfile({...profile, specialty: e.target.value})}
                    className="h-12 pl-10 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Localização</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <Input 
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    className="h-12 pl-10 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Tempo de Experiência</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <Input 
                    value={profile.experience}
                    onChange={(e) => setProfile({...profile, experience: e.target.value})}
                    className="h-12 pl-10 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Sobre Você (Biografia)</label>
              <Textarea 
                value={profile.description}
                onChange={(e) => setProfile({...profile, description: e.target.value})}
                className="min-h-[150px] rounded-xl border-slate-100 focus:ring-[#f7941d] font-medium text-slate-600 leading-relaxed p-4"
                placeholder="Conte sobre sua trajetória, diferenciais e especialidades..."
              />
              <p className="text-[10px] text-slate-400 font-bold">Recomendado: No mínimo 100 caracteres para melhor ranqueamento.</p>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
              <div className="flex items-center gap-2">
                <Award className="text-[#f7941d]" size={20} />
                <h3 className="text-xl font-black text-[#103569]">Certificações e Habilidades</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-[#f7941d] font-black hover:bg-[#f7941d]/5 rounded-xl">
                <Plus size={18} className="mr-1" />
                Adicionar
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              {profile.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 group">
                  <span className="font-bold text-[#103569]">{cert}</span>
                  <button className="text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Preview & Tips */}
        <div className="space-y-6">
          <div className="bg-[#103569] p-8 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-[#103569]/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <h3 className="text-xl font-black mb-4 relative z-10 flex items-center gap-2">
              <div className="w-2 h-8 bg-[#f7941d] rounded-full"></div>
              Dicas de Perfil
            </h3>
            <ul className="space-y-4 relative z-10">
              <li className="flex gap-3 text-white/70 text-sm font-medium">
                <div className="h-5 w-5 rounded-full bg-white/10 shrink-0 flex items-center justify-center text-[10px] text-white">1</div>
                Use uma foto de perfil profissional e clara.
              </li>
              <li className="flex gap-3 text-white/70 text-sm font-medium">
                <div className="h-5 w-5 rounded-full bg-white/10 shrink-0 flex items-center justify-center text-[10px] text-white">2</div>
                Sua biografia deve transmitir confiança e autoridade.
              </li>
              <li className="flex gap-3 text-white/70 text-sm font-medium">
                <div className="h-5 w-5 rounded-full bg-white/10 shrink-0 flex items-center justify-center text-[10px] text-white">3</div>
                A capa ajuda a contextualizar seu ambiente de trabalho.
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h4 className="text-sm font-black text-[#103569] uppercase tracking-widest mb-4">Completude do Perfil</h4>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div className="w-[85%] h-full bg-linear-to-r from-[#f7941d] to-[#ffb35c]"></div>
            </div>
            <p className="text-xs font-bold text-slate-400 text-right">85% Completo</p>
            <p className="text-xs text-slate-500 font-medium mt-4 leading-relaxed">
              Adicione fotos do seu portfólio para chegar aos <span className="text-[#f7941d] font-bold">100%</span> e ganhar o selo de <span className="text-[#103569] font-bold">Profissional Verificado</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
