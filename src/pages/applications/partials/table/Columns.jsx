import { Eye } from "lucide-react";
import Actions from "@/components/TableComponent/Actions";
import { Checkbox } from "@/components/ui/checkbox";
import { togglePreviewModal } from "@/lib/toolkit/reducers/modal";

export const columns = (dispatch) => [
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
        <Actions
          options={[
            {
              label: "View",
              icon: <Eye className="h-5 w-5" />,
              action: () =>
                dispatch(
                  togglePreviewModal({
                    data: { id },
                    show: true,
                    component: "application",
                    title: "Application details",
                  })
                ),
            },
          ]}
          editAction={{
            show: true,
            data: {
              url: `/application/${id}`,
              method: "patch",
              mutation: `/application`,
              content: "application",
              values: {},
            },
          }}
          deleteAction={{
            show: true,
            url: `/application/${id}`,
            method: "delete",
            mutation: `/application`,
            message: "application",
          }}
        />
      );
    },
  },
];
