'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiHome, FiChevronRight } from 'react-icons/fi'
import { FaJava } from 'react-icons/fa'
import { topics, Topic } from '@/data/topics'
import TopicListItem from '@/components/TopicListItem'
import SectionHeader from '@/components/SectionHeader'
import GradientDivider from '@/components/GradientDivider'
import TopicSearch from '@/components/TopicSearch'
import Fuse from 'fuse.js'

// Group topics by logical sections
const groupTopics = (topics: Topic[]) => {
  const sections = {
    fundamentals: {
      title: 'Fundamentals',
      subtitle: 'Essential building blocks of Java programming - syntax, data types, operators, and basic control flow',
      topics: topics.filter(t => 
        ['variables-data-types', 'operators', 'type-casting', 'input-output'].includes(t.id)
      ),
    },
    controlFlow: {
      title: 'Control Flow',
      subtitle: 'Conditionals, loops, and program flow control structures',
      topics: topics.filter(t => 
        ['conditionals', 'loops', 'nested-loops'].includes(t.id)
      ),
    },
    problemSolving: {
      title: 'Problem Solving & Algorithms',
      subtitle: 'Systematic approaches to problem-solving, debugging, and pattern recognition',
      topics: topics.filter(t => 
        ['problem-solving-methodology', 'flowchart-design', 'dry-run-flow-tracing', 
         'debugging-techniques', 'patterns'].includes(t.id)
      ),
    },
    coreJava: {
      title: 'Core Java Concepts',
      subtitle: 'Arrays, searching, sorting, recursion, strings, and bit manipulation',
      topics: topics.filter(t => 
        ['arrays-memory-model', 'arrays1d', 'arrays2d', 'searching-algorithms', 
         'sorting-algorithms', 'matrix-algorithms', 'prefix-sum-sliding-window',
         'two-pointer-technique', 'competitive-programming', 'recursion-basics',
         'recursive-problems', 'bitwise-operators', 'bit-manipulation-tricks',
         'strings-immutability', 'stringbuilder-stringbuffer', 'string-problems',
         'regex-pattern-matching', 'quantitative-logic-problems'].includes(t.id)
      ),
    },
    oopFoundations: {
      title: 'OOP Foundations',
      subtitle: 'Object-oriented programming basics - classes, objects, methods, and encapsulation',
      topics: topics.filter(t => 
        ['classes-objects', 'constructors-this', 'methods', 'static-members',
         'encapsulation', 'abstraction', 'modular-program-structure',
         'analyzing-class-design'].includes(t.id)
      ),
    },
    advancedOOP: {
      title: 'Advanced OOP & Architecture',
      subtitle: 'Inheritance, polymorphism, interfaces, design patterns, and system modeling',
      topics: topics.filter(t => 
        ['inheritance', 'method-overriding-super-final', 'interfaces', 'abstract-classes',
         'polymorphism', 'reflection-api', 'design-patterns', 'domain-system-modeling'].includes(t.id)
      ),
    },
    javaEcosystem: {
      title: 'Java Ecosystem & Modern Java',
      subtitle: 'Exception handling, file I/O, generics, collections, lambdas, and streams',
      topics: topics.filter(t => 
        ['exception-handling', 'custom-exceptions', 'file-io-streams', 'serialization',
         'generics', 'collections-framework', 'lambda-expressions', 'stream-api'].includes(t.id)
      ),
    },
    other: {
      title: 'Additional Resources',
      subtitle: 'Practice questions and additional learning materials',
      topics: topics.filter(t => 
        ['important-questions'].includes(t.id)
      ),
    },
  }

  return sections
}

export default function JavaPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const sections = useMemo(() => groupTopics(topics), [])

  // Filter topics based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) {
      return sections
    }

    const fuse = new Fuse(topics, {
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
        <div className="absolute right-0 top-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
          <span className="text-white">Java</span>
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
            <FaJava className="w-12 h-12 md:w-16 md:h-16 text-orange-500" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent leading-tight">
              Java Programming
            </h1>
          </div>
        </motion.div>

        {/* Search Bar */}
        <TopicSearch query={searchQuery} onQueryChange={setSearchQuery} />

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
