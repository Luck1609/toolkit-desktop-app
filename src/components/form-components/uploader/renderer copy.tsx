;

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { cn, getBaseURL } from "@/lib/utils";

export default function Renderer({
  img,
  name,
  index,
  dimensions,
}: {
  img?: File | string;
  index?: number;
  name: string;
  dimensions: string;
}) {
  const { setValue, watch, resetField } = useFormContext(), files = watch(name), ref = useRef<HTMLInputElement | null>(null);
  const isFile = (file: File | string) => file instanceof File

  // Replace image
  const handleChange = () => ref.current?.click()

  const removeImg = () => {
    if (index) {
      console.log('Remove index', index)
      setValue(name, files.filter((file: File | string) => {
        if (file instanceof File) {
          file.name !== (img instanceof File ? img?.name : img)
        }
        else {
          file !== (isFile(img) ? img?.name : img)
        }
      }))
    }
    else setValue(name, '')

    // resetField(name, {keepError: false, keepDirty: false, keepTouched: false})
  }

  const replaceImage = () => {
    let images

    if (files?.length) {
      images = files.reduce((allImages: File[], currentImg: File, currentIndex: number) => ([
        ...allImages,
        currentIndex === index ? ref.current?.files?.[0] : currentImg
      ]), []);
    }
    else {
      images = ref.current?.files?.[0]
    }

    setValue(name, images)
  }

  // console.log('Image details from renderer', img)

  return (
    <div className={cn("w-full", img instanceof File ? 'flex items-center space-x-4' : '')}>
      <div className={cn("relative rounded-md overflow-hidden", dimensions)}>
        {img && (
          <Image src={!(img instanceof File) ? `${getBaseURL(img, true)}` : URL.createObjectURL(img)} alt="" fill />
        )}

        <div className="absolute right-1 top-1 flex items-center space-x-2">
          <Button
            className="h-auto rounded-full !bg-green-500 p-1 !hover:bg-green-400"
            type="button"
            onClick={handleChange}
          >
            <Upload size={16} />
          </Button>

          <Button className="h-auto rounded-full !bg-danger p-1 !hover:bg-danger hover:bg-opacity-90" type="button" onClick={removeImg}>
            <X size={16} />
          </Button>

          <input
            type="file"
            ref={ref}
            id=""
            className="hidden"
            onChange={replaceImage}
          />
        </div>
      </div>

      {
        img && isFile(img) && (
          <div className="">
            <div className="flex space-x-2">
              <label className="">Name:</label>
              <span>{img?.name}</span>
            </div>
          </div>
        )
      }
    </div>
  );
};
