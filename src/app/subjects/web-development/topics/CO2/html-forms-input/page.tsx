'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCheckSquare, FiType, FiSend, FiAlertCircle, FiCheckCircle, FiPlay } from 'react-icons/fi'

const content = {
    title: 'HTML Forms & Input Handling',
    explanationSections: [
        {
            title: '1️⃣ The <form> Element',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Forms are the primary way users interact with web applications.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-blue-300">&lt;form</span> <span className="text-purple-400">action</span>=<span className="text-green-300">"/api/login"</span> <span className="text-purple-400">method</span>=<span className="text-green-300">"POST"</span><span className="text-blue-300">&gt;</span><br />
                        &nbsp;&nbsp;<span className="text-gray-500">// Inputs...</span><br />
                        <span className="text-blue-300">&lt;/form&gt;</span>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ GET vs POST (Exam Critical)',
            icon: <FiSend className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <table className="w-full text-sm text-left text-gray-300 border-collapse border border-slate-700">
                        <thead className="text-xs uppercase bg-slate-800 text-gray-400">
                            <tr>
                                <th className="px-4 py-3 border border-slate-700">Feature</th>
                                <th className="px-4 py-3 border border-slate-700 text-blue-400">GET</th>
                                <th className="px-4 py-3 border border-slate-700 text-green-400">POST</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-700">
                                <td className="px-4 py-3 font-semibold">Visibility</td>
                                <td className="px-4 py-3">Data in URL (Visible)</td>
                                <td className="px-4 py-3">Data in Body (Hidden)</td>
                            </tr>
                            <tr className="border-b border-slate-700">
                                <td className="px-4 py-3 font-semibold">Security</td>
                                <td className="px-4 py-3 text-red-400">Low (No passwords!)</td>
                                <td className="px-4 py-3 text-green-400">High (Encrypted)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-semibold">Use Case</td>
                                <td className="px-4 py-3">Search, Filtering</td>
                                <td className="px-4 py-3">Login, Upload</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Visual Diagram Restored */}
                    <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-4 w-full justify-center">
                                <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded border border-blue-500/50 text-sm">Form Submit</div>
                                <div className="h-px bg-gray-600 w-12 relative">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-gray-400">Method</div>
                                </div>
                                <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded border border-green-500/50 text-sm">Server</div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Advanced Attributes',
            icon: <FiType className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><code>pattern="[A-Za-z]{3}"</code>: Regex validation.</li>
                        <li><code>autocomplete="email"</code>: UX critical for autofill.</li>
                        <li><code>inputmode="numeric"</code>: Mobile number pad.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '4️⃣ Native Validation API',
            icon: <FiAlertCircle className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        HTML5 Built-in validation.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-blue-300">&lt;input</span> <span className="text-purple-400">type</span>=<span className="text-green-300">"password"</span> <span className="text-purple-400">minlength</span>=<span className="text-green-300">"8"</span> <span className="text-purple-400">required</span> <span className="text-blue-300">/&gt;</span>
                    </div>
                </div>
            ),
        },
        {
            title: '🚀 Advanced Example: Real-time Validation',
            icon: <FiPlay className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A complex registration form with Password Matching, Regex patterns, and custom error styling.
                    </p>

                    <a
                        href="/previews/fwd/advanced-form-validation.html"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-cyan-500/20"
                    >
                        <FiPlay className="w-4 h-4" />
                        ▶ Open Advanced Form
                    </a>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Difference between id and name?",
            solution: "`id` is for CSS/JS. `name` is the data key sent to the server.",
        },
    ],
    exampleProblems: [],
}

export default function HtmlFormsInputPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
