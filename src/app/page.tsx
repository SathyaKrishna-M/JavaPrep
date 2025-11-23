'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import SubjectCard from '@/components/SubjectCard'
import FeatureCard from '@/components/FeatureCard'
import { FaJava } from 'react-icons/fa'
import { FiCpu, FiLayers, FiBook, FiCode, FiEye } from 'react-icons/fi'

const subjects = [
  {
    id: 'java',
    title: 'Java Programming',
    description: 'Master Java programming with interactive examples, visualizations, and practice exercises designed for exam preparation.',
    icon: <FaJava className="w-12 h-12" />,
    href: '/subjects/java',
    gradientFrom: 'from-orange-400',
    gradientTo: 'to-orange-600',
  },
  {
    id: 'digital-system-design',
    title: 'Digital System Design',
    description: 'Learn digital logic design, circuit optimization, and programmable devices with visual flowcharts and interactive diagrams.',
    icon: <FiCpu className="w-12 h-12" />,
    href: '/subjects/digital-system-design',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-cyan-600',
  },
  {
    id: 'discrete-mathematics',
    title: 'Discrete Mathematics',
    description: 'Master sets, relations, functions, lattices, and discrete structures with interactive diagrams and step-by-step examples.',
    icon: <FiLayers className="w-12 h-12" />,
    href: '/subjects/discrete-mathematics',
    gradientFrom: 'from-purple-400',
    gradientTo: 'to-pink-600',
  },
]

const features = [
  {
    icon: <FiBook className="w-8 h-8" />,
    title: 'Read Concepts',
    description: 'Learn with clear, comprehensive explanations and visual aids',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-cyan-500',
  },
  {
    icon: <FiCode className="w-8 h-8" />,
    title: 'Practice Examples',
    description: 'Practice with real coding examples and interactive exercises',
    gradientFrom: 'from-purple-400',
    gradientTo: 'to-pink-500',
  },
  {
    icon: <FiEye className="w-8 h-8" />,
    title: 'Visualize Dry Runs',
    description: 'See code execution step-by-step with interactive visualizations',
    gradientFrom: 'from-cyan-400',
    gradientTo: 'to-blue-500',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Subjects Section */}
      <section className="relative py-24 px-4">
        {/* Section Divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Explore Subjects
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose a subject to start your learning journey
            </p>
          </motion.div>

          {/* Subject Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject, index) => (
              <SubjectCard
                key={subject.id}
                title={subject.title}
                description={subject.description}
                icon={subject.icon}
                href={subject.href}
                gradientFrom={subject.gradientFrom}
                gradientTo={subject.gradientTo}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4">
        {/* Section Divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Why BabuHub?
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to master programming and digital design
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradientFrom={feature.gradientFrom}
                gradientTo={feature.gradientTo}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
