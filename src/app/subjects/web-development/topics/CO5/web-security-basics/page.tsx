'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiShield, FiLock, FiAlertTriangle, FiPlay, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Web Security Basics',
    explanationSections: [
        {
            title: '1️⃣ Top Threats',
            icon: <FiAlertTriangle className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-red-500">
                        <h5 className="font-bold text-red-400 mb-1">XSS (Cross-Site Scripting)</h5>
                        <p className="text-gray-300 text-sm">Attackers inject malicious JS scripts into your webpage (e.g., inside a comment section). If other users view it, the script runs and steals cookies.</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-orange-500">
                        <h5 className="font-bold text-orange-400 mb-1">SQL Injection</h5>
                        <p className="text-gray-300 text-sm">Attackers input SQL commands into login forms (like `admin' OR '1'='1`) to trick the database into giving access.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ HTTPS & SSL',
            icon: <FiLock className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Always serve websites over <strong>HTTPS</strong>. It encrypts the traffic between the user and the server, preventing "Man-in-the-Middle" attacks where hackers on public WiFi can read your data.
                    </p>
                </div>
            ),
        },
        {
            title: '3️⃣ How to Protect?',
            icon: <FiShield className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>Sanitize Input:</strong> Never trust user input. Always clean it before using.</li>
                        <li><strong>Use Content Security Policy (CSP):</strong> HTTP headers that tell the browser what scripts are allowed to run.</li>
                        <li><strong>Escape Output:</strong> Use <code>innerText</code> instead of <code>innerHTML</code> to prevent XSS.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '🚀 Hands-on Mini Example',
            icon: <FiPlay className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        See the difference between Unsafe Output (browser runs the code) and Safe Output (browser displays the code).
                    </p>

                    <a
                        href="/previews/fwd/web-security-basics.html"
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
                            <span><strong>Sanitization</strong> = Cleaning input. <strong>Validation</strong> = Checking if input format is correct.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>Modern Frameworks (React, Angular) prevent XSS by default by escaping content automatically.</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Why is `innerHTML` dangerous?",
            solution: "Because it parses string content as HTML. If that string contains `<script>`, the browser will execute it.",
        },
    ],
    exampleProblems: [],
}

export default function WebSecurityBasicsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
