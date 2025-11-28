'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CodeEditorPanel from '@/visualizer/ui/editor/CodeEditorPanel'
import VariablesPanel from '@/visualizer/ui/panels/VariablesPanel'
import OutputPanel from '@/visualizer/ui/panels/OutputPanel'
import StackPanel from '@/visualizer/ui/panels/StackPanel'
import HeapPanel from '@/visualizer/ui/panels/HeapPanel'
import ExceptionBanner from '@/visualizer/ui/panels/ExceptionBanner'
import StaticInitPanel from '@/visualizer/ui/panels/StaticInitPanel'
import ExecutionTimeline from '@/visualizer/ui/timeline/ExecutionTimeline'
import VisualizerLayout from '@/visualizer/ui/layout/VisualizerLayout'
import { visualizeJava } from '@/visualizer/utils/pipeline'
import { SnapshotManager } from '@/visualizer/core/tracking/Snapshot'
import { ExecutionSnapshot } from '@/visualizer/core/tracking/Snapshot'
import { FiPlay, FiZap, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import CodeBlock from '@/components/CodeBlock'
// Server-side execution - no WASM or CheerpJ needed

export default function VisualizerPage() {
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        int x = 0;
        for (int i = 0; i < 5; i++) {
            x = x + i;
            System.out.println(x);
        }
    }
}`)
  const [snapshotManager] = useState(() => new SnapshotManager())
  const [currentSnapshot, setCurrentSnapshot] = useState<ExecutionSnapshot | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1000)
  // Server-side execution - no runtime initialization needed

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && currentSnapshot) {
      const currentIndex = snapshotManager.getCurrentIndex()
      const totalSteps = snapshotManager.getSnapshotCount()
      
      if (currentIndex < totalSteps - 1) {
        const timer = setTimeout(() => {
          snapshotManager.setCurrentIndex(currentIndex + 1)
          setCurrentSnapshot(snapshotManager.getCurrentSnapshot())
        }, speed)
        return () => clearTimeout(timer)
      } else {
        setIsPlaying(false)
      }
    }
  }, [isPlaying, currentSnapshot, speed, snapshotManager])

  const handleVisualize = async () => {
    if (!code.trim()) {
      setError('Please enter some Java code')
      return
    }

    setIsLoading(true)
    setError(null)
    setIsPlaying(false)
    snapshotManager.clear()

    try {
      // Use server-side execution pipeline
      console.log('[Visualizer] Using server-side execution pipeline')
      
      const result = await visualizeJava(code)
      
      if (result.snapshots && result.snapshots.length > 0) {
        snapshotManager.load(result.snapshots)
        setCurrentSnapshot(snapshotManager.getCurrentSnapshot())
        console.log(`[Visualizer] ✓ Execution complete: ${result.snapshots.length} snapshots`)
      } else {
        const errorMsg = result.errors?.join(', ') || 'No snapshots generated'
        throw new Error(errorMsg)
      }
      
      if (result.errors && result.errors.length > 0) {
        setError(result.errors.join(', '))
      }
      
      if (result.timedOut) {
        setError('Execution timed out (3 seconds). The program may have an infinite loop.')
      }
    } catch (err: any) {
      console.error('[Visualizer] Visualization error:', err)
      setError(err.message || 'An error occurred while visualizing the code')
      snapshotManager.clear()
      setCurrentSnapshot(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStepChange = (step: number) => {
    snapshotManager.setCurrentIndex(step)
    setCurrentSnapshot(snapshotManager.getCurrentSnapshot())
    setIsPlaying(false)
  }

  const handlePlay = () => {
    if (snapshotManager.getSnapshotCount() === 0) return
    
    if (snapshotManager.getCurrentIndex() === snapshotManager.getSnapshotCount() - 1) {
      snapshotManager.setCurrentIndex(0)
      setCurrentSnapshot(snapshotManager.getCurrentSnapshot())
    }
    setIsPlaying(!isPlaying)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    snapshotManager.setCurrentIndex(0)
    setCurrentSnapshot(snapshotManager.getCurrentSnapshot())
    setIsPlaying(false)
  }

  const totalSteps = snapshotManager.getSnapshotCount()
  const currentStep = snapshotManager.getCurrentIndex()

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <FiZap className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent leading-tight">
              Java Dry Run Visualizer
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl">
            Paste your Java code and visualize step-by-step execution with real-time variable tracking
          </p>
          
          {/* Server-side execution - no runtime status needed */}
        </motion.div>

        {/* Split Layout: Editor Left, Visualizer Right */}
        <VisualizerLayout
          editor={
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card rounded-2xl border border-white/10 shadow-xl p-6 h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <FiZap className="w-5 h-5 text-blue-400" />
                  Code Editor
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVisualize}
                  disabled={isLoading}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FiPlay className="w-4 h-4" />
                      Visualize
                    </>
                  )}
                </motion.button>
              </div>

              <div className="flex-1 min-h-0">
                <CodeEditorPanel
                  code={code}
                  onChange={setCode}
                  highlightLine={currentSnapshot?.lineNumber}
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-lg bg-red-500/20 border border-red-500/50 flex items-start gap-3"
                >
                  <FiAlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-400 mb-1">Error</h3>
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                </motion.div>
              )}

              {/* Success Message */}
              {!error && totalSteps > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-lg bg-green-500/20 border border-green-500/50 flex items-center gap-3"
                >
                  <FiCheckCircle className="w-5 h-5 text-green-400" />
                  <p className="text-green-300 text-sm">
                    Generated {totalSteps} execution steps
                  </p>
                </motion.div>
              )}
            </motion.div>
          }
          timeline={
            totalSteps > 0 ? (
              <ExecutionTimeline
                totalSteps={totalSteps}
                currentStep={currentStep}
                onStepChange={handleStepChange}
                onPlay={handlePlay}
                onPause={handlePause}
                onReset={handleReset}
                isPlaying={isPlaying}
                speed={speed}
                onSpeedChange={setSpeed}
              />
            ) : null
          }
          visualizer={
            currentSnapshot ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6 min-h-[600px]"
              >
                {/* Code Display with Highlighting - Removed duplicate, using editor highlight instead */}

                {/* Exception Banner */}
                {currentSnapshot.exception && (
                  <ExceptionBanner
                    exception={currentSnapshot.exception}
                    onJumpToLine={(line) => {
                      // Scroll editor to line
                      const editor = document.querySelector('.monaco-editor')
                      if (editor) {
                        // This will be handled by CodeEditor component
                      }
                    }}
                    onJumpToThrowSite={(stepIndex) => {
                      handleStepChange(stepIndex)
                    }}
                  />
                )}

                {/* Panels Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <VariablesPanel 
                    variables={currentSnapshot.variables}
                    previousVariables={snapshotManager.getSnapshot(Math.max(0, currentStep - 1))?.variables}
                  />
                  <OutputPanel output={currentSnapshot.output} />
                  <StackPanel 
                    callStack={currentSnapshot.callStack}
                    snapshot={currentSnapshot}
                  />
                  <HeapPanel 
                    heap={currentSnapshot.heap}
                    onObjectClick={(objectId) => {
                      // Could open ObjectInspector modal here
                      console.log('Object clicked:', objectId)
                    }}
                  />
                </div>

                {/* Static Init Panel */}
                {currentSnapshot.staticInits && currentSnapshot.staticInits.length > 0 && (
                  <StaticInitPanel staticInits={currentSnapshot.staticInits} />
                )}

                {/* Explanation */}
                {currentSnapshot.explanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">💡</span>
                      <p className="text-gray-200 leading-relaxed">{currentSnapshot.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card flex items-center justify-center min-h-[600px]"
              >
                <div className="text-center px-6">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30">
                    <FiZap className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-300 mb-3">
                    Ready to Visualize
                  </h3>
                  <p className="text-gray-400 text-base max-w-sm mx-auto leading-relaxed">
                    Enter your Java code on the left and click <strong className="text-blue-400">Visualize</strong> to see step-by-step execution with variable tracking
                  </p>
                </div>
              </motion.div>
            )
          }
        />
      </div>
      <Footer />
    </main>
  )
}
