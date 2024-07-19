import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const testFloatPrecision = (max: number) => (n: number) => {
  const pieces = n.toString().split('.')
  return pieces.length === 1 || pieces[1].length <= max
}

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
