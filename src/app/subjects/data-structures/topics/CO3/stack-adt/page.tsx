'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiLayers, FiArrowUp, FiArrowDown, FiMinimize2, FiCheckSquare, FiTerminal } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Stack ADT & Operations',
    explanationSections: [
        {
            title: '1️⃣ What is a Stack?',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">Stack</span> is a linear data structure that follows the <strong>LIFO (Last In, First Out)</strong> principle.
                        The element inserted last is the first one to be removed.
                    </p>
                    <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30">
                        <p className="text-yellow-200 text-sm font-semibold">Note on ADT vs Implementation</p>
                        <p className="text-gray-300 text-sm">
                            The <strong>Stack ADT</strong> defines <em>what</em> operations are allowed (push, pop, peek), not <em>how</em> to store data.
                            Arrays and Linked Lists are just two ways to implement this behavior.
                        </p>
                    </div>

                    {/* Visual Representation */}
                    <div className="flex justify-center py-4">
                        <div className="flex flex-col-reverse items-center justify-end w-32 border-b-4 border-l-4 border-r-4 border-gray-500 min-h-[120px] rounded-b-lg p-2 gap-1 bg-black/20">
                            <div className="bg-cyan-600 text-white w-full text-center py-1 rounded text-sm animate-pulse">30 (Top)</div>
                            <div className="bg-cyan-700 text-white w-full text-center py-1 rounded text-sm">20</div>
                            <div className="bg-cyan-800 text-white w-full text-center py-1 rounded text-sm">10</div>
                        </div>
                    </div>

                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Real-world Analogy:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li>A stack of plates in a cafeteria.</li>
                            <li>Undo functionality in text editors (Ctrl+Z).</li>
                            <li>Browser history (Back button).</li>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-green-400 font-bold mb-2 flex items-center gap-2"><FiArrowUp /> Push</h5>
                            <p className="text-gray-300 text-sm">Add an element to the <strong>top</strong> of the stack.</p>
                            <p className="text-xs text-gray-500 mt-2">Overflow occurs when attempting to push onto a full stack.</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-red-400 font-bold mb-2 flex items-center gap-2"><FiArrowDown /> Pop</h5>
                            <p className="text-gray-300 text-sm">Remove the <strong>top</strong> element.</p>
                            <p className="text-xs text-gray-500 mt-2">Throws Underflow error if stack is empty.</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-yellow-400 font-bold mb-2">Peek / Top</h5>
                            <p className="text-gray-300 text-sm">View the top element without removing it.</p>
                        </div>
                    </div>

                    {/* Additional Operations */}
                    <div className="bg-slate-800/30 p-3 rounded border border-slate-700 flex gap-4">
                        <div>
                            <span className="text-purple-400 font-bold text-sm">isEmpty()</span>
                            <span className="text-gray-400 text-sm ml-2">Returns true if stack has no elements.</span>
                        </div>
                        <div className="border-l border-slate-600 pl-4">
                            <span className="text-purple-400 font-bold text-sm">isFull()</span>
                            <span className="text-gray-400 text-sm ml-2">Returns true if stack reaches capacity (Array only).</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Array Implementation',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Simple to implement but has a <strong>fixed size</strong>.
                    </p>
                    <CodeBlock
                        language="java"
                        code={`class ArrayStack {
    int[] arr;
    int top;
    int capacity;

    ArrayStack(int size) {
        arr = new int[size];
        capacity = size;
        top = -1; // Empty
    }

    void push(int x) {
        if (top == capacity - 1) throw new RuntimeException("Stack Overflow");
        arr[++top] = x;
    }

    int pop() {
        if (top == -1) throw new RuntimeException("Stack Underflow");
        return arr[top--];
    }
}`}
                    />
                </div>
            ),
        },
        {
            title: '4️⃣ Linked List Implementation',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <strong>Dynamic size</strong>. We operate (push/pop) at the <strong>head</strong> of the linked list for <MathRenderer math="O(1)" /> efficiency.
                    </p>
                    <div className="bg-yellow-500/10 p-2 rounded border border-yellow-500/30">
                        <p className="text-gray-400 text-xs">Note: Linked list implementation has extra memory overhead due to node pointers.</p>
                    </div>
                    <CodeBlock
                        language="java"
                        code={`class LinkedStack {
    Node head;

    void push(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }

    int pop() {
        if (head == null) throw new RuntimeException("Empty Stack");
        int res = head.data;
        head = head.next;
        return res;
    }
}`}
                    />
                </div>
            ),
        },
        {
            title: '5️⃣ Applications of Stack',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="bg-purple-900/10 p-4 rounded-lg border border-purple-500/20">
                    <ul className="space-y-3">
                        <li className="flex gap-3">
                            <FiTerminal className="text-purple-400 mt-1 flex-shrink-0" />
                            <div>
                                <strong className="text-purple-300 block">Expression Evaluation</strong>
                                <span className="text-gray-400 text-sm">Converting Infix to Postfix/Prefix and evaluating them.</span>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <FiLayers className="text-purple-400 mt-1 flex-shrink-0" />
                            <div>
                                <strong className="text-purple-300 block">Function Calls (Recursion)</strong>
                                <span className="text-gray-400 text-sm">System stack stores return addresses and local variables during function calls.</span>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <FiCheckSquare className="text-purple-400 mt-1 flex-shrink-0" />
                            <div>
                                <strong className="text-purple-300 block">Syntax Parsing</strong>
                                <span className="text-gray-400 text-sm">Balancing parentheses <code>{`{ ( [ ] ) }`}</code> in compilers.</span>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <FiArrowDown className="text-purple-400 mt-1 flex-shrink-0" />
                            <div>
                                <strong className="text-purple-300 block">Undo/Redo</strong>
                                <span className="text-gray-400 text-sm">Keeping track of operations in text editors.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            )
        },
        {
            title: '6️⃣ Complexity Analysis',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-800/50 text-cyan-400">
                            <tr>
                                <th className="px-4 py-3">Operation</th>
                                <th className="px-4 py-3">Time Complexity</th>
                                <th className="px-4 py-3">Space Complexity</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 text-gray-300">
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Push</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2"><MathRenderer math="O(1)" /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Pop</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2"><MathRenderer math="O(1)" /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Peek</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2"><MathRenderer math="O(1)" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ),
        }
    ],
    practiceQuestions: [
        {
            question: "Why does Stack use LIFO?",
            solution: "It's designed for scenarios where we need to reverse steps or track state in a nested manner (like function calls).",
        },
        {
            question: "What is 'Stack Overflow'?",
            solution: "It occurs when you try to push an element onto a stack that has reached its maximum capacity (in fixed-size implementation) or system memory limit (recursion).",
        },
        {
            question: "How to implement 2 stacks in 1 array?",
            solution: "Start Stack1 from index 0 growing upwards, and Stack2 from index n-1 growing downwards. Overflow occurs only when top1 + 1 == top2.",
        }
    ],
    exampleProblems: [],
}

export default function StackADTPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
