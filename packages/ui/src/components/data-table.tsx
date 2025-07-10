import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"
import { cn } from "../lib/utils"
import { Button } from "./button"
import { ChevronLeft, ChevronRight, ArrowUpDown, Search, InboxIcon } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row: TData) => void
  title?: string
  description?: string
  emptyMessage?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  title,
  description,
  emptyMessage = "No data available",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [hoveredRow, setHoveredRow] = React.useState<number | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")

  // Filtering logic: filter data based on searchQuery and visible columns
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;
    const lower = searchQuery.toLowerCase();
    return data.filter((row) => {
      return columns.some((col) => {
        // Only filter on columns with a string accessorKey
        if ('accessorKey' in col && typeof col.accessorKey === 'string') {
          const accessor = col.accessorKey;
          // @ts-ignore
          const value = row[accessor];
          if (value == null) return false;
          return String(value).toLowerCase().includes(lower);
        }
        return false;
      });
    });
  }, [data, columns, searchQuery]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div className="relative w-full space-y-4">
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && (
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground/70">{description}</p>
          )}
        </div>
      )}

      <div className="rounded-2xl border-0 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl shadow-indigo-500/5 backdrop-blur-sm overflow-hidden transition-all duration-200">
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full h-10 rounded-xl bg-white/5 px-10 text-sm border-0 ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500/30 placeholder:text-muted-foreground/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="relative overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="h-12 px-4 text-left align-middle font-medium text-muted-foreground/70 transition-colors first:rounded-tl-lg last:rounded-tr-lg"
                    >
                      {header.isPlaceholder ? null : (
                        <Button
                          variant="ghost" 
                          size="sm"
                          className="-ml-3 h-8 text-muted-foreground/70 hover:text-indigo-400 hover:bg-white/5 data-[sorting=true]:text-indigo-400 group"
                          onClick={header.column.getToggleSortingHandler()}
                          data-sorting={header.column.getIsSorted()}
                        >
                          <span className="font-medium">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                          <ArrowUpDown className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "group border-b border-white/5 transition-all duration-200",
                      index % 2 === 0 ? "bg-transparent" : "bg-white/5",
                      onRowClick && "cursor-pointer",
                      hoveredRow === index && "bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-rose-500/10 shadow-md scale-[1.002] relative z-10",
                      hoveredRow !== null &&
                        hoveredRow !== index &&
                        "opacity-50"
                    )}
                    onClick={() => onRowClick?.(row.original)}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="p-4 align-middle text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="h-[200px] text-center align-middle"
                  >
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <div className="rounded-full bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-rose-500/20 p-3 animate-pulse">
                        <InboxIcon className="h-6 w-6 text-indigo-500" />
                      </div>
                      <p className="mt-1.5 text-base font-medium text-muted-foreground/80">
                        {emptyMessage}
                      </p>
                      <p className="text-xs text-muted-foreground/60">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between space-x-2 py-4 px-4 border-t border-white/10 bg-white/5">
          <div className="flex-1 text-sm text-muted-foreground/70">
            {table.getFilteredRowModel().rows.length} total rows.
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="hover:bg-white/5 hover:text-indigo-400 disabled:opacity-50 text-muted-foreground/70 border-white/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium text-muted-foreground/70">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="hover:bg-white/5 hover:text-indigo-400 disabled:opacity-50 text-muted-foreground/70 border-white/10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 