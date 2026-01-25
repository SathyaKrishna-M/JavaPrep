'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiChrome, FiLayers, FiCode, FiTool, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi'

const content = {
    title: 'Browser Basics',
    explanationSections: [
        {
            title: '1️⃣ What is a Browser?',
            icon: <FiChrome className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A software application used to access information on the World Wide Web.
                        Examples: Chrome (Blink engine), Firefox (Gecko), Safari (WebKit).
                    </p>
                </div>
            ),
        },
        {
            title: '2️⃣ How a Page Renders (The Pipeline)',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The browser converts code into pixels in steps:
                    </p>
                    <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 overflow-x-auto">
                        <div className="flex items-center gap-4 min-w-[600px] text-sm md:justify-center">
                            {/* HTML */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-12 bg-orange-500/20 border border-orange-500 rounded flex items-center justify-center text-orange-400 font-bold">HTML</div>
                                <div className="h-8 w-px bg-gray-600"></div>
                                <div className="w-16 h-12 bg-blue-500/20 border border-blue-500 rounded flex items-center justify-center text-blue-400 font-bold">DOM</div>
                            </div>

                            <div className="text-2xl text-gray-600">+</div>

                            {/* CSS */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-12 bg-blue-400/20 border border-blue-400 rounded flex items-center justify-center text-blue-300 font-bold">CSS</div>
                                <div className="h-8 w-px bg-gray-600"></div>
                                <div className="w-16 h-12 bg-purple-500/20 border border-purple-500 rounded flex items-center justify-center text-purple-400 font-bold">CSSOM</div>
                            </div>

                            <div className="text-2xl text-gray-600">=</div>

                            {/* Render Tree */}
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-12 bg-green-500/20 border border-green-500 rounded flex items-center justify-center text-green-400 font-bold">Render Tree</div>
                                <div className="h-6 w-px bg-gray-600"></div>
                                <div className="w-24 h-8 bg-gray-800 border border-gray-600 rounded flex items-center justify-center text-gray-300 text-xs">Layout & Paint</div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Developer Tools (DevTools)',
            icon: <FiTool className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Every browser has built-in tools for developers (F12 or Right Click &gt; Inspect).
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>Elements Tab:</strong> View and edit the DOM/CSS live. Great for debugging layout.</li>
                        <li><strong>Console Tab:</strong> See JavaScript logs, errors, and run code snippets.</li>
                        <li><strong>Network Tab:</strong> Monitor all requests (images, API calls) and loading times.</li>
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
                            <span><strong>DOM</strong> (Document Object Model) is the live version of your HTML that the browser understands.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>The <strong>Console</strong> is your best friend for finding bugs. Always check it if something isn't working.</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Why can't I see `display: none` elements in the Render Tree?",
            solution: "Because the Render Tree represents ONLY what is visible on the screen. Hidden elements remain in the DOM but are excluded from the Render Tree.",
        },
        {
            question: "What happens if JavaScript is heavy?",
            solution: "It blocks the main thread, causing the page to freeze or stutter (bad user experience).",
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
