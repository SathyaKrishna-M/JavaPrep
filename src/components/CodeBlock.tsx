'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { motion } from 'framer-motion'

interface CodeBlockProps {
  code: string
  language?: string
  highlightLines?: number[]
  currentLine?: number
}

export default function CodeBlock({
  code,
  language = 'java',
  highlightLines = [],
  currentLine,
}: CodeBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden shadow-2xl"
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
        }}
        lineProps={(lineNumber) => {
          const isHighlighted = highlightLines.includes(lineNumber)
          const isCurrent = currentLine === lineNumber
          return {
            style: {
              backgroundColor: isCurrent
                ? 'rgba(0, 180, 255, 0.25)'
                : isHighlighted
                ? 'rgba(0, 123, 255, 0.1)'
                : 'transparent',
              display: 'block',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
              marginLeft: '-0.5rem',
              marginRight: '-0.5rem',
              transition: 'all 0.3s ease',
              borderLeft: isCurrent
                ? '3px solid rgba(0, 180, 255, 0.8)'
                : '3px solid transparent',
              boxShadow: isCurrent
                ? '0 0 10px rgba(0, 180, 255, 0.3)'
                : 'none',
            },
          }
        }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </motion.div>
  )
}

