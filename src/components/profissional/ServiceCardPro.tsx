import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Eye, MapPin } from 'lucide-react';

interface ServiceCardProProps {
  id: string;
  title: string;
  category: string;
  price: string;
  location: string;
  image?: string;
}

export function ServiceCardPro({ title, category, price, location }: ServiceCardProProps) {
  return (
    <Card className="border-bp-outline-variant bg-white rounded-3xl overflow-hidden hover:shadow-lg transition-all group">
      <div className="aspect-video bg-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#103569]/5 group-hover:bg-transparent transition-colors"></div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-[#103569] uppercase tracking-widest shadow-sm">
          {category}
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-black text-[#103569] leading-tight mb-1">{title}</h3>
            <div className="flex items-center gap-1 text-slate-400">
              <MapPin size={14} />
              <span className="text-xs font-bold">{location}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase block">Preço Base</span>
            <span className="text-lg font-black text-[#f7941d]">{price}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
          <Button variant="outline" size="sm" className="flex-1 rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 gap-2">
            <Edit2 size={14} />
            Editar
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 px-3">
            <Eye size={14} />
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl border-red-100 text-red-500 font-bold hover:bg-red-50 px-3">
            <Trash2 size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
