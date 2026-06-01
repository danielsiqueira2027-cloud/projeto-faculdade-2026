import React from 'react';
import Link from 'next/link';
import { ClipboardList, FileText, UserCircle, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/auth';

export default async function ClientDashboardPage() {
  const user = await getCurrentUser();
  const userName = user?.name.split(' ')[0] || 'Cliente';

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-[#103569] tracking-tighter">
          Olá, {userName}!
        </h2>
        <p className="text-slate-500 font-bold">
          Bem-vindo à sua central de serviços.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/dashboard/cliente/pedidos"
          className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#103569] mb-5 group-hover:scale-110 transition-transform">
            <ClipboardList size={28} />
          </div>
          <h3 className="text-lg font-black text-[#103569] mb-2">Meus Pedidos</h3>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            Acompanhe o status de todas as suas ordens de serviço.
          </p>
        </Link>

        <Link
          href="/orcamento"
          className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-5 group-hover:scale-110 transition-transform">
            <FileText size={28} />
          </div>
          <h3 className="text-lg font-black text-[#103569] mb-2">Novo Orçamento</h3>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            Solicite orçamentos detalhados para seu projeto.
          </p>
        </Link>

        <Link
          href="/dashboard/cliente/perfil"
          className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-[#f7941d] mb-5 group-hover:scale-110 transition-transform">
            <UserCircle size={28} />
          </div>
          <h3 className="text-lg font-black text-[#103569] mb-2">Meu Perfil</h3>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            Mantenha seus dados sempre atualizados.
          </p>
        </Link>
      </div>

      {/* Explorar Profissionais */}
      <div className="bg-[#103569] rounded-3xl p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#f7941d]/20 flex items-center justify-center shrink-0">
              <Search size={32} className="text-[#f7941d]" />
            </div>
            <div>
              <h3 className="text-2xl font-black mb-2">Precisa de um Profissional?</h3>
              <p className="text-white/70 font-medium leading-relaxed max-w-lg">
                Encontre o profissional ideal para seu projeto. Compare perfis, veja portfólios e contrate com segurança.
              </p>
            </div>
          </div>
          <Button asChild className="bg-[#f7941d] hover:bg-[#f7941d]/90 text-white rounded-2xl h-14 px-8 font-black shadow-xl shadow-[#f7941d]/30 flex items-center gap-2 group transition-all active:scale-95 shrink-0">
            <Link href="/buscas">
              Explorar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Categorias */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-[#103569]">Categorias de Serviços</h3>
          <Link href="/categorias" className="text-sm font-bold text-[#f7941d] hover:underline no-underline">
            Ver Todas
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: 'Elétrica', icon: '⚡' },
            { label: 'Hidráulica', icon: '🔧' },
            { label: 'Pintura', icon: '🎨' },
            { label: 'Construção', icon: '🏗️' },
            { label: 'Limpeza', icon: '🧹' },
            { label: 'Jardinagem', icon: '🌿' },
          ].map((cat) => (
            <Link
              key={cat.label}
              href={`/buscas?categoria=${cat.label.toLowerCase()}`}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col items-center gap-3 text-center no-underline group"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-bold text-[#103569] group-hover:text-[#f7941d] transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
