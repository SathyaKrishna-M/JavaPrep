/**
 * Static Initialization Panel Component
 * 
 * Displays static initializer execution sequence.
 * Milestone D: Static initialization tracking.
 */

'use client'

import { motion } from 'framer-motion'
import { StaticInitInfo } from '@/visualizer/core/tracking/Snapshot'
import { FiPackage, FiCheck, FiLoader } from 'react-icons/fi'

interface StaticInitPanelProps {
  staticInits?: StaticInitInfo[]
}

export default function StaticInitPanel({ staticInits = [] }: StaticInitPanelProps) {
  if (staticInits.length === 0) {
    return (
      <div className="h-full flex flex-col glass-card rounded-2xl border border-white/10 shadow-xl p-6">
        <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-400">
          <FiPackage className="w-5 h-5" />
          Static Initialization
        </h4>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
            <FiPackage className="w-8 h-8 text-indigo-400/50" />
          </div>
          <p className="text-gray-500 text-sm italic">No static initializers</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col glass-card rounded-2xl border border-white/10 shadow-xl p-6">
      <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-400">
        <FiPackage className="w-5 h-5" />
        Static Initialization
        <span className="text-sm text-gray-500 font-normal">({staticInits.length})</span>
      </h4>
      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
        {staticInits.map((init, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, x: 4 }}
            className={`p-4 rounded-xl border transition-all duration-300 ${
              init.status === 'completed'
                ? 'bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border-indigo-500/30'
                : 'bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border-indigo-500/50 shadow-lg shadow-indigo-500/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {init.status === 'completed' ? (
                  <FiCheck className="w-4 h-4 text-green-400" />
                ) : (
                  <FiLoader className="w-4 h-4 text-indigo-400 animate-spin" />
                )}
                <span className="font-semibold text-indigo-400">{init.className}</span>
              </div>
              <span className="text-xs text-gray-500">Step {init.stepIndex}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1 capitalize">{init.status}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

