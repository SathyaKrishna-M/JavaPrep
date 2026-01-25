'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiPackage, FiHash, FiSettings, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Modern CSS & Frameworks',
    explanationSections: [
        {
            title: '1️⃣ CSS Variables (Custom Properties)',
            icon: <FiHash className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The foundation of theming.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        :root {'{'} --primary: #3b82f6; {'}'}<br />
                        .card {'{'} color: var(--primary); {'}'}
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Modern Features',
            icon: <FiSettings className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><code>calc(100% - 20px)</code>: Math in CSS.</li>
                        <li><code>backdrop-filter: blur(10px)</code>: Glassmorphism effect.</li>
                        <li><code>@media (prefers-color-scheme: dark)</code>: Dark mode detection.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '3️⃣ Frameworks',
            icon: <FiPackage className="w-6 h-6" />,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-purple-500">
                        <h5 className="font-bold text-purple-400 mb-2">Bootstrap</h5>
                        <p className="text-xs text-gray-400">Pre-built components (Cards, Navs). Quick but generic.</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-cyan-500">
                        <h5 className="font-bold text-cyan-400 mb-2">Tailwind CSS</h5>
                        <p className="text-xs text-gray-400">Utility classes (mt-4, flex). Flexible and modern.</p>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is SCSS?",
            solution: "Sassy CSS. A preprocessor that adds Nesting, Mixins, and Functions to CSS.",
        },
    ],
    exampleProblems: [],
}

export default function ModernCssPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
