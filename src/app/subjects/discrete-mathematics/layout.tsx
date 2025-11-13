'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { co1Topics, co2Topics } from '@/data/dm-topics'
import { motion } from 'framer-motion'

export default function DiscreteMathematicsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isSubjectIndex = pathname === '/subjects/discrete-mathematics'

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        {isSubjectIndex ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-4">{children}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <DMSidebar />
            </div>
            <div className="lg:col-span-3">{children}</div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}

function DMSidebar() {
  const pathname = usePathname()

  const renderTopicLink = (topic: typeof co1Topics[0], index: number) => {
    const isActive = pathname === topic.href
    return (
      <motion.div
        key={topic.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Link
          href={topic.href}
          className={`block px-4 py-2 rounded-lg transition-colors text-sm ${
            isActive
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-gray-300 hover:text-white hover:bg-blue-500/20'
          }`}
        >
          <span className="mr-2">{topic.icon}</span>
          {topic.title}
        </Link>
      </motion.div>
    )
  }

  return (
    <aside className="glass-card h-fit sticky top-24">
      <h2 className="text-xl font-bold mb-4">Discrete Mathematics</h2>
      <nav className="space-y-4">
        {/* CO-1 Section */}
        <div>
          <h3 className="text-sm font-semibold text-purple-400 mb-2 px-2">
            CO-1 — Fundamentals
          </h3>
          <div className="space-y-1">
            {co1Topics.map((topic, index) => renderTopicLink(topic, index))}
          </div>
        </div>

        {/* CO-2 Section */}
        <div>
          <h3 className="text-sm font-semibold text-cyan-400 mb-2 px-2">
            CO-2 — Logic & Proof
          </h3>
          <div className="space-y-1">
            {co2Topics.map((topic, index) => renderTopicLink(topic, co1Topics.length + index))}
          </div>
        </div>
      </nav>
    </aside>
  )
}

