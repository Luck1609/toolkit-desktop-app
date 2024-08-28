import React, { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import Input from "react-phone-number-input/input";

type InputType = {
  name: string;
  className?: string;
  label?: ReactNode;
  placeholder?: string;
}

export default function PhoneNumberInput({
  name,
  className,
  label,
  placeholder,
}: InputType) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full space-y-1 form-field">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} className={cn("h-14 w-full p-3 rounded", className)} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
