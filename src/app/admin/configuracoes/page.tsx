"use client";

import { useState, useEffect } from "react";
import {
  Plus, Edit, Power, PowerOff, Loader2, AlertCircle,
  Search, Users, Layers,
} from "lucide-react";
import {
  getCategoriesAdminAction,
  createCategoryAction,
  updateCategoryAction,
  toggleCategoryActiveAction,
  type AdminCategoryItem,
} from "@/app/actions/admin";
import { CategoryFormModal } from "../_components/CategoryFormModal";
import { ConfirmCategoryToggleModal } from "../_components/ConfirmCategoryToggleModal";

export default function SettingsPage() {
  const [categories, setCategories]             = useState<AdminCategoryItem[]>([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState<string | null>(null);
  const [successMessage, setSuccessMessage]     = useState<string | null>(null);
  const [search, setSearch]                     = useState("");

  // Modais
  const [formModalOpen, setFormModalOpen]       = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<AdminCategoryItem | null>(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [toggleCategory, setToggleCategory]     = useState<AdminCategoryItem | null>(null);
  const [isToggleLoading, setIsToggleLoading]   = useState(false);

  const [refreshKey, setRefreshKey]             = useState(0);

  useEffect(() => {
    let mounted = true;
    getCategoriesAdminAction()
      .then((res) => {
        if (!mounted) return;
        setCategories(res);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setError("Não foi possível carregar as categorias.");
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [refreshKey]);

  const handleOpenCreate = () => {
    setSelectedCategory(null);
    setFormModalOpen(true);
    setError(null);
    setSuccessMessage(null);
  };

  const handleOpenEdit = (cat: AdminCategoryItem) => {
    setSelectedCategory(cat);
    setFormModalOpen(true);
    setError(null);
    setSuccessMessage(null);
  };

  const handleFormSubmit = async (formData: {
    id?: string;
    name: string;
    slug?: string;
    icon?: string;
    description?: string;
  }) => {
    setIsFormSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (formData.id) {
        await updateCategoryAction({
          id: formData.id,
          name: formData.name,
          icon: formData.icon,
          description: formData.description,
        });
        setSuccessMessage(`Categoria "${formData.name}" atualizada com sucesso.`);
      } else {
        await createCategoryAction({
          name: formData.name,
          slug: formData.slug,
          icon: formData.icon,
          description: formData.description,
        });
        setSuccessMessage(`Categoria "${formData.name}" criada com sucesso.`);
      }
      setFormModalOpen(false);
      setLoading(true);
      setRefreshKey((k) => k + 1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao salvar categoria.");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleConfirmToggle = async (cat: AdminCategoryItem) => {
    setIsToggleLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await toggleCategoryActiveAction(cat.id);
      const actionLabel = res.isActive ? "ativada" : "desativada";
      setSuccessMessage(`Categoria "${cat.name}" foi ${actionLabel} com sucesso.`);
      setToggleCategory(null);
      setLoading(true);
      setRefreshKey((k) => k + 1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao alterar status da categoria.");
    } finally {
      setIsToggleLoading(false);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Gestão de Categorias</h2>
          <p className="text-sm text-slate-500 mt-1">
            Gerencie o catálogo de especialidades, ícones e disponibilidade na plataforma.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenCreate}
          className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm active:scale-95 shrink-0"
        >
          <Plus size={18} />
          Nova Categoria
        </button>
      </div>

      {/* Alertas inline */}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-sm flex items-center justify-between rounded-xl border border-red-200">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-xs text-red-600 hover:text-red-800 font-semibold px-2 py-1"
          >
            Fechar
          </button>
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-emerald-50 text-emerald-800 text-sm flex items-center justify-between rounded-xl border border-emerald-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{successMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold px-2 py-1"
          >
            Fechar
          </button>
        </div>
      )}

      {/* Busca e Resumo */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou slug..."
            className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <div className="text-xs text-slate-500">
          Total: <strong>{categories.length}</strong> categorias cadastradas (
          <strong>{categories.filter((c) => c.isActive).length}</strong> ativas)
        </div>
      </div>

      {/* Tabela de Categorias */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-semibold">Categoria</th>
                <th className="p-4 font-semibold">Slug da URL</th>
                <th className="p-4 font-semibold">Ícone</th>
                <th className="p-4 font-semibold">Profissionais</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
                    <span className="text-sm font-medium">Carregando categorias...</span>
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-400">
                    Nenhuma categoria encontrada.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr
                    key={cat.id}
                    className={`transition-colors ${
                      !cat.isActive ? "bg-slate-50/70 opacity-75" : "hover:bg-slate-50/60"
                    }`}
                  >
                    <td className="p-4 text-sm font-semibold text-slate-800">
                      <div>{cat.name}</div>
                      {cat.description && (
                        <div className="text-xs text-slate-400 font-normal max-w-xs truncate">
                          {cat.description}
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-xs font-mono text-slate-600">
                      {cat.slug}
                    </td>
                    <td className="p-4 text-xs font-medium text-slate-600">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
                        <Layers size={13} className="text-slate-400" />
                        {cat.icon || "padrão"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-700">
                      <span className="inline-flex items-center gap-1 font-semibold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                        <Users size={12} />
                        {cat.professionalsCount}
                      </span>
                    </td>
                    <td className="p-4 text-sm whitespace-nowrap">
                      {cat.isActive ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Ativa
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          Desativada
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(cat)}
                          className="min-h-[44px] px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors inline-flex items-center gap-1 border border-slate-200"
                          title="Editar categoria"
                        >
                          <Edit size={14} />
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() => setToggleCategory(cat)}
                          className={`min-h-[44px] px-3 py-2 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1 border ${
                            cat.isActive
                              ? "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
                          }`}
                          title={cat.isActive ? "Desativar categoria" : "Reativar categoria"}
                        >
                          {cat.isActive ? (
                            <>
                              <PowerOff size={14} />
                              Desativar
                            </>
                          ) : (
                            <>
                              <Power size={14} />
                              Ativar
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modais */}
      <CategoryFormModal
        key={selectedCategory ? selectedCategory.id : 'new-cat'}
        category={selectedCategory}
        isOpen={formModalOpen}
        isLoading={isFormSubmitting}
        onClose={() => setFormModalOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <ConfirmCategoryToggleModal
        category={toggleCategory}
        isOpen={toggleCategory !== null}
        isLoading={isToggleLoading}
        onClose={() => setToggleCategory(null)}
        onConfirm={handleConfirmToggle}
      />
    </div>
  );
}
