'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiPackage, FiDownload, FiSettings, FiPlay, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Package Managers (NPM)',
    explanationSections: [
        {
            title: '1️⃣ What is NPM?',
            icon: <FiPackage className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        NPM (Node Package Manager) is the <span className="text-cyan-400">App Store for Developers</span>.
                        Instead of writing code from scratch (like a date picker or carousel), you download code other people have written.
                    </p>
                </div>
            ),
        },
        {
            title: '2️⃣ package.json',
            icon: <FiSettings className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The configuration file for your project. It lists every external library your project needs to run.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-gray-500">// package.json</span><br />
                        {'{'}<br />
                        &nbsp;&nbsp;<span className="text-purple-400">"name"</span>: <span className="text-green-300">"my-project"</span>,<br />
                        &nbsp;&nbsp;<span className="text-purple-400">"dependencies"</span>: {'{'}<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">"react"</span>: <span className="text-green-300">"^18.0.0"</span>,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">"axios"</span>: <span className="text-green-300">"^1.4.0"</span><br />
                        &nbsp;&nbsp;{'}'}<br />
                        {'}'}
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Common Commands',
            icon: <FiDownload className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><code>npm init -y</code>: Creates a package.json file.</li>
                        <li><code>npm install [package]</code>: Downloads a package.</li>
                        <li><code>npm run dev</code>: Runs the script named "dev" (commonly starts the web server).</li>
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
                        Simulate installing packages and watch how they appear in `package.json`.
                    </p>

                    <a
                        href="/previews/fwd/package-managers.html"
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
                            <span><strong>node_modules</strong> is the folder where downloaded code lives. It is huge. <strong>NEVER</strong> manually edit files inside it.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>When sharing code, delete <code>node_modules</code>. The receiver can run <code>npm install</code> to re-download everything based on your package.json.</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is `devDependencies`?",
            solution: "Packages only needed during development (like testing tools or formatters) but not required for the actual app to run in production.",
        },
    ],
    exampleProblems: [],
}

export default function PackageManagersPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
