import { ElementType } from "react";

export type UserStatus = "Ativo" | "Suspenso";
export type UserType = "cliente" | "prestador";
export type ServiceStatus = "Em aberto" | "Em andamento" | "Concluído" | "Em Disputa";
export type PaymentStatus = "Pago" | "Pendente" | "Estornado";

export interface DashboardMetric {
  title: string;
  value: string;
  icon: ElementType; 
  color: "green" | "blue" | "purple" | "red";
}

export interface Activity {
  id: string;
  description: string;
  time: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  registrationDate: string;
  type: UserType;
}

export interface ServiceOrder {
  id: string;
  clientName: string;
  professionalName: string;
  value: number;
  status: ServiceStatus;
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
  active: boolean;
}

export interface Coupon {
  code: string;
  percentage: number;
}
