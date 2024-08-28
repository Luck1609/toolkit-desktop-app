;

import React, { ReactNode, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function SingleUploader({
  img,
  name,
  index,
  label
}: {
  img?: File;
  index?: number;
  name: string;
  label: ReactNode;
}) {
  const { setValue, watch } = useFormContext(), files = watch(name), ref = useRef<HTMLInputElement | null>(null);

  // Replace image
  const replaceImage = () => ref.current?.click()

  const removeImg = () => {
    setValue(name, files.filter((file: File) => file.name !== img?.name))
  }

  const handleChange = () => {
    const images = files.reduce((allImages: File[], currentImg: File, currentIndex: number) => ([
      ...allImages,
      currentIndex === index ? ref.current?.files?.[0] : currentImg
    ]), []);

    setValue(name, images)
  }

  return (
    <div className="form-field">
      <label className="mb-2 block text-sm font-semibold">
        {label}
      </label>

      <AspectRatio ratio={5 / 1} className="w-[183px] relative bg-white dark:bg-dark-card rounded-md">
        {img && (
          <Image src={URL.createObjectURL(img)} alt="" fill />
        )}
        <div className="absolute right-1 top-1 flex items-center space-x-2">
          <Button
            className="h-auto rounded-full bg-green-500 p-1 hover:bg-green-400"
            type="button"
            onClick={replaceImage}
          >
            <Upload size={16} />
          </Button>

          <Button className="h-auto rounded-full bg-danger p-1 hover:bg-danger hover:bg-opacity-90" onClick={removeImg}>
            <X size={16} />
          </Button>

          <input
            type="file"
            ref={ref}
            id=""
            className="hidden"
            onChange={handleChange}
          />
        </div>
      </AspectRatio>
    </div>
  );
};
