'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import SearchDropdown from './SearchDropdown'
import { FiMenu, FiX, FiSearch, FiLogOut, FiUser } from 'react-icons/fi'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { currentUser, logout } = useAuth()

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
      if (e.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false)
        if (isProfileOpen) setIsProfileOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, isProfileOpen])

  const handleLogout = async () => {
    try {
      await logout()
      setIsProfileOpen(false)
      router.push('/')
    } catch (error) {
      console.error('Failed to logout', error)
    }
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/visualizer', label: 'Visualizer' },
    { href: '/about', label: 'About' },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <div
        className={`pointer-events-auto w-full max-w-7xl rounded-full transition-all duration-500 ${isScrolled
          ? 'glass shadow-glow-blue py-2 px-6'
          : 'glass py-3 px-8 bg-white/5'
          }`}
      >
        <div className="flex items-center justify-between">
          {/* Left Side: Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src="/logo.svg"
                alt="BabuHub Logo"
                width={40}
                height={40}
                className="h-8 w-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                priority
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-300 via-blue-100 to-white bg-clip-text text-transparent hidden sm:block tracking-wide">
              BabuHub
            </span>
          </Link>

          {/* Center Search Bar - Floating Pill */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="relative px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-3 text-gray-400 hover:text-white group w-[300px]"
              title="Search"
            >
              <FiSearch className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
              <span className="text-sm font-medium">Search topics...</span>
            </button>
          </div>

          {/* Right Side: Navigation Links & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                      ? 'text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-blue-500/20 border border-blue-400/30 rounded-full -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Auth Section */}
            <div className="pl-4 border-l border-white/10">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[1px] shadow-lg group-hover:shadow-blue-500/30 transition-all">
                      <div className="w-full h-full rounded-full bg-[#0d1117] flex items-center justify-center overflow-hidden">
                        {currentUser.photoURL ? (
                          <Image
                            src={currentUser.photoURL}
                            alt="Profile"
                            width={36}
                            height={36}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-bold text-white">
                            {currentUser.email?.[0].toUpperCase() || 'U'}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-48 glass-card p-2 rounded-xl border border-white/10 shadow-xl origin-top-right overflow-hidden"
                      >
                        <div className="px-3 py-2 border-b border-white/5 mb-1">
                          <p className="text-sm text-white font-medium truncate">{currentUser.displayName || 'User'}</p>
                          <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <FiLogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
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
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-2 space-y-1 border-t border-white/10">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl transition-all ${isActive
                        ? 'bg-blue-500/20 text-blue-200 font-medium border border-blue-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}

                {/* Mobile Auth */}
                <div className="pt-2 mt-2 border-t border-white/10">
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[1px]">
                          <div className="w-full h-full rounded-full bg-[#0d1117] flex items-center justify-center overflow-hidden">
                            {currentUser.photoURL ? (
                              <Image
                                src={currentUser.photoURL}
                                alt="Profile"
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-bold text-white">
                                {currentUser.email?.[0].toUpperCase() || 'U'}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white font-medium truncate">{currentUser.displayName || 'User'}</p>
                          <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsMobileMenuOpen(false)
                        }}
                        className="w-full text-left px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-xl transition-colors flex items-center gap-2"
                      >
                        <FiLogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-blue-300 hover:bg-blue-500/10 rounded-xl transition-colors flex items-center gap-2"
                    >
                      <FiUser className="w-4 h-4" />
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Dropdown */}
      <SearchDropdown
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </motion.nav>
  )
}
