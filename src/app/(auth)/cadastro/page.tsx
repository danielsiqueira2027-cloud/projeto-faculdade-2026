'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Briefcase, User, Mail, ShieldCheck, BriefcaseBusiness, Star, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CadastroPage() {
  const [userType, setUserType] = useState<'cliente' | 'profissional'>('cliente');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock register logic
    setTimeout(() => {
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: name || 'Novo Usuário',
        email: email,
        role: userType
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('isLoggedIn', 'true');
      
      setLoading(false);
      
      if (userType === 'cliente') {
        router.push('/dashboard/cliente');
      } else {
        router.push('/dashboard/profissional');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bp-surface flex flex-col items-center justify-center p-4 py-12">
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="bg-[#103569] p-3 rounded-2xl shadow-xl">
          <Briefcase className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-black text-[#103569] tracking-tighter">ClickServiço</h1>
      </div>

      <Card className="w-full max-w-2xl border-bp-outline-variant shadow-2xl rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-2 bg-[#103569] p-8 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Crie sua conta</h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Escolha como você deseja utilizar nossa plataforma para começar.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400"><ShieldCheck size={18} /></div>
                <p className="text-xs text-white/80">Segurança garantida em todas as transações.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-yellow-400"><Star size={18} /></div>
                <p className="text-xs text-white/80">Acesso aos melhores profissionais da região.</p>
              </div>
            </div>
          </div>

          <CardContent className="md:col-span-3 p-8 bg-white space-y-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                type="button"
                onClick={() => setUserType('cliente')}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${userType === 'cliente' ? 'border-[#103569] bg-[#103569]/5 text-[#103569]' : 'border-bp-outline-variant text-bp-on-surface/40 hover:text-[#103569] hover:border-[#103569]/30'}`}
              >
                <User size={24} />
                <span className="text-xs font-bold uppercase">Cliente</span>
              </button>
              <button 
                type="button"
                onClick={() => setUserType('profissional')}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${userType === 'profissional' ? 'border-[#f7941d] bg-[#f7941d]/5 text-[#f7941d]' : 'border-bp-outline-variant text-bp-on-surface/40 hover:text-[#f7941d] hover:border-[#f7941d]/30'}`}
              >
                <BriefcaseBusiness size={24} />
                <span className="text-xs font-bold uppercase">Profissional</span>
              </button>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">Nome Completo</label>
                <Input 
                  placeholder="Como podemos te chamar?" 
                  className="h-12 rounded-xl" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">E-mail</label>
                <Input 
                  type="email" 
                  placeholder="seu@email.com" 
                  className="h-12 rounded-xl" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">Senha</label>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="h-12 rounded-xl" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">Confirmar</label>
                  <Input type="password" placeholder="••••••••" className="h-12 rounded-xl" required />
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-[#f7941d] hover:bg-[#f7941d]/90 text-white rounded-xl shadow-lg font-bold flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Criar Minha Conta"}
                </Button>
              </div>
            </form>

            <p className="text-center text-xs text-[#103569]/60">
              Ao se cadastrar, você concorda com nossos <Link href="#" className="font-bold underline">Termos</Link> e <Link href="#" className="font-bold underline">Privacidade</Link>.
            </p>
            
            <p className="text-center text-sm text-[#103569]/60 border-t pt-4">
              Já tem uma conta? <Link href="/login" className="text-[#103569] font-bold hover:underline">Entre aqui</Link>
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

