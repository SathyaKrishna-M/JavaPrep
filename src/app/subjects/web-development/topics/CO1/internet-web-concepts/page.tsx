'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiGlobe, FiServer, FiLock, FiActivity, FiCheckCircle, FiLayers, FiWifi } from 'react-icons/fi'
import { motion } from 'framer-motion'

// Custom Packet Flow Component
const PacketFlow = () => {
    return (
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 relative overflow-hidden h-40 flex items-center justify-between px-12 md:px-24">
            {/* Background Lines */}
            <div className="absolute inset-0 flex flex-col justify-center opacity-10">
                <div className="w-full h-px bg-white mb-8"></div>
                <div className="w-full h-px bg-white"></div>
            </div>

            {/* Client */}
            <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border-2 border-blue-500 text-2xl shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    💻
                </div>
                <div className="mt-2 text-xs font-bold text-blue-400">YOU</div>
            </div>

            {/* Packets */}
            <div className="flex-1 relative h-full mx-4">
                {/* Request Packet */}
                <motion.div
                    initial={{ x: '0%', opacity: 0 }}
                    animate={{ x: '100%', opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/3 left-0 -translate-y-1/2"
                >
                    <div className="bg-green-500 text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-green-300 whitespace-nowrap">
                        GET /index.html
                    </div>
                </motion.div>

                {/* Response Packet */}
                <motion.div
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: '0%', opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1, ease: "linear" }}
                    className="absolute bottom-1/3 left-0 -translate-y-1/2 w-full"
                >
                    <div className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-orange-300 absolute right-0 whitespace-nowrap">
                        200 OK (Data)
                    </div>
                </motion.div>
            </div>

            {/* Server */}
            <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center border-2 border-purple-500 text-2xl shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    🏢
                </div>
                <div className="mt-2 text-xs font-bold text-purple-400">SERVER</div>
            </div>
        </div>
    )
}

const content = {
    title: 'Internet & Web Concepts',
    explanationSections: [
        {
            title: '1️⃣ Internet vs The Web',
            icon: <FiGlobe className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-xl border border-slate-700">
                        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                            <div className="flex-1 text-center space-y-3 p-4 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-blue-500/30 transition-colors cursor-default group">
                                <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30 text-4xl group-hover:scale-110 transition-transform">
                                    🌍
                                </div>
                                <h4 className="text-xl font-bold text-blue-400">The Internet</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    The physical cables, towers, and hardware connecting the world.
                                    <br />
                                    <span className="text-blue-500/70 italic">"The Highway System"</span>
                                </p>
                            </div>
                            <div className="hidden md:block text-2xl text-gray-600 font-bold">≠</div>
                            <div className="flex-1 text-center space-y-3 p-4 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-green-500/30 transition-colors cursor-default group">
                                <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30 text-4xl group-hover:scale-110 transition-transform">
                                    🕸️
                                </div>
                                <h4 className="text-xl font-bold text-green-400">The Web (WWW)</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    The websites and pages you visit using a browser.
                                    <br />
                                    <span className="text-green-500/70 italic">"The Traffic on the Highway"</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ How Websites Work (Client-Server)',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The web works on a <strong>Request-Response cycle</strong>. It's like ordering food at a restaurant.
                    </p>

                    {/* Animated Packet Flow */}
                    <PacketFlow />

                    <div className="grid grid-cols-2 gap-4 text-xs mt-4">
                        <div className="p-3 bg-blue-900/10 border border-blue-500/20 rounded">
                            <strong className="text-blue-400 block mb-1">1. Request (The Order)</strong>
                            You click a link. Your browser asks the server: "Hey, give me this page!"
                        </div>
                        <div className="p-3 bg-purple-900/10 border border-purple-500/20 rounded">
                            <strong className="text-purple-400 block mb-1">2. Response (The Food)</strong>
                            The server finds the file (HTML/CSS) and sends it back to you.
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ URL Structure',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="bg-black/80 p-6 rounded-xl border border-slate-700 font-mono text-center md:text-left overflow-x-auto shadow-inner">
                        <div className="inline-flex flex-wrap items-center gap-1 text-lg mb-8">
                            <span className="text-orange-400 flex flex-col items-center group relative cursor-help">
                                https://
                                <span className="absolute -bottom-8 w-24 text-center text-[10px] text-orange-200 bg-orange-900/80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Protocol (How?)</span>
                            </span>
                            <span className="text-blue-400 flex flex-col items-center group relative cursor-help">
                                www.google.com
                                <span className="absolute -bottom-8 w-32 text-center text-[10px] text-blue-200 bg-blue-900/80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Domain (Who?)</span>
                            </span>
                            <span className="text-gray-500">/</span>
                            <span className="text-purple-400 flex flex-col items-center group relative cursor-help">
                                search
                                <span className="absolute -bottom-8 w-24 text-center text-[10px] text-purple-200 bg-purple-900/80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Path (Where?)</span>
                            </span>
                            <span className="text-gray-500">?</span>
                            <span className="text-pink-400 flex flex-col items-center group relative cursor-help">
                                q=react
                                <span className="absolute -bottom-8 w-28 text-center text-[10px] text-pink-200 bg-pink-900/80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Query (What?)</span>
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 text-center">Hover over identifying parts to see their purpose.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ HTTP & HTTPS',
            icon: <FiLock className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-lg opacity-80 hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-3 mb-2 opacity-50">
                                <span className="text-2xl">🔓</span>
                                <h5 className="font-bold text-red-400">HTTP</h5>
                            </div>
                            <p className="text-xs text-gray-400 mb-2">Data travels "naked".</p>
                            <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                                <div className="h-full bg-red-500/50 w-full animate-pulse"></div>
                            </div>
                        </div>
                        <div className="bg-green-500/5 border border-green-500/20 p-5 rounded-lg hover:bg-green-500/10 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">🔒</span>
                                <h5 className="font-bold text-green-400">HTTPS (Secure)</h5>
                            </div>
                            <p className="text-xs text-gray-400 mb-2">Data is encrypted (scrambled).</p>
                            <div className="w-full bg-slate-800 h-2 rounded overflow-hidden relative">
                                <div className="h-full bg-green-500 w-full pattern-lines"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is the key difference between the Internet and the World Wide Web?",
            solution: "The Internet is the physical infrastructure (hardware like cables and routers), whereas the World Wide Web is a software service (documents and pages) that runs ON TOP of the internet.",
        },
        {
            question: "Identify the parts of this URL: https://www.example.com/login",
            solution: (
                <ul className="list-disc list-inside space-y-1">
                    <li><span className="text-orange-400">https</span>: Protocol</li>
                    <li><span className="text-blue-400">www.example.com</span>: Domain Name</li>
                    <li><span className="text-purple-400">/login</span>: Path</li>
                </ul>
            )
        },
        {
            question: "Why should you never enter a credit card on an HTTP site?",
            solution: "Because HTTP sends data in plain text. Any hacker on the same network (like public Wi-Fi) can intercept and read your credit card number. HTTPS encrypts this data so it's unreadable to interceptors.",
        }
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
