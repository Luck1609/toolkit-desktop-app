import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input as FormInput } from "../ui/input";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Input({
  name,
  className,
  label,
  placeholder,
  disabled = false,
  type = "text"
}: {
  name: string;
  type?: string;
  className?: string;
  label?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: {onBlur, onChange, value}, fieldState: {error} }) => (
        <FormItem className={cn("w-full space-y-1 form-field", error ? 'error' : '')}>
          <FormLabel>{label}</FormLabel>
          <FormControl className="relative">
            <>
              <FormInput
                placeholder={placeholder}
                className={cn("", className)}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                disabled={disabled}
                type={type}
              />
            </>
          </FormControl>
          
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
