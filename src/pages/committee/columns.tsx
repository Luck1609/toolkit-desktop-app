import { DynamicActionButtons } from '@/components/custom/data-table/action-buttons'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { CommitteeMember } from './resource/types';
import { useLocation } from 'react-router-dom';
import { MonitorCheck } from 'lucide-react';


const columns = (): ColumnDef<CommitteeMember>[] => {
  const {pathname: path} = useLocation()
  const url = path.replace('/admin', '')

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
      header: "Name",
      cell: (({row: {original: { firstname, lastname, title }}}) => <>{`${title} ${firstname} ${lastname}`}</>)
    },
    {
      accessorKey: "contact",
      header: "Phone No.",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      header: "Status",
      cell: ({ row: { original: { status } } }) => <>
        <span className={`text-sm p-2 px-4 rounded-md bg-opacity-25 inline-flex items-center space-x-2 ${status ? "bg-rose-500 text-rose-500" : "bg-green-500 text-green-500 p-1"}`}>
          {status
            ? <>
                <MonitorCheck />
                <span className="">Inactive</span>
              </> 
            : <>
                <MonitorCheck />
                <span className="">Active</span>
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
                url: `${url}/${id}`
              },
              edit: {
                show: true,
                url: `${url}/edit/${id}`
              },
              delete: true,
              url: `/categories/${id}`,
              mutate: '/categories',
              name: 'Category'
            }}
          />
        )
      }
    },
  ]
}

export default columns