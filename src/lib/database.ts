import { PrismaClient } from '@/generated/prisma';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

/**
 * Instância global do Prisma Client.
 * No Prisma 7, usamos o driver adapter para conexão direta com o MySQL/MariaDB.
 */

const urlString = process.env.DATABASE_URL;
if (!urlString) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

const dbUrl = new URL(urlString);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: any;
  adapter: any;
};

if (!globalForPrisma.adapter) {
  const poolConfig = {
    host: dbUrl.hostname || 'localhost',
    port: parseInt(dbUrl.port) || 3306,
    user: 'root',
    password: '',
    database: dbUrl.pathname.substring(1).split('?')[0],
    connectionLimit: 5,
  };

  console.log(`[${new Date().toISOString()}] [Prisma] Inicializando adaptador com:`, { ...poolConfig, password: '****' });
  globalForPrisma.adapter = new PrismaMariaDb(poolConfig);
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
