'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiGitBranch, FiCode, FiList, FiCheckCircle } from 'react-icons/fi'
import TreeDiagram from '@/components/visuals/TreeDiagram'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: 'Binary Search Trees (BST)',
  explanationSections: [
    {
      title: '1️⃣ BST Property',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A <span className="text-cyan-400 font-semibold">Binary Search Tree</span> is a binary tree where every node satisfies: all keys in the <em>left subtree</em> are smaller, and all keys in the <em>right subtree</em> are larger than the node's key.</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-center">
            <p className="text-cyan-300 text-lg">left.key &lt; node.key &lt; right.key</p>
            <p className="text-gray-400 text-xs mt-1">for every node in the tree</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Search', 'Compare key → go left (smaller) or right (larger)', 'blue'],
              ['Insert', 'Search for key, insert at the NULL position found', 'green'],
              ['Delete', '3 cases: leaf, one child, two children', 'violet'],
            ].map(([t, d, c]) => (
              <div key={t} className={`bg-${c}-500/10 p-4 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold mb-1`}>{t}</p>
                <p className="text-gray-300 text-sm">{d}</p>
              </div>
            ))}
          </div>
          <TreeDiagram
            title="BST example — left < parent < right at every node"
            width={500} height={230}
            nodes={[
              { id: 'r',  label: '50', x: 250, y: 45,  color: 'cyan'   },
              { id: 'l',  label: '30', x: 125, y: 120, color: 'cyan'   },
              { id: 'r2', label: '70', x: 375, y: 120, color: 'cyan'   },
              { id: 'll', label: '20', x: 62,  y: 195, color: 'violet' },
              { id: 'lr', label: '40', x: 188, y: 195, color: 'violet' },
              { id: 'rl', label: '60', x: 312, y: 195, color: 'violet' },
              { id: 'rr', label: '80', x: 438, y: 195, color: 'violet' },
            ]}
            edges={[
              { from: 'r',  to: 'l'  },
              { from: 'r',  to: 'r2' },
              { from: 'l',  to: 'll' },
              { from: 'l',  to: 'lr' },
              { from: 'r2', to: 'rl' },
              { from: 'r2', to: 'rr' },
            ]}
          />
          <AlgoStepper
            title="Search trace — finding key 40 (press ▶ Play or click →)"
            interval={3000}
            steps={[
              {
                title: 'Start at root 50',
                description: '40 < 50 → go LEFT down the tree',
                code: 'if (key < root.key) root = root.left;',
                visual: <TreeDiagram width={460} height={210}
                  nodes={[
                    { id: 'r',  label: '50', x: 230, y: 40,  color: 'amber', highlight: true },
                    { id: 'l',  label: '30', x: 115, y: 115, color: 'cyan'   },
                    { id: 'r2', label: '70', x: 345, y: 115, color: 'cyan'   },
                    { id: 'll', label: '20', x: 57,  y: 188, color: 'violet' },
                    { id: 'lr', label: '40', x: 173, y: 188, color: 'violet' },
                    { id: 'rl', label: '60', x: 287, y: 188, color: 'violet' },
                    { id: 'rr', label: '80', x: 403, y: 188, color: 'violet' },
                  ]}
                  edges={[
                    { from: 'r',  to: 'l',  highlight: true },
                    { from: 'r',  to: 'r2' },
                    { from: 'l',  to: 'll' },
                    { from: 'l',  to: 'lr' },
                    { from: 'r2', to: 'rl' },
                    { from: 'r2', to: 'rr' },
                  ]}
                />,
              },
              {
                title: 'Visit node 30',
                description: '40 > 30 → go RIGHT towards 40',
                code: 'if (key > root.key) root = root.right;',
                visual: <TreeDiagram width={460} height={210}
                  nodes={[
                    { id: 'r',  label: '50', x: 230, y: 40,  color: 'cyan',   dim: true  },
                    { id: 'l',  label: '30', x: 115, y: 115, color: 'amber', highlight: true },
                    { id: 'r2', label: '70', x: 345, y: 115, color: 'cyan',   dim: true  },
                    { id: 'll', label: '20', x: 57,  y: 188, color: 'violet', dim: true  },
                    { id: 'lr', label: '40', x: 173, y: 188, color: 'cyan'   },
                    { id: 'rl', label: '60', x: 287, y: 188, color: 'violet', dim: true  },
                    { id: 'rr', label: '80', x: 403, y: 188, color: 'violet', dim: true  },
                  ]}
                  edges={[
                    { from: 'r',  to: 'l'  },
                    { from: 'r',  to: 'r2' },
                    { from: 'l',  to: 'll' },
                    { from: 'l',  to: 'lr', highlight: true },
                    { from: 'r2', to: 'rl' },
                    { from: 'r2', to: 'rr' },
                  ]}
                />,
              },
              {
                title: '✅ Found node 40!',
                description: '40 == 40 → key found, return this node',
                code: 'return root; // root.key == key ✓',
                visual: <TreeDiagram width={460} height={210}
                  nodes={[
                    { id: 'r',  label: '50', x: 230, y: 40,  color: 'cyan',   dim: true  },
                    { id: 'l',  label: '30', x: 115, y: 115, color: 'cyan',   dim: true  },
                    { id: 'r2', label: '70', x: 345, y: 115, color: 'cyan',   dim: true  },
                    { id: 'll', label: '20', x: 57,  y: 188, color: 'violet', dim: true  },
                    { id: 'lr', label: '40', x: 173, y: 188, color: 'green', highlight: true },
                    { id: 'rl', label: '60', x: 287, y: 188, color: 'violet', dim: true  },
                    { id: 'rr', label: '80', x: 403, y: 188, color: 'violet', dim: true  },
                  ]}
                  edges={[
                    { from: 'r',  to: 'l'  },
                    { from: 'r',  to: 'r2' },
                    { from: 'l',  to: 'll' },
                    { from: 'l',  to: 'lr', highlight: true },
                    { from: 'r2', to: 'rl' },
                    { from: 'r2', to: 'rr' },
                  ]}
                />,
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: '2️⃣ BST Structure & Java Implementation',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <PyCode language="java">{`class Node {
    int key;
    Node left, right;

    Node(int key) {
        this.key = key;
        left = right = null;
    }
}

class BST {
    Node root;

    // Insert a key
    Node insert(Node root, int key) {
        if (root == null) return new Node(key);
        if (key < root.key)
            root.left = insert(root.left, key);
        else if (key > root.key)
            root.right = insert(root.right, key);
        return root;  // duplicate keys ignored
    }

    // Search for a key
    Node search(Node root, int key) {
        if (root == null || root.key == key) return root;
        if (key < root.key) return search(root.left, key);
        return search(root.right, key);
    }
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '3️⃣ Tree Traversals',
      icon: <FiList className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Traversal</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Order</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">BST Output</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Use Case</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Inorder', 'Left → Root → Right', 'Sorted ascending', 'BST validation, sorted output'],
                  ['Preorder', 'Root → Left → Right', 'Insertion order', 'Tree copying, serialisation'],
                  ['Postorder', 'Left → Right → Root', 'Leaves before root', 'Tree deletion, expression eval'],
                  ['Level Order', 'BFS level by level', 'Top-down width', 'Breadth-first applications'],
                ].map(([t, o, out, u]) => (
                  <tr key={t}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{t}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm font-mono">{o}</td>
                    <td className="px-4 py-2 text-green-300 border border-slate-700 text-sm">{out}</td>
                    <td className="px-4 py-2 text-gray-400 border border-slate-700 text-sm">{u}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PyCode language="java">{`void inorder(Node root) {
    if (root == null) return;
    inorder(root.left);
    System.out.print(root.key + " ");
    inorder(root.right);
}

void preorder(Node root) {
    if (root == null) return;
    System.out.print(root.key + " ");
    preorder(root.left);
    preorder(root.right);
}

void postorder(Node root) {
    if (root == null) return;
    postorder(root.left);
    postorder(root.right);
    System.out.print(root.key + " ");
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '4️⃣ Height & Complexity Analysis',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Best / Average Case</p>
              <p className="text-gray-300 text-sm">Balanced BST — height h = O(log n). All operations: O(log n). Achieved with n nodes inserted in random order.</p>
            </div>
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
              <p className="text-red-300 font-semibold mb-2">Worst Case — Degeneracy</p>
              <p className="text-gray-300 text-sm">Sorted insertion (1,2,3,…,n) creates a linear chain: h = n. All operations degrade to O(n). AVL trees fix this.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Operation</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Best</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Average</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Worst</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Search', 'O(log n)', 'O(log n)', 'O(n)'],
                  ['Insert', 'O(log n)', 'O(log n)', 'O(n)'],
                  ['Delete', 'O(log n)', 'O(log n)', 'O(n)'],
                  ['Traversal', 'O(n)', 'O(n)', 'O(n)'],
                ].map(([op, b, a, w]) => (
                  <tr key={op}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{op}</td>
                    <td className="px-4 py-2 text-green-300 font-mono border border-slate-700">{b}</td>
                    <td className="px-4 py-2 text-amber-300 font-mono border border-slate-700">{a}</td>
                    <td className="px-4 py-2 text-red-300 font-mono border border-slate-700">{w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is the BST property?', solution: 'For every node N in a BST: all keys in the left subtree of N are less than N.key, and all keys in the right subtree are greater than N.key. This holds recursively for every node.' },
    { question: 'Insert keys 50, 30, 70, 20, 40, 60, 80 into an empty BST. What does inorder traversal produce?', solution: 'Inorder traversal of a BST always produces sorted output: 20, 30, 40, 50, 60, 70, 80.' },
    { question: 'What happens when you insert sorted data (1,2,3,...,n) into a BST?', solution: 'The BST degenerates into a right-skewed linear chain (like a linked list) with height n. All operations take O(n) time instead of O(log n), making the BST inefficient. This is why self-balancing trees (AVL, Red-Black) were invented.' },
    { question: 'MCQ: Inorder traversal of a BST gives:\n A) Random order\n B) Reverse sorted order\n C) Sorted (ascending) order\n D) Level-order output', solution: 'C) Sorted (ascending) order — because inorder visits left (smaller) → root → right (larger) at every node, producing keys in sorted order.' },
    { question: 'MCQ: The height of a perfectly balanced BST with n nodes is:\n A) O(n)\n B) O(n²)\n C) O(log n)\n D) O(1)', solution: 'C) O(log n) — a complete binary tree of n nodes has height ⌊log₂n⌋.' },
    { question: 'Write inorder, preorder, and postorder traversal for the BST with root 4, left subtree {2,1,3}, right subtree {6,5,7}.', solution: 'Inorder: 1 2 3 4 5 6 7 (sorted). Preorder: 4 2 1 3 6 5 7 (root first). Postorder: 1 3 2 5 7 6 4 (root last).' },
    { question: 'Interview: When is a BST preferred over a sorted array or hash table?', solution: 'BST preferred when: (1) Need both search and in-order traversal (sorted iteration) efficiently — sorted arrays support binary search but insertion is O(n); (2) Need dynamic insertions/deletions — hash tables have O(1) average search but no ordering; (3) Need range queries — BST supports "find all keys between a and b" in O(log n + k); hash tables cannot. BST loses to hash tables for pure lookup speed.' },
  ],
  exampleProblems: [],
}

export default function BSTConceptsPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
