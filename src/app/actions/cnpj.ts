'use server';

import { getCurrentUser } from '@/lib/auth';
import { validarCNPJ } from '@/lib/validators';
import { normalizarDadosCnpj, type EnderecoCnpj } from '@/lib/cnpj';

export interface BuscarCnpjResult {
  success: boolean;
  data?: EnderecoCnpj;
  error?: string;
}

/**
 * Consulta endereço por CNPJ via BrasilAPI no servidor.
 * - Requer usuário autenticado
 * - Timeout de 5s, cache: 'no-store'
 * - Sem retry em loop
 * - Sem log do CNPJ ou de dados da resposta
 * - Retorna apenas campos de endereço normalizados
 */
export async function buscarCnpjAction(cnpj: string): Promise<BuscarCnpjResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: 'Não autorizado.' };
  }

  const digits = (cnpj || '').replace(/\D/g, '');

  if (digits.length !== 14 || !validarCNPJ(digits)) {
    return {
      success: false,
      error: 'CNPJ inválido.',
    };
  }

  try {
    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
      headers: {
        Accept: 'application/json',
        'User-Agent': 'ClickServico/1.0 (contato@clickservico.com.br)',
      },
    });

    if (!res.ok) {
      console.error('[buscarCnpjAction] Falha na consulta externa. Status HTTP:', res.status);
      if (res.status === 404) {
        return {
          success: false,
          error: 'CNPJ não encontrado na base de dados. Preencha o endereço manualmente.',
        };
      }
      if (res.status === 429) {
        return {
          success: false,
          error: 'Muitas consultas no momento. Tente novamente em instantes ou preencha o endereço manualmente.',
        };
      }
      return {
        success: false,
        error: 'Serviço de consulta indisponível no momento. Preencha o endereço manualmente.',
      };
    }

    const rawData = await res.json();
    const data = normalizarDadosCnpj(rawData);

    return {
      success: true,
      data,
    };
  } catch (err: unknown) {
    const isTimeout =
      err instanceof Error && (err.name === 'TimeoutError' || err.name === 'AbortError');
    console.error(
      '[buscarCnpjAction] Erro de rede/timeout:',
      err instanceof Error ? err.name : 'UnknownError'
    );
    return {
      success: false,
      error: isTimeout
        ? 'A consulta demorou demais. Tente novamente ou preencha o endereço manualmente.'
        : 'Serviço de consulta indisponível no momento. Preencha o endereço manualmente.',
    };
  }
}
