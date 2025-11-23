'use client'

import { motion } from 'framer-motion'
import { FiHeart, FiUsers } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="relative mt-24">
      {/* Gradient Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="text-gray-500/70 text-sm flex items-center justify-center gap-3">
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FiUsers className="w-4 h-4 text-gray-400" />
            </motion.span>
            <span>Made by Students for Students</span>
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              className="relative inline-block"
            >
              <motion.span
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(239, 68, 68, 0.3)',
                    '0 0 20px rgba(239, 68, 68, 0.5)',
                    '0 0 10px rgba(239, 68, 68, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full"
              />
              <FiHeart className="text-red-500/70 relative z-10" />
            </motion.span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
