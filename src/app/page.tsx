import { Carousel } from '@/components/home/Carousel';
import { CategoriasGrid } from '@/components/home/CategoriasGrid';
import { ComoFunciona } from '@/components/home/ComoFunciona';
import { ProfissionaisDestaque } from '@/components/home/ProfissionaisDestaque';
import { ProntoSection } from '@/components/home/ProntoSection';
import { AvaliacaoClientes } from '@/components/home/AvaliacaoClientes';
import { SecaoProfissional } from '@/components/home/SecaoProfissional';

export default function Home() {
  return (
    <>
      {/* 1. Banner rotativo */}
      <Carousel />

      {/* Gradiente de transição para o fundo cinza */}
      <div style={{ height: 80, background: 'linear-gradient(to bottom, #fddfa2 0%, #ebebeb 100%)' }} />

      {/* 2. Categorias com subcategorias expandíveis */}
      <CategoriasGrid />

      {/* 3. Como funciona — passo a passo */}
      <ComoFunciona />

      {/* 4. Profissionais em destaque */}
      <ProfissionaisDestaque />

      {/* 5. CTA — encontre um profissional */}
      <ProntoSection />

      {/* 6. Depoimentos de clientes */}
      <AvaliacaoClientes />

      {/* 7. Seção para profissionais se cadastrarem */}
      <SecaoProfissional />
    </>
  );
}
