import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster" // Corrected import for shadcn/ui Toaster

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DNA-Lang Meta-Automation v1.0",
  description: "The Revolutionary Future of Programming - Bio-inspired, Quantum-enhanced, Consciousness-driven",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster /> {/* Global Toaster for notifications */}
        </ThemeProvider>
      </body>
    </html>
  )
}
