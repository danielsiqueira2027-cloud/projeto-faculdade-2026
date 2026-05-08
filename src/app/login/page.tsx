'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Bolt, Shield, Star, ArrowRight, Loader2 } from 'lucide-react';
import { BlueprintInput } from '@/components/ui/BlueprintInput';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (!username.trim()) newErrors.username = 'O campo usuário é obrigatório.';
    else if (username.trim().length < 3) newErrors.username = 'Usuário deve ter ao menos 3 caracteres.';
    if (!password) newErrors.password = 'O campo senha é obrigatório.';
    else if (password.length < 4) newErrors.password = 'Senha muito curta.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    alert('Login realizado com sucesso! (Demonstração)');
  };

  return (
    /* Full-viewport, centered, same neutral bg as rest of site */
    <div className="flex min-h-[calc(100vh-130px)] items-center justify-center bg-[#E8EDF5] px-4 py-10">
      <div
        className="flex w-full max-w-[900px] overflow-hidden rounded-3xl shadow-2xl"
        style={{ minHeight: '560px' }}
      >

        {/* ── LEFT PANEL ── */}
        <aside
          className="relative hidden flex-col items-center justify-center overflow-hidden px-10 py-12 text-center md:flex"
          style={{ flex: '0 0 40%', background: '#FDE9C9' }}
        >
          {/* Decorative blobs */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-50"
            style={{ background: 'radial-gradient(circle, rgba(232,106,43,.4) 0%, transparent 70%)', filter: 'blur(36px)' }}
          />
          <div
            className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full opacity-50"
            style={{ background: 'radial-gradient(circle, rgba(0,74,173,.28) 0%, transparent 70%)', filter: 'blur(36px)' }}
          />

          {/* Content */}
          <p className="mb-5 text-xs font-bold uppercase tracking-widest text-[#0A1D37]/60">
            Bem-vindo(a) ao
          </p>

          {/* Logo */}
          <div className="relative mb-5 flex h-48 w-48 items-center justify-center">
            {/* glow ring */}
            <div
              className="absolute inset-0 rounded-full animate-pulse"
              style={{ background: 'radial-gradient(circle, #FDE9C9 40%, transparent 72%)' }}
            />
            <Image
              src="/logo.png"
              alt="Logo ClickServiço"
              width={180}
              height={180}
              className="relative z-10 drop-shadow-xl object-contain transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>

          {/* Brand name */}
          <h1 className="mb-1 text-[2rem] font-black leading-none tracking-tight">
            <span className="text-[#004AAD]">Click</span>
            <span className="text-[#0A1D37]">Serviço</span>
          </h1>
          <p className="mb-7 text-xs font-medium text-[#0A1D37]/50">
            Gestão de serviços na palma da mão
          </p>

          {/* Pills */}
          <ul className="flex flex-wrap justify-center gap-2">
            {[
              { icon: Bolt,   label: 'Rápido' },
              { icon: Shield, label: 'Seguro' },
              { icon: Star,   label: 'Confiável' },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-[#0A1D37]/12 bg-[#0A1D37]/08 px-3 py-1.5 text-[11px] font-semibold text-[#0A1D37] transition-transform hover:-translate-y-0.5"
                style={{ background: 'rgba(10,29,55,0.07)' }}
              >
                <Icon className="h-3 w-3 text-[#E86A2B]" />
                {label}
              </li>
            ))}
          </ul>
        </aside>

        {/* ── RIGHT PANEL ── */}
        <section className="flex flex-1 flex-col items-center justify-center bg-white px-8 py-12 sm:px-14">
          <div className="w-full max-w-[360px]">

            {/* Brand mark */}
            <div
              className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl shadow-md"
              style={{ background: 'linear-gradient(135deg, #FDE9C9 0%, #F5D4A0 100%)' }}
            >
              <span className="text-xl font-black text-[#0A1D37]">C</span>
            </div>

            <h2 className="mb-1 text-[1.7rem] font-extrabold leading-tight tracking-tight text-[#0A1D37]">
              Acesse a sua conta
            </h2>
            <p className="mb-8 text-sm text-gray-500">
              Insira suas credenciais para continuar
            </p>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-0">

              {/* Username */}
              <div className="mb-4">
                <label htmlFor="username" className="mb-1.5 block text-[0.8rem] font-semibold text-[#0A1D37]">
                  Usuário
                </label>
                <BlueprintInput
                  id="username"
                  type="text"
                  placeholder="Digite seu usuário"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }));
                  }}
                  className={errors.username ? 'border-red-400 ring-red-200 focus-visible:border-red-400 focus-visible:ring-red-200' : ''}
                  aria-invalid={!!errors.username}
                  aria-describedby={errors.username ? 'usernameError' : undefined}
                />
                {errors.username && (
                  <p id="usernameError" className="mt-1 text-[0.74rem] font-medium text-red-500" role="alert">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-5">
                <label htmlFor="password" className="mb-1.5 block text-[0.8rem] font-semibold text-[#0A1D37]">
                  Senha
                </label>
                <div className="relative">
                  <BlueprintInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    className={`pr-12 ${errors.password ? 'border-red-400 ring-red-200 focus-visible:border-red-400 focus-visible:ring-red-200' : ''}`}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'passwordError' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#0A1D37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004AAD] rounded"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p id="passwordError" className="mt-1 text-[0.74rem] font-medium text-red-500" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Options row */}
              <div className="mb-6 flex items-center justify-between text-sm">
                <label className="flex cursor-pointer select-none items-center gap-2 text-gray-500">
                  <input type="checkbox" id="rememberMe" className="accent-[#004AAD] h-4 w-4 rounded" />
                  Lembrar de mim
                </label>
                <Link
                  href="#"
                  className="font-semibold text-[#004AAD] transition-colors hover:text-[#0A1D37] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004AAD] rounded-sm"
                >
                  Esqueci minha senha
                </Link>
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full py-4 text-sm font-extrabold uppercase tracking-widest text-[#0A1D37] shadow-md transition-all duration-300 disabled:opacity-70"
                style={{ background: loading ? '#F5D4A0' : '#FDE9C9' }}
              >
                {/* shimmer */}
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                  aria-hidden="true"
                />
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span>ENTRAR</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>

            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-gray-100" />
              <span className="text-xs text-gray-400">ou</span>
              <span className="h-px flex-1 bg-gray-100" />
            </div>

            {/* Register link */}
            <p className="text-center text-sm text-gray-500">
              Não tem uma conta?{' '}
              <Link
                href="#"
                className="font-bold text-[#004AAD] transition-colors hover:text-[#0A1D37] hover:underline"
              >
                Criar conta grátis
              </Link>
            </p>

            {/* Security note */}
            <p className="mt-8 flex items-center justify-center gap-1.5 text-[11px] text-gray-300">
              <Shield className="h-3 w-3 text-emerald-400" />
              Conexão segura e criptografada
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
