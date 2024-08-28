;

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { GalleryThumbnails, MonitorCheck, Upload, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { cn, getBaseURL } from "@/lib/utils";
import { TooltipButton } from "@/components/custom/tooltip-button";

export default function Renderer({
  img,
  name,
  index,
  dimensions,
}: {
  img?: File | string;
  index: number;
  name: string;
  dimensions: string;
}) {
  const { setValue, watch, resetField } = useFormContext(), files = watch(name), ref = useRef<HTMLInputElement | null>(null);
  const isFile = (file: File | string) => file instanceof File
  const thumbnailId = watch('thumbnail')

  // Replace image
  const handleChange = () => ref.current?.click()

  const removeImg = () => {
    if (index !== undefined && index >= 0) {
      const remaining = files.filter((file: File | string, filterIndex: number) => filterIndex !== index)

      setValue(name, remaining)
    }
    else {
      console.log('Stray bullet', index)
      setValue(name, '')
      resetField(name, { keepError: false, keepDirty: false, keepTouched: false })
    }

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

  console.log('Image details from renderer', img)

  return (
    <div className={cn("w-full relative theme-border rounded-lg group", img instanceof File ? 'flex items-center' : '')}>
      <div className="absolute right-1 top-1 flex items-center space-x-2">
        <TooltipButton label="Replace image">
          <Button
            className="h-auto rounded-full !bg-green-500 p-1 !hover:bg-green-400"
            type="button"
            onClick={handleChange}
          >
            <Upload size={16} />
          </Button>
        </TooltipButton>
        <TooltipButton label="Remove image">
          <Button className="h-auto rounded-full !bg-danger p-1 !hover:bg-danger hover:bg-opacity-90" type="button" onClick={removeImg}>
            <X size={16} />
          </Button>
        </TooltipButton>


        <input
          type="file"
          ref={ref}
          id=""
          className="hidden"
          onChange={replaceImage}
        />
      </div>

      <div className={cn("relative rounded-l-md overflow-hidden mr-4", dimensions)}>
        {img && (
          <img src={!(img instanceof File) ? `${getBaseURL(img, true)}` : URL.createObjectURL(img)} alt="" fill />
        )}

      </div>

      {
        img && isFile(img) && (
          <div className="text-sm">
            <div className="flex space-x-2">
              <label className="">Name:</label>
              <span>{img?.name}</span>
            </div>
            <div className="flex space-x-2">
              <label className="">Size:</label>
              <span>{(img?.size / (1024 * 1024)).toFixed(2)}mb</span>
            </div>
            <div className="flex space-x-2">
              <label className="">Type:</label>
              <span>{img?.type}</span>
            </div>
          </div>
        )
      }

      {/* {console.log('Thumbnail ID', thumbnailId)} */}

      {
        thumbnailId - 1 === index ? (
          <TooltipButton label="Default thumbnail">
            <Button variant="secondary" className="inline-flex py-1 px-2.5 text-xs absolute bottom-1 right-1 space-x-1 !bg-opacity-25 text-secondary hover:!text-white">
              <MonitorCheck size={18} />
            </Button>
          </TooltipButton>
        ) : (
          <TooltipButton label="Set as thumbnail">
            <Button className="inline-flex py-1 px-2.5 text-xs absolute bottom-1 right-1 space-x-1" onClick={() => setValue('thumbnail', (index + 1))}>
              <GalleryThumbnails size={18} />
            </Button>
          </TooltipButton>
        )
      }
    </div>
  );
};
