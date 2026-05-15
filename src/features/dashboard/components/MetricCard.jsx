export default function MetricCard({ title, value, change }) {
  const positive = change.includes("+");

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-6">
      <p className="text-sm text-slate-400">{title}</p>

      <h2 className="text-2xl text-white font-bold mt-2">{value}</h2>

      <p
        className={`text-sm mt-2 ${
          positive ? "text-green-400" : "text-red-400"
        }`}
      >
        {change} vs last month
      </p>
    </div>
  );
}
