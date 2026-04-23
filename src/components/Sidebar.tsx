'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { topics as javaTopics } from '@/data/java-topics'
import { topics as dsTopics } from '@/data/ds-topics'
import { dsdTopics } from '@/data/dsd-topics'
import { fwdTopics } from '@/data/fwd-topics'
import { topics as mathTopics } from '@/data/math-ai-topics'
import { topics as cfaiTopics } from '@/data/cfai-topics'
import { topics as dsa2Topics } from '@/data/dsa2-topics'
import { fedfTopics } from '@/data/fedf-topics'
import { mdsTopics } from '@/data/mds-topics'
import { mfcsTopics } from '@/data/mfcs-topics'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useEffect } from 'react'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'

export default function Sidebar() {
  const pathname = usePathname()
  const [openCOs, setOpenCOs] = useState<Set<string>>(new Set(['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6']))

  const isDSD = pathname?.startsWith('/subjects/digital-system-design')
  const isDSA2 = pathname?.startsWith('/subjects/data-structures-algorithms-2')
  const isDS = pathname?.startsWith('/subjects/data-structures') && !isDSA2
  const isFWD = pathname?.startsWith('/subjects/web-development')
  const isMathAI = pathname?.startsWith('/subjects/mathematics-for-ai')
  const isCFAI = pathname?.startsWith('/subjects/computational-foundations-ai')
  const isFEDF = pathname?.startsWith('/subjects/front-end-development-frameworks')
  const isMDS = pathname?.startsWith('/subjects/mathematics-data-science')
  const isMCS = pathname?.startsWith('/subjects/mathematics-communication-systems')

  // Reset open COs when subject changes, or keep them open by default
  useEffect(() => {
    setOpenCOs(new Set(['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6']))
  }, [isDSD, isDS, isDSA2, isFWD, isMathAI, isCFAI, isFEDF, isMDS, isMCS])

  let currentTopics = javaTopics
  let subjectTitle = 'Java Topics'
  let subjectSubtitle = 'Master the fundamentals'

  if (isDSD) {
    currentTopics = dsdTopics
    subjectTitle = 'DSD Topics'
    subjectSubtitle = 'Digital System Design'
  } else if (isDSA2) {
    currentTopics = dsa2Topics
    subjectTitle = 'DSA2 Topics'
    subjectSubtitle = 'Data Structures & Algorithms 2'
  } else if (isDS) {
    currentTopics = dsTopics
    subjectTitle = 'DS Topics'
    subjectSubtitle = 'Data Structures in Java'
  } else if (isFWD) {
    currentTopics = fwdTopics
    subjectTitle = 'FWD Topics'
    subjectSubtitle = 'Fundamentals of Web Development'
  } else if (isMathAI) {
    currentTopics = mathTopics
    subjectTitle = 'Math for AI'
    subjectSubtitle = 'Mathematics for Artificial Intelligence'
  } else if (isCFAI) {
    currentTopics = cfaiTopics
    subjectTitle = 'CFAI'
    subjectSubtitle = 'Computational Foundations for AI'
  } else if (isFEDF) {
    currentTopics = fedfTopics
    subjectTitle = 'FEDF Topics'
    subjectSubtitle = 'Front-End Development Frameworks'
  } else if (isMDS) {
    currentTopics = mdsTopics
    subjectTitle = 'MDS Topics'
    subjectSubtitle = 'Mathematics for Data Science'
  } else if (isMCS) {
    currentTopics = mfcsTopics
    subjectTitle = 'MCS Topics'
    subjectSubtitle = 'Mathematics for Communication Systems'
  }

  const toggleCO = (co: string) => {
    setOpenCOs(prev => {
      const next = new Set(prev)
      if (next.has(co)) {
        next.delete(co)
      } else {
        next.add(co)
      }
      return next
    })
  }

  const coTitles = useMemo(() => {
    if (isDSD) {
      return {
        CO1: 'CO1 — Combinational Digital Logic Circuits',
        CO2: 'CO2 — Design of Sequential and Memory Circuits',
        CO3: 'CO3 — Basic Computer Architecture and Instructions',
        CO4: 'CO4 — Memory Architecture and I/O Organization',
        CO5: 'CO5 — Superscalar, VLIW, Multicore & Low Power',
        CO6: 'CO6 — Practical Applications',
      }
    }
    if (isDS) {
      return {
        CO1: 'CO1 — Foundations of DS & Algorithms',
        CO2: 'CO2 — Linked Lists',
        CO3: 'CO3 — Stacks & Queues',
        CO4: 'CO4 — Trees & Graphs',
        CO5: 'CO5 — Hashing & Advanced',
        CO6: 'CO6 — Applications',
      }
    }
    if (isDSA2) {
      return {
        CO1: 'CO1 — Trees & Self-Balancing Structures',
        CO2: 'CO2 — Range Queries & Graphs',
        CO3: 'CO3 — Shortest Paths & Sorting',
        CO4: 'CO4 — Advanced Sorting, Greedy & DP',
        CO5: 'CO5 — Advanced Topics',
        CO6: 'CO6 — Applications',
      }
    }
    if (isFWD) {
      return {
        CO1: 'CO1 — Internet Fundamentals, HTML & Introductory CSS',
        CO2: 'CO2 — HTML Forms, Semantic Tags & Comprehensive CSS Layouts',
        CO3: 'CO3 — JavaScript Programming Essentials',
        CO4: 'CO4 — JavaScript Interactivity & DOM',
        CO5: 'CO5 — Advanced Web Development & Deployment',
        CO6: 'CO6 — Applications & Projects',
      }
    }
    if (isMathAI) {
      return {
        CO1: 'CO1 — Vectors, Matrices & Data Representation',
        CO2: 'CO2 — Linear Algebra for Learning Systems',
        CO3: 'CO3 — Multivariable Calculus for AI',
        CO4: 'CO4 — Optimization & Learning Dynamics',
        CO5: 'CO5 — Mathematics Behind Advanced AI Concepts',
        CO6: 'CO6 — Mathematical Construction of AI Building Blocks',
      }
    }
    if (isCFAI) {
      return {
        CO1: 'CO1 — AI Agents, Problem Formulation & Python',
        CO2: 'CO2 — Search Algorithms',
        CO3: 'CO3 — Constraint Satisfaction Problems',
        CO4: 'CO4 — Adversarial Search & Game Theory',
        CO5: 'CO5 — Probabilistic Reasoning',
        CO6: 'CO6 — Hybrid AI & Ethics',
      }
    }
    if (isFEDF) {
      return {
        CO1: 'CO1 — Front-End Engineering Foundations',
        CO2: 'CO2 — JavaScript & TypeScript for Frameworks',
        CO3: 'CO3 — React Component Model',
        CO4: 'CO4 — State Architecture & API Integration',
        CO5: 'CO5 — Routing, Forms & Performance',
        CO6: 'CO6 — Build Systems, Testing & Deployment',
      }
    }
    if (isMDS) {
      return {
        CO1: 'CO1 — Introduction to Data Science',
        CO2: 'CO2 — Descriptive Statistics',
        CO3: 'CO3 — Probability Theory',
        CO4: 'CO4 — Inferential Statistics',
        CO5: 'CO5 — Regression Analysis',
        CO6: 'CO6 — Visualization & Decision Making',
      }
    }
    if (isMCS) {
      return {
        CO1: 'CO1 — Signal Representation',
        CO2: 'CO2 — Fourier Analysis',
        CO3: 'CO3 — LTI Systems & Matched Filters',
        CO4: 'CO4 — Z-Transform & FIR Filters',
        CO5: 'CO5 — Probability & BER Analysis',
        CO6: 'CO6 — Shannon Capacity & Information Theory',
      }
    }
    return {
      CO1: 'CO1 — Basic Java Programming Constructs',
      CO2: 'CO2 — Arrays & Algorithmic Problem Solving',
      CO3: 'CO3 — Recursion, Bitwise & String-Based Problem Solving',
      CO4: 'CO4 — OOP Foundations & Modularization',
      CO5: 'CO5 — Advanced OOP & System Architecture',
      CO6: 'CO6 — Robust & Scalable Java Applications',
    }
  }, [isDSD, isDS, isDSA2, isFWD, isMathAI, isCFAI, isFEDF, isMDS, isMCS])

  // Group topics by CO
  const topicsByCO = useMemo(() => {
    const grouped: Record<string, typeof currentTopics> = {
      CO1: [],
      CO2: [],
      CO3: [],
      CO4: [],
      CO5: [],
      CO6: [],
      Other: [],
    }

    currentTopics.forEach(topic => {
      // Check if topic has a CO property and it matches one of our keys
      if (topic.co && (topic.co in grouped)) {
        grouped[topic.co].push(topic)
      } else {
        grouped.Other.push(topic)
      }
    })
    return grouped
  }, [currentTopics])

  return (
    <aside className="glass-card h-[calc(100vh-8rem)] sticky top-28 ml-4 overflow-y-auto custom-scrollbar">
      <div className="mb-6 pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          {subjectTitle}
        </h2>
        <p className="text-xs text-gray-400 mt-1">{subjectSubtitle}</p>
      </div>

      <nav className="space-y-4">
        {(['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6'] as const).map(co => {
          const coTopics = topicsByCO[co] || []
          if (coTopics.length === 0) return null

          const isOpen = openCOs.has(co)

          return (
            <div key={co} className="group">
              <button
                onClick={() => toggleCO(co)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm font-semibold transition-all duration-300 ${isOpen
                  ? 'bg-blue-500/10 text-blue-300 shadow-glow-blue'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <span className="line-clamp-1 pr-2">{coTitles[co]}</span>
                {isOpen ? (
                  <FiChevronDown className="w-4 h-4 flex-shrink-0 text-blue-400" />
                ) : (
                  <FiChevronRight className="w-4 h-4 flex-shrink-0 opacity-50 group-hover:opacity-100" />
                )}
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pl-3 space-y-1 mt-2 mb-2 border-l border-white/5 ml-3">
                      {coTopics.map((topic, index) => {
                        const isActive = pathname === topic.href
                        const isImportant = topic.id.includes('important-questions')
                        return (
                          <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.02 }}
                          >
                            <Link
                              href={topic.href}
                              className={`block px-3 py-2 rounded-lg transition-all duration-200 text-sm relative overflow-hidden group/link ${isActive
                                ? 'text-white font-medium bg-gradient-to-r from-blue-600/20 to-transparent border-l-2 border-blue-500'
                                : isImportant
                                  ? 'text-yellow-200 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 hover:from-yellow-500/20 hover:to-orange-500/20 border-l-2 border-yellow-500/50'
                                  : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                                }`}
                            >
                              <div className="flex items-center relative z-10">
                                <span className={`mr-2 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover/link:scale-110'}`}>
                                  {topic.icon}
                                </span>
                                {topic.title}
                              </div>
                              {isActive && (
                                <motion.div
                                  layoutId="activeSidebarLink"
                                  className="absolute inset-0 bg-blue-500/10 -z-0"
                                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                              )}
                            </Link>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}

        {/* Other topics (without CO) */}
        {topicsByCO.Other.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Extras
            </h3>
            {topicsByCO.Other.map((topic, index) => {
              const isActive = pathname === topic.href
              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={topic.href}
                    className={`block px-3 py-2 rounded-lg transition-colors text-sm ${isActive
                      ? 'bg-blue-600/20 text-white font-semibold border border-blue-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <span className="mr-2">{topic.icon}</span>
                    {topic.title}
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </nav>
    </aside>
  )
}
