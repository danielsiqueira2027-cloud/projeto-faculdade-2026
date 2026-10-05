'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Upload, X, Star, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  prepareServiceImageUploadAction,
  cleanupServiceUploadAction,
} from '@/app/actions/services';
import { createClient as createBrowserSupabaseClient } from '@/lib/supabase/client';

export interface UploadedImageItem {
  id?: string;
  storagePath: string;
  url: string;
  position: number;
}

interface ServiceImageDropzoneProps {
  serviceId: string;
  images: UploadedImageItem[];
  onChange: (images: UploadedImageItem[]) => void;
  onUploadingChange?: (isUploading: boolean) => void;
  maxFiles?: number;
  disabled?: boolean;
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

interface UploadingQueueItem {
  tempId: string;
  previewUrl: string;
  fileName: string;
}

export function ServiceImageDropzone({
  serviceId,
  images,
  onChange,
  onUploadingChange,
  maxFiles = 5,
  disabled = false,
}: ServiceImageDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadingQueue, setUploadingQueue] = useState<UploadingQueueItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Armazena caminhos enviados na sessão atual para limpeza em caso de cancelamento
  const sessionUploadedPathsRef = useRef<Set<string>>(new Set());

  const setUploading = useCallback(
    (isUploading: boolean) => {
      if (onUploadingChange) onUploadingChange(isUploading);
    },
    [onUploadingChange]
  );

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return `O arquivo "${file.name}" não é permitido. Envie apenas JPG, PNG ou WebP.`;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `O arquivo "${file.name}" tem mais de 5 MB. Escolha um arquivo menor.`;
    }
    return null;
  };

  const handleFiles = async (fileList: FileList | File[]) => {
    setErrorMessage(null);
    const files = Array.from(fileList);
    if (!files.length) return;

    const remainingSlots = maxFiles - (images.length + uploadingQueue.length);
    if (remainingSlots <= 0) {
      setErrorMessage(`Limite máximo de ${maxFiles} imagens já atingido.`);
      return;
    }

    const filesToUpload = files.slice(0, remainingSlots);
    if (files.length > remainingSlots) {
      setErrorMessage(`Apenas as primeiras ${remainingSlots} imagens selecionadas serão adicionadas.`);
    }

    // Validação de cada arquivo no cliente
    for (const file of filesToUpload) {
      const err = validateFile(file);
      if (err) {
        setErrorMessage(err);
        return;
      }
    }

    setUploading(true);

    for (const file of filesToUpload) {
      const tempId = crypto.randomUUID();
      const previewUrl = URL.createObjectURL(file);

      setUploadingQueue((prev) => [...prev, { tempId, previewUrl, fileName: file.name }]);

      try {
        // 1. Prepara upload via Server Action (validação no servidor + Signed Upload URL)
        const prep = await prepareServiceImageUploadAction(serviceId, {
          name: file.name,
          type: file.type,
          size: file.size,
        });

        if (!prep.success || !prep.path || !prep.token) {
          throw new Error(prep.error || 'Erro ao preparar upload da imagem.');
        }

        // 2. Upload direto do navegador para o Supabase Storage via token assinado
        const supabase = createBrowserSupabaseClient();
        const { error: uploadError } = await supabase.storage
          .from('service-images')
          .uploadToSignedUrl(prep.path, prep.token, file, {
            contentType: file.type,
            upsert: true,
          });

        if (uploadError) {
          // Rollback no storage caso o upload falhe no meio
          await cleanupServiceUploadAction([prep.path]);
          throw new Error(`Falha no upload para o servidor: ${uploadError.message}`);
        }

        // 3. Resolve URL pública
        const { data: publicUrlData } = supabase.storage
          .from('service-images')
          .getPublicUrl(prep.path);

        sessionUploadedPathsRef.current.add(prep.path);

        // 4. Adiciona imagem à lista final
        const newImageItem: UploadedImageItem = {
          storagePath: prep.path,
          url: publicUrlData.publicUrl,
          position: images.length,
        };

        onChange([...images, newImageItem]);
      } catch (err: unknown) {
        console.error('Erro no upload de imagem:', err);
        setErrorMessage(err instanceof Error ? err.message : 'Falha ao enviar imagem.');
      } finally {
        URL.revokeObjectURL(previewUrl);
        setUploadingQueue((prev) => prev.filter((item) => item.tempId !== tempId));
      }
    }

    setUploading(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = async (indexToRemove: number) => {
    const itemToRemove = images[indexToRemove];
    if (!itemToRemove) return;

    // Se a foto foi subida na sessão atual, limpa imediatamente do bucket
    if (sessionUploadedPathsRef.current.has(itemToRemove.storagePath)) {
      try {
        await cleanupServiceUploadAction([itemToRemove.storagePath]);
        sessionUploadedPathsRef.current.delete(itemToRemove.storagePath);
      } catch (err) {
        console.warn('Aviso ao remover imagem temporária:', err);
      }
    }

    // Reorganiza posições
    const updated = images
      .filter((_, idx) => idx !== indexToRemove)
      .map((item, idx) => ({ ...item, position: idx }));

    onChange(updated);
  };

  const handleSetCover = (indexToCover: number) => {
    if (indexToCover === 0 || indexToCover >= images.length) return;

    const itemToCover = images[indexToCover];
    const remaining = images.filter((_, idx) => idx !== indexToCover);
    const reordered = [itemToCover, ...remaining].map((item, idx) => ({
      ...item,
      position: idx,
    }));

    onChange(reordered);
  };

  const isAtLimit = images.length + uploadingQueue.length >= maxFiles;

  return (
    <div className="space-y-4">
      {/* Alerta de erro */}
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-red-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-red-400 hover:text-red-600 font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Área de Dropzone */}
      {!isAtLimit && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => {
            if (!disabled && fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
          className={`border-2 border-dashed rounded-3xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[160px] ${
            isDragOver
              ? 'border-[#f7941d] bg-[#f7941d]/10 scale-[0.99]'
              : 'border-slate-200 bg-slate-50 hover:border-[#103569]/40 hover:bg-slate-100/70'
          } ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                handleFiles(e.target.files);
                e.target.value = ''; // Permite selecionar o mesmo arquivo novamente se desejar
              }
            }}
            disabled={disabled}
          />

          <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-[#103569] mb-3">
            <Upload size={22} />
          </div>

          <p className="text-xs font-black text-[#103569]">
            Clique ou arraste até {maxFiles - images.length} foto{maxFiles - images.length > 1 ? 's' : ''} aqui
          </p>
          <p className="text-[10px] text-slate-400 font-bold mt-1">
            JPG, PNG ou WebP até 5 MB cada (máximo de {maxFiles} fotos)
          </p>
        </div>
      )}

      {/* Grid de Miniaturas */}
      {(images.length > 0 || uploadingQueue.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {images.map((item, idx) => {
            const isCover = idx === 0;
            return (
              <div
                key={item.storagePath || item.url || idx}
                className={`group relative aspect-square rounded-2xl overflow-hidden border-2 bg-slate-100 transition-all shadow-sm ${
                  isCover ? 'border-[#f7941d] ring-2 ring-[#f7941d]/20' : 'border-slate-200'
                }`}
              >
                <Image
                  src={item.url}
                  alt={`Foto ${idx + 1} do serviço`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                  className="object-cover"
                />

                {/* Badge Capa */}
                {isCover ? (
                  <div className="absolute top-2 left-2 bg-[#f7941d] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 z-10">
                    <Star size={10} className="fill-white" />
                    Capa
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetCover(idx);
                    }}
                    title="Definir como foto de capa"
                    className="absolute top-2 left-2 bg-white/90 backdrop-blur-md text-slate-700 hover:text-[#f7941d] hover:bg-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <Star size={10} />
                    Definir Capa
                  </button>
                )}

                {/* Botão de Remover */}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(idx);
                  }}
                  disabled={disabled}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-600/90 hover:bg-red-700 text-white shadow-md transition-all z-10 opacity-90 sm:opacity-0 group-hover:opacity-100"
                >
                  <X size={14} />
                </Button>

                {/* Overlay sutil ao passar o mouse */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}

          {/* Cards de itens em upload ativo */}
          {uploadingQueue.map((item) => (
            <div
              key={item.tempId}
              className="relative aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-[#103569]/30 bg-slate-50 flex flex-col items-center justify-center p-2 text-center"
            >
              <div className="relative w-full h-full opacity-40">
                <Image
                  src={item.previewUrl}
                  alt={item.fileName}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-[#103569]/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-2">
                <Loader2 size={24} className="animate-spin text-white mb-1.5" />
                <span className="text-[10px] font-bold">Enviando...</span>
                <span className="text-[8px] opacity-80 truncate max-w-[90px]">{item.fileName}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contador de fotos */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold px-1">
        <span>Primeira foto será exibida como destaque (capa).</span>
        <span>
          {images.length} / {maxFiles} fotos
        </span>
      </div>
    </div>
  );
}
