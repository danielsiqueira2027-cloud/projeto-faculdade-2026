'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Briefcase, Lock, Mail, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock login logic
    setTimeout(() => {
      const isProfessional = email.includes('prof');
      
      const mockUser = {
        id: '123',
        name: isProfessional ? 'Construtora Silva' : 'Daniel Siqueira',
        email: email || 'usuario@teste.com',
        role: isProfessional ? 'professional' : 'cliente'
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('userRole', isProfessional ? 'professional' : 'cliente');
      localStorage.setItem('isLoggedIn', 'true');
      
      setLoading(false);
      
      if (isProfessional) {
        router.push('/dashboard/profissional');
      } else {
        router.push('/dashboard/cliente');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bp-surface-low flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="bg-[#103569] p-3 rounded-2xl shadow-xl">
          <Briefcase className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-black text-[#103569] tracking-tighter">ClickServiço</h1>
      </div>

      <Card className="w-full max-w-md border-bp-outline-variant shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-[#103569] text-white text-center pb-8 pt-10">
          <CardTitle className="text-2xl font-bold">Bem-vindo de volta!</CardTitle>
          <CardDescription className="text-white/70">Acesse sua conta para gerenciar seus serviços.</CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6 -mt-4 bg-white rounded-t-3xl">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#103569] uppercase tracking-widest">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#103569]/30" size={18} />
                <Input 
                  placeholder="seu@email.com" 
                  className="pl-10 h-12 rounded-xl border-bp-outline-variant focus:ring-[#f7941d]" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#103569] uppercase tracking-widest">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#103569]/30" size={18} />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 h-12 rounded-xl border-bp-outline-variant focus:ring-[#f7941d]" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-[#103569]/60">
                <input type="checkbox" className="rounded border-bp-outline-variant text-[#f7941d]" />
                Lembrar-me
              </label>
              <Link href="#" className="text-[#103569] font-bold hover:underline">Esqueceu a senha?</Link>
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#f7941d] hover:bg-[#f7941d]/90 text-white rounded-xl shadow-lg transition-transform active:scale-95 font-bold flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Entrar no Painel"}
            </Button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-bp-outline-variant"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-[#103569]/40 font-bold">Ou entre com</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="rounded-xl h-12 border-bp-outline-variant hover:bg-bp-surface-low">Google</Button>
            <Button variant="outline" className="rounded-xl h-12 border-bp-outline-variant hover:bg-bp-surface-low">Facebook</Button>
          </div>

          <p className="text-center text-sm text-[#103569]/60">
            Não tem uma conta? <Link href="/cadastro" className="text-[#f7941d] font-bold hover:underline">Cadastre-se grátis</Link>
          </p>
          <p className="text-center text-[10px] text-[#103569]/40 mt-2 italic">
            Dica: Use um e-mail com "prof" para entrar como profissional.
          </p>
        </CardContent>
      </Card>
      
      <Link href="/" className="mt-8 text-[#103569]/40 hover:text-[#103569] transition-colors font-bold uppercase tracking-widest text-xs flex items-center gap-2">
        &larr; Voltar para a Vitrine
      </Link>
    </div>
  );
}

