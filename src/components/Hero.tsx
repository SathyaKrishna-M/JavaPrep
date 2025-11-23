'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight, FiPlay, FiChevronDown } from 'react-icons/fi'
import Particles from './Particles'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20 z-10">
      {/* Particle Field - Only in Hero */}
      <Particles />

      {/* Ambient Glow Behind Logo - Moved Higher */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(6, 182, 212, 0.3) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Logo with Ambient Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 flex justify-center relative"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <Image
              src="/logo.svg"
              alt="BabuHub Logo"
              width={400}
              height={280}
              className="h-32 md:h-40 lg:h-48 w-auto drop-shadow-2xl relative z-10"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed"
          style={{ letterSpacing: '2px' }}
        >
          ⚡ Practice. Understand. Master.
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg text-gray-500 mb-10 max-w-xl mx-auto"
        >
          Learn programming and digital design through interactive visualization.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/subjects">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-lg shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 flex items-center gap-2 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10 flex items-center gap-2">
                Start Learning
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>

          <Link href="/visualizer">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group px-8 py-4 rounded-xl glass border border-white/10 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <FiPlay className="w-5 h-5" />
              Visualizer
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ 
            y: [0, 6, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          {/* Glowing Ring - Same size as inner container */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(59, 130, 246, 0.3)',
                '0 0 40px rgba(59, 130, 246, 0.6)',
                '0 0 20px rgba(59, 130, 246, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 w-6 h-12 rounded-full border-2 border-blue-400/50"
          />
          <div className="relative w-6 h-12 rounded-full border-2 border-gray-500 flex flex-col items-center justify-start p-1.5 bg-black/20 backdrop-blur-sm overflow-hidden">
            {/* Blue Dot at Top */}
            <motion.div
              animate={{ 
                y: [0, 24, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: 'easeInOut',
                times: [0, 0.5, 1],
              }}
              className="w-1.5 h-1.5 rounded-full bg-blue-400 mb-1"
            />
            {/* Animated Arrow */}
            <motion.div
              animate={{ 
                opacity: [0.4, 1, 0.4],
                y: [0, 2, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mt-auto"
            >
              <FiChevronDown className="w-3 h-3 text-blue-400" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  )
}
