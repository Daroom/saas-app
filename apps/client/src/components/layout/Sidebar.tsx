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
    <div className="hidden border-r bg-gray-100/40 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pb-4">
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
                          'flex gap-x-3 rounded-md p-2 text-sm leading-6',
                          'hover:bg-gray-100 hover:text-gray-900',
                          isActive
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700'
                        )
                      }
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      {item.name}
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