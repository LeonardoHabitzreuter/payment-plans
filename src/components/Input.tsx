import React from "react"
import { cn } from "../utils"

export type Props = {
  leftIcon?: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, Props>(({ className, type, leftIcon, ...props }, ref) => (
  <div className="relative">
    {leftIcon && (
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-gray-500 sm:text-sm">$</span>
      </div>
    )}

    <input
      type={type}
      ref={ref}
        className={cn(
        'px-3 py-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm aria-[invalid="true"]:ring-red-500',
        leftIcon && 'pl-7',
        className
      )}
      {...props}
    />
  </div>
))

export default Input
