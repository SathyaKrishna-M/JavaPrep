'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  subtitle: string
  id?: string
}

export default function SectionHeader({ title, subtitle, id }: SectionHeaderProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="mb-6 md:mb-8"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-br from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-wide">
        {title}
      </h2>
      <p className="text-neutral-400 text-xs md:text-sm max-w-2xl">
        {subtitle}
      </p>
    </motion.div>
  )
}

