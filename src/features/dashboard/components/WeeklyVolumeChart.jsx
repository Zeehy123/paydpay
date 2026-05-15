import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", value: 2000 },
  { day: "Tue", value: 3200 },
  { day: "Wed", value: 2900 },
  { day: "Thu", value: 4100 },
  { day: "Fri", value: 4800 },
  { day: "Sat", value: 3900 },
  { day: "Sun", value: 2100 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d1b2a] border border-[#1e3045] rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-[#4a6a80] mb-1">{label}</p>
      <p className="text-[#00d4ff] font-bold">
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export default function WeeklyVolumeChart() {
  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-4 sm:p-6">
      <h3 className="text-white font-semibold text-sm sm:text-base mb-4">
        Weekly Transaction Volume
      </h3>
      <div className="h-48 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              stroke="#64748B"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#64748B"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "#ffffff06" }}
            />
            <Bar dataKey="value" fill="#06B6D4" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
