import { DynamicActionButtons } from '@/components/custom/data-table/action-buttons'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { Sector } from './resource/types';
import { useLocation } from 'react-router-dom';
// import { Eye } from 'lucide-react';



const columns = (): ColumnDef<Sector>[] => {
  const { pathname: url } = useLocation()

  console.log('Column pathname', url)

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
      header: "Sector name",
    },
    {
      accessorKey: 'initials',
      header: "Initials",
    },
    {
      header: "Blocks",
      cell: ({ row: { original: {blocks} } }) => (
        <>
          {
            JSON.parse(blocks)?.length ?? 0
          }
        </>
      ),
    },
    {
      id: "actions",
      cell: ({ row: { original: { id } } }) => {
        return (
          <DynamicActionButtons
            actions={{
              view: {
                show: false,
                // component: <>
                //   <AlertDialog
                //     Icon={<Eye />}
                //     text="View"
                //     data={}
                //   />
                // </>
              },
              edit: {
                show: true,
                url: `${url}/edit/${id}`
              },
              delete: true,
              url: `/sector/${id}`,
              mutate: '/sector',
              name: 'Sector'
            }}
          />
        )
      }
    },
  ]
}

export default columns