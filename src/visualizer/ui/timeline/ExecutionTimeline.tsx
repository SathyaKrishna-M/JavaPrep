/**
 * Execution Timeline Component
 * 
 * Displays and controls execution timeline with play/pause/step controls.
 * Milestone E: Enhanced with keyboard shortcuts, speed presets, smooth animations.
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlay, FiPause, FiSkipForward, FiSkipBack, FiRotateCcw, FiZap } from 'react-icons/fi'

interface ExecutionTimelineProps {
  totalSteps: number
  currentStep: number
  onStepChange: (step: number) => void
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  isPlaying: boolean
  speed: number
  onSpeedChange: (speed: number) => void
}

const SPEED_PRESETS = [
  { label: '0.25x', value: 4000 },
  { label: '0.5x', value: 2000 },
  { label: '1x', value: 1000 },
  { label: '2x', value: 500 },
]

export default function ExecutionTimeline({
  totalSteps,
  currentStep,
  onStepChange,
  onPlay,
  onPause,
  onReset,
  isPlaying,
  speed,
  onSpeedChange,
}: ExecutionTimelineProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [sliderValue, setSliderValue] = useState(currentStep)

  useEffect(() => {
    if (!isDragging) {
      setSliderValue(currentStep)
    }
  }, [currentStep, isDragging])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with text input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Don't interfere with Monaco Editor
      // Check if Monaco editor is focused
      const activeElement = document.activeElement
      if (activeElement) {
        const isMonacoEditor = activeElement.closest('.monaco-editor') !== null ||
                              activeElement.closest('.monaco-editor-container') !== null ||
                              activeElement.classList.contains('monaco-inputbox') ||
                              activeElement.getAttribute('role') === 'textbox'
        if (isMonacoEditor) {
          return // Don't intercept keys when Monaco editor is focused
        }
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          if (currentStep > 0) {
            onStepChange(currentStep - 1)
            onPause()
          }
          break
        case 'ArrowRight':
          e.preventDefault()
          if (currentStep < totalSteps - 1) {
            onStepChange(currentStep + 1)
            onPause()
          }
          break
        case ' ':
          e.preventDefault()
          if (isPlaying) {
            onPause()
          } else {
            onPlay()
          }
          break
        case 'Home':
          e.preventDefault()
          onStepChange(0)
          onPause()
          break
        case 'End':
          e.preventDefault()
          onStepChange(totalSteps - 1)
          onPause()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, totalSteps, isPlaying, onStepChange, onPlay, onPause])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    setSliderValue(newValue)
    onStepChange(newValue)
    onPause()
  }

  const handleSliderMouseDown = () => {
    setIsDragging(true)
  }

  const handleSliderMouseUp = () => {
    setIsDragging(false)
  }

  const handlePlayFromHere = () => {
    if (currentStep < totalSteps - 1) {
      onStepChange(currentStep)
      onPlay()
    }
  }

  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl border border-white/10 shadow-xl p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30">
            <FiZap className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Execution Timeline</h3>
            <p className="text-xs text-gray-400">Use arrow keys to navigate, Space to play/pause</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isPlaying ? onPause : onPlay}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={totalSteps === 0}
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
          onClick={onReset}
          className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-medium transition-all duration-200 flex items-center gap-2"
        >
          <FiRotateCcw className="w-4 h-4" /> Reset
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStepChange(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSkipBack className="w-4 h-4" /> Prev
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStepChange(Math.min(totalSteps - 1, currentStep + 1))}
          disabled={currentStep === totalSteps - 1}
          className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSkipForward className="w-4 h-4" /> Next
        </motion.button>

        {currentStep < totalSteps - 1 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayFromHere}
            className="px-4 py-2.5 rounded-xl bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 font-medium transition-all duration-200 flex items-center gap-2 text-sm"
          >
            <FiPlay className="w-3 h-3" /> Play from here
          </motion.button>
        )}

        {/* Speed Presets */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-gray-400">Speed:</span>
          <div className="flex gap-1">
            {SPEED_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => onSpeedChange(preset.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  speed === preset.value
                    ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar with Draggable Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-blue-400 font-semibold">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-cyan-400 font-semibold">
            {totalSteps > 0 ? Math.round(progress) : 0}%
          </span>
        </div>
        
        <div className="relative">
          {/* Background Track */}
          <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
            {/* Progress Fill */}
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full shadow-lg shadow-blue-500/50 relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ 
                duration: isDragging ? 0 : 0.3, 
                ease: 'easeOut' 
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </motion.div>
          </div>
          
          {/* Draggable Slider */}
          <input
            type="range"
            min="0"
            max={Math.max(0, totalSteps - 1)}
            value={sliderValue}
            onChange={handleSliderChange}
            onMouseDown={handleSliderMouseDown}
            onMouseUp={handleSliderMouseUp}
            onTouchStart={handleSliderMouseDown}
            onTouchEnd={handleSliderMouseUp}
            className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer z-10"
            disabled={totalSteps === 0}
          />
        </div>
      </div>
    </motion.div>
  )
}
