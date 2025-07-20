import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DNA-Lang iCRISPR Workbench - Living Software Evolution Platform",
  description:
    "Revolutionary biological programming platform with 71% performance improvements through quantum-enhanced genetic algorithms and self-evolving organisms.",
  keywords: [
    "DNA-Lang",
    "living software",
    "evolution",
    "quantum computing",
    "consciousness",
    "self-healing",
    "hyperautomation",
    "iCRISPR",
    "workbench",
    "biological programming",
  ],
  authors: [{ name: "Agile Defense Systems, LLC" }],
  creator: "Agile Defense Systems, LLC",
  publisher: "Agile Defense Systems, LLC",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dna-lang-icrispr.vercel.app",
    title: "DNA-Lang iCRISPR Workbench",
    description: "71% faster development with living software evolution",
    siteName: "DNA-Lang Platform",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DNA-Lang iCRISPR Workbench",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DNA-Lang iCRISPR Workbench",
    description: "71% faster development with living software evolution",
    images: ["/og-image.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#10b981",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
