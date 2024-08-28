import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        primary:
          "bg-primary ring-offset-white focus-visible:ring-primary text-white dark:ring-offset-primary dark:focus-visible:ring-sky-300",
        warn:
          "bg-amber-500 ring-offset-white focus-visible:ring-amber-500 text-white dark:ring-offset-amber-500 dark:focus-visible:ring-amber-300",
        secondary:
          "bg-input ring-offset-white focus-visible:ring-input text-white dark:ring-offset-input dark:focus-visible:ring-slate-300",
        success:
          "bg-success ring-offset-white focus-visible:ring-emerald-500 text-white dark:ring-offset-emerald-500 dark:focus-visible:ring-teal-300",
        danger:
          "bg-danger ring-offset-white focus-visible:ring-rose-500 text-white dark:ring-offset-rose-500 dark:focus-visible:ring-slate-300",
        input:
          "bg-slate-200 text-color hover:bg-slate-300 dark:bg-input ring-offset-white focus-visible:ring-rose-500 dark:text-white dark:ring-offset-rose-500 dark:focus-visible:ring-slate-300",

        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "input",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
