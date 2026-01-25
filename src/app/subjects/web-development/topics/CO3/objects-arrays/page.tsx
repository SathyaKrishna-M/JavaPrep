'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBox, FiList, FiFilter, FiPlay, FiLayers, FiShield, FiCopy } from 'react-icons/fi'

const content = {
    title: 'Objects & Arrays',
    explanationSections: [
        {
            title: '1️⃣ Safe Navigation (Optional Chaining)',
            icon: <FiShield className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Stop checking `if (user && user.address && ...)`
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        const zip = user<span className="text-green-400">?.</span>address<span className="text-green-400">?.</span>zipcode;<br />
                        <span className="text-gray-500">// Returns undefined instead of Throwing Error if null.</span>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Copying Objects (Shallow vs Deep)',
            icon: <FiCopy className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 rounded border-l-4 border-yellow-500">
                            <h5 className="font-bold text-yellow-400 mb-2">Shallow Copy (...)</h5>
                            <code className="text-xs block text-gray-300">
                                const copy = {'{'} ...original {'}'};
                            </code>
                            <p className="text-[10px] text-gray-500 mt-2">Nested objects are still linked by reference!</p>
                        </div>
                        <div className="bg-slate-800 p-4 rounded border-l-4 border-green-500">
                            <h5 className="font-bold text-green-400 mb-2">Deep Copy</h5>
                            <code className="text-xs block text-gray-300">
                                const deep = serializedClone(obj);
                            // or JSON.parse(JSON.stringify(obj))
                            </code>
                            <p className="text-[10px] text-gray-500 mt-2">Totally independent copy.</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Array Pipeline',
            icon: <FiList className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Visualize how .map(), .filter(), and .reduce() transform data.
                    </p>

                    <a
                        href="/previews/js/array-methods-visualizer.html"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-cyan-500/20"
                    >
                        <FiPlay className="w-4 h-4" />
                        ▶ Open Array Visualizer
                    </a>
                </div>
            ),
        },
        {
            title: '4️⃣ Prototypes (Inheritance)',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    {/* Visual Diagram */}
                    <div className="flex flex-col items-center gap-2 font-mono text-sm">
                        <div className="bg-purple-500/20 border border-purple-500 px-4 py-2 rounded text-purple-300">
                            myDog
                        </div>
                        <div className="text-gray-500">↓ __proto__</div>
                        <div className="bg-blue-500/20 border border-blue-500 px-4 py-2 rounded text-blue-300">
                            Dog.prototype
                        </div>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Does `...` copy nested arrays?",
            solution: "No. The spread operator does a SHALLOW copy. Nested arrays/objects still point to the same memory.",
        },
    ],
    exampleProblems: [],
}

export default function ObjectsArraysPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
