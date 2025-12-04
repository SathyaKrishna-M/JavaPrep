'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiEye, FiPlay, FiGitBranch } from 'react-icons/fi'
import CodeBlock from './CodeBlock'
import DryRunVisualizer, { DryRunStep } from './DryRunVisualizer'
import AnimatedFlowchart, { FlowStep, FlowEdge } from './AnimatedFlowchart'
import CircuitDiagram from './CircuitDiagram'
import TruthTable from './TruthTable'
import KMap from './KMap'

export interface AccordionItem {
  question: string | React.ReactNode
  solution: string | React.ReactNode
  solutionCode?: string
  dryRunCode?: string
  dryRunSteps?: DryRunStep[]
  flowSteps?: FlowStep[]
  flowNodes?: FlowStep[]
  flowEdges?: FlowEdge[]
  circuitDiagram?: {
    type: string
    title?: string
    width?: number
    height?: number
  }
  truthTable?: {
    headers: string[]
    rows: (string | number)[][]
    title?: string
  }
  kMap?: {
    type: '2var' | '3var' | '4var'
    values: number[]
    title?: string
    highlightedGroups?: Array<{
      cells: number[]
      color?: string
    }>
  }
  customContent?: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [showDryRun, setShowDryRun] = useState<Record<number, boolean>>({})
  const [showFlowchart, setShowFlowchart] = useState<Record<number, boolean>>({})

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const toggleDryRun = (index: number) => {
    setShowDryRun((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const toggleFlowchart = (index: number) => {
    setShowFlowchart((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const questionId = `practice-${index}`
        return (
          <motion.div
            key={index}
            id={questionId}
            className="glass-card overflow-hidden scroll-mt-20"
            whileHover={{ boxShadow: '0 8px 32px 0 rgba(0, 180, 255, 0.2)' }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-500/10 transition-colors rounded-lg group"
            >
              <span className="font-semibold text-white flex-1 pr-4 group-hover:text-blue-400 transition-colors">
                {index + 1}. {item.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <FiChevronDown className="w-5 h-5 text-blue-400" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-gray-800/50 mt-2 pt-4 space-y-4">
                    {/* Solution */}
                    <div>
                      <div className="mb-3">
                        <span className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                          <span className="w-1 h-4 bg-cyan-400 rounded"></span>
                          Solution:
                        </span>
                      </div>
                      {item.solutionCode ? (
                        <div className="mt-2">
                          <CodeBlock code={item.solutionCode} language="java" />
                        </div>
                      ) : (
                        typeof item.solution === 'string' ? (
                          <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                            {item.solution}
                          </p>
                        ) : (
                          <div className="text-gray-300 leading-relaxed">
                            {item.solution}
                          </div>
                        )
                      )}
                    </div>

                    {/* Circuit Diagram */}
                    {item.circuitDiagram && (
                      <div className="mt-4">
                        <CircuitDiagram
                          type={item.circuitDiagram.type}
                          title={item.circuitDiagram.title}
                          width={item.circuitDiagram.width}
                          height={item.circuitDiagram.height}
                        />
                      </div>
                    )}

                    {/* Truth Table */}
                    {item.truthTable && (
                      <div className="mt-4">
                        <TruthTable
                          headers={item.truthTable.headers}
                          rows={item.truthTable.rows}
                          title={item.truthTable.title}
                        />
                      </div>
                    )}

                    {/* K-Map */}
                    {item.kMap && (
                      <div className="mt-4">
                        <KMap
                          type={item.kMap.type}
                          values={item.kMap.values}
                          title={item.kMap.title}
                          highlightedGroups={item.kMap.highlightedGroups}
                        />
                      </div>
                    )}

                    {/* Custom Content */}
                    {item.customContent && (
                      <div className="mt-4">
                        {item.customContent}
                      </div>
                    )}

                    {/* Flowchart Button */}
                    {((item.flowSteps && item.flowSteps.length > 0) ||
                      (item.flowNodes && item.flowNodes.length > 0 && item.flowEdges && item.flowEdges.length > 0)) && (
                        <div className="pt-2 border-t border-gray-800/30">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleFlowchart(index)}
                            className="w-full glass-card p-4 hover:bg-cyan-500/20 transition-colors flex items-center justify-center gap-2 font-semibold text-cyan-400 border border-cyan-500/30 rounded-lg"
                          >
                            {showFlowchart[index] ? (
                              <>
                                <FiEye className="w-5 h-5" />
                                Hide Flowchart Visualization
                              </>
                            ) : (
                              <>
                                <FiGitBranch className="w-5 h-5" />
                                Show Flowchart Visualization
                              </>
                            )}
                          </motion.button>

                          {/* Flowchart Visualizer */}
                          <AnimatePresence>
                            {showFlowchart[index] && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4"
                              >
                                <AnimatedFlowchart
                                  nodes={item.flowNodes}
                                  edges={item.flowEdges}
                                  steps={item.flowSteps}
                                  autoPlay={true}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                    {/* Dry Run Button */}
                    {item.dryRunCode && item.dryRunSteps && item.dryRunSteps.length > 0 && (
                      <div className="pt-2 border-t border-gray-800/30">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleDryRun(index)}
                          className="w-full glass-card p-4 hover:bg-blue-500/20 transition-colors flex items-center justify-center gap-2 font-semibold text-blue-400 border border-blue-500/30 rounded-lg"
                        >
                          {showDryRun[index] ? (
                            <>
                              <FiEye className="w-5 h-5" />
                              Hide Dry Run Visualization
                            </>
                          ) : (
                            <>
                              <FiPlay className="w-5 h-5" />
                              Show Dry Run Visualization
                            </>
                          )}
                        </motion.button>

                        {/* Dry Run Visualizer */}
                        <AnimatePresence>
                          {showDryRun[index] && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4"
                            >
                              <DryRunVisualizer
                                code={item.dryRunCode}
                                steps={item.dryRunSteps}
                                title={`Dry Run: Question ${index + 1}`}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
