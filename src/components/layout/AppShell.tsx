import { useState, type ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export interface AppShellProps {
  children?: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [celoxisDrawerOpen, setCeloxisDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#eae7e1] flex flex-row font-sans antialiased text-neutral-800 selection:bg-neutral-900 selection:text-white">
      {/* Left Icon Dock + Celoxis Drawer */}
      <Sidebar
        celoxisDrawerOpen={celoxisDrawerOpen}
        onToggleCeloxisDrawer={() => setCeloxisDrawerOpen((prev) => !prev)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pr-4 md:pr-6 lg:pr-8 pl-1 py-3 md:py-4">
        {/* Top Bar with Search & Profile */}
        <TopBar
          celoxisDrawerOpen={celoxisDrawerOpen}
          onToggleCeloxisDrawer={() => setCeloxisDrawerOpen((prev) => !prev)}
        />

        {/* Page Body */}
        <main className="flex-1 mt-3">
          {children}
        </main>
      </div>
    </div>
  );
}
