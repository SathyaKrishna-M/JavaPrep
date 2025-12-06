'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Accordion from '@/components/Accordion'
import DMVennDiagram from '@/components/DMVennDiagram'
import FunctionGraph from '@/components/FunctionGraph'
import DMHasseDiagram from '@/components/DMHasseDiagram'
import TruthTable from '@/components/TruthTable'
import Mermaid from '@/components/Mermaid'
import {
  FiArrowRight,
  FiBook,
  FiTarget,
  FiAlertCircle,
  FiHelpCircle,
} from 'react-icons/fi'
import MathRenderer from './MathRenderer'

export interface VennDiagramData {
  sets: Array<{ label: string; color: string }>
  regions?: Array<{ label: string; sets: string[]; color?: string }>
}

export interface FunctionGraphData {
  type: 'quadratic' | 'floor' | 'ceiling' | 'exponential' | 'boolean'
  title?: string
}

export interface HasseDiagramData {
  elements: Array<{ id: string; label: string }>
  relations: Array<{ from: string; to: string }>
  highlightLeast?: boolean
  highlightGreatest?: boolean
}

export interface TruthTableData {
  headers: string[]
  rows: (string | number)[][]
  title?: string
}

export interface ExplanationSection {
  title: string
  content: string | React.ReactNode
  icon?: React.ReactNode
  vennDiagram?: VennDiagramData
  functionGraph?: FunctionGraphData
  hasseDiagram?: HasseDiagramData
  truthTable?: TruthTableData
  mermaid?: string
  formula?: string
  blockFormula?: string
}

export interface PracticeQuestion {
  question: string | React.ReactNode
  solution: string | React.ReactNode
  vennDiagram?: VennDiagramData
  functionGraph?: FunctionGraphData
  hasseDiagram?: HasseDiagramData
  truthTable?: TruthTableData
  mermaid?: string
  formula?: string
}

export interface ExampleProblem {
  problem: string | React.ReactNode
  solution: string | React.ReactNode
  steps: Array<{ step: string; explanation: string | React.ReactNode }>
  vennDiagram?: VennDiagramData
  functionGraph?: FunctionGraphData
  hasseDiagram?: HasseDiagramData
  truthTable?: TruthTableData
  mermaid?: string
  formula?: string
}

export interface TopicContent {
  title: string
  explanationSections?: ExplanationSection[]
  practiceQuestions?: PracticeQuestion[]
  exampleProblems?: ExampleProblem[]
}

interface DMTopicPageProps {
  content: TopicContent
  subjectHref?: string
}

