import React from 'react';
import Link from 'next/link';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardStats } from '@/components/profissional/DashboardStats';
import { ServiceCardPro } from '@/components/profissional/ServiceCardPro';
import { getCurrentUser } from '@/lib/auth';
import { getMyServicesAction } from '@/app/actions/services';
import { prisma } from '@/lib/database';

export default async function ProfessionalDashboardPage() {
  const user = await getCurrentUser();
  const userName = user?.name || 'Profissional';

  // 1. Busca os serviços reais cadastrados pelo profissional
  const services = await getMyServicesAction();

  // 2. Busca métricas e ordens reais do profissional logado
  let totalOrders = 0;
  let rating = 0;
  let reviewCount = 0;
  let activeServicesCount = services.length;
  let recentOrders: any[] = [];

  if (user) {
    const prof = await prisma.professional.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        rating: true,
        reviewCount: true,
        _count: {
          select: {
            orders: true,
          }
        },
        orders: {
          take: 3,
          orderBy: { createdAt: 'desc' },
          include: {
            client: { include: { user: { select: { name: true } } } },
            service: { select: { title: true } }
          }
        }
      }
    });

    if (prof) {
      totalOrders = prof._count.orders;
      rating = Number(prof.rating);
      reviewCount = prof.reviewCount;
      recentOrders = prof.orders;
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter">Olá, {userName}!</h2>
          <p className="text-slate-500 font-bold">Aqui está o resumo do seu desempenho hoje.</p>
        </div>
        <div className="flex items-center gap-3">
          {user?.hasClient && (
            <Button asChild variant="outline" className="border-[#103569]/20 text-[#103569] hover:bg-[#103569]/5 rounded-2xl h-14 px-6 font-black flex items-center gap-2 transition-all active:scale-95">
              <Link href="/dashboard/cliente">
                Área Cliente
              </Link>
            </Button>
          )}
          <Button asChild className="bg-[#f7941d] hover:bg-[#f7941d]/90 text-white rounded-2xl h-14 px-8 font-black shadow-xl shadow-[#f7941d]/20 flex items-center gap-2 group transition-all active:scale-95">
            <Link href="/dashboard/profissional/novo-servico">
              <Plus className="group-hover:rotate-90 transition-transform" />
              Divulgar Novo Serviço
            </Link>
          </Button>
        </div>
      </div>

      <DashboardStats 
        totalOrders={totalOrders}
        rating={rating}
        reviewCount={reviewCount}
        activeServices={activeServicesCount}
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-black text-[#103569]">Seus Serviços Divulgados</h3>
            <span className="bg-slate-100 text-slate-500 text-xs font-black px-2 py-0.5 rounded-lg">
              {services.length}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg bg-white shadow-sm text-[#103569]">
              <LayoutGrid size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-slate-400">
              <List size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCardPro 
              key={service.id} 
              id={service.id}
              title={service.title}
              category={service.categoryName}
              price={service.priceText || (service.priceValue ? `R$ ${service.priceValue}` : 'A combinar')}
              location={service.location || 'Local a combinar'}
            />
          ))}

          <Link 
            href="/dashboard/profissional/novo-servico"
            className="group border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 hover:border-[#f7941d]/50 hover:bg-[#f7941d]/5 transition-all min-h-[350px]"
          >
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-white group-hover:text-[#f7941d] group-hover:scale-110 transition-all shadow-sm">
              <Plus size={32} />
            </div>
            <p className="mt-4 font-black text-slate-400 group-hover:text-[#f7941d] transition-colors">Criar Novo Serviço</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity / Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-[#103569] mb-6">Orçamentos Recentes</h3>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-slate-400 font-medium text-center py-6">
              Nenhum orçamento recebido até o momento.
            </p>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => {
                const clientName = order.client?.user?.name || 'Cliente';
                const initials = clientName.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase();
                const serviceTitle = order.service?.title || order.serviceType || 'Serviço Geral';
                return (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-[#103569]">
                        {initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#103569]">{clientName}</h4>
                        <p className="text-xs text-slate-400">{serviceTitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${
                        order.status === 'CONCLUIDO' ? 'text-green-600 bg-green-50' :
                        order.status === 'EM_ANDAMENTO' ? 'text-blue-600 bg-blue-50' :
                        'text-yellow-600 bg-yellow-50'
                      }`}>
                        {order.status}
                      </span>
                      <Button asChild variant="ghost" size="sm" className="font-bold text-[#103569] group-hover:bg-white shadow-none">
                        <Link href="/dashboard/profissional/pedidos">Ver detalhes</Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-[#103569] rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          <h3 className="text-xl font-black mb-4 relative z-10">Dica ClickServiço</h3>
          <p className="text-white/70 font-medium mb-6 relative z-10 leading-relaxed">
            "Profissionais que completam 100% do perfil e adicionam fotos de trabalhos realizados recebem 3x mais solicitações."
          </p>
          <Button asChild className="w-full bg-[#f7941d] hover:bg-[#f7941d]/90 text-white rounded-2xl h-12 font-black relative z-10">
            <Link href="/dashboard/profissional/perfil">
              Completar Perfil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
