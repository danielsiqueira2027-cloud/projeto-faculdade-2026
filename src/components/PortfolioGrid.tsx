import Image from 'next/image';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  year: number;
}

interface PortfolioGridProps {
  items: PortfolioItem[];
}

export function PortfolioGrid({ items }: PortfolioGridProps) {
  return (
    <section className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold font-manrope text-bp-primary">Portfólio de Projetos</h2>
          <p className="text-bp-on-surface/60 font-medium">Veja alguns dos trabalhos mais recentes realizados pelo profissional.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 rounded-xl bg-bp-primary text-white font-bold text-sm">Todos</button>
           <button className="px-4 py-2 rounded-xl bg-white border border-bp-outline-variant text-bp-on-surface/60 font-bold text-sm hover:border-bp-primary transition-colors">Residencial</button>
           <button className="px-4 py-2 rounded-xl bg-white border border-bp-outline-variant text-bp-on-surface/60 font-bold text-sm hover:border-bp-primary transition-colors">Comercial</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-bp-outline-variant mb-4">
              <Image 
                src={item.imageUrl} 
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-bp-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <span className="text-white/60 text-xs font-black uppercase tracking-widest mb-1">{item.year}</span>
                <h4 className="text-white font-bold text-xl">{item.title}</h4>
              </div>
            </div>
            <div className="flex justify-between items-center px-2">
              <h4 className="font-bold text-bp-on-surface group-hover:text-bp-primary transition-colors">{item.title}</h4>
              <span className="text-xs font-black uppercase tracking-widest text-bp-on-surface/40 bg-bp-surface-low px-3 py-1 rounded-full">{item.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
