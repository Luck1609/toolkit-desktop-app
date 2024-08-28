import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input as FormInput } from "../ui/input";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

export default function Range({
  name,
  className,
  label
}: {
  name: string;
  className?: string;
  label?: string;
  placeholder?: string;
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value = [0], onChange } }) => (
        <div className="w-full">
          <Label className="mb-3 inline-block">{label}</Label>
          <Slider
            defaultValue={value}
            max={100}
            step={1}
            onChange={onChange}
            className={cn("w-full", className)}
            // {...props}
          />
        </div>
      )}
    />
  );
}
