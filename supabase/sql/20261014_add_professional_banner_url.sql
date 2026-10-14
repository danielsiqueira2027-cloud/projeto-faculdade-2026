-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: 20261014_add_professional_banner_url
-- Adiciona a coluna banner_url na tabela professionals para capa customizada
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.professionals 
ADD COLUMN IF NOT EXISTS banner_url TEXT;
