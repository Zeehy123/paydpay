import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
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

const formatYAxis = (value) => `$${value / 1000}k`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#0d1b2a",
          border: "1px solid #1e3045",
          borderRadius: 8,
          padding: "10px 14px",
        }}
      >
        <p style={{ color: "#7a9ab0", fontSize: 12, marginBottom: 6 }}>
          {label}
        </p>
        {payload.map((p) => (
          <p
            key={p.dataKey}
            style={{
              color: p.stroke,
              fontSize: 13,
              fontWeight: 600,
              margin: "2px 0",
            }}
          >
            {p.name.charAt(0).toUpperCase() + p.name.slice(1)}: $
            {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = () => (
  <div
    style={{
      display: "flex",
      gap: 20,
      justifyContent: "flex-end",
      marginBottom: 8,
    }}
  >
    {[
      { color: "#00d4ff", label: "Revenue" },
      { color: "#00e87a", label: "Profit" },
    ].map(({ color, label }) => (
      <div
        key={label}
        style={{ display: "flex", alignItems: "center", gap: 6 }}
      >
        <div
          style={{ width: 24, height: 2, background: color, borderRadius: 1 }}
        />
        <span style={{ color: "#7a9ab0", fontSize: 12 }}>{label}</span>
      </div>
    ))}
  </div>
);

export default function RevenueOverview() {
  return (
    <div
      style={{
        background: "#0a1520",
        border: "1px solid #1a2d40",
        borderRadius: 14,
        padding: "20px 24px 12px",
        width: "100%",
        maxWidth: 680,
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 4,
        }}
      >
        <div>
          <h2
            style={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 16,
              margin: 0,
            }}
          >
            Revenue Overview
          </h2>
          <p style={{ color: "#4a6a80", fontSize: 12, margin: "3px 0 0" }}>
            2024 Full Year
          </p>
        </div>
        <CustomLegend />
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 4, left: -4, bottom: 0 }}
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

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1a2d40"
            vertical={true}
          />

          <XAxis
            dataKey="month"
            tick={{ fill: "#4a6a80", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />

          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fill: "#4a6a80", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickMargin={6}
            domain={[20000, 160000]}
            ticks={[40000, 60000, 80000, 100000, 120000, 140000, 160000]}
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
