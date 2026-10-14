'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  User,
  Camera,
  Save,
  ExternalLink,
  MapPin,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Lock,
  Trash2,
  ImagePlus,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getProfessionalProfile, saveProfessionalProfile } from '@/app/actions/profile-settings';
import ImageCropper from '@/components/ImageCropper';
import { DeleteAccountModal } from '@/components/DeleteAccountModal';
import { mascararTelefone } from '@/lib/validators';

const BIO_MIN = 20;
const BIO_MAX = 1000;
const BANNER_MAX_BYTES = 2 * 1024 * 1024; // 2 MB
const BANNER_ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

type ProfileState = {
  name: string;
  email: string;
  avatarUrl: string;
  bannerUrl: string;
  specialty: string;
  bio: string;
  phone: string;
  location: string;
  addressStreet: string;
  addressNumber: string;
  addressComplement: string;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  addressCep: string;
  cpf: string;
};

const EMPTY_PROFILE: ProfileState = {
  name: '',
  email: '',
  avatarUrl: '',
  bannerUrl: '',
  specialty: '',
  bio: '',
  phone: '',
  location: '',
  addressStreet: '',
  addressNumber: '',
  addressComplement: '',
  addressNeighborhood: '',
  addressCity: '',
  addressState: '',
  addressCep: '',
  cpf: '',
};

