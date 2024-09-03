import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';


interface IDatePicker {
  name: string;
  className?: string;
  label: ReactNode;
}

export default function Datepicker({ name, className, label }: IDatePicker) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange }, formState: {errors} }) => {
        return (
        <FormItem className={cn("w-full space-y-1 form-field", errors[name] ? 'error' : '')}>
          <FormLabel className="block mt-1.5 mb-1">{label}</FormLabel>

          <DatePicker
            onChange={onChange}
            value={value}
            calendarIcon={<CalendarIcon />}
            className={cn("h-14 border-slate-300 rounded dark:bg-input w-full border dark:!border-input pl-3", className)}
            clearIcon={<X size={20} className="hover:text-danger text-slate-500 dark:text-slate-100" />}
          />
          <FormMessage />
        </FormItem>
        );
      }}
    />
  );
}
