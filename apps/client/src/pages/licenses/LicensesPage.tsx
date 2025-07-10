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

interface License {
  id: string;
  maxUsers: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED' | 'CANCELLED';
  company: { name: string };
}


interface Company {
  id: string;
  name: string;
}

export function LicensesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [companyId, setCompanyId] = useState<string>('');
  const [maxUsers, setMaxUsers] = useState<number>(1);
  const [endDate, setEndDate] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Mutation for deleting license
  const deleteLicense = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/licenses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['licenses'] });
    },
    onError: (err: any) => {
      console.error('License deletion error:', err);
      // Optionally, show a toast or error message here
    },
  });

  // Fetch companies for select
  const { data: companies = [] } = useQuery<Company[]>({
    queryKey: ['companies'],
    queryFn: async () => {
      const res = await api.get<Company[]>('/companies');
      return res.data;
    },
  });

  // Licenses query
  const { data: licenses = [], isLoading } = useQuery({
    queryKey: ['licenses'],
    queryFn: async () => {
      const response = await api.get<License[]>('/licenses');
      return response.data;
    },
  });

  // Mutation for creating license
  const createLicense = useMutation({
    mutationFn: async () => {
      setFormError(null);
      if (!companyId) throw new Error('Please select a company.');
      if (!maxUsers || maxUsers < 1) throw new Error('Max users must be at least 1.');
      if (!endDate) throw new Error('Please select an expiration date.');
      const today = new Date().toISOString();
      const payload = {
        companyId,
        maxUsers,
        startDate: today,
        endDate: new Date(endDate).toISOString(),
        status: 'ACTIVE',
      };
      await api.post('/licenses', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['licenses'] });
      setIsOpen(false);
      setCompanyId('');
      setMaxUsers(1);
      setEndDate('');
    },
    onError: (err: any) => {
      console.error('License creation error:', err);
      setFormError('Failed to create license. Please try again.');
    },
  });

  const columns: ColumnDef<License>[] = [
    {
      accessorKey: 'company',
      header: 'Company',
      cell: ({ row }) => {
        const value = row.original.company?.name;
        return <span>{!value || value === '' ? '-' : value}</span>;
      },
    },
    {
      accessorKey: 'maxUsers',
      header: 'Max Users',
      cell: ({ row }) => (
        <span>{row.original.maxUsers}</span>
      ),
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
      cell: ({ row }) => (
        <span>{new Date(row.original.startDate).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
      cell: ({ row }) => (
        <span>{new Date(row.original.endDate).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        const color = status === 'ACTIVE' ? 'text-green-600' : status === 'EXPIRED' ? 'text-red-600' : status === 'CANCELLED' ? 'text-gray-400' : 'text-yellow-600';
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
            onClick={() => deleteLicense.mutate(row.original.id)}
            disabled={deleteLicense.status === 'pending'}
            className={deleteLicense.status === 'pending' ? 'opacity-50' : ''}
            title="Delete License"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

console.log({isLoading})
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
            Licenses
          </h2>
          <p className="text-muted-foreground/70">
            Manage software licenses for your customers
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              className="relative overflow-hidden bg-sidebar text-sidebar-foreground shadow-lg shadow-sidebar/20 hover:shadow-sidebar/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] gap-2 group"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-8 group-hover:translate-y-0 transition-transform duration-300" />
              <Plus className="h-4 w-4 relative z-10" />
              <span className="relative z-10">Create License</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="border-0 bg-sidebar/95 backdrop-blur-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-sidebar-foreground">Create License</DialogTitle>
              <DialogDescription className="text-sidebar-foreground/70">
                Create a new software license for a customer
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={e => {
                e.preventDefault();
                createLicense.mutate();
              }}
            >
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sidebar-foreground/90">Company</Label>
                  <Select value={companyId} onValueChange={setCompanyId}>
                    <SelectTrigger className="bg-sidebar-muted/10 border-sidebar-muted/20 focus:border-sidebar-muted/30 text-sidebar-foreground">
                      <SelectValue placeholder="Select a company" className="text-sidebar-foreground/50" />
                    </SelectTrigger>
                    <SelectContent className="bg-sidebar border-sidebar-muted/20">
                      {companies.map(c => (
                        <SelectItem key={c.id} value={c.id} className="text-sidebar-foreground focus:bg-sidebar-muted/20 focus:text-sidebar-foreground">
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxUsers" className="text-sidebar-foreground/90">Maximum Users</Label>
                  <Input
                    id="maxUsers"
                    type="number"
                    placeholder="10"
                    min="1"
                    value={maxUsers}
                    onChange={e => setMaxUsers(Number(e.target.value))}
                    className="bg-sidebar-muted/10 border-sidebar-muted/20 focus:border-sidebar-muted/30 text-sidebar-foreground placeholder:text-sidebar-foreground/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-sidebar-foreground/90">Expiration Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="bg-sidebar-muted/10 border-sidebar-muted/20 focus:border-sidebar-muted/30 text-sidebar-foreground placeholder:text-sidebar-foreground/50"
                  />
                </div>
                {formError && <div className="text-red-500 text-sm pt-2">{formError}</div>}
              </div>
              <DialogFooter className="gap-2">
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent border-sidebar-muted/20 text-sidebar-foreground/70 hover:bg-sidebar-muted/10 hover:text-sidebar-foreground"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createLicense.status === 'pending'}
                  className="relative overflow-hidden bg-sidebar text-sidebar-foreground shadow-lg shadow-sidebar/20 hover:shadow-sidebar/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-8 group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10">{createLicense.status === 'pending' ? 'Creating...' : 'Create License'}</span>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={columns}
        data={licenses || []}
      />
    </div>
  );
} 