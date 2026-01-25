'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiArrowRight, FiCodesandbox, FiGitPullRequest, FiSearch, FiTrash2, FiPlusCircle, FiCheckSquare, FiAlertTriangle } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Singly Linked List',
    explanationSections: [
        {
            title: '1️⃣ What is a Singly Linked List?',
            icon: <FiArrowRight className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">Singly Linked List</span> is a linear data structure where each element (called a node) points to the next node in the sequence.
                        The last node points to <code>null</code>.
                    </p>
                    <div className="bg-purple-900/20 p-2 rounded border-l-4 border-purple-500">
                        <p className="text-gray-300 text-xs">
                            <strong>Note:</strong> A Singly Linked List is one of the most fundamental implementations of the <span className="text-purple-300">List ADT</span>.
                        </p>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Node Structure:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>Data:</strong> The actual value (int, string, object).</li>
                            <li><strong>Next:</strong> A reference (pointer) to the next node.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Node Implementation in Java',
            icon: <FiCodesandbox className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        In Java, we usually define a <code>Node</code> class (often static inner class) to represent each element.
                    </p>
                    <CodeBlock
                        language="java"
                        code={`class Node {
    int data;
    Node next;

    // Constructor
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}`}
                    />
                </div>
            ),
        },
        {
            title: '3️⃣ Basic Operations',
            icon: <FiGitPullRequest className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    {/* Traversal */}
                    <div>
                        <h4 className="text-xl font-bold text-teal-400 mb-2">3.1 Traversal</h4>
                        <p className="text-gray-300 mb-2">Visiting every node to print or process data.</p>
                        <CodeBlock
                            language="java"
                            code={`void printList(Node head) {
    Node temp = head; // Start from head
    while (temp != null) {
        System.out.print(temp.data + " -> ");
        temp = temp.next; // Move to next node
    }
    System.out.println("null");
}`}
                        />
                    </div>

                    {/* Insertion */}
                    <div>
                        <h4 className="text-xl font-bold text-green-400 mb-2">3.2 Insertion</h4>
                        <div className="space-y-4">
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-green-300 font-semibold flex items-center gap-2"><FiPlusCircle /> At Head (Beginning)</p>
                                <p className="text-gray-400 text-sm mb-2">Create new node, point its next to current head, update head.</p>
                                <CodeBlock language="java" code={`Node newNode = new Node(10);\nnewNode.next = head;\nhead = newNode;`} />
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-green-300 font-semibold flex items-center gap-2"><FiPlusCircle /> At Tail (End)</p>
                                <p className="text-gray-400 text-sm mb-2">Traverse to the last node, make it point to the new node.</p>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-green-300 font-semibold flex items-center gap-2"><FiPlusCircle /> At Given Position</p>
                                <p className="text-gray-400 text-sm mb-2">Traverse to (index - 1), insert new node between current and next.</p>
                                <CodeBlock language="java" code={`Node newNode = new Node(data);\nnewNode.next = current.next;\ncurrent.next = newNode;`} />
                            </div>
                        </div>
                    </div>

                    {/* Deletion */}
                    <h4 className="text-xl font-bold text-red-400 mb-2">3.3 Deletion</h4>
                    <div className="space-y-4">
                        <div className="bg-slate-800/50 p-3 rounded">
                            <p className="text-red-300 font-semibold flex items-center gap-2"><FiTrash2 /> Delete at Head</p>
                            <p className="text-gray-400 text-sm mb-2">Simply move head to the next node. <MathRenderer math="O(1)" />.</p>
                            <CodeBlock language="java" code={`if (head != null) head = head.next;`} />
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded">
                            <p className="text-red-300 font-semibold flex items-center gap-2"><FiTrash2 /> Delete at Tail</p>
                            <p className="text-gray-400 text-sm mb-2">Traverse to second-to-last node, set its next to null. <MathRenderer math="O(n)" />.</p>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded">
                            <p className="text-red-300 font-semibold flex items-center gap-2"><FiTrash2 /> Delete by Value/Position</p>
                            <p className="text-gray-400 text-sm mb-2">Find the node <em>before</em> the target, skip the target node.</p>
                            <CodeBlock language="java" code={`prevNode.next = currentNode.next; // Bypass current node`} />
                        </div>
                    </div>
                    {/* Search */}
                    <div>
                        <h4 className="text-xl font-bold text-blue-400 mb-2">3.4 Search</h4>
                        <p className="text-gray-300 mb-2">Find if an element exists in the list.</p>
                        <CodeBlock language="java" code={`boolean search(Node head, int key) {
    Node current = head;
    while (current != null) {
        if (current.data == key) return true;
        current = current.next;
    }
    return false;
}`} />
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Complexity Analysis',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-800/50 text-cyan-400">
                            <tr>
                                <th className="px-4 py-3">Operation</th>
                                <th className="px-4 py-3">Time Complexity</th>
                                <th className="px-4 py-3">Reason</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 text-gray-300">
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Access (Index)</td>
                                <td className="px-4 py-2 text-red-400"><MathRenderer math="O(n)" /></td>
                                <td className="px-4 py-2">Must traverse from head.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Insert Head</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2">Just update 1 pointer.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Insert Tail</td>
                                <td className="px-4 py-2 text-red-400"><MathRenderer math="O(n)" /></td>
                                <td className="px-4 py-2">Must traverse to find end (unless tail pointer kept).</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Search</td>
                                <td className="px-4 py-2 text-red-400"><MathRenderer math="O(n)" /></td>
                                <td className="px-4 py-2">Linear scan required.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            ),
        },
        {
            title: '5️⃣ Advanced Operations',
            icon: <FiCodesandbox className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-purple-400 mb-2">5.1 Reverse Linked List</h4>
                        <p className="text-gray-300 mb-2">Reverse the direction of pointers. Head becomes tail, tail becomes head.</p>
                        <CodeBlock language="java" code={`Node reverse(Node head) {
    Node prev = null;
    Node current = head;
    Node next = null;
    while (current != null) {
        next = current.next;   // Store next
        current.next = prev;   // Reverse pointer
        prev = current;        // Move prev
        current = next;        // Move current
    }
    head = prev;
    return head;
}`} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-purple-400 mb-2">5.2 Cycle Detection</h4>
                        <p className="text-gray-300 mb-2"><strong>Floyd's Cycle Algorithm</strong>: Use two pointers, Slow (1 step) and Fast (2 steps). If they meet, a cycle exists.</p>
                        <CodeBlock language="java" code={`boolean hasCycle(Node head) {
    Node slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`} />
                    </div>
                </div>
            )
        },
        {
            title: '6️⃣ Summary & Common Mistakes',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                        <h5 className="text-green-300 font-bold mb-2">Summary</h5>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>Singly Linked List:</strong> Unidirectional. Efficient insertions at head.</li>
                            <li><strong>Dynamic:</strong> Grows as needed.</li>
                            <li><strong>Memory:</strong> Overhead for storing 'next' pointers.</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h5 className="text-red-400 font-bold">Common Mistakes</h5>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertTriangle className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Forgetting to update <code>next</code> pointer (causes broken list).</p>
                        </div>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertTriangle className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Losing the head reference (garbage collection deletes the list).</p>
                        </div>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertTriangle className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Infinite loops: Condition <code>temp != null</code> is wrong or not updating temp.</p>
                        </div>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "How do you reverse a Singly Linked List?",
            solution: "Iterate through the list using 3 pointers: prev, current, and next. For each node, change current.next to point to prev. Then shift all pointers forward.",
        },
        {
            question: "How to detect a cycle in a Linked List?",
            solution: "Floyd's Cycle-Finding Algorithm (Tortoise and Hare). Use two pointers: slow (move 1 step) and fast (move 2 steps). If they meet, there is a cycle.",
        },
        {
            question: "Find the middle of a Linked List in one pass.",
            solution: "Use two pointers. Fast moves 2 steps, Slow moves 1 step. When Fast reaches the end, Slow will be at the middle.",
        }
    ],
    exampleProblems: [],
}

export default function SinglyLinkedListPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
