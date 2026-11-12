CREATE INDEX "appointments_professional_id_scheduled_at_status_idx" ON "appointments"("professional_id", "scheduled_at", "status");
CREATE INDEX "appointments_order_id_idx" ON "appointments"("order_id");
CREATE INDEX "chat_messages_room_id_created_at_idx" ON "chat_messages"("room_id", "created_at");
CREATE INDEX "notifications_user_id_idx" ON "notifications"("user_id");
CREATE INDEX "orders_client_id_idx" ON "orders"("client_id");
CREATE INDEX "orders_professional_id_idx" ON "orders"("professional_id");
CREATE INDEX "orders_status_idx" ON "orders"("status");
