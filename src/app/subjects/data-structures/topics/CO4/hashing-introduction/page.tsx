'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiHash, FiSearch, FiDatabase, FiCheckSquare } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Introduction to Hashing',
    explanationSections: [
        {
            title: '1️⃣ What is Hashing?',
            icon: <FiHash className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <span className="text-cyan-400 font-semibold">Hashing</span> is a technique used to uniquely identify a specific object from a group of similar objects.
                        It maps large data sets of variable length (keys) to a fixed-size data set (hash values or indices) using a mathematical function called a <strong>Hash Function</strong>.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">The Goal:</p>
                        <p className="text-gray-300 text-sm">
                            To insert, search, and delete elements in <MathRenderer math="O(1)" /> (constant time) on average, which is faster than trees <MathRenderer math="O(\log n)" /> or arrays <MathRenderer math="O(n)" />.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Key Terminologies',
            icon: <FiDatabase className="w-6 h-6" />,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-purple-400 font-bold mb-2">Hash Table</h5>
                        <p className="text-gray-300 text-sm">
                            An array that stores pointers to records corresponding to a given search key.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-yellow-400 font-bold mb-2">Hash Function</h5>
                        <p className="text-gray-300 text-sm">
                            A function <code>h(x)</code> that converts a given key <code>x</code> into a slot index in the hash table.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-red-400 font-bold mb-2">Collision</h5>
                        <p className="text-gray-300 text-sm">
                            When two different keys generate the same hash index. i.e., <code>h(k1) == h(k2)</code> where <code>k1 ≠ k2</code>.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-green-400 font-bold mb-2">Load Factor (α)</h5>
                        <p className="text-gray-300 text-sm">
                            The ratio of elements stored to the size of the hash table. <MathRenderer math="\alpha = n / m" />.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Static vs Dynamic Hashing',
            icon: <FiSearch className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Hashing can be classified based on how the table size is handled.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                        <li>
                            <strong className="text-orange-300">Static Hashing:</strong> The size of the hash table is fixed. If it gets full, performance degrades or operations fail.
                        </li>
                        <li>
                            <strong className="text-teal-300">Dynamic Hashing:</strong> The hash table grows or shrinks as needed (e.g., Rehashing, Extendible Hashing) to maintain a low load factor.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            title: '4️⃣ Applications of Hashing',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                    <li>Implementing Hash Maps and Sets (e.g., <code>HashMap</code> in Java).</li>
                    <li>Database indexing for fast retrieval.</li>
                    <li>Cryptography (Password hashing like SHA-256).</li>
                    <li>Caches (e.g., Browser cache).</li>
                    <li>Compiler Symbol Tables.</li>
                </ul>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "What is a Perfect Hash Function?",
            solution: "A hash function that maps each valid input to a different value, resulting in ZERO collisions. It is difficult to achieve in practice for unknown datasets.",
        },
        {
            question: "Why is Prime Number preferred for Hash Table size?",
            solution: "Using a prime number helps distribute keys more uniformly across the table, reducing the likelihood of collisions, especially with modular hashing.",
        },
        {
            question: "Time complexity of Search in Hash Table?",
            solution: "Average Case: O(1). Worst Case: O(n) (if all keys collide and form a chain).",
        }
    ],
    exampleProblems: [],
}

export default function HashingIntroductionPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
