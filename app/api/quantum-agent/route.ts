import { NextResponse } from "next/server"
import { QuantumDNAAgent } from "@/lib/quantum-dna-agent"

export const runtime = "edge" // Use Edge Runtime for faster responses

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const agent = new QuantumDNAAgent()
    const result = await agent.generateOrganism(prompt)

    return NextResponse.json(result)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: "Failed to generate organism", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
