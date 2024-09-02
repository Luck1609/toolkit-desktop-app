

import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

export type FileUploaderType = {
  name: string;
  label: ReactNode;
  className?: string;
  dimensions: string;
  btnText?: string;
} & (Multiple | Single);

type Single = {
  type: 'single';
}

type Multiple = {
  type: 'multiple'
  maxFiles: number
}

import { FormField, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import UploaderInput from "./uploader-input";

export default function FileUploader(props: FileUploaderType) {
  const { control, } = useFormContext()

  return (
    <FormField
      control={control}
      name={props.name}
      render={({ fieldState: { error } }) => (
        <div className={cn("flex flex-col form-field", error ? 'error' : '')}>

          <UploaderInput {...props} />

          <FormMessage />
        </div>
      )}
    />
  );
}
