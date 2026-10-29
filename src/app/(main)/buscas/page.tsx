import { Suspense } from 'react';
import { getIbgeEstados } from '@/app/actions/ibge';
import { SearchResults } from './_SearchResults';

/**
 * Server Component da página de buscas.
 *
 * Por que buscar os estados aqui e não no cliente?
 * - A API do IBGE (servicodados.ibge.gov.br) está no Brasil; servidores da
 *   Vercel ficam nos EUA. Chamar a API a partir de um Server Action via
 *   useEffect do cliente criava um round-trip extra (browser → Vercel → IBGE)
 *   propenso a timeout, especialmente no plano Hobby.
 * - Buscando durante o SSR, o Next.js armazena a resposta no cache de fetch
 *   com revalidate de 24 h (configurado em ibge.ts) na edge da Vercel,
 *   de modo que requisições subsequentes não precisam contatar o IBGE.
 */
export default async function BuscaPage() {
  // Executado no servidor durante o SSR — beneficia do cache do Next.js
  const estadosIniciais = await getIbgeEstados();

  return (
    <Suspense
      fallback={
        <div className="busca-loading py-12 text-center text-slate-500 font-bold">
          Carregando profissionais...
        </div>
      }
    >
      <SearchResults estadosIniciais={estadosIniciais} />
    </Suspense>
  );
}
