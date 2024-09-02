import { ReactNode } from 'react'
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AddButtonProps = {
  className?: string;
  state?: any;
} & ({
  show: true;
  url: string;
  label: string;
} | {
  show: false;
  component?: ReactNode
})

export default function AddButton(props: AddButtonProps)
{
  
  return (
    <div className={cn("col-span-5 order-1 lg:order-2 lg:col-span-1 justify-self-end", props?.className)}>
      {
        props.show ? (
          <Link to={props.url}>
            <Button className="space-x-1 px-1.5 lg:px-2">
              <Plus size={18} />
              <span className="">{props.label}</span>
            </Button>
          </Link>
        ) : props?.component ?? null
      }
    </div>
  )
}
