import React from "react"
import { cn } from "../utils"

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>

const ErrorMessage = React.forwardRef(({ className, ...props }: Props, ref: React.ForwardedRef<HTMLParagraphElement>) => (
  <p
    ref={ref}
    className={cn(
      'text-sm font-medium text-red-500',
      className
    )}
    {...props}
  />
))

export default ErrorMessage
