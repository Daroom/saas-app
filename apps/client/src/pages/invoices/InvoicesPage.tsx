import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  DataTable,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@saas-app/ui';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Plus, Pencil, Trash } from 'lucide-react';
import { api } from '../../lib/axios';
import { useToast } from '@saas-app/ui';

interface Invoice {
  id: string;
  number: string;
  date: string;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  customer: { company: string; contact: string };
}

interface Customer {
  id: string;
  contact: string;
  company: string;
  email: string;
}



export function InvoicesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerId: '',
    number: '',
    date: new Date().toISOString(),
    status: 'DRAFT' as const
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const response = await api.get<Invoice[]>('/invoices');
      return response.data;
    },
  });

  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await api.get<Customer[]>('/customers');
      return response.data;
    },
  });

  const createInvoiceMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await api.post<Invoice>('/invoices', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Success",
        description: "Invoice created successfully",
        variant: "default",
      });
      setIsOpen(false);
      setFormData({
        customerId: '',
        number: '',
        date: new Date().toISOString(),
        status: 'DRAFT'
      });
      setErrors({});
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error);
      toast({
        title: "Error",
        description:  "Failed to create invoice",
        variant: "destructive",
      });
    },
  });

  const deleteInvoiceMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/invoices/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Success",
        description: "Invoice deleted successfully",
        variant: "default",
      });
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error);
      toast({
        title: "Error",
        description: "Failed to delete invoice",
        variant: "destructive",
      });
    },
  });

  const handleDeleteInvoice = (id: string) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      deleteInvoiceMutation.mutate(id);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if(field === 'date') {
      setFormData(prev => ({ ...prev, [field]: new Date(value).toISOString() }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.customerId) {
      newErrors.customerId = 'Customer is required';
    }
    
    if (!formData.number.trim()) {
      newErrors.number = 'Invoice number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      createInvoiceMutation.mutate(formData);
    }
  };

  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: 'number',
      header: 'Invoice Number',
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => {
        const value = row.original.customer?.company;
        return <span>{!value || value === '' ? '-' : value}</span>;
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => (
        <span>{new Date(row.original.date).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        const color = status === 'PAID' ? 'text-green-600' : status === 'OVERDUE' ? 'text-red-600' : status === 'CANCELLED' ? 'text-gray-400' : status === 'SENT' ? 'text-blue-600' : 'text-yellow-600';
        return <span className={`capitalize ${color}`}>{status.toLowerCase()}</span>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleDeleteInvoice(row.original.id)}
            className="text-muted-foreground/50 hover:text-red-400 hover:bg-white/5"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
            Invoices
          </h2>
          <p className="text-muted-foreground/70">
            Manage your invoices and payments
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              className="relative overflow-hidden bg-sidebar text-sidebar-foreground shadow-lg shadow-sidebar/20 hover:shadow-sidebar/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] gap-2 group"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-8 group-hover:translate-y-0 transition-transform duration-300" />
              <Plus className="h-4 w-4 relative z-10" />
              <span className="relative z-10">Create Invoice</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="border-0 bg-sidebar/95 backdrop-blur-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-sidebar-foreground">Create Invoice</DialogTitle>
              <DialogDescription className="text-sidebar-foreground/70">
                Create a new invoice for a customer
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="customer" className="text-sidebar-foreground/90">Customer</Label>
                <Select onValueChange={(value) => handleInputChange('customerId', value)} value={formData.customerId}>
                  <SelectTrigger className="bg-sidebar-muted/10 border-sidebar-muted/20 focus:border-sidebar-muted/30 text-sidebar-foreground">
                    <SelectValue placeholder="Select a customer" className="text-sidebar-foreground/50" />
                  </SelectTrigger>
                  <SelectContent className="bg-sidebar border-sidebar-muted/20">
                                         {customers.map((customer) => (
                       <SelectItem key={customer.id} value={customer.id} className="text-sidebar-foreground focus:bg-sidebar-muted/20 focus:text-sidebar-foreground">
                         {customer.company || customer.contact} {customer.company && `(${customer.contact})`}
                       </SelectItem>
                     ))}
                  </SelectContent>
                </Select>
                {errors.customerId && <p className="text-red-500 text-sm">{errors.customerId}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sidebar-foreground/90">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={formData.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                  className="bg-sidebar-muted/10 border-sidebar-muted/20 focus:border-sidebar-muted/30 text-sidebar-foreground placeholder:text-sidebar-foreground/50"
                />
                {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sidebar-foreground/90">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
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
                    <SelectItem value="DRAFT" className="text-sidebar-foreground focus:bg-sidebar-muted/20 focus:text-sidebar-foreground">Draft</SelectItem>
                    <SelectItem value="SENT" className="text-sidebar-foreground focus:bg-sidebar-muted/20 focus:text-sidebar-foreground">Sent</SelectItem>
                    <SelectItem value="PAID" className="text-sidebar-foreground focus:bg-sidebar-muted/20 focus:text-sidebar-foreground">Paid</SelectItem>
                    <SelectItem value="OVERDUE" className="text-sidebar-foreground focus:bg-sidebar-muted/20 focus:text-sidebar-foreground">Overdue</SelectItem>
                    <SelectItem value="CANCELLED" className="text-sidebar-foreground focus:bg-sidebar-muted/20 focus:text-sidebar-foreground">Cancelled</SelectItem>
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
              disabled={createInvoiceMutation.isPending}
              className="relative overflow-hidden bg-sidebar text-sidebar-foreground shadow-lg shadow-sidebar/20 hover:shadow-sidebar/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-8 group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">
                {createInvoiceMutation.isPending ? 'Creating...' : 'Create Invoice'}
              </span>
            </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={columns}
        data={invoices || []}
      />
    </div>
  );
} 