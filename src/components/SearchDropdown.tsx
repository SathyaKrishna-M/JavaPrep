'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Fuse from 'fuse.js'
import { searchIndex, SearchItem } from '@/data/search-index'
import { FiSearch, FiX, FiArrowRight } from 'react-icons/fi'

interface SearchDropdownProps {
  isOpen: boolean
  onClose: () => void
  initialQuery?: string
}

const typeIcons: Record<SearchItem['type'], string> = {
  topic: '📘',
  subtopic: '📚',
  question: '❓',
  important_question: '⭐',
  pattern: '✨',
}

const subjectColors: Record<SearchItem['subject'], string> = {
  Java: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  DSD: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  DM: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
}

export default function SearchDropdown({ isOpen, onClose, initialQuery = '' }: SearchDropdownProps) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Fuse.FuseResult<SearchItem>[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const fuseRef = useRef<Fuse<SearchItem> | null>(null)

  // Initialize Fuse.js
  useEffect(() => {
    fuseRef.current = new Fuse(searchIndex, {
      keys: ['title', 'content', 'type', 'subject'],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    })
  }, [])

  // Search when query changes
  useEffect(() => {
    if (query.length >= 2 && fuseRef.current) {
      const searchResults = fuseRef.current.search(query)
      setResults(searchResults.slice(0, 6)) // Limit to 6 results
      setSelectedIndex(0)
    } else {
      setResults([])
    }
  }, [query])

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      if (initialQuery) {
        setQuery(initialQuery)
      }
    }
  }, [isOpen, initialQuery])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results.length > 0) {
        handleSelectResult(results[selectedIndex].item)
      } else if (query.length >= 2) {
        // Navigate to search page if no results but query exists
        router.push(`/search?q=${encodeURIComponent(query)}`)
        onClose()
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const handleSelectResult = (item: SearchItem) => {
    const url = item.anchorId ? `${item.url}#${item.anchorId}` : item.url
    router.push(url)
    onClose()
    setQuery('')
    
    // Scroll to element if anchor exists
    if (item.anchorId) {
      setTimeout(() => {
        const element = document.getElementById(item.anchorId!)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          element.classList.add('highlight-search-result')
          setTimeout(() => {
            element.classList.remove('highlight-search-result')
          }, 1500)
        }
      }, 100)
    }
  }

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-400/30 text-yellow-300 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      />
      
      {/* Search Container */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="relative w-full max-w-2xl glass-card rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <FiSearch className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search topics, questions, patterns..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <FiX className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.length >= 2 ? (
            results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => {
                  const item = result.item
                  const isSelected = index === selectedIndex
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSelectResult(item)}
                      className={`px-4 py-3 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-500/20 border-l-4 border-blue-400'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">{typeIcons[item.type]}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-white">
                              {highlightMatch(item.title, query)}
                            </h3>
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium border ${subjectColors[item.subject]}`}
                            >
                              {item.subject}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 line-clamp-1">
                            {highlightMatch(item.content, query)}
                          </p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                            <span className="capitalize">{item.type.replace('_', ' ')}</span>
                            <FiArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-gray-400">
                <p className="mb-2">No results found for &quot;{query}&quot;</p>
                <p className="text-sm">Try different keywords or check spelling</p>
              </div>
            )
          ) : (
            <div className="px-4 py-8 text-center text-gray-400">
              <p className="mb-4">Start typing to search...</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Arrays', 'Boolean Algebra', 'Bubble Sort', 'Patterns'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 glass rounded-full text-sm hover:bg-white/10 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 glass rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 glass rounded">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 glass rounded">Enter</kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 glass rounded">Esc</kbd>
              Close
            </span>
          </div>
          {query.length >= 2 && results.length > 0 && (
            <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
          )}
        </div>
      </motion.div>
    </div>
  )
}

