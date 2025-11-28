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
    <aside className="glass-card h-[calc(100vh-8rem)] sticky top-28 ml-4 overflow-y-auto custom-scrollbar animate-float-slow">
      <div className="mb-6 pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Java Topics
        </h2>
        <p className="text-xs text-gray-400 mt-1">Master the fundamentals</p>
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
