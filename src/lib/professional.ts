export type ProfessionalStatus = 'none' | 'incomplete' | 'complete';

export interface UserWithProfessionalStatus {
  hasProfessional?: boolean;
  professionalStatus?: ProfessionalStatus;
}

/**
 * Retorna o status do perfil profissional do usuário:
 * - 'none': sem perfil profissional
 * - 'incomplete': possui registro em professionals, mas cadastro incompleto (falta CPF cifrado ou categoria)
 * - 'complete': possui CPF cifrado e ao menos 1 categoria associada
 */
export function getProfessionalStatus(
  user: UserWithProfessionalStatus | null | undefined
): ProfessionalStatus {
  if (!user) return 'none';
  if (user.professionalStatus) return user.professionalStatus;
  if (user.hasProfessional) return 'incomplete';
  return 'none';
}
