'use client'

import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import { FullProgram } from './FullProgramModal'

interface CodeBlockProps {
  code: string
  language?: string
  highlightLines?: number[]
  currentLine?: number
  fullProgram?: FullProgram
}

export default function CodeBlock({
  code,
  language = 'java',
  highlightLines = [],
  currentLine,
  fullProgram,
}: CodeBlockProps) {
  const [activeLines, setActiveLines] = useState<number[]>([])
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  const displayCode = fullProgram ? fullProgram.code : code

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl overflow-hidden shadow-2xl bg-[#282c34]"
      >
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            borderRadius: '0.75rem',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            background: 'transparent',
          }}
          lineProps={(lineNumber) => {
            const isHighlighted = highlightLines.includes(lineNumber) || activeLines.includes(lineNumber)
            const isCurrent = currentLine === lineNumber
            return {
              style: {
                backgroundColor: isCurrent
                  ? 'rgba(0, 180, 255, 0.25)'
                  : isHighlighted
                    ? 'rgba(0, 123, 255, 0.15)'
                    : 'transparent',
                display: 'block',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
                marginLeft: '-0.5rem',
                marginRight: '-0.5rem',
                transition: 'all 0.3s ease',
                borderLeft: isCurrent
                  ? '3px solid rgba(0, 180, 255, 0.8)'
                  : isHighlighted
                    ? '3px solid rgba(0, 180, 255, 0.6)'
                    : '3px solid transparent',
                boxShadow: isCurrent
                  ? '0 0 10px rgba(0, 180, 255, 0.3)'
                  : 'none',
              },
            }
          }}
          showLineNumbers
        >
          {displayCode}
        </SyntaxHighlighter>
      </motion.div>

      {fullProgram && fullProgram.explanations && (
        <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden">
          <button
            onClick={() => setIsExplanationOpen(!isExplanationOpen)}
            className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            <h4 className="text-lg font-semibold text-gray-200">Line-by-Line Explanation</h4>
            <motion.div
              animate={{ rotate: isExplanationOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExplanationOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 md:px-6 pb-4 md:pb-6"
              >
                <ol className="space-y-4 list-none m-0 p-0 text-gray-300">
                  {fullProgram.explanations.map((exp, index) => {
                    let lineLabel = ""
                    if (exp.lines.length === 1) {
                      lineLabel = "Line: " + exp.lines[0]
                    } else if (exp.lines.length > 1) {
                      const sorted = [...exp.lines].sort((a, b) => a - b)
                      lineLabel = "Lines: " + sorted[0] + " - " + sorted[sorted.length - 1]
                    }

                    return (
                      <li
                        key={index}
                        className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-colors cursor-default"
                        onMouseEnter={() => setActiveLines(exp.lines)}
                        onMouseLeave={() => setActiveLines([])}
                      >
                        {lineLabel && (
                          <div className="text-xs font-mono text-cyan-400 mb-2">{lineLabel}</div>
                        )}
                        <div className="text-sm text-gray-300">{exp.content}</div>
                      </li>
                    )
                  })}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
