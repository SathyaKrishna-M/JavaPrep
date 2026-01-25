'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiSearch, FiList, FiMinimize2, FiGitMerge, FiActivity, FiAlertTriangle, FiCheckSquare, FiUserCheck } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Searching Algorithms',
    explanationSections: [
        {
            title: '1️⃣ Introduction to Searching',
            icon: <FiSearch className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <span className="text-cyan-400 font-semibold">Searching</span> is the process of locating a specific element (key) within a collection of data.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Why is it important?</p>
                        <p className="text-gray-300 text-sm">Most operations (Update, Delete) typically require searching first.</p>
                        <div className="mt-3">
                            <p className="text-purple-300 font-semibold text-sm mb-1">Real-World Examples:</p>
                            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                                <li>Finding a contact number in your phone.</li>
                                <li>Looking up a word in a dictionary.</li>
                                <li>Retrieving a student record from a database.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Linear Search',
            icon: <FiList className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-orange-400 mb-2">2.1 Concept</h4>
                        <p className="text-gray-300 mb-2">
                            The simplest searching method. It checks every element in the list sequentially until a match is found or the list takes end.
                        </p>
                        <div className="bg-orange-900/10 p-3 rounded border-l-4 border-orange-500">
                            <p className="text-gray-300 text-sm">
                                <strong>When to use:</strong> When the list is small or unsorted.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-orange-400 mb-2">2.2 Implementation</h4>
                        <div className="my-4">
                            <CodeBlock
                                language="java"
                                code={`// Java Implementation
public int linearSearch(int[] arr, int key) {
    // Traverse the entire array
    for (int i = 0; i < arr.length; i++) {
        // Check if current element matches key
        if (arr[i] == key) {
            return i; // Found, return index
        }
    }
    return -1; // Not found
}`}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-orange-400 mb-2">2.3 Complexity Analysis</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-teal-400 font-semibold text-sm">Time Complexity</p>
                                <ul className="text-gray-400 text-xs mt-1 space-y-1">
                                    <li><strong>Best Case:</strong> <MathRenderer math="O(1)" /> (First element)</li>
                                    <li><strong>Average Case:</strong> <MathRenderer math="O(n)" /> (On average, examines n/2 elements)</li>
                                    <li><strong>Worst Case:</strong> <MathRenderer math="O(n)" /> (Last element/Not found)</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-teal-400 font-semibold text-sm">Space Complexity</p>
                                <p className="text-gray-400 text-xs mt-1"><MathRenderer math="O(1)" /> (No extra space used)</p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Binary Search',
            icon: <FiMinimize2 className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-green-400 mb-2">3.1 Concept</h4>
                        <p className="text-gray-300 mb-2">
                            An efficient algorithm that works on the "Divide and Conquer" principle. It repeatedly divides the search interval in half.
                        </p>
                        <div className="bg-red-900/10 p-3 rounded border-l-4 border-red-500">
                            <p className="text-gray-300 text-sm">
                                <strong>Key Requirement:</strong> The array MUST be <strong>sorted</strong>.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-green-400 mb-2">3.2 Implementation</h4>
                        <div className="my-4">
                            <CodeBlock
                                language="java"
                                code={`// Iterative Binary Search (Java)
public int binarySearch(int[] arr, int key) {
    int left = 0, right = arr.length - 1;
    
    while (left <= right) {
        // Calculate mid to avoid overflow
        int mid = left + (right - left) / 2;

        if (arr[mid] == key)
            return mid; // Found

        if (arr[mid] < key)
            left = mid + 1; // Search right half
        else
            right = mid - 1; // Search left half
    }
    return -1; // Not found
}`}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-green-400 mb-2">3.3 Complexity Analysis</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-teal-400 font-semibold text-sm">Time Complexity</p>
                                <ul className="text-gray-400 text-xs mt-1 space-y-1">
                                    <li><strong>Best Case:</strong> <MathRenderer math="O(1)" /> (Found at mid)</li>
                                    <li><strong>Average Case:</strong> <MathRenderer math="O(\log n)" /> (Assumes uniform distribution)</li>
                                    <li><strong>Worst Case:</strong> <MathRenderer math="O(\log n)" /></li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-teal-400 font-semibold text-sm">Space Complexity</p>
                                <ul className="text-gray-400 text-xs mt-1 space-y-1">
                                    <li><strong>Iterative:</strong> <MathRenderer math="O(1)" /></li>
                                    <li><strong>Recursive:</strong> <MathRenderer math="O(\log n)" /> (Stack space)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Linear vs Binary Search',
            icon: <FiGitMerge className="w-6 h-6" />,
            content: (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-800/50 text-cyan-400">
                            <tr>
                                <th className="px-4 py-3">Feature</th>
                                <th className="px-4 py-3">Linear Search</th>
                                <th className="px-4 py-3">Binary Search</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 text-gray-300">
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Approach</td>
                                <td className="px-4 py-2">Sequential check</td>
                                <td className="px-4 py-2">Divide and Conquer</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Time Complexity (Worst)</td>
                                <td className="px-4 py-2"><MathRenderer math="O(n)" /></td>
                                <td className="px-4 py-2"><MathRenderer math="O(\log n)" /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Prerequisite</td>
                                <td className="px-4 py-2">None (Works on unsorted)</td>
                                <td className="px-4 py-2"><strong>Must be Sorted</strong></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Best Use Case</td>
                                <td className="px-4 py-2">Small or unsorted lists</td>
                                <td className="px-4 py-2">Large sorted datasets</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ),
        },
        {
            title: '5️⃣ Summary & Common Mistakes',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                        <h5 className="text-green-300 font-bold mb-2">Summary</h5>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>Linear Search:</strong> Simple, works on any list. Time: <MathRenderer math="O(n)" />.</li>
                            <li><strong>Binary Search:</strong> Fast, requires sorted list. Time: <MathRenderer math="O(\log n)" />.</li>
                            <li><strong>Mid Calculation:</strong> Use <code>left + (right - left) / 2</code> to prevent overflow.</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h5 className="text-red-400 font-bold">Common Mistakes</h5>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertTriangle className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Applying Binary Search on <strong>unsorted</strong> data. It will fail silently or give wrong index.</p>
                        </div>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertTriangle className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Infinite loop in Binary Search due to incorrect indices (using <code>left = mid</code> instead of <code>mid + 1</code>).</p>
                        </div>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is the worst-case time complexity of Binary Search on an array of size n?",
            solution: "O(log n). In each step, the search space is reduced by half.",
        },
        {
            question: "Why is Binary Search not suitable for Linked Lists?",
            solution: "Binary Search requires random access (indexing) to jump to the middle element in O(1) time. Linked Lists take O(n) to reach the middle, negating the speed advantage.",
        },
        {
            question: "Given an array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]. How many comparisons are needed to find 23 using Binary Search?",
            solution: "Approx 3 comparisons. 1. Mid=16 (23>16), Right half. 2. Mid=56 (23<56), Left part. 3. Mid=23 (Found).",
        },
        {
            question: "Can Linear Search be implemented recursively?",
            solution: "Yes. Base condition: array empty or element found. Recursive step: search next index. However, it's inefficient due to stack overhead.",
        },
        {
            question: "MCQ: Which condition is necessary for Binary Search Algorithm to work?\n A) Array size must be even\n B) Array must be sorted\n C) Array must be distinct\n D) Array must be of integers",
            solution: "B) Array must be sorted",
        },
        {
            question: "MCQ: What is the average case complexity of Linear Search?\n A) O(n)\n B) O(log n)\n C) O(1)\n D) O(n/2)",
            solution: "A) O(n). (Technically n/2, but we drop constants)",
        },
        {
            question: "MCQ: In Binary Search, if `left > right`, what does it imply?\n A) Element found\n B) Element not found\n C) Array is unsorted\n D) Restart search",
            solution: "B) Element not found",
        },
        {
            question: "Interview Question: How to find the first occurrence of a number in a sorted array containing duplicates?",
            solution: "Standard Binary Search stops at *any* match. To find the *first*, if `arr[mid] == key`, store the index and continue searching in the left half (right = mid - 1).",
        },
        {
            question: "Interview Question: Find the square root of a number x using Binary Search.",
            solution: "Search range [0, x]. If mid*mid == x, return mid. If mid*mid < x, store mid as ans and search right. Else search left. Complexity O(log x).",
        }
    ],
    exampleProblems: [],
}

export default function SearchingAlgorithmsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
