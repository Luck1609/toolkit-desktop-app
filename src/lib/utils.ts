import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getBaseURL(url: string = "", assets: boolean = false): string {
  const prodApiUrl = import.meta.env.NEXT_PUBLIC_API

  return import.meta.env.NODE_ENV === 'production' && prodApiUrl
    ? prodApiUrl
    : assets ? 
      `http://localhost:8000${url}` 
      : `http://localhost:8000${url}`;
}



