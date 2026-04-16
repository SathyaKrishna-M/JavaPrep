'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiHome, FiChevronRight, FiCpu } from 'react-icons/fi'
import { topics, Topic } from '@/data/cfai-topics'
import TopicListItem from '@/components/TopicListItem'
import SectionHeader from '@/components/SectionHeader'
import GradientDivider from '@/components/GradientDivider'
import TopicSearch from '@/components/TopicSearch'
import Fuse from 'fuse.js'

interface Section {
  title: string
  subtitle: string
  topics: Topic[]
}

const groupTopics = (topics: Topic[]): Record<string, Section> => ({
  co1: {
    title: 'CO-1: AI Agents, Problem Formulation & Python',
    subtitle: 'Intelligent agents, PEAS, environment types, problem formulation, knowledge representation, Python for AI',
    topics: topics.filter(t => t.co === 'CO1'),
  },
  co2: {
    title: 'CO-2: Search Algorithms',
    subtitle: 'Uninformed search (BFS/DFS/UCS), informed search (A*, Greedy), heuristic design, memory-bounded search',
    topics: topics.filter(t => t.co === 'CO2'),
  },
  co3: {
    title: 'CO-3: Constraint Satisfaction Problems',
    subtitle: 'CSP modeling, backtracking, constraint propagation, heuristics, local search',
    topics: topics.filter(t => t.co === 'CO3'),
  },
  co4: {
    title: 'CO-4: Adversarial Search & Game Theory',
    subtitle: 'Minimax, alpha-beta pruning, evaluation functions, stochastic decisions, multi-agent reasoning',
    topics: topics.filter(t => t.co === 'CO4'),
  },
  co5: {
    title: 'CO-5: Probabilistic Reasoning',
    subtitle: 'Bayes rule, Bayesian networks, variable elimination, Markov chains, HMMs',
    topics: topics.filter(t => t.co === 'CO5'),
  },
  co6: {
    title: 'CO-6: Hybrid AI Systems & Ethics',
    subtitle: 'Hybrid architectures, explainable AI, performance engineering, AI ethics & limitations',
    topics: topics.filter(t => t.co === 'CO6'),
  },
})

export default function CFAIPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const sections = useMemo(() => groupTopics(topics), [])

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections

    const fuse = new Fuse(topics, {
      keys: ['title', 'description'],
      threshold: 0.3,
      includeScore: true,
    })

    const resultIds = new Set(fuse.search(searchQuery).map(r => r.item.id))

    const filtered: Record<string, Section> = {}
    Object.entries(sections).forEach(([key, section]) => {
      const filteredTopics = section.topics.filter(t => resultIds.has(t.id))
      if (filteredTopics.length > 0) {
        filtered[key] = { ...section, topics: filteredTopics }
      }
    })
    return filtered
  }, [searchQuery, sections])

  return (
    <div className="relative">
      {/* Background orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute right-0 top-1/2 w-96 h-96 bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm text-gray-400 mb-8"
        >
          <Link href="/" className="hover:text-violet-400 transition-colors flex items-center gap-1">
            <FiHome className="w-4 h-4" /><span>Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4" />
          <Link href="/subjects" className="hover:text-violet-400 transition-colors">Subjects</Link>
          <FiChevronRight className="w-4 h-4" />
          <span className="text-white">Computational Foundations for AI</span>
        </motion.nav>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 relative"
        >
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-indigo-500/20 rounded-full blur-3xl -z-10" />
          <div className="flex items-center gap-4">
            <FiCpu className="w-12 h-12 md:w-16 md:h-16 text-violet-400" />
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent leading-tight">
                Computational Foundations for AI
              </h1>
              <p className="text-gray-400 mt-1 text-sm">25SC1306E &nbsp;·&nbsp; 3 Credits &nbsp;·&nbsp; 25-26 3rd Sem</p>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <TopicSearch query={searchQuery} onQueryChange={setSearchQuery} />

        {/* Topic Sections */}
        <div className="space-y-10 md:space-y-14">
          {Object.entries(filteredSections).map(([key, section], sectionIndex) => {
            if (section.topics.length === 0) return null
            return (
              <motion.section
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                className="relative"
              >
                <SectionHeader id={key} title={section.title} subtitle={section.subtitle} />
                <div className="space-y-1.5">
                  {section.topics.map((topic, index) => (
                    <TopicListItem key={topic.id} topic={topic} index={index} />
                  ))}
                </div>
                {sectionIndex < Object.keys(filteredSections).length - 1 && <GradientDivider />}
              </motion.section>
            )
          })}
        </div>

        {/* Empty state */}
        {searchQuery && Object.keys(filteredSections).length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No topics found</h3>
            <p className="text-gray-400">
              Try adjusting your search or{' '}
              <button onClick={() => setSearchQuery('')} className="text-violet-400 hover:text-violet-300 underline">
                clear the search
              </button>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
