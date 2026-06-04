import { Activity, User, ServiceOrder, Transaction, Category, Coupon } from "../types";

export const mockActivities: Activity[] = [
  { id: "1", description: "João Silva cadastrou-se como Cliente.", time: "Há 10 minutos" },
  { id: "2", description: "Nova OS #4521 criada (Instalação Elétrica).", time: "Há 25 minutos" },
  { id: "3", description: "Disputa iniciada na OS #4510.", time: "Há 1 hora" },
  { id: "4", description: "Saque de R$ 500 aprovado para Marcos Pintor.", time: "Há 2 horas" },
  { id: "5", description: "Novo cupom 'BEMVINDO20' criado.", time: "Há 4 horas" },
];

export const mockUsers: User[] = [
  { id: "1", name: "João Silva", email: "joao@email.com", status: "Ativo", registrationDate: "10/05/2026", type: "cliente" },
  { id: "2", name: "Maria Souza", email: "maria@email.com", status: "Suspenso", registrationDate: "05/04/2026", type: "cliente" },
  { id: "3", name: "Carlos Ferreira", email: "carlos@email.com", status: "Ativo", registrationDate: "15/03/2026", type: "prestador" },
  { id: "4", name: "Ana Lima", email: "ana@email.com", status: "Ativo", registrationDate: "20/02/2026", type: "prestador" },
];

export const mockServices: ServiceOrder[] = [
  { id: "4510", clientName: "João Silva", professionalName: "Carlos Ferreira", value: 450, status: "Em Disputa" },
  { id: "4521", clientName: "Maria Souza", professionalName: "Ana Lima", value: 1200, status: "Em andamento" },
  { id: "4522", clientName: "Pedro Alves", professionalName: "Marcos Pintor", value: 850, status: "Em aberto" },
  { id: "4523", clientName: "Lucas Gomes", professionalName: "Carlos Ferreira", value: 150, status: "Concluído" },
];

export const mockTransactions: Transaction[] = [
  { id: "TRX-001", payer: "João Silva", payee: "Carlos Ferreira", platformFee: 45, status: "Pago" },
  { id: "TRX-002", payer: "Maria Souza", payee: "Ana Lima", platformFee: 120, status: "Pendente" },
  { id: "TRX-003", payer: "Lucas Gomes", payee: "Carlos Ferreira", platformFee: 15, status: "Pago" },
];

export const mockCategories: Category[] = [
  { id: "1", name: "Hidráulica", active: true },
  { id: "2", name: "Elétrica", active: true },
  { id: "3", name: "Pintura", active: true },
];

export const mockCoupons: Coupon[] = [
  { code: "BEMVINDO20", percentage: 20 },
  { code: "ELETRI10", percentage: 10 },
];
