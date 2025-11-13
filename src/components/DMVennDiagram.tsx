'use client'

import { motion } from 'framer-motion'

interface VennDiagramProps {
  sets: Array<{
    label: string
    color: string
  }>
  regions?: Array<{
    label: string
    sets: string[]
    color?: string
  }>
  width?: number
  height?: number
}

export default function DMVennDiagram({ 
  sets, 
  regions = [], 
  width = 400, 
  height = 300 
}: VennDiagramProps) {
  const numSets = sets.length

  if (numSets === 2) {
    return <TwoSetVenn sets={sets} regions={regions} width={width} height={height} />
  } else if (numSets === 3) {
    return <ThreeSetVenn sets={sets} regions={regions} width={width} height={height} />
  }

  return (
    <div className="glass-card p-4">
      <p className="text-gray-400">Venn diagram for {numSets} sets not yet implemented</p>
    </div>
  )
}

function TwoSetVenn({ sets, regions, width = 400, height = 300 }: VennDiagramProps) {
  const centerX = width / 2
  const centerY = height / 2
  const radius = 80
  const offset = 40

  const circle1 = { cx: centerX - offset, cy: centerY, r: radius }
  const circle2 = { cx: centerX + offset, cy: centerY, r: radius }

  const getRegionColor = (setLabels: string[]) => {
    if (setLabels.length === 0) return 'rgba(100, 100, 100, 0.2)'
    if (!regions) return 'rgba(59, 130, 246, 0.2)'
    const region = regions.find(r => 
      r.sets.length === setLabels.length && 
      r.sets.every(s => setLabels.includes(s))
    )
    return region?.color || 'rgba(59, 130, 246, 0.2)'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      <svg width={width} height={height} className="overflow-visible">
        {/* Intersection region */}
        <clipPath id="clip-intersection">
          <circle cx={circle1.cx} cy={circle1.cy} r={circle1.r} />
        </clipPath>
        <circle
          cx={circle2.cx}
          cy={circle2.cy}
          r={circle2.r}
          fill={getRegionColor([sets[0].label, sets[1].label])}
          clipPath="url(#clip-intersection)"
          className="transition-all duration-300"
        />

        {/* Circle 1 */}
        <circle
          cx={circle1.cx}
          cy={circle1.cy}
          r={circle1.r}
          fill={getRegionColor([sets[0].label])}
          stroke={sets[0].color || '#3b82f6'}
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Circle 2 */}
        <circle
          cx={circle2.cx}
          cy={circle2.cy}
          r={circle2.r}
          fill={getRegionColor([sets[1].label])}
          stroke={sets[1].color || '#10b981'}
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Labels */}
        <text
          x={circle1.cx - 60}
          y={circle1.cy - 100}
          fill={sets[0].color || '#3b82f6'}
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
        >
          {sets[0].label}
        </text>
        <text
          x={circle2.cx + 60}
          y={circle2.cy - 100}
          fill={sets[1].color || '#10b981'}
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
        >
          {sets[1].label}
        </text>

        {/* Region labels */}
        {regions && regions.map((region, idx) => {
          let x = centerX
          let y = centerY
          if (region.sets.length === 1) {
            if (region.sets[0] === sets[0].label) {
              x = circle1.cx - 50
            } else {
              x = circle2.cx + 50
            }
          }
          return (
            <text
              key={idx}
              x={x}
              y={y}
              fill="white"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              className="pointer-events-none"
            >
              {region.label}
            </text>
          )
        })}
      </svg>
    </motion.div>
  )
}

function ThreeSetVenn({ sets, regions, width = 400, height = 300 }: VennDiagramProps) {
  const centerX = width / 2
  const centerY = height / 2
  const radius = 70
  const offset = 50

  const circle1 = { cx: centerX, cy: centerY - offset, r: radius }
  const circle2 = { cx: centerX - offset * 0.866, cy: centerY + offset * 0.5, r: radius }
  const circle3 = { cx: centerX + offset * 0.866, cy: centerY + offset * 0.5, r: radius }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      <svg width={width} height={height} className="overflow-visible">
        {/* Circle 1 */}
        <circle
          cx={circle1.cx}
          cy={circle1.cy}
          r={circle1.r}
          fill={sets[0].color || '#3b82f6'}
          fillOpacity="0.3"
          stroke={sets[0].color || '#3b82f6'}
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Circle 2 */}
        <circle
          cx={circle2.cx}
          cy={circle2.cy}
          r={circle2.r}
          fill={sets[1].color || '#10b981'}
          fillOpacity="0.3"
          stroke={sets[1].color || '#10b981'}
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Circle 3 */}
        <circle
          cx={circle3.cx}
          cy={circle3.cy}
          r={circle3.r}
          fill={sets[2].color || '#f59e0b'}
          fillOpacity="0.3"
          stroke={sets[2].color || '#f59e0b'}
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Labels */}
        <text
          x={circle1.cx}
          y={circle1.cy - 90}
          fill={sets[0].color || '#3b82f6'}
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
        >
          {sets[0].label}
        </text>
        <text
          x={circle2.cx - 70}
          y={circle2.cy + 20}
          fill={sets[1].color || '#10b981'}
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
        >
          {sets[1].label}
        </text>
        <text
          x={circle3.cx + 70}
          y={circle3.cy + 20}
          fill={sets[2].color || '#f59e0b'}
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
        >
          {sets[2].label}
        </text>
      </svg>
    </motion.div>
  )
}

