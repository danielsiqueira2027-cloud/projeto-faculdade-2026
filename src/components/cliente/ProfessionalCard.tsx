'use client';

import React from 'react';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import { Professional } from '@/types/professional';

interface ProfessionalCardProps {
  pro: Professional;
}

export function ProfessionalCard({ pro }: ProfessionalCardProps) {
  return (
    <Link 
      href={`/dashboard/cliente/profissional/${pro.id}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#f7941d]/30 transition-all duration-300 overflow-hidden"
    >
      <div className="p-5">
        {/* Top Section: Avatar & Info */}
        <div className="flex gap-4 items-start mb-4">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#103569] to-[#1a4a8a] flex items-center justify-center text-[#fddfa2] text-xl font-bold shrink-0 shadow-inner">
            {pro.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-[#103569] text-lg truncate group-hover:text-[#f7941d] transition-colors">
              {pro.name}
            </h3>
            <p className="text-xs font-bold text-[#f7941d] uppercase tracking-wider mb-1">
              {pro.role}
            </p>
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={14} 
                    className={star <= Math.floor(pro.rating) ? "fill-[#f7941d] text-[#f7941d]" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-600 ml-1">{pro.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-50 w-full mb-4" />

        {/* Services List */}
        <div className="space-y-2 mb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Serviços Principais</p>
          <div className="flex flex-wrap gap-1.5">
            {pro.services?.slice(0, 3).map((service) => (
              <span 
                key={service.id} 
                className="text-[11px] px-2 py-1 bg-gray-50 text-gray-600 rounded-md border border-gray-100"
              >
                {service.title}
              </span>
            ))}
            {(pro.services?.length || 0) > 3 && (
              <span className="text-[11px] px-2 py-1 text-gray-400">
                +{pro.services!.length - 3} mais
              </span>
            )}
          </div>
        </div>

        {/* Footer: Location */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin size={14} />
            <span className="text-xs truncate max-w-[120px]">{pro.location.split(' - ')[0]}</span>
          </div>
          <span className="text-[10px] font-bold bg-[#103569]/5 text-[#103569] px-2 py-0.5 rounded-full">
            {pro.distance} km
          </span>
        </div>
      </div>
    </Link>
  );
}
