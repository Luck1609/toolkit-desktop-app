import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormField } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import { stringObject } from "@/types";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function Datepicker({ name, className }: stringObject) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="default-outline"
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !value && "text-muted-foreground", className
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? format(value, "PPP") : <span>Pick a value</span>}
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
        );
      }}
    />
  );
}
