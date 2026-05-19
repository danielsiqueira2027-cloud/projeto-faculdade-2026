'use client';

import React, { useState, useActionState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { loginAction } from '@/app/actions/auth';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="login-page-wrapper">
      <div className="login-container">

        {/* Lado Esquerdo */}
        <div className="login-left">
          <h2>Bem-vindo(a) ao</h2>
          <div className="login-logo-wrap">
            <Image
              src="/imgs/misc/logo.png"
              alt="ClickServiço"
              width={200}
              height={200}
              className="object-contain"
              priority
            />
          </div>
          <h1>ClickServiço</h1>
        </div>

        {/* Lado Direito */}
        <div className="login-right">
          <form id="loginForm" className="login-form" action={action}>
            <h2>Acesse a sua conta</h2>

            {/* Erro geral */}
            {state?.error && (
              <div className="login-error">{state.error}</div>
            )}

            {/* E-mail */}
            <div className="input-group">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,12 2,6" />
              </svg>
              <input
                id="loginEmail"
                name="email"
                type="email"
                placeholder="E-mail"
                required
                autoComplete="email"
              />
            </div>

            {/* Senha */}
            <div className="input-group">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="loginPassword"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-senha"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button id="loginBtn" type="submit" className="btn" disabled={pending}>
              {pending ? 'ENTRANDO...' : 'ENTRAR'}
            </button>

            <Link href="#" className="forgot">Esqueci minha senha</Link>

            <p className="register-text">
              Ainda não tem cadastro?{' '}
              <Link href="/cadastro" className="register-link">Crie uma conta</Link>
            </p>
          </form>
        </div>
      </div>

      <style>{`
        .login-page-wrapper {
          min-height: 100vh;
          background: #efefef;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Poppins', 'Inter', sans-serif;
        }
        .login-container {
          display: flex;
          width: 900px;
          max-width: 95%;
          min-height: 480px;
          background: #fff;
          border-radius: 15px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .login-left {
          background: #ffeecb;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #1f3c88;
          padding: 30px;
        }
        .login-left h2 { font-weight: 700; margin-bottom: 15px; font-size: 1.2rem; }
        .login-logo-wrap { width: 160px; height: 160px; position: relative; margin-bottom: 15px; }
        .login-left h1 { font-weight: 700; font-size: 1.8rem; letter-spacing: 0.5px; }
        .login-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .login-form { width: 100%; max-width: 320px; }
        .login-form h2 { text-align: center; font-weight: 700; font-size: 1.3rem; margin-bottom: 25px; color: #222; }
        .login-error {
          background: #fff0f0;
          border: 1px solid #ffcccc;
          color: #cc0000;
          font-size: 0.88rem;
          font-weight: 600;
          padding: 10px 14px;
          border-radius: 10px;
          margin-bottom: 16px;
          text-align: center;
        }
        .input-group {
          display: flex;
          align-items: center;
          background: #f2f2f2;
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 15px;
          position: relative;
        }
        .input-icon { width: 20px; height: 20px; margin-right: 10px; flex-shrink: 0; opacity: 0.45; color: #333; }
        .input-group input {
          border: none; background: transparent; width: 100%;
          font-size: 0.95rem; outline: none; color: #222; font-family: inherit;
        }
        .toggle-senha {
          background: transparent; border: none; cursor: pointer; color: #999;
          padding: 0; margin-left: 8px; display: flex; align-items: center; transition: color 0.2s;
        }
        .toggle-senha:hover { color: #1f3c88; }
        .btn {
          width: 100%; background: #fddfa2; border: none; color: #222; font-weight: 700;
          padding: 12px; border-radius: 25px; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          transition: background 0.2s; font-family: inherit; font-size: 0.95rem; letter-spacing: 0.04em;
        }
        .btn:hover:not(:disabled) { background: #f5d090; }
        .btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .forgot {
          display: block; text-align: center; font-size: 0.85rem; color: #555;
          text-decoration: none; padding: 10px; margin-bottom: 18px; margin-top: 6px;
        }
        .forgot:hover { color: #1f3c88; }
        .register-text { text-align: center; font-size: 0.9rem; color: #444; margin-top: 10px; }
        .register-link { color: #1f3c88; text-decoration: none; font-weight: 600; transition: 0.2s; }
        .register-link:hover { text-decoration: underline; }
        @media (max-width: 750px) {
          .login-container { flex-direction: column; height: auto; }
          .login-left { padding: 25px; }
          .login-logo-wrap { width: 80px; height: 80px; }
        }
      `}</style>
    </div>
  );
}
