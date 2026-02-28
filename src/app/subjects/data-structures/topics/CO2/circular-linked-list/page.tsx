'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiRefreshCw, FiGrid, FiRotateCw, FiCheckSquare, FiPlayCircle, FiCpu, FiAlertTriangle, FiSearch, FiTrash2, FiPlusCircle } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'
import { FullProgram } from '@/components/FullProgramModal'

const circularLinkedListProgram: FullProgram = {
    code: `class Node {
    int data;
    Node next;

    public Node(int data) {
        this.data = data;
        this.next = null;
    }
}

public class CircularLinkedList {
    private Node head;

    public CircularLinkedList() {
        this.head = null;
    }

    public void insertAtHead(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            newNode.next = head;
            return;
        }
        
        Node tail = head;
        while (tail.next != head) {
            tail = tail.next;
        }
        
        newNode.next = head;
        tail.next = newNode;
        head = newNode;
    }

    public void insertAtTail(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            newNode.next = head;
            return;
        }
        
        Node tail = head;
        while (tail.next != head) {
            tail = tail.next;
        }
        
        tail.next = newNode;
        newNode.next = head;
    }

    public void printList() {
        if (head == null) {
            System.out.println("List is empty.");
            return;
        }
        
        Node temp = head;
        System.out.print("Circular List: ");
        do {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        } while (temp != head);
        
        System.out.println("(head)");
    }

    public static void main(String[] args) {
        CircularLinkedList list = new CircularLinkedList();
        System.out.println("Inserting 10 and 20 at head:");
        list.insertAtHead(10);
        list.insertAtHead(20);
        list.printList();
        
        System.out.println("\\nInserting 30 at tail:");
        list.insertAtTail(30);
        list.printList();
    }
}`,
    explanations: [
        { lines: [1, 2, 3, 4, 5, 6, 7, 8, 9], content: "Define the Node class for our Circular Linked List. Each node contains an integer data field and a reference to the 'next' node." },
        { lines: [11, 12, 13, 14, 15, 16], content: "Declare the CircularLinkedList class and define its single 'head' pointer. The constructor initializes it to null, indicating the list is initially empty." },
        { lines: [18, 19, 20, 21, 22, 23, 24, 25], content: "insertAtHead method logic: Create the new node. If the list is empty, the new node becomes the head, and its 'next' pointer points to itself, forming a circle of one." },
        { lines: [26, 27, 28, 29, 30], content: "If the list is not empty, we need to find the last node (tail) because its 'next' pointer must be updated to point to the new head." },
        { lines: [31, 32, 33, 34, 35], content: "Update pointers: the new node points to the current head, the tail points to the new node, and finally, the head reference is updated to point to the new node." },
        { lines: [37, 38, 39, 40, 41, 42, 43], content: "insertAtTail method logic: Similar to head insertion, if the list is empty, the new node becomes the head and points to itself." },
        { lines: [44, 45, 46, 47, 48], content: "Find the last node (tail) by traversing until tail.next == head." },
        { lines: [49, 50, 51, 52], content: "Update the old tail to point to the new node, and set the new node's next to point to the head, maintaining the circular structure." },
        { lines: [54, 55, 56, 57, 58], content: "printList method logic: Handle the empty list case by checking if head is null." },
        { lines: [59, 60, 61, 62, 63, 64, 65, 66, 67, 68], content: "Use a do-while loop to traverse the list. This guarantees we print at least the first node, and we stop traversing only when the 'next' pointer leads us back to the head." },
        { lines: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81], content: "The main method to test and demonstrate our Circular Linked List operations." }
    ]
};

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
                                <CodeBlock language="java" code={`Node temp = head;
for (int i = 1; i < pos - 1 && temp.next != head; i++) {
    temp = temp.next;
}
newNode.next = temp.next;
temp.next = newNode;`} />
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
                                <CodeBlock language="java" code={`if (head == null || head.next == head) {
    head = null; return;
}
Node temp = head;
while (temp.next.next != head) temp = temp.next; // Stop at second last
temp.next = head;`} />
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
            title: '4️⃣ Java Implementation',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A complete Java class implementing a Circular Singly Linked List with insertion and traversal operations.
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

class CircularLinkedList {
    private Node head;

    public CircularLinkedList() {
        this.head = null;
    }

    // Insert at Head
    public void insertAtHead(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            newNode.next = head; // Point to itself
            return;
        }
        
        Node tail = head;
        while (tail.next != head) {
            tail = tail.next;
        }
        
        newNode.next = head;
        tail.next = newNode;
        head = newNode; // Update head
    }

    // Insert at Tail
    public void insertAtTail(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            newNode.next = head;
            return;
        }
        
        Node tail = head;
        while (tail.next != head) {
            tail = tail.next;
        }
        
        tail.next = newNode;
        newNode.next = head; // Maintain circular link
    }

    // Traverse
    public void printList() {
        if (head == null) {
            System.out.println("List is empty.");
            return;
        }
        
        Node temp = head;
        System.out.print("Circular List: ");
        do {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        } while (temp != head);
        
        System.out.println("(head)");
    }
}`}
                        fullProgram={circularLinkedListProgram}
                    />
                </div>
            ),
        },
        {
            title: '5️⃣ Advanced Operations',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-purple-400 mb-2">5.1 Reverse Circular List</h4>
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
