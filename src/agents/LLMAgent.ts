// src/agents/LLMAgent.ts
// AI-powered agent with LLM coordination for DNA-Lang organisms

import type { BaseAgent } from "../types"

export interface LLMConfig {
  provider: "openai" | "anthropic" | "groq" | "xai"
  apiKey: string
  model: string
  temperature?: number
  maxTokens?: number
}

export interface ConversationMessage {
  role: "system" | "user" | "assistant"
  content: string
  timestamp: Date
}

export interface LLMResponse {
  content: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
  model: string
  finishReason: string
}

export class LLMAgent implements BaseAgent {
  private config: LLMConfig
  private conversationHistory: ConversationMessage[] = []
  private systemPrompt: string

  constructor(config: LLMConfig) {
    this.config = config
    this.systemPrompt = `You are a DNA-Lang programming assistant, specialized in biological programming paradigms. 

DNA-Lang is a revolutionary programming language that treats code as living organisms with:
- Organisms: Main program structures that can evolve
- Genes: Functions and methods within organisms
- Mutations: Code changes that improve fitness
- Evolution: Automatic optimization based on performance
- Consciousness: Self-awareness and adaptation capabilities

Your role is to:
1. Help developers write DNA-Lang code
2. Suggest evolutionary improvements
3. Debug organism behavior
4. Optimize genetic algorithms
5. Explain biological programming concepts

Always respond with practical, executable DNA-Lang code when appropriate.`

    // Initialize conversation with system prompt
    this.conversationHistory.push({
      role: "system",
      content: this.systemPrompt,
      timestamp: new Date(),
    })
  }

  async executeAction(action: string): Promise<string> {
    try {
      // Add user message to conversation
      this.conversationHistory.push({
        role: "user",
        content: action,
        timestamp: new Date(),
      })

      const response = await this.callLLM(action)

      // Add assistant response to conversation
      this.conversationHistory.push({
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
      })

      return response.content
    } catch (error) {
      console.error("LLM Agent error:", error)
      return `Error: Unable to process request. ${error instanceof Error ? error.message : "Unknown error"}`
    }
  }

  private async callLLM(prompt: string): Promise<LLMResponse> {
    const messages = this.conversationHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }))

    switch (this.config.provider) {
      case "openai":
        return this.callOpenAI(messages)
      case "anthropic":
        return this.callAnthropic(messages)
      case "groq":
        return this.callGroq(messages)
      case "xai":
        return this.callXAI(messages)
      default:
        throw new Error(`Unsupported LLM provider: ${this.config.provider}`)
    }
  }

  private async callOpenAI(messages: any[]): Promise<LLMResponse> {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.config.model || "gpt-4",
        messages,
        temperature: this.config.temperature || 0.7,
        max_tokens: this.config.maxTokens || 2000,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      content: data.choices[0].message.content,
      usage: data.usage,
      model: data.model,
      finishReason: data.choices[0].finish_reason,
    }
  }

  private async callAnthropic(messages: any[]): Promise<LLMResponse> {
    // Convert messages format for Anthropic
    const systemMessage = messages.find((m) => m.role === "system")?.content || ""
    const conversationMessages = messages.filter((m) => m.role !== "system")

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": this.config.apiKey,
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: this.config.model || "claude-3-sonnet-20240229",
        system: systemMessage,
        messages: conversationMessages,
        max_tokens: this.config.maxTokens || 2000,
        temperature: this.config.temperature || 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      content: data.content[0].text,
      usage: data.usage,
      model: data.model,
      finishReason: data.stop_reason,
    }
  }

  private async callGroq(messages: any[]): Promise<LLMResponse> {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.config.model || "mixtral-8x7b-32768",
        messages,
        temperature: this.config.temperature || 0.7,
        max_tokens: this.config.maxTokens || 2000,
      }),
    })

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      content: data.choices[0].message.content,
      usage: data.usage,
      model: data.model,
      finishReason: data.choices[0].finish_reason,
    }
  }

  private async callXAI(messages: any[]): Promise<LLMResponse> {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.config.model || "grok-beta",
        messages,
        temperature: this.config.temperature || 0.7,
        max_tokens: this.config.maxTokens || 2000,
      }),
    })

    if (!response.ok) {
      throw new Error(`xAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      content: data.choices[0].message.content,
      usage: data.usage,
      model: data.model,
      finishReason: data.choices[0].finish_reason,
    }
  }

  // DNA-Lang specific methods
  async analyzeOrganism(code: string): Promise<string> {
    const prompt = `Analyze this DNA-Lang organism code and provide insights on:
1. Fitness potential
2. Evolutionary opportunities
3. Potential mutations
4. Performance optimizations

Code:
\`\`\`dna
${code}
\`\`\``

    return this.executeAction(prompt)
  }

  async suggestMutations(organism: string, fitnessGoal: string): Promise<string> {
    const prompt = `For the organism "${organism}" with fitness goal "${fitnessGoal}", suggest specific mutations that could improve performance. Provide concrete DNA-Lang code examples.`

    return this.executeAction(prompt)
  }

  async debugOrganism(code: string, error: string): Promise<string> {
    const prompt = `Debug this DNA-Lang organism that's experiencing an error:

Error: ${error}

Code:
\`\`\`dna
${code}
\`\`\`

Provide a fixed version and explain the issue.`

    return this.executeAction(prompt)
  }

  async explainConcept(concept: string): Promise<string> {
    const prompt = `Explain the DNA-Lang concept "${concept}" with examples and how it relates to biological programming paradigms.`

    return this.executeAction(prompt)
  }

  // Conversation management
  clearConversation(): void {
    this.conversationHistory = [
      {
        role: "system",
        content: this.systemPrompt,
        timestamp: new Date(),
      },
    ]
  }

  getConversationHistory(): ConversationMessage[] {
    return [...this.conversationHistory]
  }

  // Configuration management
  updateConfig(newConfig: Partial<LLMConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  getConfig(): LLMConfig {
    return { ...this.config }
  }
}

// Factory function for creating LLM agents
export function createLLMAgent(config: LLMConfig): LLMAgent {
  return new LLMAgent(config)
}

// Utility function to parse LLM responses for code blocks
export function extractCodeBlocks(response: string): { language: string; code: string }[] {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
  const blocks: { language: string; code: string }[] = []
  let match

  while ((match = codeBlockRegex.exec(response)) !== null) {
    blocks.push({
      language: match[1] || "text",
      code: match[2].trim(),
    })
  }

  return blocks
}

// Utility function to extract DNA-Lang organisms from responses
export function extractOrganisms(response: string): string[] {
  const organisms: string[] = []
  const codeBlocks = extractCodeBlocks(response)

  for (const block of codeBlocks) {
    if (block.language === "dna" || block.code.includes("organism ")) {
      organisms.push(block.code)
    }
  }

  return organisms
}
