'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiLayers, FiMousePointer, FiMaximize, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Advanced CSS',
    explanationSections: [
        {
            title: '1️⃣ Pseudo-classes & Elements',
            icon: <FiMousePointer className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Style elements based on their state or position.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 rounded border-l-4 border-pink-500">
                            <h5 className="font-bold text-pink-400 mb-2">Pseudo-classes (:)</h5>
                            <code className="text-sm block text-gray-300">a:hover <span className="text-gray-500">// Mouse over</span></code>
                            <code className="text-sm block text-gray-300">input:valid <span className="text-gray-500">// Form state</span></code>
                        </div>
                        <div className="bg-slate-800 p-4 rounded border-l-4 border-purple-500">
                            <h5 className="font-bold text-purple-400 mb-2">Pseudo-elements (::)</h5>
                            <code className="text-sm block text-gray-300">p::first-line <span className="text-gray-500">// First line</span></code>
                            <code className="text-sm block text-gray-300">div::before <span className="text-gray-500">// Insert content</span></code>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Specificity Wars (Exam Critical)',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Who wins when styles conflict?
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <ol className="list-decimal list-inside space-y-2">
                            <li><span className="text-pink-400">!important</span> (The Nuclear Option)</li>
                            <li><span className="text-orange-400">Inline Styles</span> (style="...") - 1000 pts</li>
                            <li><span className="text-blue-400">ID Selector</span> (#id) - 100 pts</li>
                            <li><span className="text-green-400">Class/Attribute</span> (.class) - 10 pts</li>
                            <li><span className="text-gray-400">Tag Selector</span> (div) - 1 pt</li>
                        </ol>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Z-Index (Stacking)',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Controls vertical stacking order. Requires <code>position</code> (relative/absolute/fixed/sticky).
                    </p>

                    {/* Visual Diagram */}
                    <div className="bg-slate-900 p-8 rounded-lg border border-slate-700 flex items-center justify-center perspective-1000">
                        <div className="relative w-32 h-32">
                            <div className="absolute top-0 left-0 w-24 h-24 bg-red-500 shadow-lg flex items-center justify-center font-bold text-white z-0 rounded">
                                z=1
                            </div>
                            <div className="absolute top-4 left-4 w-24 h-24 bg-blue-500 shadow-lg flex items-center justify-center font-bold text-white z-10 rounded">
                                z=2
                            </div>
                            <div className="absolute top-8 left-8 w-24 h-24 bg-green-500 shadow-lg flex items-center justify-center font-bold text-white z-20 rounded">
                                z=3
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Combinators',
            icon: <FiMaximize className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><code>div p</code> (Descendant): Any p inside div.</li>
                        <li><code>div &gt; p</code> (Child): Direct child only.</li>
                        <li><code>div + p</code> (Adjacent): Immediately following.</li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is `position: sticky`?",
            solution: "It acts like `relative` until you scroll past it, then it becomes `fixed` (stuck to the top). Great for headers.",
        },
    ],
    exampleProblems: [],
}

export default function AdvancedCssPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
