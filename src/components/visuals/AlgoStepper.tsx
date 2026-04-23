'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiRefreshCw } from 'react-icons/fi'

export interface AlgoStep {
  title: string
  description: string
  code?: string
  visual?: React.ReactNode
}

interface AlgoStepperProps {
  steps: AlgoStep[]
  title?: string
  autoPlay?: boolean
  interval?: number
  className?: string
}

export default function AlgoStepper({
  steps,
  title,
  autoPlay = false,
  interval = 2000,
  className = '',
}: AlgoStepperProps) {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(autoPlay)

  const goNext = useCallback(() => setCurrent(c => Math.min(steps.length - 1, c + 1)), [steps.length])
  const goPrev = () => { setPlaying(false); setCurrent(c => Math.max(0, c - 1)) }
  const reset  = () => { setPlaying(false); setCurrent(0) }

  useEffect(() => {
    if (!playing) return
    if (current >= steps.length - 1) { setPlaying(false); return }
    const t = setTimeout(goNext, interval)
    return () => clearTimeout(t)
  }, [playing, current, steps.length, interval, goNext])

  const step = steps[current]
  const atEnd = current === steps.length - 1

  return (
    <div className={`bg-slate-900/60 rounded-xl border border-slate-700/60 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/60 bg-slate-800/40">
        <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">{title ?? 'Algorithm Steps'}</p>
        <span className="text-xs text-gray-500 font-mono">{current + 1} / {steps.length}</span>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-slate-800">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
          animate={{ width: `${((current + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Step content */}
      <div className="p-4 min-h-[96px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }}
          >
            <p className="text-cyan-300 font-semibold text-sm mb-1">{step.title}</p>
            <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
            {step.code && (
              <div className="mt-2 bg-black/50 rounded-lg px-3 py-2 font-mono text-xs text-amber-300 border border-amber-900/30 leading-relaxed">
                {step.code}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Visual area */}
      {steps.some(s => s.visual) && (
        <div className="px-4 pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`v-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {step.visual}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-700/60 bg-slate-800/30">
        {/* Step dots */}
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPlaying(false); setCurrent(i) }}
              className={`rounded-full transition-all duration-200 ${
                i === current ? 'w-4 h-1.5 bg-cyan-400' : 'w-1.5 h-1.5 bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-slate-700 transition-colors"
            title="Reset"
          >
            <FiRefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-gray-300 transition-colors"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => { if (atEnd) { reset(); setPlaying(true) } else setPlaying(p => !p) }}
            className="px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-400 text-xs font-semibold transition-colors flex items-center gap-1.5 min-w-[64px] justify-center"
          >
            {playing ? <FiPause className="w-3 h-3" /> : <FiPlay className="w-3 h-3" />}
            {playing ? 'Pause' : atEnd ? 'Replay' : 'Play'}
          </button>
          <button
            onClick={() => { setPlaying(false); goNext() }}
            disabled={atEnd}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-gray-300 transition-colors"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
