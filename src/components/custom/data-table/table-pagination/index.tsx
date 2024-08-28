import React from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DataTablePaginationProps } from '../types'
import { TableSelection } from './table-selection'
import { TableRowsPerPage } from './table-rows-per-page'
import { PaginationMeta } from '@/app/hooks/use-pagination';
import { TableMeta } from '@tanstack/react-table';


export function TablePagination<TData>({
  table
}: DataTablePaginationProps<TData>) {
    const meta: TableMeta<PaginationMeta> | undefined = table.options.meta

    // console.log('Pagination componetn meta', meta?.page)
  // const onPageSizeChange = (value: number) => setValue('pageSize', value)

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-2 text-color dark:text-dark-default py-4 border-t dark:border-dark-border space-y-4 lg:space-y-0">
      {/* <TableSelection table={table} />

      <div className="flex flex-col lg:flex-row items-center space-x-6 lg:space-x-8 space-y-4 lg:space-y-0">
        <TableRowsPerPage table={table} onPageChange={onPageSizeChange} pageSize={pageSize} />

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {meta?.page} of{" "}
          {table.getPageCount()}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="admin-default-outline"
            className="h-8 w-8 p-0"
            onClick={() => setValue('page', pagination.page - 1)}
            disabled={meta?.page === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="admin-default-outline"
            className="h-8 w-8 p-0"
            onClick={() => setValue('page', pagination.page + 1)}
            disabled={meta?.page === meta?.pageCount}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div> */}
    </div>
  )
}
