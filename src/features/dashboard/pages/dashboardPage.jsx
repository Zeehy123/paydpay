import MetricCard from "../components/MetricCard";
import RevenueChart from "../components/RevenueChart";
import TransactionChart from "../components/TransactionChart";
import WeeklyVolumeChart from "../components/WeeklyVolumeChart";

export default function DashboardPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ── Metrics ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <MetricCard title="Total Revenue" value="$1.28M" change="+18.4%" />
        <MetricCard title="Active Users" value="8,472" change="+12.1%" />
        <MetricCard title="Transactions" value="34,821" change="-3.2%" />
        <MetricCard title="Avg Response" value="142ms" change="-8.7%" />
      </div>

      {/* ── Charts Row ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="md:col-span-2 min-w-0">
          <RevenueChart />
        </div>
        <div className="w-full">
          <TransactionChart />
        </div>
      </div>

      {/* ── Weekly Chart ────────────────────────────────────────── */}
      <WeeklyVolumeChart />
    </div>
  );
}
