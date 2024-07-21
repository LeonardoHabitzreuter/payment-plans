import { cn } from "../utils"

type Props = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

export default function Label({ children, className, ...props }: Props) {
  return <label
    className={cn(
      "text-base font-medium text-gray-900",
      className)}
    {...props}
  >
    {children}
  </label>
}