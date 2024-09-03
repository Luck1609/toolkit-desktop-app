import { DynamicActionButtons } from '@/components/custom/data-table/action-buttons'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { Extract } from './resource/schema';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';


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
      cell: (({row: {original: { firstname, lastname }}}) => <>{firstname} {lastname}</>)
    },
    {
      accessorKey: "phone_number",
      header: "Phone No.",
    },
    {
      header: "Land use",
      cell: (({row: {original: { locality, sector, block, plot_number }}}) => <>{`${locality.name}, ${sector.name}, ${block}, ${plot_number}`}</>)
    },
    {
      accessorKey: "landuse",
      header: "Land use",
    },
    {
      accessorKey: "allocation_date",
      header: "Alloc. date",
      cell: (({ row: { original: { allocation_date } } }) => <>{format(allocation_date, 'do MMM, yyyy')}</>)
    },
    {
      accessorKey: "registration_date",
      header: "Registration date",
      cell: (({ row: { original: { registration_date } } }) => <>{format(registration_date, 'do MMM, yyyy')}</>)
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