'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiSmartphone, FiMonitor, FiVideo, FiPlay } from 'react-icons/fi'

const content = {
    title: 'Responsive Design',
    explanationSections: [
        {
            title: '1️⃣ Viewport Units',
            icon: <FiMonitor className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Relative to browser window size.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><code>100vw</code> = 100% Width.</li>
                        <li><code>100vh</code> = 100% Height.</li>
                    </ul>

                    {/* Visual Diagram Breakdown */}
                    <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 font-mono text-center">
                        <div className="flex items-end gap-2 text-xs justify-center h-24">
                            {/* Mobile */}
                            <div className="w-12 bg-red-500/20 border border-red-500 rounded-t h-1/2 flex items-center justify-center text-red-300 relative group">
                                <span className="absolute -top-6">Mobile</span>
                                <FiSmartphone />
                            </div>
                            {/* Tablet */}
                            <div className="w-16 bg-blue-500/20 border border-blue-500 rounded-t h-3/4 flex items-center justify-center text-blue-300 relative group">
                                <span className="absolute -top-6">Tablet</span>
                                <FiSmartphone className="rotate-90" />
                            </div>
                            {/* Desktop */}
                            <div className="w-24 bg-green-500/20 border border-green-500 rounded-t h-full flex items-center justify-center text-green-300 relative group">
                                <span className="absolute -top-6">Desktop</span>
                                <FiMonitor />
                            </div>
                        </div>
                        <div className="h-px bg-gray-600 w-full mt-2 relative">
                            <div className="absolute top-2 left-[20%] text-xs text-gray-500">0px</div>
                            <div className="absolute top-2 left-[45%] text-xs text-gray-500">768px</div>
                            <div className="absolute top-2 left-[75%] text-xs text-gray-500">1024px</div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Responsive Images & Text',
            icon: <FiVideo className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        img {'{'} max-width: 100%; height: auto; {'}'}<br />
                        h1 {'{'} font-size: clamp(1rem, 5vw, 2.5rem); {'}'}
                    </div>
                </div>
            ),
        },
        {
            title: '🚀 Advanced Example: Auto-Fit Grid',
            icon: <FiPlay className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Layouts that adapt without Media Queries.
                    </p>
                    <a
                        href="/previews/fwd/responsive-card-gallery.html"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-cyan-500/20"
                    >
                        <FiPlay className="w-4 h-4" />
                        ▶ Open Responsive Gallery
                    </a>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Why use REM units?",
            solution: "Respects user font settings. 1rem = 16px usually.",
        },
    ],
    exampleProblems: [],
}

export default function ResponsiveDesignPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
