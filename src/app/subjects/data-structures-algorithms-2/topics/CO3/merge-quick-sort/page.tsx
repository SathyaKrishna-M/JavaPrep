'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiLayers, FiZap, FiBarChart2, FiCheckCircle } from 'react-icons/fi'
import ArrayBars from '@/components/visuals/ArrayBars'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: 'Merge Sort & Quick Sort',
  explanationSections: [
    {
      title: '1️⃣ Divide & Conquer Paradigm',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Both algorithms follow the <span className="text-cyan-400 font-semibold">Divide & Conquer</span> strategy: (1) Divide problem into subproblems; (2) Conquer (recursively solve); (3) Combine solutions.</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-2">Master Theorem for T(n) = aT(n/b) + f(n):</p>
            <p className="text-gray-300">Merge Sort: T(n) = 2T(n/2) + O(n) → O(n log n)</p>
            <p className="text-gray-300">Quick Sort: T(n) = 2T(n/2) + O(n) → O(n log n) average</p>
            <p className="text-gray-300">           worst: T(n) = T(n-1) + O(n) → O(n²)</p>
          </div>
          <AlgoStepper
            title="Merge Sort vs Quick Sort — divide & conquer comparison"
            steps={[
              { title: 'Merge Sort: split in half', description: 'Always splits at midpoint regardless of values. Both halves are recursed, then merged. Split is O(1), merge is O(n).', code: 'mergeSort(arr, 0, n/2); mergeSort(arr, n/2+1, n-1); merge(...)' },
              { title: 'Quick Sort: split by pivot', description: 'Chooses a pivot, partitions array so left < pivot < right. Split position varies. Partition is O(n), no merge needed.', code: 'int pi = partition(arr, low, high); // O(n)\nquickSort(arr, low, pi-1); quickSort(arr, pi+1, high);' },
              { title: 'Why merge sort is O(n log n) always', description: 'Tree has exactly log n levels (always halves). Each level does O(n) merge work. Total: n × log n = O(n log n).', code: 'T(n) = 2T(n/2) + O(n) → Θ(n log n) by Master Theorem' },
              { title: 'Why quick sort worst case is O(n²)', description: 'If pivot is always min/max (sorted input with last-element pivot), one partition has 0 elements. n levels × O(n) work = O(n²).', code: 'T(n) = T(0) + T(n-1) + O(n) → Θ(n²)' },
            ]}
          />
          <ArrayBars
            title="Array [5,3,8,1,4] after Quick Sort partition (pivot=4, Lomuto)"
            bars={[
              { value: 3, label: '3', color: 'sorted'    },
              { value: 1, label: '1', color: 'sorted'    },
              { value: 4, label: '4', color: 'pivot'     },
              { value: 5, label: '5', color: 'default'   },
              { value: 8, label: '8', color: 'default'   },
            ]}
            caption="Green = elements < pivot · Amber = pivot in final position · Gray = elements > pivot"
          />
        </div>
      ),
    },
    {
      title: '2️⃣ Merge Sort',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Merge Sort</span>: divide array in half recursively, then merge the two sorted halves. Always O(n log n) — no worst case.</p>
          <PyCode language="java">{`void mergeSort(int[] arr, int left, int right) {
    if (left >= right) return;
    int mid = (left + right) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

void merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp[k++] = arr[i++];
        else                  temp[k++] = arr[j++];
    }
    while (i <= mid)   temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];

    // Copy back
    for (int idx = 0; idx < temp.length; idx++)
        arr[left + idx] = temp[idx];
}
// Time: O(n log n) always. Space: O(n) auxiliary. Stable sort.`}</PyCode>
        </div>
      ),
    },
    {
      title: '3️⃣ Quick Sort',
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Quick Sort</span>: choose a pivot, partition array so all elements less than pivot are left and greater are right, then recursively sort both sides. In-place — no extra array needed.</p>
          <PyCode language="java">{`void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Lomuto partition scheme
int partition(int[] arr, int low, int high) {
    int pivot = arr[high];  // last element as pivot
    int i = low - 1;        // index of smaller element

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            // swap arr[i] and arr[j]
            int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
    }
    // Place pivot in correct position
    int tmp = arr[i+1]; arr[i+1] = arr[high]; arr[high] = tmp;
    return i + 1;
}
// Average: O(n log n). Worst: O(n²) — sorted array with last pivot.`}</PyCode>
        </div>
      ),
    },
    {
      title: '4️⃣ Merge Sort vs Quick Sort',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Property</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Merge Sort</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Quick Sort</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Best case', 'O(n log n)', 'O(n log n)'],
                  ['Average case', 'O(n log n)', 'O(n log n)'],
                  ['Worst case', 'O(n log n)', 'O(n²) — sorted input with bad pivot'],
                  ['Space', 'O(n) — needs temp array', 'O(log n) — only recursion stack'],
                  ['Stable', 'Yes — equal elements keep order', 'No (basic version)'],
                  ['Cache', 'Poor — non-local access', 'Good — sequential access'],
                  ['Best for', 'Linked lists, external sort', 'Arrays, general purpose'],
                  ['Java Arrays.sort', 'Uses merge sort for objects', 'Dual-pivot quicksort for primitives'],
                ].map(([p, m, q]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{p}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{m}</td>
                    <td className="px-4 py-2 text-cyan-300 border border-slate-700 text-sm">{q}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">Quick Sort in Practice</p>
            <p className="text-gray-300 text-sm">The O(n²) worst case is avoided with randomised pivot selection (pick random element). Java's Arrays.sort for primitives uses Dual-Pivot Quicksort (Yaroslavskiy, 2009) — empirically 10-20% faster than classic quicksort on most inputs.</p>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'Explain the merge step in merge sort.', solution: 'The merge step takes two sorted subarrays [left..mid] and [mid+1..right] and combines them into a single sorted array. Use two pointers i,j starting at each subarray\'s start; repeatedly take the smaller element into a temp array; copy back. Time: O(n), Space: O(n).' },
    { question: 'What is the worst case of quick sort and when does it occur?', solution: 'O(n²) — when the pivot is always the largest or smallest element, creating partitions of size 0 and n−1. This occurs with sorted or reverse-sorted input when using the first or last element as pivot. Randomised pivot selection reduces this to O(n log n) expected with high probability.' },
    { question: 'Why is merge sort preferred for sorting linked lists?', solution: 'Quick sort requires random access (O(1) element access) for efficient partitioning — linked lists have O(n) access. Merge sort only needs sequential access and naturally divides linked lists by finding the middle (with slow/fast pointer). External merge sort (for large files on disk) also uses the merge sort idea.' },
    { question: 'MCQ: Merge sort\'s worst-case time complexity is:\n A) O(n²)\n B) O(n log n)\n C) O(n)\n D) O(log n)', solution: 'B) O(n log n) — merge sort always divides in half and merges in O(n), giving T(n) = 2T(n/2) + O(n) which by Master Theorem resolves to O(n log n) regardless of input.' },
    { question: 'MCQ: Quick sort is in-place because:\n A) It uses a temp array of size n\n B) It only needs O(log n) stack space for recursion\n C) It never swaps elements\n D) It uses the entire array as temp space', solution: 'B) Quick sort only uses O(log n) space for the recursion call stack (O(n) in worst case). No auxiliary array needed — all swaps happen in-place within the original array.' },
    { question: 'Trace quick sort (Lomuto, last pivot) on [5, 3, 8, 1, 4].', solution: 'Pivot=4. Partition: [3,1,4,5,8] — pivot at index 2. Sort [3,1]: pivot=1, partition=[1,3], pivot at 0. Sort [3]: done. Sort [5,8]: pivot=8, partition=[5,8], pivot at 1. Done. Sorted: [1,3,4,5,8].' },
    { question: 'Interview: Why does Java use different sorting algorithms for primitives vs objects?', solution: 'Java uses Dual-Pivot Quicksort for primitive arrays (int[], double[], etc.) because: (1) in-place, no memory overhead; (2) primitives have no identity (no stable sort needed); (3) cache-efficient on real hardware. For Object arrays (Integer[], String[], etc.), Java uses TimSort (hybrid merge/insertion sort) because: (1) Objects require stable sort (equal objects keep original order); (2) TimSort is O(n) on nearly-sorted data (common in practice); (3) Objects already on heap — auxiliary merge space is negligible.' },
  ],
  exampleProblems: [],
}

export default function MergeQuickSortPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
