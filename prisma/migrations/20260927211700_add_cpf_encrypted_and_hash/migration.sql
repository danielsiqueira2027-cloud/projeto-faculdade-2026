-- DropIndex
DROP INDEX IF EXISTS "professionals_cpf_key";

-- AlterTable
ALTER TABLE "professionals" DROP COLUMN IF EXISTS "cpf",
ADD COLUMN IF NOT EXISTS "cpf_encrypted" TEXT,
ADD COLUMN IF NOT EXISTS "cpf_hash" VARCHAR(64);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "professionals_cpf_hash_key" ON "professionals"("cpf_hash");
