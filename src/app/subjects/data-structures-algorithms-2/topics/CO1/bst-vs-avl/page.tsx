'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBarChart2, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'
import TreeDiagram from '@/components/visuals/TreeDiagram'

const content = {
  title: 'BST vs AVL — Performance Comparison',
  explanationSections: [
    {
      title: '1️⃣ The Core Problem with BST',
      icon: <FiAlertTriangle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A plain BST gives O(log n) performance only when the tree is <em>balanced</em>. The tree's shape depends entirely on the insertion order — a sorted input collapses it into a list.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Best Case — Random Input</p>
              <p className="text-gray-300 text-sm font-mono">Insert: 50, 30, 70, 20, 40, 60, 80</p>
              <p className="text-gray-300 text-sm mt-2">Result: balanced tree, height = 3, O(log n) for all ops</p>
            </div>
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
              <p className="text-red-300 font-semibold mb-2">Worst Case — Sorted Input</p>
              <p className="text-gray-300 text-sm font-mono">Insert: 10, 20, 30, 40, 50, 60, 70</p>
              <p className="text-gray-300 text-sm mt-2">Result: right-skewed chain, height = 7, O(n) for all ops</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TreeDiagram
              title="Balanced BST (random order) — height = O(log n)"
              width={240} height={200}
              nodes={[
                { id: 'r',  label: '40', x: 120, y: 40,  color: 'green'  },
                { id: 'l',  label: '20', x: 60,  y: 110, color: 'green'  },
                { id: 'r2', label: '60', x: 180, y: 110, color: 'green'  },
                { id: 'll', label: '10', x: 30,  y: 180, color: 'slate'  },
                { id: 'lr', label: '30', x: 90,  y: 180, color: 'slate'  },
              ]}
              edges={[
                { from: 'r', to: 'l' }, { from: 'r', to: 'r2' },
                { from: 'l', to: 'll' }, { from: 'l', to: 'lr' },
              ]}
            />
            <TreeDiagram
              title="Degenerate BST (sorted order) — height = O(n)"
              width={240} height={200}
              nodes={[
                { id: 'n1', label: '10', x: 50,  y: 35,  color: 'red' },
                { id: 'n2', label: '20', x: 110, y: 90,  color: 'red' },
                { id: 'n3', label: '30', x: 170, y: 145, color: 'red' },
                { id: 'n4', label: '40', x: 220, y: 185, color: 'red' },
              ]}
              edges={[
                { from: 'n1', to: 'n2' },
                { from: 'n2', to: 'n3' },
                { from: 'n3', to: 'n4' },
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ Full Comparison Table',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Property</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Plain BST</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">AVL Tree</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Height guarantee', 'None — depends on input', 'O(log n) always'],
                  ['Search time', 'O(log n) avg, O(n) worst', 'O(log n) guaranteed'],
                  ['Insert time', 'O(log n) avg, O(n) worst', 'O(log n) + rotation overhead'],
                  ['Delete time', 'O(log n) avg, O(n) worst', 'O(log n) + O(log n) rotations'],
                  ['Rotations on insert', 'None', 'At most 2 (1 double or 2 single)'],
                  ['Rotations on delete', 'None', 'Up to O(log n) rotations'],
                  ['Space overhead', 'No extra fields', 'Height field per node (+1 int)'],
                  ['Implementation', 'Simple', 'More complex (balance tracking)'],
                  ['When to use', 'Random data, prototype', 'Sorted/sequential data, production'],
                ].map(([p, b, a]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{p}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{b}</td>
                    <td className="px-4 py-2 text-cyan-300 border border-slate-700 text-sm">{a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Height Analysis',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 space-y-2 font-mono text-sm">
            <p className="text-cyan-300">BST height range: [⌊log₂n⌋, n]</p>
            <p className="text-green-300">AVL height bound: h ≤ 1.44 log₂(n+2) − 1.328</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">n (nodes)</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Min BST height</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Max BST height</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Max AVL height</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['7', '2', '7', '3'],
                  ['15', '3', '15', '5'],
                  ['100', '6', '100', '9'],
                  ['1,000', '9', '1,000', '13'],
                  ['1,000,000', '19', '1,000,000', '28'],
                ].map(([n, mn, mx, avl]) => (
                  <tr key={n}>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700">{n}</td>
                    <td className="px-4 py-2 text-green-300 font-mono border border-slate-700">{mn}</td>
                    <td className="px-4 py-2 text-red-300 font-mono border border-slate-700">{mx}</td>
                    <td className="px-4 py-2 text-cyan-300 font-mono border border-slate-700">{avl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ When to Choose Each',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Use Plain BST When</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Data is known to be random (no worst case)</li>
                <li>Simplicity is priority (e.g., quick prototype)</li>
                <li>Many deletions make AVL rebalancing costly</li>
                <li>Teaching / conceptual understanding</li>
              </ul>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Use AVL Tree When</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Data may be sorted or nearly sorted</li>
                <li>Guaranteed O(log n) is required</li>
                <li>Search-heavy workloads (read more than write)</li>
                <li>Ordered iteration needed frequently</li>
              </ul>
            </div>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">Industry Note</p>
            <p className="text-gray-300 text-sm">Java's TreeMap and TreeSet use Red-Black Trees (not AVL) for slightly fewer rotations on insert/delete. Linux kernel's completely fair scheduler uses Red-Black Trees. Databases use B-Trees (multi-way, disk-optimised) rather than binary trees.</p>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is the height of a BST in the worst case and when does this occur?', solution: 'Worst case height = n (equal to the number of nodes). This occurs when keys are inserted in sorted order (ascending or descending), creating a linear chain — the tree degenerates into a linked list.' },
    { question: 'What height guarantee does an AVL tree provide?', solution: 'An AVL tree guarantees height h ≤ 1.44 log₂(n+2), which is O(log n). This means all operations (search, insert, delete) run in O(log n) time regardless of input order.' },
    { question: 'How many rotations does an AVL tree need per insertion vs deletion?', solution: 'Insertion: at most 2 rotations (one double rotation for LR or RL case). Deletion: up to O(log n) rotations, because removing a node can cause imbalances that propagate up the tree to the root.' },
    { question: 'MCQ: For a database with 1 million sequential auto-increment IDs, which is better?\n A) Plain BST\n B) AVL Tree\n C) Both are equally good\n D) Neither — use arrays', solution: 'B) AVL Tree — sequential IDs inserted in order would make a plain BST degenerate to height 1,000,000 (O(n) search). AVL keeps height ≤ 28 (O(log n)) guaranteed.' },
    { question: 'MCQ: AVL trees use more memory than plain BSTs because:\n A) They store duplicate keys\n B) Each node stores a height or balance factor field\n C) They require a parent pointer always\n D) They store two keys per node', solution: 'B) Each node stores an extra integer (height or balance factor) to enable O(1) balance checking. This is typically 4 extra bytes per node.' },
    { question: 'A BST has 1000 elements inserted in random order. Estimate its height.', solution: 'Expected height for random insertion ≈ 2.5 ln n ≈ 2.5 × 6.9 ≈ 17 for n=1000. This is close to the minimum of ⌊log₂1000⌋ = 9, and the AVL maximum of 13. So random insertion usually gives near-optimal performance — the degenerate case requires deliberately adversarial (sorted) input.' },
    { question: 'Interview: Compare AVL trees and Red-Black trees. Why does Java use Red-Black trees in TreeMap?', solution: 'Both guarantee O(log n) height. AVL trees are more strictly balanced (max height 1.44 log n) — better for search-heavy workloads. Red-Black trees allow slightly more imbalance (max height 2 log n) but require fewer rotations on insert/delete — better for write-heavy workloads. Java\'s TreeMap uses Red-Black trees because typical map usage mixes reads and writes; the lower rotation cost on modifications outweighs the slight increase in search depth.' },
  ],
  exampleProblems: [],
}

export default function BSTvsAVLPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
