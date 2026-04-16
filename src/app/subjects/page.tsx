'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SubjectCard from '@/components/SubjectCard'
import { FaJava, FaDatabase, FaGlobe, FaCalculator } from 'react-icons/fa'
import { FiCpu, FiLayers, FiGitBranch, FiCode, FiBarChart2, FiRadio } from 'react-icons/fi'
import Link from 'next/link'

const semesters = [
  {
    id: 'even',
    label: '25-26 Even Sem',
    subjects: [
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
    ],
  },
  {
    id: 'odd',
    label: '25-26 Odd Sem',
    subjects: [
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
      {
        id: 'mathematics-for-ai',
        title: 'Mathematics for AI',
        description: 'Master vectors, calculus, optimization, and the math behind Neural Networks.',
        icon: <FaCalculator className="w-12 h-12" />,
        href: '/subjects/mathematics-for-ai',
        gradientFrom: 'from-indigo-400',
        gradientTo: 'to-violet-600',
      },
    ],
  },
  {
    id: 'third',
    label: '25-26 3rd Sem',
    subjects: [
      {
        id: 'computational-foundations-ai',
        title: 'Computational Foundations for AI',
        description: 'AI agents, search algorithms, CSP, game trees, Bayesian networks, and hybrid AI systems.',
        icon: <FiCpu className="w-12 h-12" />,
        href: '/subjects/computational-foundations-ai',
        gradientFrom: 'from-violet-400',
        gradientTo: 'to-indigo-600',
      },
      {
        id: 'data-structures-algorithms-2',
        title: 'Data Structures & Algorithms 2',
        description: 'Trees, graphs, advanced sorting, greedy algorithms, and dynamic programming.',
        icon: <FiGitBranch className="w-12 h-12" />,
        href: '/subjects/data-structures-algorithms-2',
        gradientFrom: 'from-cyan-400',
        gradientTo: 'to-teal-600',
      },
      {
        id: 'front-end-development-frameworks',
        title: 'Front-End Development Frameworks',
        description: 'React, TypeScript, state management, build systems, testing, and deployment engineering.',
        icon: <FiCode className="w-12 h-12" />,
        href: '/subjects/front-end-development-frameworks',
        gradientFrom: 'from-pink-400',
        gradientTo: 'to-rose-600',
      },
      {
        id: 'mathematics-data-science',
        title: 'Mathematics for Data Science',
        description: 'Statistics, probability, hypothesis testing, and regression for data-driven decision making.',
        icon: <FiBarChart2 className="w-12 h-12" />,
        href: '/subjects/mathematics-data-science',
        gradientFrom: 'from-emerald-400',
        gradientTo: 'to-teal-600',
      },
      {
        id: 'mathematics-communication-systems',
        title: 'Mathematics for Communication Systems',
        description: 'Signal representation, Fourier analysis, LTI systems, Z-transform, BER, and Shannon capacity.',
        icon: <FiRadio className="w-12 h-12" />,
        href: '/subjects/mathematics-communication-systems',
        gradientFrom: 'from-amber-400',
        gradientTo: 'to-orange-600',
      },
    ],
  },
]

export default function SubjectsPage() {
  const [activeSem, setActiveSem] = useState('even')
  const activeSemester = semesters.find(s => s.id === activeSem)!

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
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
            Select a semester and subject to start your learning journey
          </p>
        </motion.div>

        {/* Semester Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            {semesters.map(sem => (
              <button
                key={sem.id}
                onClick={() => setActiveSem(sem.id)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeSem === sem.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {activeSem === sem.id && (
                  <motion.div
                    layoutId="semTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                {sem.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Subject Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSem}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {activeSemester.subjects.map((subject, index) => (
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
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  )
}

