'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Element {
  id: string
  label: string
}

interface Relation {
  from: string
  to: string
}

interface HasseDiagramProps {
  elements: Element[]
  relations: Relation[]
  width?: number
  height?: number
  highlightLeast?: boolean
  highlightGreatest?: boolean
}

export default function DMHasseDiagram({
  elements,
  relations,
  width = 500,
  height = 400,
  highlightLeast = false,
  highlightGreatest = false,
}: HasseDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Simple layout: arrange elements in levels based on relations
  const levels: string[][] = []
  const processed = new Set<string>()
  const inDegree = new Map<string, number>()

  // Initialize in-degree
  elements.forEach(e => inDegree.set(e.id, 0))
  relations.forEach(r => {
    const current = inDegree.get(r.to) || 0
    inDegree.set(r.to, current + 1)
  })

  // Find elements with no incoming edges (least elements)
  let currentLevel: string[] = []
  elements.forEach(e => {
    if (inDegree.get(e.id) === 0) {
      currentLevel.push(e.id)
      processed.add(e.id)
    }
  })
  if (currentLevel.length > 0) {
    levels.push([...currentLevel])
  }

  // Build remaining levels
  while (processed.size < elements.length) {
    const nextLevel: string[] = []
    const outgoing = new Map<string, string[]>()
    
    relations.forEach(r => {
      if (!outgoing.has(r.from)) {
        outgoing.set(r.from, [])
      }
      outgoing.get(r.from)!.push(r.to)
    })

    elements.forEach(e => {
      if (processed.has(e.id)) return
      
      // Check if all predecessors are processed
      const predecessors = relations
        .filter(r => r.to === e.id)
        .map(r => r.from)
      
      if (predecessors.length === 0 || predecessors.every(p => processed.has(p))) {
        nextLevel.push(e.id)
        processed.add(e.id)
      }
    })

    if (nextLevel.length > 0) {
      levels.push([...nextLevel])
    } else {
      break
    }
  }

  // Calculate positions
  const positions = new Map<string, { x: number; y: number }>()
  const padding = 80
  const levelHeight = (height - 2 * padding) / Math.max(levels.length - 1, 1)

  levels.forEach((level, levelIdx) => {
    const levelWidth = width - 2 * padding
    const spacing = level.length > 1 ? levelWidth / (level.length - 1) : 0
    const startX = padding + (level.length === 1 ? levelWidth / 2 : 0)

    level.forEach((elemId, idx) => {
      positions.set(elemId, {
        x: startX + idx * spacing,
        y: padding + levelIdx * levelHeight,
      })
    })
  })

  // Filter out transitive edges (Hasse diagram only shows direct relations)
  const directRelations = relations.filter(r => {
    // Check if there's a path from r.from to r.to through another element
    const hasIntermediate = relations.some(rel => 
      rel.from === r.from && 
      rel.to !== r.to &&
      relations.some(r2 => r2.from === rel.to && r2.to === r.to)
    )
    return !hasIntermediate
  })

  const isLeast = (id: string) => {
    if (!highlightLeast) return false
    return levels[0]?.includes(id) || false
  }

  const isGreatest = (id: string) => {
    if (!highlightGreatest) return false
    return levels[levels.length - 1]?.includes(id) || false
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      <svg width={width} height={height} className="overflow-visible">
        {/* Draw edges */}
        {directRelations.map((rel, idx) => {
          const from = positions.get(rel.from)
          const to = positions.get(rel.to)
          if (!from || !to) return null

          return (
            <motion.line
              key={`edge-${idx}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#3b82f6"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            />
          )
        })}

        {/* Arrow marker */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
          </marker>
        </defs>

        {/* Draw nodes */}
        {elements.map((elem) => {
          const pos = positions.get(elem.id)
          if (!pos) return null

          const least = isLeast(elem.id)
          const greatest = isGreatest(elem.id)
          const hovered = hoveredNode === elem.id

          return (
            <g key={elem.id}>
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={hovered ? 25 : 20}
                fill={
                  least
                    ? '#10b981'
                    : greatest
                    ? '#f59e0b'
                    : hovered
                    ? '#3b82f6'
                    : '#1e40af'
                }
                stroke={hovered ? '#60a5fa' : '#3b82f6'}
                strokeWidth={hovered ? 3 : 2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                onMouseEnter={() => setHoveredNode(elem.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer transition-all"
              />
              <text
                x={pos.x}
                y={pos.y + 5}
                fill="white"
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
                pointerEvents="none"
              >
                {elem.label}
              </text>
            </g>
          )
        })}
      </svg>

      {highlightLeast && (
        <div className="mt-4 text-sm text-gray-400">
          <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
          Least elements
        </div>
      )}
      {highlightGreatest && (
        <div className="mt-2 text-sm text-gray-400">
          <span className="inline-block w-4 h-4 bg-amber-500 rounded-full mr-2"></span>
          Greatest elements
        </div>
      )}
    </motion.div>
  )
}