export default function DMTopicPage({
  content,
  subjectHref = '/subjects/discrete-mathematics'
}: DMTopicPageProps) {
  const [activeTab, setActiveTab] = useState<'explanation' | 'practice' | 'examples'>(
    'explanation'
  )

  const tabs = [
    { id: 'explanation' as const, label: 'Explanation', icon: <FiBook className="w-4 h-4" /> },
    { id: 'practice' as const, label: 'Practice', icon: <FiTarget className="w-4 h-4" /> },
    { id: 'examples' as const, label: 'Example Problems', icon: <FiHelpCircle className="w-4 h-4" /> },
  ]

  const renderExplanation = () => {
    if (content.explanationSections && content.explanationSections.length > 0) {
      return (
        <div className="space-y-6">
          {content.explanationSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card"
            >
              <div className="flex items-start gap-4 mb-4">
                {section.icon && (
                  <div className="flex-shrink-0 mt-1 text-blue-400">
                    {section.icon}
                  </div>
                )}
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
                  <FiArrowRight className="w-5 h-5 text-cyan-400" />
                  {section.title}
                </h3>
              </div>
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 whitespace-pre-line leading-relaxed mb-4">
                  {typeof section.content === 'string' ? (
                    <div dangerouslySetInnerHTML={{ __html: section.content || '' }} />
                  ) : (
                    section.content
                  )}
                </div>

                {section.formula && (
                  <div className="my-4 p-4 bg-black/30 rounded-lg">
                    <MathRenderer math={section.formula} display={false} />
                  </div>
                )}

                {section.blockFormula && (
                  <div className="my-4 p-4 bg-black/30 rounded-lg">
                    <MathRenderer math={section.blockFormula} display={true} />
                  </div>
                )}

                {section.vennDiagram && (
                  <div className="my-6 flex justify-center">
                    <DMVennDiagram
                      sets={section.vennDiagram.sets}
                      regions={section.vennDiagram.regions}
                    />
                  </div>
                )}

                {section.functionGraph && (
                  <div className="my-6 flex justify-center">
                    <FunctionGraph
                      type={section.functionGraph.type}
                      title={section.functionGraph.title}
                    />
                  </div>
                )}

                {section.hasseDiagram && (
                  <div className="my-6 flex justify-center">
                    <DMHasseDiagram
                      elements={section.hasseDiagram.elements}
                      relations={section.hasseDiagram.relations}
                      highlightLeast={section.hasseDiagram.highlightLeast}
                      highlightGreatest={section.hasseDiagram.highlightGreatest}
                    />
                  </div>
                )}

                {section.truthTable && (
                  <div className="my-6">
                    <TruthTable
                      headers={section.truthTable.headers}
                      rows={section.truthTable.rows}
                      title={section.truthTable.title}
                    />
                  </div>
                )}

                {section.mermaid && (
                  <div className="my-6">
                    <Mermaid chart={section.mermaid} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )
    }
    return (
      <div className="glass-card">
        <div className="flex items-center gap-3 text-amber-400">
          <FiAlertCircle className="w-6 h-6" />
          <p className="text-gray-300">
            Explanation content coming soon for this topic!
          </p>
        </div>
      </div>
    )
  }

  const renderPractice = () => {
    if (content.practiceQuestions && content.practiceQuestions.length > 0) {
      return (
        <div className="space-y-6">
          <div className="glass-card bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <FiTarget className="w-6 h-6 text-blue-400" />
              Practice Questions
            </h2>
            <p className="text-gray-300">
              Click on each question to reveal the solution. Try to solve them yourself first!
            </p>
          </div>
          <Accordion
            items={content.practiceQuestions.map((q) => {
              return {
                question: q.question,
                solution: q.solution,
                customContent: (
                  <div className="mt-4 space-y-4">
                    {q.formula && (
                      <div className="p-4 bg-black/30 rounded-lg">
                        <MathRenderer math={q.formula} display={false} />
                      </div>
                    )}
                    {q.vennDiagram && (
                      <DMVennDiagram
                        sets={q.vennDiagram.sets}
                        regions={q.vennDiagram.regions}
                      />
                    )}
                    {q.functionGraph && (
                      <FunctionGraph
                        type={q.functionGraph.type}
                        title={q.functionGraph.title}
                      />
                    )}
                    {q.hasseDiagram && (
                      <DMHasseDiagram
                        elements={q.hasseDiagram.elements}
                        relations={q.hasseDiagram.relations}
                        highlightLeast={q.hasseDiagram.highlightLeast}
                        highlightGreatest={q.hasseDiagram.highlightGreatest}
                      />
                    )}
                    {q.truthTable && (
                      <TruthTable
                        headers={q.truthTable.headers}
                        rows={q.truthTable.rows}
                        title={q.truthTable.title}
                      />
                    )}
                    {q.mermaid && <Mermaid chart={q.mermaid} />}
                  </div>
                ),
              }
            })}
          />
        </div>
      )
    }
    return (
      <div className="glass-card">
        <div className="flex items-center gap-3 text-amber-400">
          <FiAlertCircle className="w-6 h-6" />
          <p className="text-gray-300">
            Practice exercises coming soon for this topic!
          </p>
        </div>
      </div>
    )
  }

  const renderExamples = () => {
    if (content.exampleProblems && content.exampleProblems.length > 0) {
      return (
        <div className="space-y-6">
          <div className="glass-card bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <FiHelpCircle className="w-6 h-6 text-blue-400" />
              Example Problems
            </h2>
            <p className="text-gray-300">
              Fully solved examples with step-by-step explanations and visual diagrams.
            </p>
          </div>

          {content.exampleProblems.map((example, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card"
            >
              <h3 className="text-xl font-bold mb-4 text-blue-400">
                Example {idx + 1}: {example.problem}
              </h3>

              <div className="space-y-4">
                {example.steps.map((step, stepIdx) => (
                  <div key={stepIdx} className="border-l-4 border-blue-500 pl-4">
                    <div className="font-semibold text-cyan-400 mb-2">
                      Step {stepIdx + 1}: {step.step}
                    </div>
                    <div className="text-gray-300">{step.explanation}</div>
                  </div>
                ))}

                {example.formula && (
                  <div className="mt-4 p-4 bg-black/30 rounded-lg">
                    <MathRenderer math={example.formula} display={true} />
                  </div>
                )}

                {example.vennDiagram && (
                  <div className="mt-4 flex justify-center">
                    <DMVennDiagram
                      sets={example.vennDiagram.sets}
                      regions={example.vennDiagram.regions}
                    />
                  </div>
                )}

                {example.functionGraph && (
                  <div className="mt-4 flex justify-center">
                    <FunctionGraph
                      type={example.functionGraph.type}
                      title={example.functionGraph.title}
                    />
                  </div>
                )}

                {example.hasseDiagram && (
                  <div className="mt-4 flex justify-center">
                    <DMHasseDiagram
                      elements={example.hasseDiagram.elements}
                      relations={example.hasseDiagram.relations}
                      highlightLeast={example.hasseDiagram.highlightLeast}
                      highlightGreatest={example.hasseDiagram.highlightGreatest}
                    />
                  </div>
                )}

                {example.truthTable && (
                  <div className="mt-4">
                    <TruthTable
                      headers={example.truthTable.headers}
                      rows={example.truthTable.rows}
                      title={example.truthTable.title}
                    />
                  </div>
                )}

                {example.mermaid && (
                  <div className="mt-4">
                    <Mermaid chart={example.mermaid} />
                  </div>
                )}

                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="font-semibold text-green-400 mb-2">Final Answer:</div>
                  <div className="text-gray-300">{example.solution}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )
    }
    return (
      <div className="glass-card">
        <div className="flex items-center gap-3 text-amber-400">
          <FiAlertCircle className="w-6 h-6" />
          <p className="text-gray-300">
            Example problems coming soon for this topic!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Back to Subjects Link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href={subjectHref}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-4"
        >
          <FiArrowRight className="w-4 h-4 rotate-180" />
          Back to Discrete Mathematics
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
          {content.title}
        </h1>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-800 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-semibold transition-all relative flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
              ? 'text-blue-400'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {activeTab === 'explanation' && renderExplanation()}
          {activeTab === 'practice' && renderPractice()}
          {activeTab === 'examples' && renderExamples()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

