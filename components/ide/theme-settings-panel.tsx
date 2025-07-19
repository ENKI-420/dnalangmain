"use client"

import { useState } from "react"
import { Palette, Sun, Moon, Zap, Dna, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemePreview } from "./theme-preview"

interface ThemeSettingsPanelProps {
  currentTheme: string
  onThemeChange: (theme: string) => void
  onClose: () => void
}

const themes = [
  {
    id: "dna-lang-dark",
    name: "Dark Mode",
    description: "Classic dark theme optimized for long coding sessions",
    icon: Moon,
    category: "Standard",
  },
  {
    id: "dna-lang-light",
    name: "Light Mode",
    description: "Clean light theme perfect for bright environments",
    icon: Sun,
    category: "Standard",
  },
  {
    id: "dna-lang-bio-glow",
    name: "Bio-Glow",
    description: "Vibrant bio-inspired theme with organic color palette",
    icon: Dna,
    category: "Bio-Inspired",
  },
  {
    id: "dna-lang-quantum",
    name: "Quantum",
    description: "Mystical quantum-themed colors for advanced development",
    icon: Zap,
    category: "Quantum",
  },
]

export function ThemeSettingsPanel({ currentTheme, onThemeChange, onClose }: ThemeSettingsPanelProps) {
  const [fontSize, setFontSize] = useState([14])
  const [lineHeight, setLineHeight] = useState([1.5])
  const [enableLigatures, setEnableLigatures] = useState(true)
  const [enableMinimap, setEnableMinimap] = useState(true)
  const [autoDetectTheme, setAutoDetectTheme] = useState(false)

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
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Theme & Editor Settings</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Theme Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">DNA-Lang Themes</CardTitle>
            <CardDescription>Choose a theme that matches your coding style and environment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(groupedThemes).map(([category, categoryThemes]) => (
              <div key={category}>
                <h4 className="font-medium text-sm mb-3 text-muted-foreground">{category}</h4>
                <div className="grid grid-cols-2 gap-3">
                  {categoryThemes.map((theme) => (
                    <ThemePreview
                      key={theme.id}
                      theme={theme}
                      isSelected={currentTheme === theme.id}
                      onClick={() => onThemeChange(theme.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Editor Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Editor Preferences</CardTitle>
            <CardDescription>Customize your coding experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Font Size: {fontSize[0]}px</Label>
              <Slider value={fontSize} onValueChange={setFontSize} min={10} max={24} step={1} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label>Line Height: {lineHeight[0]}</Label>
              <Slider
                value={lineHeight}
                onValueChange={setLineHeight}
                min={1.0}
                max={2.0}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Font Ligatures</Label>
                <div className="text-sm text-muted-foreground">Enable programming ligatures for better readability</div>
              </div>
              <Switch checked={enableLigatures} onCheckedChange={setEnableLigatures} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Minimap</Label>
                <div className="text-sm text-muted-foreground">Show code overview in the editor</div>
              </div>
              <Switch checked={enableMinimap} onCheckedChange={setEnableMinimap} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-detect Theme</Label>
                <div className="text-sm text-muted-foreground">Match system theme automatically</div>
              </div>
              <Switch checked={autoDetectTheme} onCheckedChange={setAutoDetectTheme} />
            </div>
          </CardContent>
        </Card>

        {/* Bio-Inspired Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <Dna className="h-4 w-4" />
              <span>Bio-Inspired Features</span>
            </CardTitle>
            <CardDescription>DNA-Lang specific visual enhancements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Organism Visualization Style</Label>
              <Select defaultValue="organic">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organic">Organic Flow</SelectItem>
                  <SelectItem value="geometric">Geometric Patterns</SelectItem>
                  <SelectItem value="neural">Neural Network</SelectItem>
                  <SelectItem value="quantum">Quantum Visualization</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Consciousness Indicator</Label>
              <Select defaultValue="pulse">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pulse">Pulsing Glow</SelectItem>
                  <SelectItem value="wave">Wave Animation</SelectItem>
                  <SelectItem value="static">Static Display</SelectItem>
                  <SelectItem value="off">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Theme Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Live Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div className="text-purple-500 font-bold">organism</div>
              <div className="ml-2">
                <div className="text-blue-500">SampleOrganism</div>
                <div className="text-gray-500">{"{"}</div>
                <div className="ml-4">
                  <div className="text-green-500">state</div>
                  <div className="text-gray-500">{"{"}</div>
                  <div className="ml-4">
                    <div>
                      <span className="text-blue-400">consciousness</span>
                      <span className="text-gray-400">:</span>
                      <span className="text-blue-400"> float</span>
                      <span className="text-gray-400"> = </span>
                      <span className="text-green-400">0.42</span>
                      <span className="text-gray-400">;</span>
                    </div>
                  </div>
                  <div className="text-gray-500">{"}"}</div>
                </div>
                <div className="text-gray-500 italic">// This is a comment</div>
                <div className="text-gray-500">{"}"}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 border-t">
        <div className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Apply Settings</Button>
        </div>
      </div>
    </div>
  )
}
