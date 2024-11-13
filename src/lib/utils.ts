import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function snake(string: string): string {
  return string.split(" ").map(part => part.toLowerCase()).join("_")
}