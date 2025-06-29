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

interface License {
  id: string;
  key: string;
  companyId: string;
  companyName: string;
  maxUsers: number;
  usedSeats: number;
  expiresAt: string;
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED';
}

const columns: ColumnDef<License>[] = [
  {
    accessorKey: 'key',
    header: 'License Key',
  },
  {
    accessorKey: 'companyName',
    header: 'Company',
  },
  {
    accessorKey: 'seats',
    header: 'Seats',
    cell: ({ row }: { row: Row<License> }) => (
      <div>
        {row.original.usedSeats} / {row.original.maxUsers}
      </div>
    ),
  },
  {
    accessorKey: 'expiresAt',
    header: 'Expires At',
    cell: ({ row }: { row: Row<License> }) => (
      <div>
        {new Date(row.original.expiresAt).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: { row: Row<License> }) => (
      <div className={`capitalize ${
        row.original.status === 'ACTIVE' ? 'text-green-600' :
        row.original.status === 'EXPIRED' ? 'text-red-600' :
        'text-yellow-600'
      }`}>
        {row.original.status.toLowerCase()}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }: { row: Row<License> }) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          {`${row?.original?.id} usedd`}
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export function LicensesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: licenses, isLoading } = useQuery({
    queryKey: ['licenses'],
    queryFn: async () => {
      const response = await api.get<License[]>('/licenses');
      return response.data;
    },
  });
console.log({isLoading})
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Licenses</h2>
          <p className="text-muted-foreground">
            Manage software licenses for your customers
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create License
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create License</DialogTitle>
              <DialogDescription>
                Create a new software license for a customer
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Company 1</SelectItem>
                    <SelectItem value="2">Company 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxUsers">Maximum Users</Label>
                <Input
                  id="maxUsers"
                  type="number"
                  placeholder="10"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiresAt">Expiration Date</Label>
                <Input
                  id="expiresAt"
                  type="date"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button>Create License</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={columns}
        data={licenses || []}
        searchKey="key"
      />
    </div>
  );
} 