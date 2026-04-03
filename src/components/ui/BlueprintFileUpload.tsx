'use client';

import * as React from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFilesChange?: (files: File[]) => void;
  className?: string;
}

export function BlueprintFileUpload({ onFilesChange, className }: FileUploadProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="group relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-bp-outline-variant rounded-2xl bg-bp-surface-low hover:bg-bp-surface-lowest hover:border-bp-primary transition-all cursor-pointer overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <div className="p-3 mb-3 rounded-full bg-bp-primary/5 group-hover:bg-bp-primary/10 transition-colors">
            <Upload className="w-6 h-6 text-bp-primary" />
          </div>
          <p className="mb-2 text-sm font-semibold text-bp-on-surface">
            Clique para enviar arquivos
          </p>
          <p className="text-xs text-bp-on-surface/60">
            PDF, PNG ou JPG (Max. 10MB)
          </p>
        </div>
        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden" 
          multiple
          onChange={handleFileChange}
        />
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {files.map((file, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between p-3 rounded-xl bg-bp-surface-lowest border border-bp-outline-variant/10 shadow-sm animate-in fade-in slide-in-from-bottom-1"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <FileText className="w-5 h-5 text-bp-primary shrink-0" />
                <span className="text-xs font-medium text-bp-on-surface truncate">
                  {file.name}
                </span>
              </div>
              <button 
                onClick={() => removeFile(i)}
                className="p-1 hover:bg-bp-primary/5 rounded-full text-bp-on-surface/40 hover:text-error transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
