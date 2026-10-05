import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { validarRedirectSeguro } from '@/lib/validators';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const rawNext = searchParams.get('next');
  // Se rawNext for inválido (nulo, protocol-relative '//', URL externa), validarRedirectSeguro retorna null
  const next = validarRedirectSeguro(rawNext) ?? '/dashboard';

  if (code) {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const isLocalEnv = process.env.NODE_ENV === 'development';
      const forwardedHost = request.headers.get('x-forwarded-host');
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
    console.error('[Auth Callback Error]', error);
  }

  // Se houver erro ou código ausente, redireciona com mensagem de erro
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
