'use server';

import { prisma } from '@/lib/database';
import { adminAuth } from '@/lib/auth-admin';
import type { Activity, AdminDashboardMetrics, User, UserDetail, AdminOrderItem, AdminOrderDetail, AdminOrderStatus } from '@/app/admin/types';

function formatRelativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return 'agora';

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `há ${diffMin} min`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `há ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `há ${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) return `há ${diffWeeks} ${diffWeeks === 1 ? 'semana' : 'semanas'}`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `há ${diffMonths} ${diffMonths === 1 ? 'mês' : 'meses'}`;

  const diffYears = Math.floor(diffDays / 365);
  return `há ${diffYears} ${diffYears === 1 ? 'ano' : 'anos'}`;
}

async function checkAdminSession() {
  const session = await adminAuth();
  if (!session || session.user?.role !== 'admin') throw new Error('Acesso negado.');
  return session;
}

export async function getAdminDashboardMetrics(): Promise<AdminDashboardMetrics> {
  await checkAdminSession();
  const [
    r,
    clientsCount,
    professionalsCount,
    ordersCount,
    ordersByStatusGroup,
    activeUsersCount,
    suspendedUsersCount,
    verifiedProsCount,
    pendingProsCount,
  ] = await Promise.all([
    prisma.order.aggregate({
      _sum: { agreedPrice: true },
      where: { status: 'CONCLUIDO' },
    }),
    prisma.client.count(),
    prisma.professional.count(),
    prisma.order.count(),
    prisma.order.groupBy({
      by: ['status'],
      _count: true,
    }),
    prisma.user.count({ where: { isActive: true } }),
    prisma.user.count({ where: { isActive: false } }),
    prisma.professional.count({ where: { isVerified: true } }),
    prisma.professional.count({ where: { isVerified: false } }),
  ]);

  const ordersByStatus: Record<string, number> = {
    PENDENTE: 0,
    EM_ANDAMENTO: 0,
    CONCLUIDO: 0,
    CANCELADO: 0,
    DISPUTA: 0,
  };
  ordersByStatusGroup.forEach((g) => {
    ordersByStatus[g.status] = g._count;
  });

  return {
    revenue: Number(r._sum.agreedPrice || 0),
    clients: clientsCount,
    professionals: professionalsCount,
    orders: ordersCount,
    ordersByStatus,
    activeUsers: activeUsersCount,
    suspendedUsers: suspendedUsersCount,
    verifiedProfessionals: verifiedProsCount,
    pendingVerification: pendingProsCount,
  };
}

export async function getRecentActivity(): Promise<Activity[]> {
  await checkAdminSession();

  const [orders, users, pendingPros] = await Promise.all([
    prisma.order.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: {
        client: { include: { user: { select: { name: true } } } },
        professional: { include: { user: { select: { name: true } } } },
        service: { select: { title: true } },
      },
    }),
    prisma.user.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { client: true, professional: true },
    }),
    prisma.professional.findMany({
      where: { isVerified: false },
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true } } },
    }),
  ]);

  const activities: { id: string; date: Date; type: "order" | "user" | "verification"; description: string; href: string }[] = [];

  orders.forEach((o) => {
    const svc = o.service?.title || o.serviceType || 'Serviço';
    const cli = o.client?.user?.name || 'Cliente';
    const pro = o.professional?.user?.name || 'Profissional';
    activities.push({
      id: `order-${o.id}`,
      date: o.createdAt,
      type: 'order',
      description: `${cli} solicitou ${svc} de ${pro}`,
      href: '/admin/servicos',
    });
  });

  users.forEach((u) => {
    const role = u.professional ? 'Profissional' : 'Cliente';
    activities.push({
      id: `user-${u.id}`,
      date: u.createdAt,
      type: 'user',
      description: `${u.name} cadastrou-se como ${role}`,
      href: '/admin/usuarios',
    });
  });

  pendingPros.forEach((p) => {
    const name = p.user?.name || 'Profissional';
    activities.push({
      id: `pro-${p.id}`,
      date: p.createdAt,
      type: 'verification',
      description: `${name} aguarda verificação de perfil profissional`,
      href: '/admin/profissionais',
    });
  });

  activities.sort((a, b) => b.date.getTime() - a.date.getTime());

  return activities.slice(0, 8).map((a) => ({
    id: a.id,
    type: a.type,
    description: a.description,
    time: formatRelativeTime(a.date),
    href: a.href,
  }));
}

