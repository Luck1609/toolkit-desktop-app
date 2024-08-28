import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { Application } from './resource/types';
import { useLocation } from 'react-router-dom';
import { DynamicActionButtons } from '@/components/custom/data-table/action-buttons';


const columns = (): ColumnDef<Application>[] => {
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
      accessorKey: "use",
      header: "Land use",
    },
    {
      header: "Plot details",
      cell: (({row: {original: { locality, sector, block }}}) => <>{locality.name}, {sector.name}, {block}</>)
    },
    {
      accessorKey: "height",
      header: "Height",
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