/**
 * Output Panel Component
 * 
 * Displays program output (System.out.println/print).
 * Milestone E: Enhanced with animations, formatting, and empty states.
 */

'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTerminal, FiCopy, FiCheck } from 'react-icons/fi'
import { useState } from 'react'

interface OutputPanelProps {
  output: string
}

export default function OutputPanel({ output }: OutputPanelProps) {
  const outputRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const formattedOutput = output
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\r/g, '\r')

  return (
    <div className="h-full flex flex-col glass-card rounded-2xl border border-white/10 shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold flex items-center gap-2 text-green-400">
          <FiTerminal className="w-5 h-5" />
          Output
        </h4>
        {output && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            {copied ? (
              <>
                <FiCheck className="w-4 h-4 text-green-400" />
                Copied
              </>
            ) : (
              <>
                <FiCopy className="w-4 h-4" />
                Copy
              </>
            )}
          </motion.button>
        )}
      </div>

      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 bg-black/60 rounded-xl font-mono text-green-400 min-h-[120px] border border-green-500/20 shadow-inner custom-scrollbar"
      >
        <AnimatePresence mode="wait">
          {output ? (
            <motion.pre
              key="output-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-mono text-green-400 whitespace-pre-wrap break-words m-0 font-normal text-sm leading-relaxed"
            >
              {formattedOutput}
            </motion.pre>
          ) : (
            <motion.div
              key="empty-output"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <FiTerminal className="w-8 h-8 text-green-400/50" />
              </div>
              <p className="text-gray-500 text-sm italic">(no output yet)</p>
              <p className="text-gray-600 text-xs mt-2">Output will appear here when your program prints</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
