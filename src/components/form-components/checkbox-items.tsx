import { Controller, useFormContext } from "react-hook-form";
// import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { ReactNode } from "react";

export const CheckboxItems = ({ errorFieldClassName = "", options = [], name, label }: { errorFieldClassName?: string; options: { label: ReactNode, value: string }[]; name: string, label: string}) => {
  // const { control, watch } = useFormContext();
  const { control, watch, setValue, trigger } = useFormContext(), checked = watch(name);

  // console.log("Checked items", checked)

  const handleCheck = (value: string) => () => {
    const items = checked.indexOf(value) === -1 ? [...checked, value] : checked.filter((label: string) => label !== value);

    setValue(name, items, { shouldValidate: true });
    trigger(name)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <>
          {options.map(({ label, value }) => (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              key={value.split(" ").join("-")}
            >
              <Checkbox
                id={value}
                checked={checked.includes(value)}
                onCheckedChange={handleCheck(value)}
              />
              <label htmlFor={value} className="text-color dark:text-slate-300">{label}</label>
            </div>
          ))}
        </>
      )}
    />
  );
};
