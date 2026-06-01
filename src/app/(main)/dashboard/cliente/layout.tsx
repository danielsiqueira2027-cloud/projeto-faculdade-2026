import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default async function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect('/login');

  return (
    <div className="min-h-screen bg-[#fefccf]/20">
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
