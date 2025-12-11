'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Topic } from '@/data/java-topics'

interface EnhancedTopicCardProps {
  topic: Topic
  index?: number
}

export default function EnhancedTopicCard({ topic, index = 0 }: EnhancedTopicCardProps) {
  // Generate gradient colors based on CO or use default
  const getGradientColors = () => {
    switch (topic.co) {
      case 'CO1':
        return 'from-blue-500/60 via-cyan-500/60 to-blue-600/60'
      case 'CO2':
        return 'from-purple-500/60 via-pink-500/60 to-purple-600/60'
      case 'CO3':
        return 'from-cyan-500/60 via-blue-500/60 to-cyan-600/60'
      case 'CO4':
        return 'from-indigo-500/60 via-purple-500/60 to-indigo-600/60'
      case 'CO5':
        return 'from-violet-500/60 via-purple-500/60 to-violet-600/60'
      case 'CO6':
        return 'from-fuchsia-500/60 via-pink-500/60 to-fuchsia-600/60'
      default:
        return 'from-blue-500/60 via-cyan-500/60 to-blue-600/60'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={topic.href}>
        <motion.div
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="relative p-[2px] rounded-2xl bg-gradient-to-br bg-opacity-60 hover:bg-opacity-90 transition-all duration-300 group"
          style={{
            background: `linear-gradient(to bottom right, 
              ${topic.co === 'CO1' ? 'rgba(59, 130, 246, 0.6)' :
                topic.co === 'CO2' ? 'rgba(168, 85, 247, 0.6)' :
                  topic.co === 'CO3' ? 'rgba(6, 182, 212, 0.6)' :
                    topic.co === 'CO4' ? 'rgba(99, 102, 241, 0.6)' :
                      topic.co === 'CO5' ? 'rgba(139, 92, 246, 0.6)' :
                        topic.co === 'CO6' ? 'rgba(217, 70, 239, 0.6)' :
                          'rgba(59, 130, 246, 0.6)'}, 
              ${topic.co === 'CO1' ? 'rgba(37, 99, 235, 0.6)' :
                topic.co === 'CO2' ? 'rgba(147, 51, 234, 0.6)' :
                  topic.co === 'CO3' ? 'rgba(8, 145, 178, 0.6)' :
                    topic.co === 'CO4' ? 'rgba(79, 70, 229, 0.6)' :
                      topic.co === 'CO5' ? 'rgba(124, 58, 237, 0.6)' :
                        topic.co === 'CO6' ? 'rgba(192, 38, 211, 0.6)' :
                          'rgba(37, 99, 235, 0.6)'})`,
          }}
        >
          {/* Inner glass panel */}
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
            {/* Icon with glowing background */}
            <div className="relative mb-4 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative w-16 h-16 flex items-center justify-center text-4xl bg-black/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                {topic.icon}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">
              {topic.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-2">
              {topic.description}
            </p>

            {/* CTA Arrow */}
            <motion.div
              className="flex items-center gap-2 text-blue-400 font-semibold text-sm"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              Learn more
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                →
              </motion.span>
            </motion.div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-300 pointer-events-none" />
          </div>

          {/* Shadow on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
            style={{
              background: `radial-gradient(circle at center, 
                ${topic.co === 'CO1' ? 'rgba(59, 130, 246, 0.2)' :
                  topic.co === 'CO2' ? 'rgba(168, 85, 247, 0.2)' :
                    topic.co === 'CO3' ? 'rgba(6, 182, 212, 0.2)' :
                      topic.co === 'CO4' ? 'rgba(99, 102, 241, 0.2)' :
                        topic.co === 'CO5' ? 'rgba(139, 92, 246, 0.2)' :
                          topic.co === 'CO6' ? 'rgba(217, 70, 239, 0.2)' :
                            'rgba(59, 130, 246, 0.2)'}, 
                transparent 70%)`,
              filter: 'blur(20px)',
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}

