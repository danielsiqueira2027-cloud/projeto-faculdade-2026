import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';

const MOCK_SERVICOS = [
  { id: 1, nome: 'Pintura Residencial', categoria: 'Pintura', preco: 'A partir de R$ 25/m²', status: 'Ativo' },
  { id: 2, nome: 'Texturização de Paredes', categoria: 'Pintura', preco: 'A partir de R$ 40/m²', status: 'Ativo' },
  { id: 3, nome: 'Verniz em Madeiras', categoria: 'Pintura', preco: 'Sob orçamento', status: 'Inativo' },
];

export default function MeusServicosPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-bp-primary">Meus Serviços</h2>
          <p className="text-bp-primary/60">Gerencie seu catálogo de serviços e preços.</p>
        </div>
        <Button className="bg-bp-secondary text-white rounded-xl shadow-lg hover:bg-bp-secondary/90">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Serviço
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_SERVICOS.map((servico) => (
          <Card key={servico.id} className="border-bp-outline-variant hover:border-bp-primary transition-all group">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${servico.status === 'Ativo' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-bp-primary text-lg">{servico.nome}</h4>
                  <p className="text-sm text-bp-primary/60">{servico.categoria} • <span className="font-semibold text-bp-secondary">{servico.preco}</span></p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-bp-primary hover:bg-bp-primary/5">
                  <Edit2 size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/5">
                  <Trash2 size={18} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed border-2 border-bp-outline-variant bg-bp-surface/20">
        <CardContent className="p-12 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-bp-primary/5 flex items-center justify-center text-bp-primary/30">
            <Plus size={32} />
          </div>
          <div>
            <h4 className="font-bold text-bp-primary">Expandir seu Negócio?</h4>
            <p className="text-sm text-bp-primary/60 max-w-xs">Adicione novos serviços para alcançar mais clientes na sua região.</p>
          </div>
          <Button variant="outline" className="rounded-xl border-bp-primary text-bp-primary">
            Configurar Novas Categorias
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
