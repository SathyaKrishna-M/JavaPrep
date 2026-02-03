'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiMonitor, FiLayers, FiCode, FiCpu, FiEye } from 'react-icons/fi'

const content = {
    title: 'Browser Basics',
    explanationSections: [
        {
            title: '1️⃣ What is a Browser?',
            icon: <FiMonitor className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A browser is a software application often used to access information on the World Wide Web.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-slate-800 rounded-lg text-center border border-slate-700">
                            <span className="text-2xl mb-2 block">🟠</span>
                            <span className="text-sm font-bold text-gray-300">Chrome</span>
                            <span className="block text-xs text-gray-500">Google (V8 Engine)</span>
                        </div>
                        <div className="p-4 bg-slate-800 rounded-lg text-center border border-slate-700">
                            <span className="text-2xl mb-2 block">🔵</span>
                            <span className="text-sm font-bold text-gray-300">Edge</span>
                            <span className="block text-xs text-gray-500">Microsoft (Chromium)</span>
                        </div>
                        <div className="p-4 bg-slate-800 rounded-lg text-center border border-slate-700">
                            <span className="text-2xl mb-2 block">🦊</span>
                            <span className="text-sm font-bold text-gray-300">Firefox</span>
                            <span className="block text-xs text-gray-500">Mozilla (Gecko)</span>
                        </div>
                        <div className="p-4 bg-slate-800 rounded-lg text-center border border-slate-700">
                            <span className="text-2xl mb-2 block">🧭</span>
                            <span className="text-sm font-bold text-gray-300">Safari</span>
                            <span className="block text-xs text-gray-500">Apple (WebKit)</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ How Browsers Render Pages',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        When a browser receives HTML and CSS code, it doesn't just show it individually. It combines them into a "Render Tree" to figure out what to paint on the screen.
                    </p>

                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 overflow-x-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 min-w-[600px]">

                            {/* Inputs */}
                            <div className="flex flex-col gap-4">
                                <div className="px-4 py-3 bg-orange-500/20 border border-orange-500/40 rounded-lg text-orange-200 text-sm font-mono flex items-center gap-2">
                                    <FiCode /> HTML FILE
                                </div>
                                <div className="px-4 py-3 bg-blue-500/20 border border-blue-500/40 rounded-lg text-blue-200 text-sm font-mono flex items-center gap-2">
                                    <FiCode /> CSS FILE
                                </div>
                            </div>

                            {/* Arrows */}
                            <div className="flex flex-col gap-8 text-gray-500 text-2xl">
                                <span>→</span>
                                <span>→</span>
                            </div>

                            {/* Parsers */}
                            <div className="flex flex-col gap-4">
                                <div className="px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-gray-300 text-sm w-32 text-center">
                                    <strong>DOM</strong><br /><span className="text-[10px]">Document Object Model</span>
                                </div>
                                <div className="px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-gray-300 text-sm w-32 text-center">
                                    <strong>CSSOM</strong><br /><span className="text-[10px]">CSS Object Model</span>
                                </div>
                            </div>

                            {/* Merge Arrow */}
                            <div className="text-gray-500 text-2xl">
                                <span>}</span> →
                            </div>

                            {/* Render Tree */}
                            <div className="px-5 py-4 bg-purple-500/20 border border-purple-500/40 rounded-lg text-purple-200 text-sm text-center">
                                <strong>Render Tree</strong>
                                <br /><span className="text-[10px] opacity-70">Visible Elements Only</span>
                            </div>

                            <div className="text-gray-500 text-2xl">→</div>

                            {/* Paint */}
                            <div className="px-5 py-4 bg-green-500/20 border border-green-500/40 rounded-lg text-green-200 text-sm text-center">
                                <strong>Paint</strong>
                                <br /><span className="text-[10px] opacity-70">Pixels on Screen</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-slate-800/50 p-4 rounded-lg">
                        <div>
                            <strong className="text-cyan-400">Reflow (Layout)</strong>
                            <p className="text-gray-400">Calculating positions (width, height, top, left). Happens when you change window size or add elements.</p>
                        </div>
                        <div>
                            <strong className="text-green-400">Repaint</strong>
                            <p className="text-gray-400">Filling in colors, borders, shadows. Happens when you change background-color or visibility.</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ JavaScript Execution',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        JavaScript is the "brain". It can manipulate the DOM and CSSOM, forcing the browser to re-render parts of the page.
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3 text-sm text-yellow-200/80">
                        <FiEye className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p>
                            <strong>Tip:</strong> Putting script tags at the bottom of the <code>&lt;body&gt;</code> is a best practice. It lets the HTML load first so the user sees something before the heavy JS loads.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Developer Tools',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Every browser has built-in tools for developers. Press <code>F12</code> or <code>Right Click &gt; Inspect</code>.
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="p-3 bg-slate-800 rounded border border-slate-700 flex items-center gap-3">
                            <span className="p-1 bg-blue-500/20 text-blue-400 rounded text-xs font-mono">Elements</span>
                            <span className="text-sm text-gray-400">View and edit HTML/CSS live. Best for debugging layout.</span>
                        </div>
                        <div className="p-3 bg-slate-800 rounded border border-slate-700 flex items-center gap-3">
                            <span className="p-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-mono">Console</span>
                            <span className="text-sm text-gray-400">See JavaScript errors and logs (<code>console.log</code>).</span>
                        </div>
                        <div className="p-3 bg-slate-800 rounded border border-slate-700 flex items-center gap-3">
                            <span className="p-1 bg-green-500/20 text-green-400 rounded text-xs font-mono">Network</span>
                            <span className="text-sm text-gray-400">See what files are loading and how long they take.</span>
                        </div>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Why should you place the <script> tag at the end of the body?",
            solution: "To allow the HTML content (DOM) to load and display to the user first. If a script is heavy and placed at the top, the user sees a blank white screen until it finishes loading.",
        },
        {
            question: "What is the difference between Reflow and Repaint?",
            solution: "Reflow (Layout) happens when 'geometry' changes (width, height, position). Repaint happens when 'appearance' changes without affecting geometry (color, visibility). Reflow forces a Repaint, but not vice-versa.",
        },
    ],
    exampleProblems: [],
}

export default function BrowserBasicsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
