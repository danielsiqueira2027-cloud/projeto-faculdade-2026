import { ElementType } from "react";

export type UserStatus = "Ativo" | "Suspenso";
export type UserType = "cliente" | "prestador";
export type ServiceStatus = "Em aberto" | "Em andamento" | "Concluído" | "Em Disputa" | "Cancelado" | "Pendente";
export type PaymentStatus = "Pago" | "Pendente" | "Estornado";

export interface DashboardMetric {
  title: string;
  value: string;
  icon: ElementType; 
  color: "green" | "blue" | "purple" | "red" | "amber" | "slate";
}

export interface Activity {
  id: string;
  type?: "order" | "user" | "verification";
  description: string;
  time: string;
  href?: string;
}

export interface AdminDashboardMetrics {
  revenue: number;
  clients: number;
  professionals: number;
  orders: number;
  ordersByStatus: Record<string, number>;
  activeUsers: number;
  suspendedUsers: number;
  verifiedProfessionals: number;
  pendingVerification: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  registrationDate: string;
  type: UserType;
}

export interface UserDetail {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
  status: UserStatus;
  registrationDate: string;
  updatedDate: string;
  types: ("cliente" | "prestador")[];
  clientProfile?: {
    totalOrders: number;
    recentOrders: {
      id: string;
      serviceType: string;
      status: string;
      value: number;
      createdAt: string;
    }[];
  };
  professionalProfile?: {
    specialty?: string | null;
    bio?: string | null;
    phone?: string | null;
    location?: string | null;
    isVerified: boolean;
    rating: number;
    reviewCount: number;
    totalOrders: number;
    recentOrders: {
      id: string;
      serviceType: string;
      status: string;
      value: number;
      createdAt: string;
    }[];
  };
}

export type AdminOrderStatus = "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDO" | "CANCELADO" | "DISPUTA";

export interface ServiceOrder {
  id: string;
  clientName: string;
  professionalName: string;
  value: number;
  status: ServiceStatus;
}

export interface AdminOrderItem {
  id: string;
  serviceType: string | null;
  description: string | null;
  clientName: string;
  clientEmail: string;
  professionalName: string;
  professionalEmail: string;
  value: number;
  status: AdminOrderStatus;
  createdAt: string;
  scheduledAt: string | null;
}

export interface AdminOrderDetail {
  id: string;
  status: AdminOrderStatus;
  serviceType: string | null;
  description: string | null;
  locationCep: string | null;
  address: string | null;
  urgency: string | null;
  period: string | null;
  agreedPrice: number | null;
  scheduledAt: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  client: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
  };
  professional: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
  };
  serviceTitle: string | null;
  categoryName: string | null;
  images: {
    id: string;
    url: string;
    position: number;
  }[];
}

export interface Transaction {
  id: string;
  payer: string;
  payee: string;
  platformFee: number;
  status: PaymentStatus;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string | null;
  icon?: string | null;
  active: boolean;
  isActive?: boolean;
  professionalsCount?: number;
  createdAt?: string;
}

export interface Coupon {
  code: string;
  percentage: number;
}

export function generateCategorySlug(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}
