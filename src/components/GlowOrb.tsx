'use client'

import { motion } from 'framer-motion'

interface GlowOrbProps {
  position: 'left' | 'right'
  color: string
  delay?: number
}

export default function GlowOrb({ position, color, delay = 0 }: GlowOrbProps) {
  const positionClasses = position === 'left' 
    ? 'left-0 top-1/2 -translate-y-1/2' 
    : 'right-0 top-1/2 -translate-y-1/2'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.1, 1],
        x: position === 'left' ? [0, -20, 0] : [0, 20, 0],
        y: [0, -30, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      className={`absolute ${positionClasses} w-64 h-64 rounded-full blur-3xl pointer-events-none z-0`}
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  )
}

