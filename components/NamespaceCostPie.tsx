'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useMemo } from 'react';
import type { NamespaceRow } from '@/lib/types';

const PALETTE = ['#2563eb', '#059669', '#f59e0b', '#dc2626', '#7c3aed', '#0891b2', '#db2777', '#65a30d', '#ea580c', '#475569'];

export function NamespaceCostPie({ rows }: { rows: NamespaceRow[] }) {
  const data = useMemo(
    () =>
      rows
        .filter((r) => (r.estimatedMonthlyCostUsd ?? 0) > 0)
        .map((r) => ({ name: r.namespace, value: Number(r.estimatedMonthlyCostUsd) })),
    [rows],
  );

  if (data.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <h3 className="text-sm font-medium text-slate-900 mb-4">Cost by namespace</h3>
        <div className="h-72 flex items-center justify-center text-sm text-slate-400">No cost data yet</div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <h3 className="text-sm font-medium text-slate-900 mb-4">Cost by namespace</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
              {data.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => [`$${v.toFixed(2)}`, 'Monthly cost']} contentStyle={{ fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
