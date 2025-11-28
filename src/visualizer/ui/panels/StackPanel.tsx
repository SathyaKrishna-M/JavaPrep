/**
 * Call Stack Panel Component
 * 
 * Displays the current call stack from execution snapshot.
 * Milestone D: Enhanced with recursion highlighting and return values.
 */

'use client'

import { motion } from 'framer-motion'
import { StackFrame, ExecutionSnapshot } from '@/visualizer/core/tracking/Snapshot'
import { FiRepeat, FiArrowRight } from 'react-icons/fi'

interface StackPanelProps {
  callStack: StackFrame[]
  snapshot?: ExecutionSnapshot
}

export default function StackPanel({ callStack, snapshot }: StackPanelProps) {
  // Check if frame is recursive
  const isRecursiveFrame = (frame: StackFrame, index: number): boolean => {
    if (!snapshot?.recursionInfo) return false
    return snapshot.recursionInfo.repeatingFrames.some(
      rf => rf.className === frame.className && rf.methodName === frame.methodName
    )
  }

  return (
    <div className="h-full flex flex-col glass-card rounded-2xl border border-white/10 shadow-xl p-6">
      <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-400">
        <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
        Call Stack
        {snapshot?.recursionInfo?.isRecursive && (
          <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full flex items-center gap-1">
            <FiRepeat className="w-3 h-3" />
            Recursive
          </span>
        )}
        <span className="text-sm text-gray-500 font-normal">({callStack.length})</span>
      </h4>
      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
        {callStack.length > 0 ? (
          callStack.map((frame, index) => {
            const isRecursive = isRecursiveFrame(frame, index)
            const isTopFrame = index === callStack.length - 1
            const returnValue = isTopFrame && snapshot?.lastReturn 
              ? snapshot.lastReturn 
              : null
            const depth = callStack.length - index - 1

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  isRecursive
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/40 shadow-lg shadow-purple-500/20'
                    : 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/30'
                }`}
                style={{ marginLeft: `${depth * 12}px` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-purple-400 flex items-center gap-2">
                      {isRecursive && <FiRepeat className="w-4 h-4 text-pink-400" />}
                      {frame.className}.{frame.methodName}()
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      Line {frame.lineNumber}
                    </div>
                    {snapshot?.thisReference && isTopFrame && (
                      <div className="text-xs text-blue-400 mt-1">
                        this: {snapshot.thisReference}
                      </div>
                    )}
                    {returnValue && (
                      <div className="mt-2 pt-2 border-t border-purple-500/20 flex items-center gap-2">
                        <FiArrowRight className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-gray-400">Returns:</span>
                        <span className="text-xs text-green-400 font-mono">
                          {returnValue.value !== null ? String(returnValue.value) : 'void'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">#{callStack.length - index}</div>
                </div>
                {frame.localVariables && frame.localVariables.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-purple-500/20">
                    <div className="text-xs text-gray-500 mb-1">
                      {frame.localVariables.length} local variable(s)
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <p className="text-gray-500 text-sm italic">Call stack is empty</p>
            <p className="text-gray-600 text-xs mt-2">Method calls will appear here</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

