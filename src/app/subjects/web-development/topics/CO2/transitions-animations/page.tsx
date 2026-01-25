'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiPlayCircle, FiClock, FiActivity, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Transitions & Animations',
    explanationSections: [
        {
            title: '1️⃣ CSS Transitions',
            icon: <FiClock className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Smooth change from State A to State B.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        transition: <span className="text-green-300">all</span> <span className="text-orange-300">0.3s</span> <span className="text-purple-300">ease-in-out</span>;
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Keyframe Animations',
            icon: <FiPlayCircle className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Complex multi-step animations.
                    </p>
                    <div className="space-y-6">
                        <p className="text-gray-300">
                            Here are the most common standard animations.
                        </p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Bounce */}
                            <div className="bg-slate-900 p-4 rounded border border-slate-700 flex flex-col items-center gap-4 hover:border-blue-500 transition-colors">
                                <div className="w-12 h-12 bg-blue-500 rounded-full animate-bounce shadow-lg shadow-blue-500/50"></div>
                                <div className="text-xs text-center font-mono text-gray-400">
                                    <span className="text-blue-300 font-bold block mb-1">Bounce</span>
                                    animation: bounce 1s infinite;
                                </div>
                            </div>

                            {/* Spin */}
                            <div className="bg-slate-900 p-4 rounded border border-slate-700 flex flex-col items-center gap-4 hover:border-purple-500 transition-colors">
                                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                <div className="text-xs text-center font-mono text-gray-400">
                                    <span className="text-purple-300 font-bold block mb-1">Spin</span>
                                    animation: spin 1s linear infinite;
                                </div>
                            </div>

                            {/* Pulse */}
                            <div className="bg-slate-900 p-4 rounded border border-slate-700 flex flex-col items-center gap-4 hover:border-red-500 transition-colors">
                                <div className="w-12 h-12 bg-red-500 rounded-lg animate-pulse shadow-lg shadow-red-500/50"></div>
                                <div className="text-xs text-center font-mono text-gray-400">
                                    <span className="text-red-300 font-bold block mb-1">Pulse</span>
                                    animation: pulse 2s infinite;
                                </div>
                            </div>

                            {/* Ping */}
                            <div className="bg-slate-900 p-4 rounded border border-slate-700 flex flex-col items-center gap-4 hover:border-green-500 transition-colors">
                                <span className="relative flex h-12 w-12">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-12 w-12 bg-green-500"></span>
                                </span>
                                <div className="text-xs text-center font-mono text-gray-400">
                                    <span className="text-green-300 font-bold block mb-1">Ping</span>
                                    animation: ping 1s infinite;
                                </div>
                            </div>
                        </div>

                        {/* Code Snippet */}
                        <div className="bg-slate-800 p-4 rounded-lg font-mono text-xs md:text-sm border border-slate-700 overflow-x-auto">
                            <span className="text-gray-500">/* How 'Spin' works under the hood */</span><br />
                            <span className="text-blue-300">@keyframes</span> spin {'{'}<br />
                            &nbsp;&nbsp;from {'{'} transform: <span className="text-orange-300">rotate(0deg)</span>; {'}'}<br />
                            &nbsp;&nbsp;to {'{'} transform: <span className="text-orange-300">rotate(360deg)</span>; {'}'}<br />
                            {'}'}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Transforms & Performance (Exam Critical)',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>Composite Layers:</strong> Only animate <code>opacity</code> and <code>transform</code> for 60fps.</li>
                        <li><code>will-change: transform</code>: Hints browser to optimize.</li>
                        <li><strong>Functions:</strong> <code>translate()</code>, <code>scale()</code>, <code>rotate()</code>.</li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is `animation-fill-mode: forwards`?",
            solution: "Keeps the element at the final state of animation.",
        },
    ],
    exampleProblems: [],
}

export default function TransitionsAnimationsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
