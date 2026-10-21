'use client';

import { useEffect } from 'react';
import { X, User as UserIcon, Mail, Phone, Calendar, Briefcase, ShoppingBag, Star, CheckCircle, ShieldAlert } from 'lucide-react';
import type { UserDetail } from '../types';
import { StatusBadge } from './StatusBadge';

interface UserDetailModalProps {
  user: UserDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDetailModal({ user, isOpen, onClose }: UserDetailModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-800">{user.name}</h3>
                <StatusBadge status={user.status} />
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">ID: {user.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Informações Básicas */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Dados da Conta
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
              <div className="flex items-center gap-2.5 text-slate-700">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{user.phone || 'Telefone não informado'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Cadastrado em {user.registrationDate}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <UserIcon className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="flex gap-1.5">
                  {user.types.map(t => (
                    <span key={t} className="px-2 py-0.5 text-xs rounded-md bg-blue-100 text-blue-700 font-medium capitalize">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Perfil Profissional (se existir) */}
          {user.professionalProfile && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Perfil Profissional
                </h4>
                {user.professionalProfile.isVerified ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3.5 h-3.5" /> Verificado
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    <ShieldAlert className="w-3.5 h-3.5" /> Aguarda Verificação
                  </span>
                )}
              </div>

              <div className="p-4 rounded-xl border border-slate-200/80 space-y-3 bg-white">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-xs text-slate-400 block">Especialidade</span>
                    <span className="font-semibold text-slate-800">{user.professionalProfile.specialty || 'Não definida'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Localização</span>
                    <span className="font-semibold text-slate-800">{user.professionalProfile.location || 'Não informada'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Avaliação</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {user.professionalProfile.rating.toFixed(1)} ({user.professionalProfile.reviewCount} avaliações)
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Total de Serviços</span>
                    <span className="font-semibold text-slate-800">{user.professionalProfile.totalOrders} pedidos</span>
                  </div>
                </div>

                {user.professionalProfile.bio && (
                  <div className="pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <span className="font-medium text-slate-700 block mb-1">Apresentação:</span>
                    <p className="line-clamp-3">{user.professionalProfile.bio}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pedidos do Cliente (se existir) */}
          {user.clientProfile && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" /> Histórico como Cliente ({user.clientProfile.totalOrders} pedidos)
              </h4>

              {user.clientProfile.recentOrders.length === 0 ? (
                <p className="text-sm text-slate-400 italic bg-slate-50 p-4 rounded-xl text-center">
                  Nenhum pedido solicitado até o momento.
                </p>
              ) : (
                <div className="divide-y divide-slate-100 border rounded-xl overflow-hidden text-sm">
                  {user.clientProfile.recentOrders.map(order => (
                    <div key={order.id} className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="font-medium text-slate-800">{order.serviceType}</p>
                        <p className="text-xs text-slate-400">{order.createdAt}</p>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={order.status === 'CONCLUIDO' ? 'Concluído' : order.status === 'EM_ANDAMENTO' ? 'Em andamento' : order.status === 'DISPUTA' ? 'Em Disputa' : order.status === 'CANCELADO' ? 'Cancelado' : 'Pendente'} />
                        {order.value > 0 && (
                          <p className="text-xs font-semibold text-slate-700 mt-1">
                            R$ {order.value.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
