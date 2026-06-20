type Props = {
  label: string;
  value: string;
  hint?: string;
};

export function StatCard({ label, value, hint }: Props) {
  return (
    <div className="group lift relative overflow-hidden bg-white border border-ink-100 rounded-xl p-5 shadow-soft hover:shadow-card hover:border-ink-200">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(420px 200px at 50% -10%, rgba(59,93,255,0.10), transparent 60%)',
        }}
      />
      <div className="relative">
        <div className="text-[11px] uppercase tracking-[0.14em] text-ink-500 font-medium">
          {label}
        </div>
        <div className="mt-2 font-display text-3xl font-semibold text-ink-900 tabular-nums tracking-tight">
          {value}
        </div>
        {hint ? <div className="mt-1 text-xs text-ink-500">{hint}</div> : null}
      </div>
    </div>
  );
}
