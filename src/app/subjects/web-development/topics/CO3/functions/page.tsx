'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCode, FiZap, FiGitMerge, FiPlay, FiBriefcase, FiCornerDownRight } from 'react-icons/fi'

const content = {
    title: 'Functions',
    explanationSections: [
        {
            title: '1️⃣ Advanced Parameters',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 rounded border-l-4 border-blue-500">
                            <h5 className="font-bold text-blue-400 mb-2">Default Params</h5>
                            <code className="text-xs block text-gray-300">
                                function greet(name = "Guest") {'{ ... }'}
                            </code>
                            <p className="text-[10px] text-gray-500 mt-2">No more `name || "Guest"` hacks.</p>
                        </div>
                        <div className="bg-slate-800 p-4 rounded border-l-4 border-purple-500">
                            <h5 className="font-bold text-purple-400 mb-2">Rest Params (...)</h5>
                            <code className="text-xs block text-gray-300">
                                function sum(...nums) {'{'}<br />
                                &nbsp;&nbsp;return nums.reduce(...)<br />
                                {'}'}
                            </code>
                            <p className="text-[10px] text-gray-500 mt-2">Collects args into an array.</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ IIFE (Immediately Invoked)',
            icon: <FiZap className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Functions that run as soon as they are defined. Pattern used for privacy / setup.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        (<span className="text-blue-300">function</span>() {'{'}<br />
                        &nbsp;&nbsp;console.log(<span className="text-green-300">"Run Once!"</span>);<br />
                        {'}'})();
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Recursion (Calling Itself)',
            icon: <FiCornerDownRight className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Essential for tree structures (like the DOM).
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        const factorial = (n) =&gt; {'{'}<br />
                        &nbsp;&nbsp;if (n === 0) return 1; <span className="text-gray-500">// Base Case</span><br />
                        &nbsp;&nbsp;return n * factorial(n - 1);<br />
                        {'}'}
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Closures (The Backpack)',
            icon: <FiBriefcase className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Functions remember their creation environment.
                    </p>
                    {/* Visual Diagram */}
                    <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 flex flex-col items-center gap-4">
                        <div className="bg-blue-500/10 border border-blue-500/50 p-4 rounded text-center w-full max-w-sm relative">
                            <span className="absolute -top-3 left-2 bg-slate-900 px-2 text-blue-400 text-xs">Outer Function</span>
                            <div className="text-blue-200">let count = 0;</div>

                            <div className="mt-4 bg-green-500/20 border border-green-500 p-4 rounded relative">
                                <span className="absolute -top-3 left-2 bg-slate-900 px-2 text-green-400 text-xs">Inner Function</span>
                                <div className="text-white">return count++;</div>
                            </div>
                        </div>
                    </div>
                    {/* Interactive Link */}
                    <a
                        href="/previews/js/closure-demo.html"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-cyan-500/20"
                    >
                        <FiPlay className="w-4 h-4" />
                        ▶ Launch Closure Demo
                    </a>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Why use an IIFE?",
            solution: "To avoid polluting the global variable namespace. Any variables defined inside die when it finishes.",
        },
    ],
    exampleProblems: [],
}

export default function FunctionsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
