import { ElementType } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ElementType;
  color: "green" | "blue" | "purple" | "red" | "amber" | "slate";
  subtitle?: string;
}

const colorStyles = {
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  red: "bg-red-100 text-red-600",
  amber: "bg-amber-100 text-amber-600",
  slate: "bg-slate-100 text-slate-600",
};

export function MetricCard({ title, value, icon: Icon, color, subtitle }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-between">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${colorStyles[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        </div>
      </div>
      {subtitle && (
        <p className="mt-3 text-xs text-slate-400 font-medium border-t border-slate-50 pt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}
