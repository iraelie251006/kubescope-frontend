'use client';

import { useEffect, useState } from 'react';

const BARS = [62, 48, 73, 55, 81, 67, 49, 72, 58, 84, 66, 71, 60, 88, 74];

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 100;
  const h = 28;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts}
      />
      <polygon fill={`url(#grad-${color})`} points={`0,${h} ${pts} ${w},${h}`} />
    </svg>
  );
}

export function DashboardMock() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, []);

  const cpu = 58 + Math.sin(tick / 2) * 6;
  const mem = 71 + Math.cos(tick / 3) * 4;
  const cost = 1240 + Math.sin(tick / 4) * 35;

  return (
    <div className="relative">
      {/* Glow behind the mock */}
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-[40px] opacity-70 blur-3xl animate-glow"
        style={{
          background:
            'radial-gradient(ellipse at 30% 30%, rgba(59,93,255,0.6), transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(126,240,200,0.5), transparent 60%)',
        }}
      />

      <div className="rounded-2xl border border-white/10 bg-ink-900/80 backdrop-blur-xl shadow-ring overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-[11px] text-white/40 font-mono">app.kubescope.io / overview</span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-emerald-300/90">
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
            </span>
            live
          </span>
        </div>

        <div className="grid grid-cols-12 gap-3 p-4">
          {/* Sidebar */}
          <div className="col-span-3 space-y-1">
            {['Overview', 'Nodes', 'Namespaces', 'Deployments', 'Alerts'].map((label, i) => (
              <div
                key={label}
                className={
                  'text-[11px] px-2.5 py-1.5 rounded-md ' +
                  (i === 0 ? 'bg-white/10 text-white' : 'text-white/50')
                }
              >
                {label}
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="col-span-9 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'CPU', value: `${cpu.toFixed(1)}%`, color: '#7ef0c8' },
                { label: 'Memory', value: `${mem.toFixed(1)}%`, color: '#8fb1ff' },
                { label: 'Monthly', value: `$${cost.toFixed(0)}`, color: '#bcd0ff' },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-white/10 bg-white/5 p-3"
                >
                  <div className="text-[10px] uppercase tracking-wider text-white/40">
                    {m.label}
                  </div>
                  <div className="mt-1 text-base font-semibold text-white tabular-nums">
                    {m.value}
                  </div>
                  <div className="h-7 mt-1.5">
                    <Sparkline
                      values={BARS.map((b, i) => b + Math.sin((tick + i) / 2) * 5)}
                      color={m.color}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bars panel */}
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[11px] text-white/60">Cost by namespace</div>
                <div className="text-[10px] text-white/40 font-mono">24h</div>
              </div>
              <div className="flex items-end gap-1.5 h-24">
                {BARS.map((b, i) => {
                  const v = b + Math.sin((tick + i) / 2) * 6;
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-gradient-to-t from-brand-600 to-accent-400 transition-[height] duration-700 ease-out"
                      style={{ height: `${v}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
