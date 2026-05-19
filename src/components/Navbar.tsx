// Server Component — sem 'use client'
// Busca a sessão e passa os dados pro NavbarClient
import { getCurrentUser } from '@/lib/auth';
import NavbarClient from '@/components/NavbarClient';

export default async function Navbar() {
  const user = await getCurrentUser();
  return <NavbarClient user={user} />;
}
