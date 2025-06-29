import { NavLink } from 'react-router-dom';
import { cn } from '@saas-app/ui';
import {
  LayoutDashboard,
  Users,
  FileText,
  Key,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Licenses', href: '/licenses', icon: Key },
];

export function Sidebar() {
  return (
    <div className="hidden border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col animate-in slide-in-from-left duration-500">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
        <nav className="flex flex-1 flex-col pt-8">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 transition-all duration-200',
                          'hover:bg-primary-50 hover:text-primary-900',
                          isActive
                            ? 'bg-primary-50 text-primary-900'
                            : 'text-gray-700 hover:text-primary-900'
                        )
                      }
                    >
                      <item.icon 
                        className={cn(
                          "h-6 w-6 shrink-0 transition-colors duration-200",
                          "group-hover:text-primary-600",
                          "animate-in fade-in duration-300"
                        )} 
                      />
                      <span className="animate-in fade-in duration-300">{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
} 