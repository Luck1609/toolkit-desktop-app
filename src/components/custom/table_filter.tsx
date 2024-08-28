
import { cn } from "@/lib/utils";
import { debounce } from "lodash";
import { FormEvent } from "react";

type TableFilterType = {
  setParams: <DataType = object>(prev: DataType) => object,
  className: string
}

export default function TableFilter({ setParams, className }: TableFilterType) {
  const onChange = debounce((e: FormEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setParams((prev) => ({ ...prev, search: value }));
  });

  return (
    <div>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        onChange={onChange}
        className={cn("p-2 rounded w-60", className)}
      />
    </div>
  );
}
