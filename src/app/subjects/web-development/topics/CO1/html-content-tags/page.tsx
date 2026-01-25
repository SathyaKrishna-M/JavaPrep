'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiList, FiType, FiLink, FiImage, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'HTML Content Tags',
    explanationSections: [
        {
            title: '1️⃣ Headings & Paragraphs',
            icon: <FiType className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Structure your text logically.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-blue-300">&lt;h1&gt;</span>Main Topic (Only 1 per page)<span className="text-blue-300">&lt;/h1&gt;</span><br />
                        <span className="text-blue-300">&lt;h2&gt;</span>Subtopic<span className="text-blue-300">&lt;/h2&gt;</span><br />
                        <span className="text-blue-300">&lt;h3&gt;</span>Section<span className="text-blue-300">&lt;/h3&gt;</span><br />
                        <span className="text-blue-300">&lt;p&gt;</span>This is a paragraph of text.<span className="text-blue-300">&lt;/p&gt;</span>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Lists',
            icon: <FiList className="w-6 h-6" />,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-yellow-500">
                        <h5 className="font-bold text-yellow-400 mb-2">Unordered (Bullet)</h5>
                        <code className="text-sm block text-gray-300">&lt;ul&gt;</code>
                        <code className="text-sm block text-gray-300">&nbsp;&nbsp;&lt;li&gt;Milk&lt;/li&gt;</code>
                        <code className="text-sm block text-gray-300">&lt;/ul&gt;</code>
                    </div>
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-purple-500">
                        <h5 className="font-bold text-purple-400 mb-2">Ordered (Number)</h5>
                        <code className="text-sm block text-gray-300">&lt;ol&gt;</code>
                        <code className="text-sm block text-gray-300">&nbsp;&nbsp;&lt;li&gt;Step 1&lt;/li&gt;</code>
                        <code className="text-sm block text-gray-300">&lt;/ol&gt;</code>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Links & Images',
            icon: <FiLink className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Essential attributes you must know.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-gray-500">&lt;!-- Link --&gt;</span><br />
                        <span className="text-blue-300">&lt;a</span> <span className="text-purple-400">href</span>=<span className="text-green-300">"https://google.com"</span> <span className="text-purple-400">target</span>=<span className="text-green-300">"_blank"</span><span className="text-blue-300">&gt;</span>Visit Google<span className="text-blue-300">&lt;/a&gt;</span><br /><br />
                        <span className="text-gray-500">&lt;!-- Image --&gt;</span><br />
                        <span className="text-blue-300">&lt;img</span> <span className="text-purple-400">src</span>=<span className="text-green-300">"cat.jpg"</span> <span className="text-purple-400">alt</span>=<span className="text-green-300">"A cute white cat"</span> <span className="text-blue-300">/&gt;</span>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Block vs Inline',
            icon: <FiCheckCircle className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 space-y-6">
                        {/* Block */}
                        <div>
                            <h5 className="text-sm font-bold text-gray-400 mb-2">Block Elements (Width: 100%)</h5>
                            <div className="space-y-2">
                                <div className="bg-blue-500/20 border border-blue-500 text-blue-300 p-2 text-center text-sm rounded">&lt;h1&gt; Heading</div>
                                <div className="bg-blue-500/20 border border-blue-500 text-blue-300 p-2 text-center text-sm rounded">&lt;p&gt; Paragraph</div>
                                <div className="bg-blue-500/20 border border-blue-500 text-blue-300 p-2 text-center text-sm rounded">&lt;div&gt; Division</div>
                            </div>
                        </div>

                        {/* Inline */}
                        <div>
                            <h5 className="text-sm font-bold text-gray-400 mb-2">Inline Elements (Width: Content)</h5>
                            <div className="bg-slate-800 p-4 rounded border border-slate-600 text-gray-300 leading-8">
                                Normal text with a
                                <span className="mx-1 bg-green-500/20 border border-green-500 text-green-300 px-2 py-0.5 rounded text-sm">&lt;span&gt;</span>
                                and a
                                <span className="mx-1 bg-green-500/20 border border-green-500 text-green-300 px-2 py-0.5 rounded text-sm">&lt;a&gt;link&lt;/a&gt;</span>
                                inside it. They flow in the same line.
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Why is the `alt` attribute mandatory for images?",
            solution: "1. Accessibility for blind users (Screen readers read it). 2. It shows if the image fails to load. 3. SEO ranking.",
        },
        {
            question: "What is the difference between an Absolute and Relative path?",
            solution: "Absolute = Full URL (https://domain.com/file). Relative = file path inside your folder structure (/images/logo.png).",
        },
    ],
    exampleProblems: [],
}

export default function HtmlContentTagsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
