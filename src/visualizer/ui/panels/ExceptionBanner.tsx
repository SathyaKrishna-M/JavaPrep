/**
 * Exception Banner Component
 * 
 * Displays active exception with message, type, and stack trace.
 * Milestone D: Exception visualization.
 */

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ExceptionInfo } from '@/visualizer/core/tracking/Snapshot'
import { FiAlertTriangle, FiX, FiExternalLink } from 'react-icons/fi'

interface ExceptionBannerProps {
  exception: ExceptionInfo | null
  onDismiss?: () => void
  onJumpToLine?: (line: number) => void
  onJumpToThrowSite?: (stepIndex: number) => void
}

export default function ExceptionBanner({
  exception,
  onDismiss,
  onJumpToLine,
  onJumpToThrowSite,
}: ExceptionBannerProps) {
  if (!exception) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="mb-4 p-6 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 border-2 border-red-500/50 shadow-xl shadow-red-500/20 backdrop-blur-xl"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30"
              >
                <FiAlertTriangle className="w-6 h-6 text-red-400" />
              </motion.div>
              <h4 className="text-xl font-bold text-red-400">{exception.type}</h4>
            </div>
            
            <p className="text-red-200 mb-3">{exception.message}</p>
            
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => onJumpToLine?.(exception.line)}
                className="text-red-300 hover:text-red-200 flex items-center gap-1 underline"
              >
                Line {exception.line}
                <FiExternalLink className="w-3 h-3" />
              </button>
              
              {exception.throwSite !== undefined && (
                <button
                  onClick={() => onJumpToThrowSite?.(exception.throwSite!)}
                  className="text-red-300 hover:text-red-200 flex items-center gap-1 underline"
                >
                  Step {exception.throwSite}
                  <FiExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Stack Trace */}
            {exception.stack && exception.stack.length > 0 && (
              <div className="mt-4 pt-4 border-t border-red-500/30">
                <div className="text-xs text-gray-400 mb-2">Stack Trace:</div>
                <div className="space-y-1">
                  {exception.stack.map((frame, index) => (
                    <div key={index} className="text-xs text-red-200 font-mono">
                      {frame}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {onDismiss && (
            <button
              onClick={onDismiss}
              className="ml-4 p-1 rounded hover:bg-red-500/20 transition-colors text-red-400 hover:text-red-300"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

