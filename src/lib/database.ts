import { PrismaClient } from '@/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

/**
 * Instância global do Prisma Client.
 * No Prisma 7, usamos o driver adapter para conexão direta com o PostgreSQL (Supabase).
 */

const urlString = process.env.DATABASE_URL;
if (!urlString) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
  adapter: PrismaPg | undefined;
};

if (!globalForPrisma.adapter) {
  const pool = new Pool({
    connectionString: urlString,
    max: 5,
  });
  globalForPrisma.pool = pool;
  globalForPrisma.adapter = new PrismaPg(pool);
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: globalForPrisma.adapter,
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

