'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiMinimize, FiZap, FiImage, FiPlay, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Performance Optimization',
    explanationSections: [
        {
            title: '1️⃣ Why Speed Matters?',
            icon: <FiZap className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Users leave if a site takes more than 3 seconds to load. Performance is also a Ranking Factor for Google (SEO).
                    </p>
                </div>
            ),
        },
        {
            title: '2️⃣ Key Techniques',
            icon: <FiMinimize className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>Minification:</strong> Removing spaces and comments from code to make files smaller.</li>
                        <li><strong>Lazy Loading:</strong> Loading images only when they scroll into view (saves data).</li>
                        <li><strong>Caching:</strong> Storing files in the browser so they don't need to be downloaded again.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '3️⃣ Image Optimization',
            icon: <FiImage className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Images are usually the heaviest part of a page.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-green-300">image.png (3MB)</span> -&gt; <span className="text-cyan-400">image.webp (50KB)</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Always use specific sizes and modern formats like WebP.</p>
                </div>
            ),
        },
        {
            title: '🚀 Hands-on Mini Example',
            icon: <FiPlay className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Scroll down the gallery to see Lazy Loading in action. Notice how "requests" are made only when the item appears.
                    </p>

                    <a
                        href="/previews/fwd/performance-optimization.html"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-cyan-500/20"
                    >
                        <FiPlay className="w-4 h-4" />
                        ▶ Preview Output
                    </a>
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
                            <span>Use <code>&lt;script defer&gt;</code> instead of putting scripts at the bottom of body. It downloads in parallel but executes last.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>Reduce HTTP requests by bundling CSS/JS files (automatic in frameworks like Next.js).</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is CLS (Cumulative Layout Shift)?",
            solution: "It measures visual stability. If an image loads and pushes text down, that's a bad CLS score. Always set width/height on images to prevent this.",
        },
    ],
    exampleProblems: [],
}

export default function PerformanceOptimizationPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
