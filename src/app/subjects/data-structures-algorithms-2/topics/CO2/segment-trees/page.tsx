'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiBarChart2, FiZap, FiCode, FiCheckCircle } from 'react-icons/fi'
import TreeDiagram from '@/components/visuals/TreeDiagram'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: 'Segment Trees',
  explanationSections: [
    {
      title: '1️⃣ The Range Query Problem',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Given an array, answer queries like "sum/min/max of elements from index l to r" — repeatedly and after point updates. A <span className="text-cyan-400 font-semibold">segment tree</span> solves this in O(log n) per query and update.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Approach</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Build</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Query</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Update</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Naive (scan)', 'O(1)', 'O(n)', 'O(1)'],
                  ['Prefix Sum Array', 'O(n)', 'O(1)', 'O(n)'],
                  ['Segment Tree', 'O(n)', 'O(log n)', 'O(log n)'],
                  ['Fenwick Tree (BIT)', 'O(n)', 'O(log n)', 'O(log n)'],
                ].map(([a, b, q, u]) => (
                  <tr key={a}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{a}</td>
                    <td className="px-4 py-2 text-gray-300 font-mono border border-slate-700">{b}</td>
                    <td className="px-4 py-2 text-amber-300 font-mono border border-slate-700">{q}</td>
                    <td className="px-4 py-2 text-green-300 font-mono border border-slate-700">{u}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TreeDiagram
            title="Segment tree for array [1, 3, 5, 7] — each node stores range sum"
            width={500} height={230}
            nodes={[
              { id: 'r',  label: '16', sublabel: '[0..3]', x: 250, y: 45,  color: 'cyan',   highlight: true },
              { id: 'l',  label: '4',  sublabel: '[0..1]', x: 125, y: 120, color: 'violet'  },
              { id: 'r2', label: '12', sublabel: '[2..3]', x: 375, y: 120, color: 'violet'  },
              { id: 'll', label: '1',  sublabel: '[0]',    x: 62,  y: 195, color: 'green'   },
              { id: 'lr', label: '3',  sublabel: '[1]',    x: 188, y: 195, color: 'green'   },
              { id: 'rl', label: '5',  sublabel: '[2]',    x: 312, y: 195, color: 'green'   },
              { id: 'rr', label: '7',  sublabel: '[3]',    x: 438, y: 195, color: 'green'   },
            ]}
            edges={[
              { from: 'r',  to: 'l',  highlight: true },
              { from: 'r',  to: 'r2', highlight: true },
              { from: 'l',  to: 'll' }, { from: 'l',  to: 'lr' },
              { from: 'r2', to: 'rl' }, { from: 'r2', to: 'rr' },
            ]}
          />
          <AlgoStepper
            title="Range sum query: sum(1, 3) on [1,3,5,7]"
            steps={[
              { title: 'Query range [1..3], visit root [0..3]', description: 'Range [1..3] partially overlaps root [0..3]. Split: go to both children.', code: 'query(root, 1, 3) → recurse left AND right' },
              { title: 'Visit left child [0..1]', description: 'Range [1..3] partially overlaps [0..1]. Split again: go left [0..0] and right [1..1].', code: 'left child [0..1] partially overlaps' },
              { title: 'Visit [0..0] — no overlap, return 0', description: 'Index 0 is outside [1..3]. Return 0.', code: 'if (l > qR || r < qL) return 0' },
              { title: 'Visit [1..1] — full overlap, return 3', description: 'Node [1..1] is fully inside [1..3]. Return stored value 3.', code: 'if (l >= qL && r <= qR) return tree[node]' },
              { title: 'Visit right child [2..3] — full overlap, return 12', description: 'Node [2..3] is fully inside [1..3]. Return 12 directly — no further recursion needed!', code: 'return tree[node] = 12' },
              { title: 'Result: 0 + 3 + 12 = 15', description: 'Sum from index 1 to 3 = arr[1]+arr[2]+arr[3] = 3+5+7 = 15. O(log n) nodes visited.', code: 'return left + right = 0 + 3 + 12 = 15 ✓' },
            ]}
          />
        </div>
      ),
    },
    {
      title: '2️⃣ Segment Tree Structure',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A segment tree is a binary tree where each node stores the aggregate (sum/min/max) of a segment of the array. Leaf nodes correspond to individual elements.</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-2">Array: [1, 3, 5, 7, 9, 11]</p>
            <p className="text-gray-300">               [36]          ← root: sum(0..5)</p>
            <p className="text-gray-300">            /        \</p>
            <p className="text-gray-300">        [9]           [27]  ← sum(0..2), sum(3..5)</p>
            <p className="text-gray-300">       /   \          /   \</p>
            <p className="text-gray-300">     [4]   [5]      [16]  [11]</p>
            <p className="text-gray-300">    / \     |       / \    |</p>
            <p className="text-gray-300">  [1] [3]  [5]   [7] [9] [11]  ← leaves</p>
          </div>
          <p className="text-gray-400 text-sm">Stored in an array: node at index i has children at 2i and 2i+1. Array size needed: 4n.</p>
        </div>
      ),
    },
    {
      title: '3️⃣ Build, Query & Update',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <PyCode language="java">{`class SegmentTree {
    int[] tree;
    int n;

    SegmentTree(int[] arr) {
        n = arr.length;
        tree = new int[4 * n];
        build(arr, 0, 0, n - 1);
    }

    void build(int[] arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];   // leaf node
        } else {
            int mid = (start + end) / 2;
            build(arr, 2*node+1, start, mid);
            build(arr, 2*node+2, mid+1, end);
            tree[node] = tree[2*node+1] + tree[2*node+2];  // aggregate
        }
    }

    // Range sum query [l, r]
    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;  // out of range
        if (l <= start && end <= r) return tree[node];  // fully covered
        int mid = (start + end) / 2;
        return query(2*node+1, start, mid, l, r)
             + query(2*node+2, mid+1, end, l, r);
    }

    // Point update: arr[idx] = val
    void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
        } else {
            int mid = (start + end) / 2;
            if (idx <= mid) update(2*node+1, start, mid, idx, val);
            else            update(2*node+2, mid+1, end, idx, val);
            tree[node] = tree[2*node+1] + tree[2*node+2];
        }
    }
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '4️⃣ Lazy Propagation',
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Lazy propagation</span> enables <em>range updates</em> (e.g., add 5 to all elements from l to r) in O(log n) instead of O(n log n). Updates are deferred — stored at ancestor nodes and propagated down only when needed.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Without Lazy</p>
              <p className="text-gray-300 text-sm">Range update: update each element individually → O(n) updates × O(log n) each = O(n log n) per range update. Too slow for repeated updates.</p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">With Lazy</p>
              <p className="text-gray-300 text-sm">Range update: mark the highest-level covering nodes with the pending update. O(log n) per update. Propagate lazily on next query/update that needs that range.</p>
            </div>
          </div>
          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
            <p className="text-violet-300 font-semibold mb-1">Applications</p>
            <p className="text-gray-300 text-sm">Range min/max queries (RMQ), range sum, range GCD, interval scheduling, LCA queries, and competitive programming problems like "painting intervals".</p>
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
            <li><strong>Segment tree:</strong> binary tree storing aggregates of array segments</li>
            <li><strong>Build:</strong> O(n) — bottom-up construction</li>
            <li><strong>Point query/update:</strong> O(log n)</li>
            <li><strong>Range query:</strong> O(log n) — merge at most 2 log n nodes</li>
            <li><strong>Range update with lazy propagation:</strong> O(log n)</li>
            <li><strong>Space:</strong> O(4n) — safe upper bound for array representation</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What problem does a segment tree solve, and what are its complexities?', solution: 'A segment tree solves range queries (sum/min/max over subarray [l,r]) with point updates. Build: O(n). Range query: O(log n). Point update: O(log n). This beats the prefix sum array (O(n) update) and naive scan (O(n) query).' },
    { question: 'How does the segment tree array representation work?', solution: 'The segment tree is stored in a 1-indexed array of size 4n. Node at index i has its left child at 2i and right child at 2i+1. The root is at index 1. Leaf nodes store individual array elements; internal nodes store aggregates of their range.' },
    { question: 'What is lazy propagation and when is it needed?', solution: 'Lazy propagation is used when range updates (add/set a value across [l,r]) must also run in O(log n). Without it, a range update updates each element individually taking O(n log n). Lazy propagation defers updates — marks ancestor nodes and pushes the update down only when that subtree is actually accessed.' },
    { question: 'MCQ: The time complexity to build a segment tree on an array of n elements is:\n A) O(n log n)\n B) O(n)\n C) O(log n)\n D) O(n²)', solution: 'B) O(n) — each of the 2n−1 nodes is visited exactly once during construction, and each visit does O(1) work (aggregate two children).' },
    { question: 'MCQ: A range minimum query [l,r] on a segment tree takes:\n A) O(1)\n B) O(log n)\n C) O(n)\n D) O(n log n)', solution: 'B) O(log n) — the query recursively decomposes [l,r] into at most 2 log n segments stored in tree nodes, takes O(1) per node, total O(log n).' },
    { question: 'Given array [2,1,5,3,4]. Build the segment tree (sum). What is the query(1,3)?', solution: 'Segment tree (1-indexed) sums: root=15(0..4). Left=8(0..2): left=3(0..1)[2,1], right=5(2). Right=7(3..4)[3,4]. Query(1,3) = sum(arr[1..3]) = 1+5+3 = 9. The tree returns this by combining the node covering [1,1]=1, [2,2]=5, [3,3]=3.' },
    { question: 'Interview: How would you use a segment tree to solve the problem "find the maximum subarray sum" with range updates?', solution: 'Each segment tree node stores 4 values for its range: total sum, max prefix sum, max suffix sum, max subarray sum. Merge: max_sub = max(left.max_sub, right.max_sub, left.max_suf + right.max_pre). This lets you query max subarray in [l,r] in O(log n). With lazy propagation for range add operations, each node also stores the pending delta and updates all 4 values accordingly.' },
  ],
  exampleProblems: [],
}

export default function SegmentTreesPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
