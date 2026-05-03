'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Star, MapPin } from 'lucide-react';
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
        <span className="src-card__avatar-initial">
          {professional.name.charAt(0)}
        </span>
      </div>

      {/* Info */}
      <div className="src-card__info">
        <h3 className="src-card__name">{professional.name}</h3>
        <p className="src-card__role">{professional.role}</p>

        {/* Rating */}
        <div className="src-card__rating">
          <Star className="src-card__star-icon" aria-hidden="true" />
          <span className="src-card__rating-value">{professional.rating.toFixed(1)}</span>
        </div>

        {/* Location */}
        <div className="src-card__location">
          <MapPin className="src-card__pin-icon" aria-hidden="true" />
          <span>{professional.location}</span>
        </div>
      </div>
    </article>
  );
}
