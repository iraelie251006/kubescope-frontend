'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError('Invalid email or password');
        return;
      }
      router.push('/dashboard');
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-ink-950 text-white">
      {/* Left — visual */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden border-r border-white/5">
        <div className="aurora" aria-hidden />
        <div className="absolute inset-0 bg-grid-dark bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_30%_30%,black,transparent_75%)] opacity-40" />

        <Link href="/" className="relative flex items-center gap-2 group">
          <span className="relative inline-flex w-8 h-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-accent-500 shadow-glow">
            <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-400 to-accent-500 blur-md opacity-60 group-hover:opacity-90 transition-opacity" />
            <span className="relative font-display font-bold text-ink-950">K</span>
          </span>
          <span className="font-display font-semibold tracking-tight text-lg">KubeScope</span>
        </Link>

        <div className="relative max-w-md animate-fade-in-slow">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Welcome back</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-balance leading-[1.1]">
            <span className="gradient-text">Your cluster has been busy.</span>
          </h2>
          <p className="mt-4 text-white/55 text-pretty">
            Sign in to see what changed: which deployments spiked, which alerts you can ack, and
            where the next hour of cost is going to land.
          </p>

          <div className="mt-10 flex items-center gap-3 text-xs text-white/40">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
            </span>
            API status — all systems normal
          </div>
        </div>

        <p className="relative text-xs text-white/35">
          © {new Date().getFullYear()} KubeScope. Read-only by design.
        </p>
      </div>

      {/* Right — form */}
      <div className="relative flex items-center justify-center px-6 py-12 lg:py-0">
        <div className="absolute lg:hidden inset-0 bg-dot-grid pointer-events-none" />

        <form
          onSubmit={onSubmit}
          className="relative w-full max-w-sm animate-scale-in"
          noValidate
        >
          <Link
            href="/"
            className="lg:hidden flex items-center gap-2 mb-8 text-white/80"
          >
            <span className="inline-flex w-7 h-7 items-center justify-center rounded-md bg-gradient-to-br from-brand-400 to-accent-500">
              <span className="font-display font-bold text-ink-950 text-sm">K</span>
            </span>
            <span className="font-display font-semibold tracking-tight">KubeScope</span>
          </Link>

          <h1 className="font-display text-3xl font-semibold tracking-tight">Sign in</h1>
          <p className="text-sm text-white/55 mt-1.5 mb-8">Use your KubeScope account.</p>

          <label className="block mb-4">
            <span className="text-xs uppercase tracking-wider text-white/55">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm placeholder-white/30 text-white focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/40 transition-all"
              placeholder="you@company.io"
            />
          </label>

          <label className="block mb-2">
            <span className="text-xs uppercase tracking-wider text-white/55">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm placeholder-white/30 text-white focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/40 transition-all"
              placeholder="••••••••"
            />
          </label>

          <div
            className={
              'mb-4 overflow-hidden transition-all ' +
              (error ? 'max-h-12 opacity-100 mt-2' : 'max-h-0 opacity-0')
            }
            role="alert"
            aria-live="polite"
          >
            <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
              {error}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full inline-flex items-center justify-center gap-2 bg-white text-ink-950 py-2.5 rounded-lg text-sm font-medium hover:bg-white/95 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-glow"
          >
            <span className="relative inline-flex items-center gap-2">
              {loading ? (
                <>
                  <span className="inline-block w-3.5 h-3.5 border-2 border-ink-950/30 border-t-ink-950 rounded-full animate-spin" />
                  Signing in
                </>
              ) : (
                <>
                  Sign in
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </>
              )}
            </span>
          </button>

          <p className="mt-6 text-center text-xs text-white/45">
            New here?{' '}
            <Link href="/" className="text-white/70 hover:text-white transition-colors">
              Tour the product →
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
