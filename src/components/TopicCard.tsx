'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Topic } from '@/data/java-topics'

interface TopicCardProps {
  topic: Topic
}

export default function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link href={topic.href}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="glass-card h-full cursor-pointer group"
      >
        <div className="text-5xl mb-4 text-center">{topic.icon}</div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
          {topic.title}
        </h3>
        <p className="text-gray-300 text-sm">{topic.description}</p>
        <motion.div
          className="mt-4 text-blue-400 font-semibold flex items-center gap-2"
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
        >
          Learn more →
        </motion.div>
      </motion.div>
    </Link>
  )
}

