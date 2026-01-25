'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiTrendingUp, FiTrendingDown, FiCpu, FiCheckSquare, FiGrid } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Priority Queues & Heaps',
    explanationSections: [
        {
            title: '1️⃣ What is a Priority Queue?',
            icon: <FiTrendingUp className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">Priority Queue</span> is an abstract data structure where each element has a "priority".
                        The element with the <strong>highest</strong> (or lowest) priority is served before an element with lower priority.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Example:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li>Hospital Emergency Room: Patients with severe injuries treated first.</li>
                            <li>OS Task Scheduling: High-priority system processes run before user apps.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Binary Heap',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-purple-400 font-semibold">Binary Heap</span> is a Complete Binary Tree used to implement Priority Queues efficiently.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-green-400 font-bold mb-2 flex items-center gap-2"><FiTrendingUp /> Max Heap</h5>
                            <p className="text-gray-300 text-sm">
                                Root node is <strong>greater</strong> than or equal to its children. The largest element is always at the root.
                            </p>
                            <p className="text-xs text-gray-500 mt-2 font-mono">Arr[i] &ge; Arr[2*i+1] && Arr[i] &ge; Arr[2*i+2]</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-red-400 font-bold mb-2 flex items-center gap-2"><FiTrendingDown /> Min Heap</h5>
                            <p className="text-gray-300 text-sm">
                                Root node is <strong>smaller</strong> than or equal to its children. The smallest element is always at the root.
                            </p>
                            <p className="text-xs text-gray-500 mt-2 font-mono">Arr[i] &le; Arr[2*i+1] && Arr[i] &le; Arr[2*i+2]</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Array Representation of Heaps',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Since it's a complete binary tree, we can map it to an array:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                        <li><strong>Parent(i):</strong> <code>(i - 1) / 2</code></li>
                        <li><strong>Left Child(i):</strong> <code>2 * i + 1</code></li>
                        <li><strong>Right Child(i):</strong> <code>2 * i + 2</code></li>
                    </ul>
                </div>
            ),
        },
        {
            title: '4️⃣ Heap Operations & Complexity',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-800/50 text-cyan-400">
                            <tr>
                                <th className="px-4 py-3">Operation</th>
                                <th className="px-4 py-3">Time Complexity</th>
                                <th className="px-4 py-3">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 text-gray-300">
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Insert</td>
                                <td className="px-4 py-2 text-yellow-400"><MathRenderer math="O(\log n)" /></td>
                                <td className="px-4 py-2">Add at end, then "Heapify Up".</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Delete Max/Min</td>
                                <td className="px-4 py-2 text-yellow-400"><MathRenderer math="O(\log n)" /></td>
                                <td className="px-4 py-2">Replace root with last leaf, "Heapify Down".</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Peek Max/Min</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2">Return the root element.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Build Heap</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(n)" /></td>
                                <td className="px-4 py-2">Optimized algorithm to build heap from random array.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ),
        },
        {
            title: '5️⃣ Heap Sort',
            icon: <FiTrendingUp className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        An efficient sorting algorithm using Heap.
                    </p>
                    <ol className="list-decimal list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>Build Max Heap</strong> from the input array.</li>
                        <li>Swap the Root (Max) with the Last element. Decrease heap size.</li>
                        <li><strong>Heapify Down</strong> the new root to maintain heap property.</li>
                        <li>Repeat steps 2-3 until heap size is 1.</li>
                    </ol>
                    <p className="text-gray-400 text-xs mt-2">Total Time Complexity: <MathRenderer math="O(n \log n)" />. Space: <MathRenderer math="O(1)" /> (In-place).</p>
                </div>
            ),
        }
    ],
    practiceQuestions: [
        {
            question: "Is a BST (Binary Search Tree) also a Heap?",
            solution: "No. In BST, left child < parent < right child. In Max Heap, both children < parent. There is no ordering between siblings in a Heap.",
        },
        {
            question: "Why use Array for Heap instead of Node-based Tree?",
            solution: "Since Heap is a Complete Binary Tree, array Representation is space-efficient (no pointers) and provides better cache locality.",
        },
        {
            question: "What is 'Heapify'?",
            solution: "It's the process of rearranging the elements to satisfy the Heap Property (Max or Min) after an insertion or deletion.",
        }
    ],
    exampleProblems: [],
}

export default function PriorityQueuesHeapsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
