'use client'

import DMTopicPage from '@/components/DMTopicPage'
import CodeBlock from '@/components/CodeBlock'
import { FiList, FiBarChart2, FiLayers, FiMinimize2, FiGrid, FiActivity, FiCheckSquare, FiAlertTriangle } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
    title: 'Sorting Algorithms',
    explanationSections: [
        {
            title: '1️⃣ Introduction to Sorting',
            icon: <FiList className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <span className="text-cyan-400 font-semibold">Sorting</span> is the process of arranging data in a specific order (Ascending or Descending).
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Why is it required?</p>
                        <p className="text-gray-300 text-sm">Sorted data is easier to search (Binary Search), analyze, and display.</p>
                        <div className="mt-3">
                            <p className="text-purple-300 font-semibold text-sm mb-1">Real-World Examples:</p>
                            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                                <li><strong>Student Marks:</strong> Ranking students by GPA.</li>
                                <li><strong>E-commerce:</strong> Sorting products by "Price: Low to High".</li>
                                <li><strong>Leaderboards:</strong> Displaying top players in games.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Bubble Sort',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-orange-400 mb-2">2.1 Concept</h4>
                        <p className="text-gray-300 mb-2">
                            The simplest sorting algorithm. It works by repeatedly swapping the adjacent elements if they are in the wrong order. Large elements "bubble" to the end.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-orange-400 mb-2">2.2 Implementation</h4>
                        <div className="my-4">
                            <CodeBlock
                                language="java"
                                code={`// Java Implementation (Optimized with Generics)
public <T extends Comparable<T>> void bubbleSort(T[] arr) {
    int n = arr.length;
    boolean swapped;
    
    // Outer loop for passes
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        
        // Inner loop - elements bubble up
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j].compareTo(arr[j + 1]) > 0) {
                // Swap neighbors
                T temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        
        // Optimization: Stop if no swaps occur
        if (!swapped) break; 
    }
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
                                    <li><strong>Best Case:</strong> <MathRenderer math="O(n)" /> (Array already sorted + optimized version)</li>
                                    <li><strong>Average Case:</strong> <MathRenderer math="O(n^2)" /></li>
                                    <li><strong>Worst Case:</strong> <MathRenderer math="O(n^2)" /> (Reverse sorted)</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-teal-400 font-semibold text-sm">Space Complexity</p>
                                <p className="text-gray-400 text-xs mt-1"><MathRenderer math="O(1)" /> (In-place)</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2"><strong>Stability:</strong> Stable (Does not swap equal elements).</p>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Selection Sort',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-blue-400 mb-2">3.1 Concept</h4>
                        <p className="text-gray-300 mb-2">
                            Repeatedly finds the <strong>minimum element</strong> from the unsorted part and puts it at the beginning.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-blue-400 mb-2">3.2 Implementation</h4>
                        <div className="my-4">
                            <CodeBlock
                                language="java"
                                code={`// Java Implementation (Generics)
public <T extends Comparable<T>> void selectionSort(T[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i; // Assume current is min
        
        // Find min in remaining unsorted array
        for (int j = i + 1; j < n; j++) {
            if (arr[j].compareTo(arr[minIdx]) < 0) {
                minIdx = j;
            }
        }
        
        // Swap min with first element of unsorted part
        T temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}`}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-blue-400 mb-2">3.3 Complexity Analysis</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-teal-400 font-semibold text-sm">Time Complexity</p>
                                <p className="text-gray-400 text-xs mt-1"><MathRenderer math="O(n^2)" /> (Always scans to find min)</p>
                                <p className="text-xs text-red-400 mt-1 italic">Not stable: Swapping changes order of equal elements.</p>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-teal-400 font-semibold text-sm">Space Complexity</p>
                                <p className="text-gray-400 text-xs mt-1"><MathRenderer math="O(1)" /> (In-place)</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2"><strong>Stability:</strong> Unstable (Swapping can reorder equal elements).</p>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Insertion Sort',
            icon: <FiBarChart2 className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-green-400 mb-2">4.1 Concept</h4>
                        <p className="text-gray-300 mb-2">
                            Builds the sorted array one item at a time. Similar to how you sort <strong>playing cards</strong> in your hand. Adaptive in nature.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-green-400 mb-2">4.2 Implementation</h4>
                        <div className="my-4">
                            <CodeBlock
                                language="java"
                                code={`// Java Implementation (Generics)
public <T extends Comparable<T>> void insertionSort(T[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        T key = arr[i]; // Card to be inserted
        int j = i - 1;
        
        // Move elements greater than key one pos ahead
        while (j >= 0 && arr[j].compareTo(key) > 0) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key; // Insert card
    }
}`}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-green-400 mb-2">4.3 Complexity Analysis</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-teal-400 font-semibold text-sm">Time Complexity</p>
                                <ul className="text-gray-400 text-xs mt-1 space-y-1">
                                    <li><strong>Best Case:</strong> <MathRenderer math="O(n)" /> (Almost sorted)</li>
                                    <li><strong>Worst Case:</strong> <MathRenderer math="O(n^2)" /></li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-teal-400 font-semibold text-sm">Space Complexity</p>
                                <p className="text-gray-400 text-xs mt-1"><MathRenderer math="O(1)" /></p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2"><strong>Stability:</strong> Stable.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '5️⃣ Merge Sort',
            icon: <FiGitMergeIcon className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-purple-400 mb-2">5.1 Concept</h4>
                        <p className="text-gray-300 mb-2">
                            A <strong>Divide and Conquer</strong> algorithm. Divides the array into halves, recursively sorts them, and then merges the sorted halves.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-purple-400 mb-2">5.2 Implementation</h4>
                        <div className="my-4">
                            <CodeBlock
                                language="java"
                                code={`// Java Implementation (Generics)
public <T extends Comparable<T>> void mergeSort(T[] arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

<T extends Comparable<T>> void merge(T[] arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    
    // Create generic arrays using Object casting (common Java workaround)
    @SuppressWarnings("unchecked")
    T[] L = (T[]) new Comparable[n1];
    @SuppressWarnings("unchecked")
    T[] R = (T[]) new Comparable[n2];
    
    // Copy data
    for (int i=0; i<n1; ++i) L[i] = arr[l + i];
    for (int j=0; j<n2; ++j) R[j] = arr[m + 1 + j];
    
    // Merge
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i].compareTo(R[j]) <= 0) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}`}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-purple-400 mb-2">5.3 Complexity Analysis</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-teal-400 font-semibold text-sm">Time Complexity</p>
                                <p className="text-gray-400 text-xs mt-1"><MathRenderer math="O(n \log n)" /> (All Cases)</p>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-teal-400 font-semibold text-sm">Space Complexity</p>
                                <p className="text-gray-400 text-xs mt-1"><MathRenderer math="O(n)" /> (Auxiliary Arrays)</p>
                                <p className="text-xs text-yellow-400 mt-1 italic">Not In-Place</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2"><strong>Stability:</strong> Stable. <strong>In-Place:</strong> No.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '6️⃣ Quick Sort',
            icon: <FiMinimize2 className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-red-500 mb-2">6.1 Concept</h4>
                        <p className="text-gray-300 mb-2">
                            Another Divide and Conquer algorithm. Picks a "pivot" element and partitions the array such that smaller elements are left, larger are right.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-red-500 mb-2">6.2 Implementation</h4>
                        <div className="my-4">
                            <CodeBlock
                                language="java"
                                code={`// Java Implementation (Generics)
<T extends Comparable<T>> void quickSort(T[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

<T extends Comparable<T>> int partition(T[] arr, int low, int high) {
    T pivot = arr[high]; 
    int i = (low - 1); // Index of smaller element
    
    for (int j = low; j < high; j++) {
        if (arr[j].compareTo(pivot) < 0) {
            i++;
            // Swap arr[i], arr[j]
            T temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
    }
    // Swap pivot to correct pos
    T temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
    return i + 1;
}`}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-red-500 mb-2">6.3 Complexity Analysis</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-teal-400 font-semibold text-sm">Time Complexity</p>
                                <ul className="text-gray-400 text-xs mt-1 space-y-1">
                                    <li><strong>Best/Avg:</strong> <MathRenderer math="O(n \log n)" /></li>
                                    <li><strong>Worst:</strong> <MathRenderer math="O(n^2)" /> (Pivot is smallest/largest element)</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded">
                                <p className="text-teal-400 font-semibold text-sm">Space Complexity</p>
                                <p className="text-gray-400 text-xs mt-1"><MathRenderer math="O(\log n)" /> (Stack)</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2"><strong>Stability:</strong> Unstable. <strong>In-Place:</strong> Yes.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '7️⃣ Comparison Table',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-xs whitespace-nowrap">
                        <thead className="bg-slate-800/50 text-cyan-400">
                            <tr>
                                <th className="px-3 py-2">Algorithm</th>
                                <th className="px-3 py-2">Best</th>
                                <th className="px-3 py-2">Average</th>
                                <th className="px-3 py-2">Worst</th>
                                <th className="px-3 py-2">Space</th>
                                <th className="px-3 py-2">Stable</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 text-gray-300">
                            <tr>
                                <td className="px-3 py-2 font-semibold">Bubble</td>
                                <td className="px-3 py-2"><MathRenderer math="O(n)" /></td>
                                <td className="px-3 py-2"><MathRenderer math="O(n^2)" /></td>
                                <td className="px-3 py-2"><MathRenderer math="O(n^2)" /></td>
                                <td className="px-3 py-2"><MathRenderer math="O(1)" /></td>
                                <td className="px-3 py-2 text-green-400">Yes</td>
                            </tr>
                            <tr>
                                <td className="px-3 py-2 font-semibold">Selection</td>
                                <td className="px-3 py-2"><MathRenderer math="O(n^2)" /></td>
                                <td className="px-3 py-2"><MathRenderer math="O(n^2)" /></td>
                                <td className="px-3 py-2"><MathRenderer math="O(n^2)" /></td>
                                <td className="px-3 py-2"><MathRenderer math="O(1)" /></td>
                                <td className="px-3 py-2 text-red-400">No</td>
                            </tr>
                            <tr>
                                <td className="px-3 py-2 font-semibold">Insertion</td>
                                <td className="px-3 py-2"><MathRenderer math="O(n)" /></td>
                                <td className="px-3 py-2"><MathRenderer math="O(n^2)" /></td>
                                <td className="px-3 py-2"><MathRenderer math="O(n^2)" /></td>
                                <td className="px-3 py-2"><MathRenderer math="O(1)" /></td>
                                <td className="px-3 py-2 text-green-400">Yes</td>
                            </tr>
                            <tr>
                                <td className="px-3 py-2 font-semibold">Merge</td>
                                <td className="px-3 py-2"><MathRenderer math="O(n \log n)" /></td>
                                <td className="px-3 py-2"><MathRenderer math="O(n \log n)" /></td>
                                <td className="px-3 py-2"><MathRenderer math="O(n \log n)" /></td>
                                <td className="px-3 py-2"><MathRenderer math="O(n)" /></td>
                                <td className="px-3 py-2 text-green-400">Yes</td>
                            </tr>
                            <tr>
                                <td className="px-3 py-2 font-semibold">Quick</td>
                                <td className="px-3 py-2"><MathRenderer math="O(n \log n)" /></td>
                                <td className="px-3 py-2"><MathRenderer math="O(n \log n)" /></td>
                                <td className="px-3 py-2"><MathRenderer math="O(n^2)" /></td>
                                <td className="px-3 py-2"><MathRenderer math="O(\log n)" /></td>
                                <td className="px-3 py-2 text-red-400">No</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        },
        {
            title: '8️⃣ When to Use Which Algorithm',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-cyan-500">
                        <p className="text-gray-300 text-sm mb-2">
                            <strong>Stability Definition:</strong> A sorting algorithm is <strong>stable</strong> if it preserves the relative order of equal elements. This is important when sorting objects with multiple implementation fields.
                        </p>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <li className="bg-black/30 p-3 rounded border border-gray-700">
                            <strong className="text-teal-400 block mb-1">Bubble Sort</strong>
                            <span className="text-gray-400 text-xs">For learning purposes or extremely small datasets.</span>
                        </li>
                        <li className="bg-black/30 p-3 rounded border border-gray-700">
                            <strong className="text-teal-400 block mb-1">Insertion Sort</strong>
                            <span className="text-gray-400 text-xs">Best for <strong>nearly sorted</strong> data or small arrays (adaptive).</span>
                        </li>
                        <li className="bg-black/30 p-3 rounded border border-gray-700">
                            <strong className="text-teal-400 block mb-1">Merge Sort</strong>
                            <span className="text-gray-400 text-xs">Preferred for <strong>Linked Lists</strong> and when <strong>stability</strong> is required. Predictable O(n log n).</span>
                        </li>
                        <li className="bg-black/30 p-3 rounded border border-gray-700">
                            <strong className="text-teal-400 block mb-1">Quick Sort</strong>
                            <span className="text-gray-400 text-xs">Fastest valid general-purpose sort for arrays (in-place). Good cache locality.</span>
                        </li>
                    </ul>
                </div>
            )
        },
        {
            title: '9️⃣ Summary & Common Mistakes',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                        <h5 className="text-green-300 font-bold mb-2">Summary</h5>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>Bubble/Insertion:</strong> Good for small/almost sorted arrays.</li>
                            <li><strong>Merge Sort:</strong> Predictable <MathRenderer math="O(n \log n)" />, stable, good for linked lists. uses O(n) space.</li>
                            <li><strong>Quick Sort:</strong> Fastest usually, but <MathRenderer math="O(n^2)" /> worst case. Unstable.</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h5 className="text-red-400 font-bold">Common Mistakes</h5>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertTriangle className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Assuming Quick Sort is always fastest (Merge Sort is safer for critical constraints).</p>
                        </div>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertTriangle className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Confusing Stability. Selection Sort is NOT stable by default.</p>
                        </div>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Why is Merge Sort preferred for Linked Lists?",
            solution: "Merge sort doesn't require random access (indexing), unlike Quick Sort or Binary Search. It works efficiently with sequential access.",
        },
        {
            question: "In which case does Quick Sort perform poorly?",
            solution: "When the array is already sorted or reverse sorted, and the pivot is chosen as the last/first element. Time becomes O(n^2).",
        },
        {
            question: "Which sorting algorithm maintains the relative order of equal elements?",
            solution: "Algorithms like Merge Sort, Insertion Sort, and Bubble Sort are stable. Quick Sort and Selection Sort are generally unstable.",
        },
        {
            question: "What is the primary advantage of Insertion Sort?",
            solution: "It is adaptive. It runs in O(n) time if the array is already largely sorted, making it very fast for small or nearly sorted datasets.",
        },
        {
            question: "MCQ: Which algorithm has the best worst-case time complexity?\n A) Bubble Sort\n B) Quick Sort\n C) Merge Sort\n D) Selection Sort",
            solution: "C) Merge Sort (O(n log n) always)",
        },
        {
            question: "MCQ: What is the space complexity of Merge Sort?\n A) O(1)\n B) O(log n)\n C) O(n)\n D) O(n^2)",
            solution: "C) O(n) (Requires auxiliary arrays)",
        },
        {
            question: "MCQ: Which sort involves a 'pivot' element?\n A) Merge Sort\n B) Quick Sort\n C) Heap Sort\n D) Bubble Sort",
            solution: "B) Quick Sort",
        },
        {
            question: "Interview Question: Sort an array using only O(1) space and O(n log n) time?",
            solution: "Heapsort (usually). Merge sort needs O(n) space. Quick sort worst case is O(n^2). Heapsort guarantees O(n log n) in-place.",
        },
        {
            question: "Interview Question: Implement a sorting algorithm that is best for nearly sorted data.",
            solution: "Use Insertion Sort. Iterating through the array, if an element is already in order, loop continues. Complexity approaches O(n).",
        }
    ],
    exampleProblems: [],
}

function FiGitMergeIcon({ className }: { className?: string }) {
    return (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M6 21V9a9 9 0 0 0 9 9"></path></svg>
    );
}

export default function SortingAlgorithmsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
