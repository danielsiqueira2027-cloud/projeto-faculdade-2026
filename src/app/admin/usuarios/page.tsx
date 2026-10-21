"use client";

import { useState, useEffect } from "react";
import { Search, Eye, Ban, CheckCircle, ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import type { User, UserDetail } from "../types";
import { StatusBadge } from "../_components/StatusBadge";
import { UserDetailModal } from "../_components/UserDetailModal";
import { ConfirmStatusModal } from "../_components/ConfirmStatusModal";
import { 
  getUsersPaginatedAction, 
  getUserDetailsAction, 
  toggleUserStatusAction 
} from "@/app/actions/admin";

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros e Paginação
  const [activeTab, setActiveTab] = useState<"todos" | "cliente" | "prestador">("todos");
  const [statusFilter, setStatusFilter] = useState<"todos" | "Ativo" | "Suspenso">("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // Estados dos Modais
  const [selectedUserDetail, setSelectedUserDetail] = useState<UserDetail | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const [targetStatusUser, setTargetStatusUser] = useState<User | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  // Debounce da busca de texto
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 350);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    let isMounted = true;

    getUsersPaginatedAction({
      page: currentPage,
      pageSize: 10,
      search: debouncedSearch,
      type: activeTab,
      status: statusFilter,
    })
      .then((res) => {
        if (isMounted) {
          setUsers(res.users);
          setTotalPages(res.totalPages);
          setTotalUsers(res.total);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Não foi possível carregar a lista de usuários.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentPage, debouncedSearch, activeTab, statusFilter, refreshKey]);

  // Abertura do modal de detalhes
  const handleOpenDetail = async (userId: string) => {
    setIsDetailLoading(true);
    try {
      const detail = await getUserDetailsAction(userId);
      if (detail) {
        setSelectedUserDetail(detail);
        setIsDetailOpen(true);
      }
    } catch {
      setError("Erro ao buscar detalhes do usuário.");
    } finally {
      setIsDetailLoading(false);
    }
  };

  // Abertura do modal de confirmação de status
  const handleOpenConfirm = (user: User) => {
    setTargetStatusUser(user);
    setIsConfirmOpen(true);
  };

  // Execução da suspensão/reativação
  const handleConfirmStatus = async (reason: string) => {
    if (!targetStatusUser) return;
    setIsStatusUpdating(true);
    try {
      await toggleUserStatusAction({
        userId: targetStatusUser.id,
        reason,
      });
      setIsConfirmOpen(false);
      setTargetStatusUser(null);
      setLoading(true);
      setRefreshKey((k) => k + 1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao alterar status do usuário.");
    } finally {
      setIsStatusUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Gestão de Usuários</h2>
        <p className="text-sm text-slate-500 mt-1">
          Gerenciamento de contas de clientes e prestadores, moderação e controle de acesso.
        </p>
      </div>

      {/* Tabs Principais por Tipo */}
      <div className="flex space-x-2 border-b border-slate-200">
        <button
          className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === "todos"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
          onClick={() => { setActiveTab("todos"); setCurrentPage(1); }}
        >
          Todos os Usuários
        </button>
        <button
          className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === "cliente"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
          onClick={() => { setActiveTab("cliente"); setCurrentPage(1); }}
        >
          Apenas Clientes
        </button>
        <button
          className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === "prestador"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
          onClick={() => { setActiveTab("prestador"); setCurrentPage(1); }}
        >
          Apenas Prestadores
        </button>
      </div>

      {/* Barra de Busca e Filtros Secundários */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Campo de Busca */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome ou email..." 
            className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Filtro de Status */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "todos" | "Ativo" | "Suspenso");
              setCurrentPage(1);
            }}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700"
          >
            <option value="todos">Todos os status</option>
            <option value="Ativo">Somente Ativos</option>
            <option value="Suspenso">Somente Suspensos</option>
          </select>
        </div>
      </div>

      {/* Tabela de Usuários */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {error && (
          <div className="p-4 bg-red-50 text-red-700 text-sm flex items-center gap-2 border-b border-red-100">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-semibold">Nome</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Tipo</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Cadastro</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
                    <span className="text-sm font-medium">Carregando usuários...</span>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-400">
                    Nenhum usuário encontrado com os filtros aplicados.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 text-sm text-slate-800 font-semibold">{user.name}</td>
                    <td className="p-4 text-sm text-slate-600">{user.email}</td>
                    <td className="p-4 text-sm">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                        user.type === "prestador" 
                          ? "bg-purple-50 text-purple-700 border border-purple-200" 
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}>
                        {user.type === "prestador" ? "Prestador" : "Cliente"}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="p-4 text-sm text-slate-500">{user.registrationDate}</td>
                    <td className="p-4 text-sm text-right space-x-2 whitespace-nowrap">
                      {/* Detalhes */}
                      <button 
                        onClick={() => handleOpenDetail(user.id)}
                        disabled={isDetailLoading}
                        className="inline-flex items-center px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors" 
                        title="Ver Perfil Completo"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Detalhes
                      </button>

                      {/* Suspender / Ativar */}
                      {user.status === "Ativo" ? (
                        <button 
                          onClick={() => handleOpenConfirm(user)}
                          className="inline-flex items-center px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors border border-red-200" 
                          title="Suspender Acesso"
                        >
                          <Ban className="w-3.5 h-3.5 mr-1" />
                          Suspender
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleOpenConfirm(user)}
                          className="inline-flex items-center px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold transition-colors border border-emerald-200" 
                          title="Reativar Acesso"
                        >
                          <CheckCircle className="w-3.5 h-3.5 mr-1" />
                          Ativar
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Rodapé da Paginação */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Mostrando <strong>{users.length}</strong> de <strong>{totalUsers}</strong> usuários encontrados
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1 || loading}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-700 font-medium flex items-center gap-1 transition-colors"
            >
              <ChevronLeft size={14} /> Anterior
            </button>
            <span className="px-2 font-semibold text-slate-700">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages || loading}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-700 font-medium flex items-center gap-1 transition-colors"
            >
              Próxima <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Modais */}
      <UserDetailModal
        user={selectedUserDetail}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedUserDetail(null);
        }}
      />

      <ConfirmStatusModal
        user={targetStatusUser}
        isOpen={isConfirmOpen}
        isLoading={isStatusUpdating}
        onClose={() => {
          setIsConfirmOpen(false);
          setTargetStatusUser(null);
        }}
        onConfirm={handleConfirmStatus}
      />
    </div>
  );
}

