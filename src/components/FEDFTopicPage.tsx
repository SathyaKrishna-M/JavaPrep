'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import PyCode from '@/components/PyCode'
import Accordion from '@/components/Accordion'
import {
  FiArrowRight, FiBook, FiTarget, FiZap, FiKey,
  FiCode, FiStar, FiAlertTriangle, FiCheckSquare,
} from 'react-icons/fi'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ConceptItem {
  term: string
  definition: string
}

export interface PracticeItem {
  type: 'question' | 'task'
  text: string
  hint?: string
}

export interface CodeBlock {
  title?: string
  language: string
  snippet: string
  explanation?: string
}

export interface FEDFContent {
  title: string
  subtitle?: string
  co: string
  overview: React.ReactNode
  visual?: React.ReactNode
  concepts: ConceptItem[]
  code?: CodeBlock
  whyItMatters: React.ReactNode
  commonMistakes: string[]
  summary: string[]
  practice: PracticeItem[]
}

// ─── Subject detection ────────────────────────────────────────────────────────

function useSubject() {
  const pathname = usePathname() ?? ''
  if (pathname.includes('mathematics-data-science'))
    return { name: 'Mathematics for Data Science', href: '/subjects/mathematics-data-science' }
  if (pathname.includes('mathematics-communication-systems'))
    return { name: 'Mathematics for Communication Systems', href: '/subjects/mathematics-communication-systems' }
  return { name: 'Front-End Development Frameworks', href: '/subjects/front-end-development-frameworks' }
}

// ─── Section card ─────────────────────────────────────────────────────────────

function SectionCard({
  icon, title, delay = 0, children,
}: {
  icon: React.ReactNode
  title: string
  delay?: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card"
    >
      <div className="flex items-center gap-3 mb-4 text-blue-400">
        {icon}
        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
          <FiArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function FEDFTopicPage({ content }: { content: FEDFContent }) {
  const subject = useSubject()
  const [activeTab, setActiveTab] = useState<'explanation' | 'practice'>('explanation')

  const tabs = [
    { id: 'explanation' as const, label: 'Explanation', icon: <FiBook className="w-4 h-4" /> },
    { id: 'practice'   as const, label: 'Practice',    icon: <FiTarget className="w-4 h-4" /> },
  ]

  const explanationSections = [
    {
      id: 'overview',
      icon: <FiBook className="w-5 h-5" />,
      title: 'Concept Overview',
      content: (
        <div className="text-gray-300 text-sm leading-relaxed space-y-3">
          {content.overview}
        </div>
      ),
    },
    ...(content.visual ? [{
      id: 'visual',
      icon: <FiZap className="w-5 h-5" />,
      title: 'Visual / Intuition',
      content: <div>{content.visual}</div>,
    }] : []),
    {
      id: 'concepts',
      icon: <FiKey className="w-5 h-5" />,
      title: 'Key Concepts',
      content: (
        <div className="space-y-3">
          {content.concepts.map((c, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="shrink-0 text-cyan-400 font-bold text-xs mt-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded px-2 py-1 whitespace-nowrap">
                {c.term}
              </span>
              <span className="text-gray-300 text-sm leading-relaxed">{c.definition}</span>
            </div>
          ))}
        </div>
      ),
    },
    ...(content.code ? [{
      id: 'code',
      icon: <FiCode className="w-5 h-5" />,
      title: content.code.title ?? 'Code Example',
      content: (
        <div>
          <PyCode language={content.code.language}>{content.code.snippet}</PyCode>
          {content.code.explanation && (
            <p className="text-gray-400 text-xs mt-3 leading-relaxed border-t border-blue-500/20 pt-3">
              {content.code.explanation}
            </p>
          )}
        </div>
      ),
    }] : []),
    {
      id: 'why',
      icon: <FiStar className="w-5 h-5" />,
      title: 'Why This Matters',
      content: (
        <div className="text-gray-300 text-sm leading-relaxed space-y-2">
          {content.whyItMatters}
        </div>
      ),
    },
    {
      id: 'mistakes',
      icon: <FiAlertTriangle className="w-5 h-5" />,
      title: 'Common Mistakes',
      content: (
        <ul className="space-y-2">
          {content.commonMistakes.map((m, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-300 items-start">
              <span className="text-red-400 shrink-0 mt-0.5 font-bold">✕</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'summary',
      icon: <FiCheckSquare className="w-5 h-5" />,
      title: 'Quick Summary',
      content: (
        <ul className="space-y-2">
          {content.summary.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-300 items-start">
              <span className="text-green-400 shrink-0 mt-0.5 font-bold">✓</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <div className="space-y-8">

      {/* Back link */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
        <Link
          href={subject.href}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-4"
        >
          <FiArrowRight className="w-4 h-4 rotate-180" />
          Back to {subject.name}
        </Link>
      </motion.div>

      {/* Title */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">{content.co}</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent leading-tight">
          {content.title}
        </h1>
        {content.subtitle && (
          <p className="text-gray-400 text-sm">{content.subtitle}</p>
        )}
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-800 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-semibold transition-all relative flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id ? 'text-blue-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="fedfActiveTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {activeTab === 'explanation' && (
            <div className="space-y-6">
              {explanationSections.map((section, index) => (
                <SectionCard
                  key={section.id}
                  icon={section.icon}
                  title={section.title}
                  delay={index * 0.08}
                >
                  {section.content}
                </SectionCard>
              ))}
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-6">
              <div className="glass-card bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <FiTarget className="w-6 h-6 text-blue-400" />
                  Practice Questions
                </h2>
                <p className="text-gray-300">
                  Click on each question to reveal the hint. Try to solve them yourself first!
                </p>
              </div>
              <Accordion
                items={content.practice.map(p => ({
                  question: (
                    <span className="flex gap-2 items-start">
                      <span className={`shrink-0 mt-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        p.type === 'task'
                          ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {p.type === 'task' ? 'Task' : 'Q'}
                      </span>
                      {p.text}
                    </span>
                  ),
                  solution: p.hint
                    ? <><span className="text-cyan-400 font-semibold">Hint: </span>{p.hint}</>
                    : 'No hint available.',
                }))}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  )
}
