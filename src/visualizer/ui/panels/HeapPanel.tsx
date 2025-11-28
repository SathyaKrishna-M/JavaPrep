/**
 * Heap Panel Component
 * 
 * Displays heap objects from execution snapshot with search and filtering.
 * Milestone D: Enhanced with object inspection and navigation.
 */

'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { HeapObject } from '@/visualizer/core/tracking/Snapshot'
import { FiSearch, FiPackage, FiHash } from 'react-icons/fi'

interface HeapPanelProps {
  heap: HeapObject[]
  onObjectClick?: (objectId: string) => void
  selectedObjectId?: string
}

export default function HeapPanel({ heap, onObjectClick, selectedObjectId }: HeapPanelProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')

  const filteredHeap = useMemo(() => {
    let filtered = heap

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(obj => obj.type === filterType)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(obj =>
        obj.id.toLowerCase().includes(query) ||
        obj.type.toLowerCase().includes(query) ||
        Object.keys(obj.fields || {}).some(key => key.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [heap, searchQuery, filterType])

  const uniqueTypes = useMemo(() => {
    const types = new Set(heap.map(obj => obj.type))
    return Array.from(types).sort()
  }, [heap])

  return (
    <div className="h-full flex flex-col glass-card rounded-2xl border border-white/10 shadow-xl p-6">
      <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-400">
        <FiPackage className="w-5 h-5" />
        Heap Objects
        <span className="text-sm text-gray-500 font-normal">({heap.length})</span>
      </h4>

      {/* Search and Filter */}
      <div className="mb-4 space-y-2">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search objects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500/50"
        >
          <option value="all">All Types</option>
          {uniqueTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Heap Objects List */}
      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
        {filteredHeap.length > 0 ? (
          filteredHeap.map((obj, index) => (
            <motion.div
              key={obj.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ scale: 1.02, x: 4 }}
              onClick={() => onObjectClick?.(obj.id)}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                selectedObjectId === obj.id
                  ? 'bg-gradient-to-r from-amber-500/30 to-orange-500/30 border-2 border-amber-500/50 shadow-lg shadow-amber-500/20'
                  : 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:border-amber-500/40 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="font-semibold text-amber-400 flex items-center gap-2">
                    <FiHash className="w-4 h-4" />
                    {obj.type}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 font-mono">{obj.id}</div>
                </div>
                {obj.createdAt !== undefined && (
                  <span className="text-xs text-gray-500">Step {obj.createdAt}</span>
                )}
              </div>
              
              {/* Field Preview */}
              {obj.shallowPreview && Object.keys(obj.shallowPreview).length > 0 && (
                <div className="mt-2 pt-2 border-t border-amber-500/20">
                  <div className="text-xs text-gray-400 mb-1">Fields:</div>
                  <div className="space-y-1">
                    {Object.entries(obj.shallowPreview).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="text-xs text-gray-300">
                        <span className="text-amber-300">{key}:</span>{' '}
                        <span className="font-mono">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </span>
                      </div>
                    ))}
                    {Object.keys(obj.shallowPreview).length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{Object.keys(obj.shallowPreview).length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* References */}
              {obj.references && obj.references.length > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  References: {obj.references.length}
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
              <FiPackage className="w-8 h-8 text-amber-400/50" />
            </div>
            <p className="text-gray-500 text-sm italic">
              {searchQuery || filterType !== 'all' 
                ? 'No objects match the filter'
                : 'No heap objects allocated'}
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Objects created with <code className="text-amber-400">new</code> will appear here
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
