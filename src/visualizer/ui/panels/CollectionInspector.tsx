/**
 * Collection Inspector Component
 * 
 * Specialized view for collections (ArrayList, HashMap, etc.) with pagination.
 * Milestone D: Enhanced collection visualization.
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CollectionPreview } from '@/visualizer/core/tracking/Snapshot'
import { FiChevronLeft, FiChevronRight, FiList, FiHash } from 'react-icons/fi'

interface CollectionInspectorProps {
  preview: CollectionPreview
  onLoadMore?: (page: number) => Promise<any[]>
}

export default function CollectionInspector({ preview, onLoadMore }: CollectionInspectorProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [loadedItems, setLoadedItems] = useState<any[]>(preview.elementsPreview || preview.keysPreview || [])
  const pageSize = 10

  const isMap = preview.type.includes('Map')
  const totalPages = Math.ceil(preview.size / pageSize)
  const hasMore = preview.size > loadedItems.length

  const handleLoadMore = async () => {
    if (onLoadMore && hasMore) {
      const nextPage = Math.floor(loadedItems.length / pageSize)
      const newItems = await onLoadMore(nextPage)
      setLoadedItems([...loadedItems, ...newItems])
    }
  }

  const currentItems = loadedItems.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  )

  return (
    <div className="h-full flex flex-col glass-card rounded-2xl border border-white/10 shadow-xl p-6">
      <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-400">
        <FiList className="w-5 h-5" />
        {preview.type}
        <span className="text-sm text-gray-500 font-normal">({preview.size} items)</span>
      </h4>

      {/* Collection Info */}
      <div className="mb-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Size:</span>
          <span className="text-white font-semibold">{preview.size}</span>
        </div>
        {preview.type.includes('Map') && (
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-gray-400">Preview:</span>
            <span className="text-white">{loadedItems.length} / {preview.size}</span>
          </div>
        )}
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
        {isMap && preview.keysPreview && preview.valuesPreview ? (
          // Map view: key-value pairs
          currentItems.map((key, index) => {
            const value = preview.valuesPreview?.[currentPage * pageSize + index]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <FiHash className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300 font-mono text-sm">{String(key)}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-white font-mono text-sm">{String(value)}</span>
                </div>
              </motion.div>
            )
          })
        ) : (
          // List/Set view: elements
          currentItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-xs w-6">#{currentPage * pageSize + index + 1}</span>
                <span className="text-white font-mono text-sm">{String(item)}</span>
              </div>
            </motion.div>
          ))
        )}

        {currentItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
              <FiList className="w-8 h-8 text-purple-400/50" />
            </div>
            <p className="text-gray-500 text-sm italic">Collection is empty</p>
          </motion.div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center justify-between pt-4 border-t border-purple-500/20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
          >
            <FiChevronLeft className="w-4 h-4" />
            Previous
          </motion.button>
          
          <span className="text-sm text-gray-400 font-medium">
            Page {currentPage + 1} of {totalPages}
          </span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage >= totalPages - 1}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
          >
            Next
            <FiChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}

      {/* Load More */}
      {hasMore && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLoadMore}
          className="mt-4 w-full px-4 py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 transition-all duration-200 font-medium"
        >
          Load More ({preview.size - loadedItems.length} remaining)
        </motion.button>
      )}
    </div>
  )
}

