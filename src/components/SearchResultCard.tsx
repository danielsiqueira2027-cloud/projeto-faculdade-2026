'use client';

import Image from 'next/image';
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
      onClick={() => router.push(`/perfil-profissional`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && router.push(`/perfil-profissional`)}
      aria-label={`Ver perfil de ${professional.name}`}
    >
      {/* Avatar */}
      <div className="src-card__avatar relative overflow-hidden" aria-hidden="true">
        {/* Usando next/image para otimização automática */}
        {professional.avatarUrl ? (
          <Image 
            src={professional.avatarUrl} 
            alt={`Foto de ${professional.name}`} 
            fill
            className="object-cover"
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
