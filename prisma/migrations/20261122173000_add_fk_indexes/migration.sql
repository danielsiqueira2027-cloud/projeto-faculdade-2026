-- CreateIndex
CREATE INDEX IF NOT EXISTS "services_professional_id_idx" ON "services"("professional_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "services_category_id_idx" ON "services"("category_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "orders_service_id_idx" ON "orders"("service_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "orders_category_id_idx" ON "orders"("category_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "portfolio_items_professional_id_idx" ON "portfolio_items"("professional_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "portfolio_items_category_id_idx" ON "portfolio_items"("category_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "testimonials_professional_id_idx" ON "testimonials"("professional_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "testimonials_author_id_idx" ON "testimonials"("author_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "certifications_professional_id_idx" ON "certifications"("professional_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "chat_messages_sender_id_idx" ON "chat_messages"("sender_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "reviews_professional_id_idx" ON "reviews"("professional_id");
