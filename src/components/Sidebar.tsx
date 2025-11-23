'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { topics } from '@/data/topics'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'

export default function Sidebar() {
  const pathname = usePathname()
  const [openCOs, setOpenCOs] = useState<Set<string>>(new Set(['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6']))

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

  // Group topics by CO
  const topicsByCO: Record<string, typeof topics> = {
    CO1: [],
    CO2: [],
    CO3: [],
    CO4: [],
    CO5: [],
    CO6: [],
    Other: [],
  }

  topics.forEach(topic => {
    if (topic.co) {
      topicsByCO[topic.co] = topicsByCO[topic.co] || []
      topicsByCO[topic.co].push(topic)
    } else {
      topicsByCO.Other.push(topic)
    }
  })

  const coTitles: Record<string, string> = {
    CO1: 'CO1 — Basic Java Programming Constructs',
    CO2: 'CO2 — Arrays & Algorithmic Problem Solving',
    CO3: 'CO3 — Recursion, Bitwise & String-Based Problem Solving',
    CO4: 'CO4 — OOP Foundations & Modularization',
    CO5: 'CO5 — Advanced OOP & System Architecture',
    CO6: 'CO6 — Robust & Scalable Java Applications',
  }

  return (
    <aside className="glass-card h-fit sticky top-24">
      <h2 className="text-xl font-bold mb-4">Java Topics</h2>
      <nav className="space-y-2">
        {(['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6'] as const).map(co => {
          const coTopics = topicsByCO[co] || []
          if (coTopics.length === 0) return null

          const isOpen = openCOs.has(co)

          return (
            <div key={co} className="mb-2">
              <button
                onClick={() => toggleCO(co)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm font-semibold text-blue-400 hover:bg-blue-500/10 transition-colors"
              >
                <span>{coTitles[co]}</span>
                {isOpen ? (
                  <FiChevronDown className="w-4 h-4" />
                ) : (
                  <FiChevronRight className="w-4 h-4" />
                )}
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 space-y-1 mt-1">
                      {coTopics.map((topic, index) => {
                        const isActive = pathname === topic.href
                        return (
                          <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                          >
                            <Link
                              href={topic.href}
                              className={`block px-3 py-2 rounded-lg transition-colors text-sm ${
                                isActive
                                  ? 'bg-blue-600 text-white font-semibold'
                                  : 'text-gray-300 hover:text-white hover:bg-blue-500/20'
                              }`}
                            >
                              <span className="mr-2">{topic.icon}</span>
                              {topic.title}
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
          <div className="mt-4 pt-4 border-t border-white/10">
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
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-300 hover:text-white hover:bg-blue-500/20'
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
