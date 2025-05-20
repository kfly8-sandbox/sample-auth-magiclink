import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Result<S, E> = {
  success: true
  value: S
} | {
  success: false
  error: E
}

export type ResultError<T extends string> = {
  code: T
  message: string
}
