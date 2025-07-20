// app/page.tsx
"use client"
import HeroAnimation from "@/components/HeroAnimation"
import DNALangOptimized from "@/components/DNALangOptimized"

export default function Home() {
  return (
    <>
      {/* The 3D animation will render as a fixed background */}
      <HeroAnimation />

      {/* We use a relative z-10 container to place content on top of the animation */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 text-center">
        {/* Content container with a semi-transparent backdrop for readability */}
        <DNALangOptimized />

        <footer className="absolute bottom-4 text-sm text-gray-500">
          <p>&copy; 2025 Agile Defense Systems, LLC. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
