'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiMinimize2, FiBarChart2, FiCheckSquare } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
    title: 'Comparative Evaluation',
    explanationSections: [
        {
            title: '1️⃣ Time Complexity Comparison',
            icon: <FiBarChart2 className="w-6 h-6" />,
            content: (
                <div className="overflow-x-auto">
                    <p className="text-gray-300 mb-4">
                        Comparing the Big-O performance of basic operations across different linear data structures.
                    </p>
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-800/50 text-cyan-400">
                            <tr>
                                <th className="px-4 py-3">Data Structure</th>
                                <th className="px-4 py-3">Access (Index)</th>
                                <th className="px-4 py-3">Search (Value)</th>
                                <th className="px-4 py-3">Insert</th>
                                <th className="px-4 py-3">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 text-gray-300">
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Array</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2 text-red-400"><MathRenderer math="O(n)" /></td>
                                <td className="px-4 py-2 text-red-400"><MathRenderer math="O(n)" /></td>
                                <td className="px-4 py-2 text-red-400"><MathRenderer math="O(n)" /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Linked List</td>
                                <td className="px-4 py-2 text-red-400"><MathRenderer math="O(n)" /></td>
                                <td className="px-4 py-2 text-red-400"><MathRenderer math="O(n)" /></td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" />*</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" />*</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Stack / Queue</td>
                                <td className="px-4 py-2 text-gray-500">N/A</td>
                                <td className="px-4 py-2 text-red-400"><MathRenderer math="O(n)" /></td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Hash Table</td>
                                <td className="px-4 py-2 text-gray-500">N/A</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 mt-2">* Assuming we already have a pointer to the location.</p>
                </div>
            ),
        },
        {
            title: '2️⃣ When to use what?',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-blue-300 font-bold mb-2">Use Arrays when...</h5>
                            <ul className="list-disc list-inside text-gray-400 text-sm">
                                <li>You need fast access by index.</li>
                                <li>The number of elements is known ahead of time.</li>
                                <li>Memory is tight (no overhead for pointers).</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-blue-300 font-bold mb-2">Use Linked Lists when...</h5>
                            <ul className="list-disc list-inside text-gray-400 text-sm">
                                <li>You need constant-time insertions/deletions.</li>
                                <li>The size of the data is unknown or dynamic.</li>
                                <li>You don't need random access.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-blue-300 font-bold mb-2">Use Stacks/Queues when...</h5>
                            <ul className="list-disc list-inside text-gray-400 text-sm">
                                <li>The order of processing matters (LIFO or FIFO).</li>
                                <li>You want to restrict access to the data.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-blue-300 font-bold mb-2">Use Hash Tables when...</h5>
                            <ul className="list-disc list-inside text-gray-400 text-sm">
                                <li>You need fast lookups by key.</li>
                                <li>Order of elements doesn't matter.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Space Complexity Trade-off',
            icon: <FiMinimize2 className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                        <p className="text-yellow-200 font-semibold mb-2">Memory Overhead:</p>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                            <li><strong>Arrays:</strong> Very distinct memory usage. No overhead.</li>
                            <li><strong>Linked Lists:</strong> Extra memory for <code>next</code> (and <code>prev</code>) pointers.</li>
                            <li><strong>Hash Tables:</strong> Potential wasted space in empty slots (load factor) or overhead for chaining.</li>
                        </ul>
                    </div>
                </div>
            ),
        }
    ],
    practiceQuestions: [
        {
            question: "Why not always use Hash Tables since they are O(1)?",
            solution: "1. No ordering of elements. 2. Worse worst-case O(n). 3. Higher constant factor overhead. 4. Iteration is slower.",
        },
        {
            question: "When is a Linked List arguably better than an Array for 'Search'?",
            solution: "Strictly speaking, never for random values. But if the list is self-adjusting (Move-to-Front heuristic) and we obey locality of reference, it can be competitive.",
        },
        {
            question: "Which data structure is recursive in nature?",
            solution: "Linked List (and Trees). A list is a node followed by a list.",
        }
    ],
    exampleProblems: [],
}

export default function ComparativeEvaluationPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
