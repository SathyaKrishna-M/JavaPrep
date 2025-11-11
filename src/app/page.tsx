'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TopicCard from '@/components/TopicCard'
import { topics } from '@/data/topics'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Master Java for Exams
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Interactive, Visual, Easy
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/topics"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/50 transition-all duration-300"
            >
              Start Learning
            </Link>
          </motion.div>
        </motion.div>

        {/* Topic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
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

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-card max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Why BabuHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Read Concepts</h3>
              <p className="text-gray-300">Learn Java concepts with clear explanations</p>
            </div>
            <div>
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2">Practice Examples</h3>
              <p className="text-gray-300">Practice with real coding examples</p>
            </div>
            <div>
              <div className="text-4xl mb-4">👁️</div>
              <h3 className="text-xl font-semibold mb-2">Visualize Dry Runs</h3>
              <p className="text-gray-300">See code execution step-by-step</p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  )
}

