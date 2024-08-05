import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
