import { Loader2, Dna } from "lucide-react"

export default function MarketplaceLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-slate-900 text-white">
      <Dna className="h-24 w-24 text-green-400 animate-pulse mb-6" />
      <h2 className="text-3xl font-bold mb-3">Loading Organism Marketplace...</h2>
      <p className="text-gray-400 text-lg">Preparing the latest bio-inspired creations for you.</p>
      <Loader2 className="h-12 w-12 animate-spin text-purple-400 mt-8" />
    </div>
  )
}
