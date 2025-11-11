'use client'

import { useTheme } from './ThemeProvider'
import { FiSun, FiMoon } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="glass p-3 rounded-lg hover:bg-blue-500/20 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <FiSun className="w-5 h-5 text-yellow-400" />
      ) : (
        <FiMoon className="w-5 h-5 text-blue-400" />
      )}
    </motion.button>
  )
}

