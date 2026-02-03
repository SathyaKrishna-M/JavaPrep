'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCode, FiLayout, FiSidebar, FiTag, FiKey } from 'react-icons/fi'

const content = {
    title: 'HTML Document Structure',
    explanationSections: [
        {
            title: '1️⃣ Anatomy of an HTML Element',
            icon: <FiTag className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        Before understanding the whole page, let's dissect a single piece.
                    </p>

                    {/* Visual Anatomy */}
                    <div className="bg-slate-900 border border-slate-700 p-8 rounded-xl flex flex-col items-center">
                        <div className="flex items-center gap-2 text-2xl md:text-4xl font-mono font-bold">
                            <div className="flex flex-col items-center group relative">
                                <span className="text-blue-400">&lt;p</span>
                                <span className="absolute -top-8 text-xs font-sans text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">Start Tag</span>
                            </div>

                            <div className="flex flex-col items-center group relative">
                                <span className="text-yellow-400">class</span>
                                <span className="text-white">=</span>
                                <span className="text-green-400">"text"</span>
                                <span className="text-blue-400">&gt;</span>
                                <div className="absolute -bottom-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-sans text-yellow-400">Attribute</span>
                                    <span className="text-xs font-sans text-green-400">Value</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center group relative px-2">
                                <span className="text-white">Hello</span>
                                <span className="absolute -top-8 text-xs font-sans text-white opacity-0 group-hover:opacity-100 transition-opacity">Content</span>
                            </div>

                            <div className="flex flex-col items-center group relative">
                                <span className="text-blue-400">&lt;/p&gt;</span>
                                <span className="absolute -top-8 text-xs font-sans text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">End Tag</span>
                            </div>
                        </div>
                        <p className="mt-8 text-xs text-gray-500 uppercase tracking-widest hover:text-gray-300 transition-colors cursor-help">Hover over the code parts</p>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ The Document Skeleton',
            icon: <FiLayout className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Code View */}
                        <div className="bg-slate-950 p-6 rounded-lg font-mono text-sm border border-slate-800 shadow-lg">
                            <div className="text-gray-500 italic mb-2">&lt;!-- The minimal requirement --&gt;</div>
                            <div className="pl-0 text-gray-500">&lt;!DOCTYPE html&gt;</div>
                            <div className="pl-0 text-blue-400">&lt;html&gt;</div>

                            <div className="pl-4 border-l border-white/10 ml-1.5 my-1">
                                <div className="text-purple-400">&lt;head&gt;</div>
                                <div className="pl-4 text-gray-400">&lt;title&gt;Page Title&lt;/title&gt;</div>
                                <div className="text-purple-400">&lt;/head&gt;</div>
                            </div>

                            <div className="pl-4 border-l border-white/10 ml-1.5 my-1">
                                <div className="text-green-400">&lt;body&gt;</div>
                                <div className="pl-4 text-white">&lt;h1&gt;My Heading&lt;/h1&gt;</div>
                                <div className="pl-4 text-white">&lt;p&gt;My Content&lt;/p&gt;</div>
                                <div className="text-green-400">&lt;/body&gt;</div>
                            </div>

                            <div className="pl-0 text-blue-400">&lt;/html&gt;</div>
                        </div>

                        {/* Explanation Blocks */}
                        <div className="space-y-4">
                            <div className="flex gap-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                                <div className="text-2xl">🧠</div>
                                <div>
                                    <h5 className="font-bold text-purple-300">&lt;head&gt; The Brain</h5>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Invisible to users. Contains settings, title (for the tab), and links to CSS/JS files.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <div className="text-2xl">💪</div>
                                <div>
                                    <h5 className="font-bold text-green-300">&lt;body&gt; The Body</h5>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Visible content. Everything you see on the screen (text, images, buttons) goes here.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        }
    ],
    practiceQuestions: [
        {
            question: "What is the purpose of the <head> tag?",
            solution: "It acts as a container for metadata (data about data). It holds things like the page title, links to CSS files, and character set definitions, which are not directly displayed to the user in the main view area.",
        },
        {
            question: "Why doesn't the <br> tag have an end tag?",
            solution: "Because <br> is a Void (Empty) element. Its only purpose is to insert a line break; it doesn't need to 'contain' or wrap around any text.",
        }
    ],
    exampleProblems: [],
}

export default function HTMLStructurePage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
