import { Sidebar } from '@/components/Sidebar';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="px-8 py-6">{children}</div>
      </main>
    </div>
  );
}
