import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { LayoutGrid, User, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-zinc-950">
      <main className="flex w-full max-w-3xl flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-brand-text">
          Plataforma de Construção
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600">
          Encontre os melhores profissionais para sua obra ou reforma.
          Gerencie seus pedidos com eficiência e segurança.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/categorias">
            <Button size="lg" className="bg-brand-accent hover:bg-brand-accent-dark h-12 px-8 text-lg font-semibold transition-all shadow-md">
              <LayoutGrid className="mr-2 h-5 w-5" />
              Ver Categorias
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="h-12 px-8 text-lg font-semibold border-2">
            Ver Projetos
          </Button>
        </div>

        {/* Temporary buttons for navigation */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 pt-8 border-t border-zinc-200/50 w-full max-w-lg">
          <Link href="/perfil">
            <Button size="lg" variant="secondary" className="h-12 px-6 font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200">
              <User className="mr-2 h-4 w-4" />
              Ver Perfil (Temp)
            </Button>
          </Link>
          <Link href="/orcamento">
            <Button size="lg" variant="secondary" className="h-12 px-6 font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200">
              <FileText className="mr-2 h-4 w-4" />
              Ver Orçamento (Temp)
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
