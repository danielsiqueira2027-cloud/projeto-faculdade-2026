"use client";

import { useState } from "react";
import { mockCategories, mockCoupons } from "../_data/mock";
import { Category, Coupon } from "../types";
import { Plus, Power, PowerOff, Percent, Tag } from "lucide-react";

export default function SettingsPage() {
  const [fee, setFee] = useState(15);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponPct, setNewCouponPct] = useState("");

  const handleSaveFee = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Taxa da plataforma atualizada para ${fee}%`);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode || !newCouponPct) return;
    setCoupons([...coupons, { code: newCouponCode.toUpperCase(), percentage: Number(newCouponPct) }]);
    setNewCouponCode("");
    setNewCouponPct("");
  };

  const toggleCategory = (id: string) => {
    setCategories(categories.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">Configurações do Backoffice</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Taxa da Plataforma */}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <div className="flex items-center space-x-2 text-slate-800">
            <Percent className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Taxa da Plataforma</h3>
          </div>
          <p className="text-sm text-slate-500">
            Define a porcentagem retida em cada transação entre cliente e profissional.
          </p>
          <form onSubmit={handleSaveFee} className="flex gap-4">
            <div className="relative flex-1">
              <input 
                type="number" 
                value={fee}
                onChange={(e) => setFee(Number(e.target.value))}
                className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-4 top-2.5 text-slate-400 font-medium">%</span>
            </div>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Salvar
            </button>
          </form>
        </div>

        {/* Cupons de Desconto */}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <div className="flex items-center space-x-2 text-slate-800">
            <Tag className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold">Cupons de Desconto</h3>
          </div>
          <form onSubmit={handleCreateCoupon} className="flex gap-4">
            <input 
              type="text" 
              placeholder="Código (ex: PROMO10)" 
              value={newCouponCode}
              onChange={(e) => setNewCouponCode(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg uppercase focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="relative w-32">
              <input 
                type="number" 
                placeholder="Valor"
                value={newCouponPct}
                onChange={(e) => setNewCouponPct(e.target.value)}
                className="w-full pl-4 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="absolute right-3 top-2.5 text-slate-400">%</span>
            </div>
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-1" /> Criar
            </button>
          </form>

          <div className="mt-4 pt-4 border-t space-y-2">
            {coupons.map(c => (
              <div key={c.code} className="flex justify-between items-center bg-slate-50 px-4 py-2 rounded-lg border">
                <span className="font-semibold text-slate-700">{c.code}</span>
                <span className="text-sm bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-medium">{c.percentage}% OFF</span>
              </div>
            ))}
          </div>
        </div>

        {/* Categorias */}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4 lg:col-span-2">
          <div className="flex items-center space-x-2 text-slate-800">
            <h3 className="text-lg font-semibold">Categorias de Serviços Ativas</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map(cat => (
              <div key={cat.id} className={`flex justify-between items-center px-4 py-3 rounded-lg border transition-colors ${cat.active ? 'bg-white' : 'bg-slate-50 opacity-60'}`}>
                <span className={`font-medium ${cat.active ? 'text-slate-800' : 'text-slate-500'}`}>{cat.name}</span>
                <button 
                  onClick={() => toggleCategory(cat.id)}
                  className={`p-1.5 rounded-full transition-colors ${cat.active ? 'text-red-500 hover:bg-red-50' : 'text-green-500 hover:bg-green-50'}`}
                  title={cat.active ? "Desativar" : "Ativar"}
                >
                  {cat.active ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
