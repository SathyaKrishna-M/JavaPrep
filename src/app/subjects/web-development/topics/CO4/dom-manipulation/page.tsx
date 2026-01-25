'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiEdit, FiTrash, FiPlusSquare, FiPlay, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'DOM Manipulation',
    explanationSections: [
        {
            title: '1️⃣ Creating Elements',
            icon: <FiPlusSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        You can create new HTML elements on the fly using JavaScript. They float in memory until you attach them to the page.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-gray-500">// 1. Create</span><br />
                        <span className="text-purple-400">const</span> <span className="text-blue-300">newDiv</span> = <span className="text-blue-300">document</span>.createElement(<span className="text-green-300">"div"</span>);<br /><br />
                        <span className="text-gray-500">// 2. Configure</span><br />
                        <span className="text-blue-300">newDiv</span>.innerText = <span className="text-green-300">"Hello!"</span>;<br />
                        <span className="text-blue-300">newDiv</span>.classList.add(<span className="text-green-300">"box"</span>);<br /><br />
                        <span className="text-gray-500">// 3. Attach</span><br />
                        <span className="text-blue-300">document</span>.body.appendChild(<span className="text-blue-300">newDiv</span>);
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Modifying Classes & Styles',
            icon: <FiEdit className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The cleanest way to change how an element looks is by toggling CSS classes.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-purple-400">const</span> <span className="text-orange-300">box</span> = <span className="text-blue-300">document</span>.querySelector(<span className="text-green-300">".box"</span>);<br /><br />
                        <span className="text-orange-300">box</span>.classList.add(<span className="text-green-300">"active"</span>); <span className="text-gray-500">// Adds class</span><br />
                        <span className="text-orange-300">box</span>.classList.remove(<span className="text-green-300">"hidden"</span>); <span className="text-gray-500">// Removes class</span><br />
                        <span className="text-orange-300">box</span>.classList.toggle(<span className="text-green-300">"dark-mode"</span>); <span className="text-gray-500">// Switches on/off</span>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Removing Elements',
            icon: <FiTrash className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Deleting an element is simple.
                    </p>
                    <code className="block bg-black/30 p-2 rounded text-sm text-gray-300">
                        element.remove();
                    </code>
                </div>
            ),
        },
        {
            title: '🚀 Hands-on Mini Example',
            icon: <FiPlay className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A "Todo List" where you can add new items and remove them.
                    </p>

                    <a
                        href="/previews/fwd/dom-manipulation.html"
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
                            <span>Prefer <code>classList</code> methods over setting `element.className` string directly.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span><code>innerHTML</code> is powerful but risky (security). Use <code>textContent</code> for plain text.</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is the difference between append() and appendChild()?",
            solution: "`appendChild` only accepts one Node. `append` accepts multiple Nodes and even strings (text). `append` is newer/modern.",
        },
    ],
    exampleProblems: [],
}

export default function DomManipulationPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
