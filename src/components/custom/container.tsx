import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export default function Container({ children, className }: {children: ReactNode, className?: string}) {
  return (
    <div className="px-8">
      <section className={cn("w-full px-3 mx-auto bg-theme py-4 lg:py-7 lg:px-5 rounded-lg", className)}>
        {children}
      </section>
    </div>
  );
}
