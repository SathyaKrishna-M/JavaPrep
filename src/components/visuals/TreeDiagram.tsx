'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export interface TNode {
  id: string
  label: string
  x: number
  y: number
  color?: 'cyan' | 'violet' | 'green' | 'amber' | 'red' | 'blue' | 'slate'
  highlight?: boolean
  dim?: boolean
  sublabel?: string
}

export interface TEdge {
  from: string
  to: string
  label?: string
  highlight?: boolean
  dashed?: boolean
}

interface TreeDiagramProps {
  nodes: TNode[]
  edges: TEdge[]
  width?: number
  height?: number
  title?: string
  className?: string
}

const COLOR = {
  cyan:   { fill: '#083344', stroke: '#06b6d4', text: '#67e8f9' },
  violet: { fill: '#2e1065', stroke: '#8b5cf6', text: '#c4b5fd' },
  green:  { fill: '#052e16', stroke: '#22c55e', text: '#86efac' },
  amber:  { fill: '#451a03', stroke: '#f59e0b', text: '#fde68a' },
  red:    { fill: '#450a0a', stroke: '#ef4444', text: '#fca5a5' },
  blue:   { fill: '#0c1a2e', stroke: '#3b82f6', text: '#93c5fd' },
  slate:  { fill: '#0f172a', stroke: '#475569', text: '#94a3b8' },
}

export default function TreeDiagram({ nodes, edges, width = 560, height = 260, title, className = '' }: TreeDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.2 })
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))
  const R = 22

  return (
    <div ref={ref} className={`bg-slate-900/60 rounded-xl border border-slate-700/60 p-4 ${className}`}>
      {title && <p className="text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">{title}</p>}
      <div className="overflow-x-auto flex justify-center">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '100%' }}>
          {/* Edges */}
          {edges.map((edge, i) => {
            const from = nodeMap[edge.from]
            const to   = nodeMap[edge.to]
            if (!from || !to) return null
            const stroke = edge.highlight ? '#f59e0b' : '#334155'
            return (
              <motion.path
                key={`e${i}`}
                d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                stroke={stroke}
                strokeWidth={edge.highlight ? 2.5 : 1.5}
                strokeDasharray={edge.dashed ? '5,4' : undefined}
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
                transition={{ duration: 0.45, delay: inView ? 0.05 + i * 0.06 : 0 }}
              />
            )
          })}

          {/* Edge labels */}
          {edges.map((edge, i) => {
            if (!edge.label) return null
            const from = nodeMap[edge.from]
            const to   = nodeMap[edge.to]
            if (!from || !to) return null
            return (
              <motion.text
                key={`el${i}`}
                x={(from.x + to.x) / 2 + 8}
                y={(from.y + to.y) / 2 - 4}
                fill={edge.highlight ? '#f59e0b' : '#64748b'}
                fontSize="11"
                fontFamily="ui-monospace,monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: inView ? 0.4 + i * 0.05 : 0 }}
              >
                {edge.label}
              </motion.text>
            )
          })}

          {/* Nodes */}
          {nodes.map((node, i) => {
            const c      = COLOR[node.color ?? 'cyan']
            const fill   = node.highlight ? COLOR.amber.fill   : node.dim ? '#020617' : c.fill
            const stroke = node.highlight ? COLOR.amber.stroke : node.dim ? '#1e293b' : c.stroke
            const text   = node.highlight ? COLOR.amber.text   : node.dim ? '#334155' : c.text
            const targetOpacity = node.dim ? 0.3 : 1
            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: inView ? targetOpacity : 0, scale: inView ? 1 : 0 }}
                transition={{ duration: 0.35, delay: inView ? 0.2 + i * 0.08 : 0, type: 'spring', stiffness: 220, damping: 18 }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                <circle cx={node.x} cy={node.y} r={R} fill={fill} stroke={stroke} strokeWidth="2" />
                <text
                  x={node.x} y={node.sublabel ? node.y - 4 : node.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={text}
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="ui-monospace,monospace"
                >
                  {node.label}
                </text>
                {node.sublabel && (
                  <text
                    x={node.x} y={node.y + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={text}
                    fontSize="8"
                    fontFamily="ui-monospace,monospace"
                    opacity={0.75}
                  >
                    {node.sublabel}
                  </text>
                )}
              </motion.g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
