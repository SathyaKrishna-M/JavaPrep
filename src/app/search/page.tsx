'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Fuse, { FuseResult } from 'fuse.js'
import { searchIndex, SearchItem, trendingSearches } from '@/data/search-index'
import { FiSearch, FiArrowRight, FiBook } from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const typeIcons: Record<SearchItem['type'], string> = {
  topic: '📘',
  subtopic: '📚',
  question: '❓',
  important_question: '⭐',
  pattern: '✨',
}

const subjectColors: Record<SearchItem['subject'], string> = {
  Java: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  DDCOA: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  DM: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  DS: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  FWD: 'bg-red-500/20 text-red-400 border-red-500/30', // Assuming a color for FWD
}

const subjectLabels: Record<string, string> = {
  Java: 'Java Programming',
  DDCOA: 'Digital Design & COA',
  DM: 'Discrete Mathematics',
  DS: 'Data Structures',
  FWD: 'Web Development',
}

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<FuseResult<SearchItem>[]>([])
  const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null)

  // Initialize Fuse.js
  useEffect(() => {
    const fuseInstance = new Fuse(searchIndex, {
      keys: ['title', 'content', 'type', 'subject'],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    })
    setFuse(fuseInstance)
  }, [])

  // Search when query changes
  useEffect(() => {
    if (query && fuse) {
      const searchResults = fuse.search(query)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }, [query, fuse])

  // Group results by subject
  const groupedResults = results.reduce((acc, result) => {
    const subject = result.item.subject
    if (!acc[subject]) {
      acc[subject] = []
    }
    acc[subject].push(result)
    return acc
  }, {} as Record<SearchItem['subject'], FuseResult<SearchItem>[]>)

  const handleSelectResult = (item: SearchItem) => {
    const url = item.anchorId ? `${item.url}#${item.anchorId}` : item.url
    router.push(url)

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

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Search Results
          </h1>
          {query && (
            <p className="text-xl text-gray-300">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
            </p>
          )}
        </motion.div>

        {query ? (
          results.length > 0 ? (
            // Grouped Results
            <div className="space-y-8">
              {Object.entries(groupedResults).map(([subject, subjectResults]) => (
                <motion.div
                  key={subject}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-2xl font-bold text-white">
                      {subjectLabels[subject as SearchItem['subject']]}
                    </h2>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-gray-300">
                      {subjectResults.length} result{subjectResults.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {subjectResults.map((result, index) => {
                      const item = result.item
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleSelectResult(item)}
                          className="p-4 glass rounded-lg cursor-pointer hover:bg-white/5 transition-colors border border-white/5 hover:border-white/10"
                        >
                          <div className="flex items-start gap-4">
                            <span className="text-3xl flex-shrink-0">{typeIcons[item.type]}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h3 className="font-semibold text-white text-lg">
                                  {highlightMatch(item.title, query)}
                                </h3>
                                <span
                                  className={`px-2 py-1 rounded text-xs font-medium border ${subjectColors[item.subject]}`}
                                >
                                  {item.subject}
                                </span>
                                <span className="px-2 py-1 rounded text-xs font-medium bg-white/10 text-gray-400 capitalize">
                                  {item.type.replace('_', ' ')}
                                </span>
                              </div>
                              <p className="text-gray-400 mb-2">
                                {highlightMatch(item.content, query)}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <FiArrowRight className="w-4 h-4" />
                                <span className="truncate">{item.url}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // No Results
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 glass-card rounded-xl"
            >
              <FiSearch className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
              <p className="text-gray-400 mb-6">
                We couldn&apos;t find any results for &quot;{query}&quot;
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <p className="text-gray-500 text-sm w-full mb-2">Try searching for:</p>
                {trendingSearches.slice(0, 6).map((term) => (
                  <button
                    key={term}
                    onClick={() => router.push(`/search?q=${encodeURIComponent(term)}`)}
                    className="px-4 py-2 glass rounded-full text-sm hover:bg-white/10 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          )
        ) : (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 glass-card rounded-xl"
          >
            <FiSearch className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Start Searching</h2>
            <p className="text-gray-400 mb-6">
              Search across all topics, questions, and explanations
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <p className="text-gray-500 text-sm w-full mb-2">Trending searches:</p>
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => router.push(`/search?q=${encodeURIComponent(term)}`)}
                  className="px-4 py-2 glass rounded-full text-sm hover:bg-white/10 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen">
          <Navbar />
          <div className="container mx-auto px-4 py-20">
            <div className="text-center py-16">
              <FiSearch className="w-16 h-16 text-gray-500 mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-white mb-2">Loading search...</h2>
            </div>
          </div>
          <Footer />
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  )
}


