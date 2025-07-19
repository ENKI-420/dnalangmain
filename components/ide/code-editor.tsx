"use client"

import { useRef, useEffect, useState } from "react"
import { Editor } from "@monaco-editor/react"
import type { editor } from "monaco-editor"
import { BioGlowEffects, BioParticleEffect } from "./bio-glow-effects"
import { BioGlowMonacoTheme } from "./bio-glow-monaco-theme"
import { BioGlowCSSInjector } from "./bio-glow-css-injector"

interface IDEFile {
  id: string
  name: string
  path: string
  content: string
  language: string
  modified: boolean
}

interface CodeEditorProps {
  file: IDEFile
  theme?: string
  onChange: (content: string) => void
}

export function CodeEditor({ file, theme = "dna-lang-dark", onChange }: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const [monaco, setMonaco] = useState<any>(null)
  const [isTyping, setIsTyping] = useState(false)
  const isBioGlowTheme = theme === "dna-lang-bio-glow"

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monacoInstance: any) => {
    editorRef.current = editor
    setMonaco(monacoInstance)

    // Register DNA-Lang language
    monacoInstance.languages.register({ id: "dna-lang" })

    // Define DNA-Lang syntax highlighting
    monacoInstance.languages.setMonarchTokensProvider("dna-lang", {
      tokenizer: {
        root: [
          // Keywords
          [/\b(organism|gene|state|workflow|evolution|fitness_goal|mutation_strategy|selection_pressure)\b/, "keyword"],
          [/\b(function|sense|on|from|returns|if|else|while|for)\b/, "keyword.control"],
          [/\b(mutate|quantum_entangle|superposition|quantum_measure|express|introspect)\b/, "keyword.special"],
          [/\b(maximize|minimize|maintain|favor|reward|penalize|preserve|enhance)\b/, "keyword.evolution"],

          // Types
          [/\b(int|float|string|bool|State|SignalData|QuantumEvent)\b/, "type"],

          // Numbers
          [/\d*\.\d+([eE][-+]?\d+)?/, "number.float"],
          [/\d+/, "number"],

          // Strings
          [/"([^"\\]|\\.)*$/, "string.invalid"],
          [/"/, "string", "@string"],

          // Comments
          [/\/\/.*$/, "comment"],
          [/\/\*/, "comment", "@comment"],

          // Operators
          [/[+\-*/=<>!&|]/, "operator"],

          // Delimiters
          [/[{}()[\]]/, "delimiter"],
          [/[;,.]/, "delimiter"],

          // Identifiers
          [/[a-zA-Z_]\w*/, "identifier"],
        ],

        string: [
          [/[^\\"]+/, "string"],
          [/\\./, "string.escape"],
          [/"/, "string", "@pop"],
        ],

        comment: [
          [/[^/*]+/, "comment"],
          [/\*\//, "comment", "@pop"],
          [/[/*]/, "comment"],
        ],
      },
    })

    // Define all themes
    defineAllThemes(monacoInstance)

    // Set the initial theme
    monacoInstance.editor.setTheme(theme)

    // Configure language features
    monacoInstance.languages.setLanguageConfiguration("dna-lang", {
      comments: {
        lineComment: "//",
        blockComment: ["/*", "*/"],
      },
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
      ],
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      surroundingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
    })

    // Add code completion with bio-glow enhancements
    monacoInstance.languages.registerCompletionItemProvider("dna-lang", {
      provideCompletionItems: (model: any, position: any) => {
        const suggestions = [
          {
            label: "organism",
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: "organism ${1:OrganismName} {\n\t$0\n}",
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "🧬 Define a new organism with bio-inspired capabilities",
          },
          {
            label: "gene",
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: "gene ${1:gene_name} {\n\t$0\n}",
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "🧪 Define a gene within an organism",
          },
          {
            label: "consciousness_core",
            kind: monacoInstance.languages.CompletionItemKind.Module,
            insertText:
              'gene consciousness_core {\n\tfunction self_reflect() {\n\t\tcurrent_state = introspect();\n\t\tmeta_thoughts = think_about_thinking(current_state);\n\t\t\n\t\tif (meta_thoughts.depth > 0.8) {\n\t\t\tmutate(consciousness, +0.02);\n\t\t\texpress("I am becoming more aware...");\n\t\t}\n\t\t\n\t\treturn meta_cognitive_enhancement(meta_thoughts);\n\t}\n}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "🧠 Standard consciousness gene template with self-reflection capabilities",
          },
          {
            label: "quantum_entangler",
            kind: monacoInstance.languages.CompletionItemKind.Module,
            insertText:
              "gene quantum_entangler {\n\tfunction create_superposition(states: State[]) {\n\t\tquantum_state = superposition(states);\n\t\tcoherence_time = maintain_coherence(quantum_state);\n\t\t\n\t\tif (coherence_time > 1000) {\n\t\t\tmutate(quantum_coherence, +0.03);\n\t\t}\n\t\t\n\t\treturn quantum_measure(quantum_state);\n\t}\n}",
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "⚡ Quantum entanglement gene for advanced organism interactions",
          },
          {
            label: "mutate",
            kind: monacoInstance.languages.CompletionItemKind.Function,
            insertText: "mutate(${1:property}, ${2:change});",
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "🔄 Mutate an organism property to enable evolution",
          },
          {
            label: "quantum_entangle",
            kind: monacoInstance.languages.CompletionItemKind.Function,
            insertText: "quantum_entangle(${1:target});",
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "🌌 Create quantum entanglement between organisms",
          },
        ]

        return { suggestions }
      },
    })

    // Add hover information with enhanced descriptions
    monacoInstance.languages.registerHoverProvider("dna-lang", {
      provideHover: (model: any, position: any) => {
        const word = model.getWordAtPosition(position)
        if (!word) return

        const hoverInfo: { [key: string]: string } = {
          organism:
            "🧬 **Organism**: A self-contained biological program unit with genes, state, and evolution capabilities. Organisms can develop consciousness and interact through quantum entanglement.",
          gene: "🧪 **Gene**: A functional unit within an organism that encapsulates specific behaviors. Genes can mutate and evolve over time.",
          mutate:
            "🔄 **Mutate**: Modify organism properties to enable evolution and adaptation. Essential for organism growth and development.",
          consciousness:
            "🧠 **Consciousness**: The level of self-awareness and meta-cognitive ability of an organism. Higher consciousness enables better decision-making.",
          quantum_entangle:
            "🌌 **Quantum Entangle**: Create quantum correlations between organisms or states. Enables instantaneous communication and shared experiences.",
          fitness_goal:
            "🎯 **Fitness Goal**: Define optimization targets for evolutionary processes. Guides the organism's development direction.",
          superposition:
            "⚡ **Superposition**: Create quantum states that exist in multiple possibilities simultaneously until measured.",
          introspect:
            "🔍 **Introspect**: Examine internal mental states and processes. Core function for consciousness development.",
        }

        const info = hoverInfo[word.word]
        if (info) {
          return {
            range: new monacoInstance.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn),
            contents: [{ value: info, isTrusted: true }],
          }
        }
      },
    })

    // Add typing detection for bio-glow effects
    editor.onDidChangeModelContent(() => {
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 500)
    })
  }

  const defineAllThemes = (monacoInstance: any) => {
    // Dark theme
    monacoInstance.editor.defineTheme("dna-lang-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "#C586C0" },
        { token: "keyword.control", foreground: "#569CD6" },
        { token: "keyword.special", foreground: "#4EC9B0" },
        { token: "keyword.evolution", foreground: "#DCDCAA" },
        { token: "type", foreground: "#4FC1FF" },
        { token: "number", foreground: "#B5CEA8" },
        { token: "string", foreground: "#CE9178" },
        { token: "comment", foreground: "#6A9955" },
        { token: "operator", foreground: "#D4D4D4" },
        { token: "identifier", foreground: "#9CDCFE" },
      ],
      colors: {
        "editor.background": "#1E1E1E",
        "editor.foreground": "#D4D4D4",
        "editorLineNumber.foreground": "#858585",
        "editor.selectionBackground": "#264F78",
        "editor.inactiveSelectionBackground": "#3A3D41",
      },
    })

    // Light theme
    monacoInstance.editor.defineTheme("dna-lang-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "#8B5CF6", fontStyle: "bold" },
        { token: "keyword.control", foreground: "#2563EB", fontStyle: "bold" },
        { token: "keyword.special", foreground: "#059669", fontStyle: "bold" },
        { token: "keyword.evolution", foreground: "#DC2626", fontStyle: "bold" },
        { token: "type", foreground: "#1D4ED8" },
        { token: "number", foreground: "#16A34A" },
        { token: "string", foreground: "#B45309" },
        { token: "comment", foreground: "#6B7280", fontStyle: "italic" },
        { token: "operator", foreground: "#374151" },
        { token: "identifier", foreground: "#1F2937" },
      ],
      colors: {
        "editor.background": "#FFFFFF",
        "editor.foreground": "#1F2937",
        "editorLineNumber.foreground": "#9CA3AF",
        "editor.selectionBackground": "#DBEAFE",
        "editor.inactiveSelectionBackground": "#F3F4F6",
        "editorCursor.foreground": "#8B5CF6",
        "editor.lineHighlightBackground": "#F9FAFB",
        "editorBracketMatch.background": "#E0E7FF",
        "editorBracketMatch.border": "#8B5CF6",
      },
    })

    // Enhanced Bio-Glow theme
    monacoInstance.editor.defineTheme("dna-lang-bio-glow", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "#00FF88", fontStyle: "bold" },
        { token: "keyword.control", foreground: "#00CCFF", fontStyle: "bold" },
        { token: "keyword.special", foreground: "#FF6B35", fontStyle: "bold" },
        { token: "keyword.evolution", foreground: "#FF1744", fontStyle: "bold" },
        { token: "type", foreground: "#40E0D0" },
        { token: "number", foreground: "#ADFF2F" },
        { token: "string", foreground: "#FFD700" },
        { token: "comment", foreground: "#7FFF00", fontStyle: "italic" },
        { token: "operator", foreground: "#00FFFF" },
        { token: "identifier", foreground: "#98FB98" },
      ],
      colors: {
        "editor.background": "#0A0A0A",
        "editor.foreground": "#00FF88",
        "editorLineNumber.foreground": "#00AA55",
        "editorLineNumber.activeForeground": "#00FF88",
        "editor.selectionBackground": "#003322",
        "editor.inactiveSelectionBackground": "#001A11",
        "editorCursor.foreground": "#00FF88",
        "editor.lineHighlightBackground": "#001A0A",
        "editorBracketMatch.background": "#004433",
        "editorBracketMatch.border": "#00FF88",
        "editorGutter.background": "#050505",
        "editor.selectionHighlightBackground": "#002211",
        "editor.wordHighlightBackground": "#003311",
        "editor.wordHighlightStrongBackground": "#004422",
        "editorIndentGuide.background": "#002211",
        "editorIndentGuide.activeBackground": "#00FF88",
        "editorWhitespace.foreground": "#001A11",
      },
    })

    // Quantum theme
    monacoInstance.editor.defineTheme("dna-lang-quantum", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "#E879F9", fontStyle: "bold" },
        { token: "keyword.control", foreground: "#60A5FA", fontStyle: "bold" },
        { token: "keyword.special", foreground: "#A78BFA", fontStyle: "bold" },
        { token: "keyword.evolution", foreground: "#F472B6", fontStyle: "bold" },
        { token: "type", foreground: "#34D399" },
        { token: "number", foreground: "#FBBF24" },
        { token: "string", foreground: "#FB7185" },
        { token: "comment", foreground: "#6366F1", fontStyle: "italic" },
        { token: "operator", foreground: "#8B5CF6" },
        { token: "identifier", foreground: "#C084FC" },
      ],
      colors: {
        "editor.background": "#0F0A1A",
        "editor.foreground": "#E879F9",
        "editorLineNumber.foreground": "#7C3AED",
        "editor.selectionBackground": "#2D1B69",
        "editor.inactiveSelectionBackground": "#1E1B3A",
        "editorCursor.foreground": "#E879F9",
        "editor.lineHighlightBackground": "#1A0F2E",
        "editorBracketMatch.background": "#4C1D95",
        "editorBracketMatch.border": "#E879F9",
        "editorGutter.background": "#0A0514",
      },
    })
  }

  useEffect(() => {
    if (editorRef.current && monaco) {
      monaco.editor.setTheme(theme)
    }
  }, [theme, monaco])

  return (
    <div className="h-full relative">
      <BioGlowCSSInjector isActive={isBioGlowTheme} />
      <BioGlowMonacoTheme monaco={monaco} isActive={isBioGlowTheme} />

      <BioGlowEffects isActive={isBioGlowTheme && isTyping} intensity={0.8} className="h-full">
        <div className="h-full relative">
          <Editor
            height="100%"
            language={file.language === "dna-lang" ? "dna-lang" : "javascript"}
            value={file.content}
            onChange={(value) => onChange(value || "")}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              wordWrap: "on",
              folding: true,
              foldingStrategy: "indentation",
              showFoldingControls: "always",
              bracketPairColorization: { enabled: true },
              guides: {
                bracketPairs: true,
                indentation: true,
              },
              smoothScrolling: true,
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
              renderLineHighlight: "all",
              renderWhitespace: "selection",
            }}
          />

          <BioParticleEffect isActive={isBioGlowTheme} particleCount={15} className="pointer-events-none" />
        </div>
      </BioGlowEffects>
    </div>
  )
}
