import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BabuHub - Master Java for Exams',
  description: 'Interactive, Visual, and Easy Java learning platform for students',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/logo.svg',
  },
}

import { AuthProvider } from '@/context/AuthContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script async src="https://cdn.jsdelivr.net/npm/cheerpj@3/dist/cheerpj.js"></script>
      </head>
      <body className={`${inter.className} bg-[#0d1117] text-[#f8fafc] antialiased`}>
        <AuthProvider>
          <div className="animated-bg">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
          </div>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

