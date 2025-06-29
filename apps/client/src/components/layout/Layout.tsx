import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toaster } from '@saas-app/ui';

export function Layout() {
  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-500">
      <Header />
      <Sidebar />
      <div className="lg:pl-72">
        <main className="py-10 animate-in slide-in-from-bottom duration-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
} 