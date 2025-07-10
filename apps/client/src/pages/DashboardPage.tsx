import { Card, CardContent, CardHeader, CardTitle, Button } from '@saas-app/ui';
import { Users, FileText, Key, DollarSign, ArrowUpRight, ArrowDownRight, LineChart, Activity, Sparkles } from 'lucide-react';

const stats = [
  {
    title: 'Total Customers',
    value: '2,350',
    change: '+12.3%',
    trend: 'up',
    icon: Users,
    description: 'Active customers in the platform',
  },
  {
    title: 'Total Invoices',
    value: '$12,234',
    change: '+8.2%',
    trend: 'up',
    icon: FileText,
    description: 'Revenue from all invoices',
  },
  {
    title: 'Active Licenses',
    value: '485',
    change: '-2.1%',
    trend: 'down',
    icon: Key,
    description: 'Currently active licenses',
  },
  {
    title: 'Monthly Revenue',
    value: '$4,567',
    change: '+15.3%',
    trend: 'up',
    icon: DollarSign,
    description: 'Revenue this month',
  },
];

const recentActivity = [
  {
    title: 'New Customer',
    description: 'John Doe signed up',
    time: '2 minutes ago',
    icon: Users,
    color: 'indigo',
  },
  {
    title: 'License Activated',
    description: 'Enterprise plan activated',
    time: '15 minutes ago',
    icon: Key,
    color: 'fuchsia',
  },
  {
    title: 'Invoice Paid',
    description: 'Payment received for INV-001',
    time: '1 hour ago',
    icon: FileText,
    color: 'rose',
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 p-3 shadow-xl shadow-indigo-500/5">
            <Sparkles className="h-8 w-8 text-indigo-500 animate-in spin-in-180 duration-500" />
          </div>
          <div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
              Welcome back!
            </CardTitle>
            <p className="text-muted-foreground/80 text-lg mt-1">
              Here's what's happening with your business today.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="animate-in fade-in zoom-in duration-500 overflow-hidden relative border-0 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl shadow-indigo-500/5 backdrop-blur-sm group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground/80">
                {stat.title}
              </CardTitle>
              <div className="rounded-2xl bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-rose-500/20 p-2.5 group-hover:from-indigo-500/30 group-hover:via-fuchsia-500/30 group-hover:to-rose-500/30 transition-all duration-300">
                <stat.icon className="h-4 w-4 text-indigo-500 group-hover:text-fuchsia-500 transition-colors duration-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                <div className={`flex items-center text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground/70">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="animate-in fade-in slide-in-from-left duration-700 overflow-hidden relative border-0 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl shadow-indigo-500/5 backdrop-blur-sm group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="font-medium text-indigo-500 hover:text-fuchsia-500 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-fuchsia-500/10 transition-all duration-300"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div 
                  key={activity.title}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 hover:from-white/10 hover:to-white/5 transition-colors group/item"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`rounded-2xl bg-gradient-to-br from-${activity.color}-500/20 to-${activity.color}-500/10 p-2.5 group-hover/item:from-${activity.color}-500/30 group-hover/item:to-${activity.color}-500/20 transition-all duration-300`}>
                    <activity.icon className={`h-5 w-5 text-${activity.color}-500`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold leading-none">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground/70">
                      {activity.description}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground/50">
                    {activity.time}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-in fade-in slide-in-from-right duration-700 overflow-hidden relative border-0 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl shadow-indigo-500/5 backdrop-blur-sm group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Quick Stats</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="font-medium text-indigo-500 hover:text-fuchsia-500 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-fuchsia-500/10 transition-all duration-300"
              >
                <LineChart className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground/80">
                    Active Users
                  </p>
                  <p className="text-2xl font-bold tracking-tight">1,234</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-rose-500/20 p-2.5 group-hover:from-indigo-500/30 group-hover:via-fuchsia-500/30 group-hover:to-rose-500/30 transition-all duration-300">
                  <Activity className="h-full w-full text-indigo-500 group-hover:text-fuchsia-500 transition-colors duration-300" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-medium text-muted-foreground/80">Monthly Goal</p>
                    <p className="font-semibold text-indigo-500">78%</p>
                  </div>
                  <div className="h-2 rounded-full bg-gradient-to-r from-white/5 to-white/0">
                    <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 animate-in slide-in-from-left duration-1000" />
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 text-white hover:from-indigo-600 hover:via-fuchsia-600 hover:to-rose-600 font-medium shadow-xl shadow-indigo-500/20"
                >
                  View Detailed Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 