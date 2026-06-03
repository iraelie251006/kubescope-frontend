import { serverGet } from '@/lib/api';
import { formatBytes, formatMillicores, formatUsd } from '@/lib/format';
import type { DeploymentRow } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function DeploymentsPage() {
  const rows = await serverGet<DeploymentRow[]>('/api/v1/cluster/deployments');

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">Deployments</h1>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Namespace</th>
              <th className="text-right px-4 py-3">Replicas</th>
              <th className="text-right px-4 py-3">CPU request</th>
              <th className="text-right px-4 py-3">Memory request</th>
              <th className="text-right px-4 py-3">Est. monthly</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No deployments found.
                </td>
              </tr>
            ) : (
              rows.map((d) => (
                <tr key={`${d.namespace}/${d.name}`}>
                  <td className="px-4 py-3 font-medium text-slate-900">{d.name}</td>
                  <td className="px-4 py-3 text-slate-700">{d.namespace}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{d.replicas}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatMillicores(d.cpuRequestMillicores)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatBytes(d.memoryRequestBytes)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatUsd(d.estimatedMonthlyCostUsd)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
