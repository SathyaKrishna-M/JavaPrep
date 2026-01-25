'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiGlobe, FiServer, FiLock, FiActivity, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi'

const content = {
    title: 'Internet & Web Concepts',
    explanationSections: [
        {
            title: '1️⃣ Internet vs The Web',
            icon: <FiGlobe className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        They are NOT the same thing.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>The Internet:</strong> The massive physical network of cables, routers, and satellites connecting computers globally. (Infrastructure).</li>
                        <li><strong>The Web (WWW):</strong> A service that runs ON the internet. It allows us to view documents (pages) connected by hyperlinks. (Software).</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '2️⃣ How Websites Work (Request Flow)',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        What happens when you type <code>google.com</code>?
                    </p>
                    <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-mono">
                            {/* Client */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/50">
                                    <FiActivity className="w-8 h-8" />
                                </div>
                                <span className="text-gray-400">Browser (Client)</span>
                            </div>

                            {/* Arrows */}
                            <div className="flex-1 flex flex-col items-center gap-2">
                                <div className="flex items-center gap-2 text-xs text-orange-400">
                                    <span>1. DNS Lookup</span>
                                    <span className="h-px w-10 bg-orange-400/50"></span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-cyan-400">
                                    <span className="h-px w-16 bg-cyan-400/50 animate-pulse"></span>
                                    <span>2. Request</span>
                                    <FiCheckCircle className="w-3 h-3" />
                                </div>
                                <div className="flex items-center gap-2 text-xs text-green-400">
                                    <FiCheckCircle className="w-3 h-3" />
                                    <span>3. Response</span>
                                    <span className="h-px w-16 bg-green-400/50 animate-pulse"></span>
                                </div>
                            </div>

                            {/* Server */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-3 bg-green-500/20 text-green-400 rounded-lg border border-green-500/50">
                                    <FiServer className="w-8 h-8" />
                                </div>
                                <span className="text-gray-400">Server</span>
                            </div>
                        </div>
                        <div className="mt-6 text-center text-xs text-gray-500">
                            4. Browser receives HTML/CSS/JS and renders the page.
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Client vs Server',
            icon: <FiServer className="w-6 h-6" />,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-blue-500">
                        <h5 className="font-bold text-blue-400 mb-2">Client (You)</h5>
                        <p className="text-xs text-gray-400">The browser (Chrome, Edge). It *requests* information and displays it.</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-green-500">
                        <h5 className="font-bold text-green-400 mb-2">Server (The Provider)</h5>
                        <p className="text-xs text-gray-400">A powerful computer that *stores* website files and sends them when asked.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ HTTP & HTTPS',
            icon: <FiLock className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        **HTTP (HyperText Transfer Protocol)** is the language browsers and servers speak.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>HTTP:</strong> Unsecured. Messages are sent as plain text. Anyone can spy on them.</li>
                        <li><strong>HTTPS:</strong> Secured (Encrypted). Uses SSL/TLS. Essential for banking, passwords, and privacy.</li>
                    </ul>
                    <div className="bg-slate-800 p-3 rounded text-xs mt-2">
                        <strong>Methods:</strong><br />
                        <span className="text-blue-300">GET</span>: Ask for data (viewing a page).<br />
                        <span className="text-green-300">POST</span>: Send data (submitting a login form).
                    </div>
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
                            <span><strong>Stateless</strong>: HTTP doesn't remember you. Each request is new. That's why we need Cookies to stay logged in.</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is the role of DNS?",
            solution: "It translates human-readable domain names (example.com) into machine-readable IP addresses (192.0.2.1).",
        },
        {
            question: "Why should you never enter a credit card on an HTTP site?",
            solution: "Because the data is sent in plain text and can be intercepted by hackers on the network.",
        },
    ],
    exampleProblems: [],
}

export default function InternetWebConceptsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
