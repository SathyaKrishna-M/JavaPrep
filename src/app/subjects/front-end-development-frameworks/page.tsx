'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiHome, FiChevronRight, FiCode } from 'react-icons/fi'

const courseOutcomes = [
  {
    co: 'CO1',
    title: 'Front-End Engineering Foundations',
    desc: 'Framework design rationale, Virtual DOM, declarative UIs, unidirectional data flow, component-driven thinking, reconciliation.',
  },
  {
    co: 'CO2',
    title: 'JavaScript & TypeScript for Frameworks',
    desc: 'ES6+ essentials, closures, functional programming, async/await, TS types/interfaces/generics, front-end codebase architecture.',
  },
  {
    co: 'CO3',
    title: 'React Component Model',
    desc: 'Props, state, hooks, re-renders, controlled/uncontrolled UI, component composition, Tailwind and CSS module styling.',
  },
  {
    co: 'CO4',
    title: 'State Architecture & API Integration',
    desc: 'Lifting state, React Context, async data flows, race conditions, caching, container-presenter patterns, error boundaries.',
  },
  {
    co: 'CO5',
    title: 'Routing, Forms & Performance',
    desc: 'SPA routing, dynamic/nested routes, form validation, accessibility (ARIA), memoization, lazy loading, render batching.',
  },
  {
    co: 'CO6',
    title: 'Build Systems, Testing & Deployment',
    desc: 'Vite/Webpack bundling, tree-shaking, Jest & RTL testing, CI/CD pipeline, Netlify/Vercel deployment, Lighthouse audits.',
  },
]

export default function FEDFPage() {
  return (
    <div className="relative">
      {/* Background orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/20 via-rose-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute right-0 top-1/2 w-96 h-96 bg-gradient-to-br from-orange-500/20 via-amber-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm text-gray-400 mb-8"
        >
          <Link href="/" className="hover:text-pink-400 transition-colors flex items-center gap-1">
            <FiHome className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4" />
          <Link href="/subjects" className="hover:text-pink-400 transition-colors">Subjects</Link>
          <FiChevronRight className="w-4 h-4" />
          <span className="text-white">Front-End Development Frameworks</span>
        </motion.nav>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 relative"
        >
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-pink-500/20 via-rose-500/20 to-orange-500/20 rounded-full blur-3xl -z-10" />
          <div className="flex items-center gap-4">
            <FiCode className="w-12 h-12 md:w-16 md:h-16 text-pink-400" />
            <div>
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent leading-tight">
                Front-End Development Frameworks
              </h1>
              <p className="text-gray-400 mt-1 text-sm">25CS1201E &nbsp;·&nbsp; 3 Credits &nbsp;·&nbsp; 25-26 3rd Sem</p>
            </div>
          </div>
        </motion.div>

        {/* Course Outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-xl font-semibold text-gray-200 mb-6">Course Outcomes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseOutcomes.map((co, i) => (
              <motion.div
                key={co.co}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-pink-500/40 hover:bg-pink-500/5 transition-all duration-300"
              >
                <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">{co.co}</span>
                <h3 className="text-white font-semibold mt-1 mb-2">{co.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{co.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center py-16 border border-dashed border-white/10 rounded-2xl"
        >
          <p className="text-4xl mb-3">🚧</p>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">Topics Coming Soon</h3>
          <p className="text-gray-500 text-sm">Content for this subject is being prepared.</p>
        </motion.div>
      </div>
    </div>
  )
}
