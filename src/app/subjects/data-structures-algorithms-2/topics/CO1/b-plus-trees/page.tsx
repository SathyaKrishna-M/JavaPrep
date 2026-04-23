'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiDatabase, FiLink, FiSearch, FiCheckCircle } from 'react-icons/fi'
import TreeDiagram from '@/components/visuals/TreeDiagram'

const content = {
  title: 'B+ Trees',
  explanationSections: [
    {
      title: '1️⃣ B+ Tree vs B-Tree',
      icon: <FiDatabase className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A <span className="text-cyan-400 font-semibold">B+ tree</span> is a variant of the B-tree where <em>all actual data records are stored only in leaf nodes</em>. Internal nodes store only keys as routing guides. Leaves are linked into a doubly-linked list for efficient range queries.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Property</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">B-Tree</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">B+ Tree</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Data storage', 'Internal and leaf nodes', 'Leaf nodes only'],
                  ['Internal nodes', 'Store keys + data', 'Store keys only (routing)'],
                  ['Leaf nodes', 'Store keys + data', 'Store all keys + data + next-pointer'],
                  ['Keys in internal nodes', 'Not repeated in leaves', 'Repeated in leaves'],
                  ['Range queries', 'Traverse tree for each key', 'Scan linked leaf list — O(k)'],
                  ['Fan-out', 'Lower (data takes space)', 'Higher (keys only — fits more)'],
                  ['Usage', 'File systems (NTFS)', 'Databases (MySQL InnoDB, PostgreSQL)'],
                ].map(([p, b, bp]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{p}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{b}</td>
                    <td className="px-4 py-2 text-cyan-300 border border-slate-700 text-sm">{bp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TreeDiagram
            title="B+ Tree — internal nodes route; all data lives in linked leaves"
            width={500} height={210}
            nodes={[
              { id: 'root', label: '30|60', x: 250, y: 45,  color: 'cyan'   },
              { id: 'l1',   label: '10|20', x: 80,  y: 150, color: 'green'  },
              { id: 'l2',   label: '30|40', x: 250, y: 150, color: 'green'  },
              { id: 'l3',   label: '60|70', x: 420, y: 150, color: 'green'  },
            ]}
            edges={[
              { from: 'root', to: 'l1' },
              { from: 'root', to: 'l2' },
              { from: 'root', to: 'l3' },
              { from: 'l1',   to: 'l2', dashed: true, highlight: true },
              { from: 'l2',   to: 'l3', dashed: true, highlight: true },
            ]}
          />
          <p className="text-gray-500 text-xs text-center">Cyan = internal routing node (keys only) · Green = leaf nodes (data) · Dashed = next-leaf pointer for range scans</p>
        </div>
      ),
    },
    {
      title: '2️⃣ Leaf-Linked Structure',
      icon: <FiLink className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">All leaf nodes are connected by <em>next-pointers</em> forming a doubly linked list. This allows efficient sequential and range scans without traversing the tree.</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-2">B+ Tree structure (order 3, showing 3 levels):</p>
            <p className="text-gray-300">              [30]                   ← internal root</p>
            <p className="text-gray-300">         /          \</p>
            <p className="text-gray-300">      [10|20]       [40|50]          ← internal nodes</p>
            <p className="text-gray-300">     /   |   \      /   |   \</p>
            <p className="text-gray-300">[1..9]→[10..19]→[20..29]→[30..39]→[40..49]→[50..]  ← leaves linked</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Point Query</p>
              <p className="text-gray-300 text-sm">Start at root, compare key with routing keys, follow child pointers to the correct leaf. O(log n) disk reads.</p>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Range Query [a, b]</p>
              <p className="text-gray-300 text-sm">Find leaf containing a (O(log n)), then scan linked list until key exceeds b (O(k) where k = result size). No re-traversal of tree!</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Database Indexing with B+ Trees',
      icon: <FiSearch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">In a database, a B+ tree index maps column values (keys) to record locations (row IDs or actual rows). This enables fast lookups without scanning the whole table.</p>
          <div className="space-y-3">
            {[
              ['Primary Index (Clustered)', 'The table rows are physically stored in B+ tree leaf order. One per table. MySQL InnoDB always has a clustered index (usually on primary key).'],
              ['Secondary Index (Non-Clustered)', 'A separate B+ tree on a non-PK column. Leaves contain (indexed key, primary key) pairs. Requires two tree traversals to fetch the full row (index + clustered).'],
              ['Composite Index', 'B+ tree on multiple columns (col1, col2). Supports queries on col1 alone or (col1, col2) together — but NOT col2 alone (leftmost prefix rule).'],
              ['Covering Index', 'An index that includes all columns a query needs. The query is satisfied from the index alone — no second lookup needed.'],
            ].map(([t, d]) => (
              <div key={t} className="border-l-4 border-violet-500 pl-4">
                <p className="text-violet-300 font-semibold">{t}</p>
                <p className="text-gray-400 text-sm">{d}</p>
              </div>
            ))}
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
            <li><strong>B+ tree:</strong> all data in leaves; internal nodes are routing-only</li>
            <li><strong>Leaf linked list:</strong> enables O(k) range scans after O(log n) initial lookup</li>
            <li><strong>Higher fan-out:</strong> internal nodes store only keys → more children → shorter tree</li>
            <li><strong>Preferred in databases:</strong> MySQL InnoDB, PostgreSQL, Oracle all use B+ trees</li>
            <li><strong>Insertion/deletion:</strong> may require leaf splits and key promotions, but always maintains the linked leaf list</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is the key structural difference between a B-tree and a B+ tree?', solution: 'In a B-tree, both internal and leaf nodes store data records. In a B+ tree, only leaf nodes store data; internal nodes store only keys as routing guides. B+ tree leaves are also connected by next-pointers forming a linked list.' },
    { question: 'Why are B+ trees preferred over B-trees in databases?', solution: '(1) Higher fan-out — internal nodes store only keys (no data), so each node fits more keys → shorter tree → fewer disk reads. (2) Efficient range queries — leaf linked list enables sequential scan in O(k) without re-traversing the tree. (3) Consistent depth — all leaves at same level guarantees uniform access time.' },
    { question: 'Explain how a range query SELECT * WHERE age BETWEEN 20 AND 30 works on a B+ tree index.', solution: 'Step 1: Traverse the B+ tree from root to leaf containing age=20 — O(log n) disk reads. Step 2: Scan the leaf linked list from age=20 forward, outputting each record until age>30 — O(k) reads where k=number of matching records. Total: O(log n + k), far better than full table scan O(n).' },
    { question: 'MCQ: In a B+ tree, data records are stored in:\n A) The root only\n B) All internal nodes\n C) Only the leaf nodes\n D) Every other level', solution: 'C) Only the leaf nodes — internal nodes contain only keys for routing. This is the defining characteristic of B+ trees.' },
    { question: 'MCQ: The leaf nodes of a B+ tree are connected by:\n A) Parent pointers\n B) A linked list (next-pointers)\n C) A hash table\n D) Stack pointers', solution: 'B) A linked list (next-pointers) — leaves are connected left-to-right, enabling efficient range queries and sequential scans.' },
    { question: 'A B+ tree of order 100 is used to index a table with 1 billion rows. Estimate the tree height.', solution: 'Each internal node has up to 100 children (order 100). Height h = ceil(log₁₀₀(10⁹)) = ceil(9/2) = 5 levels. Realistically with minimum occupancy (50 children), h = ceil(log₅₀(10⁹)) = ceil(9/1.7) = 6 levels. So 5-6 disk reads to find any record in a 1-billion-row table!' },
    { question: 'Interview: Why does MySQL InnoDB always store rows in a clustered B+ tree index on the primary key?', solution: 'By storing rows physically in primary key order within the B+ tree leaves, MySQL gains: (1) Primary key lookups access the data directly from the leaf — no second fetch. (2) Range scans on primary key are sequential reads of the linked leaf list — extremely cache-friendly. (3) JOIN operations on primary key are fast. The cost is that secondary indexes must store the primary key (not a row pointer), requiring two lookups for secondary index access.' },
  ],
  exampleProblems: [],
}

export default function BPlusTreesPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
