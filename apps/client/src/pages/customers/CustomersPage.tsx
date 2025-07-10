import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, DataTable, Badge, Input, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Label } from '@saas-app/ui';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Search, ArrowUpRight, Users, TrendingUp, UserCheck, Trash } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { useToast } from '@saas-app/ui';

interface Customer {
  id: string;
  contact: string;
  company: string;
  phone?: string;
  email: string;
  registration: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

const statusColors = {
  active: 'bg-emerald-400/10 text-emerald-400 ring-emerald-400/30',
  inactive: 'bg-rose-400/10 text-rose-400 ring-rose-400/30',
  pending: 'bg-amber-400/10 text-amber-400 ring-amber-400/30',
} as const;

const typeColors = {
  individual: 'bg-indigo-400/10 text-indigo-400 ring-indigo-400/30',
  business: 'bg-fuchsia-400/10 text-fuchsia-400 ring-fuchsia-400/30',
} as const;

export function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    contact: '',
    company: '',
    phone: '',
    email: '',
    status: 'ACTIVE' as const
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await api.get<Customer[]>('/customers');
      return response.data;
    },
  });

  const createCustomerMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await api.post<Customer>('/customers', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: "Success",
        description: "Customer created successfully",
        variant: "default",
      });
      setIsOpen(false);
      setFormData({
        contact: '',
        company: '',
        phone: '',
        email: '',
        status: 'ACTIVE'
      });
      setErrors({});
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to create customer",
        variant: "destructive",
      });
    },
  });

  const deleteCustomerMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/customers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: "Success",
        description: "Customer deleted successfully",
        variant: "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete customer",
        variant: "destructive",
      });
    },
  });

  const handleDeleteCustomer = (id: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      deleteCustomerMutation.mutate(id);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      createCustomerMutation.mutate(formData);
    }
  };

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: 'contact',
      header: 'Contact',
      cell: ({ row }) => (
        <span className="font-medium text-foreground">{row.original.contact}</span>
      ),
    },
    {
      accessorKey: 'company',
      header: 'Company',
      cell: ({ row }) => {
        const value = row.original.company;
        return <span className="text-muted-foreground/70">{!value || value === '' ? '-' : value}</span>;
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <span className="text-muted-foreground/70">{row.original.email}</span>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => (
        <span className="text-muted-foreground/70">{row.original.phone || '-'}</span>
      ),
    },
    {
      accessorKey: 'registration',
      header: 'Registered',
      cell: ({ row }) => (
        <span className="text-muted-foreground/70">{new Date(row.original.registration).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        const color = status === 'ACTIVE' ? 'bg-emerald-400/10 text-emerald-400 ring-emerald-400/30' : status === 'INACTIVE' ? 'bg-rose-400/10 text-rose-400 ring-rose-400/30' : 'bg-amber-400/10 text-amber-400 ring-amber-400/30';
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ${color}`}>
            {status.charAt(0) + status.slice(1).toLowerCase()}
          </span>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleDeleteCustomer(row.original.id)}
          className="text-muted-foreground/50 hover:text-red-400 hover:bg-white/5"
        >
          <Trash className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
            Customers
          </h1>
          <p className="text-muted-foreground/70">
            Manage and monitor your customer base
          </p>
        </div>
        <Button 
          onClick={() => setIsOpen(true)}
          className="relative overflow-hidden bg-sidebar text-sidebar-foreground shadow-lg shadow-sidebar/20 hover:shadow-sidebar/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] gap-2 group"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-8 group-hover:translate-y-0 transition-transform duration-300" />
          <Plus className="h-4 w-4 relative z-10" />
          <span className="relative z-10">Add Customer</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-0 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl shadow-indigo-500/5 backdrop-blur-sm group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground/70">
                Total Customers
              </CardTitle>
              <div className="rounded-2xl bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-rose-500/20 p-2.5 group-hover:from-indigo-500/30 group-hover:via-fuchsia-500/30 group-hover:to-rose-500/30 transition-all duration-300">
                <Users className="h-4 w-4 text-indigo-500 group-hover:text-fuchsia-500 transition-colors duration-300" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <p className="text-sm font-medium text-emerald-400">
                +12.3% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl shadow-indigo-500/5 backdrop-blur-sm group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground/70">
                Active Customers
              </CardTitle>
              <div className="rounded-2xl bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-rose-500/20 p-2.5 group-hover:from-indigo-500/30 group-hover:via-fuchsia-500/30 group-hover:to-rose-500/30 transition-all duration-300">
                <UserCheck className="h-4 w-4 text-indigo-500 group-hover:text-fuchsia-500 transition-colors duration-300" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => c.status === 'ACTIVE').length}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <p className="text-sm font-medium text-emerald-400">
                +5.2% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl shadow-indigo-500/5 backdrop-blur-sm group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground/70">
                Total Revenue
              </CardTitle>
              <div className="rounded-2xl bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-rose-500/20 p-2.5 group-hover:from-indigo-500/30 group-hover:via-fuchsia-500/30 group-hover:to-rose-500/30 transition-all duration-300">
                <TrendingUp className="h-4 w-4 text-indigo-500 group-hover:text-fuchsia-500 transition-colors duration-300" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N/A</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <p className="text-sm font-medium text-emerald-400">
                +8.1% from last month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={filteredCustomers}
        title="Customer List"
        description="View and manage all your customers in one place."
        emptyMessage="No customers found"
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="border-0 bg-sidebar/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-sidebar-foreground">Add Customer</DialogTitle>
            <DialogDescription className="text-sidebar-foreground/70">
              Add a new customer to your customer base
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="contact" className="text-sidebar-foreground/90">Contact Name</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                placeholder="Enter contact name"
                className={`bg-sidebar-muted/10 border-sidebar-muted/20 focus:border-sidebar-muted/30 text-sidebar-foreground placeholder:text-sidebar-foreground/50 ${errors.contact ? 'border-red-500' : ''}`}
              />
              {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sidebar-foreground/90">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Enter company name (optional)"
                className="bg-sidebar-muted/10 border-sidebar-muted/20 focus:border-sidebar-muted/30 text-sidebar-foreground placeholder:text-sidebar-foreground/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sidebar-foreground/90">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter customer email"
                className={`bg-sidebar-muted/10 border-sidebar-muted/20 focus:border-sidebar-muted/30 text-sidebar-foreground placeholder:text-sidebar-foreground/50 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sidebar-foreground/90">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter phone number (optional)"
                className="bg-sidebar-muted/10 border-sidebar-muted/20 focus:border-sidebar-muted/30 text-sidebar-foreground placeholder:text-sidebar-foreground/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sidebar-foreground/90">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger className="bg-sidebar-muted/10 border-sidebar-muted/20 focus:border-sidebar-muted/30 text-sidebar-foreground">
                  <SelectValue placeholder="Select status" className="text-sidebar-foreground/50" />
                </SelectTrigger>
                <SelectContent className="bg-sidebar border-sidebar-muted/20">
                  <SelectItem value="ACTIVE" className="text-sidebar-foreground focus:bg-sidebar-muted/20 focus:text-sidebar-foreground">Active</SelectItem>
                  <SelectItem value="INACTIVE" className="text-sidebar-foreground focus:bg-sidebar-muted/20 focus:text-sidebar-foreground">Inactive</SelectItem>
                  <SelectItem value="SUSPENDED" className="text-sidebar-foreground focus:bg-sidebar-muted/20 focus:text-sidebar-foreground">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="bg-transparent border-sidebar-muted/20 text-sidebar-foreground/70 hover:bg-sidebar-muted/10 hover:text-sidebar-foreground"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={createCustomerMutation.isPending}
              className="relative overflow-hidden bg-sidebar text-sidebar-foreground shadow-lg shadow-sidebar/20 hover:shadow-sidebar/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-8 group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">
                {createCustomerMutation.isPending ? 'Creating...' : 'Add Customer'}
              </span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 