import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
} from '@saas-app/ui';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Plus, Pencil, Trash } from 'lucide-react';
import { api } from '../../lib/axios';

interface Customer {
  id: string;
  contact: string;
  company: string;
  email: string;
  phone?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'contact',
    header: 'Contact Name',
  },
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: { row: Row<Customer> }) => (
      <div className={`capitalize ${
        row.original.status === 'ACTIVE' ? 'text-green-600' :
        row.original.status === 'SUSPENDED' ? 'text-red-600' :
        'text-gray-600'
      }`}>
        {row.original.status.toLowerCase()}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }: { row: Row<Customer> }) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          {`${row.original.id} usedd`}
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export function CustomersPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await api.get<Customer[]>('/customers');
      return response.data;
    },
  });
console.log({isLoading})
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage your customer relationships
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Customer</DialogTitle>
              <DialogDescription>
                Add a new customer to your platform
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Contact Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Acme Inc" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@acme.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1 234 567 890" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button>Save Customer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={columns}
        data={customers || []}
        searchKey="contact"
      />
    </div>
  );
} 