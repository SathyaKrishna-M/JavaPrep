'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiLink, FiGrid, FiList, FiAlertTriangle, FiCheckSquare } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Collision Resolution',
    explanationSections: [
        {
            title: '1️⃣ The Collision Problem',
            icon: <FiAlertTriangle className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A collision occurs when <MathRenderer math="h(k1) = h(k2)" />. Since we cannot store two values in the same slot, we need a strategy to handle this.
                    </p>
                    <p className="text-gray-300">
                        Two main strategies: <strong>Separate Chaining</strong> (Open Hashing) and <strong>Open Addressing</strong> (Closed Hashing).
                    </p>
                </div>
            ),
        },
        {
            title: '2️⃣ Separate Chaining (Open Hashing)',
            icon: <FiLink className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Each slot in the hash table points to a <strong>Linked List</strong> of entries that map to the same slot.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                            <li><strong>Insert:</strong> Add to the head of the list at index <code>h(k)</code>. <MathRenderer math="O(1)" />.</li>
                            <li><strong>Search:</strong> Scan the list at index <code>h(k)</code>. <MathRenderer math="O(\lambda)" /> where <MathRenderer math="\lambda" /> is load factor.</li>
                            <li><strong>Delete:</strong> Remove from the list.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Open Addressing (Closed Hashing)',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        All elements are stored <strong>directly in the hash table array</strong>. If a collision occurs, we probe for the next empty slot using a probe sequence.
                    </p>
                    <div className="space-y-3">
                        <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                            <h6 className="text-blue-300 font-bold text-sm">Linear Probing</h6>
                            <p className="text-xs text-gray-400">Check next slot: <MathRenderer math="(h(k) + i) \mod m" /> for <MathRenderer math="i=0, 1, 2..." /></p>
                            <p className="text-xs text-red-400 mt-1">Problem: Primary Clustering.</p>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                            <h6 className="text-blue-300 font-bold text-sm">Quadratic Probing</h6>
                            <p className="text-xs text-gray-400">Check slots with quadratic gaps: <MathRenderer math="(h(k) + i^2) \mod m" /></p>
                            <p className="text-xs text-red-400 mt-1">Problem: Secondary Clustering.</p>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                            <h6 className="text-blue-300 font-bold text-sm">Double Hashing</h6>
                            <p className="text-xs text-gray-400">Use a second hash function for step size: <MathRenderer math="(h1(k) + i \cdot h2(k)) \mod m" /></p>
                            <p className="text-xs text-green-400 mt-1">Best Probe Sequence.</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Comparison',
            icon: <FiList className="w-6 h-6" />,
            content: (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-800/50 text-cyan-400">
                            <tr>
                                <th className="px-4 py-3">Feature</th>
                                <th className="px-4 py-3">Separate Chaining</th>
                                <th className="px-4 py-3">Open Addressing</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 text-gray-300">
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Storage</td>
                                <td className="px-4 py-2">External (Linked Lists)</td>
                                <td className="px-4 py-2">Internal (Table Slots)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Load Factor</td>
                                <td className="px-4 py-2">Can be {'>'} 1</td>
                                <td className="px-4 py-2">Must be &le; 1</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Sensitivity to Clustering</td>
                                <td className="px-4 py-2">Low</td>
                                <td className="px-4 py-2">High (especially Linear)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ),
        }
    ],
    practiceQuestions: [
        {
            question: "What is Primary Clustering?",
            solution: "A phenomenon in Linear Probing where occupied slots build up long runs, increasing the search time for future collisions.",
        },
        {
            question: "Why does Double Hashing require h2(k) to be non-zero and relatively prime to m?",
            solution: "To ensure that the probe sequence creates a full cycle and visits all slots, rather than getting stuck in a short loop or skipping slots.",
        },
        {
            question: "When to choose Separate Chaining?",
            solution: "When the number of keys is not known in advance or when deletions are frequent (deletions in Open Addressing are complex/inefficient).",
        }
    ],
    exampleProblems: [],
}

export default function CollisionResolutionPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
