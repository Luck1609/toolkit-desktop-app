import { DataTablePaginationProps } from '../types'
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '@/components/ui/select'



export function TableRowsPerPage<TData>({
  table,
  onPageChange,
  pageSize
}: DataTablePaginationProps<TData> & {onPageChange: ((value: number) => void) | undefined, pageSize: number}) {


  return (
    <div className="flex items-center space-x-2">
      <p className="text-sm font-medium">Rows per page</p>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => onPageChange ? onPageChange(Number(value)) : {}}
      >
        <SelectTrigger className="h-8 w-[70px] dark:!bg-dark-border">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top" className="dark:!bg-dark-border">
          {[10, 20, 30, 40, 50, 100].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`} className="dark:!bg-dark-border dark:hover:!bg-dark-background">
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
