import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, MapPin, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicServiceDto } from '@/app/actions/services';
import { formatPrice, isNextImageAllowed } from '@/lib/service-format';

interface ProfessionalServicesProps {
  services: PublicServiceDto[];
  professionalId: string;
  isOwnProfile?: boolean;
}


export function ProfessionalServices({
  services,
  professionalId,
  isOwnProfile = false,
}: ProfessionalServicesProps) {
  if (services.length === 0) {
    return (
      <section className="bg-white rounded-[2.5rem] shadow-xl shadow-bp-primary/5 border border-bp-outline-variant p-6 sm:p-10 space-y-4">
        <div className="flex items-center gap-3 border-b border-bp-outline-variant/60 pb-5">
          <h2 className="text-2xl font-black text-[#0b2545] uppercase tracking-tight">
            Serviços oferecidos
          </h2>
        </div>
        <div className="py-6 text-center space-y-3">
          <p className="text-sm font-medium text-slate-500">
            Este profissional ainda não publicou serviços.
          </p>
          {isOwnProfile && (
            <div className="pt-1">
              <Button
                asChild
                size="sm"
                className="bg-[#f7941d] hover:bg-[#f7941d]/90 text-white font-bold rounded-xl h-10 px-6 shadow-md transition-all cursor-pointer"
              >
                <Link href="/dashboard/profissional/novo-servico">
                  Cadastrar primeiro serviço
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-[2.5rem] shadow-xl shadow-bp-primary/5 border border-bp-outline-variant p-6 sm:p-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-bp-outline-variant/60 pb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-black text-[#0b2545] uppercase tracking-tight">
            Serviços oferecidos
          </h2>
          <span className="bg-[#103569]/10 text-[#103569] text-xs font-black px-3 py-1 rounded-full">
            {services.length} {services.length === 1 ? 'serviço' : 'serviços'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const locationText =
            service.city && service.state
              ? `${service.city} - ${service.state}`
              : service.city || service.state || null;

          return (
            <div
              key={service.id}
              className="border border-bp-outline-variant bg-white rounded-3xl overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Imagem de Capa */}
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  {service.imageUrl ? (
                    isNextImageAllowed(service.imageUrl) ? (
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 bg-slate-50">
                      <ImageIcon size={32} />
                      <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                        Sem foto
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[#103569]/5 group-hover:bg-transparent transition-colors pointer-events-none" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black text-[#103569] uppercase tracking-widest shadow-sm z-10">
                    {service.categoryName}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-5">
                  <h3
                    className="text-base font-black text-[#103569] leading-snug mb-2 line-clamp-2"
                    title={service.title}
                  >
                    {service.title}
                  </h3>

                  {service.description ? (
                    <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3 mb-4">
                      {service.description}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-400 italic mb-4">
                      Sem descrição detalhada.
                    </p>
                  )}

                  {/* Duração e Cidade/UF */}
                  {(service.duration || locationText) && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 font-semibold pt-2 border-t border-slate-100">
                      {service.duration && (
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-slate-400 shrink-0" />
                          <span>{service.duration}</span>
                        </div>
                      )}
                      {locationText && (
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-slate-400 shrink-0" />
                          <span className="truncate max-w-[140px]">{locationText}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Rodapé: Preço e Botão */}
              <div className="px-5 pb-5 pt-0">
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Preço</span>
                    <span className="text-base font-black text-[#f7941d]">
                      {formatPrice(service.priceText, service.priceValue)}
                    </span>
                  </div>

                  {!isOwnProfile ? (
                    <Button
                      asChild
                      className="w-full bg-[#103569] hover:bg-[#103569]/90 text-white font-bold rounded-xl h-10 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <Link href={`/orcamento?profId=${professionalId}`}>
                        Solicitar orçamento
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 h-10 transition-all cursor-pointer"
                    >
                      <Link href={`/dashboard/profissional/novo-servico?id=${service.id}`}>
                        Editar serviço
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

