const fs = require('fs');
let file = fs.readFileSync('prisma/schema.prisma', 'utf-8');

file = file.replace(/id\s+String\s+@id\s+@default\(uuid\(\)\)/g, 'id String @id @default(uuid()) @db.VarChar(36)');
file = file.replace(/userId\s+String\s+@unique\s+@map\(\"user_id\"\)/g, 'userId String @unique @map("user_id") @db.VarChar(36)');
file = file.replace(/professionalId\s+String\s+@map\(\"professional_id\"\)/g, 'professionalId String @map("professional_id") @db.VarChar(36)');
file = file.replace(/categoryId\s+String\s+@map\(\"category_id\"\)/g, 'categoryId String @map("category_id") @db.VarChar(36)');
file = file.replace(/categoryId\s+String\?\s+@map\(\"category_id\"\)/g, 'categoryId String? @map("category_id") @db.VarChar(36)');
file = file.replace(/clientId\s+String\s+@map\(\"client_id\"\)/g, 'clientId String @map("client_id") @db.VarChar(36)');
file = file.replace(/serviceId\s+String\?\s+@map\(\"service_id\"\)(\s*\/\/[^\n]*)?/g, 'serviceId String? @map("service_id") @db.VarChar(36)$1');
file = file.replace(/authorId\s+String\?\s+@map\(\"author_id\"\)(\s*\/\/[^\n]*)?/g, 'authorId String? @map("author_id") @db.VarChar(36)$1');
file = file.replace(/orderId\s+String\?\s+@map\(\"order_id\"\)(\s*\/\/[^\n]*)?/g, 'orderId String? @map("order_id") @db.VarChar(36)$1');

fs.writeFileSync('prisma/schema.prisma', file);
console.log('Schema fixed');
