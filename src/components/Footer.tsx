'use client'

import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Made by Students for Students{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <FiHeart className="text-red-500" />
            </motion.span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2024 BabuHub. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

