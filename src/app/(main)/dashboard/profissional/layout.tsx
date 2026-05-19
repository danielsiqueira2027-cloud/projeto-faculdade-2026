// Server Component — proteção de rota server-side + layout do dashboard pro
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import ProDashboardNav from '@/components/profissional/ProDashboardNav';

export default async function ProfessionalDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Sem sessão → login
  if (!user) redirect('/login');

  // Tem conta, mas não ativou o perfil profissional → ativar
  if (!user.hasProfessional) redirect('/seja-profissional/ativar');

  return (
    <div className="min-h-screen bg-[#f8f6c9]/20">
      <ProDashboardNav userName={user.name} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
