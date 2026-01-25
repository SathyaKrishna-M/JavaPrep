'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiMonitor, FiCpu, FiLayers, FiList, FiGrid, FiLink } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
    title: 'Real-World Applications',
    explanationSections: [
        {
            title: '1️⃣ Applications of Arrays',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Arrays are the building blocks of most data storage systems.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>Image Processing:</strong> 2D arrays (matrices) store pixel data (RGB values).</li>
                        <li><strong>Lookup Tables:</strong> Used in compilers and CPU caches for fast <MathRenderer math="O(1)" /> access.</li>
                        <li><strong>Databases:</strong> Records are often stored in blocks (arrays of bytes) on disk.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '2️⃣ Applications of Linked Lists',
            icon: <FiLink className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Used where dynamic memory allocation is needed.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>File Allocation Tables (FAT):</strong> Operating systems use linked structures to track file blocks on disk.</li>
                        <li><strong>Browser History:</strong> Doubly linked lists allow Forward/Back navigation.</li>
                        <li><strong>Music Player Playlists:</strong> Circular linked lists allow "Repeat All" functionality.</li>
                        <li><strong>Polynomial Representation:</strong> Storing sparse polynomials efficiently.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '3️⃣ Applications of Stacks',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Critical for managing function calls and parsing.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>Function Call Stack:</strong> Managing recursion and local variables in programming languages (Java JVM Stack).</li>
                        <li><strong>Expression Evaluation:</strong> Converting Infix to Postfix, and evaluating Postfix expressions.</li>
                        <li><strong>Undo/Redo:</strong> Text editors use stacks to track changes.</li>
                        <li><strong>Syntax Parsing:</strong> Compilers check balanced parentheses <code>(( ))</code>.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '4️⃣ Applications of Queues',
            icon: <FiList className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Used for scheduling and buffering asynchronously.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>CPU Scheduling:</strong> Round Robin scheduling uses a Circular Queue.</li>
                        <li><strong>Printer Spooling:</strong> Documents wait in a FIFO queue before printing.</li>
                        <li><strong>BFS Algorithm:</strong> Breadth-First Search in graphs uses a queue.</li>
                        <li><strong>Web Server Requests:</strong> Handling incoming HTTP requests in order.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '5️⃣ Applications of Priority Queues (Heaps)',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Used when "importance" matters more than "arrival order".
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>Dijkstra's Algorithm:</strong> Finding the shortest path in a graph.</li>
                        <li><strong>Huffman Coding:</strong> Data compression (ZIP files, JPEG).</li>
                        <li><strong>Event simulation:</strong> Processing events in time-order.</li>
                    </ul>
                </div>
            ),
        }
    ],
    practiceQuestions: [
        {
            question: "Which DS is used for implementing a recursive function?",
            solution: "Stack. The system call stack stores return addresses and local variables.",
        },
        {
            question: "Which DS is best for a music playlist?",
            solution: "Doubly Linked List (for Next/Prev song) or Circular Linked List (for looping).",
        },
        {
            question: "Which DS handles effective memory management in OS?",
            solution: "Linked Lists (Free pools) and Heaps (Memory allocation).",
        }
    ],
    exampleProblems: [],
}

export default function LinearDSApplicationsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
