'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import SubjectCard from '@/components/SubjectCard'
import FeatureCard from '@/components/FeatureCard'
import { FaJava } from 'react-icons/fa'
import { FiCpu, FiLayers, FiBook, FiCode, FiEye, FiActivity } from 'react-icons/fi'

const subjects = [
  {
    id: 'digital-system-design',
    title: 'Digital Design Computer Orientation Architecture',
    description: 'Learn digital logic design, circuit optimization, and programmable devices with visual flowcharts and interactive diagrams.',
    icon: <FiCpu className="w-12 h-12" />,
    href: '/subjects/digital-system-design',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-cyan-600',
  },
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
    icon: <FiBook className="w-12 h-12" />,
    title: 'Read Concepts',
    description: 'Learn with clear, comprehensive explanations and visual aids',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-cyan-500',
  },
  {
    icon: <FiCode className="w-12 h-12" />,
    title: 'Practice Examples',
    description: 'Practice with real coding examples and interactive exercises',
    gradientFrom: 'from-purple-400',
    gradientTo: 'to-pink-500',
  },
  {
    icon: <FiActivity className="w-12 h-12" />,
    title: 'Track Progress',
    description: 'Monitor your learning journey and achieve your goals',
    gradientFrom: 'from-green-400',
    gradientTo: 'to-emerald-500',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />

      {/* Shared Background Layer - Extends across Hero and Subjects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Floating Glow Orbs - Scattered with movement */}
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-3xl opacity-30"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.2, 0.4, 0.3, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            left: '10%',
            top: '20%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-3xl opacity-30"
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -70, 0],
            scale: [1, 0.8, 1.3, 1],
            opacity: [0.25, 0.35, 0.2, 0.25],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          style={{
            right: '15%',
            top: '60%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-25"
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -120, 90, 0],
            scale: [1, 1.1, 0.95, 1],
            opacity: [0.2, 0.3, 0.25, 0.2],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
          style={{
            left: '70%',
            top: '10%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
          }}
        />

        {/* Gradient Background Glow - Scattered with movement */}
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 80, -60, 0],
            y: [0, -100, 70, 0],
            scale: [1, 1.15, 0.9, 1],
            opacity: [0.15, 0.25, 0.2, 0.15],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            top: '15%',
            left: '5%',
          }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -90, 110, 0],
            y: [0, 120, -80, 0],
            scale: [1, 0.85, 1.2, 1],
            opacity: [0.18, 0.22, 0.15, 0.18],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
          style={{
            top: '50%',
            right: '8%',
          }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 120, -90, 0],
            y: [0, -110, 85, 0],
            scale: [1, 1.1, 0.95, 1],
            opacity: [0.2, 0.28, 0.18, 0.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
          style={{
            top: '30%',
            left: '55%',
          }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-pink-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -70, 95, 0],
            y: [0, 100, -65, 0],
            scale: [1, 0.9, 1.15, 1],
            opacity: [0.15, 0.2, 0.12, 0.15],
          }}
          transition={{
            duration: 27,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
          style={{
            bottom: '20%',
            left: '25%',
          }}
        />
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Subjects Section - Seamless transition */}
      <section className="relative py-20 px-4 z-10">
        {/* White Translucent Divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section Header with Enhanced Styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontWeight: 700, letterSpacing: '2px' }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Explore Subjects
              </span>
            </motion.h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose a subject to start your learning journey
            </p>
          </motion.div>

          {/* Subject Cards Grid with Staggered Animation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {subjects.map((subject, index) => (
              <SubjectCard
                key={subject.id}
                title={subject.title}
                description={subject.description}
                icon={subject.icon}
                href={subject.href}
                gradientFrom={subject.gradientFrom}
                gradientTo={subject.gradientTo}
                delay={index * 0.06}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 z-10">
        {/* Subtle Gradient Divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section Header with Enhanced Styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontWeight: 700, letterSpacing: '2px' }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Why BabuHub?
              </span>
            </motion.h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to master programming and digital design
            </p>
          </motion.div>

          {/* Features Grid - More spacing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
