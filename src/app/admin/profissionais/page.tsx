"use client";

import { useState, useEffect } from "react";
import {
  Search, ShieldCheck, ShieldX, ChevronLeft, ChevronRight,
  Loader2, AlertCircle, Star,
} from "lucide-react";
import type { AdminProfessional } from "@/app/actions/admin";
import {
  getProfessionalsListAction,
  toggleProfessionalVerificationAction,
} from "@/app/actions/admin";
import { StatusBadge } from "../_components/StatusBadge";

export default function ProfissionaisPage() {
  const [professionals, setProfessionals] = useState<AdminProfessional[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState<string | null>(null);

  const [search, setSearch]               = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState<"todos" | "verificado" | "pendente">("todos");
  const [activeFilter, setActiveFilter]   = useState<"todos" | "ativo" | "suspenso">("todos");
  const [currentPage, setCurrentPage]     = useState(1);
  const [totalPages, setTotalPages]       = useState(1);
  const [total, setTotal]                 = useState(0);

  const [togglingId, setTogglingId]       = useState<string | null>(null);
  const [confirmId, setConfirmId]         = useState<string | null>(null);
  const [refreshKey, setRefreshKey]       = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let mounted = true;

    getProfessionalsListAction({
      page:     currentPage,
      pageSize: 10,
      search:   debouncedSearch,
      verified: verifiedFilter,
      active:   activeFilter,
    })
      .then((res) => {
        if (!mounted) return;
        setProfessionals(res.professionals);
        setTotalPages(res.totalPages);
        setTotal(res.total);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setError("Não foi possível carregar a lista de profissionais.");
        setLoading(false);
      });
    return () => { mounted = false; };
  }, [currentPage, debouncedSearch, verifiedFilter, activeFilter, refreshKey]);

  const handleToggleVerification = async (prof: AdminProfessional) => {
    setTogglingId(prof.professionalId);
    setConfirmId(null);
    setError(null);
    try {
      await toggleProfessionalVerificationAction(prof.professionalId);
      setLoading(true);
      setRefreshKey((k) => k + 1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar verificação.");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Gestão de Profissionais</h2>
        <p className="text-sm text-slate-500 mt-1">
          Verifique perfis de prestadores, monitore avaliações e controle o acesso à plataforma.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setLoading(true);
            }}
            placeholder="Buscar por nome, especialidade ou cidade..."
            className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Verificação:</span>
            <select
              value={verifiedFilter}
              onChange={(e) => {
                setVerifiedFilter(e.target.value as "todos" | "verificado" | "pendente");
                setCurrentPage(1);
                setLoading(true);
              }}
              className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700"
            >
              <option value="todos">Todos</option>
              <option value="verificado">Verificados</option>
              <option value="pendente">Pendentes</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Status:</span>
            <select
              value={activeFilter}
              onChange={(e) => {
                setActiveFilter(e.target.value as "todos" | "ativo" | "suspenso");
                setCurrentPage(1);
                setLoading(true);
              }}
              className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700"
            >
              <option value="todos">Todos</option>
              <option value="ativo">Ativos</option>
              <option value="suspenso">Suspensos</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {error && (
          <div className="p-4 bg-red-50 text-red-700 text-sm flex items-center justify-between border-b border-red-100">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-xs text-red-600 hover:text-red-800 font-semibold"
            >
              Fechar
            </button>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-semibold">Nome</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Especialidade</th>
                <th className="p-4 font-semibold">Avaliação</th>
                <th className="p-4 font-semibold">Verificação</th>
                <th className="p-4 font-semibold">Conta</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
                    <span className="text-sm font-medium">Carregando profissionais...</span>
                  </td>
                </tr>
              ) : professionals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">
                    Nenhum profissional encontrado com os filtros aplicados.
                  </td>
                </tr>
              ) : (
                professionals.map((prof) => (
                  <tr key={prof.professionalId} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 text-sm text-slate-800 font-semibold">{prof.name}</td>
                    <td className="p-4 text-sm text-slate-600">{prof.email}</td>
                    <td className="p-4 text-sm text-slate-600">{prof.specialty ?? "—"}</td>
                    <td className="p-4 text-sm">
                      <span className="flex items-center gap-1 text-slate-700 font-medium">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {prof.rating.toFixed(1)}
                        <span className="text-slate-400 font-normal text-xs">({prof.reviewCount})</span>
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      {prof.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          <ShieldCheck className="w-3.5 h-3.5" /> Verificado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                          <ShieldX className="w-3.5 h-3.5" /> Pendente
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm">
                      <StatusBadge status={prof.isActive ? "Ativo" : "Suspenso"} />
                    </td>
                    <td className="p-4 text-sm text-right whitespace-nowrap">
                      {confirmId === prof.professionalId ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="text-xs text-slate-600 font-medium">
                            {prof.isVerified ? "Remover?" : "Verificar?"}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleVerification(prof)}
                            disabled={togglingId === prof.professionalId}
                            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 inline-flex items-center gap-1"
                          >
                            {togglingId === prof.professionalId
                              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              : "Confirmar"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmId(null)}
                            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          >
                            Cancelar
                          </button>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmId(prof.professionalId)}
                          disabled={togglingId !== null}
                          className={`inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                            prof.isVerified
                              ? "bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                              : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                          } disabled:opacity-40`}
                        >
                          {prof.isVerified
                            ? <><ShieldX className="w-3.5 h-3.5 mr-1" />Remover</>
                            : <><ShieldCheck className="w-3.5 h-3.5 mr-1" />Verificar</>}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Mostrando <strong>{professionals.length}</strong> de <strong>{total}</strong> profissionais
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                setLoading(true);
              }}
              disabled={currentPage <= 1 || loading}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 text-slate-700 font-medium flex items-center gap-1 transition-colors"
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
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 text-slate-700 font-medium flex items-center gap-1 transition-colors"
            >
              Próxima <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
