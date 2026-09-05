---
name: supabase-keep-alive
description: Mantém o banco de dados Supabase do projeto ClickServiço ativo, prevenindo pausas automáticas por inatividade no tier gratuito (limite de 7 dias). Executa healthchecks leves via API REST e conexão direta PostgreSQL pooler.
---

# Supabase Keep-Alive Skill

Skill desenvolvida para garantir a continuidade operacional do banco de dados Supabase no projeto ClickServiço, prevenindo a suspensão automática por inatividade (regra de 7 dias do plano gratuito).

---

## O que esta Skill faz

1. **Ping na REST API**: Envia uma requisição `GET` com chave anônima/publishable para o endpoint de categorias (`/rest/v1/categories?select=id&limit=1`), registrando tráfego ativo de API no Supabase.
2. **Ping no PostgreSQL**: Executa uma query leve `SELECT 1` com timestamp (`NOW()`) no pooler direto do PostgreSQL (`aws-0-sa-east-1.pooler.supabase.com`), comprovando conectividade e mantendo o serviço de banco acordado.
3. **Não altera dados**: Nenhuma migration, alteração de schema, registro de tabela ou política RLS é modificada.

---

## Como executar manualmente

Quando quiser rodar o healthcheck/keep-alive, basta pedir na conversa:

> *"Roda a skill supabase-keep-alive"*  
> ou  
> *"Executa o keep-alive do supabase"*

O comando executado nos bastidores pelo agente (ou diretamente por você no terminal) é:

```bash
npx tsx scripts/keep-alive.ts
```

### Exemplo de saída esperada:
```text
============================================================
🔄 ClickServiço - Supabase Keep-Alive Healthcheck
⏰ Horário local: 2026-09-05T20:14:26.654Z
============================================================
✅ [Supabase REST API] SUCESSO (135ms)
   └─ Status 200 OK (endpoint /rest/v1/categories)
✅ [PostgreSQL Direct Pooler] SUCESSO (64ms)
   └─ SELECT 1 executado com sucesso (DB Time: Sat Sep 05 2026 17:14:26 GMT-0300)
============================================================
🎉 Atividade registrada no Supabase com sucesso! Projeto ativo.
```

---

## Automação Contínua via GitHub Actions

Para não depender de disparos manuais, o repositório conta com o workflow [`.github/workflows/supabase-keep-alive.yml`](file:///c:/Users/Daniel/plataforma-construcao/.github/workflows/supabase-keep-alive.yml):

### 1. Frequência de Execução
- **Cron Semanal**: Toda quarta-feira às 12:00 UTC (09:00 Horário de Brasília) — dispara antes de completar 7 dias de inatividade.
- **Disparo Manual**: Aba **Actions** no GitHub > **Supabase Keep-Alive** > **Run workflow**.

### 2. Configuração necessária no GitHub (Secrets)
No seu repositório no GitHub:
1. Vá em **Settings** > **Secrets and variables** > **Actions**.
2. Em **Repository secrets**, clique em **New repository secret**.
3. Adicione os dois segredos a partir do seu `.env`:
   - `SUPABASE_URL`: `https://xvvhrjptomwadkmpnjrg.supabase.co`
   - `SUPABASE_ANON_KEY`: `<sua_chave_anon_ou_publishable>`
