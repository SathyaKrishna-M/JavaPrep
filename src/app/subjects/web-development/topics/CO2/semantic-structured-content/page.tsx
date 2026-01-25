'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiLayout, FiBookOpen, FiGrid, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Semantic & Structured Content',
    explanationSections: [
        {
            title: '1️⃣ Semantic vs Non-Semantic',
            icon: <FiLayout className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <strong>Semantic:</strong> <code>&lt;article&gt;</code> (Has meaning).<br />
                        <strong>Non-Semantic:</strong> <code>&lt;div&gt;</code> (Just a box).
                    </p>

                    {/* Visual Diagram Restored */}
                    <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 flex flex-col gap-2 max-w-sm mx-auto font-mono text-xs uppercase text-center font-bold">
                        <div className="bg-purple-500/20 border border-purple-500 text-purple-300 p-3 rounded">
                            &lt;header&gt;
                        </div>
                        <div className="flex gap-2 h-32">
                            <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-300 w-1/4 flex items-center justify-center rounded writing-vertical">
                                &lt;nav&gt;
                            </div>
                            <div className="bg-blue-500/20 border border-blue-500 text-blue-300 flex-1 flex flex-col gap-2 p-2 rounded justify-center">
                                &lt;main&gt;
                                <div className="bg-blue-400/10 border border-blue-400/30 text-blue-200 p-2 rounded text-[10px]">
                                    &lt;article&gt;
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-500/20 border border-gray-500 text-gray-400 p-3 rounded">
                            &lt;footer&gt;
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Article vs Section vs Div (Exam Favorite)',
            icon: <FiBookOpen className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <table className="w-full text-sm text-left text-gray-300 border-collapse border border-slate-700">
                        <thead className="text-xs uppercase bg-slate-800 text-gray-400">
                            <tr>
                                <th className="px-4 py-3 border border-slate-700">Tag</th>
                                <th className="px-4 py-3 border border-slate-700">Meaning</th>
                                <th className="px-4 py-3 border border-slate-700">Example Use</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-700">
                                <td className="px-4 py-3 font-mono text-purple-400">&lt;article&gt;</td>
                                <td className="px-4 py-3">Self-contained content.</td>
                                <td className="px-4 py-3">Blog post, Product card.</td>
                            </tr>
                            <tr className="border-b border-slate-700">
                                <td className="px-4 py-3 font-mono text-blue-400">&lt;section&gt;</td>
                                <td className="px-4 py-3">Thematic grouping.</td>
                                <td className="px-4 py-3">"About Us", "Contact".</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-gray-400">&lt;div&gt;</td>
                                <td className="px-4 py-3">No meaning.</td>
                                <td className="px-4 py-3">Layout wrappers.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ),
        },
        {
            title: '3️⃣ Other Important Tags',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><code>&lt;aside&gt;</code>: Sidebar/Ads.</li>
                        <li><code>&lt;figure&gt;</code>: Images with caption.</li>
                        <li><code>&lt;time&gt;</code>: Machine dates.</li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Why not use <div> for everything?",
            solution: "Accessibility (Screen readers) and SEO (Google ranking).",
        },
    ],
    exampleProblems: [],
}

export default function SemanticStructuredContentPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
