'use client';

import { useEffect, useState } from 'react';
import { X, Calendar, MapPin, User, Mail, Phone, DollarSign, FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';
import type { AdminOrderDetail } from '../types';
import { StatusBadge } from './StatusBadge';

interface OrderDetailModalProps {
  order: AdminOrderDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkDispute?: (orderId: string) => void;
}

export function OrderDetailModal({ order, isOpen, onClose, onMarkDispute }: OrderDetailModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, selectedImage]);

  if (!isOpen || !order) return null;

  const formatCurrency = (val: number | null) => {
    if (val === null || val === undefined || isNaN(val)) return 'Não definido';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-order-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
              <FileText size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 id="modal-order-title" className="text-lg font-bold text-slate-800">
                  Pedido #{order.id.slice(0, 8)}
                </h3>
                <StatusBadge status={order.status} />
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Criado em: {order.createdAt}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Partes Envolvidas */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Partes Envolvidas
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cliente */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Cliente</span>
                <p className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                  <User size={15} className="text-slate-400 shrink-0" />
                  {order.client.name}
                </p>
                <p className="text-xs text-slate-600 flex items-center gap-2">
                  <Mail size={14} className="text-slate-400 shrink-0" />
                  {order.client.email}
                </p>
                {order.client.phone && (
                  <p className="text-xs text-slate-600 flex items-center gap-2">
                    <Phone size={14} className="text-slate-400 shrink-0" />
                    {order.client.phone}
                  </p>
                )}
              </div>

              {/* Profissional */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Profissional</span>
                <p className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                  <User size={15} className="text-slate-400 shrink-0" />
                  {order.professional.name}
                </p>
                <p className="text-xs text-slate-600 flex items-center gap-2">
                  <Mail size={14} className="text-slate-400 shrink-0" />
                  {order.professional.email}
                </p>
                {order.professional.phone && (
                  <p className="text-xs text-slate-600 flex items-center gap-2">
                    <Phone size={14} className="text-slate-400 shrink-0" />
                    {order.professional.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Dados do Pedido */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Detalhes do Serviço
            </h4>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                <span className="text-xs font-medium text-slate-500">Tipo de Serviço / Título:</span>
                <span className="font-semibold text-slate-800">
                  {order.serviceTitle || order.serviceType || 'Serviço sob demanda'}
                </span>
              </div>

              {order.categoryName && (
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                  <span className="text-xs font-medium text-slate-500">Categoria:</span>
                  <span className="font-semibold text-slate-800">{order.categoryName}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                <span className="text-xs font-medium text-slate-500">Valor Combinado:</span>
                <span className="font-bold text-emerald-700 text-base flex items-center gap-1">
                  <DollarSign size={16} />
                  {formatCurrency(order.agreedPrice)}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                <span className="text-xs font-medium text-slate-500">Urgência:</span>
                <span className="font-semibold text-slate-800">{order.urgency || 'Normal'}</span>
              </div>

              {order.period && (
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                  <span className="text-xs font-medium text-slate-500">Turno Preferencial:</span>
                  <span className="font-semibold text-slate-800">{order.period}</span>
                </div>
              )}

              {order.scheduledAt && (
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                  <span className="text-xs font-medium text-slate-500">Data Agendada:</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <Calendar size={14} className="text-slate-400" />
                    {order.scheduledAt}
                  </span>
                </div>
              )}

              {order.description && (
                <div className="pt-1">
                  <span className="text-xs font-medium text-slate-500 block mb-1">Descrição do Cliente:</span>
                  <p className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200 whitespace-pre-line">
                    {order.description}
                  </p>
                </div>
              )}

              {order.notes && (
                <div className="pt-1">
                  <span className="text-xs font-medium text-slate-500 block mb-1">Notas / Observações:</span>
                  <p className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200 whitespace-pre-line">
                    {order.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Localização */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Endereço e Localização
            </h4>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm space-y-2">
              <p className="text-xs text-slate-700 flex items-start gap-2">
                <MapPin size={15} className="text-slate-400 shrink-0 mt-0.5" />
                <span>{order.address || 'Endereço não informado'}</span>
              </p>
              {order.locationCep && (
                <p className="text-xs text-slate-500 ml-6">
                  CEP: <strong className="text-slate-700 font-mono">{order.locationCep}</strong>
                </p>
              )}
            </div>
          </div>

          {/* Imagens do Pedido */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ImageIcon size={14} />
              Imagens Anexadas ({order.images.length})
            </h4>
            {order.images.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                Nenhuma imagem anexada a este pedido.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {order.images.map((img, idx) => (
                  <div 
                    key={img.id || idx} 
                    className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video cursor-pointer"
                    onClick={() => setSelectedImage(img.url)}
                  >
                    {/* Imagem do storage */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={img.url} 
                      alt={`Imagem ${idx + 1} do pedido`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <ExternalLink size={20} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 flex-wrap">
          <div className="text-xs text-slate-400">
            Atualizado em: {order.updatedAt}
          </div>
          <div className="flex items-center gap-2">
            {order.status !== 'DISPUTA' && onMarkDispute && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onMarkDispute(order.id);
                }}
                className="min-h-[44px] px-4 py-2 text-xs font-semibold rounded-xl bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors"
              >
                Marcar como Disputa
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-5 py-2 text-xs font-semibold rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>

      {/* Visualizador de Imagem Ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={selectedImage} 
              alt="Visualização ampliada" 
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 min-h-[44px] min-w-[44px] p-2 bg-black/60 text-white rounded-full hover:bg-black/80 flex items-center justify-center"
              aria-label="Fechar visualização"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
