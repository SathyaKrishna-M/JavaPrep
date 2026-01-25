'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCode, FiFolder, FiCpu, FiBookOpen } from 'react-icons/fi'

const content = {
    title: 'Skill-based Implementation & Micro-Projects',
    explanationSections: [
        {
            title: '1️⃣ Overview',
            icon: <FiBookOpen className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        This unit focuses on applying Data Structures concepts to build practical, small-scale projects. The goal is to bridge the gap between theory and application.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <h4 className="text-blue-300 font-bold mb-2">Project Requirements</h4>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                            <li>Implement using <strong>Java</strong>.</li>
                            <li>Use appropriate <strong>Data Structures</strong> (Stack, Queue, List, Tree, Hash).</li>
                            <li>Demonstrate <strong>CRUD operations</strong> (Create, Read, Update, Delete).</li>
                            <li>Analyze <strong>Time & Space Complexity</strong> of the chosen approach.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Project Idea: Student Record System',
            icon: <FiFolder className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A console-based system to manage student data efficiently.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                            <h5 className="text-teal-400 font-bold mb-2">Suggested DS</h5>
                            <p className="text-gray-300 text-sm"><strong>ArrayList</strong> or <strong>LinkedList</strong> for dynamic storage.</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                            <h5 className="text-teal-400 font-bold mb-2">Key Features</h5>
                            <ul className="list-disc list-inside text-gray-400 text-xs">
                                <li>Add new student</li>
                                <li>Display all students</li>
                                <li>Search by ID (Linear Search)</li>
                                <li>Delete by ID</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Project Idea: Library Book Finder',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A tool to search for books by ID using blazing fast lookups.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                            <h5 className="text-teal-400 font-bold mb-2">Suggested DS</h5>
                            <p className="text-gray-300 text-sm"><strong>HashMap</strong> for O(1) retrieval or <strong>Binary Search Tree</strong>.</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                            <h5 className="text-teal-400 font-bold mb-2">Key Features</h5>
                            <ul className="list-disc list-inside text-gray-400 text-xs">
                                <li>Store Book details (ID &rarr; Book Object)</li>
                                <li>Instant search by Book ID</li>
                                <li>Sort books by Title (if using BST/TreeMap)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Project Idea: Task Scheduler',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Simulate a CPU scheduler or a Todo list with priorities.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                            <h5 className="text-teal-400 font-bold mb-2">Suggested DS</h5>
                            <p className="text-gray-300 text-sm"><strong>PriorityQueue</strong> (Min-Heap or Max-Heap).</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                            <h5 className="text-teal-400 font-bold mb-2">Key Features</h5>
                            <ul className="list-disc list-inside text-gray-400 text-xs">
                                <li>Add tasks with priority levels (High/Medium/Low)</li>
                                <li>Always process highest priority task next</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        }
    ],
    practiceQuestions: [
        {
            question: "Which project would best utilize a Stack data structure?",
            solution: "A Text Editor with Undo/Redo functionality, or a Bracket Matching validator.",
        },
        {
            question: "For a Music Playlist project where songs can be played in loop, which DS is best?",
            solution: "Circular Doubly Linked List (allows Next, Previous, and continuous looping).",
        }
    ],
    exampleProblems: [],
}

export default function MicroProjectsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
