'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiHome, FiChevronRight, FiCpu } from 'react-icons/fi'
import { dsdTopics, DSDTopic } from '@/data/dsd-topics'
import TopicListItem from '@/components/TopicListItem'
import SectionHeader from '@/components/SectionHeader'
import GradientDivider from '@/components/GradientDivider'
import TopicSearch from '@/components/TopicSearch'
import Fuse from 'fuse.js'

// Group topics by logical sections
const groupTopics = (topics: DSDTopic[]) => {
  const sections = {
    fundamentals: {
      title: 'Fundamentals',
      subtitle: 'Number systems, logic gates, and basic digital concepts',
      topics: topics.filter(t => 
        ['introduction', 'boolean-algebra'].includes(t.id)
      ),
    },
    optimization: {
      title: 'Optimization Techniques',
      subtitle: 'K-maps, SOP/POS simplification, and circuit optimization',
      topics: topics.filter(t => 
        ['sop-pos-optimization'].includes(t.id)
      ),
    },
    combinationalCircuits: {
      title: 'Combinational Circuits',
      subtitle: 'Adders, subtractors, multiplexers, demultiplexers, encoders, and decoders',
      topics: topics.filter(t => 
        ['adders-subtractors', 'mux-demux', 'encoder-decoder'].includes(t.id)
      ),
    },
    programmableDevices: {
      title: 'Programmable Logic Devices',
      subtitle: 'PLD, PROM, PLA, PAL, CPLD, and FPGA architectures',
      topics: topics.filter(t => 
        ['pld-prom', 'pla-pal', 'cpld-fpga'].includes(t.id)
      ),
    },
    advanced: {
      title: 'Advanced Topics',
      subtitle: 'Reversible gates and advanced digital design concepts',
      topics: topics.filter(t => 
        ['reversible-gates'].includes(t.id)
      ),
    },
    resources: {
      title: 'Additional Resources',
      subtitle: 'Practice questions and important problems',
      topics: topics.filter(t => 
        ['important-questions'].includes(t.id)
      ),
    },
  }

  return sections
}

export default function DigitalSystemDesignPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const sections = useMemo(() => groupTopics(dsdTopics), [])

  // Filter topics based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) {
      return sections
    }

    const fuse = new Fuse(dsdTopics, {
      keys: ['title', 'description'],
      threshold: 0.3,
      includeScore: true,
    })

    const searchResults = fuse.search(searchQuery)
    const resultIds = new Set(searchResults.map(r => r.item.id))

    const filtered: typeof sections = {} as typeof sections
    Object.entries(sections).forEach(([key, section]) => {
      const filteredTopics = section.topics.filter(t => resultIds.has(t.id))
      if (filteredTopics.length > 0) {
        filtered[key as keyof typeof sections] = {
          ...section,
          topics: filteredTopics,
        }
      }
    })

    return filtered
  }, [searchQuery, sections])

  return (
    <div className="relative">
      {/* Background orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute right-0 top-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm text-gray-400 mb-8"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            <FiHome className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4" />
          <Link
            href="/subjects"
            className="hover:text-blue-400 transition-colors"
          >
            Subjects
          </Link>
          <FiChevronRight className="w-4 h-4" />
          <span className="text-white">Digital Design Computer Orientation Architecture</span>
        </motion.nav>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 relative"
        >
          {/* Glow orb behind title */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl -z-10" />
          
          <div className="flex items-center gap-4">
            <FiCpu className="w-12 h-12 md:w-16 md:h-16 text-blue-500" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent leading-tight">
              Digital Design Computer Orientation Architecture
            </h1>
          </div>
        </motion.div>

        {/* Search Bar */}
        <TopicSearch query={searchQuery} onQueryChange={setSearchQuery} placeholder="Search digital design computer orientation architecture topics..." />

        {/* Topics List by Section */}
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
                <SectionHeader
                  id={key}
                  title={section.title}
                  subtitle={section.subtitle}
                />

                {/* Compact horizontal list */}
                <div className="space-y-1.5">
                  {section.topics.map((topic, index) => (
                    <TopicListItem
                      key={topic.id}
                      topic={topic}
                      index={index}
                    />
                  ))}
                </div>

                {sectionIndex < Object.keys(filteredSections).length - 1 && (
                  <GradientDivider />
                )}
              </motion.section>
            )
          })}
        </div>

        {/* Empty State */}
        {searchQuery && Object.keys(filteredSections).length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No topics found</h3>
            <p className="text-gray-400">
              Try adjusting your search query or{' '}
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                clear the search
              </button>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
