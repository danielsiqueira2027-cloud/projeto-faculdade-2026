interface StatusBadgeProps {
  status: string;
}

const statusDisplayMap: Record<string, string> = {
  PENDENTE: "Pendente",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDO: "Concluído",
  CANCELADO: "Cancelado",
  DISPUTA: "Em Disputa",
  ativo: "Ativo",
  inativo: "Inativo",
};

function getStatusStyles(status: string) {
  switch (status) {
    case "Ativo":
    case "Concluído":
    case "CONCLUIDO":
    case "Pago":
      return "bg-green-100 text-green-700 border-green-200";
    case "Suspenso":
    case "Inativo":
    case "Em Disputa":
    case "DISPUTA":
    case "Estornado":
    case "Cancelado":
    case "CANCELADO":
      return "bg-red-100 text-red-700 border-red-200";
    case "Em andamento":
    case "EM_ANDAMENTO":
    case "Pendente":
    case "PENDENTE":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Em aberto":
      return "bg-slate-100 text-slate-700 border-slate-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = getStatusStyles(status);
  const label = statusDisplayMap[status] || status;

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles}`}>
      {label}
    </span>
  );
}
