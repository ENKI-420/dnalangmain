import type React from "react"
import type { Metadata } from "next"
import { Manrope, Roboto_Mono } from "next/font/google"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
})

export const metadata: Metadata = {
  title: "DNAlang.io - The Operating System for Humanity",
  description:
    "Welcome to SH1FT. A unified digital reality where your genomic twin, personal wealth, and global impact evolve in symbiosis. This is the dawn of living software.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>{/* No need for meta charset and viewport, Next.js handles them */}</head>
      <body
        className={`${manrope.variable} ${robotoMono.variable} font-sans bg-dna-bg text-dna-text overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
