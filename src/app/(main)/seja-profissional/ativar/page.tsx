import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { mascararTelefone } from '@/lib/validators';
import AtivarPerfilProForm from './AtivarPerfilProForm';

export default async function AtivarPerfilProPage() {
  const user = await getCurrentUser();
  const initialPhone = user?.phone ? mascararTelefone(user.phone) : '';

  return <AtivarPerfilProForm initialPhone={initialPhone} />;
}
