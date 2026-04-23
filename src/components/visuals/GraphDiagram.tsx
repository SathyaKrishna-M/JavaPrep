'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export interface GNode {
  id: string
  label: string
  x: number
  y: number
  color?: 'cyan' | 'violet' | 'green' | 'amber' | 'red' | 'blue' | 'slate'
  highlight?: boolean
  visited?: boolean
  distance?: string | number
}

export interface GEdge {
  from: string
  to: string
  weight?: string | number
  directed?: boolean
  highlight?: boolean
  color?: string
}

interface GraphDiagramProps {
  nodes: GNode[]
  edges: GEdge[]
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

function arrowHead(x1: number, y1: number, x2: number, y2: number, R = 20) {
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  if (len === 0) return { tx: x2, ty: y2 }
  return { tx: x2 - (dx / len) * (R + 2), ty: y2 - (dy / len) * (R + 2) }
}

export default function GraphDiagram({ nodes, edges, width = 560, height = 280, title, className = '' }: GraphDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.2 })
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))
  const R = 22

  return (
    <div ref={ref} className={`bg-slate-900/60 rounded-xl border border-slate-700/60 p-4 ${className}`}>
      {title && <p className="text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">{title}</p>}
      <div className="overflow-x-auto flex justify-center">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '100%' }}>
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b" opacity="0.8" />
            </marker>
            <marker id="arrow-gray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#475569" opacity="0.7" />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((edge, i) => {
            const from = nodeMap[edge.from]
            const to   = nodeMap[edge.to]
            if (!from || !to) return null
            const { tx, ty } = edge.directed ? arrowHead(from.x, from.y, to.x, to.y, R) : { tx: to.x, ty: to.y }
            const stroke = edge.highlight ? '#f59e0b' : (edge.color ?? '#334155')
            const markerId = edge.highlight ? 'arrow' : 'arrow-gray'
            return (
              <motion.path
                key={`e${i}`}
                d={`M ${from.x} ${from.y} L ${tx} ${ty}`}
                stroke={stroke}
                strokeWidth={edge.highlight ? 2.5 : 1.5}
                fill="none"
                markerEnd={edge.directed ? `url(#${markerId})` : undefined}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
                transition={{ duration: 0.45, delay: inView ? 0.05 + i * 0.06 : 0 }}
              />
            )
          })}

          {/* Edge weight labels */}
          {edges.map((edge, i) => {
            if (edge.weight === undefined) return null
            const from = nodeMap[edge.from]
            const to   = nodeMap[edge.to]
            if (!from || !to) return null
            const mx = (from.x + to.x) / 2
            const my = (from.y + to.y) / 2
            const dx = to.x - from.x, dy = to.y - from.y
            const len = Math.sqrt(dx * dx + dy * dy) || 1
            const ox = -dy / len * 12, oy = dx / len * 12
            return (
              <motion.g
                key={`ew${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: inView ? 0.5 + i * 0.04 : 0 }}
              >
                <rect x={mx + ox - 9} y={my + oy - 8} width={18} height={14} rx={3} fill="#0f172a" opacity={0.85} />
                <text
                  x={mx + ox} y={my + oy + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={edge.highlight ? '#f59e0b' : '#64748b'}
                  fontSize="11"
                  fontFamily="ui-monospace,monospace"
                  fontWeight="600"
                >
                  {edge.weight}
                </text>
              </motion.g>
            )
          })}

          {/* Nodes */}
          {nodes.map((node, i) => {
            const c      = COLOR[node.color ?? 'cyan']
            const visited = node.visited
            const fill   = node.highlight ? COLOR.amber.fill   : visited ? COLOR.green.fill   : c.fill
            const stroke = node.highlight ? COLOR.amber.stroke : visited ? COLOR.green.stroke : c.stroke
            const text   = node.highlight ? COLOR.amber.text   : visited ? COLOR.green.text   : c.text
            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0 }}
                transition={{ duration: 0.35, delay: inView ? 0.2 + i * 0.08 : 0, type: 'spring', stiffness: 220, damping: 18 }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                <circle cx={node.x} cy={node.y} r={R} fill={fill} stroke={stroke} strokeWidth="2" />
                <text
                  x={node.x} y={node.distance !== undefined ? node.y - 5 : node.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={text}
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="ui-monospace,monospace"
                >
                  {node.label}
                </text>
                {node.distance !== undefined && (
                  <text
                    x={node.x} y={node.y + 9}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={node.highlight ? '#fde68a' : '#f59e0b'}
                    fontSize="9"
                    fontFamily="ui-monospace,monospace"
                    fontWeight="600"
                  >
                    d={node.distance}
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
