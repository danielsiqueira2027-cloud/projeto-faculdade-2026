-- CreateTable: reviews
CREATE TABLE IF NOT EXISTS "reviews" (
    "id" VARCHAR(36) NOT NULL,
    "client_id" VARCHAR(36) NOT NULL,
    "professional_id" VARCHAR(36) NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "reviews_client_id_professional_id_key" ON "reviews"("client_id", "professional_id");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'reviews_client_id_fkey'
    ) THEN
        ALTER TABLE "reviews" ADD CONSTRAINT "reviews_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'reviews_professional_id_fkey'
    ) THEN
        ALTER TABLE "reviews" ADD CONSTRAINT "reviews_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- Habilitar RLS na tabela reviews
ALTER TABLE "reviews" ENABLE ROW LEVEL SECURITY;

-- RLS: Política de leitura pública para reviews
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'reviews' AND policyname = 'Public read for reviews'
    ) THEN
        CREATE POLICY "Public read for reviews" ON public.reviews
        FOR SELECT TO anon, authenticated
        USING (true);
    END IF;
END $$;

-- Migrar avaliações legadas de testimonials para reviews (se existirem e ainda não migradas)
INSERT INTO "reviews" ("id", "client_id", "professional_id", "rating", "comment", "created_at", "updated_at")
SELECT 
    t."id",
    c."id" AS "client_id",
    t."professional_id",
    t."rating",
    t."content" AS "comment",
    t."created_at",
    t."created_at" AS "updated_at"
FROM "testimonials" t
JOIN "clients" c ON c."user_id" = t."author_id"
ON CONFLICT ("client_id", "professional_id") DO NOTHING;
