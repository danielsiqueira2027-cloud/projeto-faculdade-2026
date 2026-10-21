import Link from "next/link";
import { 
  DollarSign, 
  Users, 
  Wrench, 
  ChevronRight, 
  Briefcase, 
  UserCheck, 
  UserX, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  PlayCircle, 
  XCircle,
  ArrowUpRight
} from "lucide-react";
import { MetricCard } from "./_components/MetricCard";
import { getAdminDashboardMetrics, getRecentActivity } from "@/app/actions/admin";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const metrics = await getAdminDashboardMetrics();
  const activities = await getRecentActivity();

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Visão Geral</h2>
        <p className="text-sm text-slate-500 mt-1">
          Acompanhamento consolidado de clientes, prestadores e ordens em tempo real.
        </p>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Volume negociado (concluídos)" 
          value={`R$ ${metrics.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
          subtitle="Pagamentos combinados diretamente entre as partes"
          icon={DollarSign} 
          color="green" 
        />
        <MetricCard 
          title="Total de Clientes" 
          value={metrics.clients.toLocaleString('pt-BR')} 
          subtitle={`${metrics.activeUsers} usuário(s) ativo(s) na plataforma`}
          icon={Users} 
          color="blue" 
        />
        <MetricCard 
          title="Profissionais Cadastrados" 
          value={metrics.professionals.toLocaleString('pt-BR')} 
          subtitle={`${metrics.pendingVerification} pendente(s) de aprovação`}
          icon={Briefcase} 
          color="purple" 
        />
        <MetricCard 
          title="Total de Pedidos" 
          value={metrics.orders.toLocaleString('pt-BR')} 
          subtitle={`${metrics.ordersByStatus.CONCLUIDO || 0} serviço(s) concluído(s)`}
          icon={Wrench} 
          color="amber" 
        />
      </div>

      {/* Painel Operacional: Status dos Pedidos & Status das Contas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Distribuição de Serviços por Status */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-base font-semibold text-slate-800">Serviços por Status</h3>
              <p className="text-xs text-slate-400">Distribuição atual das solicitações no fluxo</p>
            </div>
            <Link 
              href="/admin/servicos"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
            >
              Ver ordens <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
            {/* Pendente */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/60 flex flex-col justify-between">
              <div className="flex items-center justify-between text-amber-700">
                <span className="text-xs font-semibold uppercase tracking-wider">Pendentes</span>
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-amber-900 mt-2">
                {metrics.ordersByStatus.PENDENTE || 0}
              </p>
            </div>

            {/* Em Andamento */}
            <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/60 flex flex-col justify-between">
              <div className="flex items-center justify-between text-blue-700">
                <span className="text-xs font-semibold uppercase tracking-wider">Em Curso</span>
                <PlayCircle className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-2">
                {metrics.ordersByStatus.EM_ANDAMENTO || 0}
              </p>
            </div>

            {/* Concluído */}
            <div className="p-3.5 rounded-xl bg-green-50/80 border border-green-200/60 flex flex-col justify-between">
              <div className="flex items-center justify-between text-green-700">
                <span className="text-xs font-semibold uppercase tracking-wider">Concluídos</span>
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-900 mt-2">
                {metrics.ordersByStatus.CONCLUIDO || 0}
              </p>
            </div>

            {/* Em Disputa */}
            <div className="p-3.5 rounded-xl bg-red-50/80 border border-red-200/60 flex flex-col justify-between">
              <div className="flex items-center justify-between text-red-700">
                <span className="text-xs font-semibold uppercase tracking-wider">Disputa</span>
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-900 mt-2">
                {metrics.ordersByStatus.DISPUTA || 0}
              </p>
            </div>

            {/* Cancelado */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-xs font-semibold uppercase tracking-wider">Cancelados</span>
                <XCircle className="w-4 h-4 text-slate-500" />
              </div>
              <p className="text-2xl font-bold text-slate-800 mt-2">
                {metrics.ordersByStatus.CANCELADO || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Gestão de Contas e Verificações */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between space-y-4">
          <div className="pb-2 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="text-base font-semibold text-slate-800">Saúde da Comunidade</h3>
              <p className="text-xs text-slate-400">Status de contas e conformidade</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Usuários Ativos vs Suspensos */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-slate-700">Usuários Ativos</span>
              </div>
              <span className="text-sm font-bold text-slate-900">{metrics.activeUsers}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <UserX className="w-4 h-4 text-rose-500" />
                <span className="text-sm font-medium text-slate-700">Usuários Suspensos</span>
              </div>
              <span className="text-sm font-bold text-slate-900">{metrics.suspendedUsers}</span>
            </div>

            {/* Profissionais Verificados vs Pendentes */}
            <div className="p-3 rounded-lg bg-purple-50/60 border border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-slate-800">Pendentes de Verificação</span>
              </div>
              <Link 
                href="/admin/profissionais" 
                className="text-xs font-semibold px-2 py-1 rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                {metrics.pendingVerification} pendente(s)
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Últimas Atividades com Links Reais */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50/70">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Últimas Atividades</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Eventos recentes registrados em pedidos, usuários e solicitações de verificação.
            </p>
          </div>
          <Link 
            href="/admin/servicos" 
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
          >
            Ver pedidos <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {activities.length === 0 ? (
            <div className="p-8 text-center text-slate-400 font-medium bg-slate-50/50">
              Nenhuma atividade registrada recentemente no sistema.
            </div>
          ) : (
            activities.map((activity) => {
              const actType = activity.type ?? "order";
              const actHref = activity.href ?? "/admin/servicos";

              const iconMap = {
                order: <Wrench className="w-4 h-4 text-blue-600" />,
                user: <Users className="w-4 h-4 text-emerald-600" />,
                verification: <ShieldAlert className="w-4 h-4 text-purple-600" />,
              };

              const badgeMap = {
                order: "bg-blue-50 text-blue-700 border-blue-200",
                user: "bg-emerald-50 text-emerald-700 border-emerald-200",
                verification: "bg-purple-50 text-purple-700 border-purple-200",
              };

              const labelMap = {
                order: "Pedido",
                user: "Cadastro",
                verification: "Verificação",
              };

              return (
                <div 
                  key={activity.id} 
                  className="p-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 shrink-0">
                      {iconMap[actType]}
                    </div>
                    <div>
                      <span className="text-sm text-slate-800 font-medium">
                        {activity.description}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded border ${badgeMap[actType]}`}>
                          {labelMap[actType]}
                        </span>
                        <span className="text-xs text-slate-400">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={actHref}
                    className="self-end sm:self-center text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                  >
                    Acessar <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
