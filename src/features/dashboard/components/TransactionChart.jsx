import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Transfers", value: 38, color: "#00d4ff" },
  { name: "Payments", value: 27, color: "#00e87a" },
  { name: "Withdrawals", value: 18, color: "#ff6b35" },
  { name: "Deposits", value: 17, color: "#a78bfa" },
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-[#0d1b2a] border border-[#1e3045] rounded-lg px-3 py-2 text-xs shadow-xl">
      <p style={{ color: d.payload.color }} className="font-semibold">
        {d.name}
      </p>
      <p className="text-white font-bold">{d.value}%</p>
    </div>
  );
}

export default function TransactionChart() {
  return (
    <div className="bg-[#0d1b2a] border border-[#1e3045] rounded-2xl p-4 sm:p-5 w-full">
      <h3 className="text-white font-semibold text-sm sm:text-base">
        Transaction Mix
      </h3>
      <p className="text-[#4a6a80] text-xs mt-0.5 mb-3">By category</p>

      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={3}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-col gap-2 mt-2">
        {data.map(({ name, value, color }) => (
          <div key={name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="text-[#b0c8d8] text-xs sm:text-sm">{name}</span>
            </div>
            <span className="text-white text-xs sm:text-sm font-bold">
              {value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
