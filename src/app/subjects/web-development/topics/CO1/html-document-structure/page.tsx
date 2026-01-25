'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiLayout, FiCode, FiFileText, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'HTML Document Structure',
    explanationSections: [
        {
            title: '1️⃣ The Skeleton',
            icon: <FiLayout className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Every HTML page follows a strict structure. Using the correct tags ensures the browser knows how to read your file.
                    </p>
                    <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 font-mono text-sm leading-relaxed">
                        {/* HTML Root */}
                        <div className="border border-blue-500/30 rounded p-4 bg-blue-500/5 relative">
                            <span className="absolute -top-3 left-4 bg-slate-900 px-2 text-blue-400 font-bold">&lt;html&gt;</span>

                            <div className="flex flex-col md:flex-row gap-4 mt-2">
                                {/* Head */}
                                <div className="border border-orange-500/30 rounded p-4 bg-orange-500/5 flex-1 relative">
                                    <span className="absolute -top-3 left-4 bg-slate-900 px-2 text-orange-400 font-bold">&lt;head&gt;</span>
                                    <div className="text-gray-500 text-xs italic mb-2">// Invisible Settings</div>
                                    <div className="text-gray-300">&lt;title&gt;Page Title&lt;/title&gt;</div>
                                    <div className="text-gray-300">&lt;meta charset="UTF-8"&gt;</div>
                                </div>

                                {/* Body */}
                                <div className="border border-green-500/30 rounded p-4 bg-green-500/5 flex-1 relative">
                                    <span className="absolute -top-3 left-4 bg-slate-900 px-2 text-green-400 font-bold">&lt;body&gt;</span>
                                    <div className="text-gray-500 text-xs italic mb-2">// Visible Content</div>
                                    <div className="border border-purple-500/30 rounded p-2 mb-2 bg-purple-500/5">
                                        <span className="text-purple-400">&lt;h1&gt;</span> Hello World <span className="text-purple-400">&lt;/h1&gt;</span>
                                    </div>
                                    <div className="border border-purple-500/30 rounded p-2 bg-purple-500/5">
                                        <span className="text-purple-400">&lt;p&gt;</span> This is content. <span className="text-purple-400">&lt;/p&gt;</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Head vs Body',
            icon: <FiFileText className="w-6 h-6" />,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-blue-500">
                        <h5 className="font-bold text-blue-400 mb-2">&lt;head&gt; (Brain)</h5>
                        <p className="text-xs text-gray-400">Contains info FOR the browser. Search engines read this. Users don't see it (except the title tab).</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-green-500">
                        <h5 className="font-bold text-green-400 mb-2">&lt;body&gt; (Body)</h5>
                        <p className="text-xs text-gray-400">Contains everything the user sees. Text, images, buttons, videos.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Metadata & Clean Code',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>Indentation:</strong> Always indent child elements (press Tab). It makes code readable.</li>
                        <li><strong>Comments:</strong> Use <code>&lt;!-- Comment --&gt;</code> to leave notes for yourself.</li>
                        <li><strong>Encoding:</strong> <code>&lt;meta charset="UTF-8"&gt;</code> ensures emojis and special characters work.</li>
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
                            <span><strong>&lt;title&gt;</strong> vs <strong>&lt;h1&gt;</strong>: Title is for the browser tab/Google. H1 is the main heading on the page itself.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>Never put content (like `&lt;p&gt;` or `&lt;img&gt;`) inside `&lt;head&gt;`. It won't show up correctly.</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What happens if I forget <!DOCTYPE html>?",
            solution: "The browser goes into 'Quirks Mode' and might render your page like an old 1999 website causing layout issues.",
        },
    ],
    exampleProblems: [],
}

export default function HtmlDocumentStructurePage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
