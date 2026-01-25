'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiArrowRight, FiUsers, FiMinimize2, FiCheckSquare } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Queue ADT & Operations',
    explanationSections: [
        {
            title: '1️⃣ What is a Queue?',
            icon: <FiArrowRight className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">Queue</span> is a linear data structure that follows the <strong>FIFO (First In, First Out)</strong> principle.
                        The element added first is the one removed first.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Real-world Analogy:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li>A line of people waiting for a bus.</li>
                            <li>Printer task queue.</li>
                            <li>CPU scheduling (First-Come, First-Served).</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Primary Operations',
            icon: <FiMinimize2 className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-green-400 font-bold mb-2">Enqueue</h5>
                            <p className="text-gray-300 text-sm">Add an element to the <strong>REAR</strong> of the queue.</p>
                            <p className="text-xs text-gray-500 mt-1">Overflow if full.</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-red-400 font-bold mb-2">Dequeue</h5>
                            <p className="text-gray-300 text-sm">Remove an element from the <strong>FRONT</strong> of the queue.</p>
                            <p className="text-xs text-gray-500 mt-1">Underflow if empty.</p>
                        </div>
                    </div>
                    {/* Additional Operations */}
                    <div className="bg-slate-800/30 p-3 rounded border border-slate-700 flex gap-4 flex-wrap">
                        <div>
                            <span className="text-purple-400 font-bold text-sm">peek()</span>
                            <span className="text-gray-400 text-sm ml-2">Returns front element without removing.</span>
                        </div>
                        <div className="border-l border-slate-600 pl-4">
                            <span className="text-purple-400 font-bold text-sm">isEmpty()</span>
                            <span className="text-gray-400 text-sm ml-2">True if queue size is 0.</span>
                        </div>
                        <div className="border-l border-slate-600 pl-4">
                            <span className="text-purple-400 font-bold text-sm">isFull()</span>
                            <span className="text-gray-400 text-sm ml-2">True if capacity reached (Array).</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Array Implementation (Simple)',
            icon: <FiUsers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        We maintain <code>front</code> and <code>rear</code> indices.
                    </p>
                    <CodeBlock
                        language="java"
                        code={`class ArrayQueue {
    int[] arr;
    int front, rear, capacity;

    ArrayQueue(int size) {
        arr = new int[size];
        capacity = size;
        front = -1; 
        rear = -1;
    }

    void enqueue(int x) {
        if (rear == capacity - 1) throw new RuntimeException("Overflow");
        if (front == -1) front = 0;
        arr[++rear] = x;
    }

    int dequeue() {
        if (front == -1 || front > rear) throw new RuntimeException("Underflow");
        return arr[front++];
    }
}`}
                    />
                    <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm">
                        <p className="text-yellow-200 font-semibold mb-1">Important Limitation:</p>
                        <p className="text-gray-300">
                            In a simple array queue, <strong>freed spaces at the front cannot be reused</strong> once <code>rear</code> reaches the limit.
                            Even if the queue is empty, if <code>rear == capacity - 1</code>, we get Overflow.
                        </p>
                        <p className="text-cyan-400 mt-2 text-xs">
                            👉 To overcome this space wastage, we use <strong>Circular Queues</strong>.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Linked List Implementation',
            icon: <FiArrowRight className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        No size limit. Efficient <MathRenderer math="O(1)" /> operations.
                    </p>
                    <CodeBlock
                        language="java"
                        code={`class LinkedQueue {
    Node front, rear;

    void enqueue(int data) {
        Node newNode = new Node(data);
        if (rear == null) {
            front = rear = newNode;
            return;
        }
        rear.next = newNode;
        rear = newNode;
    }

    int dequeue() {
        if (front == null) throw new RuntimeException("Empty");
        int temp = front.data;
        front = front.next;
        if (front == null) rear = null;
        return temp;
    }
}`}
                    />
                </div>
            ),
        },
        {
            title: '5️⃣ Complexity Analysis',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-800/50 text-cyan-400">
                                <tr>
                                    <th className="px-4 py-3">Operation</th>
                                    <th className="px-4 py-3">Array Queue</th>
                                    <th className="px-4 py-3">Linked Queue</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-gray-300">
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-blue-300">Enqueue</td>
                                    <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                    <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-blue-300">Dequeue</td>
                                    <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                    <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-blue-300">Peek</td>
                                    <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                    <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-gray-400">
                        * Array Queue has <strong>O(1)</strong> time but inefficient space reuse compared to Linked List.
                    </p>
                </div>
            ),
        },
        {
            title: '6️⃣ Applications of Queue',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="bg-purple-900/10 p-4 rounded-lg border border-purple-500/20">
                    <ul className="space-y-3 text-sm text-gray-300">
                        <li><strong className="text-purple-300">CPU Scheduling:</strong> Processes handled in First-Come, First-Served (FCFS) order.</li>
                        <li><strong className="text-purple-300">IO Buffering:</strong> Keyboard keystrokes or disk requests.</li>
                        <li><strong className="text-purple-300">Print Spooling:</strong> Documents printed in order of request.</li>
                        <li><strong className="text-purple-300">Breadth-First Search (BFS):</strong> Graph traversal algorithm.</li>
                    </ul>
                </div>
            )
        },
        {
            title: '7️⃣ Common Mistakes',
            icon: <FiMinimize2 className="w-6 h-6" />,
            content: (
                <div className="bg-red-900/10 p-4 rounded-lg border border-red-500/30">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                        <li>Forgetting to handle <strong>Underflow</strong> (Dequeuing from empty) or <strong>Overflow</strong>.</li>
                        <li>Confusing <code>front</code> (removal) and <code>rear</code> (insertion) ends.</li>
                        <li>Not checking <code>front &gt; rear</code> condition in simple array implementation.</li>
                        <li>Assuming Simple Array Queue reuses space (it doesn't!).</li>
                    </ul>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Difference between Stack and Queue?",
            solution: "Stack is LIFO (Last In First Out), Queue is FIFO (First In First Out). Stack uses push/pop, Queue uses enqueue/dequeue.",
        },
        {
            question: "Why is Linked List preferred over Simple Array for Queue?",
            solution: "Simple Array Queue wastes space (deleted slots at front cannot be reused easily). Linked List Queue is dynamic and avoids this issue.",
        },
        {
            question: "How to implement Queue using 2 Stacks?",
            solution: "Enqueue: Push to Stack1. Dequeue: If Stack2 is empty, pop all from Stack1 and push to Stack2. Then pop from Stack2.",
        }
    ],
    exampleProblems: [],
}

export default function QueueADTPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
