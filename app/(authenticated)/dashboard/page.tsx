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
    <div className="space-y-7">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-500 font-medium">
            Cluster
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink-900">
            Overview
          </h1>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-500">
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500">
            <span className="absolute inset-0 rounded-full bg-accent-500 animate-ping" />
          </span>
          live
        </span>
      </div>

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
