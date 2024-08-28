import { ReactNode, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';


export type StatusFilterProps = {
  className?: string;
} & ({
  show: true;
  trigger: string;
  label: ReactNode;
  options: {
    label: string;
    action: () => void
  }[]
} | {
  show?: false;
  component?: ReactNode
})

export default function StatusFilter(props: StatusFilterProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className={cn("col-span-3 lg:col-span-5", props?.className)}>
      {
        props.show ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="border dark:border-input rounded-md flex items-center space-x-2">
              <span className="bg-input p-2 block">{ props.label }</span>
              <span className="">{ selected ?? props.trigger}</span>
              <ChevronDown size={18} />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="dark:text-dark-text dark:bg-dark-border">
              {
                props.options?.map(({ label, action }, index: number) => (
                  <DropdownMenuItem key={index.toString()} onClick={() => {
                    action()
                    setSelected(label)
                  }}>{label}</DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
        ) : props?.component && props.component
      }
    </div>
  )
}
