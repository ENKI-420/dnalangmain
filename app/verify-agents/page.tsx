"use client"

import { MultiAgentChatPanel } from "@/components/ide/multi-agent-chat-panel"
import { Card } from "@/components/ui/card"

export default function VerifyAgentsPage() {
  // Placeholder for mutation request, as this page is for verification
  const handleMutationRequest = (code: string, description: string) => {
    console.log("Mutation requested:", { code, description })
    // In a real scenario, this would trigger a mutation in the IDE
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-950 p-4">
      <Card className="h-[90vh] w-full max-w-4xl flex flex-col">
        <MultiAgentChatPanel
          onMutationRequest={handleMutationRequest}
          currentTheme="dna-lang-bio-glow" // Assuming a default theme for verification
        />
      </Card>
    </div>
  )
}
