'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiRefreshCw, FiGrid, FiArrowRight, FiCheckSquare } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Circular Queue',
    explanationSections: [
        {
            title: '1️⃣ The Problem with Linear Queue',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        In a fixed-size Linear Queue (Array implementation), if we keep enqueueing and dequeueing, the <code>front</code> tracks forward.
                        Eventually, <code>rear</code> hits the end of the array. Even if there are empty spots before <code>front</code>, we cannot use them (unless we shift all elements, which is <MathRenderer math="O(n)" />).
                    </p>
                    <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
                        <p className="text-red-300 text-sm">
                            Linear Queue Saturation: <code>[Empty, Empty, Data, Data, Data (Rear)]</code>. Rear is at end. Cannot insert more!
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Circular Queue Solution',
            icon: <FiRefreshCw className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">Circular Queue</span> treats the array as a ring.
                        When <code>rear</code> reaches the end, it wraps around to the beginning (index 0) if it's empty.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">The Magic Formula (Modulo):</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>Next Position:</strong> <code>(index + 1) % capacity</code></li>
                            <li><strong>Front Move:</strong> <code>front = (front + 1) % capacity</code></li>
                            <li><strong>Rear Move:</strong> <code>rear = (rear + 1) % capacity</code></li>
                        </ul>
                    </div>
                    {/* Additional Operations */}
                    <div className="mt-4 bg-slate-800/30 p-3 rounded border border-slate-700 flex gap-4 flex-wrap">
                        <div>
                            <span className="text-purple-400 font-bold text-sm">peek()</span>
                            <span className="text-gray-400 text-sm ml-2">Returns front element (<code>arr[front]</code>).</span>
                        </div>
                        <div className="border-l border-slate-600 pl-4">
                            <span className="text-purple-400 font-bold text-sm">isEmpty()</span>
                            <span className="text-gray-400 text-sm ml-2">True if <code>size == 0</code>.</span>
                        </div>
                        <div className="border-l border-slate-600 pl-4">
                            <span className="text-purple-400 font-bold text-sm">isFull()</span>
                            <span className="text-gray-400 text-sm ml-2">True if <code>size == capacity</code>.</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Implementation',
            icon: <FiArrowRight className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <CodeBlock
                        language="java"
                        code={`class CircularQueue {
    int[] arr;
    int front, rear, size, capacity;

    CircularQueue(int n) {
        capacity = n;
        arr = new int[n];
        front = 0;
        rear = -1;
        size = 0;
    }

    void enqueue(int x) {
        if (size == capacity) throw new RuntimeException("Overflow");
        rear = (rear + 1) % capacity;
        arr[rear] = x;
        size++;
    }

    int dequeue() {
        if (size == 0) throw new RuntimeException("Underflow");
        int res = arr[front];
        front = (front + 1) % capacity;
        size--;
        return res;
    }
}`}
                    />
                    <div className="space-y-2 mt-4">
                        <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm">
                            <p className="text-yellow-200 font-semibold mb-1">Important Implementation Details:</p>
                            <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                                <li><strong>Initial State:</strong> When empty, <code>rear = -1</code> and <code>front = 0</code>. Elements are accessed only when <code>size &gt; 0</code>.</li>
                                <li><strong>Why use `size`?</strong> It helps distinguish between full and empty conditions clearly, avoiding ambiguity when <code>front == rear</code>.</li>
                                <li><strong>Comparison:</strong> Unlike linear queues, circular queues efficiently reuse freed memory slots.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Complexity Analysis',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-800/50 text-cyan-400">
                            <tr>
                                <th className="px-4 py-3">Operation</th>
                                <th className="px-4 py-3">Time Complexity</th>
                                <th className="px-4 py-3">Space Used</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 text-gray-300">
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Enqueue</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2">Reuses empty slots</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Dequeue</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ),
        },
        {
            title: '5️⃣ Applications of Circular Queue',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="bg-purple-900/10 p-4 rounded-lg border border-purple-500/20">
                    <ul className="space-y-3 text-sm text-gray-300">
                        <li><strong className="text-purple-300">CPU Scheduling:</strong> Round-Robin scheduling uses a circular queue to cycle through processes.</li>
                        <li><strong className="text-purple-300">Streaming Buffers:</strong> Audio/Video buffering where old data is replaced by new data.</li>
                        <li><strong className="text-purple-300">Traffic Lights:</strong> Cycling through signals (Red &rarr; Green &rarr; Yellow).</li>
                        <li><strong className="text-purple-300">Multiplayer Games:</strong> Managing turn-based systems.</li>
                    </ul>
                </div>
            )
        },
        {
            title: '6️⃣ Common Mistakes',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="bg-red-900/10 p-4 rounded-lg border border-red-500/30">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                        <li>Forgetting the <strong>modulo operator</strong> <code>%</code> when incrementing indices.</li>
                        <li>Confusing "Queue Full" vs "Queue Empty" conditions (especially without a <code>size</code> variable).</li>
                        <li>Infinite loops when traversing if the termination condition is wrong.</li>
                        <li>Not checking for <code>Underflow</code> before dequeuing.</li>
                    </ul>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "How to check if Circular Queue is full?",
            solution: "If we maintain a 'size' variable: size == capacity. If not using size variable: (rear + 1) % capacity == front.",
        },
        {
            question: "What is the main advantage over Linear Queue?",
            solution: "Memory efficiency. It utilizes the empty space created by dequeuing elements at the front.",
        },
        {
            question: "Real world example of Circular Queue?",
            solution: "Traffic light system (Red -> Green -> Yellow -> Red), CPU process scheduling (Round Robin), Keyboard buffer.",
        }
    ],
    exampleProblems: [],
}

export default function CircularQueuePage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
