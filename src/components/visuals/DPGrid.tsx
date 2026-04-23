'use client'
import { motion } from 'framer-motion'

export type CellColor = 'default' | 'current' | 'highlight' | 'source' | 'result' | 'path' | 'header'

export interface DPCell {
  value: string | number
  color?: CellColor
}

interface DPGridProps {
  data: (DPCell | string | number)[][]
  rowHeaders?: (string | number)[]
  colHeaders?: (string | number)[]
  title?: string
  caption?: string
  className?: string
  compact?: boolean
}

const CELL_CLS: Record<CellColor, string> = {
  default:   'bg-slate-800/80 text-gray-400',
  current:   'bg-cyan-950 text-cyan-300 ring-1 ring-cyan-500',
  highlight: 'bg-amber-950/80 text-amber-300',
  source:    'bg-violet-950/80 text-violet-300',
  result:    'bg-green-950/80 text-green-300 font-bold',
  path:      'bg-blue-950/80 text-blue-300',
  header:    'bg-slate-700/60 text-gray-300 font-semibold',
}

function normalise(cell: DPCell | string | number): DPCell {
  if (typeof cell === 'object' && 'value' in cell) return cell
  return { value: cell as string | number }
}

export default function DPGrid({ data, rowHeaders, colHeaders, title, caption, className = '', compact = false }: DPGridProps) {
  const px = compact ? 'px-2 py-1' : 'px-3 py-1.5'
  const fs = compact ? 'text-xs' : 'text-sm'

  return (
    <div className={`bg-slate-900/60 rounded-xl border border-slate-700/60 p-4 overflow-x-auto ${className}`}>
      {title && <p className="text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">{title}</p>}
      <table className="border-collapse mx-auto">
        {colHeaders && (
          <thead>
            <tr>
              {rowHeaders && <th className={`${px} ${fs} text-gray-600 font-mono`} />}
              {colHeaders.map((h, j) => (
                <th key={j} className={`${px} ${fs} text-violet-400 font-mono font-semibold border-b border-slate-700/70`}>{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {rowHeaders && (
                <td className={`${px} ${fs} text-violet-400 font-mono font-semibold border-r border-slate-700/70 pr-3`}>
                  {rowHeaders[i]}
                </td>
              )}
              {row.map((rawCell, j) => {
                const cell = normalise(rawCell)
                const cls = CELL_CLS[cell.color ?? 'default']
                return (
                  <motion.td
                    key={j}
                    className={`${px} ${fs} text-center font-mono border border-slate-700/50 ${cls}`}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.22,
                      delay: (i * (row.length || 1) + j) * 0.018,
                      type: 'spring',
                      stiffness: 280,
                    }}
                  >
                    {cell.value}
                  </motion.td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && <p className="text-center text-gray-500 text-xs mt-2 font-mono">{caption}</p>}
    </div>
  )
}
