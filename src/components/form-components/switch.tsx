import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch as SwitchComponent } from "../ui/switch";
import { cn } from "@/lib/utils";

export default function Switch({
  name,
  label,
  placeholder,
  className
}: {
  name: string;
  label?: string;
  className?: string;
  placeholder: string;
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormItem>
          <FormLabel htmlFor={name} className={cn('mb-3 inline-block', className)}>{label}</FormLabel>
          
          <div className="flex items-center space-x-3">
            <SwitchComponent id={name} onCheckedChange={onChange} checked={value} />
            <FormLabel htmlFor={name} className="text-base">{placeholder}</FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
