import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-transparent w-full">
      {/* Spacer for the fixed floating sidebar */}
      <div className="hidden md:block w-[300px] shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col w-full">
        <TopBar />
        {/* Main Content Pane */}
        <main className="p-6 md:px-8 md:py-6 flex-1 overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
