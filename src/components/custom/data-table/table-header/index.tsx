import { cn } from "@/lib/utils";
import AddButton, { AddButtonProps } from "./add-button";
import SearchComponent, { SearchComponentProps } from "./search-component";
import StatusFilter, { StatusFilterProps } from "./status-filter";

type BaseHeaderProps = {
  statusFilterProps: StatusFilterProps;
  searchComponentProps: SearchComponentProps;
  addButtonProps: AddButtonProps;
  className: string;
}

export default function BaseTableHeader({
  statusFilterProps,
  searchComponentProps,
  addButtonProps,
  className
}: Partial<BaseHeaderProps>) {
  return (
    <div className={cn("w-full grid lg:grid-cols-8 lg:mb-5 py-5 px-3 lg:p-0", className)}>
      <StatusFilter {...statusFilterProps} />

      {
        searchComponentProps?.show && <SearchComponent {...searchComponentProps} />
      }

      
      {
        addButtonProps?.show && <AddButton {...addButtonProps} />
      }
    </div>
  )
}
  