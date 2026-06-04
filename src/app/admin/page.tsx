import { DollarSign, Users, Wrench, ChevronRight } from "lucide-react";
import { MetricCard } from "./_components/MetricCard";
import { mockActivities } from "./_data/mock";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">Visão Geral</h2>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Total de Faturamento" value="R$ 124.500,00" icon={DollarSign} color="green" />
        <MetricCard title="Total de Clientes" value="4.205" icon={Users} color="blue" />
        <MetricCard title="Serviços Solicitados" value="1.832" icon={Wrench} color="purple" />
      </div>

      {/* Últimas Atividades */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <h3 className="text-lg font-semibold text-slate-800">Últimas Atividades</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
            Ver todas <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="p-4 px-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
              <span className="text-sm text-slate-700 font-medium">{activity.description}</span>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
