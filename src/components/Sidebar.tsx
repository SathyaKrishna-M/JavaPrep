'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { topics } from '@/data/topics'
import { motion } from 'framer-motion'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="glass-card h-fit sticky top-24">
      <h2 className="text-xl font-bold mb-4">Topics</h2>
      <nav className="space-y-2">
        {topics.map((topic, index) => {
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
      </nav>
    </aside>
  )
}

