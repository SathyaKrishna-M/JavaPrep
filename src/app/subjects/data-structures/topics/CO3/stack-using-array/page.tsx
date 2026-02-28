'use client'

import React from 'react'
import DMTopicPage from '@/components/DMTopicPage'
import { FiLayers, FiMinimize2, FiCheckSquare, FiAlertTriangle, FiCode } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'
import { FullProgram } from '@/components/FullProgramModal'

const stackUsingArrayProgram: FullProgram = {
    code: `class ArrayStack {
    private int[] arr;
    private int top;
    private int capacity;

    public ArrayStack(int size) {
        this.arr = new int[size];
        this.capacity = size;
        this.top = -1;
    }

    public void push(int x) {
        if (isFull()) {
            System.out.println("Stack Overflow! Cannot push " + x);
            return;
        }
        arr[++top] = x; 
        System.out.println("Pushed: " + x);
    }

    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack Underflow! Cannot pop.");
            return -1;
        }
        return arr[top--]; 
    }

    public int peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty.");
            return -1;
        }
        return arr[top];
    }

    public boolean isEmpty() {
        return top == -1;
    }

    public boolean isFull() {
        return top == capacity - 1;
    }

    public void printStack() {
        if (isEmpty()) {
            System.out.println("Stack is empty.");
            return;
        }
        System.out.print("Stack (Top to Bottom): ");
        for (int i = top; i >= 0; i--) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        ArrayStack stack = new ArrayStack(5);
        stack.push(10);
        stack.push(20);
        stack.push(30);
        stack.printStack();
        System.out.println("Top element is: " + stack.peek());
        System.out.println("Popped element: " + stack.pop());
        stack.printStack();
    }
}`,
    explanations: [
        { lines: [1, 2, 3, 4], content: "Declare the ArrayStack class. It uses an integer array 'arr' to store elements, an integer 'top' to track the uppermost element's index, and 'capacity' to remember the maximum size." },
        { lines: [6, 7, 8, 9, 10], content: "The constructor runs when a new stack object is created. It allocates the actual array in memory based on the requested 'size' and initializes 'top' to -1, which signifies an empty stack." },
        { lines: [12, 13, 14, 15, 16], content: "Push operation: First, we check if the stack is already full using the helper method. If so, we print an Overflow error and abort." },
        { lines: [17, 18], content: "If there's space, we use '++top' to first increment the top index, then assign the new value 'x' to that new uppermost spot in the array." },
        { lines: [21, 22, 23, 24, 25], content: "Pop operation: First, check if the stack is empty. If it is, we print an Underflow error and return a dummy value (-1)." },
        { lines: [26, 27], content: "If it has elements, we return 'arr[top]' and then immediately decrement 'top' using 'top--'. The element is still physically in the array, but it's now logically removed because the 'top' boundary moved down." },
        { lines: [29, 30, 31, 32, 33, 34, 35], content: "Peek operation: Like pop, but it only returns the value at 'arr[top]' without modifying the 'top' variable. It just lets us look at the uppermost item." },
        { lines: [37, 38, 39], content: "isEmpty Helper: Returns true if 'top' equals -1. This is a quick O(1) check." },
        { lines: [41, 42, 43], content: "isFull Helper: Returns true if 'top' has reached the last valid index of the array (capacity - 1)." },
        { lines: [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56], content: "printStack traverses from 'top' downwards to 0, printing each element to simulate looking down into a physical stack." },
        { lines: [58, 59, 60, 61, 62, 63, 64, 65, 66, 67], content: "The main method simulates a real execution flow, creating a stack of size 5, pushing/popping elements, and visualizing the state." }
    ]
};

