import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: 'A nova senha é obrigatória' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'A senha deve ter pelo menos 6 caracteres' }, { status: 400 });
    }

    const supabase = await createServerClient();
    const { error } = await supabase.auth.updateUser({
      password: password.trim(),
    });

    if (error) {
      console.error('[ResetPassword Supabase Error]', error.message);
      return NextResponse.json(
        { error: error.message || 'Não foi possível redefinir a senha.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[ResetPassword API] Erro interno:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro interno. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
