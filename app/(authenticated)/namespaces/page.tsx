import { NamespaceCostPie } from '@/components/NamespaceCostPie';
import { serverGet } from '@/lib/api';
import { formatBytes, formatMillicores, formatUsd } from '@/lib/format';
import type { NamespaceRow } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function NamespacesPage() {
  const rows = await serverGet<NamespaceRow[]>('/api/v1/cluster/namespaces');

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">Namespaces</h1>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="text-left px-4 py-3">Namespace</th>
                <th className="text-right px-4 py-3">Pods</th>
                <th className="text-right px-4 py-3">CPU usage</th>
                <th className="text-right px-4 py-3">Memory usage</th>
                <th className="text-right px-4 py-3">Est. monthly</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                    No namespace data yet.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.namespace}>
                    <td className="px-4 py-3 font-medium text-slate-900">{r.namespace}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{r.podCount}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{formatMillicores(r.cpuUsageMillicores)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{formatBytes(r.memoryUsageBytes)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{formatUsd(r.estimatedMonthlyCostUsd)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <NamespaceCostPie rows={rows} />
      </div>
    </div>
  );
}
