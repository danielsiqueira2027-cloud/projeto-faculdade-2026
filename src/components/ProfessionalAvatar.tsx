'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface ProfessionalAvatarProps {
  src?: string | null;
  name: string;
  size?: number;
  className?: string;
  roundedClassName?: string;
  priority?: boolean;
  sizes?: string;
  alt?: string;
  textClassName?: string;
}

/**
 * Componente reutilizável de avatar para profissionais e usuários.
 * - Exibe imagem otimizada com next/image quando src estiver disponível.
 * - Quando não houver imagem (ou se ocorrer erro no carregamento), exibe
 *   um fallback estilizado com a inicial do nome e gradiente padrão da plataforma.
 */
export function ProfessionalAvatar({
  src,
  name,
  size,
  className = '',
  roundedClassName = 'rounded-full',
  priority = false,
  sizes,
  alt,
  textClassName,
}: ProfessionalAvatarProps) {
  const [hasError, setHasError] = useState(false);

  const initial = (name?.trim().charAt(0) || 'P').toUpperCase();
  const fontSize = size ? Math.max(12, Math.round(size * 0.4)) : undefined;
  const hasValidImage = Boolean(src && src.trim() !== '' && !hasError);

  return (
    <div
      className={`relative shrink-0 overflow-hidden select-none flex items-center justify-center ${roundedClassName} ${className}`}
      style={{
        ...(size ? { width: size, height: size } : {}),
        ...(hasValidImage
          ? {}
          : {
              background: 'linear-gradient(135deg, #103569, #1a4a8a)',
              color: '#fddfa2',
            }),
      }}
      aria-label={alt || name}
    >
      {hasValidImage ? (
        <Image
          src={src!}
          alt={alt || `Foto de ${name}`}
          fill
          sizes={sizes || (size ? `${size}px` : '100vw')}
          className="object-cover"
          priority={priority}
          onError={() => setHasError(true)}
        />
      ) : (
        <span
          className={`font-black tracking-wider ${textClassName || ''}`}
          style={fontSize ? { fontSize } : { fontSize: '2.5rem' }}
        >
          {initial}
        </span>
      )}
    </div>
  );
}

export default ProfessionalAvatar;
