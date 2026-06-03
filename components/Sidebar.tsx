'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/nodes', label: 'Nodes' },
  { href: '/namespaces', label: 'Namespaces' },
  { href: '/deployments', label: 'Deployments' },
  { href: '/alerts', label: 'Alerts' },
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
    <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
      <div className="px-5 py-5 border-b border-slate-200">
        <span className="text-lg font-semibold tracking-tight">KubeScope</span>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                'block rounded-md px-3 py-2 text-sm ' +
                (active
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100')
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-slate-200">
        <button
          onClick={logout}
          className="w-full text-left text-sm text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md hover:bg-slate-100"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
