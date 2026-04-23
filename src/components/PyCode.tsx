'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface PyCodeProps {
  children: string
  language?: string
}

export default function PyCode({ children, language = 'python' }: PyCodeProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-[#282c34] my-2">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1.25rem',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          background: 'transparent',
        }}
        showLineNumbers
        lineNumberStyle={{ color: '#4b5563', minWidth: '2.5em' }}
      >
        {children.replace(/^\n/, '')}
      </SyntaxHighlighter>
    </div>
  )
}