export default function EditProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileState>(EMPTY_PROFILE);
  const [savedProfile, setSavedProfile] = useState<ProfileState>(EMPTY_PROFILE);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Banner states
  const [bannerUploading, setBannerUploading] = useState(false);
  const [bannerError, setBannerError] = useState('');
  const [bannerSuccess, setBannerSuccess] = useState('');

  // Avatar crop
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // isDirty: true se qualquer campo do perfil foi alterado em relação ao que veio do servidor
  const isDirty = JSON.stringify(profile) !== JSON.stringify(savedProfile) || password.length > 0;

  // ── Carregar perfil ───────────────────────────────────────────────────────
  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfessionalProfile();
        if (data) {
          const loaded: ProfileState = {
            name: data.name || '',
            email: data.email || '',
            avatarUrl: data.avatarUrl || '',
            bannerUrl: data.bannerUrl || '',
            specialty: data.specialty || '',
            bio: data.bio || '',
            phone: data.phone || '',
            location: data.location || '',
            addressStreet: data.addressStreet || '',
            addressNumber: data.addressNumber || '',
            addressComplement: data.addressComplement || '',
            addressNeighborhood: data.addressNeighborhood || '',
            addressCity: data.addressCity || '',
            addressState: data.addressState || '',
            addressCep: data.addressCep || '',
            cpf: data.cpfMasked || '',
          };
          setProfile(loaded);
          setSavedProfile(loaded);
        }
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar dados do perfil profissional.');
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  // ── Handlers Avatar ───────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // ── Handlers Banner ───────────────────────────────────────────────────────
  const handleBannerFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!e.target.value) return;
    // reset input para permitir reenvio do mesmo arquivo
    e.target.value = '';

    if (!file) return;

    // Validação no cliente
    if (!BANNER_ALLOWED_MIME.includes(file.type)) {
      setBannerError('Formato inválido. Use JPG, PNG ou WebP.');
      return;
    }
    if (file.size > BANNER_MAX_BYTES) {
      setBannerError('Arquivo muito grande. O limite para a capa é 2 MB.');
      return;
    }

    setBannerError('');
    setBannerSuccess('');
    setBannerUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/profile/banner', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();

      if (!res.ok || result.error) {
        setBannerError(result.error || 'Erro ao enviar a capa.');
        return;
      }

      // Atualiza estado local com a nova URL
      setProfile((prev) => ({ ...prev, bannerUrl: result.url }));
      setSavedProfile((prev) => ({ ...prev, bannerUrl: result.url }));
      setBannerSuccess(result.warning || 'Capa atualizada com sucesso!');
      setTimeout(() => setBannerSuccess(''), 4000);
      router.refresh();
    } catch (err) {
      console.error('[Banner Upload]', err);
      setBannerError('Erro inesperado ao enviar a capa.');
    } finally {
      setBannerUploading(false);
    }
  }, [router]);

  const handleRemoveBanner = useCallback(async () => {
    if (!profile.bannerUrl) return;
    setBannerError('');
    setBannerSuccess('');
    setBannerUploading(true);

    try {
      const res = await fetch('/api/profile/banner', { method: 'DELETE' });
      const result = await res.json();

      if (!res.ok || result.error) {
        setBannerError(result.error || 'Erro ao remover a capa.');
        return;
      }

      setProfile((prev) => ({ ...prev, bannerUrl: '' }));
      setSavedProfile((prev) => ({ ...prev, bannerUrl: '' }));
      setBannerSuccess('Capa removida com sucesso.');
      setTimeout(() => setBannerSuccess(''), 3000);
      router.refresh();
    } catch (err) {
      console.error('[Banner Remove]', err);
      setBannerError('Erro inesperado ao remover a capa.');
    } finally {
      setBannerUploading(false);
    }
  }, [profile.bannerUrl, router]);

  // ── Salvar Perfil ─────────────────────────────────────────────────────────
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
      const res = await saveProfessionalProfile({
        ...profile,
        password: password || null,
      });

      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        setPassword('');
        setSavedProfile({ ...profile });
        setTimeout(() => setSuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao salvar informações.');
    } finally {
      setSaving(false);
    }
  };

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-10 h-10 border-4 border-[#103569]/10 border-t-[#f7941d] rounded-full animate-spin" />
        <p className="text-slate-500 font-bold">Carregando seus dados...</p>
      </div>
    );
  }

  const initials = profile.name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'P';

  const bioLen = profile.bio.length;
  const bioTooShort = bioLen > 0 && bioLen < BIO_MIN;
  const bioTooLong = bioLen > BIO_MAX;
  const bioColor = bioTooLong
    ? 'text-red-500'
    : bioTooShort
      ? 'text-amber-500'
      : 'text-slate-400';

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter">Meu Perfil Profissional</h2>
          <p className="text-slate-500 font-bold">Gerencie como seu perfil aparece para os clientes.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button asChild variant="outline" className="rounded-2xl border-slate-200 font-bold text-[#103569] h-12">
            <Link href="/perfil-profissional" target="_blank" className="flex items-center gap-2">
              <ExternalLink size={18} />
              Ver Perfil Público
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Visual Assets ─────────────────────────────────────────────────── */}
      <div className="relative">
        {/* Banner / Capa */}
        <div className="relative h-48 w-full rounded-3xl overflow-hidden group bg-[#103569]">
          {profile.bannerUrl ? (
            <Image
              src={profile.bannerUrl}
              alt="Capa do perfil"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          )}

          {/* Overlay de ações do banner */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => bannerInputRef.current?.click()}
              disabled={bannerUploading}
              className="flex items-center gap-2 bg-white/90 hover:bg-white text-[#103569] font-bold text-sm px-4 py-2.5 rounded-xl min-h-[44px] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label="Alterar capa"
            >
              <ImagePlus size={16} />
              {bannerUploading ? 'Enviando...' : 'Alterar capa'}
            </button>
            {profile.bannerUrl && (
              <button
                type="button"
                onClick={handleRemoveBanner}
                disabled={bannerUploading}
                className="flex items-center gap-2 bg-white/90 hover:bg-rose-50 text-rose-600 font-bold text-sm px-4 py-2.5 rounded-xl min-h-[44px] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Remover capa"
              >
                <X size={16} />
                Remover capa
              </button>
            )}
          </div>

          <input
            type="file"
            ref={bannerInputRef}
            onChange={handleBannerFileChange}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            aria-label="Enviar arquivo de capa"
          />
        </div>

        {/* Toast de banner */}
        {(bannerError || bannerSuccess) && (
          <div className={`mt-2 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold ${bannerError ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
            {bannerError ? <AlertCircle size={16} className="shrink-0" /> : <CheckCircle2 size={16} className="shrink-0" />}
            {bannerError || bannerSuccess}
          </div>
        )}

        {/* Avatar */}
        <div className="absolute -bottom-16 left-8 group">
          <div className="relative w-36 h-36 rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-white">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt="Avatar"
                fill
                sizes="144px"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#103569] text-white flex items-center justify-center text-4xl font-black">
                {initials}
              </div>
            )}
            <div
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              role="button"
              aria-label="Alterar foto de perfil"
            >
              <Camera size={24} className="text-white" />
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      <div className="pt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 bg-red-50 text-red-600 px-5 py-4 rounded-2xl border border-red-100">
                <AlertCircle size={20} className="shrink-0" />
                <span className="text-sm font-semibold">{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-3 bg-green-50 text-green-600 px-5 py-4 rounded-2xl border border-green-100">
                <CheckCircle2 size={20} className="shrink-0" />
                <span className="text-sm font-semibold">Perfil profissional atualizado com sucesso!</span>
              </div>
            )}

            {/* Informações de Conta */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                <User className="text-[#f7941d]" size={20} />
                <h3 className="text-xl font-black text-[#103569]">Informações de Conta</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nome Completo</label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">E-mail</label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Telefone Profissional</label>
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: mascararTelefone(e.target.value) })}
                    placeholder="(11) 99999-9999"
                    inputMode="tel"
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Alterar Senha (Opcional)</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      className="h-12 pl-10 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Atuação Profissional */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                <Briefcase className="text-[#f7941d]" size={20} />
                <h3 className="text-xl font-black text-[#103569]">Atuação Profissional</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Especialidade Principal</label>
                  <Input
                    value={profile.specialty}
                    onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                    placeholder="Ex: Eletricista Residencial, Pintor, etc."
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Localidade / Região</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <Input
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      placeholder="Ex: Americana - SP"
                      className="h-12 pl-10 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">CPF (cadastrado)</label>
                  <Input
                    value={profile.cpf}
                    readOnly
                    placeholder="Não informado"
                    className="h-12 rounded-xl border-slate-100 bg-slate-50 text-slate-400 font-bold cursor-not-allowed"
                    title="O CPF só pode ser alterado via suporte."
                  />
                </div>
              </div>

              {/* Bio com contador */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Biografia Profissional</label>
                  <span className={`text-xs font-bold tabular-nums ${bioColor}`}>
                    {bioLen}/{BIO_MAX}
                    {bioTooShort && <span className="ml-1 text-amber-500">(mín. {BIO_MIN})</span>}
                  </span>
                </div>
                <Textarea
                  value={profile.bio}
                  onChange={(e) => {
                    if (e.target.value.length <= BIO_MAX) {
                      setProfile({ ...profile, bio: e.target.value });
                    }
                  }}
                  className={`min-h-[150px] rounded-xl border-slate-100 focus:ring-[#f7941d] font-medium text-slate-600 leading-relaxed p-4 ${bioTooLong ? 'border-red-300 focus:ring-red-400' : ''}`}
                  placeholder="Conte sobre sua trajetória, diferenciais e especialidades... (mín. 20, máx. 1000 caracteres)"
                />
              </div>
            </div>

            {/* Endereço */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                <MapPin className="text-[#f7941d]" size={20} />
                <h3 className="text-xl font-black text-[#103569]">Endereço Completo</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">CEP</label>
                  <Input
                    value={profile.addressCep}
                    onChange={(e) => setProfile({ ...profile, addressCep: e.target.value })}
                    placeholder="00000-000"
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Logradouro / Rua</label>
                  <Input
                    value={profile.addressStreet}
                    onChange={(e) => setProfile({ ...profile, addressStreet: e.target.value })}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Número</label>
                  <Input
                    value={profile.addressNumber}
                    onChange={(e) => setProfile({ ...profile, addressNumber: e.target.value })}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Complemento</label>
                  <Input
                    value={profile.addressComplement}
                    onChange={(e) => setProfile({ ...profile, addressComplement: e.target.value })}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Bairro</label>
                  <Input
                    value={profile.addressNeighborhood}
                    onChange={(e) => setProfile({ ...profile, addressNeighborhood: e.target.value })}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Cidade</label>
                  <Input
                    value={profile.addressCity}
                    onChange={(e) => setProfile({ ...profile, addressCity: e.target.value })}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Estado (UF)</label>
                  <Input
                    value={profile.addressState}
                    onChange={(e) => setProfile({ ...profile, addressState: e.target.value })}
                    placeholder="UF"
                    maxLength={2}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
              </div>
            </div>

            {/* Botão Salvar */}
            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={saving || !isDirty || bioTooLong || bioTooShort}
                className="bg-[#103569] hover:bg-[#103569]/90 text-white rounded-2xl h-14 px-10 font-black shadow-xl flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
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

          {/* Zona de Perigo */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="font-black text-rose-950 text-base">Zona de Perigo</h3>
                <p className="text-xs text-rose-600/80 font-medium">
                  Ações irreversíveis relacionadas à sua conta profissional
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-rose-50">
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-gray-800">Excluir permanentemente sua conta</h4>
                <p className="text-xs text-gray-500 max-w-xl">
                  Ao excluir sua conta, seus serviços cadastrados, fotos de portfólio, avaliações, propostas e dados de acesso serão apagados definitivamente em conformidade com a LGPD.
                </p>
              </div>
              <Button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-2xl h-11 px-5 text-xs font-black shrink-0 transition-all cursor-pointer min-h-[44px]"
              >
                Excluir Conta
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Dicas */}
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
                Adicione uma capa personalizada para destacar seu perfil.
              </li>
              <li className="flex gap-3 text-white/70 text-sm font-medium">
                <div className="h-5 w-5 rounded-full bg-white/10 shrink-0 flex items-center justify-center text-[10px] text-white">3</div>
                Sua biografia deve transmitir confiança e autoridade (mín. 20 caracteres).
              </li>
              <li className="flex gap-3 text-white/70 text-sm font-medium">
                <div className="h-5 w-5 rounded-full bg-white/10 shrink-0 flex items-center justify-center text-[10px] text-white">4</div>
                Um endereço correto ajuda o ClickServiço a te recomendar localmente.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal ImageCropper (Avatar) */}
      {selectedFile && (
        <ImageCropper
          file={selectedFile}
          onClose={() => {
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
          }}
          onCropComplete={(url) => {
            setProfile((prev) => ({ ...prev, avatarUrl: url }));
            setSavedProfile((prev) => ({ ...prev, avatarUrl: url }));
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            router.refresh();
          }}
        />
      )}

      {/* Modal Exclusão de Conta */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        userType="profissional"
      />
    </div>
  );
}
