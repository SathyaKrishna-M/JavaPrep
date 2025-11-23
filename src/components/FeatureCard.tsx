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
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group"
    >
      <div className="text-center">
        {/* Circular Icon with Floating Animation - 20% Larger */}
        <div className="mb-8 flex justify-center">
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            className={`relative w-28 h-28 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} p-[2px]`}
          >
            <div className="w-full h-full rounded-full glass flex items-center justify-center backdrop-blur-xl">
              <div className="relative z-10 [&>svg]:w-12 [&>svg]:h-12 [&>svg]:text-white">
                {icon}
              </div>
            </div>
            {/* Inner Glow */}
            <motion.div
              className={`absolute inset-2 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-20 blur-md`}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Pulsing Glow on Hover */}
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300`}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-3 text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
