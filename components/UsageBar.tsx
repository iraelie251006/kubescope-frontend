type Props = {
  used: number | null | undefined;
  total: number | null | undefined;
  label?: string;
};

export function UsageBar({ used, total, label }: Props) {
  const usedNum = used ?? 0;
  const totalNum = total ?? 0;
  const pct = totalNum > 0 ? Math.min(100, (usedNum / totalNum) * 100) : 0;
  const color = pct < 60 ? 'bg-emerald-500' : pct < 85 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
        <span>{label ?? ''}</span>
        <span className="tabular-nums">{pct.toFixed(0)}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
