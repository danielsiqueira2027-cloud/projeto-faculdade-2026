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

  console.log('--- PROFESSIONAL CATEGORIES ---');
  const profCats = await prisma.professionalCategory.findMany({
    include: {
      category: true,
      professional: {
        include: {
          user: {
            select: { name: true }
          }
        }
      }
    }
  });
  console.log(JSON.stringify(profCats, null, 2));

  console.log('--- ORDERS ---');
  const orders = await prisma.order.findMany();
  console.log(JSON.stringify(orders, null, 2));

  await prisma.$disconnect();
}

main().catch(console.error);
