'use client'

import { useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface TopicSearchProps {
  query: string
  onQueryChange: (query: string) => void
  placeholder?: string
}

export default function TopicSearch({ query, onQueryChange, placeholder = 'Search topics...' }: TopicSearchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <div className="relative max-w-2xl">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <FiSearch className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
        />
        {query && (
          <button
            onClick={() => onQueryChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  )
}

