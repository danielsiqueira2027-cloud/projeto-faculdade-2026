import dotenv from 'dotenv';
import path from 'node:path';
import { Pool } from 'pg';

// Carrega variáveis de ambiente do .env e .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

interface PingResult {
  service: string;
  success: boolean;
  durationMs: number;
  details?: string;
  error?: string;
}

async function pingSupabaseRest(): Promise<PingResult> {
  const start = Date.now();
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    return {
      service: 'Supabase REST API',
      success: false,
      durationMs: 0,
      error: 'Variáveis SUPABASE_URL e/ou SUPABASE_ANON_KEY não encontradas no .env',
    };
  }

  try {
    const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/categories?select=id&limit=1`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    });

    const durationMs = Date.now() - start;

    if (!response.ok) {
      return {
        service: 'Supabase REST API',
        success: false,
        durationMs,
        error: `HTTP ${response.status} - ${response.statusText}`,
      };
    }

    return {
      service: 'Supabase REST API',
      success: true,
      durationMs,
      details: `Status ${response.status} OK (endpoint /rest/v1/categories)`,
    };
  } catch (err) {
    return {
      service: 'Supabase REST API',
      success: false,
      durationMs: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function pingPostgresDirect(): Promise<PingResult> {
  const start = Date.now();
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return {
      service: 'PostgreSQL Direct Pooler',
      success: false,
      durationMs: 0,
      error: 'DATABASE_URL não configurada no .env',
    };
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    connectionTimeoutMillis: 10000,
    max: 1,
  });

  try {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT 1 AS alive, NOW() AS server_time;');
      const durationMs = Date.now() - start;
      const serverTime = res.rows[0]?.server_time;
      return {
        service: 'PostgreSQL Direct Pooler',
        success: true,
        durationMs,
        details: `SELECT 1 executado com sucesso (DB Time: ${serverTime})`,
      };
    } finally {
      client.release();
    }
  } catch (err) {
    return {
      service: 'PostgreSQL Direct Pooler',
      success: false,
      durationMs: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  } finally {
    await pool.end();
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('🔄 ClickServiço - Supabase Keep-Alive Healthcheck');
  console.log(`⏰ Horário local: ${new Date().toISOString()}`);
  console.log('='.repeat(60));

  const [restResult, pgResult] = await Promise.all([
    pingSupabaseRest(),
    pingPostgresDirect(),
  ]);

  const results = [restResult, pgResult];

  for (const res of results) {
    if (res.success) {
      console.log(`✅ [${res.service}] SUCESSO (${res.durationMs}ms)`);
      if (res.details) console.log(`   └─ ${res.details}`);
    } else {
      console.log(`❌ [${res.service}] FALHA (${res.durationMs}ms)`);
      if (res.error) console.log(`   └─ Erro: ${res.error}`);
    }
  }

  console.log('='.repeat(60));
  const hasSuccess = results.some((r) => r.success);

  if (hasSuccess) {
    console.log('🎉 Atividade registrada no Supabase com sucesso! Projeto ativo.');
    process.exitCode = 0;
  } else {
    console.error('💥 Nenhuma conexão obteve sucesso. Verifique se o projeto está pausado.');
    process.exitCode = 1;
  }
}

main();
