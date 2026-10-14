-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: 20261012_cascade_auth_user_delete (v2 - tipos corrigidos)
--
-- Tipos reais verificados em information_schema.columns:
--   auth.users.id         → UUID
--   public.users.id       → VARCHAR(36)
--   professionals.user_id → VARCHAR(36)
--   clients.user_id       → VARCHAR(36)
--   orders/appointments   → VARCHAR(36) (todos os FKs)
--   storage.objects.owner → UUID
--   storage.objects.name  → TEXT
--
-- A função usa OLD.id::text para converter o UUID de auth.users para text
-- e depois compara com as colunas VARCHAR de public.* (compatível via text).
-- Para storage.objects.owner (UUID), usa OLD.id diretamente (sem cast).
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_auth_user_deleted()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, storage
AS $$
DECLARE
  -- auth.users.id é UUID; public.users.id é VARCHAR(36)
  -- Convertemos para text para comparar com VARCHAR de todas as tabelas públicas
  v_user_id  text := OLD.id::text;
  v_prof_id  text;
  v_client_id text;
BEGIN
  -- 1. Obter IDs dos perfis profissional e cliente (ambos VARCHAR -> text OK)
  SELECT id INTO v_prof_id  FROM public.professionals WHERE user_id = v_user_id;
  SELECT id INTO v_client_id FROM public.clients       WHERE user_id = v_user_id;

  -- 2. Limpar agendamentos (FK RESTRICT → precisam ser removidos antes dos orders)
  IF v_prof_id IS NOT NULL OR v_client_id IS NOT NULL THEN
    DELETE FROM public.appointments
    WHERE (v_prof_id   IS NOT NULL AND professional_id = v_prof_id)
       OR (v_client_id IS NOT NULL AND client_id       = v_client_id);
  END IF;

  -- 3. Limpar mensagens de chat → salas → orders (FKs RESTRICT em ordem)
  IF v_prof_id IS NOT NULL OR v_client_id IS NOT NULL THEN
    DELETE FROM public.chat_messages
    WHERE room_id IN (
      SELECT id FROM public.chat_rooms
      WHERE order_id IN (
        SELECT id FROM public.orders
        WHERE (v_prof_id   IS NOT NULL AND professional_id = v_prof_id)
           OR (v_client_id IS NOT NULL AND client_id       = v_client_id)
      )
    );

    DELETE FROM public.chat_rooms
    WHERE order_id IN (
      SELECT id FROM public.orders
      WHERE (v_prof_id   IS NOT NULL AND professional_id = v_prof_id)
         OR (v_client_id IS NOT NULL AND client_id       = v_client_id)
    );

    DELETE FROM public.orders
    WHERE (v_prof_id   IS NOT NULL AND professional_id = v_prof_id)
       OR (v_client_id IS NOT NULL AND client_id       = v_client_id);
  END IF;

  -- 4. Limpar arquivos do Storage pertencentes ao usuário
  --    storage.objects.owner é UUID  → compara com OLD.id diretamente (sem cast)
  --    storage.objects.name  é TEXT  → compara com v_user_id (text) via LIKE
  PERFORM set_config('storage.allow_delete_query', 'true', true);
  DELETE FROM storage.objects
  WHERE owner = OLD.id                                        -- owner UUID = auth.users.id UUID
     OR name LIKE v_user_id || '/%'                          -- pasta /<user_id>/...
     OR (v_prof_id IS NOT NULL AND name LIKE '%/' || v_prof_id || '/%');  -- pasta /<prof_id>/

  -- 5. Deletar de public.users (VARCHAR = text comparação implícita OK)
  --    ON DELETE CASCADE propagará automaticamente para:
  --      professionals → professional_categories, services (→ service_images), portfolio_items,
  --                       certifications, testimonials recebidos
  --      clients
  --      chat_messages (sender_id cascade)
  --      notifications
  DELETE FROM public.users WHERE id = v_user_id;

  RETURN OLD;
END;
$$;

-- Recria o trigger (DROP primeiro para ser idempotente)
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;

CREATE TRIGGER on_auth_user_deleted
  AFTER DELETE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_auth_user_deleted();
