'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { dsdTopics } from '@/data/dsd-topics'
import { motion } from 'framer-motion'

export default function DigitalSystemDesignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isSubjectIndex = pathname === '/subjects/digital-system-design'

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12 md:py-16">
        {isSubjectIndex ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-4">{children}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <DSDSidebar />
            </div>
            <div className="lg:col-span-3">{children}</div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}

function DSDSidebar() {
  const pathname = usePathname()

  return (
    <aside className="glass-card h-fit sticky top-24">
      <h2 className="text-xl font-bold mb-4">DSD Topics</h2>
      <nav className="space-y-2">
        {dsdTopics.map((topic, index) => {
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
                className={`block px-4 py-2 rounded-lg transition-colors ${
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
        })}
      </nav>
    </aside>
  )
}

