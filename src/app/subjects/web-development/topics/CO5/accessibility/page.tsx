'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiEye, FiNavigation, FiVolume2, FiPlay, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Accessibility (A11y)',
    explanationSections: [
        {
            title: '1️⃣ What is A11y?',
            icon: <FiEye className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Accessibility means making your site usable for <strong>everyone</strong>, including people with disabilities (vision, motor, hearing).
                        "A11y" stands for A + 11 letters + y.
                    </p>
                </div>
            ),
        },
        {
            title: '2️⃣ Key Practices',
            icon: <FiNavigation className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>Semantic HTML:</strong> Use <code>&lt;button&gt;</code> for buttons, not <code>&lt;div&gt;</code>. Buttons have built-in keyboard support.</li>
                        <li><strong>Alt Text:</strong> Describe images for blind users (Screen Readers).</li>
                        <li><strong>Contrast:</strong> Ensure text stands out against the background (readability).</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '3️⃣ ARIA (Accessible Rich Internet Applications)',
            icon: <FiVolume2 className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Attributes used to give extra meaning to custom elements.
                        Use only when Semantic HTML isn't enough.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-blue-300">&lt;div</span> <span className="text-purple-400">role</span>=<span className="text-green-300">"alert"</span><span className="text-blue-300">&gt;</span>Error!<span className="text-blue-300">&lt;/div&gt;</span>
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
                        Try navigating the preview using ONLY your keyboard (Tab key). Notice the focus rings.
                    </p>

                    <a
                        href="/previews/fwd/accessibility.html"
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
                            <span><strong>No Mouse Challenge</strong>: Try to use your site without a mouse. If you can't, it's not accessible.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>Never remove outline on focus (<code>outline: none</code>) unless you replace it with a custom focus style.</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is `alt` text used for?",
            solution: "1. Screen readers read it to blind users. 2. It displays if the image fails to load. 3. SEO.",
        },
    ],
    exampleProblems: [],
}

export default function AccessibilityPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
