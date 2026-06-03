import { CostHistoryChart } from '@/components/CostHistoryChart';
import { StatCard } from '@/components/StatCard';
import { UsageHistoryChart } from '@/components/UsageHistoryChart';
import { serverGet } from '@/lib/api';
import { formatPercent, formatUsd } from '@/lib/format';
import type { ClusterOverview, HistoryPoint } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [overview, history] = await Promise.all([
    serverGet<ClusterOverview>('/api/v1/cluster/overview'),
    serverGet<HistoryPoint[]>('/api/v1/metrics/history?range=24h'),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">Overview</h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total Nodes" value={String(overview.totalNodes)} />
        <StatCard label="Total Pods" value={String(overview.totalPods)} />
        <StatCard label="Cluster CPU" value={formatPercent(overview.cpuUsagePercent)} />
        <StatCard label="Cluster Memory" value={formatPercent(overview.memoryUsagePercent)} />
        <StatCard label="Est. Monthly Cost" value={formatUsd(overview.estimatedMonthlyCostUsd)} />
      </div>

      <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
        <CostHistoryChart initial={history} />
        <UsageHistoryChart points={history} />
      </div>
    </div>
  );
}
