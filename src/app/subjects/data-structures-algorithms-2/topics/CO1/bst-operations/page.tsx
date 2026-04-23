'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiSearch, FiTrash2, FiCode, FiCheckCircle } from 'react-icons/fi'
import TreeDiagram from '@/components/visuals/TreeDiagram'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: 'BST Operations & Time Complexity',
  explanationSections: [
    {
      title: '1️⃣ BST Search',
      icon: <FiSearch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Search compares the target key with the current node and recurses left (if smaller) or right (if larger). Returns the node or null.</p>
          <AlgoStepper
            title="Deletion trace — delete node 50 (two children)"
            steps={[
              { title: 'Target: node 50 has two children', description: 'Cannot simply remove — must maintain BST property.', code: 'root.left != null && root.right != null' },
              { title: 'Find inorder successor', description: 'Leftmost node of right subtree = min(right) = 60.', code: 'Node successor = minNode(root.right); // = 60' },
              { title: 'Copy successor key', description: 'Overwrite 50 with 60. Tree still valid — 60 is between left (max=40) and right subtree.', code: 'root.key = successor.key; // root becomes 60' },
              { title: 'Delete original 60', description: '60 is a leaf (no children) → Case 1 deletion. Remove it cleanly.', code: 'root.right = delete(root.right, 60);' },
              { title: 'Done ✓', description: 'BST property preserved. Root is now 60, left subtree unchanged.', code: 'return root; // root.key = 60' },
            ]}
          />
          <TreeDiagram
            title="Before delete(50) → After: 50 replaced by inorder successor 60"
            width={500} height={230}
            nodes={[
              { id: 'r',  label: '60', x: 250, y: 45,  color: 'amber',  highlight: true },
              { id: 'l',  label: '30', x: 125, y: 120, color: 'cyan'   },
              { id: 'r2', label: '70', x: 375, y: 120, color: 'cyan'   },
              { id: 'll', label: '20', x: 62,  y: 195, color: 'violet' },
              { id: 'lr', label: '40', x: 188, y: 195, color: 'violet' },
              { id: 'rr', label: '80', x: 375, y: 195, color: 'violet' },
            ]}
            edges={[
              { from: 'r',  to: 'l',  },
              { from: 'r',  to: 'r2', },
              { from: 'l',  to: 'll', },
              { from: 'l',  to: 'lr', },
              { from: 'r2', to: 'rr', },
            ]}
          />
          <PyCode language="java">{`// Recursive search — O(h) where h = tree height
Node search(Node root, int key) {
    if (root == null || root.key == key)
        return root;
    if (key < root.key)
        return search(root.left, key);
    return search(root.right, key);
}

// Iterative search — avoids stack overhead
Node searchIterative(Node root, int key) {
    while (root != null && root.key != key) {
        root = (key < root.key) ? root.left : root.right;
    }
    return root;
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '2️⃣ BST Deletion — 3 Cases',
      icon: <FiTrash2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              ['Case 1: Leaf node', 'Node has no children. Simply remove it — set parent pointer to null.', 'green'],
              ['Case 2: One child', 'Node has one child. Replace the node with its child (link grandparent directly to child).', 'blue'],
              ['Case 3: Two children', 'Find inorder successor (smallest in right subtree). Copy its key to current node. Delete the inorder successor (which has at most one child).', 'violet'],
            ].map(([c, d, col]) => (
              <div key={c} className={`bg-${col}-500/10 p-4 rounded-lg border border-${col}-500/30`}>
                <p className={`text-${col}-300 font-semibold mb-1`}>{c}</p>
                <p className="text-gray-300 text-sm">{d}</p>
              </div>
            ))}
          </div>
          <PyCode language="java">{`Node delete(Node root, int key) {
    if (root == null) return null;

    if (key < root.key)
        root.left = delete(root.left, key);
    else if (key > root.key)
        root.right = delete(root.right, key);
    else {
        // Case 1 & 2: 0 or 1 child
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;

        // Case 3: two children — find inorder successor
        Node successor = minNode(root.right);
        root.key = successor.key;                 // copy successor's key
        root.right = delete(root.right, successor.key); // delete successor
    }
    return root;
}

Node minNode(Node root) {
    while (root.left != null) root = root.left;
    return root;
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '3️⃣ Successor & Predecessor',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Inorder Successor</p>
              <p className="text-gray-300 text-sm">The next larger key. If right subtree exists: leftmost node of right subtree. Else: walk up ancestors until you turn left.</p>
            </div>
            <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
              <p className="text-violet-300 font-semibold mb-2">Inorder Predecessor</p>
              <p className="text-gray-300 text-sm">The next smaller key. If left subtree exists: rightmost node of left subtree. Else: walk up ancestors until you turn right.</p>
            </div>
          </div>
          <PyCode language="java">{`// Inorder successor of a node
Node inorderSuccessor(Node root, Node target) {
    if (target.right != null)
        return minNode(target.right);  // leftmost of right subtree

    Node successor = null;
    while (root != null) {
        if (target.key < root.key) {
            successor = root;      // potential successor
            root = root.left;
        } else if (target.key > root.key) {
            root = root.right;
        } else break;
    }
    return successor;
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '4️⃣ Complexity Summary',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Operation</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Average</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Worst</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Notes</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Search', 'O(log n)', 'O(n)', 'Worst when degenerate (sorted input)'],
                  ['Insert', 'O(log n)', 'O(n)', 'Find position then link'],
                  ['Delete (leaf)', 'O(log n)', 'O(n)', 'Find + unlink'],
                  ['Delete (2 children)', 'O(log n)', 'O(n)', 'Find successor + delete it'],
                  ['Min / Max', 'O(log n)', 'O(n)', 'Leftmost / rightmost node'],
                  ['Successor', 'O(log n)', 'O(n)', 'Right subtree min or ancestor walk'],
                ].map(([op, a, w, n]) => (
                  <tr key={op}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{op}</td>
                    <td className="px-4 py-2 text-amber-300 font-mono border border-slate-700">{a}</td>
                    <td className="px-4 py-2 text-red-300 font-mono border border-slate-700">{w}</td>
                    <td className="px-4 py-2 text-gray-400 text-xs border border-slate-700">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">Why O(h) not O(log n)?</p>
            <p className="text-gray-300 text-sm">All BST operations traverse at most h nodes (the height). For a balanced tree h=O(log n), but for a degenerate tree h=n. We write O(h) to be precise, since h depends on the insertion sequence.</p>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'Explain the 3 cases of BST deletion.', solution: 'Case 1 (leaf): simply remove the node. Case 2 (one child): replace the node with its only child, linking the grandparent directly. Case 3 (two children): find the inorder successor (leftmost node of right subtree), copy its key into the current node, then delete the successor (which has at most one child, so it falls into Case 1 or 2).' },
    { question: 'Delete key 50 from BST: 50(root), left=30(20,40), right=70(60,80). Show the result.', solution: 'Key 50 has two children. Inorder successor = leftmost of right subtree = 60. Copy 60 to root. Delete 60 from right subtree (it\'s a leaf). Result: root=60, left=30(20,40), right=70(_,80).' },
    { question: 'What is the inorder successor of a node with a right subtree?', solution: 'The inorder successor is the leftmost (minimum) node of the right subtree. It is the smallest key greater than the current node\'s key.' },
    { question: 'MCQ: Deleting a node with two children in a BST is replaced by:\n A) Its left child\n B) Its right child\n C) Its inorder successor\n D) Its parent', solution: 'C) Its inorder successor — the smallest key in the right subtree. This maintains the BST property because the successor is larger than all left-subtree keys and smaller than all remaining right-subtree keys.' },
    { question: 'MCQ: The minimum element in a BST is:\n A) The root\n B) The leftmost node\n C) The rightmost node\n D) The node with no children', solution: 'B) The leftmost node — keep going left until no left child exists. That is the smallest key by the BST property.' },
    { question: 'What is the worst-case time complexity for all BST operations and when does it occur?', solution: 'O(n) — when the BST degenerates into a linear chain (height = n). This happens when keys are inserted in sorted or reverse-sorted order (e.g., 1,2,3,...,n creates a right-skewed tree; n,n-1,...,1 creates a left-skewed tree).' },
    { question: 'Interview: How would you find the kth smallest element in a BST efficiently?', solution: 'Approach 1 (O(n) time): inorder traversal collects sorted output; return the kth element. Approach 2 (O(log n) with augmented BST): store subtree size in each node. At root, left_size = size(root.left). If k == left_size+1, root is the answer. If k <= left_size, recurse left. Else recurse right with k -= left_size+1. This is used in Order-Statistic Trees (augmented BSTs in systems like databases).' },
  ],
  exampleProblems: [],
}

export default function BSTOperationsPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
