'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SubjectCard from '@/components/SubjectCard'
import { FaJava, FaDatabase, FaGlobe } from 'react-icons/fa'
import { FiCpu, FiLayers } from 'react-icons/fi'
import Link from 'next/link'

const subjects = [
  {
    id: 'java',
    title: 'Java Programming',
    description: 'Master Java programming with interactive examples, visualizations, and practice exercises designed for exam preparation.',
    icon: <FaJava className="w-12 h-12" />,
    href: '/subjects/java',
    gradientFrom: 'from-orange-400',
    gradientTo: 'to-orange-600',
  },
  {
    id: 'digital-system-design',
    title: 'Digital Design Computer Orientation Architecture',
    description: 'Learn digital logic design, circuit optimization, and programmable devices with visual flowcharts and interactive diagrams.',
    icon: <FiCpu className="w-12 h-12" />,
    href: '/subjects/digital-system-design',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-cyan-600',
  },
  {
    id: 'discrete-mathematics',
    title: 'Discrete Mathematics',
    description: 'Master sets, relations, functions, lattices, and discrete structures with interactive diagrams and step-by-step examples.',
    icon: <FiLayers className="w-12 h-12" />,
    href: '/subjects/discrete-mathematics',
    gradientFrom: 'from-purple-400',
    gradientTo: 'to-pink-600',
  },
  {
    id: 'data-structures',
    title: 'Data Structures in Java',
    description: 'Master data structures including arrays, linked lists, and algorithms with complexity analysis.',
    icon: <FaDatabase className="w-12 h-12" />,
    href: '/subjects/data-structures',
    gradientFrom: 'from-green-400',
    gradientTo: 'to-emerald-600',
  },
  {
    id: 'web-development',
    title: 'Fundamentals of Web Development',
    description: 'Learn to build modern websites with HTML, CSS, JavaScript, and responsive design principles.',
    icon: <FaGlobe className="w-12 h-12" />,
    href: '/subjects/web-development',
    gradientFrom: 'from-pink-400',
    gradientTo: 'to-rose-600',
  },
]

export default function SubjectsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-8"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Choose a Subject
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Select a subject to start your learning journey
          </p>
        </motion.div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {subjects.map((subject, index) => (
            <SubjectCard
              key={subject.id}
              title={subject.title}
              description={subject.description}
              icon={subject.icon}
              href={subject.href}
              gradientFrom={subject.gradientFrom}
              gradientTo={subject.gradientTo}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}

