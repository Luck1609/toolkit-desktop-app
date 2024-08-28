import React, { Fragment, ReactNode, useRef } from "react";
import { useFormContext } from "react-hook-form";

type FileUploaderType = {
  name: string;
  label: ReactNode;
  className?: string;
  maxFiles: number
}

// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Renderer from "./renderer";
import { Plus } from "lucide-react";
import { FormField, FormMessage } from "@/components/ui/form";

export default function MultiUploader({
  name,
  className,
  label,
  maxFiles = 5,
}: FileUploaderType) {
  const {
      watch,
      setValue,
      control,
      trigger
      // formState: { errors },
    } = useFormContext(),
    ref = useRef<HTMLInputElement | null>(null);

  const value = watch(name) ?? [],
    triggerInput = () => {
      if (ref.current) {
        ref.current.click();
      }
    };

  const handleChange = () => {
    const files = ref.current?.files as FileList;

    if (files) {
      const images = Object.values(value.concat(files)[0]);
      setValue(name, images);
      trigger(name)
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <div className="flex flex-col form-field">
          <label className="mb-2 block text-sm font-semibold">
            {label} <span className="text-danger">(Maximum {maxFiles})</span>
          </label>

          <input
            ref={ref}
            type="file"
            className="hidden"
            multiple={true}
            onChange={handleChange}
          />

          <div className="grid gap-3 lg:grid-cols-5">
            {value.length > 0 &&
              value.map((img: File, index: number) => (
                <Fragment key={index.toString()}>
                  <Renderer
                    {...{
                      img,
                      triggerInput,
                      selectedFile: ref.current?.files,
                      name,
                      index,
                    }}
                  />
                </Fragment>
              ))}

            {value.length < maxFiles && (
              <Button
                className="flex h-32 w-full items-center space-x-1 border-2 border-dashed border-slate-400 bg-transparent text-slate-400 hover:border-slate-500 hover:bg-transparent hover:text-slate-500"
                type="button"
                onClick={triggerInput}
              >
                <Plus size={16} />
                <span>Add image</span>
              </Button>
            )}
          </div>

          <FormMessage />
        </div>
      )}
    />
  );
}
