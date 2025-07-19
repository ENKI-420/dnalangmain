"use client"

import { useEffect } from "react"

interface BioGlowCSSInjectorProps {
  isActive: boolean
}

export function BioGlowCSSInjector({ isActive }: BioGlowCSSInjectorProps) {
  useEffect(() => {
    if (!isActive) {
      // Remove bio-glow styles
      const existingStyle = document.getElementById("bio-glow-styles")
      if (existingStyle) {
        existingStyle.remove()
      }
      return
    }

    // Inject bio-glow CSS
    const style = document.createElement("style")
    style.id = "bio-glow-styles"
    style.textContent = `
      /* Bio-Glow Editor Enhancements */
      .monaco-editor .view-lines .view-line {
        transition: all 0.2s ease-in-out;
      }

      .monaco-editor .view-lines .view-line:hover {
        background: rgba(0, 255, 136, 0.05) !important;
        box-shadow: 0 0 10px rgba(0, 255, 136, 0.1);
      }

      /* Glowing cursor */
      .monaco-editor .cursor {
        box-shadow: 0 0 8px #00FF88, 0 0 16px #00FF88;
        animation: bio-cursor-pulse 1.5s ease-in-out infinite;
      }

      @keyframes bio-cursor-pulse {
        0%, 100% { 
          box-shadow: 0 0 8px #00FF88, 0 0 16px #00FF88; 
        }
        50% { 
          box-shadow: 0 0 12px #00FF88, 0 0 24px #00FF88, 0 0 32px #00FF88; 
        }
      }

      /* Glowing brackets */
      .monaco-editor .bracket-match {
        background: rgba(0, 255, 136, 0.2) !important;
        border: 1px solid #00FF88 !important;
        box-shadow: 0 0 8px rgba(0, 255, 136, 0.3);
        animation: bio-bracket-glow 0.5s ease-in-out;
      }

      @keyframes bio-bracket-glow {
        0% { 
          box-shadow: 0 0 4px rgba(0, 255, 136, 0.3); 
        }
        100% { 
          box-shadow: 0 0 12px rgba(0, 255, 136, 0.5); 
        }
      }

      /* Glowing selection */
      .monaco-editor .selected-text {
        background: rgba(0, 255, 136, 0.15) !important;
        box-shadow: inset 0 0 8px rgba(0, 255, 136, 0.2);
        animation: bio-selection-pulse 2s ease-in-out infinite;
      }

      @keyframes bio-selection-pulse {
        0%, 100% { 
          background: rgba(0, 255, 136, 0.15) !important; 
        }
        50% { 
          background: rgba(0, 255, 136, 0.25) !important; 
        }
      }

      /* Minimap glow */
      .monaco-editor .minimap {
        border-left: 1px solid rgba(0, 255, 136, 0.3);
        box-shadow: -2px 0 8px rgba(0, 255, 136, 0.1);
      }

      /* Scrollbar glow */
      .monaco-editor .scrollbar .slider {
        background: rgba(0, 255, 136, 0.3) !important;
        box-shadow: 0 0 4px rgba(0, 255, 136, 0.5);
      }

      .monaco-editor .scrollbar .slider:hover {
        background: rgba(0, 255, 136, 0.5) !important;
        box-shadow: 0 0 8px rgba(0, 255, 136, 0.7);
      }

      /* Line numbers glow */
      .monaco-editor .line-numbers {
        color: #00AA55 !important;
        text-shadow: 0 0 4px rgba(0, 255, 136, 0.3);
        transition: all 0.2s ease-in-out;
      }

      .monaco-editor .line-numbers.active-line-number {
        color: #00FF88 !important;
        text-shadow: 0 0 8px rgba(0, 255, 136, 0.6);
        font-weight: bold;
      }

      /* Syntax highlighting glow effects */
      .monaco-editor .mtk1 { /* Default text */
        text-shadow: 0 0 2px rgba(152, 251, 152, 0.3);
      }

      .monaco-editor .mtk5 { /* Keywords */
        text-shadow: 0 0 4px rgba(0, 255, 136, 0.5);
        animation: bio-keyword-glow 3s ease-in-out infinite;
      }

      @keyframes bio-keyword-glow {
        0%, 100% { 
          text-shadow: 0 0 4px rgba(0, 255, 136, 0.5); 
        }
        50% { 
          text-shadow: 0 0 8px rgba(0, 255, 136, 0.7), 0 0 12px rgba(0, 255, 136, 0.3); 
        }
      }

      .monaco-editor .mtk6 { /* Strings */
        text-shadow: 0 0 4px rgba(255, 215, 0, 0.4);
      }

      .monaco-editor .mtk7 { /* Comments */
        text-shadow: 0 0 3px rgba(127, 255, 0, 0.4);
        animation: bio-comment-fade 4s ease-in-out infinite;
      }

      @keyframes bio-comment-fade {
        0%, 100% { 
          opacity: 0.7; 
        }
        50% { 
          opacity: 0.9; 
        }
      }

      /* Error and warning glows */
      .monaco-editor .squiggly-error {
        border-bottom: 2px wavy #FF1744;
        box-shadow: 0 2px 4px rgba(255, 23, 68, 0.3);
        animation: bio-error-pulse 1s ease-in-out infinite;
      }

      @keyframes bio-error-pulse {
        0%, 100% { 
          box-shadow: 0 2px 4px rgba(255, 23, 68, 0.3); 
        }
        50% { 
          box-shadow: 0 2px 8px rgba(255, 23, 68, 0.6); 
        }
      }

      .monaco-editor .squiggly-warning {
        border-bottom: 2px wavy #FFD700;
        box-shadow: 0 2px 4px rgba(255, 215, 0, 0.3);
      }

      /* Autocomplete popup glow */
      .monaco-editor .suggest-widget {
        background: rgba(10, 10, 10, 0.95) !important;
        border: 1px solid rgba(0, 255, 136, 0.3) !important;
        box-shadow: 0 4px 16px rgba(0, 255, 136, 0.2), 0 0 32px rgba(0, 255, 136, 0.1);
        backdrop-filter: blur(8px);
      }

      .monaco-editor .suggest-widget .monaco-list .monaco-list-row:hover {
        background: rgba(0, 255, 136, 0.1) !important;
        box-shadow: inset 0 0 8px rgba(0, 255, 136, 0.2);
      }

      .monaco-editor .suggest-widget .monaco-list .monaco-list-row.focused {
        background: rgba(0, 255, 136, 0.15) !important;
        box-shadow: inset 0 0 12px rgba(0, 255, 136, 0.3);
      }

      /* Find widget glow */
      .monaco-editor .find-widget {
        background: rgba(10, 10, 10, 0.95) !important;
        border: 1px solid rgba(0, 255, 136, 0.3) !important;
        box-shadow: 0 4px 16px rgba(0, 255, 136, 0.2);
      }

      /* Parameter hints glow */
      .monaco-editor .parameter-hints-widget {
        background: rgba(10, 10, 10, 0.95) !important;
        border: 1px solid rgba(0, 255, 136, 0.3) !important;
        box-shadow: 0 4px 16px rgba(0, 255, 136, 0.2);
      }

      /* Hover widget glow */
      .monaco-editor .monaco-hover {
        background: rgba(10, 10, 10, 0.95) !important;
        border: 1px solid rgba(0, 255, 136, 0.3) !important;
        box-shadow: 0 4px 16px rgba(0, 255, 136, 0.2);
      }

      /* Context menu glow */
      .monaco-menu {
        background: rgba(10, 10, 10, 0.95) !important;
        border: 1px solid rgba(0, 255, 136, 0.3) !important;
        box-shadow: 0 4px 16px rgba(0, 255, 136, 0.2);
      }

      .monaco-menu .monaco-action-bar .action-item:hover {
        background: rgba(0, 255, 136, 0.1) !important;
      }
    `

    document.head.appendChild(style)

    return () => {
      const existingStyle = document.getElementById("bio-glow-styles")
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [isActive])

  return null
}
