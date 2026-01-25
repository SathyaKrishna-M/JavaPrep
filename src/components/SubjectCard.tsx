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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link href={href} className="block h-full">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2 // Randomize phase
          }}
          whileHover={{
            y: -15,
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className="group relative h-full"
        >
          {/* Deep Colored Shadow - Glows on hover */}
          <div className={`absolute inset-4 rounded-3xl bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500 -z-10`} />

          {/* Main Card Container */}
          <div className="relative h-full rounded-3xl p-[1px] overflow-hidden">
            {/* Animated Gradient Border */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-30 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Glass Content */}
            <div className="relative h-full bg-[#0d1117]/80 backdrop-blur-xl rounded-[23px] p-8 flex flex-col border border-white/5 group-hover:border-white/10 transition-colors duration-300">

              {/* Shine Effect Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white to-transparent -skew-x-12 translate-x-[-100%] group-hover:animate-shine pointer-events-none rounded-[23px]" />

              {/* Icon Container - Floating */}
              <div className="mb-8 relative">
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} p-[2px] shadow-lg relative z-10`}
                >
                  <div className="w-full h-full rounded-2xl bg-[#0d1117] flex items-center justify-center relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-20`} />
                    <div className="relative z-10 text-white [&>svg]:w-10 [&>svg]:h-10 [&>svg]:drop-shadow-lg">
                      {icon}
                    </div>
                  </div>
                </motion.div>

                {/* Icon Glow */}
                <div className={`absolute top-0 left-0 w-20 h-20 bg-gradient-to-br ${gradientFrom} ${gradientTo} blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500`} />
              </div>

              {/* Content */}
              <div className="relative z-10 flex-grow">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                  {title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 line-clamp-1">
                  {description}
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between group/btn">
                <span className={`text-sm font-semibold bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent opacity-80 group-hover:opacity-100 transition-opacity`}>
                  Explore Module
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/30 bg-white/5 group-hover:bg-white/10 transition-all duration-300 group-hover:scale-110`}>
                  <FiArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
