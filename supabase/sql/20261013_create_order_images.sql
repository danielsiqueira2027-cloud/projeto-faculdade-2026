-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: 20261013_create_order_images
-- Cria a tabela order_images para armazenar fotos anexadas aos pedidos
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.order_images (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    storage_path TEXT NOT NULL,
    position INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT order_images_order_id_fkey 
        FOREIGN KEY (order_id) 
        REFERENCES public.orders(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS order_images_order_id_position_idx 
    ON public.order_images(order_id, position);
