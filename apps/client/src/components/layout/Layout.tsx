import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toaster } from '@saas-app/ui';

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <div className="lg:pl-72">
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
} 