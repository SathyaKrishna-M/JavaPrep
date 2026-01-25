'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiLayout, FiGrid, FiAlignCenter, FiPlay } from 'react-icons/fi'

const content = {
    title: 'Layout Systems',
    explanationSections: [
        {
            title: '1️⃣ Flexbox vs CSS Grid',
            icon: <FiLayout className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The biggest question in CSS layouts: Which one to use?
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 rounded border-l-4 border-blue-500">
                            <h5 className="font-bold text-blue-400 mb-2">Flexbox (1D)</h5>
                            <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                                <li>Content-driven.</li>
                                <li>Good for: Navbars, Centering.</li>
                            </ul>
                            {/* Flex Visual */}
                            <div className="mt-2 border-2 border-dashed border-blue-500 p-2 flex justify-between rounded bg-blue-500/10 h-10 items-center">
                                <div className="w-6 h-6 bg-blue-500 rounded text-[10px] flex items-center justify-center text-white">1</div>
                                <div className="w-6 h-6 bg-blue-500 rounded text-[10px] flex items-center justify-center text-white">2</div>
                                <div className="w-6 h-6 bg-blue-500 rounded text-[10px] flex items-center justify-center text-white">3</div>
                            </div>
                        </div>
                        <div className="bg-slate-800 p-4 rounded border-l-4 border-purple-500">
                            <h5 className="font-bold text-purple-400 mb-2">Grid (2D)</h5>
                            <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                                <li>Layout-driven.</li>
                                <li>Good for: Page Layouts.</li>
                            </ul>
                            {/* Grid Visual */}
                            <div className="mt-2 grid grid-cols-2 gap-1 border-2 border-dashed border-purple-500 p-1 rounded bg-purple-500/10 h-10">
                                <div className="bg-purple-500 rounded"></div>
                                <div className="bg-purple-500 rounded"></div>
                                <div className="bg-purple-500 rounded"></div>
                                <div className="bg-purple-500 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Grid Areas (The Superpower)',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Name your grid cells and draw layouts visually.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        grid-template-areas: <br />
                        &nbsp;&nbsp;<span className="text-green-300">"header header"</span><br />
                        &nbsp;&nbsp;<span className="text-green-300">"nav    main"</span>;
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ The `flex` Shorthand',
            icon: <FiAlignCenter className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <code>flex: 1 1 auto;</code> (Grow, Shrink, Basis).
                    </p>
                </div>
            ),
        },
        {
            title: '🚀 Advanced Example: Dashboard Layout',
            icon: <FiPlay className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A responsive dashboard layout built using <strong>Grid Areas</strong>.
                    </p>
                    <a
                        href="/previews/fwd/grid-dashboard-layout.html"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-cyan-500/20"
                    >
                        <FiPlay className="w-4 h-4" />
                        ▶ Open Dashboard Layout
                    </a>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What does `minmax(200px, 1fr)` do?",
            solution: "Makes column at least 200px wide, but grows if space permits.",
        },
    ],
    exampleProblems: [],
}

export default function LayoutSystemsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
