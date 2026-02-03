'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiType, FiImage, FiList, FiGrid, FiBox, FiPlay, FiCode } from 'react-icons/fi'

// Helper Component for Code + Preview
const CodePreview = ({ title, code, children }: { title: string, code: string, children: React.ReactNode }) => (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden mb-8 shadow-xl">
        <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <FiCode className="text-blue-400" /> {title}
            </span>
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Code Side */}
            <div className="bg-slate-950 p-4 border-b md:border-b-0 md:border-r border-slate-700 overflow-x-auto">
                <div className="text-xs text-gray-500 mb-2 font-mono uppercase tracking-wider">Source Code</div>
                <pre className="font-mono text-sm text-blue-300 whitespace-pre-wrap">
                    {code}
                </pre>
            </div>
            {/* Preview Side */}
            <div className="bg-slate-900 p-4 relative">
                <div className="text-xs text-gray-500 mb-2 font-mono uppercase tracking-wider">Browser Preview</div>
                <div className="p-6 bg-white rounded-lg text-slate-900 border border-slate-300 h-full min-h-[150px]">
                    {children}
                </div>
            </div>
        </div>
    </div>
)

const content = {
    title: 'HTML Content Tags',
    explanationSections: [
        {
            title: '1️⃣ Block vs Inline Elements',
            icon: <FiBox className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300 leading-relaxed">
                        Understanding how elements behave on the page is crucial. HTML divides most elements into two categories:
                        <strong className="text-red-400"> Block</strong> (structure builders) and
                        <strong className="text-blue-400"> Inline</strong> (text wrappers).
                    </p>

                    <CodePreview
                        title="Block Elements (div, p, h1)"
                        code={`<div style="background: red;">I am a DIV</div>
<p style="background: red;">I am a Paragraph.</p>`}
                    >
                        <div className="space-y-2">
                            <div className="bg-red-200 border border-red-400 p-2 text-red-900">I am a DIV (Block)</div>
                            <div className="bg-red-200 border border-red-400 p-2 text-red-900">I am a Paragraph.</div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Notice how they take up the <strong>full width</strong> and stack vertically.</p>
                    </CodePreview>

                    <CodePreview
                        title="Inline Elements (span, b, a)"
                        code={`<span style="background: blue;">I am a SPAN</span>
<a href="#" style="background: blue;">I am a LINK</a>`}
                    >
                        <div className="space-x-2">
                            <span className="bg-blue-200 border border-blue-400 p-1 text-blue-900">I am a SPAN</span>
                            <a href="#" className="bg-blue-200 border border-blue-400 p-1 text-blue-900 underline pointer-events-none">I am a LINK</a>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Notice how they sit <strong>side-by-side</strong> and only take necessary width.</p>
                    </CodePreview>
                </div>
            ),
        },
        {
            title: '2️⃣ Text Formatting',
            icon: <FiType className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        HTML has specific tags to change the <em>appearance</em> and <em>meaning</em> of text.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                            <h4 className="font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Physical Styles (Visual Only)</h4>
                            <ul className="space-y-3">
                                <li className="flex items-center justify-between bg-black/20 p-2 rounded">
                                    <code className="text-pink-400">&lt;b&gt;</code>
                                    <span className="text-gray-400">→</span>
                                    <b>Bold Text</b>
                                </li>
                                <li className="flex items-center justify-between bg-black/20 p-2 rounded">
                                    <code className="text-pink-400">&lt;i&gt;</code>
                                    <span className="text-gray-400">→</span>
                                    <i>Italic Text</i>
                                </li>
                                <li className="flex items-center justify-between bg-black/20 p-2 rounded">
                                    <code className="text-pink-400">&lt;u&gt;</code>
                                    <span className="text-gray-400">→</span>
                                    <u>Underlined</u>
                                </li>
                                <li className="flex items-center justify-between bg-black/20 p-2 rounded">
                                    <code className="text-pink-400">&lt;sup&gt;</code>
                                    <span className="text-gray-400">→</span>
                                    <span>X<sup>2</sup> (Superscript)</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-green-500/50 transition-colors">
                            <h4 className="font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Logical Styles (Semantic Meaning)</h4>
                            <div className="mb-3 text-xs text-yellow-500/80 bg-yellow-900/10 p-2 rounded border border-yellow-500/20">
                                ⚠ Important for Screen Readers & SEO!
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-center justify-between bg-black/20 p-2 rounded">
                                    <code className="text-green-400">&lt;strong&gt;</code>
                                    <span className="text-gray-400">→</span>
                                    <strong>Important Text</strong>
                                </li>
                                <li className="flex items-center justify-between bg-black/20 p-2 rounded">
                                    <code className="text-green-400">&lt;em&gt;</code>
                                    <span className="text-gray-400">→</span>
                                    <em>Emphasized Text</em>
                                </li>
                                <li className="flex items-center justify-between bg-black/20 p-2 rounded">
                                    <code className="text-green-400">&lt;mark&gt;</code>
                                    <span className="text-gray-400">→</span>
                                    <mark className="bg-yellow-200 text-black px-1 rounded">Highlighted</mark>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Lists & Tables (Data Organization)',
            icon: <FiList className="w-6 h-6" />,
            content: (
                <div className="space-y-8">
                    <CodePreview
                        title="Unordered & Ordered Lists"
                        code={`<ul>
  <li>☕ Coffee</li>
  <li>🍵 Tea</li>
</ul>

<ol>
  <li>Wake up</li>
  <li>Code</li>
</ol>`}
                    >
                        <div className="flex gap-8">
                            <div>
                                <h6 className="font-bold mb-1 underline">Unknown Order</h6>
                                <ul className="list-disc list-inside">
                                    <li>☕ Coffee</li>
                                    <li>🍵 Tea</li>
                                </ul>
                            </div>
                            <div>
                                <h6 className="font-bold mb-1 underline">Specific Order</h6>
                                <ol className="list-decimal list-inside">
                                    <li>Wake up</li>
                                    <li>Code</li>
                                </ol>
                            </div>
                        </div>
                    </CodePreview>

                    <CodePreview
                        title="Data Table"
                        code={`<table border="1">
  <tr>
    <th>Name</th>
    <th>Role</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>Admin</td>
  </tr>
</table>`}
                    >
                        <table className="w-full border-collapse border border-slate-400">
                            <thead>
                                <tr className="bg-slate-200">
                                    <th className="border border-slate-400 p-2 text-left font-bold">Name</th>
                                    <th className="border border-slate-400 p-2 text-left font-bold">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-slate-400 p-2">Alice</td>
                                    <td className="border border-slate-400 p-2">Admin</td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-400 p-2">Bob</td>
                                    <td className="border border-slate-400 p-2">User</td>
                                </tr>
                            </tbody>
                        </table>
                    </CodePreview>
                </div>
            ),
        },
        {
            title: '4️⃣ Multimedia Tags',
            icon: <FiPlay className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">Modern HTML can play audio and video natively without plugins.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Image Visual */}
                        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3 text-purple-400 font-bold">
                                <FiImage /> Image Tag
                            </div>
                            <code className="block bg-black/30 p-2 rounded text-xs text-purple-200 mb-4 font-mono">
                                &lt;img src="cat.jpg" alt="A cute cat" /&gt;
                            </code>
                            <div className="aspect-video bg-slate-800 rounded-lg flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-slate-600">
                                <FiImage className="w-12 h-12 mb-2 opacity-50" />
                                <span className="text-xs">Image renders here</span>
                            </div>
                        </div>

                        {/* Video Visual */}
                        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3 text-red-400 font-bold">
                                <FiPlay /> Video Tag
                            </div>
                            <code className="block bg-black/30 p-2 rounded text-xs text-red-200 mb-4 font-mono">
                                &lt;video controls src="movie.mp4"&gt;&lt;/video&gt;
                            </code>
                            <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-white relative group cursor-pointer overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                                    <FiPlay className="w-5 h-5 ml-1 fill-white" />
                                </div>
                                <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/30 rounded overflow-hidden">
                                    <div className="h-full w-1/3 bg-red-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Why should you use <strong> instead of <b>?",
            solution: "<b> only changes how text LOOKS (bold). <strong> changes what text MEANS (important). Screen readers for blind users will announce 'strong' text with more emphasis, improving accessibility.",
        },
        {
            question: "Which tag is used to create a numbered list?",
            solution: "<ol> (Ordered List). Use it when the sequence matters (like a recipe or ranking).",
        }
    ],
    exampleProblems: [],
}

export default function HTMLContentTagsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
