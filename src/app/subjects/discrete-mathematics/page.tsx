'use client'

import { motion } from 'framer-motion'
import TopicCard from '@/components/TopicCard'
import { co1Topics, co2Topics } from '@/data/dm-topics'
import Link from 'next/link'

export default function DiscreteMathematicsPage() {
  return (
    <div className="lg:col-span-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-4"
          >
            ← Back to Home
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Discrete Mathematics
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Master discrete mathematics concepts including sets, relations, functions, and lattices with interactive visualizations and examples.
        </p>
        <div className="glass-card p-6 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-600/10 border-purple-500/30">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">About This Subject</h2>
          <p className="text-gray-300 leading-relaxed">
            Discrete Mathematics is fundamental to computer science. This course covers sets, relations, functions, 
            inclusion-exclusion principles, and lattice theory. Each topic includes visual diagrams, step-by-step examples, 
            and practice problems to help you master these essential concepts.
          </p>
        </div>
      </motion.div>

      {/* CO-1 Topics */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          CO-1 — Fundamentals of Discrete Mathematics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {co1Topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TopicCard topic={topic} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* CO-2 Topics */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          CO-2 — Logic, Logical Reasoning & Proof Methods
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {co2Topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TopicCard topic={topic} />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="glass-card p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Practice All CO-1 Questions</h2>
        <p className="text-gray-300 mb-4">
          Access comprehensive practice questions covering all Course Outcome 1 (CO-1) topics. 
          Each topic includes practice questions with detailed solutions and visual aids.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...co1Topics, ...co2Topics].map((topic) => (
            <Link
              key={topic.id}
              href={`${topic.href}#practice`}
              className="block p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors border border-gray-700 hover:border-blue-500/50"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{topic.icon}</span>
                <div>
                  <div className="font-semibold text-white">{topic.title}</div>
                  <div className="text-sm text-gray-400">Practice Questions →</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

