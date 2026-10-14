'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, X, ImageIcon, AlertTriangle } from 'lucide-react';

export interface SelectedImage {
  file: File;
  previewUrl: string;
}

interface OrderImageDropzoneProps {
  images: SelectedImage[];
  onChange: (images: SelectedImage[]) => void;
  maxImages?: number;
  maxFileSizeMB?: number;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_LABELS = 'JPG, PNG ou WEBP';

export function OrderImageDropzone({
  images,
  onChange,
  maxImages = 2,
  maxFileSizeMB = 2,
}: OrderImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createdUrlsRef = useRef<Set<string>>(new Set());

  // Revoga todas as object URLs criadas ao desmontar o componente
  useEffect(() => {
    const urls = createdUrlsRef.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, []);

  const maxBytes = maxFileSizeMB * 1024 * 1024;
  const atLimit = images.length >= maxImages;

  const processFiles = useCallback(
    (incoming: FileList | File[]) => {
      setError(null);
      const files = Array.from(incoming);
      const remaining = maxImages - images.length;

      if (remaining <= 0) {
        setError(`Limite de ${maxImages} imagens atingido.`);
        return;
      }

      const toAdd: SelectedImage[] = [];
      for (const file of files.slice(0, remaining)) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          setError(`Tipo inválido: ${file.name}. Use ${ALLOWED_LABELS}.`);
          return;
        }
        if (file.size > maxBytes) {
          setError(`"${file.name}" excede ${maxFileSizeMB} MB.`);
          return;
        }
        const previewUrl = URL.createObjectURL(file);
        createdUrlsRef.current.add(previewUrl);
        toAdd.push({ file, previewUrl });
      }

      if (files.length > remaining) {
        setError(`Apenas ${remaining} imagem(ns) adicionada(s). Limite de ${maxImages}.`);
      }

      onChange([...images, ...toAdd]);
    },
    [images, onChange, maxImages, maxBytes, maxFileSizeMB]
  );

  const handleRemove = (index: number) => {
    const img = images[index];
    URL.revokeObjectURL(img.previewUrl);
    createdUrlsRef.current.delete(img.previewUrl);
    onChange(images.filter((_, i) => i !== index));
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
    // Reset input so same file can be re-selected after removal
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      {!atLimit && (
        <div
          role="button"
          tabIndex={0}
          aria-label={`Adicionar foto. ${images.length} de ${maxImages} adicionadas.`}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          className={`
            relative flex flex-col items-center justify-center gap-3
            min-h-[120px] rounded-2xl border-2 border-dashed cursor-pointer
            transition-all select-none outline-none
            focus-visible:ring-2 focus-visible:ring-[#103569]/30
            ${dragOver
              ? 'border-[#f7941d] bg-[#f7941d]/5'
              : 'border-[#103569]/20 bg-[#fefccf]/30 hover:border-[#f7941d]/60 hover:bg-[#f7941d]/5'
            }
          `}
        >
          <div className="flex flex-col items-center gap-2 p-4 sm:p-5 pointer-events-none">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${dragOver ? 'bg-[#f7941d]/10' : 'bg-[#103569]/5'}`}>
              <Upload
                size={20}
                className={`transition-colors ${dragOver ? 'text-[#f7941d]' : 'text-[#103569]/40'}`}
              />
            </div>
            <p className="text-xs font-bold text-[#103569]/50 text-center leading-tight">
              Arraste ou <span className="text-[#f7941d]">clique para selecionar</span>
            </p>
            <p className="text-[10px] text-[#103569]/30 font-bold uppercase tracking-widest text-center">
              {ALLOWED_LABELS} · Máx. {maxFileSizeMB} MB
            </p>
          </div>

          {/* Contador */}
          <span className="absolute top-3 right-3 text-[10px] font-black text-[#103569]/30 tabular-nums">
            {images.length}/{maxImages}
          </span>
        </div>
      )}

      {/* Mensagem de limite atingido */}
      {atLimit && (
        <div className="flex items-center justify-center gap-2 py-4 px-5 rounded-2xl bg-slate-50 border border-slate-100">
          <ImageIcon size={16} className="text-slate-400 shrink-0" />
          <p className="text-xs font-bold text-slate-500">
            Limite de {maxImages} imagens atingido.
          </p>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_TYPES.join(',')}
        multiple
        className="sr-only"
        aria-hidden="true"
        onChange={handleInputChange}
      />

      {/* Previews */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.previewUrl}
                alt={`Prévia ${i + 1}`}
                className="w-24 h-24 object-cover rounded-2xl border border-slate-100 shadow-sm"
              />
              <button
                type="button"
                aria-label={`Remover imagem ${i + 1}`}
                onClick={() => handleRemove(i)}
                className="
                  absolute -top-3 -right-3 w-11 h-11
                  flex items-center justify-center
                  rounded-full outline-none focus-visible:ring-2 focus-visible:ring-red-400
                  cursor-pointer z-10
                "
              >
                <span className="
                  w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white
                  flex items-center justify-center shadow-md transition-transform
                  hover:scale-110 active:scale-95
                ">
                  <X size={13} strokeWidth={3} />
                </span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-[11px] font-bold">
          <AlertTriangle size={13} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
