'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'

export default function MathForAILayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const isSubjectIndex = pathname === '/subjects/mathematics-for-ai'

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
                            <Sidebar />
                        </div>
                        <div className="lg:col-span-3">{children}</div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    )
}
