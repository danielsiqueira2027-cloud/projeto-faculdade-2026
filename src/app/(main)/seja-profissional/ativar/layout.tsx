import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default async function AtivarProfissionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/cadastro/profissional?next=/seja-profissional/ativar');
  }

  return <>{children}</>;
}
