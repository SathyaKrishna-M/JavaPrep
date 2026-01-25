'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiHome, FiCloud, FiMapPin, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Web Hosting & Domains',
    explanationSections: [
        {
            title: '1️⃣ The Analogy',
            icon: <FiHome className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Think of a website like a house.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                        {/* Domain */}
                        <div className="bg-slate-800 p-4 rounded-lg border-t-4 border-orange-500 flex flex-col items-center text-center">
                            <div className="text-4xl mb-2">📍</div>
                            <h4 className="font-bold text-orange-400">Domain Name</h4>
                            <p className="text-xs text-gray-400 mt-1">"google.com"</p>
                            <p className="text-sm text-gray-300 mt-2">The Address</p>
                            <p className="text-xs text-gray-500 mt-1">Tells people where to go.</p>
                        </div>

                        {/* Hosting */}
                        <div className="bg-slate-800 p-4 rounded-lg border-t-4 border-green-500 flex flex-col items-center text-center">
                            <div className="text-4xl mb-2">🏞️</div>
                            <h4 className="font-bold text-green-400">Web Hosting</h4>
                            <p className="text-xs text-gray-400 mt-1">The Server</p>
                            <p className="text-sm text-gray-300 mt-2">The Land/Plot</p>
                            <p className="text-xs text-gray-500 mt-1">Where your files live.</p>
                        </div>

                        {/* Files */}
                        <div className="bg-slate-800 p-4 rounded-lg border-t-4 border-blue-500 flex flex-col items-center text-center">
                            <div className="text-4xl mb-2">🏠</div>
                            <h4 className="font-bold text-blue-400">Website Files</h4>
                            <p className="text-xs text-gray-400 mt-1">HTML/CSS/JS</p>
                            <p className="text-sm text-gray-300 mt-2">The House</p>
                            <p className="text-xs text-gray-500 mt-1">The structure itself.</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Types of Hosting',
            icon: <FiCloud className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 rounded border-l-4 border-yellow-500">
                            <h5 className="font-bold text-yellow-400 mb-2">Shared Hosting</h5>
                            <p className="text-xs text-gray-400">Cheap. Many websites live on one server. If one site gets busy, yours might slow down. (Like an apartment).</p>
                        </div>
                        <div className="bg-slate-800 p-4 rounded border-l-4 border-purple-500">
                            <h5 className="font-bold text-purple-400 mb-2">VPS (Virtual Private Server)</h5>
                            <p className="text-xs text-gray-400">More control and power. You have your own dedicated portion of resources. (Like a townhouse).</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Static vs Dynamic Sites',
            icon: <FiMapPin className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>Static:</strong> Fixed HTML files. Everyone sees the same thing. Fast & cheap. (e.g., Portfolio, Landing Page).</li>
                        <li><strong>Dynamic:</strong> Content generated on the fly. Requires a database. (e.g., Facebook, Amazon).</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '🧠 Quick Revision',
            icon: <FiCheckCircle className="w-6 h-6" />,
            content: (
                <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-lg">
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span><strong>GitHub Pages & Netlify</strong> are amazing for hosting static sites for FREE.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>You buy domains from a Registrar (Namecheap, GoDaddy). You buy hosting from a Host (Vercel, AWS). They don't have to be the same company.</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Can I have a website without a domain name?",
            solution: "Yes, you can access it directly via its IP address (e.g., 142.250.190.46), but it's hard to remember.",
        },
    ],
    exampleProblems: [],
}

export default function WebHostingDomainsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
