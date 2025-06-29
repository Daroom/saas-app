import { Card, CardContent, CardHeader, CardTitle } from '@saas-app/ui';
import { Users, FileText, Key, DollarSign } from 'lucide-react';

const stats = [
  {
    title: 'Total Customers',
    value: '2,350',
    icon: Users,
    description: 'Active customers in the platform',
  },
  {
    title: 'Total Invoices',
    value: '$12,234',
    icon: FileText,
    description: 'Revenue from all invoices',
  },
  {
    title: 'Active Licenses',
    value: '485',
    icon: Key,
    description: 'Currently active licenses',
  },
  {
    title: 'Monthly Revenue',
    value: '$4,567',
    icon: DollarSign,
    description: 'Revenue this month',
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your business metrics and performance
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Add charts and other dashboard components here */}
    </div>
  );
} 