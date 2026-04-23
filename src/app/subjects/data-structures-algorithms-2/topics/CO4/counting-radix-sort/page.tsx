'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiHash, FiLayers, FiBarChart2, FiCheckCircle } from 'react-icons/fi'
import ArrayBars from '@/components/visuals/ArrayBars'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: 'Counting Sort & Radix Sort',
  explanationSections: [
    {
      title: '1️⃣ Non-Comparison Sorts',
      icon: <FiHash className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Comparison-based sorts have a lower bound of <span className="text-cyan-400 font-semibold">Ω(n log n)</span>. Non-comparison sorts break this barrier by exploiting the structure of the keys — they work on integers or strings with a bounded range.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Counting Sort', 'Count occurrences of each value. Works when range k is small. O(n+k) time.', 'blue'],
              ['Radix Sort', 'Sort digit by digit (LSD→MSD) using a stable subroutine. O(d(n+k)) time.', 'green'],
              ['Bucket Sort', 'Distribute into buckets, sort each, concatenate. O(n) average for uniform data.', 'violet'],
            ].map(([t, d, c]) => (
              <div key={t} className={`bg-${c}-500/10 p-4 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold mb-1`}>{t}</p>
                <p className="text-gray-300 text-sm">{d}</p>
              </div>
            ))}
          </div>
          <AlgoStepper
            title="Why non-comparison sorts beat O(n log n)"
            steps={[
              { title: 'Comparison lower bound: Ω(n log n)', description: 'Any sort that only compares elements needs a decision tree with n! leaves. Tree height ≥ log₂(n!) = Ω(n log n). This is a mathematical lower bound — no comparison sort can do better.', code: 'Height ≥ log₂(n!) ≈ n·log(n) by Stirling\'s approx' },
              { title: 'Counting Sort breaks the barrier', description: 'Instead of comparing, it counts how many of each value exist. Uses array indexing — O(1) per element — not comparison. Not constrained by the decision-tree bound.', code: 'count[arr[i]]++ // O(1), no comparison!' },
              { title: 'Radix Sort: digit by digit', description: 'Sort by least significant digit first, then next digit, etc. Each pass is a stable counting sort. No comparison between full numbers — only single digits (0–9).', code: 'for (exp=1; max/exp>0; exp*=10) countByDigit(exp)' },
            ]}
          />
          <ArrayBars
            title="Radix Sort on [170, 45, 75, 90, 802, 24, 2, 66] — after sorting by units digit"
            bars={[
              { value: 170, label: '170', color: 'sorted'    },
              { value: 90,  label: '90',  color: 'sorted'    },
              { value: 802, label: '802', color: 'highlight' },
              { value: 2,   label: '2',   color: 'highlight' },
              { value: 24,  label: '24',  color: 'pivot'     },
              { value: 45,  label: '45',  color: 'compare'   },
              { value: 75,  label: '75',  color: 'compare'   },
              { value: 66,  label: '66',  color: 'bucket'    },
            ]}
            caption="Pass 1 (units): grouped by last digit 0,0,2,2,4,5,5,6 — not fully sorted yet"
          />
        </div>
      ),
    },
    {
      title: '2️⃣ Counting Sort',
      icon: <FiHash className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Counting Sort</span>: count how many times each value appears, then compute prefix sums to find final positions. <em>Stable</em> — elements with equal keys appear in original order.</p>
          <PyCode language="java">{`// Counting Sort — O(n + k), k = range of values
int[] countingSort(int[] arr, int k) {
    // k = maximum value in arr
    int[] count = new int[k + 1];
    int[] output = new int[arr.length];

    // Step 1: Count occurrences
    for (int x : arr) count[x]++;

    // Step 2: Prefix sums → each count[i] now = #elements ≤ i
    for (int i = 1; i <= k; i++) count[i] += count[i - 1];

    // Step 3: Place elements in output (traverse right→left for stability)
    for (int i = arr.length - 1; i >= 0; i--) {
        output[--count[arr[i]]] = arr[i];
    }
    return output;
}
// Time: O(n + k). Space: O(n + k).
// Practical when k = O(n) — e.g., sorting ages, grades, small integers.`}</PyCode>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-2">Trace: arr=[1,4,1,2,7,5,2], k=7</p>
            <p className="text-gray-300">count after step 1: [0,2,2,0,1,1,0,1]</p>
            <p className="text-gray-300">count after prefix: [0,2,4,4,5,6,6,7]</p>
            <p className="text-gray-300">output (right→left): [1,1,2,2,4,5,7]  ✓ stable</p>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Radix Sort',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Radix Sort (LSD)</span>: sort from least-significant digit to most-significant digit using a <em>stable</em> counting sort on each digit position. Correctness relies on stability — equal digits preserve order from prior passes.</p>
          <PyCode language="java">{`// Radix Sort LSD — O(d * (n + k)), d = digits, k = digit range (10)
void radixSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();

    // Process each digit position: 1, 10, 100, ...
    for (int exp = 1; max / exp > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
}

void countingSortByDigit(int[] arr, int exp) {
    int n = arr.length;
    int[] output = new int[n];
    int[] count  = new int[10];  // digits 0–9

    // Count occurrences of digit at position exp
    for (int x : arr) count[(x / exp) % 10]++;

    // Prefix sums
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];

    // Build output right→left (stability!)
    for (int i = n - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[--count[digit]] = arr[i];
    }
    System.arraycopy(output, 0, arr, 0, n);
}`}</PyCode>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-1">Why LSD (Least Significant Digit first)?</p>
            <p className="text-gray-300 text-sm">Sorting by LSD first means later passes (more significant digits) break ties correctly using already-stable earlier-digit order. MSD radix sort also works but requires recursive partitioning (like a trie sort).</p>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Comparison Table',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Property</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Counting Sort</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Radix Sort</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Merge/Heap/Quick</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Time', 'O(n + k)', 'O(d(n + k))', 'O(n log n)'],
                  ['Space', 'O(n + k)', 'O(n + k)', 'O(1)–O(n)'],
                  ['Stable', 'Yes', 'Yes (if stable subroutine)', 'Only merge sort'],
                  ['In-place', 'No', 'No', 'Heap/Quick: yes'],
                  ['Data types', 'Integers, bounded range', 'Integers / fixed-length strings', 'Any comparable type'],
                  ['Practical limit', 'k = O(n)', 'd small, k = O(n)', 'n up to 10^8+'],
                ].map(([p, cs, rs, cmp]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{p}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{cs}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{rs}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{cmp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Summary',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li><strong>Counting Sort:</strong> O(n+k) — count array → prefix sums → stable placement</li>
            <li><strong>Radix Sort:</strong> O(d(n+k)) — LSD→MSD, uses counting sort as stable subroutine</li>
            <li><strong>Both beat O(n log n)</strong> by not comparing elements — exploit bounded integer keys</li>
            <li><strong>Stability critical:</strong> radix sort correctness depends on each pass being stable</li>
            <li><strong>Limitation:</strong> not applicable to arbitrary objects with custom comparators</li>
            <li><strong>Real use:</strong> sorting IP addresses, 10-digit IDs, exam scores, phone book digits</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'Why can counting sort sort in O(n) when comparison sorts cannot go below O(n log n)?', solution: 'Comparison sorts are limited by the decision-tree lower bound: n! leaves require Ω(n log n) height. Counting sort avoids comparisons entirely — it uses array indexing to count occurrences and reconstruct the sorted order. This is only possible when keys are integers in a known bounded range [0..k].' },
    { question: 'Why must the subroutine in radix sort be stable?', solution: 'Radix sort processes digits from LSD to MSD. After sorting by the units digit, the tens-digit pass must preserve the relative order of elements with the same tens digit (their ordering from the units pass). If the subroutine is not stable, this relative order is destroyed, producing incorrect results.' },
    { question: 'What is the time complexity of radix sort and what do d, n, k represent?', solution: 'O(d × (n + k)). d = number of digits (or passes), n = number of elements, k = digit range (typically 10 for decimal). Each of the d passes runs a counting sort in O(n + k). For 32-bit integers sorted as 8 base-256 digits: O(8(n + 256)) = O(n).' },
    { question: 'MCQ: Counting sort is NOT suitable when:\n A) Array has duplicate elements\n B) Array contains floating-point values\n C) Array is nearly sorted\n D) Array has n = 10^6', solution: 'B) Floating-point values — counting sort requires integer indices into the count array. It cannot directly sort floats. (A is fine — counting sort handles duplicates. C and D are fine — counting sort works well.) For floats you need comparison-based or bucket sort.' },
    { question: 'MCQ: Radix sort\'s time complexity is O(d(n+k)). For 32-bit integers with base 10, d is approximately:\n A) 10\n B) 7\n C) 32\n D) log₂n', solution: 'A) 10 — 32-bit integers have at most 10 decimal digits (2^32 ≈ 4.3 billion, 10 digits). In base 256 (byte), d=4. In base 10, d=10, k=10 → O(10(n+10)) = O(n). The choice of base trades d vs k.' },
    { question: 'Trace counting sort on [3, 1, 4, 1, 5, 9, 2, 6]. Show count array and output.', solution: 'k=9. count[0..9] after step 1: [0,2,1,1,1,1,1,0,0,1]. After prefix sums: [0,2,3,4,5,6,7,7,7,8]. Traverse right→left: 6→output[6]=6; 2→output[2]=2; 9→output[7]=9; 5→output[4]=5; 1→output[1]=1; 4→output[3]=4; 1→output[0]=1; 3→output[?]=3. Final output: [1,1,2,3,4,5,6,9]. ✓ Stable — two 1s in original order.' },
    { question: 'Interview: When would you choose radix sort in production?', solution: 'Radix sort shines for: (1) Sorting fixed-width integers or strings of bounded length — phone numbers, IP addresses, employee IDs, ZIP codes; (2) When n is very large and the key range is manageable; (3) Sorting strings lexicographically (MSD radix sort / ternary quicksort). Avoid when keys are arbitrary objects, data has many unique long strings, or memory is constrained. Java\'s Arrays.sort uses dual-pivot quicksort for primitives (cache-friendly, constant factor matters). Radix sort wins for very large n with bounded integer keys.' },
  ],
  exampleProblems: [],
}

export default function CountingRadixSortPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
