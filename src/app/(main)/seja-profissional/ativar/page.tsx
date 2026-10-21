import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { mascararTelefone } from '@/lib/validators';
import { prisma } from '@/lib/database';
import AtivarPerfilProForm from './AtivarPerfilProForm';

export default async function AtivarPerfilProPage() {
  const [user, dbCategories] = await Promise.all([
    getCurrentUser(),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      select: { slug: true, name: true, icon: true },
    }),
  ]);
  const initialPhone = user?.phone ? mascararTelefone(user.phone) : '';

  const categories = dbCategories.map((c) => ({
    id: c.slug,
    label: c.name.charAt(0).toUpperCase() + c.name.slice(1).toLowerCase(),
    iconName: c.icon,
  }));

  return <AtivarPerfilProForm initialPhone={initialPhone} categories={categories} />;
}
