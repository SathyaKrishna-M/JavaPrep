/**
 * Object Inspector Component
 * 
 * Detailed view of a single heap object with all fields and references.
 * Milestone D: Enhanced object inspection.
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HeapObject } from '@/visualizer/core/tracking/Snapshot'
import { FiX, FiExternalLink, FiPackage } from 'react-icons/fi'

interface ObjectInspectorProps {
  object: HeapObject | null
  onClose: () => void
  onNavigateToObject?: (objectId: string) => void
  onNavigateToCreation?: (stepIndex: number) => void
}

export default function ObjectInspector({
  object,
  onClose,
  onNavigateToObject,
  onNavigateToCreation,
}: ObjectInspectorProps) {
  const [expandedFields, setExpandedFields] = useState<Set<string>>(new Set())

  if (!object) return null

  const toggleField = (fieldName: string) => {
    const newExpanded = new Set(expandedFields)
    if (newExpanded.has(fieldName)) {
      newExpanded.delete(fieldName)
    } else {
      newExpanded.add(fieldName)
    }
    setExpandedFields(newExpanded)
  }

  const isArray = object.type.endsWith('[]')
  const arrayLength = isArray ? (object.fields.length as number) : null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 rounded-xl border border-amber-500/30 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <FiPackage className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="text-xl font-bold text-amber-400">{object.type}</h3>
              <p className="text-sm text-gray-500 font-mono mt-1">{object.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Creation Info */}
          {object.createdAt !== undefined && (
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Created at step</span>
              <button
                onClick={() => onNavigateToCreation?.(object.createdAt!)}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
              >
                Step {object.createdAt}
                <FiExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
          )}

          {/* Array Info */}
          {isArray && arrayLength !== null && (
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="text-sm text-gray-400 mb-2">Array Information</div>
              <div className="text-white">
                <span className="text-purple-400">Length:</span> {arrayLength}
              </div>
            </div>
          )}

          {/* Fields */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Fields</h4>
            {Object.keys(object.fields).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(object.fields).map(([key, value]) => {
                  const isExpanded = expandedFields.has(key)
                  const isObjectRef = typeof value === 'string' && value.startsWith('obj_')
                  
                  return (
                    <div
                      key={key}
                      className="p-3 rounded-lg bg-gray-800/50 border border-gray-700"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className="text-amber-300 font-semibold">{key}</span>
                          <span className="text-gray-500 mx-2">:</span>
                          <span className="text-white font-mono text-sm">
                            {typeof value === 'object' 
                              ? JSON.stringify(value)
                              : String(value)
                            }
                          </span>
                        </div>
                        {isObjectRef && (
                          <button
                            onClick={() => onNavigateToObject?.(value as string)}
                            className="ml-2 p-1 rounded hover:bg-gray-700 text-blue-400 hover:text-blue-300"
                            title="Navigate to referenced object"
                          >
                            <FiExternalLink className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">No fields</p>
            )}
          </div>

          {/* References */}
          {object.references && object.references.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">References</h4>
              <div className="space-y-2">
                {object.references.map((refId) => (
                  <button
                    key={refId}
                    onClick={() => onNavigateToObject?.(refId)}
                    className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 text-left text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-between"
                  >
                    <span className="font-mono text-sm">{refId}</span>
                    <FiExternalLink className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

