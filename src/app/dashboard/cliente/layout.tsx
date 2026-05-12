'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function ClienteDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn || userRole !== 'cliente') {
      router.push('/login');
      return;
    }
    
    setLoading(false);
  }, [router]);

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {children}
    </div>
  );
}
