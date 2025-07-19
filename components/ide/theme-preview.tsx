"use client"

import { Card, CardContent } from "@/components/ui/card"

interface ThemePreviewProps {
  theme: {
    id: string
    name: string
    colors: {
      background: string
      foreground: string
      keyword: string
      string: string
      comment: string
    }
  }
  isSelected?: boolean
  onClick?: () => void
}

const themeColors = {
  "dna-lang-dark": {
    background: "#1E1E1E",
    foreground: "#D4D4D4",
    keyword: "#C586C0",
    string: "#CE9178",
    comment: "#6A9955",
  },
  "dna-lang-light": {
    background: "#FFFFFF",
    foreground: "#1F2937",
    keyword: "#8B5CF6",
    string: "#B45309",
    comment: "#6B7280",
  },
  "dna-lang-bio-glow": {
    background: "#0A0A0A",
    foreground: "#00FF88",
    keyword: "#00FF88",
    string: "#FFD700",
    comment: "#7FFF00",
  },
  "dna-lang-quantum": {
    background: "#0F0A1A",
    foreground: "#E879F9",
    keyword: "#E879F9",
    string: "#FB7185",
    comment: "#6366F1",
  },
}

export function ThemePreview({ theme, isSelected, onClick }: ThemePreviewProps) {
  const colors = themeColors[theme.id as keyof typeof themeColors]

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? "ring-2 ring-primary" : ""}`}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div
          className="rounded border text-xs font-mono p-2 mb-2"
          style={{
            backgroundColor: colors.background,
            color: colors.foreground,
            borderColor: isSelected ? "hsl(var(--primary))" : "hsl(var(--border))",
          }}
        >
          <div style={{ color: colors.keyword }}>organism</div>
          <div style={{ color: colors.string }}>"sample_code"</div>
          <div style={{ color: colors.comment }}>// comment</div>
        </div>
        <div className="text-sm font-medium">{theme.name}</div>
      </CardContent>
    </Card>
  )
}
