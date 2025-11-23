'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'
import { FiArrowRight } from 'react-icons/fi'

interface SubjectCardProps {
  title: string
  description: string
  icon: ReactNode
  href: string
  gradientFrom: string
  gradientTo: string
  delay?: number
}

export default function SubjectCard({
  title,
  description,
  icon,
  href,
  gradientFrom,
  gradientTo,
  delay = 0,
}: SubjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      <Link href={href}>
        <motion.div
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="group relative h-full"
        >
          {/* Premium Gradient Border with Animated Mask - Brighter */}
          <div className={`relative p-[2px] rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-60 group-hover:opacity-90 transition-opacity duration-300 overflow-hidden`}>
            {/* Rotating Gradient Mask */}
            <motion.div
              className={`absolute inset-0 opacity-0 group-hover:opacity-40`}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                background: `conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.7), rgba(6, 182, 212, 0.7), transparent)`,
              }}
            />
            
            {/* Inner Glass Card - Brighter background */}
            <div className="relative h-full min-h-[400px] flex flex-col p-10 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 group-hover:border-white/30 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/30">
              {/* Gradient overlay for brightness */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-15 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none`} />
              <div className="relative z-10 h-full flex flex-col">
                {/* Icon with Glowing Circle and Hover Animations - Brighter */}
                <div className="mb-6 flex justify-center flex-shrink-0">
                <motion.div
                  whileHover={{ rotate: 6, scale: 1.05 }}
                  className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} p-[2px] shadow-lg`}
                >
                  <div className="w-full h-full rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="relative z-10 [&>svg]:w-12 [&>svg]:h-12 [&>svg]:text-white [&>svg]:drop-shadow-2xl [&>svg]:brightness-110">
                      {icon}
                    </div>
                  </div>
                  {/* Glowing Ring - Brighter */}
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-30 group-hover:opacity-60 blur-xl transition-opacity duration-300`}
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
              </div>

                {/* Title - Bright white text */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg flex-shrink-0">
                  {title}
                </h3>

                {/* Description - Bright white text */}
                <p className="text-white mb-6 leading-relaxed flex-grow drop-shadow-md">
                  {description}
                </p>

                {/* CTA - Bright white text */}
                <div className="flex items-center gap-2 font-semibold text-sm text-white group-hover:gap-3 transition-all duration-300 flex-shrink-0 drop-shadow-md">
                  Explore Topics
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
