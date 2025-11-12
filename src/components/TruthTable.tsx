'use client'

import { motion } from 'framer-motion'

interface TruthTableProps {
  headers: string[]
  rows: (string | number)[][]
  title?: string
}

export default function TruthTable({ headers, rows, title }: TruthTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-6 mb-6"
    >
      {title && (
        <h4 className="text-lg font-semibold text-cyan-400 mb-3">{title}</h4>
      )}
      <div className="overflow-x-auto glass-card p-4 rounded-xl">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-cyan-900/40 border-b-2 border-cyan-500/50">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-cyan-200 font-semibold text-center border-r border-cyan-700/50 last:border-r-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + rowIndex * 0.05 }}
                className="border-b border-cyan-800/30 hover:bg-cyan-800/20 transition-colors"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-3 text-white text-center border-r border-cyan-700/30 last:border-r-0 font-mono"
                  >
                    {cell}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

