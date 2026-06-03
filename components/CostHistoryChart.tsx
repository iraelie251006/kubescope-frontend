'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useEffect, useMemo, useState } from 'react';
import type { HistoryPoint, HistoryRange } from '@/lib/types';

const RANGES: HistoryRange[] = ['24h', '7d', '30d'];

export function CostHistoryChart({ initial }: { initial: HistoryPoint[] }) {
  const [range, setRange] = useState<HistoryRange>('24h');
  const [points, setPoints] = useState<HistoryPoint[]>(initial);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (range === '24h') return;
    let cancelled = false;
    setLoading(true);
    fetch(`/api/proxy/metrics/history?range=${range}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`${r.status}`))))
      .then((data: HistoryPoint[]) => {
        if (!cancelled) setPoints(data);
      })
      .catch(() => {
        if (!cancelled) setPoints([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [range]);

  const data = useMemo(
    () =>
      [...points]
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .map((p) => ({
          ts: new Date(p.timestamp).toLocaleString(),
          monthly: Number(p.totalMonthlyCostUsd),
        })),
    [points],
  );

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-900">Estimated cost over time</h3>
        <div className="flex gap-1">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={
                'text-xs px-2 py-1 rounded ' +
                (r === range
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200')
              }
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="h-72">
        {loading ? (
          <div className="h-full flex items-center justify-center text-sm text-slate-400">Loading…</div>
        ) : data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-slate-400">No data yet</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="ts" tick={{ fontSize: 11 }} minTickGap={32} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => `$${Math.round(Number(v))}`}
              />
              <Tooltip
                formatter={(v: number) => [`$${v.toFixed(2)}`, 'Monthly cost']}
                contentStyle={{ fontSize: 12 }}
              />
              <Line type="monotone" dataKey="monthly" stroke="#0f172a" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
