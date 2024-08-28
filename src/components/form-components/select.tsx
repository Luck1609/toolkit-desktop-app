import {
  Select as SelectField,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { FormField, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";
import { SelectType } from "@/lib/global-types";


export function Select({
  name,
  options,
  label,
  placeholder
}: {
  name: string;
  options: SelectType[];
  label: string;
  placeholder?: string
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value = "" }, fieldState: { error } }) => (
        <div className={cn("form-field", error ? 'error' : '')}>
          <label className="mb-1 inline-block text-sm font-medium">
            {label}
          </label>
          <SelectField onValueChange={onChange} value={value}>
            <SelectTrigger className="h-14 !bg-input">
              <SelectValue placeholder={placeholder} className="" />
            </SelectTrigger>

            <SelectContent className="max-h-72 bg-white dark:!bg-input dark:text-dark-default">
              <SelectGroup>
                {options?.map(({ label: labelProp, value }: SelectType, index) => (
                  <SelectItem
                    key={`${value}_${index}`}
                    className="cursor-pointer p-3 pl-8 hover:!text-secondary hover:!bg-secondary hover:!bg-opacity-15"
                    value={value}
                  >
                    {labelProp}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </SelectField>

          <FormMessage />
        </div>
      )}
    />
  );
}