export interface GetUsersParams {
  page?: number;
  pageSize?: number;
  search?: string;
  type?: "todos" | "cliente" | "prestador";
  status?: "todos" | "Ativo" | "Suspenso";
}

export interface PaginatedUsersResult {
  users: User[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export async function getUsersPaginatedAction(params: GetUsersParams = {}): Promise<PaginatedUsersResult> {
  await checkAdminSession();

  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(params.pageSize) || 10));
  const search = params.search?.trim();
  const type = params.type || "todos";
  const status = params.status || "todos";

  const where: import('@/generated/prisma').Prisma.UserWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (status === "Ativo") {
    where.isActive = true;
  } else if (status === "Suspenso") {
    where.isActive = false;
  }

  if (type === "cliente") {
    where.client = { isNot: null };
  } else if (type === "prestador") {
    where.professional = { isNot: null };
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { client: true, professional: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where }),
  ]);

  const result: User[] = users.map((u) => {
    const userStatus: "Ativo" | "Suspenso" = u.isActive ? "Ativo" : "Suspenso";
    const userType: "cliente" | "prestador" = u.professional ? "prestador" : "cliente";
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      status: userStatus,
      registrationDate: u.createdAt.toLocaleDateString('pt-BR'),
      type: userType,
    };
  });

  return {
    users: result,
    total,
    totalPages: Math.ceil(total / pageSize) || 1,
    currentPage: page,
  };
}

export async function getUserDetailsAction(userId: string): Promise<UserDetail | null> {
  await checkAdminSession();

  if (!userId || typeof userId !== 'string' || userId.length > 50) {
    throw new Error("ID de usuário inválido.");
  }

  const u = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatarUrl: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      client: {
        include: {
          orders: {
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              serviceType: true,
              status: true,
              agreedPrice: true,
              createdAt: true,
            },
          },
          _count: { select: { orders: true } },
        },
      },
      professional: {
        select: {
          id: true,
          specialty: true,
          bio: true,
          phone: true,
          location: true,
          addressCity: true,
          addressState: true,
          isVerified: true,
          rating: true,
          reviewCount: true,
          orders: {
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              serviceType: true,
              status: true,
              agreedPrice: true,
              createdAt: true,
            },
          },
          _count: { select: { orders: true } },
        },
      },
    },
  });

  if (!u) return null;

  const types: ("cliente" | "prestador")[] = [];
  if (u.client) types.push("cliente");
  if (u.professional) types.push("prestador");

  return {
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    avatarUrl: u.avatarUrl,
    status: u.isActive ? "Ativo" : "Suspenso",
    registrationDate: u.createdAt.toLocaleDateString('pt-BR'),
    updatedDate: u.updatedAt.toLocaleDateString('pt-BR'),
    types,
    clientProfile: u.client
      ? {
          totalOrders: u.client._count.orders,
          recentOrders: u.client.orders.map((o) => ({
            id: o.id,
            serviceType: o.serviceType || "Serviço",
            status: o.status,
            value: Number(o.agreedPrice || 0),
            createdAt: o.createdAt.toLocaleDateString('pt-BR'),
          })),
        }
      : undefined,
    professionalProfile: u.professional
      ? {
          specialty: u.professional.specialty,
          bio: u.professional.bio,
          phone: u.professional.phone,
          location: u.professional.location || [u.professional.addressCity, u.professional.addressState].filter(Boolean).join(' - ') || null,
          isVerified: u.professional.isVerified,
          rating: Number(u.professional.rating),
          reviewCount: u.professional.reviewCount,
          totalOrders: u.professional._count.orders,
          recentOrders: u.professional.orders.map((o) => ({
            id: o.id,
            serviceType: o.serviceType || "Serviço",
            status: o.status,
            value: Number(o.agreedPrice || 0),
            createdAt: o.createdAt.toLocaleDateString('pt-BR'),
          })),
        }
      : undefined,
  };
}

