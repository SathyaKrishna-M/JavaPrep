'use client'

import { motion } from 'framer-motion'
import TopicCard from '@/components/TopicCard'
import { dsdTopics } from '@/data/dsd-topics'
import Link from 'next/link'

export default function DigitalSystemDesignPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Digital System Design
        </h1>
        <p className="text-xl text-gray-300">
          Master digital logic design, circuit optimization, and programmable devices
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dsdTopics.map((topic, index) => (
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
  )
}

