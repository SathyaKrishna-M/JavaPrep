'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiHash, FiActivity, FiCheckCircle, FiCpu, FiDollarSign } from 'react-icons/fi'

const content = {
    title: 'Number Literals',
    explanationSections: [
        {
            title: '1️⃣ Parsing & Formatting',
            icon: <FiDollarSign className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Converting strings to numbers and back.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        parseInt(<span className="text-green-300">"10px"</span>) <span className="text-gray-500">// 10</span><br />
                        Number(<span className="text-green-300">"10px"</span>)   <span className="text-gray-500">// NaN (Strict)</span><br />
                        (2500).toLocaleString() <span className="text-gray-500">// "2,500"</span>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ The Math Object',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                        <div className="bg-slate-800 p-2 rounded border border-slate-700">
                            Math.round(4.5) -&gt; <span className="text-green-300">5</span>
                        </div>
                        <div className="bg-slate-800 p-2 rounded border border-slate-700">
                            Math.max(1, 9, 2) -&gt; <span className="text-green-300">9</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Special Values',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>NaN:</strong> "Not a Number".</li>
                        <li><strong>Infinity:</strong> Divided by zero.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '4️⃣ Binary & Hex',
            icon: <FiHash className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-2 rounded text-center border border-blue-500/50">
                            <div className="text-lg font-bold text-blue-400">0xA</div>
                            <div className="text-xs text-gray-400">Hex (10)</div>
                        </div>
                        <div className="bg-slate-800 p-2 rounded text-center border border-green-500/50">
                            <div className="text-lg font-bold text-green-400">0b101</div>
                            <div className="text-xs text-gray-400">Binary (5)</div>
                        </div>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Difference between parseInt and Number?",
            solution: "Number() is stricter. parseInt() parses until it hits a non-number character.",
        },
    ],
    exampleProblems: [],
}

export default function NumberLiteralsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
