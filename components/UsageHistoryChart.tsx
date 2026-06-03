'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useMemo } from 'react';
import type { HistoryPoint } from '@/lib/types';

export function UsageHistoryChart({ points }: { points: HistoryPoint[] }) {
  const data = useMemo(
    () =>
      [...points]
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .map((p) => {
          const cpuPct = p.totalCpuCapacityMillicores > 0
            ? (p.totalCpuUsageMillicores / p.totalCpuCapacityMillicores) * 100
            : 0;
          const memPct = p.totalMemoryCapacityBytes > 0
            ? (p.totalMemoryUsageBytes / p.totalMemoryCapacityBytes) * 100
            : 0;
          return {
            ts: new Date(p.timestamp).toLocaleString(),
            cpu: Number(cpuPct.toFixed(2)),
            memory: Number(memPct.toFixed(2)),
          };
        }),
    [points],
  );

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <h3 className="text-sm font-medium text-slate-900 mb-4">CPU and memory usage over time</h3>
      <div className="h-72">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-slate-400">No data yet</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="ts" tick={{ fontSize: 11 }} minTickGap={32} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v: number) => [`${v.toFixed(1)}%`]} contentStyle={{ fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="cpu" name="CPU %" stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="memory" name="Memory %" stroke="#059669" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
