import { cn } from "../utils"

type Props = {
  hasError?: boolean
} & React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

export default function Label({ children, className, hasError: error, ...props }: Props) {
  return <label
    className={cn(
      "text-base font-medium text-gray-900",
      error && 'text-red-500',
      className)}
    {...props}
  >
    {children}
  </label>
}