import { DynamicActionButtons } from '@/components/custom/data-table/action-buttons'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { Staff } from './resource/types';
import { useLocation } from 'react-router-dom';
import { CircleCheckBig, CircleX } from 'lucide-react';
import { TooltipButton } from '@/components/custom/tooltip-button';


const columns = (): ColumnDef<Staff>[] => {
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
      header: "Name",
      cell: ({
        row: {
          original: { firstname, lastname, title },
        },
      }) => (
        <>
          {title} {firstname} {lastname}
        </>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "contact",
      header: "Phone no.",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({
        row: {
          original: { status },
        },
      }) => (
        <TooltipButton label={status ? "Active" : "Inactive"}>
          {
            status ? (
              <CircleCheckBig size={18} className="text-green-400" />
            ) : (
              <CircleX size={18} className="text-red-400" />
            )
          }
        </TooltipButton>
      ),
    },
    {
      id: "actions",
      cell: ({ row: { original: { id } } }) => {
        return (
          <DynamicActionButtons
            actions={{
              view: {
                show: true,
                url: `${url}/${id}/sectors`
              },
              edit: {
                show: true,
                url: `${url}/edit/${id}`
              },
              delete: true,
              url: `/locality/${id}`,
              mutate: '/locality',
              name: 'Locality'
            }}
          />
        )
      }
    },
  ]
}

export default columns