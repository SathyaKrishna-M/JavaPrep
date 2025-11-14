'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CodeBlock from './CodeBlock'
import { DryRunStep } from './DryRunVisualizer'
import Accordion from './Accordion'
import { 
  FiArrowRight, 
  FiCode, 
  FiBook, 
  FiTarget, 
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi'

export interface ExplanationSection {
  title: string
  content: string
  code?: string
  icon?: React.ReactNode
}

export interface PracticeQuestion {
  question: string
  solution: string
  solutionCode?: string
  dryRunCode?: string
  dryRunSteps?: DryRunStep[]
  flowSteps?: Array<{
    id: string
    label: string
    type: 'start' | 'process' | 'decision' | 'io' | 'end'
  }>
  flowNodes?: Array<{
    id: string
    label: string
    type: 'start' | 'process' | 'decision' | 'io' | 'end'
  }>
  flowEdges?: Array<{
    id: string
    source: string
    target: string
    label?: string
  }>
}

export interface TopicContent {
  title: string
  explanationSections?: ExplanationSection[]
  explanation?: string // Fallback for old format
  exampleCode: string
  practiceQuestions?: PracticeQuestion[]
  practiceCode?: string // Fallback for old format
  dryRunSteps?: DryRunStep[]
  dryRunCode?: string
}

interface TopicPageProps {
  content: TopicContent
}

export default function TopicPage({ content }: TopicPageProps) {
  const [activeTab, setActiveTab] = useState<'explanation' | 'example' | 'practice'>(
    'explanation'
  )

  const tabs = [
    { id: 'explanation' as const, label: 'Explanation', icon: <FiBook className="w-4 h-4" /> },
    { id: 'example' as const, label: 'Example', icon: <FiCode className="w-4 h-4" /> },
    { id: 'practice' as const, label: 'Practice', icon: <FiTarget className="w-4 h-4" /> },
  ]

  // Generate ID from title
  const generateId = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const renderExplanation = () => {
    if (content.explanationSections && content.explanationSections.length > 0) {
      return (
        <div className="space-y-6">
          {content.explanationSections.map((section, index) => {
            const sectionId = generateId(section.title)
            return (
              <motion.div
                key={index}
                id={sectionId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card scroll-mt-20"
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
                  <div 
                    className="text-gray-300 whitespace-pre-line leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: section.content || '' }}
                  />
                  {section.code && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FiCode className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-semibold text-amber-400">Example Code:</span>
                      </div>
                      <CodeBlock code={section.code} language="java" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      )
    } else if (content.explanation) {
      // Fallback to old format
      return (
        <div className="glass-card">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FiBook className="w-6 h-6 text-blue-400" />
            Explanation
          </h2>
          <div className="prose prose-invert max-w-none">
            <div 
              className="text-gray-300 whitespace-pre-line leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.explanation || '' }}
            />
          </div>
        </div>
      )
    }
    return null
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
            items={content.practiceQuestions.map((q) => ({
              question: q.question,
              solution: q.solution,
              solutionCode: q.solutionCode,
              dryRunCode: q.dryRunCode,
              dryRunSteps: q.dryRunSteps,
              flowSteps: q.flowSteps,
              flowNodes: q.flowNodes,
              flowEdges: q.flowEdges,
            }))}
          />
        </div>
      )
    } else if (content.practiceCode) {
      // Fallback to old format
      return (
        <div className="glass-card">
          <h2 className="text-2xl font-bold mb-4">Practice Exercise</h2>
          <CodeBlock code={content.practiceCode} language="java" />
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

  return (
    <div className="space-y-8">
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
            className={`px-6 py-3 font-semibold transition-all relative flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
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

          {activeTab === 'example' && (
            <div className="space-y-6">
              <div className="glass-card">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FiCode className="w-6 h-6 text-blue-400" />
                  Example Code
                </h2>
                <CodeBlock code={content.exampleCode} language="java" />
              </div>
            </div>
          )}

          {activeTab === 'practice' && renderPractice()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
