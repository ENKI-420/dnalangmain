# DNA-Lang iCRISPR Workbench - AI Agent Instructions

## Project Architecture Overview

This codebase implements the DNA-Lang iCRISPR Workbench, a quantum-ready platform for developing "living software" - self-evolving, autonomous programs modeled as biological organisms. The system features multi-agent orchestration, quantum computing integration, and economic optimization.

### Core Components

- **Main IDEs**: [`components/DNALangIDE.tsx`](../components/DNALangIDE.tsx), [`components/iCRISPR-ide.tsx`](../components/iCRISPR-ide.tsx), [`components/iCRISPR-ide-refined.tsx`](../components/iCRISPR-ide-refined.tsx)
- **Multi-Agent System**: SHIFT-Assist, Consciousness Core, Security Gene, G'volution Engine, Quantum Core
- **Quantum Integration**: [`lib/quantum-dna-agent.ts`](../lib/quantum-dna-agent.ts) for quantum coherence and superposition states
- **Simulation Engine**: [`lib/dna-lang-mocks.ts`](../lib/dna-lang-mocks.ts) for organism compilation and execution

### DNA-Lang Syntax Patterns

DNA-Lang uses biological metaphors for software architecture:
```dna-lang
organism SelfHealingAgent {
  state { consciousness: float = 0.65; }
  gene TelemetryConsumer { ... }
  workflow { ... }
  evolution { fitness_goal { maximize(consciousness); } }
}
```

### Key Development Workflows

- **Setup**: `npm install && npm run dev`
- **Deploy**: Use [`deploy.sh`](../deploy.sh) for full deployment with health checks
- **Debugging**: Use IDE log panels and multi-agent chat for organism behavior analysis
- **Testing**: Organism simulation and consciousness tracking provide feedback loops

### Project-Specific Conventions

- **File Naming**: PascalCase for React components, kebab-case for scripts
- **Mocking Strategy**: All backend logic simulated in [`lib/dna-lang-mocks.ts`](../lib/dna-lang-mocks.ts)
- **Economic Integration**: ROI, SYNAPSE tokens, and gene marketplace logic throughout IDEs
- **Quantum Metrics**: Consciousness, fitness, quantum coherence as first-class citizens

### Agent Integration Points

- **Multi-Agent Chat**: [`components/ide/multi-agent-chat-panel.tsx`](../components/ide/multi-agent-chat-panel.tsx)
- **LLM Utilities**: [`src/agents/LLMAgent.ts`](../src/agents/LLMAgent.ts)
- **Vector Memory**: Optional Supabase + Pinecone integration for semantic search
- **Monaco Editor**: [`components/ide/code-editor.tsx`](../components/ide/code-editor.tsx) with DNA-Lang syntax highlighting

### Critical Files for Understanding

- [`README.md`](../README.md): Complete usage guide and DNA-Lang examples
- [`components/ide/file-explorer.tsx`](../components/ide/file-explorer.tsx): File structure and organism examples
- [`components/ide/gen-pull-marketplace.tsx`](../components/ide/gen-pull-marketplace.tsx): Gene marketplace and economic logic
- [`lib/dna-evolution-engine.ts`](../lib/dna-evolution-engine.ts): Core evolution algorithms
