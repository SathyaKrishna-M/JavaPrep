'use client'
import { motion } from 'framer-motion'

export type BarColor = 'default' | 'highlight' | 'sorted' | 'pivot' | 'compare' | 'swap' | 'bucket'

export interface Bar {
  value: number
  label?: string
  color?: BarColor
  index?: number
}

interface ArrayBarsProps {
  bars: Bar[]
  title?: string
  maxValue?: number
  showIndices?: boolean
  barMaxHeight?: number
  className?: string
  caption?: string
}

const BAR_BG: Record<BarColor, string> = {
  default:   'bg-slate-600',
  highlight: 'bg-cyan-500',
  sorted:    'bg-green-500',
  pivot:     'bg-amber-500',
  compare:   'bg-violet-500',
  swap:      'bg-red-500',
  bucket:    'bg-blue-500',
}
const BAR_TEXT: Record<BarColor, string> = {
  default:   'text-slate-400',
  highlight: 'text-cyan-300',
  sorted:    'text-green-300',
  pivot:     'text-amber-300',
  compare:   'text-violet-300',
  swap:      'text-red-300',
  bucket:    'text-blue-300',
}

export default function ArrayBars({ bars, title, maxValue, showIndices = true, barMaxHeight = 140, className = '', caption }: ArrayBarsProps) {
  const max = maxValue ?? Math.max(...bars.map(b => b.value), 1)
  const barW = Math.min(52, Math.max(20, Math.floor(420 / bars.length)))

  return (
    <div className={`bg-slate-900/60 rounded-xl border border-slate-700/60 p-4 ${className}`}>
      {title && <p className="text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">{title}</p>}
      <div className="flex items-end justify-center gap-1.5" style={{ height: barMaxHeight + 40 }}>
        {bars.map((bar, i) => {
          const h = Math.max(12, Math.round((bar.value / max) * barMaxHeight))
          const color = bar.color ?? 'default'
          return (
            <div key={i} className="flex flex-col items-center gap-0.5">
              {/* Value label on top */}
              <motion.span
                className={`text-xs font-mono font-bold ${BAR_TEXT[color]}`}
                style={{ fontSize: Math.min(11, barW - 1) }}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                {bar.label ?? bar.value}
              </motion.span>

              {/* Bar */}
              <motion.div
                className={`rounded-t-sm ${BAR_BG[color]} transition-colors duration-300`}
                style={{ width: barW }}
                initial={{ height: 0 }}
                animate={{ height: h }}
                transition={{ duration: 0.45, delay: i * 0.045, ease: [0.34, 1.56, 0.64, 1] }}
              />

              {/* Index */}
              {showIndices && (
                <span className="text-gray-600 font-mono" style={{ fontSize: 9 }}>
                  {bar.index ?? i}
                </span>
              )}
            </div>
          )
        })}
      </div>
      {caption && <p className="text-center text-gray-500 text-xs mt-2 font-mono">{caption}</p>}

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center mt-3">
        {(Object.entries(BAR_TEXT) as [BarColor, string][])
          .filter(([k]) => bars.some(b => (b.color ?? 'default') === k))
          .map(([k, textCls]) => (
            <span key={k} className={`text-xs flex items-center gap-1 ${textCls}`}>
              <span className={`inline-block w-2.5 h-2.5 rounded-sm ${BAR_BG[k]}`} />
              {k}
            </span>
          ))}
      </div>
    </div>
  )
}
