import { useFormContext } from "react-hook-form";
import Input from "react-phone-number-input/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";



interface InputProps {
  label?: string;
  name: string;
  className?: string;
  placeholder?: string;
  type?: "text" | "password" | "number";
  disabled?: boolean;
}

export default function PhoneNumberInput({
  name,
  label = "",
  className,
  placeholder = "",
  disabled = false,
}: InputProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn("w-full space-y-1 form-field", error ? 'error' : '')}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <>
              <Input
                country="GH"
                className={`pl-3 h-14 rounded ${className}`}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
              />

              <FormMessage />
            </>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
