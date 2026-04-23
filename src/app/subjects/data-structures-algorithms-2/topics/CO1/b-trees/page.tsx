'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiDatabase, FiLayers, FiCode, FiCheckCircle } from 'react-icons/fi'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: 'B-Trees',
  explanationSections: [
    {
      title: '1️⃣ Why B-Trees? — Disk I/O Motivation',
      icon: <FiDatabase className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Binary trees are inefficient for <span className="text-cyan-400 font-semibold">disk-based storage</span>. Each node access may cause a disk read (slow). B-trees minimise disk reads by storing many keys per node — reducing tree height dramatically.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
              <p className="text-red-300 font-semibold mb-2">Binary Tree on Disk</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>1 key per node</li>
                <li>Height = O(log₂ n)</li>
                <li>n=1M → height ≈ 20 disk reads</li>
                <li>Each read = 4-8ms ≈ 160ms total</li>
              </ul>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">B-Tree of Order 1000 on Disk</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Up to 999 keys per node</li>
                <li>Height = O(log₁₀₀₀ n)</li>
                <li>n=1B → height = 3 disk reads</li>
                <li>Each read = 4-8ms ≈ 24ms total</li>
              </ul>
            </div>
          </div>
          <AlgoStepper
            title="B-Tree of order 3 — structure walk-through"
            steps={[
              { title: 'Each node holds 1–2 keys', description: 'A B-tree of order 3 (2-3 tree) holds at most 2 keys per node and at most 3 children. Keys within a node are sorted.', code: '// Node: [key1 | key2]  with children: c0 | c1 | c2' },
              { title: 'Root: [30 | 60]', description: 'Root node has 2 keys splitting the entire key space into 3 ranges: (<30), (30–60), (>60). Each range maps to one child pointer.', code: 'root.keys = [30, 60]; root.children = [c1, c2, c3];' },
              { title: 'Leaf children', description: 'Left child [10|20] handles keys <30. Middle child [40|50] handles 30–60. Right child [70|80] handles >60. All leaves at same depth.', code: 'c1=[10,20]  c2=[40,50]  c3=[70,80]' },
              { title: 'Disk efficiency', description: 'With order 1000, one node holds ~999 keys → a million records need only 2 levels of disk I/O instead of 20 for a binary tree.', code: 'height = ⌈log_t(n)⌉  where t = min degree' },
            ]}
          />
        </div>
      ),
    },
    {
      title: '2️⃣ B-Tree Properties (Order m)',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A <span className="text-cyan-400 font-semibold">B-tree of order m</span> (minimum degree t, where m=2t) satisfies:</p>
          <div className="space-y-2">
            {[
              ['Keys per node', 'Every non-root node has at least ⌈m/2⌉−1 keys and at most m−1 keys'],
              ['Children per node', 'Every non-root internal node has ⌈m/2⌉ to m children'],
              ['Root', 'Root has at least 1 key (at least 2 children if not a leaf)'],
              ['All leaves at same level', 'Tree is perfectly height-balanced — all leaves at depth h'],
              ['Keys in each node sorted', 'Keys k₁ < k₂ < ... < kₙ within each node'],
            ].map(([prop, desc]) => (
              <div key={prop} className="border-l-4 border-cyan-500 pl-4">
                <p className="text-cyan-300 font-semibold text-sm">{prop}</p>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300">Height: h ≤ {'log_{⌈m/2⌉}((n+1)/2)'}</p>
            <p className="text-gray-400 text-xs mt-1">For m=1000, n=1B: h ≤ log₅₀₀(500M) ≈ 3.2 → h=3</p>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ B-Tree Search & Insert',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Search in a B-tree: at each node, binary search through sorted keys, then follow the correct child pointer. Insert may split full nodes on the way down.</p>
          <PyCode language="java">{`// Simplified B-Tree node structure
class BTreeNode {
    int[] keys;        // sorted keys in this node
    BTreeNode[] children; // child pointers
    int n;             // current number of keys
    boolean leaf;      // true if leaf node
    int t;             // minimum degree

    BTreeNode(int t, boolean leaf) {
        this.t = t;
        this.leaf = leaf;
        keys = new int[2 * t - 1];
        children = new BTreeNode[2 * t];
        n = 0;
    }
}

// Search in B-tree — returns the node containing key
BTreeNode search(BTreeNode x, int k) {
    int i = 0;
    // Find first key >= k
    while (i < x.n && k > x.keys[i]) i++;

    if (i < x.n && k == x.keys[i])
        return x;  // found in this node

    if (x.leaf) return null;  // not found

    return search(x.children[i], k);  // recurse into child
}`}</PyCode>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-1">Split on Insert</p>
            <p className="text-gray-300 text-sm">When a node is full (2t−1 keys), it splits into two nodes with t−1 keys each, and the median key is promoted to the parent. If the parent is also full, the split propagates upward. A new root is created only when the current root splits.</p>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ B-Tree Complexity',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Operation</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Time</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Disk I/Os</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Search', 'O(t log_t n)', 'O(log_t n)'],
                  ['Insert', 'O(t log_t n)', 'O(log_t n)'],
                  ['Delete', 'O(t log_t n)', 'O(log_t n)'],
                ].map(([op, time, io]) => (
                  <tr key={op}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{op}</td>
                    <td className="px-4 py-2 text-amber-300 font-mono border border-slate-700">{time}</td>
                    <td className="px-4 py-2 text-green-300 font-mono border border-slate-700">{io}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">Real-World Usage</p>
            <p className="text-gray-300 text-sm">MySQL InnoDB, PostgreSQL, Oracle, and most relational databases use B+ trees (a variant). Filesystems like NTFS, HFS+, and ext4 use B-trees for directory indexing. The order t is typically chosen so each node fits exactly in one disk page (4KB or 16KB).</p>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'Why are B-trees used in databases instead of AVL trees?', solution: 'Databases store data on disk where each node access is a disk read (milliseconds). AVL trees have height O(log₂n) — for 1 billion records, that\'s ~30 disk reads. B-trees of order 1000 have height O(log₁₀₀₀n) — just 3 disk reads. By fitting many keys per node (one node = one disk page), B-trees drastically reduce expensive disk I/O.' },
    { question: 'State the key properties of a B-tree of order m.', solution: 'Every non-root node has between ⌈m/2⌉−1 and m−1 keys. Every internal node has between ⌈m/2⌉ and m children. All leaves are at the same depth. Keys within each node are sorted. The root has at least 1 key.' },
    { question: 'What is a node split in B-tree insertion?', solution: 'When a node is full (has 2t−1 keys), it is split into two nodes each with t−1 keys. The median (middle) key is promoted to the parent node. If the parent is also full, the split propagates upward. When the root splits, a new root is created — this is the only way tree height increases.' },
    { question: 'MCQ: A B-tree of order m guarantees each node (except root) has at least:\n A) 1 key\n B) m/2 keys\n C) ⌈m/2⌉−1 keys\n D) m−1 keys', solution: 'C) ⌈m/2⌉−1 keys — this minimum occupancy (at least half full) prevents nodes from becoming too sparse, keeping the tree height logarithmic.' },
    { question: 'MCQ: For a B-tree with minimum degree t=3 (order m=6), the maximum number of keys per node is:\n A) 3\n B) 5\n C) 6\n D) 7', solution: 'B) 5 — maximum keys = 2t−1 = 2(3)−1 = 5. Maximum children = 2t = 6.' },
    { question: 'How does a B-tree handle deletion? What are the 3 cases?', solution: 'Case 1 (leaf node, has extra keys): simply delete the key. Case 2 (internal node): replace with inorder predecessor/successor from a child that has extra keys; or merge children. Case 3 (node would underflow below ⌈m/2⌉−1 keys): borrow from a sibling (rotation through parent), or merge with a sibling and pull down the parent key. Merging may cause the parent to underflow, propagating upward.' },
    { question: 'Interview: How does a B-tree differ from a binary search tree structurally?', solution: 'Key differences: (1) Node degree — BST has exactly 2 children; B-tree has up to m children (multi-way). (2) Keys per node — BST stores 1 key; B-tree stores up to m−1 keys. (3) Balance — BST has no balance guarantee; B-tree is always perfectly height-balanced (all leaves at same depth). (4) Purpose — BST optimised for RAM (pointer chasing is cheap); B-tree optimised for disk (minimise I/O by fitting a node into a disk page). (5) Height — O(log₂n) for BST, O(log_m n) for B-tree.' },
  ],
  exampleProblems: [],
}

export default function BTreesPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
