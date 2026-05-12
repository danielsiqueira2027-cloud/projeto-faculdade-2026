'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Briefcase, Lock, Mail, Loader2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfessionalLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock login logic
    setTimeout(() => {
      const mockUser = {
        id: 'pro-123',
        name: 'Construtora Silva',
        email: email || 'prof@clickservico.com.br',
        role: 'professional'
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('userRole', 'professional');
      localStorage.setItem('isLoggedIn', 'true');
      
      setLoading(false);
      router.push('/dashboard/profissional');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bp-surface-low flex flex-col items-center justify-center p-4">
      <Link href="/" className="mb-8 flex flex-col items-center gap-2 group">
        <div className="bg-[#103569] p-3 rounded-2xl shadow-xl group-hover:scale-110 transition-transform">
          <Briefcase className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-black text-[#103569] tracking-tighter">ClickServiço <span className="text-[#f7941d]">Pro</span></h1>
      </Link>

      <Card className="w-full max-w-md border-bp-outline-variant shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
        <CardHeader className="bg-[#103569] text-white text-center pb-12 pt-10 px-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          <CardTitle className="text-2xl font-black tracking-tight relative z-10">Área do Profissional</CardTitle>
          <CardDescription className="text-white/60 font-bold relative z-10">Acesse sua conta para gerenciar seus serviços e orçamentos.</CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6 -mt-6 bg-white rounded-t-[2rem] relative z-20">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest ml-1">E-mail Profissional</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#103569]/20" size={18} />
                <Input 
                  type="email"
                  placeholder="seu@email.com.br" 
                  className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-[#f7941d] font-bold" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">Senha</label>
                <Link href="#" className="text-[10px] font-black text-[#f7941d] uppercase hover:underline">Esqueceu?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#103569]/20" size={18} />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-[#f7941d] font-bold" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#f7941d] hover:bg-[#f7941d]/90 text-white rounded-2xl shadow-xl shadow-[#f7941d]/20 transition-all active:scale-95 font-black text-lg flex items-center justify-center gap-3 mt-6"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : "Entrar no Painel Pro"}
            </Button>
          </form>

          <div className="pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
            <p className="text-center text-sm text-slate-500 font-bold">
              Ainda não é um parceiro?
            </p>
            <Button variant="outline" asChild className="w-full h-12 rounded-2xl border-[#103569] text-[#103569] font-black hover:bg-[#103569]/5">
              <Link href="/cadastro">Cadastrar-se como Profissional</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Link href="/" className="mt-8 text-[#103569]/40 hover:text-[#103569] transition-colors font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
        <ChevronLeft size={14} /> Voltar para o Início
      </Link>
    </div>
  );
}
