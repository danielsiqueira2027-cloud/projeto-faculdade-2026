'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Professional } from '@/types/professional';

interface SearchResultCardProps {
  professional: Professional;
}

export function SearchResultCard({ professional }: SearchResultCardProps) {
  const router = useRouter();

  return (
    <article
      className="src-card"
      onClick={() => router.push(`/profissional/${professional.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && router.push(`/profissional/${professional.id}`)}
      aria-label={`Ver perfil de ${professional.name}`}
    >
      {/* Avatar */}
      <div className="src-card__avatar" aria-hidden="true">
        {/* Placeholder para imagem, pode usar professional.avatarUrl no futuro */}
        {professional.avatarUrl ? (
          <img 
            src={professional.avatarUrl} 
            alt={`Foto de ${professional.name}`} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        ) : null}
      </div>

      {/* Info */}
      <div className="src-card__info">
        <h3 className="src-card__name">{professional.name}</h3>
        <p className="src-card__role">{professional.role}</p>

        {/* Rating and Location */}
        <div className="src-card__footer">
          <span className="src-card__rating">★ {professional.rating.toFixed(1)}</span>
          <span className="src-card__location-text">{professional.location}</span>
        </div>
      </div>
    </article>
  );
}
