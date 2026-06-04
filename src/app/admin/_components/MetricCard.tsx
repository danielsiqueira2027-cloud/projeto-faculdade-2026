import { ElementType } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ElementType;
  color: "green" | "blue" | "purple" | "red";
}

const colorStyles = {
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  red: "bg-red-100 text-red-600",
};

export function MetricCard({ title, value, icon: Icon, color }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center space-x-4">
      <div className={`p-3 rounded-lg ${colorStyles[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
    </div>
  );
}