const content = {
    title: 'Stack Implementation Using Array',
    explanationSections: [
        {
            title: '1. Introduction',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">Stack</span> is a linear data structure that follows the <strong>LIFO (Last In, First Out)</strong> principle.
                        Implementing a Stack using an Array means we use a fixed-size contiguous block of memory to store our stack elements.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Real-Life Analogy:</p>
                        <p className="text-gray-300 text-sm">
                            Think of an array stack like a <strong>CD spindle or a Pringles can</strong>.
                            It has a fixed capacity (size of the array). You can only add (push) or remove (pop) chips from the very top.
                            If the can is full, you can't add any more (Overflow), and if it's empty, you can't take any out (Underflow).
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
                        We maintain an array <code>arr</code> and an integer variable <code>top</code> that keeps track of the index of the uppermost element.
                        Initially, <code>top = -1</code> to indicate an empty stack.
                    </p>
                    <div className="bg-slate-800/80 p-6 rounded-lg font-mono text-sm text-center border border-slate-700 overflow-x-auto whitespace-pre">
                        <span className="text-gray-400 block mb-4">Capacity: 5 | Current Top Index: 2</span>
                        {`
      +-----+
  [4] |     |  <- Space available
      +-----+
  [3] |     |  <- Space available
      +-----+
  [2] | 30  |  <--- top (Index 2)
      +-----+
  [1] | 20  |
      +-----+
  [0] | 10  |  <- Bottom of Stack
      +-----+
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
                            <h5 className="text-green-400 font-bold mb-2">Push (Insert)</h5>
                            <p className="text-gray-300 text-sm mb-2">
                                Adds an element to the top of the stack.
                            </p>
                            <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                                <li>Check if stack is full (<code>top == capacity - 1</code>).</li>
                                <li>If full, throw Overflow error.</li>
                                <li>Else, increment <code>top</code> and insert at <code>arr[top]</code>.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-red-400 font-bold mb-2">Pop (Delete)</h5>
                            <p className="text-gray-300 text-sm mb-2">
                                Removes and returns the top element.
                            </p>
                            <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                                <li>Check if stack is empty (<code>top == -1</code>).</li>
                                <li>If empty, throw Underflow error.</li>
                                <li>Else, return element at <code>arr[top]</code> and decrement <code>top</code>.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-blue-400 font-bold mb-2">Peek (Search Top)</h5>
                            <p className="text-gray-300 text-sm mb-2">
                                Returns the top element without removing it.
                            </p>
                            <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                                <li>Check if stack is empty (<code>top == -1</code>).</li>
                                <li>If empty, throw Underflow error.</li>
                                <li>Else, return element at <code>arr[top]</code>.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h5 className="text-purple-400 font-bold mb-2">isEmpty & isFull</h5>
                            <p className="text-gray-300 text-sm mb-2">
                                Helper functions to check boundaries.
                            </p>
                            <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                                <li><code>isEmpty()</code> returns <code>top == -1</code></li>
                                <li><code>isFull()</code> returns <code>top == capacity - 1</code></li>
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
                        A complete, beginner-friendly Java class implementing a Stack using an Array.
                    </p>
                    <CodeBlock
                        language="java"
                        code={`class ArrayStack {
    private int[] arr;
    private int top;
    private int capacity;

    // Constructor to initialize the stack
    public ArrayStack(int size) {
        this.arr = new int[size];
        this.capacity = size;
        this.top = -1; // -1 indicates an empty stack
    }

    // Push: Add element to the top
    public void push(int x) {
        if (isFull()) {
            System.out.println("Stack Overflow! Cannot push " + x);
            return;
        }
        // Increment top and insert element
        arr[++top] = x; 
        System.out.println("Pushed: " + x);
    }

    // Pop: Remove and return the top element
    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack Underflow! Cannot pop.");
            return -1; // Return a dummy value or throw an Exception
        }
        // Return element and decrement top
        return arr[top--]; 
    }

    // Peek: View the top element without removing it
    public int peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty.");
            return -1;
        }
        return arr[top];
    }

    // Helper: Check if stack is empty
    public boolean isEmpty() {
        return top == -1;
    }

    // Helper: Check if stack is full
    public boolean isFull() {
        return top == capacity - 1;
    }

    // Traverse: Print all elements from top to bottom
    public void printStack() {
        if (isEmpty()) {
            System.out.println("Stack is empty.");
            return;
        }
        System.out.print("Stack (Top to Bottom): ");
        for (int i = top; i >= 0; i--) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }
}`}
                        fullProgram={stackUsingArrayProgram}
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
                                <td className="px-4 py-2 font-semibold">Push</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2">Direct index assignment. No shifting required.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold">Pop</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(1)" /></td>
                                <td className="px-4 py-2">Direct index access and decrement.</td>
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
                        <h5 className="text-red-400 font-bold mb-2">Common Mistakes</h5>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                            <li><strong>Pre-increment vs Post-decrement:</strong> Using <code>arr[top++] = x</code> instead of <code>arr[++top] = x</code> will insert at the wrong index and crash if top starts at -1.</li>
                            <li><strong>Ignoring Overflow:</strong> Forgetting to check <code>isFull()</code> before pushing causes <code>ArrayIndexOutOfBoundsException</code>.</li>
                            <li><strong>Memory Allocation:</strong> Forgetting to instantiate the array with <code>new int[size]</code> in the constructor.</li>
                        </ul>
                    </div>

                    <div className="bg-blue-900/10 p-4 rounded-lg border border-blue-500/30">
                        <h5 className="text-blue-400 font-bold mb-2">Interview & Viva Questions</h5>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                            <li>
                                <strong>Why use an Array Stack over a Linked List Stack?</strong>
                                <br /> <span className="text-gray-400 ml-4">Array Stacks are cache-friendly (contiguous memory) and save space because they don't store node pointers. However, their size is fixed.</span>
                            </li>
                            <li>
                                <strong>How would you implement two stacks in a single array?</strong>
                                <br /> <span className="text-gray-400 ml-4">Start Stack 1 at index 0 and grow upwards. Start Stack 2 at index n-1 and grow downwards. They only overflow when their tops meet.</span>
                            </li>
                            <li>
                                <strong>What is Dynamic Array Stack?</strong>
                                <br /> <span className="text-gray-400 ml-4">Instead of throwing Overflow, when the array gets full, create a new array double the size, copy elements over, and then push. (Like Java's <code>ArrayList</code> or <code>Stack</code> class).</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "What is the condition for an empty Array stack?",
            solution: "top == -1",
        },
        {
            question: "What is the condition for a full Array stack?",
            solution: "top == capacity - 1",
        }
    ],
    exampleProblems: [],
}

export default function StackUsingArrayPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
