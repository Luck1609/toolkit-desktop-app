import { DynamicActionButtons } from '@/components/custom/data-table/action-buttons'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { Session } from './resource/types';
import { useLocation } from 'react-router-dom';
import { MonitorCheck, MonitorX } from 'lucide-react';


const columns = (): ColumnDef<Session>[] => {
  const { pathname: url } = useLocation()
  
  console.log('colymn path', url)

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "quarter_name",
      header: "Name",
    },
    {
      accessorKey: "start_date",
      header: "Start Date",
    },
    {
      accessorKey: "defered",
      header: "Deferred",
    },
    {
      accessorKey: "approved",
      header: "Approved",
    },
    {
      accessorKey: "total",
      header: "Total",
    },
    {
      accessorKey: "end_date",
      header: "End Date",
    },
    {
      header: "Status",
      cell: ({ row: { original: { status } } }) => <>
        <span className={`text-sm p-2 px-4 rounded-md bg-opacity-25 inline-flex items-center space-x-2 ${!status ? "bg-rose-500 text-rose-500" : "bg-green-500 text-green-500 p-1"}`}>
          {status
            ? <>
              <MonitorCheck />
              <span className="">Active</span>
            </>
            : <>
              <MonitorX />
              <span className="">Inactive</span>
            </>
          }
        </span>
      </> 
    },
    {
      id: "actions",
      cell: ({ row: { original: { id } } }) => {
        return (
          <DynamicActionButtons
            actions={{
              view: {
                show: true,
                url: `${url}/${id}/session`
              },
              edit: {
                show: true,
                url: `${url}/edit/${id}`
              },
              delete: false,
              url: `/session/${id}`,
              mutate: '/session',
              name: 'Session'
            }}
          />
        )
      }
    },
  ]
}

export default columns