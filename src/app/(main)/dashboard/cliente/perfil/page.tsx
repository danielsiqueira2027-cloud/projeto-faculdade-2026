'use client';

import React, { useState, useEffect, useRef } from 'react';
import { UserCircle, Mail, Phone, Camera, Save, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getClientProfile, saveClientProfile } from '@/app/actions/profile-settings';
import ImageCropper from '@/components/ImageCropper';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const fieldClass =
  'w-full bg-[#fefccf]/30 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#103569]/10 outline-none transition-all font-medium text-[#103569] placeholder:text-[#103569]/20';
const labelClass = 'text-[10px] font-black text-[#103569] uppercase tracking-widest ml-1';

export default function ClientProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    avatarUrl: '',
  });
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load client profile on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getClientProfile();
        setProfile({
          name: data?.name || '',
          email: data?.email || '',
          phone: data?.phone || '',
          avatarUrl: data?.avatarUrl || '',
        });
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar dados do perfil.');
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError('');

    if (!profile.name.trim()) {
      setError('O nome é obrigatório.');
      setSaving(false);
      return;
    }
    if (!profile.email.trim()) {
      setError('O e-mail é obrigatório.');
      setSaving(false);
      return;
    }

    try {
      const res = await saveClientProfile({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        password: password || null,
        avatarUrl: profile.avatarUrl,
      });

      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        setPassword('');
        // Clear message after 4s
        setTimeout(() => setSuccess(false), 4000);
      }
    } catch (err: any) {
      setError('Erro ao atualizar perfil.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-10 h-10 border-4 border-[#103569]/10 border-t-[#f7941d] rounded-full animate-spin" />
        <p className="text-slate-500 font-bold">Carregando seus dados...</p>
      </div>
    );
  }

  // Get initials for fallback avatar
  const initials = profile.name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'C';

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
              {profile.avatarUrl ? (
                <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-lg ring-4 ring-white">
                  <Image
                    src={profile.avatarUrl}
                    alt="Foto de perfil"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-28 h-28 rounded-full bg-[#103569] text-white flex items-center justify-center text-4xl font-black shadow-lg ring-4 ring-white">
                  {initials}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-[#f7941d] text-white flex items-center justify-center shadow-lg hover:bg-[#f7941d]/90 transition-colors border-4 border-white cursor-pointer"
                title="Alterar foto"
              >
                <Camera size={16} />
              </button>
            </div>
            <h3 className="text-xl font-black text-[#103569]">{profile.name || 'Cliente'}</h3>
            <p className="text-sm text-slate-400 font-medium mt-1">Cliente</p>
            <p className="text-xs text-slate-300 mt-6 leading-relaxed">
              Clique no ícone da câmera para atualizar sua foto de perfil.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-[#103569] mb-8">Informações Pessoais</h3>

            <form onSubmit={handleSave} className="space-y-8">
              {error && (
                <div className="flex items-center gap-3 bg-red-50 text-red-600 px-5 py-4 rounded-2xl border border-red-100 animate-in slide-in-from-top-1">
                  <AlertCircle size={20} className="shrink-0" />
                  <span className="text-sm font-semibold">{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-3 bg-green-50 text-green-600 px-5 py-4 rounded-2xl border border-green-100 animate-in slide-in-from-top-1">
                  <CheckCircle2 size={20} className="shrink-0" />
                  <span className="text-sm font-semibold">Perfil atualizado com sucesso!</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClass}>Nome Completo</label>
                  <div className="relative">
                    <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-[#103569]/30" size={18} />
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className={`${fieldClass} pl-12`}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#103569]/30" size={18} />
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className={`${fieldClass} pl-12`}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClass}>Telefone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#103569]/30" size={18} />
                    <input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className={`${fieldClass} pl-12`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Alterar Senha (Opcional)</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#103569]/30" size={18} />
                    <input
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${fieldClass} pl-12`}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-[#103569] hover:bg-[#103569]/90 text-white rounded-2xl h-14 px-10 font-black shadow-xl flex items-center gap-3 transition-all active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>Salvar Alterações</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Image Cropper Modal */}
      {selectedFile && (
        <ImageCropper
          file={selectedFile}
          onClose={() => {
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
          }}
          onCropComplete={(url) => {
            setProfile({ ...profile, avatarUrl: url });
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
