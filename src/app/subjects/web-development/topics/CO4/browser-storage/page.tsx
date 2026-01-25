'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiHardDrive, FiClock, FiPlay, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Browser Storage',
    explanationSections: [
        {
            title: '1️⃣ LocalStorage',
            icon: <FiHardDrive className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        LocalStorage allows you to store key-value pairs in the browser. Data ensures <span className="text-green-400">no expiration</span>. It stays even if you close the browser and restart the computer.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-blue-300">localStorage</span>.setItem(<span className="text-green-300">"theme"</span>, <span className="text-green-300">"dark"</span>);<br />
                        <span className="text-blue-300">let</span> theme = <span className="text-blue-300">localStorage</span>.getItem(<span className="text-green-300">"theme"</span>);<br />
                        <span className="text-blue-300">localStorage</span>.removeItem(<span className="text-green-300">"theme"</span>);
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ SessionStorage',
            icon: <FiClock className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Works exactly like LocalStorage, but data is <span className="text-orange-400">cleared when the tab is closed</span>.
                    </p>
                    <p className="text-sm text-gray-400">Use this for temporary data like form inputs in a multi-step wizard.</p>
                </div>
            ),
        },
        {
            title: '3️⃣ Cookies (Briefly)',
            icon: <FiAlertTriangle className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Older method. Cookies are small data strings sent to the server with every request. Used mainly for authentication tokens. LocalStorage is preferred for simple client-side data.
                    </p>
                </div>
            ),
        },
        {
            title: '🚀 Hands-on Mini Example',
            icon: <FiPlay className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A demo that remembers your name even after you refresh the page.
                    </p>

                    <a
                        href="/previews/fwd/browser-storage.html"
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
                            <span>Storage only saves <strong>Strings</strong>. If you want to save an Object, use <code>JSON.stringify(obj)</code> first.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>Do NOT store sensitive info (passwords) in LocalStorage (accessible by any JS code on page).</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "How do you store an array `[1,2,3]` in localStorage?",
            solution: "You cannot store arrays directly. Convert to string: `localStorage.setItem('nums', JSON.stringify([1,2,3]))`.",
        },
    ],
    exampleProblems: [],
}

export default function BrowserStoragePage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
