'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, CheckCircle2, Briefcase, Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { getMyServicesAction, deleteServiceAction } from '@/app/actions/services';

export default function MeusServicosPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadServices() {
    setLoading(true);
    try {
      const data = await getMyServicesAction();
      setServices(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Tem certeza que deseja remover o serviço "${title}"?`)) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteServiceAction(id);
      await loadServices();
    } catch (error) {
      console.error(error);
      alert('Erro ao remover o serviço.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter uppercase">Meus Serviços</h2>
          <p className="text-slate-500 font-bold">Gerencie seu catálogo de serviços, preços e visibilidade.</p>
        </div>
        <Button asChild className="bg-[#f7941d] hover:bg-[#f7941d]/90 text-white rounded-2xl h-14 px-8 font-black shadow-xl shadow-[#f7941d]/20 transition-all active:scale-95">
          <Link href="/dashboard/profissional/novo-servico">
            <Plus className="mr-2 h-6 w-6" />
            Adicionar Novo Serviço
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="animate-spin w-10 h-10 text-blue-900" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center p-12 text-slate-500 font-bold">
            Você ainda não possui serviços cadastrados.
          </div>
        ) : (
          services.map((servico) => (
            <Card key={servico.id} className={`border-none shadow-xl shadow-blue-900/5 rounded-[2rem] overflow-hidden group hover:shadow-blue-900/10 transition-all bg-white ${servico.status === 'inativo' ? 'opacity-60' : ''}`}>
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all ${
                    servico.status === 'ativo' 
                    ? 'bg-green-50 text-green-500 group-hover:scale-110' 
                    : 'bg-slate-50 text-slate-400'
                  }`}>
                    {servico.status === 'ativo' ? <CheckCircle2 size={40} strokeWidth={1.5} /> : <XCircle size={40} strokeWidth={1.5} />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-2xl font-black text-[#103569] tracking-tight">{servico.title}</h4>
                      {servico.status === 'ativo' && (
                        <span className="px-2 py-0.5 rounded-full bg-green-500 text-white text-[8px] font-black uppercase tracking-widest">Ativo</span>
                      )}
                      {servico.status === 'inativo' && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-400 text-white text-[8px] font-black uppercase tracking-widest">Inativo</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-sm font-bold text-slate-400 flex items-center gap-1">
                        <Briefcase size={14} /> {servico.categoryName}
                      </p>
                      <p className="text-sm font-black text-[#f7941d]">{servico.priceText}</p>
                    </div>
                  </div>
                </div>
                
                {servico.status === 'ativo' && (
                  <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 pt-6 md:pt-0 border-slate-50">
                    <Button asChild variant="outline" className="flex-1 md:flex-none rounded-xl border-slate-100 font-bold text-slate-600 h-12 px-6 hover:bg-slate-50">
                      <Link href={`/dashboard/profissional/novo-servico?id=${servico.id}`}>
                        <Edit2 size={18} className="mr-2" />
                        Editar
                      </Link>
                    </Button>
                    <Button 
                      onClick={() => handleDelete(servico.id, servico.title)}
                      disabled={deletingId === servico.id}
                      variant="outline" 
                      className="flex-1 md:flex-none rounded-xl border-slate-100 font-bold text-red-400 h-12 px-6 hover:bg-red-50 hover:border-red-100"
                    >
                      {deletingId === servico.id ? (
                        <Loader2 size={18} className="mr-2 animate-spin" />
                      ) : (
                        <Trash2 size={18} className="mr-2" />
                      )}
                      {deletingId === servico.id ? 'Removendo...' : 'Remover'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card className="border-none bg-[#103569] text-white rounded-[3rem] overflow-hidden relative shadow-2xl shadow-blue-900/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <CardContent className="p-16 flex flex-col items-center justify-center text-center space-y-6 relative z-10">
          <div className="w-24 h-24 rounded-[2rem] bg-white/10 backdrop-blur-md flex items-center justify-center text-[#f7941d] border border-white/10 shadow-inner">
            <Plus size={48} strokeWidth={1} />
          </div>
          <div className="space-y-2">
            <h4 className="text-3xl font-black tracking-tight">Expandir seu Negócio?</h4>
            <p className="text-blue-100/70 font-bold text-lg max-w-md mx-auto">Adicione novos serviços ou pacotes promocionais para alcançar mais clientes na sua região.</p>
          </div>
          <Button asChild variant="outline" className="rounded-2xl border-white/20 text-white font-black h-14 px-10 text-lg hover:bg-white/5 transition-all">
            <Link href="/dashboard/profissional/novo-servico">Configurar Novas Categorias</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
