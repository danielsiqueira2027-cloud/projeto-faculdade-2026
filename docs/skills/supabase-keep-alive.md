# Skill: Supabase Keep-Alive

Esta skill foi criada para manter o banco de dados Supabase do projeto ClickServiço ativo, prevenindo pausas automáticas por inatividade (limite de 7 dias do tier gratuito).

---

## O que ela faz

1. **Ping REST no Supabase**: Realiza um `GET` no endpoint público de categorias (`/rest/v1/categories?select=id&limit=1`) utilizando a anon/publishable key.
2. **Ping Direto no PostgreSQL**: Executa uma query leve `SELECT 1 AS alive, NOW() AS server_time;` no pooler Postgres (`aws-0-sa-east-1.pooler.supabase.com:5432`).
3. **Leitura segura das variáveis**: Utiliza diretamente o arquivo `.env` ou `.env.local` já existente, sem credenciais hardcoded.
4. **Sem impacto em dados**: Não modifica dados, schema, migrações ou políticas RLS.

---

## Como executar manualmente

A qualquer momento durante a conversa com o assistente, basta solicitar:

> *"Roda a skill supabase-keep-alive"*  
> ou  
> *"Executa o keep-alive do supabase"*

Você também pode executar diretamente no terminal local:
```bash
npx tsx scripts/keep-alive.ts
```

---

## Automação via GitHub Actions

O arquivo [`.github/workflows/supabase-keep-alive.yml`](file:///c:/Users/Daniel/plataforma-construcao/.github/workflows/supabase-keep-alive.yml) automatiza o processo na nuvem:

* **Trigger agendado (Cron)**: Disparado toda quarta-feira às 12:00 UTC (09:00 BRT).
* **Trigger manual (workflow_dispatch)**: Permite rodar sob demanda diretamente pela interface do GitHub na aba *Actions*.
* **Sem dependência de máquina local**: Executa diretamente nos runners do GitHub sem precisar que seu computador esteja ligado.

### Configuração dos Secrets no GitHub:
1. Acesse o repositório no GitHub: `Settings` > `Secrets and variables` > `Actions`.
2. Em **Repository secrets**, adicione:
   - `SUPABASE_URL`: URL do seu projeto Supabase (ex: `https://xvvhrjptomwadkmpnjrg.supabase.co`).
   - `SUPABASE_ANON_KEY`: Sua chave pública (`anon` / `publishable`) do Supabase.
