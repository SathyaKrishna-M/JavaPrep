'use client'

import React from 'react'
import DMTopicPage from '@/components/DMTopicPage'
import { FiUsers, FiMinimize2, FiCheckSquare, FiAlertTriangle, FiCode } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Queue Implementation Using Array',
    explanationSections: [
        {
            title: '1. Introduction',
            icon: <FiUsers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">Queue</span> is a linear data structure that follows the <strong>FIFO (First In, First Out)</strong> principle.
                        Implementing a Queue using an Array means we use a fixed-size contiguous block of memory to store our queue elements.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Real-Life Analogy:</p>
                        <p className="text-gray-300 text-sm">
                            Think of an array queue like a <strong>ticket counter line</strong>.
                            People join the line at the back (Rear) and leave the line from the front (Front).
                        </p>
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
                        We maintain an array <code>arr</code> and two pointer variables:
                    </p>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                        <li><code>front</code>: Points to the first element (where deletions happen). Initially -1.</li>
                        <li><code>rear</code>: Points to the last element (where insertions happen). Initially -1.</li>
                    </ul>
                    <div className="bg-slate-800/80 p-6 rounded-lg font-mono text-sm text-center border border-slate-700 overflow-x-auto whitespace-pre">
                        <span className="text-gray-400 block mb-4">Capacity: 5 | Front: 0 | Rear: 2</span>
                        {`
   [0]    [1]    [2]    [3]    [4]
+------+------+------+------+------+
|  10  |  20  |  30  |      |      |
+------+------+------+------+------+
   ^             ^
   |             |
 front         rear
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
                            <h5 className="text-green-400 font-bold mb-2">Enqueue (Insert)</h5>
                            <p className="text-gray-300 text-sm mb-2">
                                Adds an element to the rear of the queue.
                            </p>
                            <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                                <li>Check if queue is full (<code>rear == capacity - 1</code>).</li>
                                <li>If full, throw Overflow error.</li>
                                <li>If first element (<code>front == -1</code>), set <code>front = 0</code>.</li>
                                <li>Increment <code>rear</code> and insert at <code>arr[rear]</code>.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-red-400 font-bold mb-2">Dequeue (Delete)</h5>
                            <p className="text-gray-300 text-sm mb-2">
                                Removes and returns the front element.
                            </p>
                            <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                                <li>Check if queue is empty (<code>front == -1</code> or <code>front &gt; rear</code>).</li>
                                <li>If empty, throw Underflow error.</li>
                                <li>Return element at <code>arr[front]</code> and increment <code>front</code>.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-blue-400 font-bold mb-2">Peek (Search Front)</h5>
                            <p className="text-gray-300 text-sm mb-2">
                                Returns the front element without removing it.
                            </p>
                            <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                                <li>Check if queue is empty.</li>
                                <li>If not empty, return <code>arr[front]</code>.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-purple-400 font-bold mb-2">isEmpty & isFull</h5>
                            <p className="text-gray-300 text-sm mb-2">
                                Helper functions to check boundaries.
                            </p>
                            <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                                <li><code>isEmpty()</code>: <code>front == -1 || front &gt; rear</code></li>
                                <li><code>isFull()</code>: <code>rear == capacity - 1</code></li>
                            </ul>
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
                        A complete, beginner-friendly Java class implementing a standard linear Queue using an Array.
                    </p>
                    <CodeBlock
                        language="java"
                        code={`class ArrayQueue {
    private int[] arr;
    private int front;
    private int rear;
    private int capacity;

    public ArrayQueue(int size) {
        this.arr = new int[size];
        this.capacity = size;
        this.front = -1;
        this.rear = -1;
    }

    // Enqueue: Add to rear
    public void enqueue(int x) {
        if (isFull()) {
            System.out.println("Queue Overflow! Cannot enqueue " + x);
            return;
        }
        if (front == -1) {
            front = 0; // Initialize front when inserting first element
        }
        arr[++rear] = x;
        System.out.println("Enqueued: " + x);
    }

    // Dequeue: Remove from front
    public int dequeue() {
        if (isEmpty()) {
            System.out.println("Queue Underflow! Cannot dequeue.");
            return -1;
        }
        int dequeuedValue = arr[front++];
        
        // Optional Reset: If queue becomes empty after dequeue, reset pointers
        if (front > rear) {
            front = -1;
            rear = -1;
        }
        
        return dequeuedValue;
    }

    // Peek: View front element
    public int peek() {
        if (isEmpty()) {
            System.out.println("Queue is empty.");
            return -1;
        }
        return arr[front];
    }

    // Check if empty
    public boolean isEmpty() {
        return front == -1 || front > rear;
    }

    // Check if full
    public boolean isFull() {
        return rear == capacity - 1;
    }

    // Traverse: Print all elements from front to rear
    public void printQueue() {
        if (isEmpty()) {
            System.out.println("Queue is empty.");
            return;
        }
        System.out.print("Queue (Front to Rear): ");
        for (int i = front; i <= rear; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
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
                                <td className="px-4 py-2">Direct index assignment at rear.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold">Dequeue</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2">Direct index access at front and increment.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold">Peek</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2">Direct index read.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-purple-300">Overall Space</td>
                                <td className="px-4 py-2">-</td>
                                <td className="px-4 py-2 text-red-400"><MathRenderer math="O(n)" /></td>
                                <td className="px-4 py-2">Where n is the maximum capacity allocated.</td>
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
                        <h5 className="text-red-400 font-bold mb-2">The Major Drawback of Simple Linear Queues</h5>
                        <p className="text-gray-300 text-sm">
                            If you push elements until the queue is full (<code>rear == capacity - 1</code>), and then pop elements to empty it,
                            the queue will still report that it is FULL because <code>rear</code> is at the boundary limit.
                            The empty space at the beginning of the array is essentially wasted and cannot be reused.
                        </p>
                        <p className="text-cyan-400 mt-2 text-sm font-semibold">
                            👉 Solution: This is why Circular Queues were invented.
                        </p>
                    </div>

                    <div className="bg-blue-900/10 p-4 rounded-lg border border-blue-500/30">
                        <h5 className="text-blue-400 font-bold mb-2">Interview & Viva Questions</h5>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                            <li>
                                <strong>Why set front = 0 on first enqueue?</strong>
                                <br /> <span className="text-gray-400 ml-4">Because initially front is -1. If we don't set it to 0, dequeue will try to read from index -1 and crash.</span>
                            </li>
                            <li>
                                <strong>What happens when front &gt; rear?</strong>
                                <br /> <span className="text-gray-400 ml-4">This means we have dequeued all the elements that were enqueued. The queue is now mathematically empty.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "What is the problem with a standard Linear Array Queue?",
            solution: "Memory Wastage. Vacated spaces at the front (after dequeue operations) cannot be reused because the 'rear' pointer only moves forward. When 'rear' reaches the end of the array, the queue is considered full even if there are empty slots at the beginning.",
        }
    ],
    exampleProblems: [],
}

export default function QueueUsingArrayPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