export async function toggleUserStatusAction(input: string | { userId: string; reason?: string }) {
  const session = await checkAdminSession();

  const userId = typeof input === 'string' ? input : input.userId;
  const reason = typeof input === 'object' ? input.reason : undefined;

  if (!userId || typeof userId !== 'string' || userId.length > 50) {
    throw new Error("ID de usuário inválido.");
  }

  // Prevenção de bloqueio da própria sessão se o admin tivesse registro na tabela
  if (session.user?.id === userId) {
    throw new Error("Ação não permitida na própria conta de administrador.");
  }

  const u = await prisma.user.findUnique({ where: { id: userId } });
  if (!u) throw new Error("Usuário não encontrado.");

  const newStatus = !u.isActive;
  await prisma.user.update({
    where: { id: userId },
    data: { isActive: newStatus },
  });

  const statusLabel = newStatus ? "Ativo" : "Suspenso";
  const motivoLog = reason?.trim() || "Não informado";
  console.info(`[ADMIN AUDIT] Usuário ${u.id} (${u.email}) alterado para '${statusLabel}'. Motivo: "${motivoLog}". Autor: ${session.user?.email || 'admin'}`);

  return { success: true, newStatus: statusLabel };
}

// ─── Etapa 4: Serviços (Ordens de Serviço) ──────────────────────────────────

export interface GetOrdersParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: 'TODOS' | AdminOrderStatus;
  period?: 'todos' | '7d' | '30d' | '90d';
}

export interface PaginatedOrdersResult {
  orders: AdminOrderItem[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export async function getOrdersPaginatedAction(params: GetOrdersParams = {}): Promise<PaginatedOrdersResult> {
  await checkAdminSession();

  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(params.pageSize) || 10));
  const search = params.search?.trim().slice(0, 100);

  const allowedStatuses: AdminOrderStatus[] = ['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO', 'DISPUTA'];
  const statusFilter = params.status && allowedStatuses.includes(params.status as AdminOrderStatus) ? (params.status as AdminOrderStatus) : null;
  const period = ['7d', '30d', '90d', 'todos'].includes(params.period || '') ? params.period : 'todos';

  const where: import('@/generated/prisma').Prisma.OrderWhereInput = {};

  if (statusFilter) {
    where.status = statusFilter;
  }

  if (period && period !== 'todos') {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    where.createdAt = { gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) };
  }

  if (search) {
    where.OR = [
      { id: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { serviceType: { contains: search, mode: 'insensitive' } },
      { client: { user: { name: { contains: search, mode: 'insensitive' } } } },
      { professional: { user: { name: { contains: search, mode: 'insensitive' } } } },
    ];
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        status: true,
        serviceType: true,
        description: true,
        agreedPrice: true,
        createdAt: true,
        scheduledAt: true,
        client: {
          select: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
        professional: {
          select: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    orders: orders.map((o) => ({
      id: o.id,
      serviceType: o.serviceType,
      description: o.description,
      clientName: o.client?.user?.name || 'Cliente',
      clientEmail: o.client?.user?.email || '—',
      professionalName: o.professional?.user?.name || 'Profissional',
      professionalEmail: o.professional?.user?.email || '—',
      value: Number(o.agreedPrice) || 0,
      status: o.status as AdminOrderStatus,
      createdAt: o.createdAt.toLocaleDateString('pt-BR'),
      scheduledAt: o.scheduledAt ? o.scheduledAt.toLocaleDateString('pt-BR') : null,
    })),
    total,
    totalPages: Math.ceil(total / pageSize) || 1,
    currentPage: page,
  };
}

export async function getOrderDetailAction(orderId: string): Promise<AdminOrderDetail | null> {
  await checkAdminSession();

  if (!orderId || typeof orderId !== 'string' || orderId.length > 50) {
    throw new Error('ID do pedido inválido.');
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      status: true,
      serviceType: true,
      description: true,
      locationCep: true,
      address: true,
      urgency: true,
      period: true,
      agreedPrice: true,
      scheduledAt: true,
      notes: true,
      createdAt: true,
      updatedAt: true,
      client: {
        select: {
          id: true,
          user: { select: { id: true, name: true, email: true, phone: true } },
        },
      },
      professional: {
        select: {
          id: true,
          user: { select: { id: true, name: true, email: true, phone: true } },
        },
      },
      service: { select: { id: true, title: true } },
      category: { select: { id: true, name: true } },
      images: {
        select: { id: true, storagePath: true, position: true },
        orderBy: { position: 'asc' },
      },
    },
  });

  if (!order) return null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xvvhrjptomwadkmpnjrg.supabase.co';

  return {
    id: order.id,
    status: order.status as AdminOrderStatus,
    serviceType: order.serviceType,
    description: order.description,
    locationCep: order.locationCep,
    address: order.address,
    urgency: order.urgency,
    period: order.period,
    agreedPrice: order.agreedPrice ? Number(order.agreedPrice) : null,
    scheduledAt: order.scheduledAt ? order.scheduledAt.toLocaleDateString('pt-BR') : null,
    notes: order.notes,
    createdAt: order.createdAt.toLocaleDateString('pt-BR'),
    updatedAt: order.updatedAt.toLocaleDateString('pt-BR'),
    client: {
      id: order.client.id,
      name: order.client.user.name,
      email: order.client.user.email,
      phone: order.client.user.phone || null,
    },
    professional: {
      id: order.professional.id,
      name: order.professional.user.name,
      email: order.professional.user.email,
      phone: order.professional.user.phone || null,
    },
    serviceTitle: order.service?.title || null,
    categoryName: order.category?.name || null,
    images: order.images.map((img) => ({
      id: img.id,
      url: `${supabaseUrl}/storage/v1/object/public/uploads/${img.storagePath}`,
      position: img.position,
    })),
  };
}

