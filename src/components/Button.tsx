import { cn } from "../utils"
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'rounded-md bg-primary px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto',
  {
    variants: {
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-12 rounded-3xl sm:px-36'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)

type Props = {
  type: 'submit' | 'button'
  children: React.ReactNode
  className?: string
} & VariantProps<typeof buttonVariants>

export default function Button({ type, children, className, size }: Props) {
  return (
    <button type={type} className={cn(buttonVariants({ size, className }))}>
      {children}
    </button>
  )
}