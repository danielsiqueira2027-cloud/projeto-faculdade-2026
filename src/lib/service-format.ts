/**
 * Utilitários compartilhados para formatação e validação de serviços.
 */

/**
 * Verifica se a URL da imagem pertence a um dos domínios remotos permitidos
 * no next.config.ts ou se é um caminho relativo local.
 */
export function isNextImageAllowed(url: string): boolean {
  try {
    if (url.startsWith('/')) return true;
    const parsed = new URL(url);
    const host = parsed.hostname;
    return (
      host === 'images.unsplash.com' ||
      host === 'lh3.googleusercontent.com' ||
      host === 'picsum.photos' ||
      host === 'fastly.picsum.photos' ||
      host.endsWith('.supabase.co')
    );
  } catch {
    return false;
  }
}

/**
 * Formata o valor de um serviço:
 * - Se houver `priceText` preenchido (ex.: "A partir de R$ 25/m²"), retorna o texto.
 * - Se houver `priceValue` numérico, formata como moeda BRL (ex.: "R$ 500,00").
 * - Caso contrário, retorna o fallback "A combinar".
 */
export function formatPrice(priceText?: string | null, priceValue?: number | null): string {
  if (priceText && priceText.trim()) {
    return priceText.trim();
  }
  if (priceValue !== null && priceValue !== undefined && !isNaN(priceValue)) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(priceValue);
  }
  return 'A combinar';
}

