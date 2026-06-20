'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '@/components/landing/Icon';

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: 'graph' as const },
  { href: '/nodes', label: 'Nodes', icon: 'cube' as const },
  { href: '/namespaces', label: 'Namespaces', icon: 'spark' as const },
  { href: '/deployments', label: 'Deployments', icon: 'pulse' as const },
  { href: '/alerts', label: 'Alerts', icon: 'bell' as const },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  return (
    <aside className="w-60 shrink-0 bg-white/80 backdrop-blur-xl border-r border-ink-100 flex flex-col">
      <Link
        href="/"
        className="flex items-center gap-2 px-5 py-5 border-b border-ink-100 group"
      >
        <span className="relative inline-flex w-8 h-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 shadow-soft">
          <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 blur-md opacity-0 group-hover:opacity-60 transition-opacity" />
          <span className="relative font-display font-bold text-white text-sm">K</span>
        </span>
        <span className="font-display text-base font-semibold tracking-tight text-ink-900">
          KubeScope
        </span>
      </Link>

      <nav className="flex-1 p-3 space-y-0.5">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                'group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all ' +
                (active
                  ? 'bg-ink-900 text-white shadow-soft'
                  : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900')
              }
            >
              <span
                className={
                  'transition-colors ' +
                  (active ? 'text-accent-400' : 'text-ink-400 group-hover:text-ink-700')
                }
              >
                <Icon name={item.icon} className="w-4 h-4" />
              </span>
              <span className="font-medium">{item.label}</span>
              {active && (
                <span className="ml-auto inline-flex h-1.5 w-1.5 rounded-full bg-accent-400 animate-glow" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-ink-100">
        <button
          onClick={logout}
          className="w-full text-left text-sm text-ink-500 hover:text-ink-900 px-3 py-2 rounded-lg hover:bg-ink-100 transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
