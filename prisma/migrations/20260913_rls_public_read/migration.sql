-- ==============================================================================
-- Migration: Políticas de Leitura Pública (SELECT) para Categories, Professionals e Services
-- ==============================================================================

DO $$
BEGIN
    -- 1. categories: leitura pública total
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'categories' AND policyname = 'Public read for categories'
    ) THEN
        CREATE POLICY "Public read for categories" ON public.categories
        FOR SELECT TO anon, authenticated
        USING (true);
    END IF;

    -- 2. professionals: leitura pública total
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'professionals' AND policyname = 'Public read for professionals'
    ) THEN
        CREATE POLICY "Public read for professionals" ON public.professionals
        FOR SELECT TO anon, authenticated
        USING (true);
    END IF;

    -- 3. services: leitura pública total
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'services' AND policyname = 'Public read for services'
    ) THEN
        CREATE POLICY "Public read for services" ON public.services
        FOR SELECT TO anon, authenticated
        USING (true);
    END IF;
END $$;