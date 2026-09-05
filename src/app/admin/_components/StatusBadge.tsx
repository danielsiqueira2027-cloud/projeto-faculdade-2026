interface StatusBadgeProps {
  status: string;
}

function getStatusStyles(status: string) {
  switch (status) {
    case "Ativo":
    case "Concluído":
    case "Pago":
      return "bg-green-100 text-green-700 border-green-200";
    case "Suspenso":
    case "Em Disputa":
    case "Estornado":
      return "bg-red-100 text-red-700 border-red-200";
    case "Em andamento":
    case "Pendente":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Em aberto":
      return "bg-slate-100 text-slate-700 border-slate-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = getStatusStyles(status);
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles}`}>
      {status}
    </span>
  );
}
