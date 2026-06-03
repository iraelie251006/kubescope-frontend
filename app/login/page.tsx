'use client';

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
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white border border-slate-200 rounded-lg shadow-sm p-8"
      >
        <h1 className="text-2xl font-semibold text-slate-900">KubeScope</h1>
        <p className="text-sm text-slate-500 mt-1 mb-6">Sign in to continue</p>

        <label className="block mb-4">
          <span className="text-sm text-slate-700">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-slate-700">Password</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </label>

        {error ? <p className="text-sm text-red-600 mb-4">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white py-2 rounded-md text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
