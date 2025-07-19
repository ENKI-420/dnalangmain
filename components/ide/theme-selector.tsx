"use client"

import { useState } from "react"
import { Palette, Sun, Moon, Zap, Dna } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface ThemeSelectorProps {
  currentTheme: string
  onThemeChange: (theme: string) => void
}

const themes = [
  {
    id: "dna-lang-dark",
    name: "Dark Mode",
    description: "Classic dark theme for comfortable coding",
    icon: Moon,
    preview: "bg-gray-900 text-green-400",
    category: "Standard",
  },
  {
    id: "dna-lang-light",
    name: "Light Mode",
    description: "Clean light theme for bright environments",
    icon: Sun,
    preview: "bg-white text-gray-900 border",
    category: "Standard",
  },
  {
    id: "dna-lang-bio-glow",
    name: "Bio-Glow",
    description: "Vibrant bio-inspired theme with glowing effects",
    icon: Dna,
    preview: "bg-black text-green-400",
    category: "Bio-Inspired",
  },
  {
    id: "dna-lang-quantum",
    name: "Quantum",
    description: "Mystical quantum-themed colors and effects",
    icon: Zap,
    preview: "bg-purple-950 text-purple-300",
    category: "Quantum",
  },
]

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const currentThemeData = themes.find((theme) => theme.id === currentTheme) || themes[0]
  const CurrentIcon = currentThemeData.icon

  const groupedThemes = themes.reduce(
    (acc, theme) => {
      if (!acc[theme.category]) {
        acc[theme.category] = []
      }
      acc[theme.category].push(theme)
      return acc
    },
    {} as Record<string, typeof themes>,
  )

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 bg-transparent">
          <CurrentIcon className="h-3 w-3 mr-2" />
          <span className="hidden sm:inline">{currentThemeData.name}</span>
          <Palette className="h-3 w-3 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2">
          <h3 className="font-semibold text-sm mb-2">DNA-Lang Editor Themes</h3>
          {Object.entries(groupedThemes).map(([category, categoryThemes]) => (
            <div key={category}>
              <div className="text-xs font-medium text-muted-foreground mb-2 mt-3 first:mt-0">{category}</div>
              {categoryThemes.map((theme) => {
                const Icon = theme.icon
                const isSelected = currentTheme === theme.id
                return (
                  <DropdownMenuItem
                    key={theme.id}
                    onClick={() => {
                      onThemeChange(theme.id)
                      setIsOpen(false)
                    }}
                    className="flex items-start space-x-3 p-3 cursor-pointer"
                  >
                    <div className="flex items-center space-x-2 flex-1">
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{theme.name}</span>
                          {isSelected && (
                            <Badge variant="default" className="text-xs">
                              Active
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{theme.description}</p>
                      </div>
                    </div>
                    <div className={`w-8 h-6 rounded border ${theme.preview} flex-shrink-0`} />
                  </DropdownMenuItem>
                )
              })}
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
