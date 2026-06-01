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

  const tablesToConvert = [
    'users',
    'clients',
    'professionals',
    'categories',
    'chat_rooms',
    'chat_messages'
  ];

  console.log('--- CONVERTING TABLES TO INNODB ---');
  for (const table of tablesToConvert) {
    try {
      console.log(`Converting ${table} to InnoDB...`);
      await prisma.$executeRawUnsafe(`ALTER TABLE \`${table}\` ENGINE=InnoDB`);
      console.log(`Successfully converted ${table}!`);
    } catch (err) {
      console.error(`Failed to convert ${table}:`, err.message);
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
