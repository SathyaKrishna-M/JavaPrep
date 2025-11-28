'use client'

import { useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import * as monaco from 'monaco-editor'
import { motion } from 'framer-motion'

interface CodeEditorProps {
  code: string
  onChange: (value: string | undefined) => void
  highlightLine?: number
  readOnly?: boolean
}

export default function CodeEditor({ code, onChange, highlightLine, readOnly = false }: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const decorationsRef = useRef<string[]>([])

  useEffect(() => {
    if (editorRef.current && highlightLine !== undefined && highlightLine > 0) {
      const editor = editorRef.current
      const model = editor.getModel()
      if (model) {
        // Validate line number is within model bounds
        const lineCount = model.getLineCount()
        if (highlightLine < 1 || highlightLine > lineCount) {
          console.warn(`[CodeEditor] Invalid line number: ${highlightLine} (model has ${lineCount} lines)`)
          // Clear decorations if invalid
          decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [])
          return
        }
        
        // Remove existing decorations
        decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [])
        
        try {
          // Get max column for the line (safely)
          const maxColumn = model.getLineMaxColumn(highlightLine)
          
          // Add glowing highlight decoration
          const decorations: editor.IModelDeltaDecoration[] = [
            {
              range: {
                startLineNumber: highlightLine,
                startColumn: 1,
                endLineNumber: highlightLine,
                endColumn: maxColumn,
              },
              options: {
                isWholeLine: true,
                className: 'executing-line-glow',
                glyphMarginClassName: 'executing-line-glyph',
                minimap: {
                  color: '#3b82f6',
                  position: 1,
                },
              },
            },
          ]
          
          decorationsRef.current = editor.deltaDecorations(decorationsRef.current, decorations)
          
          // Smooth scroll to highlighted line
          editor.revealLineInCenter(highlightLine, 1) // 1 = smooth scroll
        } catch (error) {
          console.error(`[CodeEditor] Error highlighting line ${highlightLine}:`, error)
          // Clear decorations on error
          decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [])
        }
      }
    } else if (editorRef.current && highlightLine === undefined) {
      // Clear decorations when no line to highlight
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, [])
    }
  }, [highlightLine])

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
    
    // Configure editor theme and options
    editor.updateOptions({
      fontSize: 14,
      fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      lineNumbers: 'on',
      readOnly,
      smoothScrolling: true,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      padding: { top: 16, bottom: 16 },
      renderLineHighlight: 'all',
      lineHeight: 22,
    })
  }

  return (
    <div className="w-full h-full border border-white/10 rounded-xl overflow-hidden bg-[#0d1117] shadow-2xl relative">
      <Editor
        height="100%"
        defaultLanguage="java"
        value={code}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          readOnly,
          fontSize: 14,
          fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          lineNumbers: 'on',
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          renderLineHighlight: 'all',
          lineHeight: 22,
        }}
      />
      <style jsx global>{`
        .monaco-editor .line-numbers {
          color: #6b7280;
          font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
        }
        .monaco-editor .margin {
          background-color: #0d1117;
        }
        .monaco-editor .monaco-editor-background {
          background-color: #0d1117;
        }
        
        /* Executing line glow effect */
        .monaco-editor .executing-line-glow {
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(59, 130, 246, 0.25) 50%, 
            rgba(59, 130, 246, 0.15) 100%);
          border-left: 4px solid #3b82f6;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          animation: lineGlow 2s ease-in-out infinite;
        }
        
        @keyframes lineGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
          }
        }
        
        .monaco-editor .executing-line-glyph {
          background-color: #3b82f6;
          width: 4px !important;
        }
        
        /* Dim non-executing lines slightly */
        .monaco-editor .view-lines .view-line {
          opacity: 0.85;
          transition: opacity 0.3s ease;
        }
        
        .monaco-editor .executing-line-glow + .view-line,
        .monaco-editor .view-lines .view-line:hover {
          opacity: 1;
        }
        
        /* Custom scrollbar */
        .monaco-editor .monaco-scrollable-element > .scrollbar {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .monaco-editor .monaco-scrollable-element > .scrollbar > .slider {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        
        .monaco-editor .monaco-scrollable-element > .scrollbar > .slider:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  )
}
