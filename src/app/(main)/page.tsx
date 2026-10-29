import { getCurrentUser } from '@/lib/auth';
import { Carousel } from '@/components/home/Carousel';
import { CategoriasGrid } from '@/components/home/CategoriasGrid';
import { ComoFunciona } from '@/components/home/ComoFunciona';
import { ProfissionaisDestaque } from '@/components/home/ProfissionaisDestaque';
import { FeaturedServicesCarousel } from '@/components/FeaturedServicesCarousel';
import { ProntoSection } from '@/components/home/ProntoSection';
import { AvaliacaoClientes } from '@/components/home/AvaliacaoClientes';
import { SecaoProfissional } from '@/components/home/SecaoProfissional';
import { getFeaturedServices } from '@/app/actions/services';

import { prisma } from '@/lib/database';

export default async function Home() {
  const [user, dbCategories, featuredServices] = await Promise.all([
    getCurrentUser(),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      select: { name: true, slug: true },
    }),
    getFeaturedServices(12),
  ]);
  const proStatus = user?.professionalStatus ?? 'none';
  const homeCategories = dbCategories.map((c) => ({
    nome: c.name.charAt(0).toUpperCase() + c.name.slice(1).toLowerCase(),
    slug: c.slug,
  }));

  return (
    <>
      {/* 1. Banner rotativo */}
      <Carousel />

      {/* Gradiente de transição para o fundo cinza */}
      <div style={{ height: 80, background: 'linear-gradient(to bottom, #fddfa2 0%, #ebebeb 100%)' }} />

      {/* 2. Categorias com subcategorias expandíveis */}
      <CategoriasGrid initialCategories={homeCategories} />

      {/* 3. Como funciona — passo a passo */}
      <ComoFunciona />

      {/* 4. Profissionais em destaque */}
      <ProfissionaisDestaque />

      {/* 5. Serviços em destaque */}
      <FeaturedServicesCarousel services={featuredServices} />

      {/* 6. CTA — encontre um profissional */}
      <ProntoSection />

      {/* 7. Depoimentos de clientes */}
      <AvaliacaoClientes />

      {/* 8. Seção para profissionais se cadastrarem */}
      <SecaoProfissional professionalStatus={proStatus} />
    </>
  );
}
