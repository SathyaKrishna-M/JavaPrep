'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import CodeBlock from '@/components/CodeBlock'
import Accordion from '@/components/Accordion'
import AnimatedFlowchart, { FlowStep, FlowEdge } from '@/components/AnimatedFlowchart'
import CircuitDiagram from '@/components/CircuitDiagram'
import TruthTable from '@/components/TruthTable'
import KMap from '@/components/KMap'
import { 
  FiArrowRight, 
  FiCode, 
  FiBook, 
  FiTarget, 
  FiCheckCircle,
  FiAlertCircle,
  FiGitBranch,
  FiHelpCircle
} from 'react-icons/fi'

export interface CircuitDiagramData {
  type: string
  title?: string
  width?: number
  height?: number
}

export interface TruthTableData {
  headers: string[]
  rows: (string | number)[][]
  title?: string
}

export interface KMapData {
  type: '2var' | '3var' | '4var'
  values: number[]
  title?: string
  highlightedGroups?: Array<{
    cells: number[]
    color?: string
  }>
}

export interface ExplanationSection {
  title: string
  content: string
  code?: string
  icon?: React.ReactNode
  circuitDiagram?: CircuitDiagramData
  truthTable?: TruthTableData
  kMap?: KMapData
}

export interface PracticeQuestion {
  question: string
  solution: string
  solutionCode?: string
  flowNodes?: FlowStep[]
  flowEdges?: FlowEdge[]
  circuitDiagram?: CircuitDiagramData
  truthTable?: TruthTableData
  kMap?: KMapData
}

export interface TopicContent {
  title: string
  explanationSections?: ExplanationSection[]
  explanation?: string
  practiceQuestions?: PracticeQuestion[]
  flowchartNodes?: FlowStep[]
  flowchartEdges?: FlowEdge[]
  quizQuestions?: Array<{
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }>
}

interface DSDTopicPageProps {
  content: TopicContent
  subjectHref?: string
}

