import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, MapPin, Image as ImageIcon } from 'lucide-react';

interface ServiceCardProProps {
  id: string;
  title: string;
  category: string;
  price: string;
  location: string;
  image?: string | null;
}

export function ServiceCardPro({
  id,
  title,
  category,
  price,
  location,
  image,
}: ServiceCardProProps) {
  return (
    <Card className="border-bp-outline-variant bg-white rounded-3xl overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between">
      <div>
        <div className="aspect-video bg-slate-100 relative overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 bg-slate-50">
              <ImageIcon size={28} />
              <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">Sem capa</span>
            </div>
          )}
          <div className="absolute inset-0 bg-[#103569]/5 group-hover:bg-transparent transition-colors pointer-events-none" />
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-black text-[#103569] uppercase tracking-widest shadow-sm z-10">
            {category}
          </div>
        </div>

        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-3 gap-2">
            <div className="min-w-0">
              <h3 className="text-base font-black text-[#103569] leading-snug mb-1 truncate" title={title}>
                {title}
              </h3>
              <div className="flex items-center gap-1 text-slate-400">
                <MapPin size={13} className="shrink-0" />
                <span className="text-xs font-bold truncate max-w-[140px]">{location}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[9px] font-black text-slate-400 uppercase block">Preço</span>
              <span className="text-sm font-black text-[#f7941d]">{price}</span>
            </div>
          </div>
        </CardContent>
      </div>

      <div className="px-5 pb-5 pt-0">
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 gap-2 h-10"
          >
            <Link href={`/dashboard/profissional/novo-servico?id=${id}`}>
              <Edit2 size={14} />
              Editar Serviço
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
