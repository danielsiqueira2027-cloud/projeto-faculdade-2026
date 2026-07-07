'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Clock, 
  AlertCircle,
  CheckCircle2,
  Lock,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getProfessionalProfile, saveProfessionalProfile } from '@/app/actions/profile-settings';
import ImageCropper from '@/components/ImageCropper';

export default function EditProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatarUrl: '',
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
  });

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load professional profile on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfessionalProfile();
        if (data) {
          setProfile({
            name: data.user?.name || '',
            email: data.user?.email || '',
            avatarUrl: data.user?.avatarUrl || '',
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
            cpf: data.cpf || '',
          });
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
      const res = await saveProfessionalProfile({
        ...profile,
        password: password || null,
      });

      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        setPassword('');
        setTimeout(() => setSuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao salvar informações.');
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
    .toUpperCase() || 'P';

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter">Meu Perfil Profissional</h2>
          <p className="text-slate-500 font-bold">Gerencie como seu perfil aparece para os clientes.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="rounded-2xl border-slate-200 font-bold text-[#103569] h-12">
            <Link href="/perfil-profissional" target="_blank" className="flex items-center gap-2">
              <ExternalLink size={18} />
              Ver Perfil Público
            </Link>
          </Button>
        </div>
      </div>

      {/* Visual Assets (Cover & Avatar) */}
      <div className="relative">
        {/* Cover Image (Decorative Static) */}
        <div className="relative h-48 w-full rounded-3xl overflow-hidden group bg-slate-100 border border-slate-200">
          <Image 
            src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&h=400&fit=crop" 
            alt="Capa Decorativa" 
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Profile Image */}
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
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => fileInputRef.current?.click()}>
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
        {/* Left Column: Information Form */}
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

            {/* Basic Info */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                <User className="text-[#f7941d]" size={20} />
                <h3 className="text-xl font-black text-[#103569]">Informações de Conta</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nome Completo</label>
                  <Input 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">E-mail</label>
                  <Input 
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Telefone Profissional</label>
                  <Input 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    placeholder="(11) 99999-9999"
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

            {/* Professional Info */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                <Briefcase className="text-[#f7941d]" size={20} />
                <h3 className="text-xl font-black text-[#103569]">Atuação Profissional</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Especialidade Principal</label>
                  <Input 
                    value={profile.specialty}
                    onChange={(e) => setProfile({...profile, specialty: e.target.value})}
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
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      placeholder="Ex: Americana - SP"
                      className="h-12 pl-10 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">CPF</label>
                  <Input 
                    value={profile.cpf}
                    onChange={(e) => setProfile({...profile, cpf: e.target.value})}
                    placeholder="000.000.000-00"
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Biografia Profissional</label>
                <Textarea 
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="min-h-[150px] rounded-xl border-slate-100 focus:ring-[#f7941d] font-medium text-slate-600 leading-relaxed p-4"
                  placeholder="Conte sobre sua trajetória, diferenciais e especialidades..."
                />
              </div>
            </div>

            {/* Address Info */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                <MapPin className="text-[#f7941d]" size={20} />
                <h3 className="text-xl font-black text-[#103569]">Endereço Completo</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">CEP</label>
                  <Input 
                    value={profile.addressCep}
                    onChange={(e) => setProfile({...profile, addressCep: e.target.value})}
                    placeholder="00000-000"
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Logradouro / Rua</label>
                  <Input 
                    value={profile.addressStreet}
                    onChange={(e) => setProfile({...profile, addressStreet: e.target.value})}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Número</label>
                  <Input 
                    value={profile.addressNumber}
                    onChange={(e) => setProfile({...profile, addressNumber: e.target.value})}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Complemento</label>
                  <Input 
                    value={profile.addressComplement}
                    onChange={(e) => setProfile({...profile, addressComplement: e.target.value})}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Bairro</label>
                  <Input 
                    value={profile.addressNeighborhood}
                    onChange={(e) => setProfile({...profile, addressNeighborhood: e.target.value})}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Cidade</label>
                  <Input 
                    value={profile.addressCity}
                    onChange={(e) => setProfile({...profile, addressCity: e.target.value})}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Estado (UF)</label>
                  <Input 
                    value={profile.addressState}
                    onChange={(e) => setProfile({...profile, addressState: e.target.value})}
                    placeholder="UF"
                    maxLength={2}
                    className="h-12 rounded-xl border-slate-100 focus:ring-[#f7941d] font-bold text-[#103569]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
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
                Um endereço correto ajuda o ClickServiço a te recomendar localmente.
              </li>
            </ul>
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
