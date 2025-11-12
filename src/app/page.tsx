'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { FaJava } from 'react-icons/fa'
import { FiCpu } from 'react-icons/fi'

const subjects = [
  {
    id: 'java',
    title: 'Java Programming',
    description: 'Master Java programming with interactive examples, visualizations, and practice exercises',
    icon: <FaJava className="w-16 h-16" />,
    href: '/subjects/java',
    color: 'from-orange-400 to-orange-600',
    bgColor: 'from-orange-500/10 to-orange-600/10',
    borderColor: 'border-orange-500/30',
  },
  {
    id: 'digital-system-design',
    title: 'Digital System Design',
    description: 'Learn digital logic design, circuit optimization, and programmable devices with visual flowcharts',
    icon: <FiCpu className="w-16 h-16" />,
    href: '/subjects/digital-system-design',
    color: 'from-blue-400 to-cyan-600',
    bgColor: 'from-blue-500/10 to-cyan-600/10',
    borderColor: 'border-blue-500/30',
  },
]

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
            BabuHub Learning Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Interactive, Visual, Easy - Master Programming & Digital Design
          </p>
        </motion.div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Link href={subject.href}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`glass-card h-full cursor-pointer group border-2 ${subject.borderColor} bg-gradient-to-br ${subject.bgColor}`}
                >
                  <div className={`text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r ${subject.color}`}>
                    {subject.icon}
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${subject.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform`}>
                    {subject.title}
                  </h3>
                  <p className="text-gray-300 mb-6">{subject.description}</p>
                  <motion.div
                    className={`flex items-center gap-2 font-semibold bg-gradient-to-r ${subject.color} bg-clip-text text-transparent`}
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    Explore Topics →
                  </motion.div>
                </motion.div>
              </Link>
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

