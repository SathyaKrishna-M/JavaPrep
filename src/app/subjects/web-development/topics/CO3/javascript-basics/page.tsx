'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCode, FiBox, FiRepeat, FiCheckCircle, FiArrowUp, FiLayers, FiGitPullRequest } from 'react-icons/fi'

const content = {
    title: 'JavaScript Basics',
    explanationSections: [
        {
            title: '1️⃣ The Big Picture: HTML vs CSS vs JS',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        How they work together to build the web.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 items-stretch justify-center">
                        <div className="flex-1 bg-orange-500/10 border border-orange-500/50 p-4 rounded flex flex-col items-center gap-2">
                            <div className="font-bold text-orange-400">HTML</div>
                            <div className="text-4xl">💀</div>
                            <div className="text-xs text-center text-gray-400">The Skeleton<br />(Structure)</div>
                        </div>
                        <div className="flex-1 bg-blue-500/10 border border-blue-500/50 p-4 rounded flex flex-col items-center gap-2">
                            <div className="font-bold text-blue-400">CSS</div>
                            <div className="text-4xl">🎨</div>
                            <div className="text-xs text-center text-gray-400">The Skin<br />(Style)</div>
                        </div>
                        <div className="flex-1 bg-yellow-500/10 border border-yellow-500/50 p-4 rounded flex flex-col items-center gap-2">
                            <div className="font-bold text-yellow-400">JavaScript</div>
                            <div className="text-4xl">🧠</div>
                            <div className="text-xs text-center text-gray-400">The Brain<br />(Logic)</div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Modern Operators (Exam Critical)',
            icon: <FiGitPullRequest className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 rounded border-l-4 border-green-500">
                            <h5 className="font-bold text-green-400 mb-2">Ternary (One-line If)</h5>
                            <code className="text-xs block text-gray-300">
                                const status = age &gt;= 18 ? "Adult" : "Minor";
                            </code>
                        </div>
                        <div className="bg-slate-800 p-4 rounded border-l-4 border-purple-500">
                            <h5 className="font-bold text-purple-400 mb-2">Nullish Coalescing (??)</h5>
                            <code className="text-xs block text-gray-300">
                                const name = input ?? "Guest";
                            </code>
                            <p className="text-[10px] text-gray-500 mt-2">Only falls back if <code>null</code> or <code>undefined</code>. (Difference from ||).</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Loops: For-Of vs For-In',
            icon: <FiRepeat className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Don't use old `for` loops unless you need the index number.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-blue-300">for</span> (const item <span className="text-purple-300">of</span> array) {'{'} ... {'}'} <span className="text-gray-500">// Values</span><br />
                        <span className="text-blue-300">for</span> (const key <span className="text-purple-300">in</span> object) {'{'} ... {'}'} <span className="text-gray-500">// Keys</span>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Variables & Hoisting',
            icon: <FiArrowUp className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-yellow-500">
                        <h5 className="font-bold text-yellow-400 mb-2">VAR Hoisting</h5>
                        <code className="text-xs block text-gray-300">
                            console.log(x); <span className="text-gray-500">// undefined</span><br />
                            var x = 5;
                        </code>
                    </div>
                </div>
            ),
        },
        {
            title: '5️⃣ Scope Visualized',
            icon: <FiBox className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 font-mono text-sm relative">
                        <div className="border border-yellow-500/30 bg-yellow-500/5 p-4 rounded mb-4 relative">
                            <span className="absolute -top-3 left-2 bg-slate-900 px-2 text-yellow-400 text-xs font-bold">Global Scope</span>
                            <div className="text-white">const user = "John";</div>

                            <div className="border border-blue-500/30 bg-blue-500/5 p-4 rounded mt-4 relative">
                                <span className="absolute -top-3 left-2 bg-slate-900 px-2 text-blue-400 text-xs font-bold">Block / Loop</span>
                                <div className="text-white">let age = 25;</div>
                                <div className="text-gray-500 mt-2">// Can access 'user'</div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Difference between || and ??",
            solution: "`||` falls back on ANY falsy value (0, '', false). `??` only falls back on null/undefined. Useful for 0 values.",
        },
    ],
    exampleProblems: [],
}

export default function JavascriptBasicsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