export async function markOrderAsDisputedAction(orderId: string, reason?: string) {
  const session = await checkAdminSession();

  if (!orderId || typeof orderId !== 'string' || orderId.length > 50) {
    throw new Error('ID do pedido inválido.');
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { id: true, status: true },
  });

  if (!order) {
    throw new Error('Pedido não encontrado.');
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: 'DISPUTA' },
  });

  const motivoLog = reason?.trim().slice(0, 200) || 'Não informado';
  console.info(`[ADMIN AUDIT] Pedido ${orderId} marcado como DISPUTA. Motivo: "${motivoLog}". Autor: ${session.user?.email || 'admin'}`);

  return { success: true };
}

export async function getAllOrdersForAdminAction() {
  await checkAdminSession();
  const orders = await prisma.order.findMany({
    include: { client: { include: { user: true } }, professional: { include: { user: true } } },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  type ServiceStatusValue = "Em aberto" | "Em andamento" | "Concluído" | "Em Disputa" | "Cancelado" | "Pendente";
  const m: Record<string, ServiceStatusValue> = {
    PENDENTE: 'Pendente',
    EM_ANDAMENTO: 'Em andamento',
    CONCLUIDO: 'Concluído',
    CANCELADO: 'Cancelado',
    DISPUTA: 'Em Disputa',
  };
  return orders.map((order) => ({
    id: order.id,
    clientName: order.client.user.name,
    professionalName: order.professional.user.name,
    value: Number(order.agreedPrice || 0),
    status: m[order.status] || 'Pendente',
  }));
}

// ─── Etapa 3: Profissionais ────────────────────────────────────────────────

export interface AdminProfessional {
  id: string;
  professionalId: string;
  name: string;
  email: string;
  specialty: string | null;
  location: string | null;
  isVerified: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  registrationDate: string;
}

export interface GetProfessionalsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  verified?: 'todos' | 'verificado' | 'pendente';
  active?: 'todos' | 'ativo' | 'suspenso';
}

export interface PaginatedProfessionalsResult {
  professionals: AdminProfessional[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export async function getProfessionalsListAction(params: GetProfessionalsParams = {}): Promise<PaginatedProfessionalsResult> {
  await checkAdminSession();

  const page     = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(params.pageSize) || 10));
  const search   = params.search?.trim();
  const verified = params.verified || 'todos';
  const active   = params.active   || 'todos';

  const where: import('@/generated/prisma').Prisma.ProfessionalWhereInput = {};

  if (search) {
    where.OR = [
      { user:      { name:      { contains: search, mode: 'insensitive' } } },
      { specialty: { contains: search, mode: 'insensitive' } },
      { addressCity: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (verified === 'verificado')  where.isVerified = true;
  if (verified === 'pendente')    where.isVerified = false;

  if (active === 'ativo')    where.user = { ...((where.user as object) ?? {}), isActive: true  };
  if (active === 'suspenso') where.user = { ...((where.user as object) ?? {}), isActive: false };

  const [professionals, total] = await Promise.all([
    prisma.professional.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      select: {
        id:          true,
        specialty:   true,
        location:    true,
        addressCity: true,
        addressState:true,
        isVerified:  true,
        rating:      true,
        reviewCount: true,
        createdAt:   true,
        user: {
          select: { id: true, name: true, email: true, isActive: true },
        },
      },
    }),
    prisma.professional.count({ where }),
  ]);

  return {
    professionals: professionals.map((p) => ({
      id:               p.user.id,
      professionalId:   p.id,
      name:             p.user.name,
      email:            p.user.email,
      specialty:        p.specialty,
      location:         p.location || [p.addressCity, p.addressState].filter(Boolean).join(' - ') || null,
      isVerified:       p.isVerified,
      isActive:         p.user.isActive,
      rating:           Number(p.rating),
      reviewCount:      p.reviewCount,
      registrationDate: p.createdAt.toLocaleDateString('pt-BR'),
    })),
    total,
    totalPages:  Math.ceil(total / pageSize) || 1,
    currentPage: page,
  };
}

export async function toggleProfessionalVerificationAction(professionalId: string) {
  const session = await checkAdminSession();

  if (!professionalId || typeof professionalId !== 'string' || professionalId.length > 50) {
    throw new Error('ID de profissional inválido.');
  }

  const prof = await prisma.professional.findUnique({
    where: { id: professionalId },
    select: { id: true, isVerified: true, user: { select: { id: true, email: true } } },
  });
  if (!prof) throw new Error('Profissional não encontrado.');

  const newVerified = !prof.isVerified;
  await prisma.professional.update({
    where: { id: professionalId },
    data:  { isVerified: newVerified },
  });

  const label = newVerified ? 'VERIFICADO' : 'VERIFICAÇÃO REMOVIDA';
  console.info(
    `[ADMIN AUDIT] Profissional ${prof.id} (${prof.user.email}) → ${label}. ` +
    `Autor: ${session.user?.email ?? 'admin'}`
  );

  return { success: true, isVerified: newVerified };
}

// ─── Etapa 5: Financeiro ───────────────────────────────────────────────────

export interface FinancialSummary {
  countsByStatus: {
    pendente: number;
    emAndamento: number;
    concluido: number;
    cancelado: number;
    disputa: number;
    total: number;
  };
  volumeNegociado: number;
  ticketMedio: number;
  concluidosComValorCount: number;
  monthlyStats: {
    monthKey: string;
    label: string;
    count: number;
    volume: number;
  }[];
  recentOrders: {
    id: string;
    clientName: string;
    professionalName: string;
    value: number;
    status: AdminOrderStatus;
    createdAt: string;
  }[];
}

export async function getFinancialMetricsAction(): Promise<FinancialSummary> {
  await checkAdminSession();

  const [
    pendenteCount,
    emAndamentoCount,
    concluidoCount,
    canceladoCount,
    disputaCount,
    concludedOrders,
    recentOrdersData,
  ] = await Promise.all([
    prisma.order.count({ where: { status: 'PENDENTE' } }),
    prisma.order.count({ where: { status: 'EM_ANDAMENTO' } }),
    prisma.order.count({ where: { status: 'CONCLUIDO' } }),
    prisma.order.count({ where: { status: 'CANCELADO' } }),
    prisma.order.count({ where: { status: 'DISPUTA' } }),
    prisma.order.findMany({
      where: { status: 'CONCLUIDO' },
      select: { agreedPrice: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.order.findMany({
      where: { agreedPrice: { not: null } },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: {
        id: true,
        agreedPrice: true,
        status: true,
        createdAt: true,
        client: { select: { user: { select: { name: true } } } },
        professional: { select: { user: { select: { name: true } } } },
      },
    }),
  ]);

  // Volume negociado: soma de agreedPrice dos CONCLUIDO (nulos = 0)
  const volumeNegociado = concludedOrders.reduce(
    (acc, o) => acc + (Number(o.agreedPrice) || 0),
    0
  );

  // Ticket médio SOMENTE sobre concluídos com valor (> 0)
  const concluidosComValor = concludedOrders.filter(
    (o) => o.agreedPrice && Number(o.agreedPrice) > 0
  );
  const ticketMedio =
    concluidosComValor.length > 0
      ? volumeNegociado / concluidosComValor.length
      : 0;

  // Concluídos por mês (últimos 6 meses)
  const now = new Date();
  const months: { monthKey: string; label: string; count: number; volume: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
    months.push({ monthKey, label, count: 0, volume: 0 });
  }

  for (const o of concludedOrders) {
    const d = o.createdAt;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const m = months.find((item) => item.monthKey === key);
    if (m) {
      m.count += 1;
      m.volume += Number(o.agreedPrice) || 0;
    }
  }

  return {
    countsByStatus: {
      pendente: pendenteCount,
      emAndamento: emAndamentoCount,
      concluido: concluidoCount,
      cancelado: canceladoCount,
      disputa: disputaCount,
      total: pendenteCount + emAndamentoCount + concluidoCount + canceladoCount + disputaCount,
    },
    volumeNegociado,
    ticketMedio,
    concluidosComValorCount: concluidosComValor.length,
    monthlyStats: months,
    recentOrders: recentOrdersData.map((o) => ({
      id: o.id,
      clientName: o.client?.user?.name || 'Cliente',
      professionalName: o.professional?.user?.name || 'Profissional',
      value: Number(o.agreedPrice) || 0,
      status: o.status as AdminOrderStatus,
      createdAt: o.createdAt.toLocaleDateString('pt-BR'),
    })),
  };
}

// ─── Etapa 6: Configurações (Categorias) ────────────────────────────────────

export interface AdminCategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  isActive: boolean;
  createdAt: string;
  professionalsCount: number;
}

export async function getCategoriesAdminAction(): Promise<AdminCategoryItem[]> {
  await checkAdminSession();

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      icon: true,
      isActive: true,
      createdAt: true,
      _count: {
        select: {
          professionals: true,
        },
      },
    },
  });

  return categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    icon: cat.icon,
    isActive: cat.isActive,
    createdAt: cat.createdAt.toLocaleDateString('pt-BR'),
    professionalsCount: cat._count.professionals,
  }));
}

