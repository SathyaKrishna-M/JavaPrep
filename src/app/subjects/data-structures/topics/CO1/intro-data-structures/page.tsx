'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiDatabase, FiGrid, FiServer, FiCpu, FiLayers, FiList, FiTrendingUp, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Introduction to Data Structures',
    explanationSections: [
        {
            title: '1️⃣ What is a Data Structure?',
            icon: <FiDatabase className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">Data Structure</span> is a specialized format for organizing, processing, retrieving, and storing data. It allows us to access and modify data efficiently. Data structures help in reducing time and space complexity of programs.
                    </p>
                    <p className="text-gray-300">
                        Not only do we need to store data, but we also need to structure it in a way that makes it easy to use.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-amber-300 font-semibold mb-2">Real-World Analogy:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li><span className="text-cyan-300">Library:</span> Books are organized by genre, author, or title to find them quickly.</li>
                            <li><span className="text-cyan-300">Railway System:</span> Trains are scheduled and routed efficiently.</li>
                            <li><span className="text-cyan-300">Phone Contacts:</span> Names are sorted alphabetically for fast searching.</li>
                        </ul>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                        <p className="text-purple-300 font-semibold mb-2">Simple Example:</p>
                        <p className="text-gray-300 mb-2">Storing student marks without structure vs. with structure:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-black/30 p-2 rounded">
                                <p className="text-red-300 text-xs">Unstructured</p>
                                <code className="text-gray-400 text-xs">
                                    int m1 = 90;<br />
                                    int m2 = 85;<br />
                                    int m3 = 92;<br />
                                    // Hard to manage 100 students
                                </code>
                            </div>
                            <div className="bg-black/30 p-2 rounded">
                                <p className="text-green-300 text-xs">Structured (Array)</p>
                                <code className="text-gray-400 text-xs">
                                    {'int[] marks = {90, 85, 92};'}<br />
                                    // Easy to manage, iterate, and sort
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Why Data Structures Matter',
            icon: <FiTrendingUp className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Selecting the right data structure can drastically improve performance and efficiency.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                            <p className="text-green-300 font-semibold mb-2">Key Benefits:</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                                <li><strong>Efficient Storage:</strong> Optimizes memory usage.</li>
                                <li><strong>Fast Access:</strong> Retreiving data quickly (e.g., HashMaps).</li>
                                <li><strong>Performance:</strong> Helps reduce time and space complexity of algorithms.</li>
                                <li><strong>Scalability:</strong> Handles massive amounts of data gracefully.</li>
                            </ul>
                        </div>
                        <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
                            <p className="text-cyan-300 font-semibold mb-2">Real-World Use Cases:</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                                <li><strong>Search Engines:</strong> Use graphs and indices (Google).</li>
                                <li><strong>Social Feeds:</strong> Linked lists and trees (Instagram/Facebook).</li>
                                <li><strong>Navigation:</strong> Graphs for shortest paths (Google Maps).</li>
                                <li><strong>Databases:</strong> B-Trees for indexing data efficiently.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Classification of Data Structures',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-pink-400 mb-2">3.1 Primitive Data Structures</h4>
                        <p className="text-gray-300 mb-2">Basic structures that are directly operated upon by machine instructions. They store single values.</p>
                        <div className="bg-black/30 p-4 rounded-lg border-l-4 border-pink-500">
                            <p className="text-gray-300 text-sm mb-2"><strong>Examples:</strong> int, float, char, boolean</p>
                            <code className="text-green-300 text-sm">
                                int age = 25;<br />
                                float price = 10.99;<br />
                                char grade = 'A';
                            </code>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-purple-400 mb-2">3.2 Non-Primitive Data Structures</h4>
                        <p className="text-gray-300 mb-2">Derived from primitive data structures. They store collections of data.</p>
                        <ul className="list-disc list-inside text-gray-300 ml-4">
                            <li><strong>Linear:</strong> Data elements arranged sequentially.</li>
                            <li><strong>Non-Linear:</strong> Data elements arranged hierarchically or interconnected.</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-blue-400 mb-2">3.3 Linear Data Structures</h4>
                        <p className="text-gray-300 mb-2">Elements are arranged sequentially, and each element (except the last) has a logical successor.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-blue-900/20 p-3 rounded border border-blue-500/20">
                                <p className="text-blue-300 font-semibold">Arrays</p>
                                <p className="text-gray-400 text-sm">Fixed-size, contiguous memory locations.</p>
                            </div>
                            <div className="bg-blue-900/20 p-3 rounded border border-blue-500/20">
                                <p className="text-blue-300 font-semibold">Linked Lists</p>
                                <p className="text-gray-400 text-sm">Nodes connected by pointers.</p>
                            </div>
                            <div className="bg-blue-900/20 p-3 rounded border border-blue-500/20">
                                <p className="text-blue-300 font-semibold">Stacks</p>
                                <p className="text-gray-400 text-sm">LIFO (Last In First Out) - e.g., Undo feature.</p>
                            </div>
                            <div className="bg-blue-900/20 p-3 rounded border border-blue-500/20">
                                <p className="text-blue-300 font-semibold">Queues</p>
                                <p className="text-gray-400 text-sm">FIFO (First In First Out) - e.g., Printer queue.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-orange-400 mb-2">3.4 Non-Linear Data Structures</h4>
                        <p className="text-gray-300 mb-2">Elements are not in a sequence but connected hierarchically or as a network. Traversal is not sequential and depends on the structure.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-orange-900/20 p-3 rounded border border-orange-500/20">
                                <p className="text-orange-300 font-semibold">Trees</p>
                                <p className="text-gray-400 text-sm">Hierarchical structure (e.g., Folder structure, Family tree).</p>
                            </div>
                            <div className="bg-orange-900/20 p-3 rounded border border-orange-500/20">
                                <p className="text-orange-300 font-semibold">Graphs</p>
                                <p className="text-gray-400 text-sm">Network of nodes (e.g., Social network, Road map).</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <h4 className="text-lg font-bold text-teal-400 mb-2">3.5 Static Data Structures</h4>
                            <p className="text-gray-300 text-sm mb-2">Static data structures allocate memory at compile time. Size is fixed.</p>
                            <div className="bg-black/30 p-3 rounded">
                                <p className="text-gray-400 text-xs mb-1">Example: Array</p>
                                <code className="text-green-300 text-xs">int[] arr = new int[5];</code>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-teal-400 mb-2">3.6 Dynamic Data Structures</h4>
                            <p className="text-gray-300 text-sm mb-2">Dynamic data structures allocate memory at runtime. Size can grow/shrink.</p>
                            <div className="bg-black/30 p-3 rounded">
                                <p className="text-gray-400 text-xs mb-1">Example: Linked List</p>
                                <code className="text-green-300 text-xs">LinkedList list = new LinkedList();</code>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Abstract Data Types (ADT)',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        An <span className="text-cyan-400 font-semibold">Abstract Data Type (ADT)</span> defines <em>what</em> operations can be performed on data, but not <em>how</em> they are implemented.
                    </p>
                    <p className="text-gray-400 italic text-sm">
                        Analogy: A car interface (steering, pedals) is the ADT. The engine mechanism (internal combustion vs electric) is the implementation.
                    </p>
                    <p className="text-gray-300 text-sm">
                        A List ADT is one of the most fundamental ADTs and can be implemented using arrays or linked lists.
                    </p>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="uppercase tracking-wider border-b-2 border-slate-700 bg-slate-800/50">
                                <tr>
                                    <th className="px-4 py-3 text-cyan-400">ADT</th>
                                    <th className="px-4 py-3 text-cyan-400">Operations</th>
                                    <th className="px-4 py-3 text-cyan-400">Possible Implementations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-gray-300">
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-blue-300">Stack ADT</td>
                                    <td className="px-4 py-2">push(), pop(), peek(), isEmpty()</td>
                                    <td className="px-4 py-2">Array, Linked List</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-blue-300">Queue ADT</td>
                                    <td className="px-4 py-2">enqueue(), dequeue(), peek()</td>
                                    <td className="px-4 py-2">Array, Linked List</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-blue-300">List ADT</td>
                                    <td className="px-4 py-2">add(), remove(), get(), size()</td>
                                    <td className="px-4 py-2">Dynamic Array, Linked List</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30 mt-4">
                        <p className="text-amber-300 font-semibold mb-1">Note:</p>
                        <p className="text-gray-300 text-sm">
                            An Abstract Data Type (ADT) defines what operations are allowed, not how they are implemented or their time complexity.
                            Performance depends on the underlying data structure (array or linked list).
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: '5️⃣ Applications of Data Structures',
            icon: <FiServer className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">Data structures are foundational to almost every software system.</p>
                    <ul className="space-y-3">
                        <li className="bg-slate-800/50 p-3 rounded-lg">
                            <strong className="text-purple-400 block">Operating Systems</strong>
                            <span className="text-gray-300 text-sm">Task scheduling uses <strong>Queues</strong>. File systems use <strong>Trees</strong>.</span>
                        </li>
                        <li className="bg-slate-800/50 p-3 rounded-lg">
                            <strong className="text-purple-400 block">Databases</strong>
                            <span className="text-gray-300 text-sm">Indexing uses <strong>B-Trees</strong> or <strong>Hash Tables</strong> for fast retrieval.</span>
                        </li>
                        <li className="bg-slate-800/50 p-3 rounded-lg">
                            <strong className="text-purple-400 block">Compiler Design</strong>
                            <span className="text-gray-300 text-sm">Syntax analysis uses <strong>Stacks</strong> to check for balanced parentheses.</span>
                        </li>
                        <li className="bg-slate-800/50 p-3 rounded-lg">
                            <strong className="text-purple-400 block">Computer Networks</strong>
                            <span className="text-gray-300 text-sm">Routing algorithms use <strong>Graphs</strong> to find the shortest path.</span>
                        </li>
                        <li className="bg-slate-800/50 p-3 rounded-lg">
                            <strong className="text-purple-400 block">Artificial Intelligence</strong>
                            <span className="text-gray-300 text-sm">Decision Trees and Knowledge Graphs store complex relationships.</span>
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            title: '6️⃣ Summary (Quick Revision)',
            icon: <FiCheckCircle className="w-6 h-6" />,
            content: (
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li><strong>Data Structure</strong>: Organized way to store and operate on data.</li>
                        <li><strong>Primitive</strong>: int, char, float (Basic values).</li>
                        <li><strong>Non-Primitive</strong>: Arrays, Lists, Trees (Collections).</li>
                        <li><strong>Linear</strong>: Sequential (Array, Stack, Queue).</li>
                        <li><strong>Non-Linear</strong>: Hierarchical/Network (Tree, Graph).</li>
                        <li><strong>ADT</strong>: Defines operations (Interface) without implementation details.</li>
                        <li><strong>Static vs Dynamic</strong>: Fixed size (Array) vs Flexible size (Linked List).</li>
                        <li><strong>Efficiency</strong>: Choice of data structure directly impacts algorithm efficiency.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '7️⃣ Common Mistakes & Misconceptions',
            icon: <FiAlertTriangle className="w-6 h-6" />,
            content: (
                <div className="space-y-3">
                    <div className="border-l-4 border-red-500 pl-4 py-1">
                        <strong className="text-red-400 block">Confusing Data Types & Data Structures</strong>
                        <p className="text-gray-400 text-sm">Data Type = What kind of data (int, char). Data Structure = How data is organized (Array, Tree).</p>
                    </div>
                    <div className="border-l-4 border-amber-500 pl-4 py-1">
                        <strong className="text-amber-400 block">"Arrays are always best"</strong>
                        <p className="text-gray-400 text-sm">Arrays provide fast access but have fixed size and slow insertion/deletion. Linked Lists often solve these issues.</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 py-1">
                        <strong className="text-blue-400 block">Ignoring Memory</strong>
                        <p className="text-gray-400 text-sm">Always consider space complexity. A solution that works for 10 items might fail for 10 million.</p>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is the main difference between Linear and Non-Linear data structures?",
            solution: "Linear data structures arrange elements sequentially (e.g., Arrays, Stacks), whereas Non-Linear data structures arrange elements hierarchically or as a network (e.g., Trees, Graphs).",
        },
        {
            question: "Given a requirement to constantly add and remove items from the middle of a list, which data structure would you choose: Array or Linked List, and why?",
            solution: "Linked List. Arrays require shifting elements when inserting/deleting from the middle, which is expensive O(n). Linked List insertion/deletion is O(1) if we have the pointer.",
        },
        {
            question: "What is an Abstract Data Type (ADT)? Give one example.",
            solution: "An ADT is a logical description of a data structure that defines the operations that can be performed without specifying how they are implemented. Example: A Stack ADT defines push and pop operations.",
        },
        {
            question: "Name two applications of Stack data structures.",
            solution: "1. Undo mechanism in text editors. 2. Function call management (Call Stack) in programming languages.",
        },
        {
            question: "Why are Arrays considered Static Data Structures?",
            solution: "Because their size must be determined at compile-time (or creation time) and cannot be changed later. Memory is allocated in a fixed contiguous block.",
        },
        {
            question: "Which data structure is best for implementing a dictionary or phonebook for fast lookups?",
            solution: "A Hash Table (or HashMap) is typically best because it offers average O(1) time complexity for search operations.",
        },
        {
            question: "MCQ: Which of the following is a Non-Linear Data Structure?\n A) Stack\n B) Queue\n C) Tree\n D) Linked List",
            solution: "C) Tree",
        },
        {
            question: "MCQ: Memory for a Linked List is allocated from:\n A) Stack\n B) Heap\n C) CPU Registers\n D) Disk",
            solution: "B) Heap (Dynamic memory allocation uses the heap)",
        },
        {
            question: "MCQ: Which ADT follows the First-In-First-Out (FIFO) principle?\n A) Stack\n B) Queue\n C) Tree\n D) Graph",
            solution: "B) Queue",
        },
        {
            question: "Interview Question: Explain the difference between File Structure and Storage Structure.",
            solution: "Storage Structure refers to the representation of the data structure in the computer memory (RAM). File Structure refers to the representation of the data on auxiliary storage (Disk) like text files or databases.",
        },
        {
            question: "Interview Question: When would you use a Linked List over an Array?",
            solution: "Use a Linked List when: 1) You don't know the exact number of elements in advance (Dynamic size). 2) You need frequent insertions and deletions relative to retrievals.",
        },
        {
            question: "Interview Question: Can we implement a Stack using a Queue?",
            solution: "Yes, by using two queues. The push operation is complex (O(n)) to maintain LIFO order, or pop is complex depending on implementation.",
        }
    ],
    exampleProblems: [],
}

export default function IntroDataStructuresPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
