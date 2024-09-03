import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormField, FormItem, FormLabel } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ReactNode } from "react";


interface IDatePicker {
  name: string;
  className?: string;
  label: ReactNode;
  placeholder?: string;
}

export default function Datepicker({ name, className, label, placeholder }: IDatePicker) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange }, formState: {errors} }) => {
        return (
        <FormItem className={cn("w-full space-y-1 form-field", errors[name] ? 'error' : '')}>
          <FormLabel className="block mt-1.5 mb-1">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className={cn(
                  "w-full bg-transparent border border-slate-300 hover:bg-slate-100 dark:border-input dark:bg-input h-14 justify-start text-left font-normal",
                  !value && "text-muted-foreground", className
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? format(value, "PPP") : <span>{placeholder ?? 'Pick a value'}</span>}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={value}
                onSelect={onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
        );
      }}
    />
  );
}
