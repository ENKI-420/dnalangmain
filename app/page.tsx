import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-4">
      <h1 className="text-5xl font-extrabold mb-6 text-center leading-tight">DNA-Lang Meta-Automation v1.0</h1>
      <p className="text-xl text-center mb-10 max-w-2xl opacity-90">
        Unleash the power of bio-inspired programming with quantum and AI capabilities. Evolve your code, build
        self-aware organisms, and redefine automation.
      </p>
      <div className="flex space-x-4">
        <Button
          asChild
          className="px-8 py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
        >
          <Link href="/dashboard">Launch Dashboard</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="px-8 py-3 text-lg font-semibold border-2 border-white text-white bg-transparent hover:bg-white hover:text-purple-900 transition-colors duration-300"
        >
          <Link href="/ide">Explore IDE</Link>
        </Button>
      </div>
      <div className="mt-16 text-sm opacity-70">
        <p>&copy; 2025 Agile Defense Systems, LLC. All rights reserved.</p>
      </div>
    </div>
  )
}
