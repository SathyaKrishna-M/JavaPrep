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
      transition={{ duration: 0.5, delay }}
    >
      <Link href={href}>
        <motion.div
          whileHover={{ scale: 1.03, y: -8 }}
          whileTap={{ scale: 0.98 }}
          className="group relative h-full"
        >
          {/* Gradient Border */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-sm`}
          />
          
          {/* Glass Card */}
          <div className="relative h-full p-8 rounded-2xl glass border border-white/10 backdrop-blur-xl group-hover:border-white/20 transition-all duration-300">
            {/* Icon with Glow */}
            <div className="mb-6 flex justify-center">
              <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                <div className="relative flex items-center justify-center [&>svg]:w-12 [&>svg]:h-12">
                  {/* Gradient background for icon */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-lg opacity-30`} />
                  <div className="relative z-10 [&>svg]:fill-current [&>svg]:text-white/90">
                    {icon}
                  </div>
                </div>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
              </div>
            </div>

            {/* Title */}
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
              {title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 mb-6 leading-relaxed">
              {description}
            </p>

            {/* CTA */}
            <div className={`flex items-center gap-2 font-semibold text-sm bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-300`}>
              Explore Topics
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