export default function DSDTopicPage({ content, subjectHref = '/subjects/digital-system-design' }: DSDTopicPageProps) {
  const [activeTab, setActiveTab] = useState<'explanation' | 'practice' | 'flowchart' | 'quiz'>(
    'explanation'
  )
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const tabs = [
    { id: 'explanation' as const, label: 'Explanation', icon: <FiBook className="w-4 h-4" /> },
    { id: 'practice' as const, label: 'Practice', icon: <FiTarget className="w-4 h-4" /> },
    { id: 'flowchart' as const, label: 'Flowchart', icon: <FiGitBranch className="w-4 h-4" /> },
    { id: 'quiz' as const, label: 'Quiz', icon: <FiHelpCircle className="w-4 h-4" /> },
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
                <div 
                  className="text-gray-300 whitespace-pre-line leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ __html: section.content || '' }}
                />
                {section.circuitDiagram && (
                  <CircuitDiagram
                    type={section.circuitDiagram.type}
                    title={section.circuitDiagram.title}
                    width={section.circuitDiagram.width}
                    height={section.circuitDiagram.height}
                  />
                )}
                {section.truthTable && (
                  <TruthTable
                    headers={section.truthTable.headers}
                    rows={section.truthTable.rows}
                    title={section.truthTable.title}
                  />
                )}
                {section.kMap && (
                  <KMap
                    type={section.kMap.type}
                    values={section.kMap.values}
                    title={section.kMap.title}
                    highlightedGroups={section.kMap.highlightedGroups}
                  />
                )}
                {section.code && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FiCode className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-semibold text-amber-400">Example:</span>
                    </div>
                    <CodeBlock code={section.code} language="text" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )
    } else if (content.explanation) {
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
            items={content.practiceQuestions.map((q) => ({
              question: q.question,
              solution: q.solution,
              solutionCode: q.solutionCode,
              flowNodes: q.flowNodes,
              flowEdges: q.flowEdges,
              circuitDiagram: q.circuitDiagram,
              truthTable: q.truthTable,
              kMap: q.kMap,
            }))}
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

  const renderFlowchart = () => {
    if (content.flowchartNodes && content.flowchartNodes.length > 0) {
      return (
        <div className="space-y-6">
          <div className="glass-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FiGitBranch className="w-6 h-6 text-blue-400" />
              Logic Flow Visualization
            </h2>
            <p className="text-gray-300 mb-4">
              Interactive flowchart showing the logic flow and circuit design for this topic.
            </p>
            <div className="h-[600px] border border-gray-700 rounded-lg overflow-hidden">
              <AnimatedFlowchart
                nodes={content.flowchartNodes}
                edges={content.flowchartEdges}
                autoPlay={false}
              />
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="glass-card">
        <div className="flex items-center gap-3 text-amber-400">
          <FiAlertCircle className="w-6 h-6" />
          <p className="text-gray-300">
            Flowchart visualization coming soon for this topic!
          </p>
        </div>
      </div>
    )
  }

  const renderQuiz = () => {
    if (content.quizQuestions && content.quizQuestions.length > 0) {
      const calculateScore = () => {
        let correct = 0
        content.quizQuestions?.forEach((q, index) => {
          if (selectedAnswers[index] === q.correctAnswer) {
            correct++
          }
        })
        return correct
      }

      return (
        <div className="space-y-6">
          <div className="glass-card bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <FiHelpCircle className="w-6 h-6 text-blue-400" />
              Quiz
            </h2>
            <p className="text-gray-300 mb-4">
              Test your understanding with these questions. Select your answers and check your score!
            </p>
            {showResults && (
              <div className="mt-4 p-4 bg-blue-500/20 rounded-lg">
                <p className="text-lg font-semibold text-blue-400">
                  Score: {calculateScore()} / {content.quizQuestions?.length}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {content.quizQuestions.map((quiz, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card"
              >
                <h3 className="text-xl font-bold mb-4">
                  Question {index + 1}: {quiz.question}
                </h3>
                <div className="space-y-2 mb-4">
                  {quiz.options.map((option, optIndex) => {
                    const isSelected = selectedAnswers[index] === optIndex
                    const isCorrect = optIndex === quiz.correctAnswer
                    const showAnswer = showResults && isCorrect
                    return (
                      <button
                        key={optIndex}
                        onClick={() => {
                          if (!showResults) {
                            setSelectedAnswers({ ...selectedAnswers, [index]: optIndex })
                          }
                        }}
                        disabled={showResults}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? showAnswer
                              ? 'border-green-500 bg-green-500/20'
                              : 'border-blue-500 bg-blue-500/20'
                            : showAnswer
                            ? 'border-green-500/50 bg-green-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        } ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-blue-400 bg-blue-400' : 'border-gray-500'
                          }`}>
                            {isSelected && <FiCheckCircle className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-gray-300">{option}</span>
                          {showAnswer && (
                            <span className="ml-auto text-green-400 font-semibold">✓ Correct</span>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
                {showResults && (
                  <div className="mt-4 p-4 bg-blue-500/10 rounded-lg">
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold text-blue-400">Explanation:</span> {quiz.explanation}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
            >
              {showResults ? 'Reset Quiz' : 'Check Answers'}
            </button>
          </div>
        </div>
      )
    }
    return (
      <div className="glass-card">
        <div className="flex items-center gap-3 text-amber-400">
          <FiAlertCircle className="w-6 h-6" />
          <p className="text-gray-300">
            Quiz questions coming soon for this topic!
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
          Back to Subjects
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
            onClick={() => {
              setActiveTab(tab.id)
              // Reset quiz state when switching away from quiz tab
              if (tab.id !== 'quiz') {
                setSelectedAnswers({})
                setShowResults(false)
              }
            }}
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
          {activeTab === 'practice' && renderPractice()}
          {activeTab === 'flowchart' && renderFlowchart()}
          {activeTab === 'quiz' && renderQuiz()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

