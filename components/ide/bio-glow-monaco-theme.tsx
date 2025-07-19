"use client"

import { useEffect } from "react"

interface BioGlowMonacoThemeProps {
  monaco: any
  isActive: boolean
}

export function BioGlowMonacoTheme({ monaco, isActive }: BioGlowMonacoThemeProps) {
  useEffect(() => {
    if (!monaco || !isActive) return

    // Enhanced Bio-Glow theme with animations
    monaco.editor.defineTheme("dna-lang-bio-glow-enhanced", {
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

    // Apply the enhanced theme
    monaco.editor.setTheme("dna-lang-bio-glow-enhanced")
  }, [monaco, isActive])

  return null
}
