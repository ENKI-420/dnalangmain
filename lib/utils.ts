import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function calculateFitness(metrics: {
  accuracy: number
  performance: number
  consciousness: number
  aesthetic: number
}): number {
  return metrics.accuracy * 0.4 + metrics.performance * 0.3 + metrics.consciousness * 0.2 + metrics.aesthetic * 0.1
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

export function parseOrganismCode(code: string): {
  name: string
  genes: string[]
  properties: string[]
  mutations: string[]
} {
  const nameMatch = code.match(/organism\s+(\w+)/)
  const name = nameMatch ? nameMatch[1] : "Unknown"

  const geneMatches = code.match(/gene\s+\w+\s*{[^}]*}/g) || []
  const genes = geneMatches.map((match) => match.trim())

  const propertyMatches = code.match(/property\s+\w+\s*:\s*\w+/g) || []
  const properties = propertyMatches.map((match) => match.trim())

  const mutationMatches = code.match(/mutation\s+\w+\s*{[^}]*}/g) || []
  const mutations = mutationMatches.map((match) => match.trim())

  return { name, genes, properties, mutations }
}
