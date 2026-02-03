'use client'

import React, { useState } from 'react'
import DMTopicPage from '@/components/DMTopicPage'
import { FiLayout, FiSidebar, FiGrid, FiCode, FiMusic, FiVideo, FiPlay, FiPause } from 'react-icons/fi'

// Helper Component
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
            <div className="bg-slate-950 p-4 border-b md:border-b-0 md:border-r border-slate-700 overflow-x-auto text-xs font-mono">
                <div className="text-gray-500 mb-2 font-sans uppercase tracking-wider text-[10px]">Source Code</div>
                <pre className="text-blue-300 whitespace-pre-wrap">{code}</pre>
            </div>
            <div className="bg-slate-900 p-4 relative">
                <div className="text-gray-500 mb-2 font-sans uppercase tracking-wider text-[10px]">Live Preview</div>
                <div className="p-6 bg-white rounded-lg text-slate-900 border border-slate-300 h-full min-h-[150px] flex flex-col justify-center">
                    {children}
                </div>
            </div>
        </div>
    </div>
)

// Multimedia Player Simulator
const MediaPlayer = ({ type }: { type: 'audio' | 'video' }) => {
    const [playing, setPlaying] = useState(false)

    return (
        <div className="bg-slate-800 p-4 rounded-lg flex flex-col items-center gap-4 w-full">
            {type === 'video' ? (
                <div className="aspect-video bg-black w-full rounded flex items-center justify-center relative overflow-hidden group">
                    {playing ? (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-pulse flex items-center justify-center">
                            <span className="text-white font-bold drop-shadow-md">Video Playing...</span>
                        </div>
                    ) : (
                        <div className="text-gray-500 text-xs">Thumbnail</div>
                    )}
                    {!playing && <FiPlay className="absolute text-white w-12 h-12 opacity-80" />}
                </div>
            ) : (
                <div className="w-full bg-slate-700 h-12 rounded-full flex items-center px-4 gap-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        <FiMusic />
                    </div>
                    <div className="flex-1 h-2 bg-slate-600 rounded overflow-hidden">
                        <div className={`h-full bg-blue-400 ${playing ? 'w-2/3 animate-pulse' : 'w-0'}`}></div>
                    </div>
                </div>
            )}

            <div className="flex gap-4">
                <button
                    onClick={() => setPlaying(!playing)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center gap-2 text-xs font-bold transition-all"
                >
                    {playing ? <><FiPause /> Pause</> : <><FiPlay /> Play</>}
                </button>
                <span className="text-xs text-gray-400 self-center">
                    Simulated {type === 'video' ? 'MP4' : 'MP3'} Player
                </span>
            </div>
        </div>
    )
}

const content = {
    title: 'Semantic & Structured Content',
    explanationSections: [
        {
            title: '1️⃣ Why Semantics Matter?',
            icon: <FiLayout className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        <strong>Semantic HTML</strong> means using tags that describe their meaning (e.g., <code>&lt;header&gt;</code> instead of <code>&lt;div&gt;</code>). This helps Search Engines (SEO) and Screen Readers (Accessibility).
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <h5 className="font-bold text-red-400 text-center">❌ Bad (Div Soup)</h5>
                            <div className="bg-slate-800 p-4 rounded border border-red-500/30 opacity-75">
                                <div className="bg-gray-700 text-gray-400 p-2 mb-2 text-xs text-center">&lt;div id="header"&gt;</div>
                                <div className="bg-gray-700 text-gray-400 p-8 mb-2 text-xs text-center">&lt;div id="content"&gt;</div>
                                <div className="bg-gray-700 text-gray-400 p-2 text-xs text-center">&lt;div id="footer"&gt;</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h5 className="font-bold text-green-400 text-center">✅ Good (Semantic)</h5>
                            <div className="bg-slate-800 p-4 rounded border border-green-500/30">
                                <div className="bg-green-500/20 text-green-300 border border-green-500/50 p-2 mb-2 text-xs text-center font-bold">&lt;header&gt;</div>
                                <div className="flex gap-2 mb-2">
                                    <div className="bg-blue-500/20 text-blue-300 border border-blue-500/50 p-6 flex-1 text-center text-xs font-bold">&lt;main&gt;</div>
                                    <div className="bg-purple-500/20 text-purple-300 border border-purple-500/50 p-6 w-1/3 text-center text-xs font-bold">&lt;aside&gt;</div>
                                </div>
                                <div className="bg-orange-500/20 text-orange-300 border border-orange-500/50 p-2 text-xs text-center font-bold">&lt;footer&gt;</div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Semantic Tables',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        Use <code>rowspan</code> and <code>colspan</code> to merge cells in complex tables.
                    </p>
                    <CodePreview
                        title="Merged Cells Example"
                        code={`<table border="1">
  <tr>
    <th colspan="2">Header spans 2 Cols</th>
  </tr>
  <tr>
    <td>A</td>
    <td>B</td>
  </tr>
  <tr>
    <td rowspan="2">Vertical Span</td>
    <td>C</td>
  </tr>
  <tr>
    <td>D</td>
  </tr>
</table>`}
                    >
                        <table className="w-full border-collapse border border-slate-400 text-sm text-center">
                            <thead className="bg-slate-200 font-bold">
                                <tr><th colSpan={2} className="border border-slate-400 p-2 bg-yellow-200">Header spans 2 Cols (colspan="2")</th></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-slate-400 p-2">A</td>
                                    <td className="border border-slate-400 p-2">B</td>
                                </tr>
                                <tr>
                                    <td rowSpan={2} className="border border-slate-400 p-2 bg-blue-100 align-middle">Vertical Span (rowspan="2")</td>
                                    <td className="border border-slate-400 p-2">C</td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-400 p-2">D</td>
                                </tr>
                            </tbody>
                        </table>
                    </CodePreview>
                </div>
            )
        },
        {
            title: '3️⃣ Multimedia Tags',
            icon: <FiVideo className="w-6 h-6" />,
            content: (
                <div className="space-y-8">
                    <p className="text-gray-300">
                        HTML5 introduced native tags for playing media files directly in the browser.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Audio */}
                        <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
                            <div className="flex items-center gap-2 mb-3 text-blue-400 font-bold border-b border-slate-700 pb-2">
                                <FiMusic /> Audio Player
                            </div>
                            <code className="block text-xs text-gray-500 mb-4 bg-black/30 p-2 rounded">
                                &lt;audio controls src="song.mp3"&gt;
                            </code>
                            <MediaPlayer type="audio" />
                        </div>

                        {/* Video */}
                        <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
                            <div className="flex items-center gap-2 mb-3 text-purple-400 font-bold border-b border-slate-700 pb-2">
                                <FiVideo /> Video Player
                            </div>
                            <code className="block text-xs text-gray-500 mb-4 bg-black/30 p-2 rounded">
                                &lt;video controls width="100%"&gt;
                            </code>
                            <MediaPlayer type="video" />
                        </div>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Why use <article> instead of <section>?",
            solution: "Use <article> if the content makes sense on its own (like a blog post or tweet). Use <section> if it's just a part of a larger whole (like 'Chapter 1' of a book).",
        }
    ],
    exampleProblems: [],
}

export default function SemanticsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
