'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiLayout, FiMaximize, FiGitMerge, FiPlay, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'DOM Fundamentals',
    explanationSections: [
        {
            title: '1️⃣ What is the DOM?',
            icon: <FiLayout className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The <strong>Document Object Model (DOM)</strong> is the bridge between functionality (JS) and content (HTML). When a page loads, the browser creates a tree of objects representing your HTML structure.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-gray-500">// We can access this tree using the `document` object</span><br />
                        <span className="text-blue-300">document</span>.title = <span className="text-green-300">"New Title"</span>; <span className="text-gray-500">// Changes tab name</span><br />
                        <span className="text-blue-300">document</span>.body.style.background = <span className="text-green-300">"red"</span>; <span className="text-gray-500">// Changes background color</span>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ The DOM Tree',
            icon: <FiGitMerge className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Think of it like a family tree.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>Root:</strong> <code>&lt;html&gt;</code> element.</li>
                        <li><strong>Parents:</strong> Elements that contain others (e.g., <code>&lt;body&gt;</code> is parent to <code>&lt;h1&gt;</code>).</li>
                        <li><strong>Children:</strong> Nested elements.</li>
                        <li><strong>Siblings:</strong> Elements on the same level.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '3️⃣ Selecting Elements',
            icon: <FiMaximize className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Before you can change something, you must find (select) it.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 rounded border-l-4 border-blue-500">
                            <h5 className="font-bold text-blue-400 mb-2">Old Way (Specific)</h5>
                            <code className="text-sm block">getElementById('id')</code>
                            <code className="text-sm block">getElementsByClassName('class')</code>
                        </div>
                        <div className="bg-slate-800 p-4 rounded border-l-4 border-green-500">
                            <h5 className="font-bold text-green-400 mb-2">Modern Way (Flexible)</h5>
                            <code className="text-sm block">querySelector('.class')</code>
                            <code className="text-sm block">querySelector('#id')</code>
                            <p className="text-xs text-gray-400 mt-1">Uses CSS syntax! Much easier.</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '🚀 Hands-on Mini Example',
            icon: <FiPlay className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A visualization of how nested HTML tags become nested DOM nodes.
                    </p>

                    <a
                        href="/previews/fwd/dom-fundamentals.html"
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
                            <span><strong>DOM</strong> is an Object-Oriented representation of the HTML.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span><strong>querySelector</strong> returns the FIRST match. <strong>querySelectorAll</strong> returns ALL matches (NodeList).</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is the global object that represents the entire HTML page?",
            solution: "`document`.",
        },
    ],
    exampleProblems: [],
}

export default function DomFundamentalsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
