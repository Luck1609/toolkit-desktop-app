import { useFormContext } from "react-hook-form";
import {
  // Textarea as TextareaComponent,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Textarea as TextareaComponent } from "../ui/textarea";

export default function Textarea({
  name,
  className,
  label,
  placeholder,
  rows,
  maxLength,
  ...props
}: {
  name: string;
  className?: string;
  label?: string;
  placeholder?: string;
  rows?: number
  maxLength?: number
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: {onChange, value} }) => (
        <div className="form-field">
          <FormLabel>{label}</FormLabel>
          <TextareaComponent
            placeholder={placeholder}
            className={cn("input", className)}
            onChange={onChange}
            value={value }
            rows={rows}
            {...props}
          />
          <FormMessage />
        </div>
      )}
    />
  );
}
