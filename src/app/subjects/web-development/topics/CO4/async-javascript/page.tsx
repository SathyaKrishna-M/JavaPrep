'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiClock, FiDownload, FiPlay, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Asynchronous JavaScript',
    explanationSections: [
        {
            title: '1️⃣ Sync vs Async',
            icon: <FiClock className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <strong>Synchronous:</strong> One thing at a time. Code waits for the previous line to finish. (Blocking).<br />
                        <strong>Asynchronous:</strong> Start a task (like fetching data), continue executing other code, and come back when the task is done. (Non-blocking).
                    </p>
                </div>
            ),
        },
        {
            title: '2️⃣ Promises',
            icon: <FiAlertTriangle className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A Promise represents a value that doesn't exist yet but will in the future. It has 3 states: <code>Pending</code>, <code>Resolved</code> (Success), <code>Rejected</code> (Error).
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-blue-300">fetchData</span>()<br />
                        &nbsp;&nbsp;.then(<span className="text-orange-300">data</span> <span className="text-purple-400">={'>'}</span> console.log(data))<br />
                        &nbsp;&nbsp;.catch(<span className="text-orange-300">err</span> <span className="text-purple-400">={'>'}</span> console.error(err));
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Async / Await (Modern)',
            icon: <FiDownload className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Syntax sugar built on Promises. Makes async code look like sync code. Easier to read.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-purple-400">async function</span> <span className="text-blue-300">getData</span>() {'{'}<br />
                        &nbsp;&nbsp;<span className="text-purple-400">try</span> {'{'}<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-orange-300">response</span> = <span className="text-purple-400">await</span> fetch(<span className="text-green-300">"/api/users"</span>);<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-orange-300">data</span> = <span className="text-purple-400">await</span> response.json();<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;console.log(data);<br />
                        &nbsp;&nbsp;{'}'} <span className="text-purple-400">catch</span> (error) {'{'}<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;console.error(error);<br />
                        &nbsp;&nbsp;{'}'}<br />
                        {'}'}
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
                        Simulating a server request that takes 2 seconds to complete. Notice how the page doesn't freeze while waiting!
                    </p>

                    <a
                        href="/previews/fwd/async-javascript.html"
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
                            <span><strong>await</strong> can only be used inside an <strong>async</strong> function.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>The global <code>fetch()</code> API uses promises to make network requests.</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What happens if you forget 'await' before a promise?",
            solution: "The function continues execution immediately, returning a Promise object instead of the actual data result.",
        },
    ],
    exampleProblems: [],
}

export default function AsyncJavascriptPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
