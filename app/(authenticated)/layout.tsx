import { Sidebar } from '@/components/Sidebar';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-ink-50">
      {/* Soft ambient glow behind the app */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 80% 0%, rgba(59,93,255,0.06), transparent 60%), radial-gradient(ellipse 50% 30% at 0% 100%, rgba(126,240,200,0.06), transparent 60%)',
        }}
      />
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="px-8 py-7 animate-fade-in">{children}</div>
      </main>
    </div>
  );
}
