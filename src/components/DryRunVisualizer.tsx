'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CodeBlock from './CodeBlock'
import { FiPlay, FiPause, FiSkipForward, FiRotateCcw, FiEye, FiChevronLeft } from 'react-icons/fi'

export interface DryRunStep {
  line: number
  vars: Record<string, any>
  output: string
  description?: string
  arrayState?: Array<{ index: number; value: any; highlighted?: boolean }>
  conditionResult?: boolean
}

interface DryRunVisualizerProps {
  code: string
  steps: DryRunStep[]
  title?: string
}

export default function DryRunVisualizer({
  code,
  steps,
  title = 'Dry Run Visualization',
}: DryRunVisualizerProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1000)

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
      }, speed)
      return () => clearTimeout(timer)
    } else if (isPlaying && currentStep === steps.length - 1) {
      setIsPlaying(false)
    }
  }, [isPlaying, currentStep, steps.length, speed])

  const handlePlay = () => {
    if (currentStep === steps.length - 1) {
      setCurrentStep(0)
    }
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setIsPlaying(false)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setIsPlaying(false)
    }
  }

  const step = steps[currentStep]
  const highlightLines = step ? [step.line] : []

  return (
    <div className="space-y-6">
      <div className="glass-card border-blue-500/30 shadow-xl shadow-blue-500/10">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          <FiEye className="w-6 h-6 text-blue-400" />
          {title}
        </h3>

        {/* Controls */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlay}
            className="glass px-5 py-2.5 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center gap-2 font-semibold text-blue-400 border border-blue-500/30"
          >
            {isPlaying ? (
              <>
                <FiPause className="w-4 h-4" /> Pause
              </>
            ) : (
              <>
                <FiPlay className="w-4 h-4" /> Play
              </>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="glass px-5 py-2.5 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center gap-2 font-semibold text-gray-300 border border-gray-700/30"
          >
            <FiRotateCcw className="w-4 h-4" /> Reset
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="glass px-5 py-2.5 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center gap-2 font-semibold text-gray-300 border border-gray-700/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSkipForward className="w-4 h-4" /> Next
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="glass px-5 py-2.5 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center gap-2 font-semibold text-gray-300 border border-gray-700/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronLeft className="w-4 h-4" /> Previous
          </motion.button>
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm">Speed:</label>
            <input
              type="range"
              min="200"
              max="2000"
              step="200"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-sm text-gray-400">{speed}ms</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 glass p-4 rounded-lg">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-blue-400 font-semibold">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-cyan-400 font-semibold">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full shadow-lg shadow-blue-500/50"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Code Block */}
        <CodeBlock
          code={code}
          language="java"
          currentLine={step?.line}
          highlightLines={highlightLines}
        />

        {/* Variable States */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Variables */}
            <div className="glass-card border-blue-500/20">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                Variables
              </h4>
              <div className="space-y-2">
                {Object.entries(step?.vars || {}).length > 0 ? (
                  Object.entries(step?.vars || {}).map(([key, value]) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
                    >
                      <span className="font-mono text-blue-400 font-semibold">{key}</span>
                      <span className="font-mono text-white bg-gray-800/50 px-3 py-1 rounded">
                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">No variables in this step</p>
                )}
              </div>
            </div>

            {/* Output */}
            <div className="glass-card border-green-500/20">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Output
              </h4>
              <div className="p-4 bg-black/50 rounded-lg font-mono text-green-400 min-h-[100px] border border-green-500/20 shadow-lg overflow-auto">
                {step?.output ? (
                  <pre className="font-mono text-green-400 whitespace-pre-wrap break-words m-0 font-normal">
                    {step.output
                      .replace(/\\n/g, '\n')
                      .replace(/\\t/g, '\t')
                      .replace(/\\r/g, '\r')}
                  </pre>
                ) : (
                  <span className="text-gray-500 italic">(no output yet)</span>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Array State */}
        {step?.arrayState && step.arrayState.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 glass-card border-amber-500/20"
          >
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-amber-400">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              Array State
            </h4>
            <div className="flex gap-3 flex-wrap">
              {step.arrayState.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: item.highlighted ? 1.15 : 1,
                    opacity: 1,
                  }}
                  whileHover={{ scale: 1.1 }}
                  className={`px-4 py-3 rounded-lg border-2 flex flex-col items-center min-w-[70px] transition-all ${
                    item.highlighted
                      ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border-blue-400 shadow-lg shadow-blue-500/50'
                      : 'bg-gray-800/30 border-gray-700/50'
                  }`}
                >
                  <span className="text-xs text-gray-400 mb-1">[{item.index}]</span>
                  <span className="font-mono text-white font-bold text-lg">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Condition Result */}
        {step?.conditionResult !== undefined && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-6 glass-card border-purple-500/20"
          >
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-purple-400">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Condition Result
            </h4>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={`p-4 rounded-lg border-2 font-semibold text-lg ${
                step.conditionResult
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 text-green-400'
                  : 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-400/50 text-red-400'
              }`}
            >
              <div className="flex items-center gap-2">
                {step.conditionResult ? (
                  <>
                    <span className="text-2xl">✓</span>
                    <span>True</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">✗</span>
                    <span>False</span>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Description */}
        {step?.description && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 glass-card bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30"
          >
            <div className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">💡</span>
              <p className="text-gray-200 leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

