import { ReactNode } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipButton({ children, label }: { children: ReactNode; label: string}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          { children }
        </TooltipTrigger>
        <TooltipContent>
          <span>{label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
1