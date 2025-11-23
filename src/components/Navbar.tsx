'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import SearchDropdown from './SearchDropdown'
import { FiMenu, FiX, FiChevronDown, FiSearch } from 'react-icons/fi'
import Image from 'next/image'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Escape key to close search
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen])

  const subjects = [
    { href: '/subjects/java', label: 'Java' },
    { href: '/subjects/digital-system-design', label: 'Digital System Design' },
  ]

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/visualizer', label: 'Visualizer' },
    { href: '/about', label: 'About' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass border-b border-white/10 backdrop-blur-xl shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image 
                src="/logo.svg" 
                alt="BabuHub Logo" 
                width={48} 
                height={34}
                className="h-8 md:h-9 w-auto group-hover:opacity-90 transition-opacity drop-shadow-lg"
                priority
              />
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent hidden sm:block">
              BabuHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-blue-400 font-medium'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 glass rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
            
            {/* Subjects Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsSubjectsOpen(true)}
              onMouseLeave={() => setIsSubjectsOpen(false)}
            >
              <button
                className={`relative px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                  pathname.startsWith('/subjects')
                    ? 'text-blue-400 font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Subjects
                <FiChevronDown className={`w-4 h-4 transition-transform ${isSubjectsOpen ? 'rotate-180' : ''}`} />
                {pathname.startsWith('/subjects') && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 glass rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
              
              <AnimatePresence>
                {isSubjectsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 glass-card min-w-[200px] py-2 z-50"
                  >
                    {subjects.map((subject) => {
                      const isActive = pathname.startsWith(subject.href)
                      return (
                        <Link
                          key={subject.href}
                          href={subject.href}
                          className={`block px-4 py-2 transition-colors ${
                            isActive
                              ? 'text-blue-400 font-semibold bg-blue-500/20'
                              : 'text-gray-300 hover:text-white hover:bg-blue-500/10'
                          }`}
                        >
                          {subject.label}
                        </Link>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="relative px-4 py-2 rounded-lg glass hover:bg-white/10 transition-all duration-200 flex items-center gap-2 text-gray-400 hover:text-white border border-white/5"
              title="Search"
            >
              <FiSearch className="w-4 h-4" />
              <span className="hidden lg:inline text-sm">Search</span>
            </button>
            
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="glass p-2 rounded-lg"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="glass p-2 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-2"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-blue-400 font-semibold glass'
                      : 'text-gray-300 hover:text-white hover:glass'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="px-4 py-2">
              <div className="text-gray-400 text-sm font-semibold mb-2">Subjects</div>
              {subjects.map((subject) => {
                const isActive = pathname.startsWith(subject.href)
                return (
                  <Link
                    key={subject.href}
                    href={subject.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'text-blue-400 font-semibold glass'
                        : 'text-gray-300 hover:text-white hover:glass'
                    }`}
                  >
                    {subject.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Search Dropdown */}
      <SearchDropdown
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </motion.nav>
  )
}

