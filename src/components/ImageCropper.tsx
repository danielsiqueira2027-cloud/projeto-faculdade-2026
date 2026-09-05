'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageCropperProps {
  file: File;
  onClose: () => void;
  onCropComplete: (url: string) => void;
}

export default function ImageCropper({ file, onClose, onCropComplete }: ImageCropperProps) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [scale, setScale] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [naturalDimensions, setNaturalDimensions] = useState<{ w: number; h: number } | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);
  const containerSize = 300; // Screen container dimensions (300x300)
  const canvasSize = 400; // Output cropped image size (400x400)

  // Read file as Data URL
  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageSrc(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }, [file]);

  // Handle Drag / Pan Events (Mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Handle Touch Events (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setOffset({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Calculate base aspect ratio size using state
  const getImageDimensions = () => {
    if (!naturalDimensions) return { w: containerSize, h: containerSize };
    const aspect = naturalDimensions.w / naturalDimensions.h;

    let w = containerSize;
    let h = containerSize;

    if (aspect > 1) {
      // Landscape: fit height to container
      w = containerSize * aspect;
    } else {
      // Portrait: fit width to container
      h = containerSize / aspect;
    }

    return { w, h };
  };

  const handleReset = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleCrop = async () => {
    if (!imageRef.current) return;
    setUploading(true);
    setError('');

    try {
      const img = imageRef.current;
      const { w: baseWidth, h: baseHeight } = getImageDimensions();

      // Setup Canvas
      const canvas = document.createElement('canvas');
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Falha ao inicializar o contexto 2D do Canvas.');
      }

      // Fill canvas background with white
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      // Calculations to map screen crop to canvas
      const k = canvasSize / containerSize; // scaling factor (e.g. 400 / 300 = 1.333)

      const screenX = containerSize / 2 + offset.x - (baseWidth * scale) / 2;
      const screenY = containerSize / 2 + offset.y - (baseHeight * scale) / 2;

      const cx = screenX * k;
      const cy = screenY * k;
      const cWidth = baseWidth * scale * k;
      const cHeight = baseHeight * scale * k;

      // Draw cropped image onto Canvas
      ctx.drawImage(img, cx, cy, cWidth, cHeight);

      // Convert Canvas to Blob
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.9);
      });

      if (!blob) {
        throw new Error('Erro ao processar imagem final.');
      }

      // Create Form Data for upload
      const formData = new FormData();
      formData.append('file', blob, 'avatar.jpg');

      // Upload to API
      const res = await fetch('/api/profile/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || result.error) {
        throw new Error(result.error || 'Erro ao realizar upload do arquivo.');
      }

      onCropComplete(result.url);
    } catch (err: any) {
      console.error('[Crop & Upload Error]', err);
      setError(err.message || 'Erro inesperado ao salvar imagem.');
    } finally {
      setUploading(false);
    }
  };

  const { w: imgWidth, h: imgHeight } = getImageDimensions();

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-[#103569]">Ajustar Enquadramento</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Foto de Perfil</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 hover:bg-slate-50 rounded-xl cursor-pointer border-none bg-transparent"
          >
            <X size={20} />
          </button>
        </div>

        {/* Crop Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 relative">
          <div
            className="relative overflow-hidden bg-slate-200 shadow-inner rounded-3xl border-2 border-dashed border-[#f7941d] cursor-move select-none"
            style={{ width: containerSize, height: containerSize }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {imageSrc && (
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Crop preview"
                onLoad={(e) => {
                  const img = e.currentTarget;
                  setNaturalDimensions({ w: img.naturalWidth, h: img.naturalHeight });
                }}
                className="absolute pointer-events-none origin-center transition-transform duration-75"
                style={{
                  width: imgWidth,
                  height: imgHeight,
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                }}
              />
            )}
            {/* Center target indicator helper */}
            <div className="absolute inset-0 border border-white/20 pointer-events-none rounded-3xl" />
          </div>

          <p className="text-xs text-slate-400 font-medium mt-4 text-center">
            Arraste a imagem para mover e use a barra abaixo para ajustar o zoom.
          </p>
        </div>

        {/* Controls */}
        <div className="px-6 py-6 space-y-6 border-t border-slate-100 bg-white">
          {error && <p className="text-xs text-red-500 font-bold text-center bg-red-50 p-2.5 rounded-xl">{error}</p>}

          {/* Zoom Slider */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setScale(Math.max(1, scale - 0.1))}
              className="text-[#103569] p-1 hover:bg-[#103569]/5 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
            >
              <ZoomOut size={18} />
            </button>
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="flex-1 accent-[#f7941d] cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
            />
            <button
              onClick={() => setScale(Math.min(3, scale + 0.1))}
              className="text-[#103569] p-1 hover:bg-[#103569]/5 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
            >
              <ZoomIn size={18} />
            </button>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="rounded-2xl border-slate-200 font-bold text-[#103569] h-12 flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Resetar
            </Button>

            <div className="flex gap-2.5">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="rounded-2xl font-bold text-slate-500 h-12"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleCrop}
                disabled={uploading}
                className="rounded-2xl bg-[#f7941d] hover:bg-[#f7941d]/90 text-white font-black h-12 px-6 shadow-lg shadow-[#f7941d]/20 flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Salvando...</span>
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    <span>Recortar e Salvar</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
