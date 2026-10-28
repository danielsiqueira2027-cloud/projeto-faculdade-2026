-- AlterTable: users
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "has_whatsapp" BOOLEAN NOT NULL DEFAULT false;

