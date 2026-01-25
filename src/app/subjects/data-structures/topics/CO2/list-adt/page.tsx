'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiList, FiGrid, FiLayers, FiMinimize2, FiCheckSquare, FiAlertTriangle } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
    title: 'List ADT & Introduction',
    explanationSections: [
        {
            title: '1️⃣ What is a List ADT?',
            icon: <FiList className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">List ADT</span> (Abstract Data Type) is a sequence of elements where each element has a position.
                        It defines the logical requirements for a list, regardless of how it is effectively implemented.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Primary Operations:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>get(index):</strong> Return element at the specified position.</li>
                            <li><strong>set(index, element):</strong> Replace the element at the specified position.</li>
                            <li><strong>insert(index, element):</strong> Insert an element at the specified position.</li>
                            <li><strong>remove(index):</strong> Delete element at the specified position.</li>
                            <li><strong>search(element):</strong> Find the position of an element (indexOf).</li>
                            <li><strong>traverse():</strong> Iterate through all elements in the list.</li>
                            <li><strong>size():</strong> Return number of elements.</li>
                            <li><strong>isEmpty():</strong> Check if the list has no elements.</li>
                            <li><strong>clear():</strong> Remove all elements.</li>
                        </ul>
                        <p className="text-gray-400 text-xs mt-3 italic border-t border-blue-500/30 pt-2">
                            <strong>Note:</strong> The List ADT specifies <em>what</em> operations are allowed, not <em>how</em> they are implemented. Shifting elements occurs only in array-based implementations.
                        </p>
                    </div>
                    <div className="bg-orange-500/10 p-3 rounded border-l-4 border-orange-500">
                        <p className="text-orange-200 text-sm font-semibold">
                            ⚠️ Time complexity is not defined at the ADT level; it depends on the underlying implementation.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Array Implementation of Lists',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Lists can be implemented using <span className="text-teal-400">Arrays</span>.
                        In Java, this is seen in the <code>ArrayList</code> class.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-green-400 font-bold mb-2">Advantages</h5>
                            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                                <li><strong>Random Access:</strong> <MathRenderer math="O(1)" /> access to any element via index.</li>
                                <li><strong>Memory Efficient:</strong> No pointers needed, just data.</li>
                                <li><strong>Cache Locality:</strong> Contiguous memory improves CPU cache performance.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-red-400 font-bold mb-2">Disadvantages</h5>
                            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                                <li><strong>Slow Insertion/Deletion:</strong> <MathRenderer math="O(n)" />. Requires shifting elements.</li>
                                <li><strong>Fixed Size (Static):</strong> Standard arrays can't resize. Resizing a dynamic array takes <MathRenderer math="O(n)" /> time when capacity is exceeded.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Linked List Implementation',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-purple-400">Linked List</span> consists of nodes where each node contains <strong>data</strong> and a <strong>reference (pointer)</strong> to the next node.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="p-3 bg-purple-900 border border-purple-500 rounded text-xs text-white text-center">
                                Data | Next
                            </div>
                            <span>➡️</span>
                            <div className="p-3 bg-purple-900 border border-purple-500 rounded text-xs text-white text-center">
                                Data | Next
                            </div>
                            <span>➡️</span>
                            <span className="text-gray-500">Null</span>
                        </div>
                        <p className="text-gray-400 text-xs absolute bottom-1 right-2">Each node stores data and a reference to the next node.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-green-400 font-bold mb-2">Advantages</h5>
                            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                                <li><strong>Dynamic Size:</strong> Can grow/shrink at runtime. No waste.</li>
                                <li><strong>Fast Insertion/Deletion:</strong> <MathRenderer math="O(1)" /> if pointer is known (no shifting).</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-red-400 font-bold mb-2">Disadvantages</h5>
                            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                                <li><strong>No Random Access:</strong> <MathRenderer math="O(n)" /> to access <MathRenderer math="k^{th}" /> element.</li>
                                <li><strong>Extra Memory:</strong> Pointers consume extra space per node.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Comparison: Array vs Linked List',
            icon: <FiAlertTriangle className="w-6 h-6" />,
            content: (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-800/50 text-cyan-400">
                            <tr>
                                <th className="px-4 py-3">Operation</th>
                                <th className="px-4 py-3">Array (ArrayList)</th>
                                <th className="px-4 py-3">Linked List</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 text-gray-300">
                            <tr className="bg-slate-900/30">
                                <td className="px-4 py-2 font-semibold text-blue-300">Access Element</td>
                                <td className="px-4 py-2 text-green-400 font-mono">O(1)</td>
                                <td className="px-4 py-2 text-red-400 font-mono">O(n)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Insert at Start</td>
                                <td className="px-4 py-2 text-red-400 font-mono">O(n)</td>
                                <td className="px-4 py-2 text-green-400 font-mono">O(1)</td>
                            </tr>
                            <tr className="bg-slate-900/30">
                                <td className="px-4 py-2 font-semibold text-blue-300">Insert at End</td>
                                <td className="px-4 py-2 text-green-400 font-mono">O(1)*</td>
                                <td className="px-4 py-2 text-green-400 font-mono">O(1)**</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Insert in Middle</td>
                                <td className="px-4 py-2 text-red-400 font-mono">O(n)</td>
                                <td className="px-4 py-2 text-green-400 font-mono">O(1)***</td>
                            </tr>
                            <tr className="bg-slate-900/30">
                                <td className="px-4 py-2 font-semibold text-blue-300">Delete Element</td>
                                <td className="px-4 py-2 text-red-400 font-mono">O(n)</td>
                                <td className="px-4 py-2 text-green-400 font-mono">O(1)***</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-2 text-xs text-gray-500 space-y-1">
                        <p>* Amortized time (might require resizing).</p>
                        <p>** If tail pointer is maintained.</p>
                        <p>*** Assuming we already have the pointer to the node/location.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '5️⃣ Applications of List ADT',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                        <li><strong>Managing Dynamic Collections:</strong> Storing items where the total number is unknown (e.g., Shopping Cart).</li>
                        <li><strong>Undo/Redo Operations:</strong> Maintaining a sequence of states.</li>
                        <li><strong>Playlists:</strong> Managing songs in a specific order.</li>
                        <li><strong>Browser History:</strong> Storing visited pages in sequence.</li>
                        <li><strong>Polynomial Representation:</strong> Storing coefficients and exponents (CO2 Topic).</li>
                    </ul>
                </div>
            )
        },
        {
            title: '6️⃣ Summary & Common Mistakes',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                        <h5 className="text-green-300 font-bold mb-2">Summary</h5>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>List ADT:</strong> High-level definition of a sequence.</li>
                            <li><strong>Implementation:</strong> Can be done via Arrays or Linked Lists.</li>
                            <li><strong>Trade-off:</strong> Arrays = Fast Access. Linked Lists = Fast Modification.</li>
                        </ul>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "When should you prefer a Linked List over an Array?",
            solution: "1) When you don't know the size of data beforehand. 2) When you need frequent insertion/deletion from the beginning or middle of the list.",
        },
        {
            question: "Is 'Linked List' an ADT?",
            solution: "Strictly speaking, 'List' is the ADT. 'Linked List' is a data structure implementing that ADT. However, the term is often used interchangeably.",
        },
        {
            question: "Why is accessing the 100th element in a Linked List slower than in an Array?",
            solution: "In an array, address = base + (index * size), calculated in O(1). In a Linked List, you must traverse 99 pointers sequentially to reach the 100th node, which is O(n).",
        }
    ],
    exampleProblems: [],
}

export default function ListADTPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
