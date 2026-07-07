import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/database';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'E-mail é obrigatório' }, { status: 400 });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // We ALWAYS return a success message so we don't leak which emails exist in the database
    if (!user) {
      // Simulate small delay to prevent timing attacks
      await new Promise((resolve) => setTimeout(resolve, 500));
      return NextResponse.json({ success: true });
    }

    // Check if there's already a valid token recently created (prevent spam & token accumulation)
    const existingToken = await prisma.passwordResetToken.findFirst({
      where: {
        userId: user.id,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    // Reuse existing token if still valid — avoids accumulating multiple valid tokens
    const tokenToSend = existingToken?.token ?? (() => {
      // Will be generated below
      return null;
    })();

    let finalToken: string;

    if (tokenToSend) {
      finalToken = tokenToSend;
    } else {
      // Generate a secure random token
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour expiration

      // Create the reset token in the database
      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          token,
          expiresAt,
        },
      });

      finalToken = token;
    }

    // Send the email
    await sendPasswordResetEmail(user.email, finalToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[ForgotPassword API] Erro interno:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro interno. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
