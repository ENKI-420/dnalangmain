"use client"
import ICRISPRIde from "@/components/iCRISPR-ide"

interface IDEFile {
  id: string
  name: string
  path: string
  content: string
  language: string
  modified: boolean
}

interface OrganismState {
  id: string
  fitness: number
  consciousness: number
  quantumCoherence: number
  generation: number
  isRunning: boolean
}

export default function IDEPage() {
  return (
    <div className="h-screen">
      <ICRISPRIde />
    </div>
  )
}
