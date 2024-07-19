import { cn } from "../utils"

type Props = {
  type: 'submit' | 'button'
  children: React.ReactNode
  className?: string
}

export default function Button({ type, children, className }: Props) {
  return (
    <button type={type} className={cn(
      "sticky sm:fixed bottom-8 rounded-md bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
      className
    )}>
      {children}
    </button>
  )
}