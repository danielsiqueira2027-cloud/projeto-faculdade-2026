-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: 20261013_order_images_storage_policies
-- Adiciona políticas de Storage para imagens de pedidos no bucket 'uploads'
-- Caminho: {user_id}/orders/{order_id}/{uuid}.{ext}
-- O prefixo user_id garante que o trigger de exclusão de conta (20261012) 
-- remova os arquivos automaticamente via listagem por prefixo.
-- ─────────────────────────────────────────────────────────────────────────────

-- INSERT: só o dono da pasta (user_id = primeiro segmento do path)
DROP POLICY IF EXISTS "Users can upload order images to own folder" ON storage.objects;
CREATE POLICY "Users can upload order images to own folder"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'uploads'
    AND (storage.foldername(name))[1] = (auth.uid())::text
    AND (storage.foldername(name))[2] = 'orders'
  );

-- SELECT: público (bucket uploads já tem política Public Access)
-- Não é necessário criar nova política de leitura.

-- DELETE: só o dono
DROP POLICY IF EXISTS "Users can delete own order images" ON storage.objects;
CREATE POLICY "Users can delete own order images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'uploads'
    AND (storage.foldername(name))[1] = (auth.uid())::text
    AND (storage.foldername(name))[2] = 'orders'
  );
