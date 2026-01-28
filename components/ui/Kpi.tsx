import { ArrowUp, ArrowDown } from "lucide-react";

interface KpiProps {
  title: string;
  value: number;
  previousValue: number;
  isPercent?: boolean;
}

export const Kpi = ({title, value, previousValue, isPercent = false} : KpiProps ) => {
    const isPositive = value >= previousValue;
    const color = isPositive ? 'text-green-500' : 'text-red-500';
    const Icon = isPositive ? ArrowUp : ArrowDown; 


return (
  <div className="rounded-lg bg-slate-800/50 px-4 py-3 shadow-sm border border-slate-700">
    <div className="text-xs text-slate-300">{title}</div>

    <div className="mt-1 flex items-center gap-3">
      <span className="text-lg font-bold text-slate-100">{isPercent ? `${Number(value).toFixed(1)}%` : Number(value).toFixed(2)}</span>

      <span className={`flex items-center text-sm ${color}`}>
        <Icon className="h-4 w-4" />
        <span className="ml-1">{isPercent ? `${Math.abs(Number(value - previousValue)).toFixed(1)}%` : Math.abs(Number(value - previousValue)).toFixed(2)}</span>
      </span>
    </div>
  </div>
);
};
