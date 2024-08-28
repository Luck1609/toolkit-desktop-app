import { DynamicActionButtons } from '@/components/custom/data-table/action-buttons'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { Extract } from './resource/types';
import { useLocation } from 'react-router-dom';


const columns = (): ColumnDef<Extract>[] => {
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
      accessorKey: "name",
      header: "Applicant name",
    },
    {
      accessorKey: "phone",
      header: "Phone No.",
    },
    {
      accessorKey: "Plot No.",
      header: "Land use",
    },
    {
      accessorKey: "use",
      header: "Land use",
    },
    {
      accessorKey: "allocation_date",
      header: "Alloc. date",
    },
    {
      accessorKey: "registration_date",
      header: "Registration date",
    },
    {
      id: "actions",
      cell: ({ row: { original: { id } } }) => {
        return (
          <DynamicActionButtons
            actions={{
              view: {
                show: true,
                url: `${url}/${id}/extract`
              },
              edit: {
                show: true,
                url: `${url}/edit/${id}`
              },
              delete: true,
              url: `/extract/${id}`,
              mutate: '/extract',
              name: 'Extract'
            }}
          />
        )
      }
    },
  ]
}

export default columns