'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiHash, FiCode, FiBarChart2, FiCheckCircle } from 'react-icons/fi'
import ArrayBars from '@/components/visuals/ArrayBars'

const content = {
  title: 'Fenwick Trees (Binary Indexed Tree)',
  explanationSections: [
    {
      title: '1️⃣ What is a Fenwick Tree?',
      icon: <FiHash className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A <span className="text-cyan-400 font-semibold">Fenwick Tree</span> (Binary Indexed Tree / BIT), invented by Peter Fenwick in 1994, is a compact data structure for prefix sum queries and point updates in O(log n). It uses about half the memory of a segment tree.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Fenwick Tree</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Compact: O(n) space, simple array</li>
                <li>Prefix sum query: O(log n)</li>
                <li>Point update: O(log n)</li>
                <li>Cannot do arbitrary range queries (only prefix)</li>
                <li>Simpler implementation than segment tree</li>
              </ul>
            </div>
            <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
              <p className="text-violet-300 font-semibold mb-2">Segment Tree</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Space: O(4n) — larger overhead</li>
                <li>Arbitrary range query: O(log n)</li>
                <li>Range update with lazy: O(log n)</li>
                <li>Supports min/max/GCD, not just sum</li>
                <li>More complex to implement</li>
              </ul>
            </div>
          </div>
          <ArrayBars
            title="BIT array for [3,2,4,5,1,6] — each BIT[i] stores sum of a range"
            bars={[
              { value: 3, label: '3',  color: 'highlight' },
              { value: 5, label: '5',  color: 'sorted'    },
              { value: 4, label: '4',  color: 'highlight' },
              { value: 14,label: '14', color: 'pivot'     },
              { value: 1, label: '1',  color: 'highlight' },
              { value: 7, label: '7',  color: 'sorted'    },
            ]}
            caption="Cyan=single element · Green=2-elem range · Amber=4-elem prefix sum"
            showIndices
          />
        </div>
      ),
    },
    {
      title: '2️⃣ The Lowbit Trick',
      icon: <FiHash className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The key insight: <span className="text-cyan-400 font-semibold">lowbit(i) = i & (−i)</span> gives the lowest set bit of i. Each BIT cell bit[i] stores the sum of lowbit(i) elements ending at index i.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">i</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Binary</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">lowbit(i)</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">bit[i] covers</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['1', '0001', '1', 'arr[1]'],
                  ['2', '0010', '2', 'arr[1..2]'],
                  ['3', '0011', '1', 'arr[3]'],
                  ['4', '0100', '4', 'arr[1..4]'],
                  ['5', '0101', '1', 'arr[5]'],
                  ['6', '0110', '2', 'arr[5..6]'],
                  ['7', '0111', '1', 'arr[7]'],
                  ['8', '1000', '8', 'arr[1..8]'],
                ].map(([i, b, lb, covers]) => (
                  <tr key={i}>
                    <td className="px-4 py-2 text-violet-300 font-mono border border-slate-700">{i}</td>
                    <td className="px-4 py-2 text-gray-300 font-mono border border-slate-700">{b}</td>
                    <td className="px-4 py-2 text-amber-300 font-mono border border-slate-700">{lb}</td>
                    <td className="px-4 py-2 text-cyan-300 border border-slate-700 text-sm">{covers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Implementation',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <PyCode language="java">{`class FenwickTree {
    int[] bit;
    int n;

    FenwickTree(int n) {
        this.n = n;
        bit = new int[n + 1];  // 1-indexed
    }

    // Build from array in O(n)
    FenwickTree(int[] arr) {
        this(arr.length);
        for (int i = 0; i < arr.length; i++)
            update(i + 1, arr[i]);
    }

    // Add delta to position i (1-indexed)
    void update(int i, int delta) {
        for (; i <= n; i += i & (-i))  // walk up using lowbit
            bit[i] += delta;
    }

    // Prefix sum [1..i]
    int prefixSum(int i) {
        int sum = 0;
        for (; i > 0; i -= i & (-i))  // walk down using lowbit
            sum += bit[i];
        return sum;
    }

    // Range sum [l..r]
    int rangeSum(int l, int r) {
        return prefixSum(r) - prefixSum(l - 1);
    }
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '4️⃣ Comparison: BIT vs Segment Tree',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Feature</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">BIT/Fenwick</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Segment Tree</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Space', 'O(n)', 'O(4n)'],
                  ['Code length', '~10 lines', '~30 lines'],
                  ['Prefix sum', 'O(log n)', 'O(log n)'],
                  ['Range query (general)', 'O(log n) prefix only', 'O(log n) any range'],
                  ['Range update (lazy)', 'Possible but tricky', 'O(log n) with lazy'],
                  ['Non-sum aggregates (min/max)', 'Not possible directly', 'Yes — change merge op'],
                ].map(([f, b, s]) => (
                  <tr key={f}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{f}</td>
                    <td className="px-4 py-2 text-cyan-300 border border-slate-700 text-sm">{b}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">Rule of Thumb</p>
            <p className="text-gray-300 text-sm">Use BIT when you only need prefix sums with point updates — it is simpler and faster in practice. Use segment tree when you need min/max queries, range updates (lazy), or the problem is complex.</p>
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
            <li><strong>BIT/Fenwick tree:</strong> O(n) space, O(log n) prefix query and point update</li>
            <li><strong>lowbit(i) = i & (−i):</strong> core trick — isolates the lowest set bit</li>
            <li><strong>Update:</strong> walk up adding lowbit repeatedly</li>
            <li><strong>Query:</strong> walk down subtracting lowbit to accumulate prefix sum</li>
            <li><strong>Range sum [l,r]:</strong> prefixSum(r) − prefixSum(l−1)</li>
            <li><strong>Limitation:</strong> naturally supports only sum aggregation and prefix queries</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is lowbit(i) and how is it computed?', solution: 'lowbit(i) = i & (−i) gives the value of the lowest set bit in i. For example, lowbit(6) = 6 & (−6) = 0110 & 1010 = 0010 = 2. It determines how many elements bit[i] covers in the Fenwick tree.' },
    { question: 'How does the Fenwick tree update operation work?', solution: 'To add delta to position i: update bit[i] += delta, then move to i + lowbit(i) (next responsible ancestor). Repeat until i > n. This updates all tree nodes that cover position i in O(log n) steps.' },
    { question: 'How does the Fenwick tree prefix sum query work?', solution: 'To compute prefix sum [1..i]: accumulate bit[i], then move to i − lowbit(i) (next uncovered segment). Repeat until i = 0. This gathers all non-overlapping segments covering [1..i] in O(log n) steps.' },
    { question: 'MCQ: A Fenwick Tree requires how much space?\n A) O(n log n)\n B) O(4n)\n C) O(n)\n D) O(n²)', solution: 'C) O(n) — the BIT is simply a 1D array of size n+1, making it very memory-efficient compared to the segment tree\'s 4n.' },
    { question: 'MCQ: Which operation is NOT efficiently supported by a standard Fenwick Tree?\n A) Prefix sum\n B) Point update\n C) Range minimum query\n D) Range sum [l,r]', solution: 'C) Range minimum query — Fenwick trees naturally support only invertible operations (sum, XOR) where range queries reduce to prefix differences. Minimum is not invertible (you cannot compute min[l,r] from prefix-min alone).' },
    { question: 'Given arr = [3, 2, -1, 6, 5, 4, -3, 3, 7, 2, 3]. Compute the prefix sum up to index 6 using BIT logic.', solution: 'prefixSum(6): i=6 (binary 110): sum += bit[6] (covers arr[5..6]); i = 6-lowbit(6) = 6-2 = 4; sum += bit[4] (covers arr[1..4]); i = 4-lowbit(4) = 4-4 = 0; done. Total = arr[5]+arr[6]+arr[1]+arr[2]+arr[3]+arr[4] = 4+(-3)+3+2+(-1)+6 = 11.' },
    { question: 'Interview: When would you choose a BIT over a segment tree in a competitive programming context?', solution: 'Choose BIT when: (1) Only prefix sums and point updates are needed — BIT is 2-3x faster due to cache friendliness and simpler constants; (2) Memory is tight (O(n) vs O(4n)); (3) 2D range sums are needed — 2D BIT is simpler than 2D segment tree. Choose segment tree when: range min/max, lazy range updates, or non-standard aggregation functions are needed.' },
  ],
  exampleProblems: [],
}

export default function FenwickTreesPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
