import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import { Pool } from 'pg';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const sql = `
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
`;

async function applyPolicies() {
  console.log('🔄 Conectando ao PostgreSQL do Supabase...');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 10000,
  });

  try {
    // 1. Salva arquivo de migration SQL
    const migrationDir = path.resolve(process.cwd(), 'prisma/migrations/20260913_rls_public_read');
    if (!fs.existsSync(migrationDir)) {
      fs.mkdirSync(migrationDir, { recursive: true });
    }
    fs.writeFileSync(path.join(migrationDir, 'migration.sql'), sql.trim(), 'utf8');
    console.log('📁 Migration SQL salva em: prisma/migrations/20260913_rls_public_read/migration.sql');

    // 2. Executa no banco
    console.log('⚡ Executando DDL de criação de políticas RLS...');
    await pool.query(sql);
    console.log('✅ Políticas executadas com sucesso no PostgreSQL!');

    // 3. Valida no pg_policies
    const checkRes = await pool.query(`
      SELECT schemaname, tablename, policyname, permissive, roles, cmd
      FROM pg_policies
      WHERE schemaname = 'public' AND tablename IN ('categories', 'professionals', 'services')
      ORDER BY tablename;
    `);

    console.log('\n📋 Políticas cadastradas no banco:');
    console.table(checkRes.rows);

    // 4. Teste via REST API com a chave pública/anon
    console.log('\n🌐 Testando requisições reais via Supabase REST API (anon key)...');
    const supabaseUrl = process.env.SUPABASE_URL!;
    const anonKey = process.env.SUPABASE_ANON_KEY!;

    const endpoints = [
      { name: 'categories', path: '/rest/v1/categories?select=id,name,slug&limit=3' },
      { name: 'professionals', path: '/rest/v1/professionals?select=id,specialty&limit=3' },
      { name: 'services', path: '/rest/v1/services?select=id,title&limit=3' },
    ];

    for (const ep of endpoints) {
      const res = await fetch(`${supabaseUrl}${ep.path}`, {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      });
      const data = await res.json();
      console.log(`📡 [GET ${ep.name}] Status ${res.status}:`, data);
    }

  } finally {
    await pool.end();
  }
}

applyPolicies().catch(err => {
  console.error('❌ Erro ao aplicar políticas RLS:', err);
  process.exit(1);
});
