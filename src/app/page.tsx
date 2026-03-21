import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6 text-zinc-950">
      <main className="flex w-full max-w-3xl flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Plataforma de Construção
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600">
          Seja bem-vindo à sua nova plataforma. Comece agora a gerenciar suas obras de forma eficiente.
        </p>
        <div className="mt-10 flex gap-4">
          <Button variant="default">Acessar Plataforma</Button>
          <Button variant="outline">Ver Projetos</Button>
        </div>
      </main>
    </div>
  );
}
