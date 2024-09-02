import { Fragment } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Renderer from './renderer';
import { FileUploaderType } from '.';
import { useFormContext } from 'react-hook-form';
// import { ImageType } from '@/lib/global-types';


type Handler = Omit<FileUploaderType, 'label'> & {
  className?: string | undefined;
  triggerInput: () => void;
  dimensions: string;
  maxFiles: number;
  btnText?: string;
}


export default function AddImageButton(props: Handler) {
  const { type, dimensions, triggerInput, className, name  } = props

  const { watch } = useFormContext()
  const value = watch(name)

  console.log('Image uplader current value', value)


  return (
      <div className={cn("grid", type === 'single' ? '' : 'gap-3 lg:grid-cols-3')}>

        {
          value && (
            type === 'single' ? (
              <Renderer
                {...{
                  img: value,
                  name: name,
                  dimensions: dimensions,
                  index: 1
                }}
              />
            ) : (
              value.length > 0 &&
              value.map((img: File, index: number) => (
                <Fragment key={index.toString()}>
                  <Renderer
                    {...{
                      img,
                      name,
                      index,
                      dimensions,
                    }}
                  />
                </Fragment>
              ))
            )
          )
        }

        
        {((type === 'single' && !value) || (type === 'multiple' && value.length < props.maxFiles)) && (
          <Button
            className={cn("flex items-center space-x-1 border-2", className, dimensions)}
            type="button"
            onClick={triggerInput}
          >
            <Plus size={16} />
            <span>{props.btnText ?? 'Add image'}</span>
          </Button>
        )}
      </div>
  )
}
