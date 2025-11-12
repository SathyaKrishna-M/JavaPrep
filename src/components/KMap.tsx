'use client'

import { motion } from 'framer-motion'

interface KMapProps {
  type: '2var' | '3var' | '4var'
  values: number[]
  title?: string
  highlightedGroups?: Array<{
    cells: number[]
    color?: string
  }>
}

export default function KMap({ type, values, title, highlightedGroups = [] }: KMapProps) {
  const cellSize = 60
  const padding = 40
  const labelWidth = 30

  const get2VarMap = () => {
    const width = labelWidth + cellSize * 2 + padding * 2
    const height = labelWidth + cellSize * 2 + padding * 2

    return (
      <svg width={width} height={height} className="overflow-visible">
        {/* Column labels */}
        <text x={labelWidth + cellSize} y={labelWidth - 5} fill="#00b4ff" fontSize="14" fontWeight="bold" textAnchor="middle">{`B'`}</text>
        <text x={labelWidth + cellSize * 2} y={labelWidth - 5} fill="#00b4ff" fontSize="14" fontWeight="bold" textAnchor="middle">B</text>
        
        {/* Row labels */}
        <text x={labelWidth - 10} y={labelWidth + cellSize / 2} fill="#00b4ff" fontSize="14" fontWeight="bold" textAnchor="end">{`A'`}</text>
        <text x={labelWidth - 10} y={labelWidth + cellSize * 1.5} fill="#00b4ff" fontSize="14" fontWeight="bold" textAnchor="end">A</text>

        {/* Grid */}
        <rect x={labelWidth} y={labelWidth} width={cellSize * 2} height={cellSize * 2} fill="none" stroke="#00b4ff" strokeWidth="2" />
        <line x1={labelWidth + cellSize} y1={labelWidth} x2={labelWidth + cellSize} y2={labelWidth + cellSize * 2} stroke="#00b4ff" strokeWidth="1" />
        <line x1={labelWidth} y1={labelWidth + cellSize} x2={labelWidth + cellSize * 2} y2={labelWidth + cellSize} stroke="#00b4ff" strokeWidth="1" />

        {/* Values */}
        {[0, 1, 2, 3].map((i) => {
          const row = Math.floor(i / 2)
          const col = i % 2
          const x = labelWidth + col * cellSize
          const y = labelWidth + row * cellSize
          const isHighlighted = highlightedGroups.some(g => g.cells.includes(i))
          const highlightColor = highlightedGroups.find(g => g.cells.includes(i))?.color || 'rgba(0, 180, 255, 0.3)'

          return (
            <g key={i}>
              {isHighlighted && (
                <rect x={x} y={y} width={cellSize} height={cellSize} fill={highlightColor} />
              )}
              <text
                x={x + cellSize / 2}
                y={y + cellSize / 2 + 5}
                fill={values[i] === -1 ? "#ff6b6b" : "#ffffff"}
                fontSize="18"
                fontWeight="bold"
                textAnchor="middle"
              >
                {values[i] === -1 ? 'X' : (values[i] ?? 0)}
              </text>
              <text
                x={x + cellSize / 2}
                y={y + cellSize - 5}
                fill="#888"
                fontSize="10"
                textAnchor="middle"
              >
                m{i}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  const get3VarMap = () => {
    const width = labelWidth + cellSize * 4 + padding * 2
    const height = labelWidth + cellSize * 2 + padding * 2

    // Gray code ordering: 00, 01, 11, 10
    const colOrder = [0, 1, 3, 2]
    const rowOrder = [0, 1]

    return (
      <svg width={width} height={height} className="overflow-visible">
        {/* Column labels */}
        <text x={labelWidth + cellSize} y={labelWidth - 5} fill="#00b4ff" fontSize="14" fontWeight="bold" textAnchor="middle">{`C'`}</text>
        <text x={labelWidth + cellSize * 2} y={labelWidth - 5} fill="#00b4ff" fontSize="14" fontWeight="bold" textAnchor="middle">C</text>
        <text x={labelWidth + cellSize * 3} y={labelWidth - 5} fill="#00b4ff" fontSize="14" fontWeight="bold" textAnchor="middle">C</text>
        <text x={labelWidth + cellSize * 4} y={labelWidth - 5} fill="#00b4ff" fontSize="14" fontWeight="bold" textAnchor="middle">{`C'`}</text>
        
        {/* Row labels */}
        <text x={labelWidth - 10} y={labelWidth + cellSize / 2} fill="#00b4ff" fontSize="14" fontWeight="bold" textAnchor="end">{`A'B'`}</text>
        <text x={labelWidth - 10} y={labelWidth + cellSize * 1.5} fill="#00b4ff" fontSize="14" fontWeight="bold" textAnchor="end">AB</text>

        {/* Grid */}
        <rect x={labelWidth} y={labelWidth} width={cellSize * 4} height={cellSize * 2} fill="none" stroke="#00b4ff" strokeWidth="2" />
        {[1, 2, 3].map(i => (
          <line key={i} x1={labelWidth + cellSize * i} y1={labelWidth} x2={labelWidth + cellSize * i} y2={labelWidth + cellSize * 2} stroke="#00b4ff" strokeWidth="1" />
        ))}
        <line x1={labelWidth} y1={labelWidth + cellSize} x2={labelWidth + cellSize * 4} y2={labelWidth + cellSize} stroke="#00b4ff" strokeWidth="1" />

        {/* Values - Gray code order */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const row = Math.floor(i / 4)
          const col = colOrder[i % 4]
          const x = labelWidth + (col % 4) * cellSize
          const y = labelWidth + row * cellSize
          const isHighlighted = highlightedGroups.some(g => g.cells.includes(i))
          const highlightColor = highlightedGroups.find(g => g.cells.includes(i))?.color || 'rgba(0, 180, 255, 0.3)'

          return (
            <g key={i}>
              {isHighlighted && (
                <rect x={x} y={y} width={cellSize} height={cellSize} fill={highlightColor} />
              )}
              <text
                x={x + cellSize / 2}
                y={y + cellSize / 2 + 5}
                fill={values[i] === -1 ? "#ff6b6b" : "#ffffff"}
                fontSize="18"
                fontWeight="bold"
                textAnchor="middle"
              >
                {values[i] === -1 ? 'X' : (values[i] ?? 0)}
              </text>
              <text
                x={x + cellSize / 2}
                y={y + cellSize - 5}
                fill="#888"
                fontSize="10"
                textAnchor="middle"
              >
                m{i}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  const get4VarMap = () => {
    const width = labelWidth + cellSize * 4 + padding * 2
    const height = labelWidth + cellSize * 4 + padding * 2

    const colOrder = [0, 1, 3, 2]
    const rowOrder = [0, 1, 3, 2]

    return (
      <svg width={width} height={height} className="overflow-visible">
        {/* Column labels */}
        <text x={labelWidth + cellSize} y={labelWidth - 5} fill="#00b4ff" fontSize="12" fontWeight="bold" textAnchor="middle">{`C'D'`}</text>
        <text x={labelWidth + cellSize * 2} y={labelWidth - 5} fill="#00b4ff" fontSize="12" fontWeight="bold" textAnchor="middle">{`C'D`}</text>
        <text x={labelWidth + cellSize * 3} y={labelWidth - 5} fill="#00b4ff" fontSize="12" fontWeight="bold" textAnchor="middle">CD</text>
        <text x={labelWidth + cellSize * 4} y={labelWidth - 5} fill="#00b4ff" fontSize="12" fontWeight="bold" textAnchor="middle">{`CD'`}</text>
        
        {/* Row labels */}
        <text x={labelWidth - 10} y={labelWidth + cellSize / 2} fill="#00b4ff" fontSize="12" fontWeight="bold" textAnchor="end">{`A'B'`}</text>
        <text x={labelWidth - 10} y={labelWidth + cellSize * 1.5} fill="#00b4ff" fontSize="12" fontWeight="bold" textAnchor="end">{`A'B`}</text>
        <text x={labelWidth - 10} y={labelWidth + cellSize * 2.5} fill="#00b4ff" fontSize="12" fontWeight="bold" textAnchor="end">AB</text>
        <text x={labelWidth - 10} y={labelWidth + cellSize * 3.5} fill="#00b4ff" fontSize="12" fontWeight="bold" textAnchor="end">{`AB'`}</text>

        {/* Grid */}
        <rect x={labelWidth} y={labelWidth} width={cellSize * 4} height={cellSize * 4} fill="none" stroke="#00b4ff" strokeWidth="2" />
        {[1, 2, 3].map(i => (
          <line key={i} x1={labelWidth + cellSize * i} y1={labelWidth} x2={labelWidth + cellSize * i} y2={labelWidth + cellSize * 4} stroke="#00b4ff" strokeWidth="1" />
        ))}
        {[1, 2, 3].map(i => (
          <line key={i} x1={labelWidth} y1={labelWidth + cellSize * i} x2={labelWidth + cellSize * 4} y2={labelWidth + cellSize * i} stroke="#00b4ff" strokeWidth="1" />
        ))}

        {/* Values */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
          const row = rowOrder[Math.floor(i / 4)]
          const col = colOrder[i % 4]
          const x = labelWidth + col * cellSize
          const y = labelWidth + row * cellSize
          const isHighlighted = highlightedGroups.some(g => g.cells.includes(i))
          const highlightColor = highlightedGroups.find(g => g.cells.includes(i))?.color || 'rgba(0, 180, 255, 0.3)'

          return (
            <g key={i}>
              {isHighlighted && (
                <rect x={x} y={y} width={cellSize} height={cellSize} fill={highlightColor} />
              )}
              <text
                x={x + cellSize / 2}
                y={y + cellSize / 2 + 5}
                fill={values[i] === -1 ? "#ff6b6b" : "#ffffff"}
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                {values[i] === -1 ? 'X' : (values[i] ?? 0)}
              </text>
              <text
                x={x + cellSize / 2}
                y={y + cellSize - 5}
                fill="#888"
                fontSize="9"
                textAnchor="middle"
              >
                m{i}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  const renderMap = () => {
    switch (type) {
      case '2var':
        return get2VarMap()
      case '3var':
        return get3VarMap()
      case '4var':
        return get4VarMap()
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="my-6 flex flex-col items-center"
    >
      <div className="glass-card p-6 rounded-xl w-full max-w-4xl">
        {renderMap()}
        {title && (
          <p className="text-center text-cyan-400 text-sm mt-4 font-semibold">{title}</p>
        )}
      </div>
    </motion.div>
  )
}

