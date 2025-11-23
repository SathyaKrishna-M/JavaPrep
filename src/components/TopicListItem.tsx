'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

interface TopicListItemProps {
  topic: {
    id: string
    title: string
    description: string
    icon: string
    href: string
    co?: string
  }
  index?: number
}

export default function TopicListItem({ topic, index = 0 }: TopicListItemProps) {
  // Get gradient colors based on CO level
  const getGradientColors = () => {
    const co = topic.co
    if (!co) return 'from-blue-500/20 to-cyan-500/20'
    
    // Handle both 'CO1' and 'CO-1' formats
    const coNum = co.replace('CO-', '').replace('CO', '')
    
    switch (coNum) {
      case '1':
        return 'from-blue-500/20 to-cyan-500/20'
      case '2':
        return 'from-purple-500/20 to-pink-500/20'
      case '3':
        return 'from-cyan-500/20 to-blue-500/20'
      case '4':
        return 'from-indigo-500/20 to-purple-500/20'
      case '5':
        return 'from-violet-500/20 to-purple-500/20'
      case '6':
        return 'from-fuchsia-500/20 to-pink-500/20'
      default:
        return 'from-blue-500/20 to-cyan-500/20'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
    >
      <Link href={topic.href}>
        <motion.div
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.998 }}
          className="group relative w-full px-4 py-3 md:px-5 md:py-3.5 rounded-lg bg-white/[0.03] backdrop-blur-sm border border-white/5 hover:border-white/15 hover:bg-white/[0.08] transition-all duration-200 flex items-center gap-4 cursor-pointer"
        >
          {/* Icon with gradient background */}
          <div className="relative flex-shrink-0">
            <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColors()} rounded-lg blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-200`} />
            <div className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-lg md:text-xl bg-black/10 rounded-md backdrop-blur-sm group-hover:bg-black/20 transition-all duration-200">
              {topic.icon}
            </div>
          </div>

          {/* Title and Description */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm md:text-base font-medium text-white/90 mb-0.5 group-hover:text-white transition-colors duration-200 truncate">
              {topic.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-200 line-clamp-1">
              {topic.description}
            </p>
          </div>

          {/* Arrow */}
          <motion.div
            className="flex-shrink-0 text-gray-500 group-hover:text-blue-400 transition-colors duration-200"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <FiArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </motion.div>

          {/* Subtle hover glow effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/3 group-hover:via-purple-500/3 group-hover:to-cyan-500/3 transition-all duration-200 pointer-events-none" />
        </motion.div>
      </Link>
    </motion.div>
  )
}

