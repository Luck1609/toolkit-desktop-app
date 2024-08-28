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
      header: ({ table }) =>
        // displayCheckbox ? (
        <>
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </>,
      // ) : null,
      cell: ({ row }) =>
        // displayCheckbox ? (
        <>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </>,
      // ) : null,
      enableSorting: false,
      enableHiding: true
    },
    {
      accessorKey: "name",
      header: "Applicant name",
      cell: ({
        row: {
          original: { title, firstname, lastname },
        },
      }) => (
        <div className="">
          {title} {firstname} {lastname}
        </div>
      ),
    },
    {
      accessorKey: "application_num",
      header: "Appl. no.",
    },
    {
      accessorKey: "contact",
      header: "Phone no.",
    },
    {
      accessorKey: "use",
      header: "Use",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      header: "Plot info",
      cell: ({
        row: {
          original: { locality, sector, block, plot },
        },
      }) => (
        <>
          {locality?.name} {sector?.name} {block} {plot}
        </>
      ),
    },
    {
      accessorKey: "shelf",
      header: "Shelf",
    },
    {
      id: "actions",
      enableHiding: false,

      cell: ({
        row: {
          original: { id },
        },
      }) => {
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
        );
      },
    },
  ]
}

export default columns