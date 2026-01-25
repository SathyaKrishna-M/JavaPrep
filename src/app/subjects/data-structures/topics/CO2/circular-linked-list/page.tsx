'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiRefreshCw, FiGrid, FiRotateCw, FiCheckSquare, FiPlayCircle, FiCpu, FiAlertTriangle, FiSearch, FiTrash2, FiPlusCircle } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Circular Linked List',
    explanationSections: [
        {
            title: '1️⃣ What is a Circular Linked List?',
            icon: <FiRefreshCw className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">Circular Linked List</span> is a variation of a linked list where the <strong>last node points back to the first node</strong> instead of <code>null</code>.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Key Characteristic:</p>
                        <p className="text-gray-300 text-sm">There is no NULL at the end. The list forms a continuous cycle.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Types of Circular Lists',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-green-400 font-bold mb-2">Circular Singly Linked List</h5>
                        <p className="text-gray-300 text-sm mb-2">Like a normal Singly Linked List, but the tail's next pointer points to Head.</p>
                        <div className="text-xs text-gray-500 font-mono p-2 bg-black/30 rounded">
                            LastNode.next = Head;
                        </div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-purple-400 font-bold mb-2">Circular Doubly Linked List</h5>
                        <p className="text-gray-300 text-sm mb-2">Tail's next points to Head AND Head's prev points to Tail.</p>
                        <div className="text-xs text-gray-500 font-mono p-2 bg-black/30 rounded">
                            Tail.next = Head; Head.prev = Tail;
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Basic Operations',
            icon: <FiRotateCw className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    {/* Traversal */}
                    <div>
                        <h4 className="text-xl font-bold text-teal-400 mb-2">3.1 Traversal</h4>
                        <p className="text-gray-300 mb-2">
                            We cannot stop at <code>null</code>. We stop when we reach the <code>head</code> again.
                        </p>
                        <CodeBlock
                            language="java"
                            code={`void printCircular(Node head) {
    if (head == null) return;
    
    Node temp = head;
    do {
        System.out.print(temp.data + " ");
        temp = temp.next;
    } while (temp != head); // Stop when back at start
}`}
                        />
                    </div>

                    {/* Insertion */}
                    {/* Insertion */}
                    <div>
                        <h4 className="text-xl font-bold text-green-400 mb-2">3.2 Insertion</h4>
                        <div className="space-y-4">
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-green-300 font-semibold flex items-center gap-2"><FiPlusCircle /> At Head (Beginning)</p>
                                <p className="text-gray-400 text-sm mb-2">Create new node. Update tail's next to new node. New node's next to head. Update head.</p>
                                <CodeBlock language="java" code={`Node newNode = new Node(data);\nif (head == null) {\n    head = newNode;\n    newNode.next = head;\n} else {\n    Node tail = head;\n    while (tail.next != head) tail = tail.next;\n    tail.next = newNode;\n    newNode.next = head;\n    head = newNode;\n}`} />
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-green-300 font-semibold flex items-center gap-2"><FiPlusCircle /> At Tail (End)</p>
                                <p className="text-gray-400 text-sm mb-2">Traverse to tail. Tail's next = new node. New node's next = head.</p>
                                <CodeBlock language="java" code={`Node tail = head;\nwhile (tail.next != head) tail = tail.next;\ntail.next = newNode;\nnewNode.next = head;`} />
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-green-300 font-semibold flex items-center gap-2"><FiPlusCircle /> At Given Position</p>
                                <p className="text-gray-400 text-sm mb-2">Traverse to position - 1. Update pointers similar to SLL.</p>
                            </div>
                        </div>
                    </div>

                    {/* Deletion */}
                    <div>
                        <h4 className="text-xl font-bold text-red-400 mb-2">3.3 Deletion</h4>
                        <div className="space-y-4">
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-red-300 font-semibold flex items-center gap-2"><FiTrash2 /> Delete Head</p>
                                <p className="text-gray-400 text-sm mb-2">Find tail, update tail.next = head.next, then head = head.next.</p>
                                <CodeBlock language="java" code={`Node tail = head;\nwhile (tail.next != head) tail = tail.next;\ntail.next = head.next;\nhead = head.next;`} />
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-red-300 font-semibold flex items-center gap-2"><FiTrash2 /> Delete Tail</p>
                                <p className="text-gray-400 text-sm mb-2">Traverse to second last node. Set its next to head.</p>
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div>
                        <h4 className="text-xl font-bold text-blue-400 mb-2">3.4 Search</h4>
                        <p className="text-gray-300 mb-2">Traverse until we reach head again. <MathRenderer math="O(n)" />.</p>
                        <CodeBlock language="java" code={`boolean search(Node head, int key) {
    if (head == null) return false;
    Node temp = head;
    do {
        if (temp.data == key) return true;
        temp = temp.next;
    } while (temp != head);
    return false;
}`} />
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Advanced Operations',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-purple-400 mb-2">4.1 Reverse Circular List</h4>
                        <p className="text-gray-300 mb-2">Similar to SLL reversal, but we must update the last node's next pointer to the new head at the end.</p>
                        <CodeBlock language="java" code={`void reverse() {
    if (head == null) return;
    Node prev = null, current = head, next = null;
    Node last = head; 
    do {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    } while (current != head);
    
    // Fix circular link
    head.next = prev; // Old head (now tail) points to new head (prev)
    head = prev;      // Update head pointer
}`} />
                    </div>
                </div>
            ),
        },
        {
            title: '5️⃣ Applications',
            icon: <FiPlayCircle className="w-6 h-6" />,
            content: (
                <div className="bg-purple-900/10 p-4 rounded-lg border border-purple-500/20">
                    <ul className="space-y-3">
                        <li className="flex gap-3">
                            <FiCpu className="text-purple-400 mt-1 flex-shrink-0" />
                            <div>
                                <strong className="text-purple-300 block">Round Robin Scheduling</strong>
                                <span className="text-gray-400 text-sm">OS assigns CPU time slices to processes in a circular order.</span>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <FiPlayCircle className="text-purple-400 mt-1 flex-shrink-0" />
                            <div>
                                <strong className="text-purple-300 block">Music Playlists</strong>
                                <span className="text-gray-400 text-sm">"Loop" mode where the playlist restarts after the last song.</span>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <FiRotateCw className="text-purple-400 mt-1 flex-shrink-0" />
                            <div>
                                <strong className="text-purple-300 block">Multiplayer Games</strong>
                                <span className="text-gray-400 text-sm">Passing turns between players in a circle.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            title: '6️⃣ Summary & Common Mistakes',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                        <h5 className="text-green-300 font-bold mb-2">Summary</h5>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>Circular:</strong> No null at end. Forms a loop.</li>
                            <li><strong>Use Case:</strong> Continuous looping, Queue implementation (Circular Queue).</li>
                            <li><strong>Complexity:</strong> Similar to SLL, but infinite loop risk if not careful.</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h5 className="text-red-400 font-bold">Common Mistakes</h5>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertTriangle className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Using <code>while(temp != null)</code> causing Infinite Loop. Use <code>do-while(temp != head)</code>.</p>
                        </div>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertTriangle className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Forgetting to update the tail's next pointer when inserting at head.</p>
                        </div>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "How do you count nodes in a Circular Linked List?",
            solution: "Start from head, traverse using a temp pointer. Increment count until temp.next == head.",
        },
        {
            question: "What is the advantage of a Circular Doubly Linked List?",
            solution: "You can traverse the whole list starting from ANY node, in ANY direction. Insertion/Deletion at head/tail is O(1) without traversing to find tail.",
        },
        {
            question: "Can checking `if (head == null)` detect if a Circular List is empty?",
            solution: "Yes. If head is null, the list is empty. Even in a circular list, an empty list has no nodes.",
        }
    ],
    exampleProblems: [],
}

export default function CircularLinkedListPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
