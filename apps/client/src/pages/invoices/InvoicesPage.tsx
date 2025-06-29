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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@saas-app/ui';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Plus, Pencil, Trash } from 'lucide-react';
import { api } from '../../lib/axios';

interface Invoice {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  dueDate: string;
}

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: 'number',
    header: 'Invoice Number',
  },
  {
    accessorKey: 'customerName',
    header: 'Customer',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <div>
        ${row.original?.amount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </div>
    ),
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => (
      <div>
        {new Date(row.original.dueDate).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: { row: Row<Invoice> }) => (
      <div className={`capitalize ${
        row.original.status === 'PAID' ? 'text-green-600' :
        row.original.status === 'OVERDUE' ? 'text-red-600' :
        'text-yellow-600'
      }`}>
        {row.original.status.toLowerCase()}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }: { row: Row<Invoice> }) => (
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

export function InvoicesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: invoices, isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const response = await api.get<Invoice[]>('/invoices');
      return response.data;
    },
  });
console.log({isLoading})
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
          <p className="text-muted-foreground">
            Manage your invoices and payments
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Invoice</DialogTitle>
              <DialogDescription>
                Create a new invoice for a customer
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Customer 1</SelectItem>
                    <SelectItem value="2">Customer 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button>Create Invoice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={columns}
        data={invoices || []}
        searchKey="number"
      />
    </div>
  );
} 