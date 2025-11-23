'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Particles() {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    delay: number
    duration: number
    animateX: number
    animateY: number
  }>>([])

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const generatedParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 10 + Math.random() * 10,
      animateX: Math.random() * 100 - 50,
      animateY: Math.random() * 100 - 50,
    }))
    setParticles(generatedParticles)
  }, [])

  if (particles.length === 0) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.4, 0],
            x: [0, particle.animateX],
            y: [0, particle.animateY],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
          className="absolute w-1 h-1 rounded-full bg-white/30 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
        />
      ))}
    </div>
  )
}

