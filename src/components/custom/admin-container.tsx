import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export default function AdminContainer({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn("px-5", className)}>{children}</div>
  )
}
