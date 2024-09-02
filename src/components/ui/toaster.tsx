import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"


const statusColors = {
  success: '!bg-green-500 !text-green-100',
  error: '!bg-red-500 !text-red-100',
  info: '!bg-blue-500 !text-blue-100',
  warning: '!bg-amber-500 !text-amber-100',
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, status, ...props }) {
        return (
          <Toast key={id} {...props} className={cn(statusColors[status])}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
