/**
 * Visualizer Layout Component
 * 
 * Main layout component with resizable split-pane design.
 * Milestone E: Enhanced with resizable panels and responsive layout.
 */

'use client'

import { ReactNode, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface VisualizerLayoutProps {
  editor: ReactNode
  visualizer: ReactNode
  timeline: ReactNode
}

export default function VisualizerLayout({
  editor,
  visualizer,
  timeline,
}: VisualizerLayoutProps) {
  const [editorWidth, setEditorWidth] = useState(50) // Percentage
  const [isResizing, setIsResizing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [editorCollapsed, setEditorCollapsed] = useState(false)
  const [visualizerCollapsed, setVisualizerCollapsed] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return

      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100
      
      // Constrain between 30% and 70%
      const constrainedWidth = Math.max(30, Math.min(70, newWidth))
      setEditorWidth(constrainedWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  // Mobile: Vertical stacking
  if (isMobile) {
    return (
      <div className="space-y-6">
        {/* Editor Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl border border-white/10 shadow-xl"
        >
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <h3 className="text-lg font-semibold text-white">Code Editor</h3>
            <button
              onClick={() => setEditorCollapsed(!editorCollapsed)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {editorCollapsed ? (
                <FiChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <FiChevronUp className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
          {!editorCollapsed && <div className="p-4">{editor}</div>}
        </motion.div>

        {/* Timeline */}
        {timeline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl border border-white/10 shadow-xl p-4"
          >
            {timeline}
          </motion.div>
        )}

        {/* Visualizer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl border border-white/10 shadow-xl"
        >
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <h3 className="text-lg font-semibold text-white">Visualization</h3>
            <button
              onClick={() => setVisualizerCollapsed(!visualizerCollapsed)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {visualizerCollapsed ? (
                <FiChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <FiChevronUp className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
          {!visualizerCollapsed && <div className="p-4">{visualizer}</div>}
        </motion.div>
      </div>
    )
  }

  // Tablet: Two-column layout
  if (isTablet) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          {editor}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col space-y-6"
        >
          {timeline && <div>{timeline}</div>}
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-20rem)]">
            {visualizer}
          </div>
        </motion.div>
      </div>
    )
  }

  // Desktop: Resizable split-pane
  return (
    <div
      ref={containerRef}
      className="relative flex gap-4 h-full min-h-[600px]"
    >
      {/* Left: Editor */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col"
        style={{ width: `${editorWidth}%` }}
      >
        <div className="h-full">{editor}</div>
      </motion.div>

      {/* Resizer */}
      <div
        onMouseDown={handleMouseDown}
        className={`w-1 bg-gradient-to-b from-transparent via-white/10 to-transparent cursor-col-resize hover:via-white/20 transition-colors ${
          isResizing ? 'via-white/30' : ''
        }`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-1 h-12 bg-white/20 rounded-full" />
        </div>
      </div>

      {/* Right: Visualizer */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col"
        style={{ width: `${100 - editorWidth}%` }}
      >
        <div className="mb-6">{timeline}</div>
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-20rem)] pr-2 custom-scrollbar">
          {visualizer}
        </div>
      </motion.div>
    </div>
  )
}
