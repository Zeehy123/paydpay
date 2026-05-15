import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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

export default function WeeklyVolumeChart() {
  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 h-[320px]">
      <h3 className="mb-4 font-semibold">Weekly Transaction Volume</h3>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="day" stroke="#64748B" />
          <YAxis stroke="#64748B" />
          <Tooltip />
          <Bar dataKey="value" fill="#06B6D4" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
