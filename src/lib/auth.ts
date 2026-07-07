import 'server-only';
import { prisma } from '@/lib/database';
import { getSessionPayload } from '@/lib/session';

// Tipo retornado com os perfis incluídos
export type SessionUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  hasClient: boolean;
  hasProfessional: boolean;
};

/**
 * Lê o cookie de sessão, valida o JWT e busca o usuário no banco
 * com seus perfis (client + professional).
 * Retorna null se não autenticado ou se o usuário não existir.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const payload = await getSessionPayload();
  if (!payload?.userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatarUrl: true,
        client: { select: { id: true } },
        professional: { select: { id: true } },
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      hasClient: !!user.client,
      hasProfessional: !!user.professional,
    };
  } catch {
    return null;
  }
}
