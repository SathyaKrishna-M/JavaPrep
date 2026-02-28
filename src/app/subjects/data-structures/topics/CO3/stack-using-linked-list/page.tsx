'use client'

import React from 'react'
import DMTopicPage from '@/components/DMTopicPage'
import { FiLayers, FiMinimize2, FiCheckSquare, FiAlertTriangle, FiCode } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Stack Implementation Using Linked List',
    explanationSections: [
        {
            title: '1. Introduction',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        In a <span className="text-cyan-400 font-semibold">Linked List-based Stack</span>, we use dynamically allocated nodes to store elements.
                        Instead of a fixed array, the stack grows and shrinks dynamically as elements are pushed or popped.
                        We maintain a <code>top</code> pointer that always points to the first node (head) of the linked list.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Why use a Linked List?</p>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                            <li><strong>Dynamic Size:</strong> No need to define strict capacities. Stack Overflow only happens when the system runs out of heap memory.</li>
                            <li><strong>Flexibility:</strong> Efficiently handles varying workloads without wasting pre-allocated space.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: '2. Structure Diagram',
            icon: <FiMinimize2 className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Every node has two parts: <code>data</code> and a <code>next</code> pointer.
                        The top of the stack is effectively the <strong>Head</strong> of the linked list.
                    </p>
                    <div className="bg-slate-800/80 p-6 rounded-lg font-mono text-sm text-center border border-slate-700 overflow-x-auto whitespace-pre">
                        <span className="text-gray-400 block mb-4">Pushing adds a node at the HEAD. Popping removes from the HEAD.</span>
                        {`
  top (head)
   |
   V
+----+----+      +----+----+      +----+------+
| 30 |next| ---> | 20 |next| ---> | 10 | null |
+----+----+      +----+----+      +----+------+
 (Top node)                       (Bottom node)
                        `}
                    </div>
                </div>
            ),
        },
        {
            title: '3. Operations',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-green-400 font-bold mb-2">Push (Insert at Head)</h5>
                            <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                                <li>Create a new node with data.</li>
                                <li>Point new node's <code>next</code> to the current <code>top</code>.</li>
                                <li>Update <code>top</code> to point to the new node.</li>
                            </ul>
                            <div className="mt-2 text-xs bg-slate-900 p-2 rounded text-gray-400">
                                <code>newNode.next = top; top = newNode;</code>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-red-400 font-bold mb-2">Pop (Delete from Head)</h5>
                            <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                                <li>Check if <code>top == null</code> (Underflow).</li>
                                <li>Store data from current <code>top</code>.</li>
                                <li>Update <code>top = top.next</code>.</li>
                                <li>Return the stored data.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-blue-400 font-bold mb-2">Peek (Search Top)</h5>
                            <p className="text-gray-300 text-sm mb-2">
                                Returns <code>top.data</code> without changing pointers. Throws underflow if <code>top == null</code>.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-purple-400 font-bold mb-2">isEmpty</h5>
                            <p className="text-gray-300 text-sm mb-2">
                                Simply check if <code>top == null</code>.
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: '4. Java Implementation',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Complete Object-Oriented implementation using a custom Node class.
                    </p>
                    <CodeBlock
                        language="java"
                        code={`class Node {
    int data;
    Node next;

    public Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedStack {
    private Node top;

    public LinkedStack() {
        this.top = null; // Stack is initially empty
    }

    // Push: Insert at head
    public void push(int x) {
        Node newNode = new Node(x);
        newNode.next = top; // Link new node to current top
        top = newNode;      // Make new node the new top
        System.out.println("Pushed: " + x);
    }

    // Pop: Remove from head
    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack Underflow! Cannot pop.");
            return -1;
        }
        int poppedValue = top.data;
        top = top.next; // Move top to the next node
        return poppedValue;
    }

    // Peek: Get top element
    public int peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty.");
            return -1;
        }
        return top.data;
    }

    // Helper: Check if empty
    public boolean isEmpty() {
        return top == null;
    }

    // Traverse stack
    public void printStack() {
        if (isEmpty()) {
            System.out.println("Stack is empty.");
            return;
        }
        System.out.print("Stack (Top to Bottom): ");
        Node temp = top;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
        System.out.println("null");
    }
}`}
                    />
                </div>
            )
        },
        {
            title: '5. Time and Space Complexity',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-800/50 text-cyan-400">
                            <tr>
                                <th className="px-4 py-3">Operation</th>
                                <th className="px-4 py-3">Time Complexity</th>
                                <th className="px-4 py-3">Space Complexity</th>
                                <th className="px-4 py-3">Reason</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 text-gray-300">
                            <tr>
                                <td className="px-4 py-2 font-semibold">Push</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2">Inserting at head is constant time.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold">Pop</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2">Deleting from head is constant time.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold">Peek</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2">Direct access to top pointer.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-purple-300">Overall Space</td>
                                <td className="px-4 py-2">-</td>
                                <td className="px-4 py-2 text-red-400"><MathRenderer math="O(n)" /></td>
                                <td className="px-4 py-2">Requires extra space for node pointers.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        },
        {
            title: '6. Edge Cases & Interview Notes',
            icon: <FiAlertTriangle className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="bg-red-900/10 p-4 rounded-lg border border-red-500/30">
                        <h5 className="text-red-400 font-bold mb-2">Common Mistakes</h5>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                            <li><strong>Losing the Head Reference:</strong> Reassigning <code>top</code> incorrectly during Push/Pop can cause the entire list to be garbage-collected, deleting the stack.</li>
                            <li><strong>NullPointerExceptions:</strong> Attempting to access <code>top.data</code> or <code>top.next</code> without checking if <code>isEmpty()</code> first.</li>
                        </ul>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Why do we insert/delete at the Head instead of the Tail in a Stack using Linked List?",
            solution: "Inserting/Deleting at the Head takes O(1) time. If we used the Tail, we would need to traverse the entire list to find the element before the tail to perform a Pop, making it an O(n) operation.",
        }
    ],
    exampleProblems: [],
}

export default function StackUsingLinkedListPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
