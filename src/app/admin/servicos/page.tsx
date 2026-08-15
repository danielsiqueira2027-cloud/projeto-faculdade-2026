"use client";

import { useState, useEffect } from "react";
import { AlertCircle, Search } from "lucide-react";
import { ServiceOrder } from "../types";
import { StatusBadge } from "../_components/StatusBadge";
import { getAllOrdersForAdminAction, markOrderAsDisputedAction } from "@/app/actions/admin";

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceOrder[]>([]);

  const loadOrders = async () => {
    const data = await getAllOrdersForAdminAction();
    setServices(data);
  };

  useEffect(() => {
    let mounted = true;
    getAllOrdersForAdminAction().then(data => {
      if (mounted) {
        setServices(data);
      }
    });
    return () => { mounted = false; };
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const resolveDispute = async (id: string) => {
    setServices(services.map(s => s.id === id ? { ...s, status: "Em Disputa" } : s));
    try {
      await markOrderAsDisputedAction(id);
    } catch {
      await loadOrders();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">Moderação de Ordens de Serviço</h2>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-slate-50">
          <div className="relative w-full md:w-64">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por cliente ou ID..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-sm border-b">
                <th className="p-4 font-semibold">ID OS</th>
                <th className="p-4 font-semibold">Cliente</th>
                <th className="p-4 font-semibold">Profissional</th>
                <th className="p-4 font-semibold">Valor</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {services.map((service) => (
                <tr 
                  key={service.id} 
                  className={`transition-colors ${service.status === 'Em Disputa' ? 'bg-red-50/50 hover:bg-red-50' : 'hover:bg-slate-50'}`}
                >
                  <td className="p-4 text-sm font-semibold text-slate-700">#{service.id}</td>
                  <td className="p-4 text-sm text-slate-800 font-medium">{service.clientName}</td>
                  <td className="p-4 text-sm text-slate-600">{service.professionalName}</td>
                  <td className="p-4 text-sm text-slate-800">{formatCurrency(service.value)}</td>
                  <td className="p-4 text-sm">
                    <StatusBadge status={service.status} />
                  </td>
                  <td className="p-4 text-sm text-right space-x-2 whitespace-nowrap">
                    {service.status !== "Em Disputa" ? (
                       <button 
                         onClick={() => resolveDispute(service.id)}
                         className="inline-flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold transition-colors shadow-sm ring-1 ring-red-700" 
                         title="Marcar como Disputa"
                       >
                         <AlertCircle className="w-4 h-4 mr-1.5" />
                         Marcar como Disputa
                       </button>
                    ) : (
                      <span className="text-red-500 font-bold text-xs italic">Em Disputa</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
