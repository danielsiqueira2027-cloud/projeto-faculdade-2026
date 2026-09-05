"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, Mail, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { adminLoginAction } from "@/app/actions/auth-admin";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="relative w-full overflow-hidden group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-blue-400 disabled:to-indigo-400 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 text-sm mt-4 transform hover:-translate-y-0.5 active:translate-y-0"
    >
      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
      <span className="relative z-10 flex items-center gap-2">
        {pending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Entrando...
          </>
        ) : (
          "Acessar Painel"
        )}
      </span>
    </button>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  
  const [state, formAction] = useActionState(adminLoginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-indigo-400/20 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10 perspective-1000">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden transition-all hover:shadow-[0_8px_40px_rgb(59,130,246,0.1)] hover:-translate-y-1 duration-500">
          
          {/* Header */}
          <div className="px-8 pt-10 pb-6 flex flex-col items-center text-center">
            <Link 
              href="/" 
              className="group flex flex-col items-center transition-transform hover:scale-105 active:scale-95 mb-6"
              title="Voltar ao início"
            >
              <div className="relative w-48 h-16">
                <Image 
                  src="/logo.png" 
                  alt="ClickServiços Logo" 
                  fill 
                  className="object-contain drop-shadow-sm" 
                  priority
                />
              </div>
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mt-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Início
              </span>
            </Link>
            
            <div className="relative inline-block">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                Painel Administrativo
              </h2>
              <div className="h-1 w-1/2 bg-blue-500 rounded-full mx-auto mt-2 opacity-80" />
            </div>
            <p className="text-slate-500 mt-3 text-sm font-medium">
              Acesso restrito para administradores
            </p>
          </div>

          {/* Form */}
          <form action={formAction} className="px-8 pb-8 space-y-6">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            
            {/* Error Banner */}
            {state?.error && (
              <div className="flex items-start gap-3 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3.5 rounded-xl text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" />
                <span className="font-medium">{state.error}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Email Field */}
              <div className="group space-y-2">
                <label
                  htmlFor="login-email"
                  className="block text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-blue-600"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-5 h-5 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="admin@clickservico.com.br"
                    className="w-full pl-11 pr-4 py-3 bg-white/60 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group space-y-2">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-blue-600"
                >
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-5 h-5 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-white/60 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <SubmitButton />
          </form>

          {/* Footer */}
          <div className="bg-slate-50/50 py-4 border-t border-slate-100">
            <p className="text-center text-xs font-medium text-slate-400">
              ClickServiço © {new Date().getFullYear()} — Acesso Protegido
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <div className="text-slate-500 font-medium">Carregando painel...</div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
