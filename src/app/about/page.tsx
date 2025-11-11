'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FiCode, FiEye, FiBook, FiHeart } from 'react-icons/fi'

export default function AboutPage() {
  const features = [
    {
      icon: <FiBook className="w-8 h-8" />,
      title: 'Learn Concepts',
      description: 'Comprehensive explanations of Java concepts with clear examples',
    },
    {
      icon: <FiCode className="w-8 h-8" />,
      title: 'Practice Coding',
      description: 'Hands-on practice with real coding examples and exercises',
    },
    {
      icon: <FiEye className="w-8 h-8" />,
      title: 'Visualize Execution',
      description: 'See code execution step-by-step with dry run visualization',
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: 'Student-Friendly',
      description: 'Designed by students, for students - making Java learning easy',
    },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            About BabuHub
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            An interactive, visual, and educational platform designed to help students master Java programming for exams
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card text-center"
            >
              <div className="text-blue-400 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card max-w-4xl mx-auto mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            BabuHub was created with the vision of making Java programming accessible and understandable for all students. We believe that learning programming should be interactive, visual, and engaging.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Our platform combines clear explanations, practical examples, and innovative visualization tools to help you understand not just what the code does, but how it executes step-by-step.
          </p>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-card max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 glass rounded-lg">
              <div className="font-semibold mb-2">Next.js</div>
              <div className="text-sm text-gray-400">React Framework</div>
            </div>
            <div className="text-center p-4 glass rounded-lg">
              <div className="font-semibold mb-2">Tailwind CSS</div>
              <div className="text-sm text-gray-400">Styling</div>
            </div>
            <div className="text-center p-4 glass rounded-lg">
              <div className="font-semibold mb-2">Framer Motion</div>
              <div className="text-sm text-gray-400">Animations</div>
            </div>
            <div className="text-center p-4 glass rounded-lg">
              <div className="font-semibold mb-2">TypeScript</div>
              <div className="text-sm text-gray-400">Type Safety</div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  )
}

