-- Migration: 20261019_add_category_is_active_and_icon.sql
-- Descrição: Adiciona colunas aditivas is_active e icon na tabela categories.
-- Execução manual necessária antes do QA da Etapa 6.

ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "is_active" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "icon" VARCHAR(50);
