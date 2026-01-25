'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiMinimize2, FiCodesandbox, FiArrowLeft, FiGrid, FiTrash2, FiPlusCircle, FiCheckSquare, FiAlertTriangle } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Doubly Linked List',
    explanationSections: [
        {
            title: '1️⃣ What is a Doubly Linked List?',
            icon: <FiMinimize2 className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">Doubly Linked List (DLL)</span> is a linear data structure where each node contains <strong>two pointers</strong>: one to the next node and one to the previous node.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Node Structure:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>Prev:</strong> Pointer to the previous node.</li>
                            <li><strong>Data:</strong> The value stored.</li>
                            <li><strong>Next:</strong> Pointer to the next node.</li>
                        </ul>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg flex items-center justify-center gap-2 overflow-x-auto">
                        <span className="text-gray-500 text-xs">Null</span>
                        <span>⬅️</span>
                        <div className="p-2 bg-purple-900 border border-purple-500 rounded text-xs text-white text-center">
                            Prev | Data | Next
                        </div>
                        <span>↔️</span>
                        <div className="p-2 bg-purple-900 border border-purple-500 rounded text-xs text-white text-center">
                            Prev | Data | Next
                        </div>
                        <span>➡️</span>
                        <span className="text-gray-500 text-xs">Null</span>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Node Implementation in Java',
            icon: <FiCodesandbox className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <CodeBlock
                        language="java"
                        code={`class Node {
    int data;
    Node next;
    Node prev; // Extra pointer

    Node(int data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}`}
                    />
                </div>
            ),
        },
        {
            title: '3️⃣ Basic Operations',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    {/* Traversal */}
                    <div>
                        <h4 className="text-xl font-bold text-teal-400 mb-2">3.1 Traversal</h4>
                        <p className="text-gray-300 mb-2">We can traverse in <span className="text-teal-300">both directions</span>.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CodeBlock
                                language="java"
                                code={`// Forward
Node temp = head;
while (temp != null) {
    print(temp.data);
    temp = temp.next;
}`}
                            />
                            <CodeBlock
                                language="java"
                                code={`// Backward
Node temp = tail;
while (temp != null) {
    print(temp.data);
    temp = temp.prev;
}`}
                            />
                        </div>
                    </div>

                    {/* Insertion */}
                    {/* Insertion */}
                    <div>
                        <h4 className="text-xl font-bold text-green-400 mb-2">3.2 Insertion</h4>
                        <div className="space-y-4">
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-green-300 font-semibold flex items-center gap-2"><FiPlusCircle /> At Head (Beginning)</p>
                                <p className="text-gray-400 text-sm mb-2">Requires updating 4 references (NewNode next/prev, Head prev). <MathRenderer math="O(1)" />.</p>
                                <CodeBlock language="java" code={`Node newNode = new Node(data);\nnewNode.next = head;\nif (head != null) head.prev = newNode;\nhead = newNode;`} />
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-green-300 font-semibold flex items-center gap-2"><FiPlusCircle /> At Tail (End)</p>
                                <p className="text-gray-400 text-sm mb-2">Traverse to end (or use tail pointer) and link. <MathRenderer math="O(n)" /> or <MathRenderer math="O(1)" />.</p>
                                <CodeBlock language="java" code={`Node last = head;\nwhile (last.next != null) last = last.next;\nlast.next = newNode;\nnewNode.prev = last;`} />
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-green-300 font-semibold flex items-center gap-2"><FiPlusCircle /> At Given Position</p>
                                <p className="text-gray-400 text-sm mb-2">Insert after a given node. Update pointers of newNode, current, and current.next.</p>
                                <CodeBlock language="java" code={`newNode.next = current.next;\nnewNode.prev = current;\nif (current.next != null) current.next.prev = newNode;\ncurrent.next = newNode;`} />
                            </div>
                        </div>
                    </div>

                    {/* Deletion */}
                    {/* Deletion */}
                    <div>
                        <h4 className="text-xl font-bold text-red-400 mb-2">3.3 Deletion</h4>
                        <div className="space-y-4">
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-red-300 font-semibold flex items-center gap-2"><FiTrash2 /> Delete Node (Given Pointer)</p>
                                <p className="text-gray-400 text-sm mb-2">
                                    If we have the pointer to the node to be deleted (and it's not null), we can delete it in <MathRenderer math="O(1)" /> time.
                                </p>
                                <CodeBlock language="java" code={`if (del.prev != null) del.prev.next = del.next;\nif (del.next != null) del.next.prev = del.prev;`} />
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-red-300 font-semibold flex items-center gap-2"><FiTrash2 /> Delete at Head</p>
                                <p className="text-gray-400 text-sm mb-2">Move head to next, set new head's prev to null.</p>
                                <CodeBlock language="java" code={`head = head.next;\nif (head != null) head.prev = null;`} />
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-red-300 font-semibold flex items-center gap-2"><FiTrash2 /> Delete at Tail</p>
                                <p className="text-gray-400 text-sm mb-2">Go to last node, set previous node's next to null.</p>
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div>
                        <h4 className="text-xl font-bold text-blue-400 mb-2">3.4 Search</h4>
                        <p className="text-gray-300 mb-2">Similar to Singly Linked List, scan linearly. <MathRenderer math="O(n)" />.</p>
                        <CodeBlock language="java" code={`boolean search(Node head, int key) {
    Node temp = head;
    while (temp != null) {
        if (temp.data == key) return true;
        temp = temp.next;
    }
    return false;
}`} />
                    </div>
                </div>
            )
        },
        {
            title: '4️⃣ Advanced Operations',
            icon: <FiCodesandbox className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-purple-400 mb-2">4.1 Reverse Doubly Linked List</h4>
                        <p className="text-gray-300 mb-2">Swap <code>prev</code> and <code>next</code> pointers for every node, then update head.</p>
                        <CodeBlock language="java" code={`void reverse() {
    Node temp = null;
    Node current = head;
    while (current != null) {
        temp = current.prev;
        current.prev = current.next;
        current.next = temp;
        current = current.prev; // Move to next node (which is at 'prev' after swap)
    }
    if (temp != null) {
        head = temp.prev;
    }
}`} />
                    </div>
                </div>
            )
        },
        {
            title: '5️⃣ Singly vs Doubly & Applications',
            icon: <FiArrowLeft className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-800/50 text-cyan-400">
                                <tr>
                                    <th className="px-4 py-3">Feature</th>
                                    <th className="px-4 py-3">Singly Linked List</th>
                                    <th className="px-4 py-3">Doubly Linked List</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-gray-300">
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-blue-300">Direction</td>
                                    <td className="px-4 py-2">One way (Forward)</td>
                                    <td className="px-4 py-2">Two ways (Forward/Backward)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-blue-300">Memory per Node</td>
                                    <td className="px-4 py-2 text-green-400">Less (1 pointer)</td>
                                    <td className="px-4 py-2 text-red-400">More (2 pointers)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-blue-300">Delete Node (Given ptr)</td>
                                    <td className="px-4 py-2 text-red-400"><MathRenderer math="O(n)" /> (Need prev ptr)</td>
                                    <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-teal-400 mb-2">Real-World Applications</h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>Browser Navigation:</strong> Back and Forward buttons.</li>
                            <li><strong>Undo/Redo:</strong> Text editors use DLL to store state history.</li>
                            <li><strong>Music Players:</strong> Previous and Next song functionality.</li>
                            <li><strong>LRU Cache:</strong> Used in cache implementation for <MathRenderer math="O(1)" /> deletion/movement.</li>
                        </ul>
                    </div>
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
                            <li><strong>Structure:</strong> Prev + Data + Next.</li>
                            <li><strong>Advantage:</strong> Can move backwards (crucial for undo operations, browser history).</li>
                            <li><strong>Disadvantage:</strong> Uses more memory.</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h5 className="text-red-400 font-bold">Common Mistakes</h5>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertTriangle className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Forgetting to update <code>prev</code> pointer when inserting/deleting.</p>
                        </div>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertTriangle className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Not handling head/tail edge cases (e.g., deleting last node).</p>
                        </div>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "When would you choose a Doubly Linked List over a Singly Linked List?",
            solution: "When you need to traverse backward (e.g., implementing a 'Previous' button in a music player) or when you need efficient deletion of a known node.",
        },
        {
            question: "How do you reverse a Doubly Linked List?",
            solution: "Swap the 'prev' and 'next' pointers of every node. Then update the head to point to the last node.",
        },
        {
            question: "What is the memory overhead of a Doubly Linked List?",
            solution: "It requires one extra pointer per node compared to a Singly Linked List (approx. 4 or 8 bytes per node depending on system architecture).",
        }
    ],
    exampleProblems: [],
}

export default function DoublyLinkedListPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
