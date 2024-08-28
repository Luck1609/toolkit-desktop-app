import { useFormContext } from "react-hook-form";
import Input from "react-phone-number-input/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";



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
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <>
              <FormLabel className="text-slate-400">{label}</FormLabel>
              <Input
                country="GH"
                className={`pl-3 h-14 ${className}`}
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
