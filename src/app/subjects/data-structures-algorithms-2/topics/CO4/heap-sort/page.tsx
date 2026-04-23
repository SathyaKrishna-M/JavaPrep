'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiTriangle, FiCode, FiBarChart2, FiCheckCircle } from 'react-icons/fi'
import TreeDiagram from '@/components/visuals/TreeDiagram'
import ArrayBars from '@/components/visuals/ArrayBars'

const content = {
  title: 'Heap Sort',
  explanationSections: [
    {
      title: '1️⃣ Max-Heap & Heapify',
      icon: <FiTriangle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A <span className="text-cyan-400 font-semibold">max-heap</span> is a complete binary tree where every parent is ≥ its children. Stored as an array: parent(i)=(i−1)/2, left=2i+1, right=2i+2.</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-1">Array [4,10,3,5,1] as max-heap:</p>
            <p className="text-gray-300">         10</p>
            <p className="text-gray-300">        /  \</p>
            <p className="text-gray-300">       5    3     index: 0=10, 1=5, 2=3, 3=4, 4=1</p>
            <p className="text-gray-300">      / \</p>
            <p className="text-gray-300">     4   1</p>
          </div>
          <PyCode language="java">{`// Heapify: fix heap property at index i, heap size = n
void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])   largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        int swap = arr[i]; arr[i] = arr[largest]; arr[largest] = swap;
        heapify(arr, n, largest);  // fix the swapped subtree
    }
}`}</PyCode>
          <TreeDiagram
            title="Max-Heap [10,5,3,4,1] as binary tree — parent ≥ children at every node"
            width={460} height={230}
            nodes={[
              { id: 'r',  label: '10', x: 230, y: 45,  color: 'amber', highlight: true },
              { id: 'l',  label: '5',  x: 115, y: 120, color: 'cyan'   },
              { id: 'r2', label: '3',  x: 345, y: 120, color: 'cyan'   },
              { id: 'll', label: '4',  x: 58,  y: 195, color: 'violet' },
              { id: 'lr', label: '1',  x: 172, y: 195, color: 'violet' },
            ]}
            edges={[
              { from: 'r', to: 'l' }, { from: 'r', to: 'r2' },
              { from: 'l', to: 'll' }, { from: 'l', to: 'lr' },
            ]}
          />
          <ArrayBars
            title="Same heap as array — index formula: left=2i+1, right=2i+2, parent=(i-1)/2"
            bars={[
              { value: 10, label: '10', color: 'highlight', index: 0 },
              { value: 5,  label: '5',  color: 'sorted',    index: 1 },
              { value: 3,  label: '3',  color: 'sorted',    index: 2 },
              { value: 4,  label: '4',  color: 'compare',   index: 3 },
              { value: 1,  label: '1',  color: 'compare',   index: 4 },
            ]}
            caption="Amber=root(max) · Green=level-1 · Violet=level-2 leaves"
          />
        </div>
      ),
    },
    {
      title: '2️⃣ Heap Sort Algorithm',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Heap Sort</span> in two phases: (1) Build a max-heap from the array — O(n); (2) Repeatedly extract the maximum (root), swap to end, heapify the remaining heap — O(n log n).</p>
          <PyCode language="java">{`void heapSort(int[] arr) {
    int n = arr.length;

    // Phase 1: Build max-heap — O(n)
    // Start from last non-leaf node = n/2 - 1
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // Phase 2: Extract elements one by one — O(n log n)
    for (int i = n - 1; i > 0; i--) {
        // Move current root (max) to end
        int tmp = arr[0]; arr[0] = arr[i]; arr[i] = tmp;
        // Heapify the reduced heap
        heapify(arr, i, 0);
    }
}
// In-place! No extra space beyond O(log n) recursion stack.
// Not stable — equal elements may change relative order.`}</PyCode>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-1">Why Build Heap is O(n)?</p>
            <p className="text-gray-300 text-sm">We call heapify on n/2 nodes. The heapify cost for a node at height h is O(h). Sum over all heights: Σ (n/2^(h+1)) × h = O(n). Counter-intuitive — most nodes are at the bottom with h≈0.</p>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Heap Sort vs Quicksort vs Merge Sort',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Property</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Heap Sort</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Quick Sort</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Merge Sort</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Best case', 'O(n log n)', 'O(n log n)', 'O(n log n)'],
                  ['Average', 'O(n log n)', 'O(n log n)', 'O(n log n)'],
                  ['Worst case', 'O(n log n)', 'O(n²)', 'O(n log n)'],
                  ['Space', 'O(1) — in-place', 'O(log n) stack', 'O(n) auxiliary'],
                  ['Stable', 'No', 'No (basic)', 'Yes'],
                  ['Cache', 'Poor (heap jumps)', 'Excellent', 'Good'],
                  ['Practical speed', '3rd', '1st', '2nd'],
                ].map(([p, h, q, m]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{p}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{h}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{q}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Summary',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li><strong>Max-heap:</strong> parent ≥ children at all nodes; stored as array</li>
            <li><strong>Build heap:</strong> O(n) — heapify from last non-leaf down</li>
            <li><strong>Sort:</strong> O(n log n) — n extractions × O(log n) heapify each</li>
            <li><strong>In-place:</strong> O(1) extra space (ignoring O(log n) recursion)</li>
            <li><strong>Not stable:</strong> relative order of equal elements not preserved</li>
            <li><strong>Preferred when:</strong> worst-case O(n log n) + in-place both required</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is a max-heap and how is it stored in an array?', solution: 'A max-heap is a complete binary tree where every parent node is ≥ its children. Stored as 0-indexed array: element at index i has parent at (i-1)/2, left child at 2i+1, right child at 2i+2. The root (maximum element) is always at index 0.' },
    { question: 'What are the two phases of heap sort?', solution: 'Phase 1 (Build): Convert the array into a max-heap by calling heapify bottom-up from index n/2−1 down to 0. Cost: O(n). Phase 2 (Sort): Repeatedly swap root (maximum) with last unsorted element, reduce heap size by 1, and heapify root. Each extraction: O(log n). Total: O(n log n).' },
    { question: 'Why is build-heap O(n) and not O(n log n)?', solution: 'Heapify at height h costs O(h). There are n/2^(h+1) nodes at height h. Total cost = Σ (n/2^(h+1)) × h for h=0 to log n = n × Σ h/2^(h+1) = O(n). Geometrically: most nodes are near the bottom (height 0-1) and barely move. The few nodes near the top (higher h) pay more but there are exponentially fewer of them.' },
    { question: 'MCQ: Heap sort\'s worst-case time complexity is:\n A) O(n²)\n B) O(n log n)\n C) O(n)\n D) O(log n)', solution: 'B) O(n log n) — unlike quicksort, heapsort always achieves O(n log n) regardless of input. Build phase O(n) + sort phase O(n log n).' },
    { question: 'MCQ: Heap sort\'s space complexity is:\n A) O(n)\n B) O(log n)\n C) O(1)\n D) O(n log n)', solution: 'C) O(1) — heap sort sorts in-place within the original array. The only extra space is O(log n) for the recursive heapify call stack, but this is typically considered O(1) extra.' },
    { question: 'Trace heap sort on [4, 10, 3, 5, 1]. Show after build-heap and each extraction.', solution: 'Build-heap: start at i=1. heapify(1): 10 vs 5,1 → 10 is largest. heapify(0): 4 vs 10,3 → swap 4,10 → [10,4,3,5,1] → heapify(1): 4 vs 5,1 → swap 4,5 → [10,5,3,4,1]. Heap built. Extract: swap 10↔1: [1,5,3,4,|10]. Heapify(0,n=4): 1 vs 5,3 → 5: swap [5,1,3,4]. 1 vs 4: swap [5,4,3,1]. Extract 5: [1,4,3,|5,10]. Heapify→[4,1,3]. Extract 4,3,1. Sorted: [1,3,4,5,10].' },
    { question: 'Interview: When would you choose heap sort over quicksort in a production system?', solution: 'Heap sort over quicksort when: (1) Guaranteed O(n log n) worst-case is required — e.g., real-time systems where latency spikes from O(n²) quicksort are unacceptable; (2) Memory is extremely constrained — heap sort is truly O(1) extra space, quicksort needs O(log n) stack; (3) Security-sensitive sorting — adversarial inputs can craft O(n²) worst cases for deterministic quicksort (see quicksort DOS attacks on hash tables). In practice, introsort (used in C++ std::sort) combines quicksort, heapsort, and insertion sort — switching to heapsort when recursion depth exceeds log n.' },
  ],
  exampleProblems: [],
}

export default function HeapSortPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
