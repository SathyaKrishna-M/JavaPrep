'use client'

import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="relative mt-32">
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            Made by Students for Students{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <FiHeart className="text-red-500/80" />
            </motion.span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

