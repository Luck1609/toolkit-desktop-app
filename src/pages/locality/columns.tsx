import { DynamicActionButtons } from '@/components/custom/data-table/action-buttons'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { Locality } from './resource/schema';
import { useLocation } from 'react-router-dom';
import Helper from '@/helper';


const { isJsonString } = Helper

const columns = (): ColumnDef<Locality>[] => {
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
      header: "Locality name",
    },
    {
      accessorKey: "initials",
      header: "Initials",
    },
    {
      header: "Sectors",
      cell: ({ row: { original: { sectors } } }) => <>{sectors?.length}</>,
    },
    {
      header: "Blocks",
      cell: ({ row: { original: {sectors} } }) => (
        <>
          {
            sectors && 
            sectors
            .reduce((sectorBlocks, { blocks }) =>
                isJsonString(blocks)?.length + sectorBlocks,
              0
            )}
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