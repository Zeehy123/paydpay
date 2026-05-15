import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 42000, profit: 30000 },
  { month: "Feb", revenue: 58000, profit: 36000 },
  { month: "Mar", revenue: 64000, profit: 40000 },
  { month: "Apr", revenue: 72000, profit: 44000 },
  { month: "May", revenue: 78000, profit: 46000 },
  { month: "Jun", revenue: 85000, profit: 50000 },
  { month: "Jul", revenue: 88000, profit: 52000 },
  { month: "Aug", revenue: 86000, profit: 51000 },
  { month: "Sep", revenue: 94000, profit: 58000 },
  { month: "Oct", revenue: 108000, profit: 66000 },
  { month: "Nov", revenue: 124000, profit: 74000 },
  { month: "Dec", revenue: 148000, profit: 85000 },
];

const formatYAxis = (v) => `$${v / 1000}k`;

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d1b2a] border border-[#1e3045] rounded-lg px-3 py-2.5 text-xs shadow-xl">
      <p className="text-[#7a9ab0] mb-1.5">{label}</p>
      {payload.map((p) => (
        <p
          key={p.dataKey}
          style={{ color: p.stroke }}
          className="font-semibold"
        >
          {p.name.charAt(0).toUpperCase() + p.name.slice(1)}: $
          {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-4">
      {[
        { color: "#00d4ff", label: "Revenue" },
        { color: "#00e87a", label: "Profit" },
      ].map(({ color, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <div className="w-5 h-0.5 rounded" style={{ background: color }} />
          <span className="text-[#7a9ab0] text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function RevenueChart() {
  return (
    <div className="bg-[#0a1520] border border-[#1a2d40] rounded-2xl p-4 sm:p-5 w-full">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <h2 className="text-white font-bold text-sm sm:text-base">
            Revenue Overview
          </h2>
          <p className="text-[#4a6a80] text-xs mt-0.5">2024 Full Year</p>
        </div>
        <Legend />
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 4, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e87a" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#00e87a" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2d40" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#4a6a80", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickMargin={8}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fill: "#4a6a80", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            domain={[20000, 160000]}
            ticks={[40000, 80000, 120000, 160000]}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#2a4060", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#00d4ff"
            strokeWidth={2}
            fill="url(#gradRevenue)"
            dot={false}
            activeDot={{
              r: 4,
              fill: "#00d4ff",
              stroke: "#0a1520",
              strokeWidth: 2,
            }}
          />
          <Area
            type="monotone"
            dataKey="profit"
            stroke="#00e87a"
            strokeWidth={2}
            fill="url(#gradProfit)"
            dot={false}
            activeDot={{
              r: 4,
              fill: "#00e87a",
              stroke: "#0a1520",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
