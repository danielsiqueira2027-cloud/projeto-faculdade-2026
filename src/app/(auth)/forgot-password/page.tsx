'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      // API will always return 200 for security reasons unless there's a real server error
      if (res.ok) {
        setMessage({
          type: 'success',
          text: 'Se o e-mail estiver cadastrado, você receberá um link de redefinição de senha em instantes.',
        });
        setEmail('');
      } else {
        const data = await res.json();
        setMessage({
          type: 'error',
          text: data.error || 'Ocorreu um erro ao processar a solicitação.',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Erro de conexão. Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative">
        <Link href="/login" className="absolute top-8 left-8 text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        
        <div className="text-center mt-2 mb-8">
          <h1 className="text-2xl font-bold text-[#103569] mb-2">Esqueceu a senha?</h1>
          <p className="text-slate-500 text-sm">
            Digite seu e-mail abaixo e enviaremos instruções para redefinir sua senha.
          </p>
        </div>

        {message && (
          <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-sm font-medium ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.type === 'success' ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
            <p>{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1.5">
              E-mail cadastrado
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#f7941d]/20 focus:border-[#f7941d] focus:bg-white transition-all outline-none"
                placeholder="seunome@exemplo.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full py-3.5 px-4 bg-[#0b2545] hover:bg-[#103569] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#0b2545]/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              'Enviar instruções'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Lembrou da senha?{' '}
            <Link href="/login" className="font-bold text-[#f7941d] hover:text-[#e08316] transition-colors">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
