import React from "react"
import { cn } from "../utils"

export type Props = React.InputHTMLAttributes<HTMLInputElement>

// aria-invalid="true"

const Input = React.forwardRef<HTMLInputElement, Props>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
      className={cn(
      'px-3 py-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm aria-[invalid="true"]:ring-red-500',
      className
    )}
    {...props}
  />
))

export default Input
