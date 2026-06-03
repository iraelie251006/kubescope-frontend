import { UsageBar } from '@/components/UsageBar';
import { serverGet } from '@/lib/api';
import { formatUsd } from '@/lib/format';
import type { NodeRow } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function NodesPage() {
  const nodes = await serverGet<NodeRow[]>('/api/v1/cluster/nodes');

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">Nodes</h1>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Instance type</th>
              <th className="text-left px-4 py-3">Region</th>
              <th className="text-left px-4 py-3 w-48">CPU</th>
              <th className="text-left px-4 py-3 w-48">Memory</th>
              <th className="text-right px-4 py-3">Hourly</th>
              <th className="text-right px-4 py-3">Monthly</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {nodes.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                  No nodes have been observed yet.
                </td>
              </tr>
            ) : (
              nodes.map((n) => (
                <tr key={n.name}>
                  <td className="px-4 py-3 font-medium text-slate-900">{n.name}</td>
                  <td className="px-4 py-3 text-slate-700">{n.instanceType ?? '—'}</td>
                  <td className="px-4 py-3 text-slate-700">{n.region ?? '—'}</td>
                  <td className="px-4 py-3">
                    <UsageBar used={n.cpuUsageMillicores} total={n.cpuCapacityMillicores} />
                  </td>
                  <td className="px-4 py-3">
                    <UsageBar used={n.memoryUsageBytes} total={n.memoryCapacityBytes} />
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatUsd(n.hourlyCostUsd, { fractionDigits: 4 })}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatUsd(n.monthlyCostUsd)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
