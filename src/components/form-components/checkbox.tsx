import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox as CheckboxComponent } from "../ui/checkbox";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type OptionTypes = {
  label: ReactNode;
  value: string;
  className?: string;
};

export default function Checkbox({
  options = [],
  name,
  label,
  className,
}: {
  options: OptionTypes[];
  name: string;
  className?: string;
  label?: ReactNode;
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value: formValue = [], onChange } }) => (
        <>
          <FormLabel>{label}</FormLabel>
          <FormItem className={cn("", className)}>
            {options.map(({ value, label }: OptionTypes, index) => (
              <FormItem
                key={index.toString()}
                className="flex flex-row items-center space-x-3 space-y-0"
              >
                <FormControl>
                  <CheckboxComponent
                    checked={formValue?.includes(value)}
                    onCheckedChange={(checked: boolean) => {
                      return checked
                        ? onChange([...formValue, value])
                        : onChange(
                            formValue?.filter((item: string) => item !== value),
                          );
                    }}
                  />
                </FormControl>
                <FormLabel className="font-normal">{label}</FormLabel>
              </FormItem>
            ))}
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  );
}
