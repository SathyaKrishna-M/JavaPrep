'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  gradientFrom: string
  gradientTo: string
  delay?: number
}

export default function FeatureCard({
  icon,
  title,
  description,
  gradientFrom,
  gradientTo,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <div className="text-center">
        {/* Circular Icon with Gradient */}
        <div className="mb-6 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} p-0.5`}
          >
            <div className="w-full h-full rounded-full glass flex items-center justify-center backdrop-blur-xl">
              <div className={`text-3xl bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
                {icon}
              </div>
            </div>
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`} />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

