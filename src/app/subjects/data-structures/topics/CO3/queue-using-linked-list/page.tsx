'use client'

import React from 'react'
import DMTopicPage from '@/components/DMTopicPage'
import { FiUsers, FiMinimize2, FiCheckSquare, FiAlertTriangle, FiCode } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Queue Implementation Using Linked List',
    explanationSections: [
        {
            title: '1. Introduction',
            icon: <FiUsers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        In a <span className="text-cyan-400 font-semibold">Linked List-based Queue</span>, we use dynamically allocated nodes to store elements.
                        Instead of a fixed array, the queue grows dynamically as elements are enqueued.
                        We maintain two pointers: <code>front</code> (points to the first node) and <code>rear</code> (points to the last node).
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Why use a Linked List?</p>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                            <li><strong>Dynamic Size:</strong> No Overflow errors (unless heap memory runs out).</li>
                            <li><strong>No Wasted Space:</strong> Unlike simple array queues, nodes are deleted from memory dynamically when dequeued, resolving the space reuse limitation.</li>
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
                        Every node has <code>data</code> and a <code>next</code> pointer.
                        Enqueue adds nodes to the <strong>Rear</strong>. Dequeue removes nodes from the <strong>Front</strong>.
                    </p>
                    <div className="bg-slate-800/80 p-6 rounded-lg font-mono text-sm text-center border border-slate-700 overflow-x-auto whitespace-pre">
                        <span className="text-gray-400 block mb-4">Initially, front = null and rear = null.</span>
                        {`
  front (Dequeue point)                        rear (Enqueue point)
   |                                            |
   V                                            V
+----+----+      +----+----+      +----+------+
| 10 |next| ---> | 20 |next| ---> | 30 | null |
+----+----+      +----+----+      +----+------+
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
                            <h5 className="text-green-400 font-bold mb-2">Enqueue (Insert at Rear)</h5>
                            <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                                <li>Create a new node.</li>
                                <li>If queue is empty (<code>rear == null</code>), set both <code>front</code> and <code>rear</code> to the new node.</li>
                                <li>Otherwise, link <code>rear.next</code> to the new node, then update <code>rear = newNode</code>.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-red-400 font-bold mb-2">Dequeue (Delete from Front)</h5>
                            <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                                <li>If queue is empty (<code>front == null</code>), throw Underflow.</li>
                                <li>Store <code>front.data</code> to return later.</li>
                                <li>Update <code>front = front.next</code>.</li>
                                <li><strong>Important:</strong> If <code>front</code> becomes null (query empty), set <code>rear = null</code> as well.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-blue-400 font-bold mb-2">Peek (Search Front)</h5>
                            <p className="text-gray-300 text-sm mb-2">
                                Returns <code>front.data</code> without removing it.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-purple-400 font-bold mb-2">isEmpty</h5>
                            <p className="text-gray-300 text-sm mb-2">
                                Returns true if <code>front == null</code>.
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
                        Object-Oriented implementation using a custom Node class.
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

class LinkedQueue {
    private Node front;
    private Node rear;

    public LinkedQueue() {
        this.front = this.rear = null;
    }

    // Enqueue: Insert at the rear of the list
    public void enqueue(int x) {
        Node newNode = new Node(x);

        // If queue is empty, new node is both front and rear
        if (this.rear == null) {
            this.front = this.rear = newNode;
            System.out.println("Enqueued: " + x);
            return;
        }

        // Add the new node at the end and change rear
        this.rear.next = newNode;
        this.rear = newNode;
        System.out.println("Enqueued: " + x);
    }

    // Dequeue: Remove from the front of the list
    public int dequeue() {
        if (this.front == null) {
            System.out.println("Queue Underflow! Cannot dequeue.");
            return -1;
        }

        // Store data to return
        int dequeuedValue = this.front.data;

        // Move front one step ahead
        this.front = this.front.next;

        // If front becomes null, then change rear also as null
        if (this.front == null) {
            this.rear = null;
        }

        return dequeuedValue;
    }

    // Peek: View front element
    public int peek() {
        if (this.front == null) {
            System.out.println("Queue is empty.");
            return -1;
        }
        return this.front.data;
    }

    // Helper: Check if empty
    public boolean isEmpty() {
        return this.front == null;
    }

    // Traverse: Print all elements from front to rear
    public void printQueue() {
        if (isEmpty()) {
            System.out.println("Queue is empty.");
            return;
        }
        System.out.print("Queue (Front to Rear): ");
        Node temp = front;
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
                                <td className="px-4 py-2 font-semibold">Enqueue</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2">We maintain a rear pointer, no traversal needed.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold">Dequeue</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2">We maintain a front pointer, direct node deletion.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold">Peek</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2">Direct access to front pointer.</td>
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
                        <h5 className="text-red-400 font-bold mb-2">Critical Memory Leak Case</h5>
                        <p className="text-gray-300 text-sm">
                            When dequeuing the last remaining element from the queue, <code>front.next</code> becomes null, so <code>front</code> evaluates to null.
                            However, if you forget to explicitly set <code>rear = null</code> in this scenario, <code>rear</code> will still hold a stale reference to the deleted node, preventing garbage collection and causing logical errors on the next Enqueue.
                        </p>
                    </div>

                    <div className="bg-blue-900/10 p-4 rounded-lg border border-blue-500/30">
                        <h5 className="text-blue-400 font-bold mb-2">Interview & Viva Questions</h5>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                            <li>
                                <strong>Why maintain both front and rear pointers instead of just a head pointer?</strong>
                                <br /> <span className="text-gray-400 ml-4">If we only used a <code>head</code> pointer (like a standard linked list), we would need to traverse the entire list to find the end for Enqueue operations, making Enqueue O(n).</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "What is the time complexity of Enqueue in a Linked Queue if we do not maintain a 'rear' pointer?",
            solution: "O(n). Without a rear pointer, we would have to traverse the entire linked list from the front to find the last node every time we wanted to insert a new element.",
        }
    ],
    exampleProblems: [],
}

export default function QueueUsingLinkedListPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
