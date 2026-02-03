'use client'

import React, { useState } from 'react'
import DMTopicPage from '@/components/DMTopicPage'
import { FiLayout, FiGrid, FiCode, FiBox } from 'react-icons/fi'

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
                <div className="p-6 bg-white rounded-lg text-slate-900 border border-slate-300 h-full min-h-[150px]">
                    {children}
                </div>
            </div>
        </div>
    </div>
)

const DisplayVisualizer = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800 p-4 rounded border border-slate-700">
                <div className="text-red-400 font-bold mb-2 flex items-center gap-2"><FiBox /> display: block</div>
                <div className="bg-slate-900 p-2 rounded space-y-2">
                    <div className="bg-red-500/20 text-red-300 border border-red-500 p-1 text-xs text-center w-full">I take full width</div>
                    <div className="bg-red-500/20 text-red-300 border border-red-500 p-1 text-xs text-center w-full">I stack below</div>
                </div>
                <p className="text-[10px] text-gray-500 mt-2">Like &lt;div&gt;, &lt;p&gt;, &lt;h1&gt;</p>
            </div>

            <div className="bg-slate-800 p-4 rounded border border-slate-700">
                <div className="text-blue-400 font-bold mb-2 flex items-center gap-2"><FiLayout /> display: inline</div>
                <div className="bg-slate-900 p-2 rounded">
                    <span className="bg-blue-500/20 text-blue-300 border border-blue-500 p-1 text-xs">Width ignored</span>
                    <span className="bg-blue-500/20 text-blue-300 border border-blue-500 p-1 text-xs">Side by Side</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-2">Like &lt;span&gt;, &lt;a&gt;, &lt;b&gt;</p>
            </div>

            <div className="bg-slate-800 p-4 rounded border border-slate-700">
                <div className="text-purple-400 font-bold mb-2 flex items-center gap-2"><FiGrid /> inline-block</div>
                <div className="bg-slate-900 p-2 rounded">
                    <div className="bg-purple-500/20 text-purple-300 border border-purple-500 p-1 text-xs inline-block w-16 h-10 align-middle mr-1">Resized</div>
                    <div className="bg-purple-500/20 text-purple-300 border border-purple-500 p-1 text-xs inline-block w-16 h-10 align-middle">Side by Side</div>
                </div>
                <p className="text-[10px] text-gray-500 mt-2">Best of both worlds (Buttons)</p>
            </div>
        </div>
    )
}

const FlexboxPlayground = () => {
    const [justify, setJustify] = useState('flex-start')
    const [align, setAlign] = useState('stretch')

    const justifyMap: any = {
        'flex-start': 'justify-start',
        'center': 'justify-center',
        'flex-end': 'justify-end',
        'space-between': 'justify-between',
        'space-around': 'justify-around'
    }
    const alignMap: any = {
        'stretch': 'items-stretch',
        'flex-start': 'items-start',
        'center': 'items-center',
        'flex-end': 'items-end'
    }

    const code = `.container {
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  height: 200px;
}`

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700">
                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">justify-content (X-axis)</label>
                    <select
                        value={justify}
                        onChange={(e) => setJustify(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-600 rounded p-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    >
                        <option value="flex-start">flex-start</option>
                        <option value="center">center</option>
                        <option value="flex-end">flex-end</option>
                        <option value="space-between">space-between</option>
                        <option value="space-around">space-around</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">align-items (Y-axis)</label>
                    <select
                        value={align}
                        onChange={(e) => setAlign(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-600 rounded p-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    >
                        <option value="stretch">stretch</option>
                        <option value="flex-start">flex-start</option>
                        <option value="center">center</option>
                        <option value="flex-end">flex-end</option>
                    </select>
                </div>
            </div>

            <CodePreview title="Interactive Flex Container" code={code}>
                <div className={`flex w-full h-[150px] bg-slate-100 border-2 border-dashed border-slate-300 ${justifyMap[justify]} ${alignMap[align]}`}>
                    <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center font-bold m-1 rounded shadow transform transition-transform hover:scale-110">1</div>
                    <div className="w-12 h-16 bg-purple-500 text-white flex items-center justify-center font-bold m-1 rounded shadow transform transition-transform hover:scale-110">2</div>
                    <div className="w-12 h-10 bg-green-500 text-white flex items-center justify-center font-bold m-1 rounded shadow transform transition-transform hover:scale-110">3</div>
                </div>
            </CodePreview>
        </div>
    )
}

const content = {
    title: 'Layout Systems',
    explanationSections: [
        {
            title: '1️⃣ The Display Property',
            icon: <FiBox className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        Before Flexbox or Grid, everything relies on <code>display</code>. It determines on how element behaves in the document flow.
                    </p>
                    <DisplayVisualizer />
                </div>
            )
        },
        {
            title: '2️⃣ Flexbox (1D Layout)',
            icon: <FiLayout className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        <strong>Flexbox</strong> is designed for laying out items in a <em>single dimension</em> (either in a row or a column). It's perfect for navigation bars, centering items, and card lists.
                    </p>

                    <FlexboxPlayground />
                </div>
            ),
        },
        {
            title: '3️⃣ CSS Grid (2D Layout)',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        <strong>CSS Grid</strong> turns the page into a 2D system of rows and columns. It's more powerful than Flexbox for overall page layouts.
                    </p>

                    <CodePreview
                        title="Basic Grid Layout"
                        code={`.container {
  display: grid;
  grid-template-columns: 1fr 2fr; /* 1st col takes 1 part, 2nd takes 2 parts */
  gap: 10px;
}`}
                    >
                        <div className="grid grid-cols-[1fr_2fr] gap-2 h-[150px]">
                            <div className="bg-red-200 border border-red-400 p-2 text-red-900 flex items-center justify-center font-bold">1fr</div>
                            <div className="bg-blue-200 border border-blue-400 p-2 text-blue-900 flex items-center justify-center font-bold">2fr (Twice as big)</div>
                            <div className="bg-purple-200 border border-purple-400 p-2 text-purple-900 flex items-center justify-center font-bold col-span-2">col-span-2 (Full Width)</div>
                        </div>
                    </CodePreview>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "When should you use Grid over Flexbox?",
            solution: "Use CAN Grid when you need precise control over BOTH rows and columns at the same time (2D). Use Flexbox for lining things up in one direction (1D) or simple alignment.",
        }
    ],
    exampleProblems: [],
}

export default function LayoutSystemsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
