"use client";

import { useState } from "react";
import { Search, DollarSign } from "lucide-react";
import { mockTransactions } from "../_data/mock";
import { StatusBadge } from "../_components/StatusBadge";
import { MetricCard } from "../_components/MetricCard";

export default function FinanceiroPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const totalLucro = mockTransactions.reduce((acc, curr) => acc + curr.platformFee, 0);

  const filtered = mockTransactions.filter(t => 
    t.payer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.payee.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">Controle Financeiro</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Lucro Líquido Retido" 
          value={formatCurrency(totalLucro)} 
          icon={DollarSign} 
          color="green" 
        />
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-slate-50">
          <div className="relative w-full md:w-64">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar transação..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-sm border-b">
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Pagador</th>
                <th className="p-4 font-semibold">Recebedor</th>
                <th className="p-4 font-semibold">Taxa Retida</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((trx) => (
                <tr key={trx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm font-semibold text-slate-700">{trx.id}</td>
                  <td className="p-4 text-sm text-slate-800">{trx.payer}</td>
                  <td className="p-4 text-sm text-slate-600">{trx.payee}</td>
                  <td className="p-4 text-sm text-green-600 font-medium">{formatCurrency(trx.platformFee)}</td>
                  <td className="p-4 text-sm">
                    <StatusBadge status={trx.status} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
