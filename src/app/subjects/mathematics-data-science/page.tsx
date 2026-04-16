'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiHome, FiChevronRight, FiBarChart2 } from 'react-icons/fi'

const courseOutcomes = [
  {
    co: 'CO1',
    title: 'Introduction to Data Science',
    desc: 'Types of data, data sources, data lifecycle, data cleaning (missing values, duplicates, outliers), feature preparation.',
  },
  {
    co: 'CO2',
    title: 'Descriptive Statistics',
    desc: 'Measurement scales, measures of central tendency (mean, median, mode), dispersion (variance, SD, IQR), percentiles.',
  },
  {
    co: 'CO3',
    title: 'Probability Theory',
    desc: 'Sample space, conditional probability, Bayes theorem, distributions (Bernoulli, Binomial, Normal), expectation & variance.',
  },
  {
    co: 'CO4',
    title: 'Inferential Statistics',
    desc: 'Sampling distributions, point estimation, confidence intervals, hypothesis testing (z-test, t-test, chi-square), p-values.',
  },
  {
    co: 'CO5',
    title: 'Regression Analysis',
    desc: 'Correlation, simple & multiple linear regression, assumptions, residual analysis, multicollinearity, model evaluation.',
  },
  {
    co: 'CO6',
    title: 'Visualization & Decision Making',
    desc: 'Advanced visualization, data storytelling, pattern discovery, evaluation metrics (MSE, RMSE, R²), ethics in analytics.',
  },
]

export default function MDSPage() {
  return (
    <div className="relative">
      {/* Background orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute right-0 top-1/2 w-96 h-96 bg-gradient-to-br from-teal-500/20 via-cyan-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm text-gray-400 mb-8"
        >
          <Link href="/" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <FiHome className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4" />
          <Link href="/subjects" className="hover:text-emerald-400 transition-colors">Subjects</Link>
          <FiChevronRight className="w-4 h-4" />
          <span className="text-white">Mathematics for Data Science</span>
        </motion.nav>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 relative"
        >
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-teal-500/20 rounded-full blur-3xl -z-10" />
          <div className="flex items-center gap-4">
            <FiBarChart2 className="w-12 h-12 md:w-16 md:h-16 text-emerald-400" />
            <div>
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent leading-tight">
                Mathematics for Data Science
              </h1>
              <p className="text-gray-400 mt-1 text-sm">25MT1306E &nbsp;·&nbsp; 4 Credits &nbsp;·&nbsp; 25-26 3rd Sem</p>
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
                className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-300"
              >
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{co.co}</span>
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
