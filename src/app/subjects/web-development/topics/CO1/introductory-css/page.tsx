'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCode, FiHash, FiLayout, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Introductory CSS',
    explanationSections: [
        {
            title: '1️⃣ What is CSS?',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        CSS (Cascading Style Sheets) controls how HTML looks. Without CSS, the web is just plain black text on white background.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-blue-300">selector</span> {'{'}<br />
                        &nbsp;&nbsp;<span className="text-purple-400">property</span>: <span className="text-green-300">value</span>;<br />
                        {'}'}
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Ways to Add CSS',
            icon: <FiLayout className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>External (Best):</strong> <code>&lt;link rel="stylesheet" href="style.css"&gt;</code>. Keeps code clean.</li>
                        <li><strong>Internal:</strong> <code>&lt;style&gt;...&lt;/style&gt;</code> in head. Okay for single pages.</li>
                        <li><strong>Inline (Avoid):</strong> <code>&lt;h1 style="color:red;"&gt;</code>. Hard to maintain.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '3️⃣ Selectors & Colors',
            icon: <FiHash className="w-6 h-6" />,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-blue-500">
                        <h5 className="font-bold text-blue-400 mb-2">Selectors</h5>
                        <code className="text-sm block text-gray-300">h1 {'{...}'} <span className="text-gray-500">// Element</span></code>
                        <code className="text-sm block text-gray-300">.btn {'{...}'} <span className="text-gray-500">// Class (Multiple)</span></code>
                        <code className="text-sm block text-gray-300">#header {'{...}'} <span className="text-gray-500">// ID (Unique)</span></code>
                    </div>
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-green-500">
                        <h5 className="font-bold text-green-400 mb-2">Colors</h5>
                        <code className="text-sm block text-gray-300">color: red; <span className="text-gray-500">// Name</span></code>
                        <code className="text-sm block text-gray-300">color: #ff0000; <span className="text-gray-500">// Hex</span></code>
                        <code className="text-sm block text-gray-300">color: rgb(255, 0, 0); <span className="text-gray-500">// RGB</span></code>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ The Box Model',
            icon: <FiLayout className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Every element is a box. It has 4 layers:
                    </p>
                    <div className="bg-slate-900 p-8 rounded-lg border border-slate-700 flex justify-center">
                        {/* Margin */}
                        <div className="bg-orange-900/30 border-2 border-dashed border-orange-500 p-8 relative rounded-lg">
                            <span className="absolute top-2 left-2 text-xs text-orange-400 font-bold uppercase">Margin (Outside)</span>

                            {/* Border */}
                            <div className="bg-yellow-900/30 border-4 border-yellow-500 p-8 relative rounded">
                                <span className="absolute top-2 left-2 text-xs text-yellow-400 font-bold uppercase">Border</span>

                                {/* Padding */}
                                <div className="bg-green-900/30 border-2 border-dashed border-green-500 p-8 relative rounded">
                                    <span className="absolute top-2 left-2 text-xs text-green-400 font-bold uppercase">Padding (Inside)</span>

                                    {/* Content */}
                                    <div className="bg-blue-500 h-16 w-32 flex items-center justify-center text-white font-bold rounded shadow-lg">
                                        Content
                                    </div>
                                </div>
                            </div>
                        </div>
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
                            <span><strong>Class (.) vs ID (#)</strong>: Use Classes for reused styles (buttons). Use IDs for unique sections (navbar).</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>A common mistake is forgetting strict syntax. <code>p {'{ color: red }'}</code> (Missing semicolon is dangerous in larger blocks).</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What has higher priority: ID or Class selector?",
            solution: "ID selector (`#id`) is more specific than Class selector (`.class`) and will override it.",
        },
    ],
    exampleProblems: [],
}

export default function IntroductoryCssPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
