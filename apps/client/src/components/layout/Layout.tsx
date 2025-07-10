import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toaster } from '@saas-app/ui';
import { useState } from 'react';
import { cn } from '@saas-app/ui';

export function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-background text-foreground animate-in fade-in duration-500 relative overflow-hidden">
      {/* Content */}
      <div className="relative">
        <Header />
        <Sidebar onCollapse={setIsSidebarCollapsed} />
        <div className={cn(
          "transition-all duration-300 ease-in-out pt-16",
          isSidebarCollapsed ? "lg:pl-20" : "lg:pl-72"
        )}>
          <main className="py-10 animate-in slide-in-from-bottom duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
        <Toaster />
      </div>
    </div>
  );
} 