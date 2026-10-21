"use client";

import { useState, useEffect } from "react";
import {
  DollarSign, TrendingUp, CheckCircle2, AlertTriangle,
  Info, Loader2, AlertCircle, Calendar, ArrowUpRight,
} from "lucide-react";
import { MetricCard } from "../_components/MetricCard";
import { StatusBadge } from "../_components/StatusBadge";
import { getFinancialMetricsAction, type FinancialSummary } from "@/app/actions/admin";

export default function FinanceiroPage() {
  const [data, setData]       = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    getFinancialMetricsAction()
      .then((res) => {
        if (!mounted) return;
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setError("Não foi possível carregar as métricas financeiras.");
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
        <p className="text-sm font-medium">Carregando métricas financeiras reais...</p>
      </div>
    );
  }

  const maxMonthlyVolume = data
    ? Math.max(...data.monthlyStats.map((m) => m.volume), 1)
    : 1;

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Controle Financeiro</h2>
        <p className="text-sm text-slate-500 mt-1">
          Acompanhe o volume financeiro transacionado, ticket médio e evolução dos pedidos concluídos.
        </p>
      </div>

      {/* Aviso legal e operacional da plataforma */}
      <div className="p-4 bg-blue-50/80 border border-blue-200/80 rounded-2xl flex items-start gap-3 text-sm text-blue-900">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-semibold text-blue-950">
            Aviso sobre transações e pagamentos
          </p>
          <p className="text-xs text-blue-800 leading-relaxed">
            Pagamentos combinados diretamente entre as partes; a plataforma ainda não intermedeia pagamentos.
            Os valores apresentados refletem os acordos firmados entre clientes e prestadores nos pedidos registrados.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-sm flex items-center justify-between rounded-xl border border-red-200">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-xs text-red-600 hover:text-red-800 font-semibold px-2 py-1 rounded"
          >
            Fechar
          </button>
        </div>
      )}

      {/* Cartões de Métricas Principais */}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Volume Negociado (Concluídos)"
            value={formatCurrency(data.volumeNegociado)}
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            title="Ticket Médio"
            value={formatCurrency(data.ticketMedio)}
            icon={TrendingUp}
            color="blue"
          />
          <MetricCard
            title="Serviços Concluídos"
            value={String(data.countsByStatus.concluido)}
            icon={CheckCircle2}
            color="purple"
          />
          <MetricCard
            title="Pedidos em Disputa"
            value={String(data.countsByStatus.disputa)}
            icon={AlertTriangle}
            color="red"
          />
        </div>
      )}

      {/* Distribuição por Status e Evolução Mensal */}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Distribuição de Pedidos */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              Distribuição por Status
            </h3>
            <p className="text-xs text-slate-500">
              Total de <strong>{data.countsByStatus.total}</strong> pedidos registrados na plataforma.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                <span className="font-medium text-emerald-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Concluídos
                </span>
                <span className="font-bold text-emerald-900">{data.countsByStatus.concluido}</span>
              </div>

              <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-amber-50/60 border border-amber-100">
                <span className="font-medium text-amber-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Em andamento
                </span>
                <span className="font-bold text-amber-900">{data.countsByStatus.emAndamento}</span>
              </div>

              <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-yellow-50/60 border border-yellow-100">
                <span className="font-medium text-yellow-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  Pendentes
                </span>
                <span className="font-bold text-yellow-900">{data.countsByStatus.pendente}</span>
              </div>

              <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-red-50/60 border border-red-100">
                <span className="font-medium text-red-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  Em Disputa
                </span>
                <span className="font-bold text-red-900">{data.countsByStatus.disputa}</span>
              </div>

              <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-medium text-slate-700 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  Cancelados
                </span>
                <span className="font-bold text-slate-800">{data.countsByStatus.cancelado}</span>
              </div>
            </div>
          </div>

          {/* Gráfico de Barras dos Últimos 6 Meses */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Calendar size={18} className="text-blue-600" />
                  Concluídos nos Últimos 6 Meses
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Volume financeiro e contagem de serviços finalizados mês a mês.
                </p>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-48 pt-6 border-b border-slate-100">
                {data.monthlyStats.map((item) => {
                  const heightPercent = maxMonthlyVolume > 0 ? Math.round((item.volume / maxMonthlyVolume) * 100) : 0;
                  return (
                    <div key={item.monthKey} className="flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="text-[10px] sm:text-xs font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {formatCurrency(item.volume)}
                      </div>
                      <div className="w-full max-w-[40px] bg-slate-100 rounded-t-lg relative flex items-end justify-center overflow-hidden h-32">
                        <div
                          className="w-full bg-blue-600 rounded-t-lg transition-all duration-500 group-hover:bg-blue-700"
                          style={{ height: `${Math.max(heightPercent, 4)}%` }}
                        />
                      </div>
                      <div className="text-center">
                        <span className="text-[11px] font-semibold text-slate-700 uppercase block">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {item.count} {item.count === 1 ? "ped." : "peds."}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                <span>Total de concluídos com valor nos últimos meses: <strong>{data.concluidosComValorCount}</strong></span>
                <span className="flex items-center gap-1 text-blue-600 font-medium">
                  <ArrowUpRight size={14} /> Dados consolidados
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabela de Pedidos com Valores Registrados */}
      {data && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/70">
            <h3 className="text-sm font-bold text-slate-800">
              Ordens Recentes com Valores Negociados
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Últimos pedidos registrados com valor acordado entre cliente e prestador.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Data</th>
                  <th className="p-4 font-semibold">Cliente</th>
                  <th className="p-4 font-semibold">Profissional</th>
                  <th className="p-4 font-semibold">Valor Acordado</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400 text-sm">
                      Nenhuma ordem de serviço com valor registrado até o momento.
                    </td>
                  </tr>
                ) : (
                  data.recentOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 text-xs font-mono font-semibold text-slate-700">
                        #{ord.id.slice(0, 8)}
                      </td>
                      <td className="p-4 text-xs text-slate-500 whitespace-nowrap">
                        {ord.createdAt}
                      </td>
                      <td className="p-4 text-sm text-slate-800 font-medium">
                        {ord.clientName}
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        {ord.professionalName}
                      </td>
                      <td className="p-4 text-sm font-semibold text-emerald-700 whitespace-nowrap">
                        {formatCurrency(ord.value)}
                      </td>
                      <td className="p-4 text-sm whitespace-nowrap">
                        <StatusBadge status={ord.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
