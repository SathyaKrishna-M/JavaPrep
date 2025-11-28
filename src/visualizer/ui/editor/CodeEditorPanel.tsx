/**
 * Code Editor Panel Component
 * 
 * Wrapper around Monaco Editor for the visualizer.
 * 
 * TODO: Add line highlighting based on current snapshot
 * TODO: Add breakpoint support
 * TODO: Add syntax error highlighting
 * TODO: Add code formatting
 */

'use client'

import { useState, useEffect } from 'react'
import CodeEditor from '@/components/CodeEditor'

interface CodeEditorPanelProps {
  code: string
  onChange: (code: string) => void
  highlightLine?: number
  readOnly?: boolean
}

export default function CodeEditorPanel({
  code,
  onChange,
  highlightLine,
  readOnly = false,
}: CodeEditorPanelProps) {
  return (
    <div className="h-full flex flex-col min-h-[500px]">
      <CodeEditor
        code={code}
        onChange={(value) => onChange(value || '')}
        highlightLine={highlightLine}
        readOnly={readOnly}
      />
    </div>
  )
}

