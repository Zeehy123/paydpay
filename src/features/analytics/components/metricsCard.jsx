import { ArrowDown, ArrowUp } from "lucide-react";

export function MetricsCard({ label, value, change, positive }) {
  return (
    <div className="bg-[#0d1b2a] border border-[#1e3045] rounded-xl p-5 flex flex-col gap-2.5">
      <p className="text-[#4a6a80] text-[9px] font-bold tracking-[0.15em] uppercase">
        {label}
      </p>
      <p className="text-white text-3xl font-black tracking-tight leading-none">
        {value}
      </p>
      <div className="flex items-center gap-1">
        {positive ? (
          <ArrowUp size={11} className="text-[#00e87a]" />
        ) : (
          <ArrowDown size={11} className="text-[#ff6b6b]" />
        )}
        <span
          className={`text-xs font-bold ${positive ? "text-[#00e87a]" : "text-[#ff6b6b]"}`}
        >
          {change}%
        </span>
      </div>
    </div>
  );
}
