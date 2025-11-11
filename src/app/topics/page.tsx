'use client'

import { motion } from 'framer-motion'
import TopicCard from '@/components/TopicCard'
import { topics } from '@/data/topics'

export default function TopicsPage() {
  return (
    <div className="lg:col-span-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Java Topics
        </h1>
        <p className="text-xl text-gray-300">
          Explore all Java concepts with interactive examples and visualizations
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
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

