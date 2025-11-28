/**
 * Variables Panel Component
 * 
 * Displays current variable states from execution snapshot.
 * Milestone E: Enhanced with grouping, change highlighting, animations, and interactions.
 */

'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Variable } from '@/visualizer/core/tracking/Snapshot'
import { FiChevronDown, FiChevronUp, FiHash, FiSearch } from 'react-icons/fi'

interface VariablesPanelProps {
  variables: Variable[]
  previousVariables?: Variable[]
  onVariableHover?: (variableName: string) => void
  onVariableClick?: (variableName: string) => void
}

export default function VariablesPanel({ 
  variables, 
  previousVariables = [],
  onVariableHover,
  onVariableClick,
}: VariablesPanelProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['local', 'parameters']))
  const [hoveredVariable, setHoveredVariable] = useState<string | null>(null)

  // Group variables by scope
  const groupedVariables = useMemo(() => {
    const groups: Record<string, Variable[]> = {
      local: [],
      parameters: [],
      static: [],
      fields: [],
    }

    variables.forEach((variable) => {
      const scope = variable.scope || 'local'
      if (!groups[scope]) {
        groups[scope] = []
      }
      groups[scope].push(variable)
    })

    return groups
  }, [variables])

  // Check if variable changed
  const getVariableChange = (variable: Variable): 'added' | 'changed' | 'unchanged' => {
    const previous = previousVariables.find(v => v.name === variable.name)
    if (!previous) return 'added'
    if (JSON.stringify(previous.value) !== JSON.stringify(variable.value)) {
      return 'changed'
    }
    return 'unchanged'
  }

  // Filter variables by search
  const filteredGroups = useMemo(() => {
    if (!searchQuery) return groupedVariables

    const query = searchQuery.toLowerCase()
    const filtered: Record<string, Variable[]> = {}

    Object.entries(groupedVariables).forEach(([scope, vars]) => {
      const filteredVars = vars.filter(
        v => v.name.toLowerCase().includes(query) || 
             v.type.toLowerCase().includes(query) ||
             String(v.value).toLowerCase().includes(query)
      )
      if (filteredVars.length > 0) {
        filtered[scope] = filteredVars
      }
    })

    return filtered
  }, [groupedVariables, searchQuery])

  const toggleGroup = (groupName: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName)
    } else {
      newExpanded.add(groupName)
    }
    setExpandedGroups(newExpanded)
  }

  const formatValue = (value: any): string => {
    if (value === null) return 'null'
    if (value === undefined) return 'undefined'
    if (typeof value === 'object') {
      return JSON.stringify(value)
    }
    return String(value)
  }

  const getChangeColor = (change: 'added' | 'changed' | 'unchanged') => {
    switch (change) {
      case 'added':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/30'
      case 'changed':
        return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30'
      default:
        return 'from-blue-500/10 to-cyan-500/10 border-blue-500/20'
    }
  }

  return (
    <div className="h-full flex flex-col glass-card rounded-2xl border border-white/10 shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold flex items-center gap-2 text-blue-400">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          Variables
          <span className="text-sm text-gray-500 font-normal">({variables.length})</span>
        </h4>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search variables..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 text-sm"
        />
      </div>

      {/* Variables List */}
      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
        {Object.keys(filteredGroups).length > 0 ? (
          Object.entries(filteredGroups).map(([scope, vars]) => {
            const isExpanded = expandedGroups.has(scope)
            const changeCount = vars.filter(v => getVariableChange(v) !== 'unchanged').length

            return (
              <div key={scope} className="border border-white/5 rounded-xl overflow-hidden">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(scope)}
                  className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-300 capitalize">{scope}</span>
                    {changeCount > 0 && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                        {changeCount} changed
                      </span>
                    )}
                  </div>
                  {isExpanded ? (
                    <FiChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <FiChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {/* Group Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-2 space-y-2">
                        {vars.map((variable, index) => {
                          const change = getVariableChange(variable)
                          const isHovered = hoveredVariable === variable.name

                          return (
                            <motion.div
                              key={`${variable.name}-${index}`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.03 }}
                              onMouseEnter={() => {
                                setHoveredVariable(variable.name)
                                onVariableHover?.(variable.name)
                              }}
                              onMouseLeave={() => {
                                setHoveredVariable(null)
                              }}
                              onClick={() => onVariableClick?.(variable.name)}
                              className={`flex justify-between items-center p-3 rounded-lg border transition-all duration-300 cursor-pointer bg-gradient-to-r ${getChangeColor(change)} ${
                                isHovered ? 'scale-[1.02] shadow-lg' : ''
                              }`}
                            >
                              <div className="flex flex-col flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <FiHash className="w-3 h-3 text-blue-400 flex-shrink-0" />
                                  <span className="font-mono text-blue-400 font-semibold text-sm truncate">
                                    {variable.name}
                                  </span>
                                  {change === 'changed' && (
                                    <motion.span
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="w-2 h-2 bg-yellow-400 rounded-full"
                                    />
                                  )}
                                  {change === 'added' && (
                                    <motion.span
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="w-2 h-2 bg-green-400 rounded-full"
                                    />
                                  )}
                                </div>
                                <span className="text-xs text-gray-500 mt-0.5">{variable.type}</span>
                              </div>
                              <motion.span
                                key={formatValue(variable.value)}
                                initial={{ scale: 1.2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="font-mono text-white bg-gray-900/50 px-3 py-1.5 rounded-lg text-sm border border-white/10"
                              >
                                {formatValue(variable.value)}
                              </motion.span>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
              <FiHash className="w-8 h-8 text-blue-400/50" />
            </div>
            <p className="text-gray-500 text-sm">
              {searchQuery ? 'No variables match your search' : 'No variables in current step'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
