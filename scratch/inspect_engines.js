const { PrismaClient } = require('../src/generated/prisma');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

async function main() {
  const urlString = process.env.DATABASE_URL || "mysql://root:@localhost:3306/dbdev_clickservico?charset=utf8mb4";
  const dbUrl = new URL(urlString);

  const poolConfig = {
    host: dbUrl.hostname || 'localhost',
    port: parseInt(dbUrl.port) || 3306,
    user: 'root',
    password: '',
    database: dbUrl.pathname.substring(1).split('?')[0],
    connectionLimit: 5,
  };

  const adapter = new PrismaMariaDb(poolConfig);
  const prisma = new PrismaClient({ adapter });

  console.log('--- TABLE ENGINES ---');
  const res = await prisma.$queryRawUnsafe(`
    SELECT TABLE_NAME, ENGINE 
    FROM information_schema.TABLES 
    WHERE TABLE_SCHEMA = 'dbdev_clickservico'
  `);
  console.log(res);

  await prisma.$disconnect();
}

main().catch(console.error);
