import { PaginationMeta } from "@/app/hooks/use-pagination";
import { Prettify } from "@/types";
import { ColumnDef, Table } from "@tanstack/react-table";
import { ReactNode } from "react";

export interface DataTablePaginationProps<TData> {
  table: Table<TData>
  meta?: PaginationMeta
}


export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[];
  components?: {
    header?: (table: Table<TData>) => ReactNode
    actions?: (table: Table<TData>) => ReactNode
  }
  meta?: PaginationMeta
  isLoading?: boolean
}


export type Options = 'Delete' | 'Publish' | 'Unpublish'

type Props = {
  show: boolean;
  url: string;
} | undefined

export type ActionsData = {
  view: Props;
  edit: Props;
  deactivate: {
    show: boolean;
    status: Options
  };
  delete: boolean;
  mutate: string | undefined;
  url: string;
  name: string;
}

export type DynamicButtonGroup = Prettify<{
  buttonGroup?: {
    label: ReactNode;
    action: () => void
  }[]
  actions?: Partial<ActionsData>
}>



export type DialogAlert = {
  title: string;
  description: string;
  url: string;
}