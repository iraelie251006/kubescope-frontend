import { AlertsClient } from '@/components/AlertsClient';
import { serverGet } from '@/lib/api';
import type { AlertRuleRow } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function AlertsPage() {
  const rules = await serverGet<AlertRuleRow[]>('/api/v1/alerts');

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Alerts</h1>
        <p className="text-xs text-slate-500">Evaluated every 5 minutes · 1h cooldown per rule</p>
      </div>
      <AlertsClient initial={rules} />
    </div>
  );
}
