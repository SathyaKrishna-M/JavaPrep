'use client'

import { motion } from 'framer-motion'

interface FunctionGraphProps {
  type: 'quadratic' | 'floor' | 'ceiling' | 'exponential' | 'boolean'
  width?: number
  height?: number
  domain?: [number, number]
  title?: string
}

export default function FunctionGraph({ 
  type, 
  width = 500, 
  height = 400,
  domain = [-5, 5],
  title 
}: FunctionGraphProps) {
  const padding = 60
  const graphWidth = width - 2 * padding
  const graphHeight = height - 2 * padding

  const scaleX = graphWidth / (domain[1] - domain[0])
  const scaleY = graphHeight / 20 // Assuming range of -10 to 10

  const getY = (x: number): number => {
    switch (type) {
      case 'quadratic':
        return x * x
      case 'floor':
        return Math.floor(x)
      case 'ceiling':
        return Math.ceil(x)
      case 'exponential':
        return Math.pow(2, x)
      case 'boolean':
        return x >= 0 ? 1 : 0
      default:
        return 0
    }
  }

  const points: Array<{ x: number; y: number }> = []
  const step = (domain[1] - domain[0]) / 200

  for (let x = domain[0]; x <= domain[1]; x += step) {
    const y = getY(x)
    points.push({ x, y })
  }

  const toScreenX = (x: number) => padding + (x - domain[0]) * scaleX
  const toScreenY = (y: number) => padding + graphHeight - (y + 10) * scaleY

  const pathData = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toScreenX(p.x)} ${toScreenY(p.y)}`)
    .join(' ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      {title && (
        <h3 className="text-lg font-bold mb-4 text-center text-blue-400">{title}</h3>
      )}
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid lines */}
        {Array.from({ length: 11 }).map((_, i) => {
          const x = domain[0] + (i * (domain[1] - domain[0])) / 10
          const y = -10 + (i * 20) / 10
          return (
            <g key={`grid-${i}`}>
              <line
                x1={toScreenX(x)}
                y1={padding}
                x2={toScreenX(x)}
                y2={padding + graphHeight}
                stroke="rgba(100, 100, 100, 0.3)"
                strokeWidth="1"
              />
              <line
                x1={padding}
                y1={toScreenY(y)}
                x2={padding + graphWidth}
                y2={toScreenY(y)}
                stroke="rgba(100, 100, 100, 0.3)"
                strokeWidth="1"
              />
            </g>
          )
        })}

        {/* Axes */}
        <line
          x1={padding}
          y1={toScreenY(0)}
          x2={padding + graphWidth}
          y2={toScreenY(0)}
          stroke="#3b82f6"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        <line
          x1={toScreenX(0)}
          y1={padding}
          x2={toScreenX(0)}
          y2={padding + graphHeight}
          stroke="#3b82f6"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />

        {/* Arrow markers */}
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

        {/* Function curve */}
        {type === 'floor' || type === 'ceiling' ? (
          // Step function - draw segments
          points.map((p, i) => {
            if (i === 0) return null
            const prev = points[i - 1]
            return (
              <g key={i}>
                <line
                  x1={toScreenX(prev.x)}
                  y1={toScreenY(prev.y)}
                  x2={toScreenX(p.x)}
                  y2={toScreenY(prev.y)}
                  stroke="#10b981"
                  strokeWidth="2"
                />
                <line
                  x1={toScreenX(p.x)}
                  y1={toScreenY(prev.y)}
                  x2={toScreenX(p.x)}
                  y2={toScreenY(p.y)}
                  stroke="#10b981"
                  strokeWidth="2"
                />
              </g>
            )
          })
        ) : (
          <path
            d={pathData}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            className="transition-all duration-300"
          />
        )}

        {/* Axis labels */}
        {Array.from({ length: 11 }).map((_, i) => {
          const x = domain[0] + (i * (domain[1] - domain[0])) / 10
          const y = -10 + (i * 20) / 10
          return (
            <g key={`label-${i}`}>
              <text
                x={toScreenX(x)}
                y={toScreenY(0) + 20}
                fill="#9ca3af"
                fontSize="10"
                textAnchor="middle"
              >
                {x.toFixed(1)}
              </text>
              {Math.abs(y) > 0.1 && (
                <text
                  x={toScreenX(0) - 15}
                  y={toScreenY(y) + 4}
                  fill="#9ca3af"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {y.toFixed(1)}
                </text>
              )}
            </g>
          )
        })}

        {/* Function label */}
        <text
          x={padding + graphWidth - 20}
          y={padding + 20}
          fill="#10b981"
          fontSize="12"
          fontWeight="bold"
        >
          {type === 'quadratic' && 'f(x) = x²'}
          {type === 'floor' && 'f(x) = ⌊x⌋'}
          {type === 'ceiling' && 'f(x) = ⌈x⌉'}
          {type === 'exponential' && 'f(x) = 2ˣ'}
          {type === 'boolean' && 'f(x) = [x ≥ 0]'}
        </text>
      </svg>
    </motion.div>
  )
}

