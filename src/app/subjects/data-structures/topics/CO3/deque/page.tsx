'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiArrowLeft, FiArrowRight, FiMaximize2, FiCheckSquare } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Deque (Double Ended Queue)',
    explanationSections: [
        {
            title: '1️⃣ What is a Deque?',
            icon: <FiMaximize2 className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">Deque</span> (pronounced "Deck") stands for <strong>Double Ended Queue</strong>.
                        It allows insertion and deletion at <strong>both ends</strong> (Front and Rear).
                    </p>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                        <p className="text-purple-300 font-semibold mb-2">It's a Hybrid:</p>
                        <p className="text-gray-300 text-sm">It can function as both a <strong>Stack</strong> (LIFO) and a <strong>Queue</strong> (FIFO).</p>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Operations',
            icon: <FiArrowLeft className="w-6 h-6" />,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-green-400 font-bold mb-2">Front Operations</h5>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>insertFront(e):</strong> Adds e to beginning.</li>
                            <li><strong>deleteFront():</strong> Removes from beginning.</li>
                            <li><strong>getFront():</strong> Peeks at beginning.</li>
                        </ul>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-yellow-400 font-bold mb-2">Rear Operations</h5>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>insertLast(e):</strong> Adds e to end.</li>
                            <li><strong>deleteLast():</strong> Removes from end.</li>
                            <li><strong>getRear():</strong> Peeks at end.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Types of Deque',
            icon: <FiArrowRight className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="bg-slate-800/50 p-3 rounded">
                        <p className="text-teal-300 font-semibold">Input-Restricted Deque</p>
                        <p className="text-gray-400 text-sm">Insertion allowed at only ONE end, but deletion allowed at BOTH ends.</p>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded">
                        <p className="text-teal-300 font-semibold">Output-Restricted Deque</p>
                        <p className="text-gray-400 text-sm">Deletion allowed at only ONE end, but insertion allowed at BOTH ends.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Implementation (Doubly Linked List)',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A Doubly Linked List is efficient for Deque because we can delete from the rear in <MathRenderer math="O(1)" /> time (using a tail pointer and prev pointer).
                    </p>
                    <CodeBlock
                        language="java"
                        code={`class Node {
    int data;
    Node prev, next;
}

class Deque {
    Node front, rear;

    void insertFront(int x) {
        Node newNode = new Node(x);
        if (front == null) {
            front = rear = newNode;
        } else {
            newNode.next = front;
            front.prev = newNode;
            front = newNode;
        }
    }

    void deleteLast() {
        if (rear == null) return;
        rear = rear.prev;
        if (rear == null) front = null;
        else rear.next = null;
    }
}`}
                    />
                </div>
            ),
        },
        {
            title: '5️⃣ Summary & Applications',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                        <h5 className="text-green-300 font-bold mb-2">Summary</h5>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>Sliding Window Maximum:</strong> A classic problem solved using Deque in <MathRenderer math="O(n)" />.</li>
                            <li><strong>Palindrome Checker:</strong> Check if characters at front and rear are same, moving inwards.</li>
                            <li><strong>Undo-Redo Operations:</strong> Managing history.</li>
                        </ul>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Can a Deque simulate a Stack?",
            solution: "Yes. Use insertFront() and deleteFront() (or insertLast and deleteLast). Both sets act as LIFO.",
        },
        {
            question: "Can a Deque simulate a Queue?",
            solution: "Yes. Use insertLast() (Enqueue) and deleteFront() (Dequeue). This acts as FIFO.",
        },
        {
            question: "Why is Array implementation of Deque tricky?",
            solution: "Like Circular Queue, it requires circular array logic for both front and rear pointers to avoid shifting elements.",
        }
    ],
    exampleProblems: [],
}

export default function DequePage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
