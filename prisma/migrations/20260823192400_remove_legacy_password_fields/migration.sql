-- DropForeignKey
ALTER TABLE "password_reset_tokens" DROP CONSTRAINT "password_reset_tokens_user_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password";

-- DropTable
DROP TABLE "password_reset_tokens";
