'use server';

import { prisma } from '@/lib/database';
import { adminAuth } from '@/lib/auth-admin';

async function checkAdminSession() {
  const session = await adminAuth();
  if (!session || session.user?.role !== 'admin') throw new Error('Acesso negado.');
  return session;
}

export async function getAdminDashboardMetrics() {
  await checkAdminSession();
  const [r, c, p, o] = await Promise.all([
    prisma.order.aggregate({ _sum: { agreedPrice: true }, where: { status: 'CONCLUIDO' } }),
    prisma.client.count(), prisma.professional.count(), prisma.order.count()
  ]);
  return { revenue: Number(r._sum.agreedPrice || 0), clients: c, professionals: p, orders: o };
}

export async function getRecentActivity() {
  await checkAdminSession();
  const orders = await prisma.order.findMany({
    take: 8, orderBy: { createdAt: 'desc' },
    include: { client: { include: { user: { select: { name: true } } } }, professional: { include: { user: { select: { name: true } } } }, service: { select: { title: true } } }
  });
  return orders.map(order => {
    const svc = order.service?.title || order.serviceType || 'Servico';
    const cli = order.client?.user?.name || 'Cliente';
    const pro = order.professional?.user?.name || 'Profissional';
    const diff = Math.floor((Date.now() - order.createdAt.getTime()) / 60000);
    const t = diff < 1 ? 'agora' : diff < 60 ? diff + 'min' : Math.floor(diff/60) + 'h';
    return { id: order.id, description: cli + ' solicitou ' + svc + ' de ' + pro, time: t };
  });
}

export async function getAllUsersAction() {
  await checkAdminSession();
  const users = await prisma.user.findMany({ include: { client: true, professional: true }, orderBy: { createdAt: 'desc' } });
  const result: { id: string; name: string; email: string; status: "Ativo" | "Suspenso"; registrationDate: string; type: "cliente" | "prestador"; }[] = [];
  users.forEach(u => {
    const st: "Ativo" | "Suspenso" = u.isActive ? 'Ativo' : 'Suspenso';
    const b = { id: u.id, name: u.name, email: u.email, status: st as "Ativo" | "Suspenso", registrationDate: u.createdAt.toLocaleDateString('pt-BR') };
    if (u.professional) result.push({ ...b, type: 'prestador' as const });
    if (u.client) result.push({ ...b, type: 'cliente' as const });
    if (!u.professional && !u.client) result.push({ ...b, type: 'cliente' as const });
  });
  return result;
}

export async function toggleUserStatusAction(userId: string) {
  await checkAdminSession();
  const u = await prisma.user.findUnique({ where: { id: userId } });
  if (u) await prisma.user.update({ where: { id: userId }, data: { isActive: !u.isActive } });
}

export async function getAllOrdersForAdminAction() {
  await checkAdminSession();
  const orders = await prisma.order.findMany({ include: { client: { include: { user: true } }, professional: { include: { user: true } } }, orderBy: { createdAt: 'desc' } });
  return orders.map(order => {
    const m: Record<string, ServiceStatusValue> = { PENDENTE: 'Pendente', EM_ANDAMENTO: 'Em andamento', CONCLUIDO: 'Concluído', CANCELADO: 'Cancelado', DISPUTA: 'Em Disputa' };
    return { id: order.id, clientName: order.client.user.name, professionalName: order.professional.user.name, value: Number(order.agreedPrice || 0), status: m[order.status] || 'Pendente' };
  });
}

type ServiceStatusValue = "Em aberto" | "Em andamento" | "Concluído" | "Em Disputa" | "Cancelado" | "Pendente";

export async function markOrderAsDisputedAction(orderId: string) {
  await checkAdminSession();
  await prisma.order.update({ where: { id: orderId }, data: { status: 'DISPUTA' } });
}
