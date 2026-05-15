export default function MetricCard({ title, value, change }) {
  const positive = change.includes("+");

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-4 sm:p-6">
      <p className="text-xs sm:text-sm text-slate-400 truncate">{title}</p>
      <h2 className="text-xl sm:text-2xl text-white font-bold mt-1.5 sm:mt-2">
        {value}
      </h2>
      <p
        className={`text-xs sm:text-sm mt-1.5 sm:mt-2 ${positive ? "text-green-400" : "text-red-400"}`}
      >
        {change} <span className="text-slate-500">vs last month</span>
      </p>
    </div>
  );
}
