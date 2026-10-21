"use client";

import { useState, useEffect } from "react";
import {
  Search, AlertCircle, ChevronLeft, ChevronRight,
  Loader2, Eye, ShieldAlert,
} from "lucide-react";
import type { AdminOrderItem, AdminOrderDetail, AdminOrderStatus } from "../types";
import {
  getOrdersPaginatedAction,
  getOrderDetailAction,
  markOrderAsDisputedAction,
} from "@/app/actions/admin";
import { StatusBadge } from "../_components/StatusBadge";
import { OrderDetailModal } from "../_components/OrderDetailModal";
import { ConfirmDisputeModal } from "../_components/ConfirmDisputeModal";

export default function ServicesPage() {
  const [orders, setOrders]                     = useState<AdminOrderItem[]>([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState<string | null>(null);

  // Filtros
  const [search, setSearch]                     = useState("");
  const [debouncedSearch, setDebouncedSearch]   = useState("");
  const [statusFilter, setStatusFilter]         = useState<"TODOS" | AdminOrderStatus>("TODOS");
  const [periodFilter, setPeriodFilter]         = useState<"todos" | "7d" | "30d" | "90d">("todos");
  const [currentPage, setCurrentPage]           = useState(1);
  const [totalPages, setTotalPages]             = useState(1);
  const [total, setTotal]                       = useState(0);

  // Modais
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<AdminOrderDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading]         = useState(false);
  const [isDetailOpen, setIsDetailOpen]               = useState(false);

  const [disputeOrderId, setDisputeOrderId]     = useState<string | null>(null);
  const [isDisputeLoading, setIsDisputeLoading] = useState(false);

  const [refreshKey, setRefreshKey]             = useState(0);

  // Debounce de busca
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  // Carregamento dos pedidos
  useEffect(() => {
    let mounted = true;

    getOrdersPaginatedAction({
      page: currentPage,
      pageSize: 10,
      search: debouncedSearch,
      status: statusFilter,
      period: periodFilter,
    })
      .then((res) => {
        if (!mounted) return;
        setOrders(res.orders);
        setTotalPages(res.totalPages);
        setTotal(res.total);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setError("Não foi possível carregar as ordens de serviço.");
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [currentPage, debouncedSearch, statusFilter, periodFilter, refreshKey]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };

  const handleOpenDetail = async (orderId: string) => {
    setIsDetailLoading(true);
    setError(null);
    try {
      const detail = await getOrderDetailAction(orderId);
      if (detail) {
        setSelectedOrderDetail(detail);
        setIsDetailOpen(true);
      } else {
        setError("Detalhes do pedido não encontrados.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao carregar detalhes do pedido.");
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleConfirmDispute = async (orderId: string, reason: string) => {
    setIsDisputeLoading(true);
    setError(null);
    try {
      await markOrderAsDisputedAction(orderId, reason);
      setDisputeOrderId(null);
      setLoading(true);
      setRefreshKey((k) => k + 1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao marcar pedido em disputa.");
    } finally {
      setIsDisputeLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Moderação de Serviços e Pedidos</h2>
        <p className="text-sm text-slate-500 mt-1">
          Acompanhe solicitações de orçamento, ordens em andamento e intervenções em disputas.
        </p>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setLoading(true);
            }}
            placeholder="Buscar por cliente, prestador, ID ou descrição..."
            className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
          {/* Filtro de Status */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as "TODOS" | AdminOrderStatus);
                setCurrentPage(1);
                setLoading(true);
              }}
              className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700"
            >
              <option value="TODOS">Todos os Status</option>
              <option value="PENDENTE">Pendentes</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="CONCLUIDO">Concluídos</option>
              <option value="CANCELADO">Cancelados</option>
              <option value="DISPUTA">Em Disputa</option>
            </select>
          </div>

          {/* Filtro de Período */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Período:</span>
            <select
              value={periodFilter}
              onChange={(e) => {
                setPeriodFilter(e.target.value as "todos" | "7d" | "30d" | "90d");
                setCurrentPage(1);
                setLoading(true);
              }}
              className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700"
            >
              <option value="todos">Todo o período</option>
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerta de Erro Inline */}
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

      {/* Tabela de Serviços */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Data</th>
                <th className="p-4 font-semibold">Cliente</th>
                <th className="p-4 font-semibold">Profissional</th>
                <th className="p-4 font-semibold">Serviço / Descrição</th>
                <th className="p-4 font-semibold">Valor</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
                    <span className="text-sm font-medium">Carregando ordens de serviço...</span>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-400">
                    Nenhuma ordem de serviço encontrada com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className={`transition-colors ${
                      order.status === "DISPUTA"
                        ? "bg-red-50/40 hover:bg-red-50/70"
                        : "hover:bg-slate-50/60"
                    }`}
                  >
                    <td className="p-4 text-xs font-mono text-slate-600 font-semibold">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="p-4 text-xs text-slate-500 whitespace-nowrap">
                      {order.createdAt}
                    </td>
                    <td className="p-4 text-sm text-slate-800 font-medium">
                      <div>{order.clientName}</div>
                      <div className="text-xs text-slate-400 font-normal">{order.clientEmail}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-700">
                      <div>{order.professionalName}</div>
                      <div className="text-xs text-slate-400 font-normal">{order.professionalEmail}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 max-w-xs truncate">
                      <span className="font-medium text-slate-800 block truncate">
                        {order.serviceType || "Serviço sob demanda"}
                      </span>
                      {order.description && (
                        <span className="text-xs text-slate-500 block truncate">
                          {order.description}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm font-semibold text-slate-800 whitespace-nowrap">
                      {order.value > 0 ? formatCurrency(order.value) : <span className="text-slate-400 font-normal text-xs">A combinar</span>}
                    </td>
                    <td className="p-4 text-sm whitespace-nowrap">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="p-4 text-sm text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(order.id)}
                          disabled={isDetailLoading}
                          className="min-h-[44px] px-3 py-2 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors inline-flex items-center gap-1 border border-blue-200"
                          title="Ver detalhes completos do pedido"
                        >
                          <Eye size={14} />
                          Detalhes
                        </button>

                        {order.status !== "DISPUTA" && (
                          <button
                            type="button"
                            onClick={() => setDisputeOrderId(order.id)}
                            className="min-h-[44px] px-3 py-2 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors inline-flex items-center gap-1 border border-red-200"
                            title="Marcar este pedido como em disputa"
                          >
                            <ShieldAlert size={14} />
                            Disputa
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Mostrando <strong>{orders.length}</strong> de <strong>{total}</strong> ordens de serviço
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                setLoading(true);
              }}
              disabled={currentPage <= 1 || loading}
              className="min-h-[44px] px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 text-slate-700 font-medium flex items-center gap-1 transition-colors"
            >
              <ChevronLeft size={14} /> Anterior
            </button>
            <span className="px-2 font-semibold text-slate-700">
              Página {currentPage} de {totalPages}
            </span>
            <button
              type="button"
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                setLoading(true);
              }}
              disabled={currentPage >= totalPages || loading}
              className="min-h-[44px] px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 text-slate-700 font-medium flex items-center gap-1 transition-colors"
            >
              Próxima <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Modais */}
      <OrderDetailModal
        order={selectedOrderDetail}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedOrderDetail(null);
        }}
        onMarkDispute={(orderId) => {
          setDisputeOrderId(orderId);
        }}
      />

      <ConfirmDisputeModal
        orderId={disputeOrderId}
        isOpen={disputeOrderId !== null}
        isLoading={isDisputeLoading}
        onClose={() => setDisputeOrderId(null)}
        onConfirm={handleConfirmDispute}
      />
    </div>
  );
}