function generateCategorySlug(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

export async function createCategoryAction(data: {
  name: string;
  slug?: string;
  icon?: string;
  description?: string;
}) {
  const session = await checkAdminSession();

  const name = data.name?.trim();
  if (!name || name.length < 2 || name.length > 100) {
    throw new Error('Nome da categoria deve ter entre 2 e 100 caracteres.');
  }

  const slug = data.slug?.trim() || generateCategorySlug(name);
  const slugRegex = /^[a-z0-9-]{2,100}$/;
  if (!slugRegex.test(slug)) {
    throw new Error('Slug inválido. Use apenas letras minúsculas, números e hífens (2-100 caracteres).');
  }

  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) {
    throw new Error(`O slug "${slug}" já está em uso por outra categoria.`);
  }

  const icon = data.icon?.trim().slice(0, 50) || null;
  const description = data.description?.trim().slice(0, 500) || null;

  const category = await prisma.category.create({
    data: {
      name,
      slug,
      icon,
      description,
      isActive: true,
    },
  });

  console.info(`[ADMIN AUDIT] Categoria criada: "${category.name}" (slug: ${category.slug}). Autor: ${session.user?.email || 'admin'}`);

  return { success: true, category };
}

export async function updateCategoryAction(data: {
  id: string;
  name: string;
  icon?: string;
  description?: string;
}) {
  const session = await checkAdminSession();

  if (!data.id || typeof data.id !== 'string' || data.id.length > 50) {
    throw new Error('ID de categoria inválido.');
  }

  const name = data.name?.trim();
  if (!name || name.length < 2 || name.length > 100) {
    throw new Error('Nome da categoria deve ter entre 2 e 100 caracteres.');
  }

  const icon = data.icon !== undefined ? (data.icon?.trim().slice(0, 50) || null) : undefined;
  const description = data.description !== undefined ? (data.description?.trim().slice(0, 500) || null) : undefined;

  const updated = await prisma.category.update({
    where: { id: data.id },
    data: {
      name,
      ...(icon !== undefined ? { icon } : {}),
      ...(description !== undefined ? { description } : {}),
    },
  });

  console.info(`[ADMIN AUDIT] Categoria atualizada: "${updated.name}" (${updated.id}). Autor: ${session.user?.email || 'admin'}`);

  return { success: true, category: updated };
}

export async function toggleCategoryActiveAction(id: string) {
  const session = await checkAdminSession();

  if (!id || typeof id !== 'string' || id.length > 50) {
    throw new Error('ID de categoria inválido.');
  }

  const cat = await prisma.category.findUnique({ where: { id } });
  if (!cat) throw new Error('Categoria não encontrada.');

  const newStatus = !cat.isActive;
  await prisma.category.update({
    where: { id },
    data: { isActive: newStatus },
  });

  const label = newStatus ? 'ATIVADA' : 'DESATIVADA';
  console.info(`[ADMIN AUDIT] Categoria ${cat.id} ("${cat.name}") → ${label}. Autor: ${session.user?.email || 'admin'}`);

  return { success: true, isActive: newStatus };
}

