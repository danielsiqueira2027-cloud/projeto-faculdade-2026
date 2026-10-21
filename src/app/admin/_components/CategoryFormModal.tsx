'use client';

import { useState, useEffect } from 'react';
import {
  X, Loader2, Wrench, Droplets, Paintbrush, Zap, Hammer,
  Axe, AppWindow, Layers, Grid2x2, Scissors, Briefcase,
  Sparkles, Shield, Truck, HardHat, Home,
  LucideIcon,
} from 'lucide-react';
import type { AdminCategoryItem } from '@/app/actions/admin';
import { generateCategorySlug } from '@/app/admin/types';

interface CategoryFormModalProps {
  category: AdminCategoryItem | null; // null se criando nova
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (data: { id?: string; name: string; slug?: string; icon?: string; description?: string }) => void;
}

const AVAILABLE_ICONS: { name: string; icon: LucideIcon }[] = [
  { name: 'Wrench', icon: Wrench },
  { name: 'Droplets', icon: Droplets },
  { name: 'Paintbrush', icon: Paintbrush },
  { name: 'Zap', icon: Zap },
  { name: 'Hammer', icon: Hammer },
  { name: 'Axe', icon: Axe },
  { name: 'AppWindow', icon: AppWindow },
  { name: 'Layers', icon: Layers },
  { name: 'Grid2x2', icon: Grid2x2 },
  { name: 'Scissors', icon: Scissors },
  { name: 'Briefcase', icon: Briefcase },
  { name: 'Sparkles', icon: Sparkles },
  { name: 'Shield', icon: Shield },
  { name: 'Truck', icon: Truck },
  { name: 'HardHat', icon: HardHat },
  { name: 'Home', icon: Home },
];

export function CategoryFormModal({
  category,
  isOpen,
  isLoading,
  onClose,
  onSubmit,
}: CategoryFormModalProps) {
  const [name, setName]               = useState(category?.name || '');
  const [slug, setSlug]               = useState(category?.slug || '');
  const [icon, setIcon]               = useState(category?.icon || (category ? '' : 'Wrench'));
  const [description, setDescription] = useState(category?.description || '');
  const [formError, setFormError]     = useState<string | null>(null);

  const isEditing = category !== null;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      setSlug(generateCategorySlug(val));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      setFormError('O nome deve ter entre 2 e 100 caracteres.');
      return;
    }

    const trimmedSlug = slug.trim() || generateCategorySlug(trimmedName);
    const slugRegex = /^[a-z0-9-]{2,100}$/;
    if (!slugRegex.test(trimmedSlug)) {
      setFormError('Slug inválido. Use letras minúsculas, números e hífens (2-100 caracteres).');
      return;
    }

    onSubmit({
      id: category?.id,
      name: trimmedName,
      slug: trimmedSlug,
      icon: icon.trim() || undefined,
      description: description.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-form-title"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <h3 id="category-form-title" className="text-lg font-bold text-slate-800">
            {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="min-h-[44px] min-w-[44px] p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center disabled:opacity-50"
            aria-label="Fechar modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {formError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 font-medium">
              {formError}
            </div>
          )}

          <div>
            <label htmlFor="cat-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nome da Categoria *
            </label>
            <input
              id="cat-name"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Ex: Eletricista, Encanador, Pintura..."
              className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <label htmlFor="cat-slug" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Slug da URL * {!isEditing && <span className="text-slate-400 font-normal">(gerado automaticamente)</span>}
            </label>
            <input
              id="cat-slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              placeholder="ex: eletricista-residencial"
              className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono disabled:bg-slate-50"
              disabled={isLoading || isEditing}
              required
            />
            {isEditing && (
              <p className="text-[11px] text-slate-400 mt-1">
                O slug não pode ser alterado após a criação para manter integridade das URLs.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Ícone Representativo (Lucide)
            </label>
            <div className="grid grid-cols-8 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 max-h-36 overflow-y-auto">
              {AVAILABLE_ICONS.map((item) => {
                const IconComponent = item.icon;
                const isSelected = icon.toLowerCase() === item.name.toLowerCase();
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setIcon(item.name)}
                    className={`min-h-[44px] min-w-[44px] p-2 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                    title={item.name}
                    aria-label={`Selecionar ícone ${item.name}`}
                  >
                    <IconComponent size={20} />
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Ícone selecionado: <strong className="text-slate-800">{icon || 'Nenhum (usará padrão)'}</strong>
            </p>
          </div>

          <div>
            <label htmlFor="cat-desc" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Descrição (opcional)
            </label>
            <textarea
              id="cat-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descrição da categoria para o catálogo..."
              className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="min-h-[44px] px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="min-h-[44px] inline-flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Salvando...
                </>
              ) : isEditing ? (
                'Salvar Alterações'
              ) : (
                'Criar Categoria'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
