export function DarkTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d1b2a] border border-[#1e3045] rounded-lg px-3 py-2 text-xs shadow-2xl">
      <p className="text-[#4a6a80] mb-1.5 font-medium">{label}</p>
      {payload.map((p) => (
        <p
          key={p.dataKey}
          style={{ color: p.color ?? p.stroke }}
          className="font-semibold"
        >
          {p.name.charAt(0).toUpperCase() + p.name.slice(1)}: $
          {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}
