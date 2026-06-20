import Link from 'next/link';
import { DashboardMock } from '@/components/landing/DashboardMock';
import { Icon } from '@/components/landing/Icon';
import { Marquee } from '@/components/landing/Marquee';
import { Reveal } from '@/components/landing/Reveal';

const FEATURES = [
  {
    icon: 'graph' as const,
    title: 'Real cost, not estimates',
    body: 'Per-namespace, per-deployment cost broken down by node price, requests and actual usage — so you can argue with the bill, not guess at it.',
  },
  {
    icon: 'pulse' as const,
    title: 'Live cluster pulse',
    body: 'CPU, memory, pod and node movement in one calm view. Sparklines update as the cluster breathes — no refresh, no noise.',
  },
  {
    icon: 'bell' as const,
    title: 'Alerts that mean something',
    body: 'Rules over usage, cost burn-rate and rogue deployments. Quiet by default, loud when it matters, acknowledgeable in one click.',
  },
  {
    icon: 'cube' as const,
    title: 'Every workload, indexed',
    body: 'Nodes, namespaces, deployments — searchable, sortable, linkable. Onboard a new engineer and they find the right pod in twenty seconds.',
  },
  {
    icon: 'shield' as const,
    title: 'Read-only by design',
    body: 'KubeScope never writes to your cluster. Scrape, observe, alert — your RBAC stays exactly as restrictive as you set it.',
  },
  {
    icon: 'spark' as const,
    title: 'Drops in, fits in',
    body: 'Helm chart, single namespace, zero config beyond a kubeconfig. Talks Prometheus when you have it, ships its own when you don’t.',
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Install the agent',
    body: 'One Helm command per cluster. The collector lives in its own namespace and talks to the API over mTLS.',
  },
  {
    n: '02',
    title: 'Wire your price book',
    body: 'Bring AWS / GCP / Azure pricing, or a custom rate card for bare-metal. We do the math per node-hour.',
  },
  {
    n: '03',
    title: 'Watch the cluster light up',
    body: 'Within a minute, every workload appears in the overview — cost, usage, owner, alerts, the lot.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ink-950 text-white selection:bg-brand-500/40">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-ink-950/60 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="relative inline-flex w-7 h-7 items-center justify-center rounded-md bg-gradient-to-br from-brand-400 to-accent-500 shadow-glow">
              <span className="absolute inset-0 rounded-md bg-gradient-to-br from-brand-400 to-accent-500 blur-md opacity-60 group-hover:opacity-90 transition-opacity" />
              <span className="relative font-display font-bold text-ink-950 text-sm">K</span>
            </span>
            <span className="font-display font-semibold tracking-tight text-base">KubeScope</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#how" className="hover:text-white transition-colors">
              How it works
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="text-sm text-white/70 hover:text-white px-3 py-1.5 rounded-md transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="group relative inline-flex items-center gap-1.5 text-sm font-medium bg-white text-ink-950 px-4 py-1.5 rounded-md hover:bg-white/90 transition-colors"
            >
              Get started
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="aurora" aria-hidden />
        <div className="absolute inset-0 bg-grid-dark bg-grid [mask-image:radial-gradient(ellipse_75%_55%_at_50%_25%,black,transparent_75%)] opacity-50" />
        <div className="absolute inset-x-0 top-0 h-[600px] bg-radial-fade pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3 py-1 text-xs text-white/70">
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-400">
                    <span className="absolute inset-0 rounded-full bg-accent-400 animate-ping" />
                  </span>
                  v1.0 — now reading from Prometheus &amp; OpenCost
                </span>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl tracking-tight font-semibold leading-[1.02]">
                  <span className="gradient-text">See your cluster</span>
                  <br />
                  <span className="text-white/95">like it sees itself.</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-6 text-lg text-white/60 max-w-xl text-pretty leading-relaxed">
                  KubeScope is the Kubernetes dashboard for teams who care what each pod costs and
                  which deployment just broke the budget. Calm UI, honest numbers, motion that
                  earns its place.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    href="/login"
                    className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-ink-950 bg-white hover:bg-white/95 transition-all shadow-glow"
                  >
                    <span>Open the dashboard</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                  <a
                    href="#features"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-white/85 border border-white/15 hover:bg-white/5 transition-colors"
                  >
                    See it work
                  </a>
                </div>
              </Reveal>

              <Reveal delay={320}>
                <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
                  {[
                    { k: '4×', v: 'faster triage' },
                    { k: '38%', v: 'avg cost cut' },
                    { k: '<1m', v: 'time to first chart' },
                  ].map((s) => (
                    <div key={s.v}>
                      <dt className="font-display text-3xl text-white tracking-tight">{s.k}</dt>
                      <dd className="text-xs text-white/45 mt-1 uppercase tracking-wider">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={120} className="animate-float">
                <DashboardMock />
              </Reveal>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative border-t border-white/5 py-8">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-white/35 mb-5">
            Built for the cloud-native stack
          </p>
          <Marquee />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-28">
        <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-brand-300 uppercase tracking-[0.18em]">
                Everything in one place
              </p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-white text-balance">
                A control room for clusters,
                <br />
                <span className="text-white/55">not a wall of dashboards.</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 60}>
                <div className="group lift relative h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 hover:border-white/20">
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(400px 200px at 50% -10%, rgba(59,93,255,0.25), transparent 60%)',
                    }}
                  />
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-brand-300 group-hover:text-accent-400 group-hover:bg-white/10 transition-colors">
                      <Icon name={f.icon} />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-white">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative py-28 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="text-sm font-medium text-brand-300 uppercase tracking-[0.18em]">
                  How it works
                </p>
                <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white text-balance">
                  Three steps, then it just runs.
                </h2>
                <p className="mt-4 text-white/55 leading-relaxed">
                  KubeScope ships as a single agent and a hosted control plane. You install the
                  agent, point it at your prices, and the rest is just watching.
                </p>
              </Reveal>
            </div>

            <ol className="lg:col-span-8 space-y-4">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 100}>
                  <li className="group relative grid grid-cols-12 gap-6 items-start rounded-2xl border border-white/10 bg-white/[0.02] p-6 lift hover:border-white/20">
                    <div className="col-span-2 md:col-span-1">
                      <span className="font-display text-3xl font-semibold text-white/15 group-hover:text-white/40 transition-colors">
                        {s.n}
                      </span>
                    </div>
                    <div className="col-span-10 md:col-span-11">
                      <h3 className="font-display text-xl font-semibold text-white">{s.title}</h3>
                      <p className="mt-1.5 text-sm text-white/55 leading-relaxed">{s.body}</p>
                    </div>
                    <span className="pointer-events-none absolute left-6 right-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SHOWCASE STRIP */}
      <section className="relative py-28 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent_80%)] opacity-40" />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white text-balance">
              Numbers you can act on,
              <br />
              <span className="gradient-text">in the time it takes to refill coffee.</span>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                { k: '$184k', v: 'saved per quarter', s: 'Average across pilot clusters of 200+ nodes.' },
                { k: '99.97%', v: 'agent uptime', s: 'Single binary, no external dependencies in your cluster.' },
                { k: '12s', v: 'p95 alert latency', s: 'From metric crossing threshold to ack-able alert.' },
              ].map((s) => (
                <div
                  key={s.v}
                  className="glass rounded-2xl p-7 text-left"
                >
                  <div className="font-display text-4xl text-white tracking-tight">{s.k}</div>
                  <div className="mt-1 text-sm text-white/70 font-medium">{s.v}</div>
                  <p className="mt-3 text-xs text-white/45 leading-relaxed">{s.s}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="relative py-28 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-700/40 via-ink-900 to-ink-950 p-12 md:p-16 text-center shadow-glow">
              <div
                aria-hidden
                className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-60 blur-3xl animate-drift"
                style={{
                  background: 'radial-gradient(circle, rgba(126,240,200,0.4), transparent 60%)',
                }}
              />
              <div
                aria-hidden
                className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-60 blur-3xl animate-drift"
                style={{
                  background: 'radial-gradient(circle, rgba(59,93,255,0.45), transparent 60%)',
                  animationDelay: '-6s',
                }}
              />
              <div className="relative">
                <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white text-balance">
                  Stop guessing what your cluster costs.
                </h2>
                <p className="mt-4 text-white/65 max-w-xl mx-auto">
                  Free while we&apos;re in beta. Bring a cluster, bring a price book, get to clarity in
                  under a minute.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/login"
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-ink-950 bg-white hover:bg-white/95 transition-colors"
                  >
                    Open the dashboard
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                  <a
                    href="mailto:hello@kubescope.io"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white/85 border border-white/15 hover:bg-white/5 transition-colors"
                  >
                    Talk to us
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="faq" className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex w-6 h-6 items-center justify-center rounded-md bg-gradient-to-br from-brand-400 to-accent-500">
              <span className="font-display font-bold text-ink-950 text-xs">K</span>
            </span>
            <span className="font-display font-semibold tracking-tight">KubeScope</span>
            <span className="text-xs text-white/35 ml-2">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-white/45">
            <a href="#features" className="hover:text-white/80 transition-colors">
              Features
            </a>
            <a href="#how" className="hover:text-white/80 transition-colors">
              How it works
            </a>
            <Link href="/login" className="hover:text-white/80 transition-colors">
              Sign in
            </Link>
            <a href="mailto:hello@kubescope.io" className="hover:text-white/80 transition-colors">
              hello@kubescope.io
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
