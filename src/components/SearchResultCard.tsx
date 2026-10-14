'use client';

import { useRouter } from 'next/navigation';

import { Professional } from '@/types/professional';
import { ProfessionalAvatar } from '@/components/ProfessionalAvatar';

interface SearchResultCardProps {
  professional: Professional;
  isSelf?: boolean;
}

export function SearchResultCard({ professional, isSelf = false }: SearchResultCardProps) {
  const router = useRouter();

  return (
    <article
      className="src-card"
      onClick={() => router.push(`/perfil-profissional?id=${professional.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && router.push(`/perfil-profissional?id=${professional.id}`)}
      aria-label={`Ver perfil de ${professional.name}`}
    >
      {/* Avatar */}
      <div className="src-card__avatar relative overflow-hidden" aria-hidden="true">
        <ProfessionalAvatar 
          src={professional.avatarUrl} 
          name={professional.name} 
          className="w-full h-full"
          roundedClassName="rounded-none"
          sizes="(max-width: 900px) 100vw, 220px"
          alt={`Foto de ${professional.name}`}
        />
      </div>

      {/* Info */}
      <div className="src-card__info">
        <div className="flex items-center justify-between gap-1">
          <h3 className="src-card__name truncate">{professional.name}</h3>
          {isSelf && (
            <span className="text-[9px] font-black uppercase tracking-wider bg-[#f7941d]/15 text-[#f7941d] px-1.5 py-0.5 rounded-md shrink-0">
              Você
            </span>
          )}
        </div>
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
