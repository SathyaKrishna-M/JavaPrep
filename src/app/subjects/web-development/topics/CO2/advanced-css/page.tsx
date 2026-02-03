'use client'

import React from 'react'
import DMTopicPage from '@/components/DMTopicPage'
import { FiZap, FiType, FiCode, FiMousePointer } from 'react-icons/fi'

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
                <div className="p-6 bg-white rounded-lg text-slate-900 border border-slate-300 h-full min-h-[150px] flex flex-col justify-center items-center">
                    {children}
                </div>
            </div>
        </div>
    </div>
)

const content = {
    title: 'Advanced CSS',
    explanationSections: [
        {
            title: '1️⃣ Pseudo-Classes (Interaction)',
            icon: <FiMousePointer className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        Pseudo-classes let you style an element based on its <strong>state</strong> (e.g., when a user hovers over it).
                    </p>

                    <CodePreview
                        title=":hover, :active, :focus"
                        code={`/* Change color on hover */
button:hover {
  background-color: blue;
  color: white;
  transform: scale(1.1);
}

/* Change on click */
button:active {
  background-color: darkblue;
}

/* When typing inside */
input:focus {
  border: 2px solid blue;
  outline: none;
}`}
                    >
                        <div className="flex flex-col gap-4 items-center">
                            <button className="px-4 py-2 bg-gray-200 rounded transition-all hover:bg-blue-500 hover:text-white hover:scale-110 active:bg-blue-800">
                                Hover Me!
                            </button>
                            <input
                                type="text"
                                placeholder="Click inside me..."
                                className="border border-gray-400 rounded px-2 py-1 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                    </CodePreview>

                    <CodePreview
                        title="Structural Pseudo-classes"
                        code={`/* Style every 2nd item */
li:nth-child(even) {
  background-color: #f0f0f0;
}

/* Style the very first item */
li:first-child {
  font-weight: bold;
  color: red;
}`}
                    >
                        <ul className="w-full text-sm border rounded">
                            <li className="p-2 border-b text-red-600 font-bold">1. First Item (:first-child)</li>
                            <li className="p-2 border-b bg-gray-100">2. Second Item (:nth-child(even))</li>
                            <li className="p-2 border-b">3. Third Item</li>
                            <li className="p-2 border-b bg-gray-100">4. Fourth Item (:nth-child(even))</li>
                            <li className="p-2">5. Fifth Item</li>
                        </ul>
                    </CodePreview>
                </div>
            ),
        },
        {
            title: '2️⃣ Typography Details',
            icon: <FiType className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">Refining text makes it more readable.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
                            <h6 className="text-purple-400 font-bold mb-2">line-height</h6>
                            <div className="bg-white p-3 rounded text-slate-800 text-xs">
                                <p className="leading-none mb-4 border-b pb-2">
                                    <span className="text-red-500 font-bold">Low (1):</span> This text is cramped.The lines are too close together. It is hard to read long blocks of text like this.
                                </p>
                                <p className="leading-loose">
                                    <span className="text-green-500 font-bold">High (2):</span> This text breathes. The lines have space between them. Much better for reading.
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
                            <h6 className="text-blue-400 font-bold mb-2">font-weight</h6>
                            <div className="bg-white p-3 rounded text-slate-800 text-sm space-y-2">
                                <p className="font-light">Light (300)</p>
                                <p className="font-normal">Normal (400)</p>
                                <p className="font-semibold">Semi-Bold (600)</p>
                                <p className="font-bold">Bold (700)</p>
                                <p className="font-black">Black (900)</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "What does the selector `div > p` target?",
            solution: "It targets all <p> elements that are DIRECT children of a <div>. It will NOT select a <p> if it's nested deeper inside another tag within the div.",
        },
    ],
    exampleProblems: [],
}

export default function AdvancedCSSPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
