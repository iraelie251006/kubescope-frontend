'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { AlertCondition, AlertRuleRow, MetricType } from '@/lib/types';

const METRICS: { value: MetricType; label: string; unit: string }[] = [
  { value: 'MONTHLY_COST', label: 'Monthly cost', unit: 'USD' },
  { value: 'CPU_USAGE_PERCENT', label: 'CPU usage', unit: '%' },
  { value: 'MEMORY_USAGE_PERCENT', label: 'Memory usage', unit: '%' },
];

const CONDITIONS: { value: AlertCondition; label: string }[] = [
  { value: 'GREATER_THAN', label: '>' },
];

export function AlertsClient({ initial }: { initial: AlertRuleRow[] }) {
  const router = useRouter();
  const [rows, setRows] = useState<AlertRuleRow[]>(initial);
  const [metricType, setMetricType] = useState<MetricType>('MONTHLY_COST');
  const [condition] = useState<AlertCondition>('GREATER_THAN');
  const [threshold, setThreshold] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onCreate(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const numeric = Number(threshold);
    if (!Number.isFinite(numeric) || numeric < 0) {
      setError('Threshold must be a non-negative number');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/proxy/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metricType,
          condition,
          thresholdValue: numeric,
          notificationEmail: email,
        }),
      });
      if (!res.ok) {
        setError('Could not create alert');
        return;
      }
      const created = (await res.json()) as AlertRuleRow;
      setRows((prev) => [...prev, created]);
      setThreshold('');
      setEmail('');
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  async function onDelete(id: string) {
    const res = await fetch(`/api/proxy/alerts/${id}`, { method: 'DELETE' });
    if (res.ok || res.status === 204) {
      setRows((prev) => prev.filter((r) => r.id !== id));
      router.refresh();
    }
  }

  const unit = METRICS.find((m) => m.value === metricType)?.unit ?? '';

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="text-left px-4 py-3">Metric</th>
              <th className="text-left px-4 py-3">Condition</th>
              <th className="text-right px-4 py-3">Threshold</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Last fired</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No alerts configured yet.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 text-slate-900">{labelFor(r.metricType)}</td>
                  <td className="px-4 py-3 text-slate-700">{'>'}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{r.thresholdValue}</td>
                  <td className="px-4 py-3 text-slate-700">{r.notificationEmail}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {r.lastFiredAt ? new Date(r.lastFiredAt).toLocaleString() : '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onDelete(r.id)}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <form onSubmit={onCreate} className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
        <h3 className="text-sm font-medium text-slate-900">New alert</h3>

        <label className="block">
          <span className="text-xs text-slate-600">Metric</span>
          <select
            value={metricType}
            onChange={(e) => setMetricType(e.target.value as MetricType)}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            {METRICS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs text-slate-600">Condition</span>
          <select
            value={condition}
            disabled
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-slate-50"
          >
            {CONDITIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs text-slate-600">Threshold ({unit})</span>
          <input
            type="number"
            step="any"
            min="0"
            required
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-xs text-slate-600">Notification email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-slate-900 text-white py-2 rounded-md text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
        >
          {submitting ? 'Creating…' : 'Create alert'}
        </button>
      </form>
    </div>
  );
}

function labelFor(metric: MetricType): string {
  return METRICS.find((m) => m.value === metric)?.label ?? metric;
}
