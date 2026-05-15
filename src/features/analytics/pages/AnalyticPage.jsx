import { useMemo, useState } from "react";
import {
  breakdown,
  DATE_RANGES,
  metricsData,
  monthData,
} from "../data/analytics";
import { MetricsCard } from "../components/metricsCard";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DarkTooltip } from "../components/DTooltip";

export default function AnalyticPage() {
  const [range, setRange] = useState("12M");

  const data = useMemo(() => {
    const r = DATE_RANGES.find((d) => d.label === range);
    return monthData.slice(-r.slice);
  }, [range]);

  const fmtY = (v) => `$${v / 1000}k`;
  const tickStyle = { fill: "#4a6a80", fontSize: 11 };
  const gridProps = { strokeDasharray: "3 3", stroke: "#1a2d40" };

  return (
    <div className="bg-[#070e1a] min-h-screen p-5 font-sans flex flex-col gap-4">
      <div className="flex gap-2">
        {DATE_RANGES.map(({ label }) => (
          <button
            key={label}
            onClick={() => setRange(label)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150
              ${
                range === label
                  ? "bg-[#00d4ff18] border-[#00d4ff60] text-[#00d4ff]"
                  : "bg-transparent border-[#1e3045] text-[#4a6a80] hover:text-white hover:border-[#2a4a60]"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricsData.map((k) => (
          <MetricsCard key={k.label} {...k} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Revenue vs Expenses */}
        <div className="bg-[#0d1b2a] border border-[#1e3045] rounded-xl p-5">
          <p className="text-white font-bold text-base mb-0.5">
            Revenue vs Expenses
          </p>
          <p className="text-[#4a6a80] text-xs mb-5">Filtered period</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={data}
              margin={{ top: 0, right: 0, left: -14, bottom: 0 }}
              barCategoryGap="30%"
            >
              <CartesianGrid {...gridProps} vertical={false} />
              <XAxis
                dataKey="month"
                tick={tickStyle}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis
                tickFormatter={fmtY}
                tick={tickStyle}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<DarkTooltip />}
                cursor={{ fill: "#ffffff06" }}
              />
              <Bar
                dataKey="revenue"
                name="revenue"
                fill="#00d4ff"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="expenses"
                name="expenses"
                fill="#ff6b35"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profit Trend */}
        <div className="bg-[#0d1b2a] border border-[#1e3045] rounded-xl p-5">
          <p className="text-white font-bold text-base mb-0.5">Profit Trend</p>
          <p className="text-[#4a6a80] text-xs mb-5">Net margin over time</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={data}
              margin={{ top: 0, right: 8, left: -14, bottom: 0 }}
            >
              <CartesianGrid {...gridProps} />
              <XAxis
                dataKey="month"
                tick={tickStyle}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis
                tickFormatter={fmtY}
                tick={tickStyle}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<DarkTooltip />}
                cursor={{ stroke: "#2a4a60", strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                name="profit"
                stroke="#00e87a"
                strokeWidth={2.5}
                dot={{
                  r: 4,
                  fill: "#00e87a",
                  stroke: "#070e1a",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "#00e87a",
                  stroke: "#070e1a",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#0d1b2a] border border-[#1e3045] rounded-xl p-5">
        <p className="text-white font-bold text-base mb-5">
          Performance Breakdown
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-4">
          {breakdown.map(({ country, pct, color }) => (
            <div key={country} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[#4a6a80] text-xs">{country}</span>
                <span className="text-white text-xs font-bold">{pct}%</span>
              </div>
              <div className="h-1 rounded-full bg-[#1a2d40] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
