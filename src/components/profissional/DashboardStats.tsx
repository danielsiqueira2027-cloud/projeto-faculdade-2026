import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Star, Activity } from 'lucide-react';

interface StatProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

const StatCard = ({ label, value, icon, trend, color }: StatProps) => (
  <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden group hover:shadow-md transition-all">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
          <h3 className="text-2xl font-black text-slate-800">{value}</h3>
          {trend && <p className="text-[10px] font-bold text-emerald-500 mt-1">{trend}</p>}
        </div>
        <div className={`p-3 rounded-2xl ${color} text-white group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        label="Total de Orçamentos" 
        value="24" 
        icon={<FileText size={24} />} 
        trend="+4 esta semana"
        color="bg-[#103569]"
      />
      <StatCard 
        label="Avaliação Média" 
        value="4.9" 
        icon={<Star size={24} />} 
        trend="Baseado em 18 avaliações"
        color="bg-[#f7941d]"
      />
      <StatCard 
        label="Serviços Ativos" 
        value="08" 
        icon={<Activity size={24} />} 
        color="bg-emerald-500"
      />
    </div>
  );
}
