import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";


interface ISelect {
  name: string,
  options: [],
  label?: string
}

export function SelectField({ name, options = [], label }: ISelect) {
  const { control } = useFormContext();

  return (
    <FormField 
      control={control}
      name={name}
      render={({field}) => (
        <FormItem className="select">
          <FormLabel className="text-slate-400">{ label }</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {
                options?.map(({label: labelProp, value}) => (
                  <SelectItem value={value} key={value}>{labelProp}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>   
      )}
    />
  );
}
