"use client";

import { useState, useEffect } from "react";
import { Search, History, Ban, CheckCircle } from "lucide-react";
import { User, UserType } from "../types";
import { StatusBadge } from "../_components/StatusBadge";
import { getAllUsersAction, toggleUserStatusAction } from "@/app/actions/admin";

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<UserType>("cliente");

  const loadUsers = async () => {
    const data = await getAllUsersAction();
    setUsers(data);
  };

  useEffect(() => {
    let mounted = true;
    getAllUsersAction().then(data => {
      if (mounted) setUsers(data);
    });
    return () => { mounted = false; };
  }, []);

  const toggleStatus = async (id: string) => {
    // Basic optimistic UI
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Ativo" ? "Suspenso" : "Ativo" } : u));
    try {
      await toggleUserStatusAction(id);
    } catch {
      await loadUsers(); // revert on fail
    }
  };

  const filteredUsers = users.filter(u => u.type === activeTab);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">Gestão de Usuários</h2>

      {/* Tabs */}
      <div className="flex space-x-2 border-b">
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === "cliente"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
          onClick={() => setActiveTab("cliente")}
        >
          Clientes
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === "prestador"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
          onClick={() => setActiveTab("prestador")}
        >
          Prestadores (Profissionais)
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-slate-50">
          <div className="relative w-full md:w-64">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou email..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-sm border-b">
                <th className="p-4 font-semibold">Nome</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Data de Cadastro</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm text-slate-800 font-medium">{user.name}</td>
                  <td className="p-4 text-sm text-slate-600">{user.email}</td>
                  <td className="p-4 text-sm">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="p-4 text-sm text-slate-600">{user.registrationDate}</td>
                  <td className="p-4 text-sm text-right space-x-2 whitespace-nowrap">
                    <button className="inline-flex items-center px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition-colors" title="Visualizar Histórico">
                      <History className="w-4 h-4 mr-1" />
                      Histórico
                    </button>
                    {user.status === "Ativo" ? (
                      <button 
                        onClick={() => toggleStatus(user.id)}
                        className="inline-flex items-center px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-xs font-medium transition-colors" title="Suspender">
                        <Ban className="w-4 h-4 mr-1" />
                        Suspender
                      </button>
                    ) : (
                      <button 
                        onClick={() => toggleStatus(user.id)}
                        className="inline-flex items-center px-2 py-1 bg-green-50 hover:bg-green-100 text-green-600 rounded text-xs font-medium transition-colors" title="Ativar">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Ativar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Nenhum usuário encontrado.
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
