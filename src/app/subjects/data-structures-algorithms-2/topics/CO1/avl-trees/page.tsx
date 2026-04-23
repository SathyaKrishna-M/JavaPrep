'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiActivity, FiRefreshCw, FiCode, FiCheckCircle } from 'react-icons/fi'
import TreeDiagram from '@/components/visuals/TreeDiagram'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: 'AVL Trees & Rotations',
  explanationSections: [
    {
      title: '1️⃣ What is an AVL Tree?',
      icon: <FiActivity className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">An <span className="text-cyan-400 font-semibold">AVL tree</span> (Adelson-Velsky & Landis, 1962) is a self-balancing BST where the <em>balance factor</em> of every node is −1, 0, or +1. This guarantees height O(log n) at all times.</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-center">
            <p className="text-cyan-300 text-lg">Balance Factor (BF) = height(left) − height(right)</p>
            <p className="text-gray-400 text-xs mt-1">Valid BF values: {'{-1, 0, +1}'}. If |BF| &gt; 1 → rebalance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['BF = 0', 'Left and right subtrees have equal height — balanced', 'green'],
              ['BF = +1', 'Left subtree one level taller — still valid', 'blue'],
              ['BF = −1', 'Right subtree one level taller — still valid', 'violet'],
            ].map(([bf, d, c]) => (
              <div key={bf} className={`bg-${c}-500/10 p-4 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-mono font-bold mb-1`}>{bf}</p>
                <p className="text-gray-300 text-sm">{d}</p>
              </div>
            ))}
          </div>
          <TreeDiagram
            title="Balanced AVL tree — BF of every node is −1, 0, or +1"
            width={500} height={230}
            nodes={[
              { id: 'r',  label: '40', sublabel: 'BF=0',  x: 250, y: 45,  color: 'cyan'   },
              { id: 'l',  label: '20', sublabel: 'BF=0',  x: 125, y: 120, color: 'green'  },
              { id: 'r2', label: '60', sublabel: 'BF=-1', x: 375, y: 120, color: 'green'  },
              { id: 'll', label: '10', sublabel: 'BF=0',  x: 62,  y: 195, color: 'slate'  },
              { id: 'lr', label: '30', sublabel: 'BF=0',  x: 188, y: 195, color: 'slate'  },
              { id: 'rr', label: '70', sublabel: 'BF=0',  x: 438, y: 195, color: 'slate'  },
            ]}
            edges={[
              { from: 'r', to: 'l' }, { from: 'r', to: 'r2' },
              { from: 'l', to: 'll' }, { from: 'l', to: 'lr' },
              { from: 'r2', to: 'rr' },
            ]}
          />
          <AlgoStepper
            title="4 Rotation Types — when to apply each"
            steps={[
              { title: 'LL (Left-Left) — single right rotation', description: 'Node Z has BF=+2 and its left child Y is left-heavy (BF≥0). Perform ONE right rotation at Z. Y rises to become the new subtree root.', code: 'Node rightRotate(Node z) { Node y = z.left; z.left = y.right; y.right = z; return y; }' },
              { title: 'RR (Right-Right) — single left rotation', description: 'Node Z has BF=−2 and its right child Y is right-heavy (BF≤0). Perform ONE left rotation at Z. Y rises to become the new subtree root.', code: 'Node leftRotate(Node z) { Node y = z.right; z.right = y.left; y.left = z; return y; }' },
              { title: 'LR (Left-Right) — double rotation', description: 'Node Z has BF=+2 but left child Y is right-heavy (BF=−1). First left-rotate Y, then right-rotate Z. The deepest node X rises two levels.', code: 'z.left = leftRotate(z.left);  // fix Y\nreturn rightRotate(z);        // fix Z' },
              { title: 'RL (Right-Left) — double rotation', description: 'Node Z has BF=−2 but right child Y is left-heavy (BF=+1). First right-rotate Y, then left-rotate Z. The deepest node X rises two levels.', code: 'z.right = rightRotate(z.right); // fix Y\nreturn leftRotate(z);           // fix Z' },
            ]}
          />
        </div>
      ),
    },
    {
      title: '2️⃣ Four Rotation Types',
      icon: <FiRefreshCw className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              ['LL Rotation (Right Rotate)', 'Inserted into LEFT subtree of LEFT child. BF becomes +2. Fix: single right rotation on the unbalanced node.', 'blue'],
              ['RR Rotation (Left Rotate)', 'Inserted into RIGHT subtree of RIGHT child. BF becomes −2. Fix: single left rotation on the unbalanced node.', 'red'],
              ['LR Rotation (Left-Right)', 'Inserted into RIGHT subtree of LEFT child. BF = +2 with left child BF = −1. Fix: left rotate left child, then right rotate node.', 'violet'],
              ['RL Rotation (Right-Left)', 'Inserted into LEFT subtree of RIGHT child. BF = −2 with right child BF = +1. Fix: right rotate right child, then left rotate node.', 'amber'],
            ].map(([t, d, c]) => (
              <div key={t} className={`bg-${c}-500/10 p-4 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold mb-1`}>{t}</p>
                <p className="text-gray-300 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Rotation Implementation',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <PyCode language="java">{`class AVLNode {
    int key, height;
    AVLNode left, right;
    AVLNode(int key) { this.key = key; height = 1; }
}

int height(AVLNode n) { return n == null ? 0 : n.height; }

int getBalance(AVLNode n) {
    return n == null ? 0 : height(n.left) - height(n.right);
}

// Right rotation (fixes LL imbalance)
AVLNode rightRotate(AVLNode y) {
    AVLNode x = y.left;
    AVLNode T2 = x.right;

    x.right = y;      // perform rotation
    y.left = T2;

    // Update heights (y first, then x)
    y.height = 1 + Math.max(height(y.left), height(y.right));
    x.height = 1 + Math.max(height(x.left), height(x.right));
    return x;  // new root
}

// Left rotation (fixes RR imbalance)
AVLNode leftRotate(AVLNode x) {
    AVLNode y = x.right;
    AVLNode T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = 1 + Math.max(height(x.left), height(x.right));
    y.height = 1 + Math.max(height(y.left), height(y.right));
    return y;
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '4️⃣ AVL Insertion with Rebalancing',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <PyCode language="java">{`AVLNode insert(AVLNode node, int key) {
    // Standard BST insert
    if (node == null) return new AVLNode(key);
    if (key < node.key)      node.left = insert(node.left, key);
    else if (key > node.key) node.right = insert(node.right, key);
    else return node;  // duplicates not allowed

    // Update height
    node.height = 1 + Math.max(height(node.left), height(node.right));

    int bf = getBalance(node);

    // LL Case
    if (bf > 1 && key < node.left.key)
        return rightRotate(node);

    // RR Case
    if (bf < -1 && key > node.right.key)
        return leftRotate(node);

    // LR Case
    if (bf > 1 && key > node.left.key) {
        node.left = leftRotate(node.left);
        return rightRotate(node);
    }

    // RL Case
    if (bf < -1 && key < node.right.key) {
        node.right = rightRotate(node.right);
        return leftRotate(node);
    }

    return node;
}`}</PyCode>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-green-300 font-semibold mb-1">Height Guarantee</p>
            <p className="text-gray-300 text-sm">AVL trees maintain height h ≤ 1.44 log₂(n+2) — always O(log n). All operations guaranteed O(log n) regardless of insertion order.</p>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is the balance factor in an AVL tree?', solution: 'Balance Factor (BF) = height(left subtree) − height(right subtree). Valid values are −1, 0, +1. If BF becomes +2 or −2 after an insertion or deletion, the tree must be rebalanced using rotations.' },
    { question: 'Insert keys 30, 20, 10 into an empty AVL tree. Show the rotation.', solution: 'Insert 30 (root, BF=0). Insert 20 (left of 30, BF=+1). Insert 10 (left of 20, BF=+2 at 30). LL imbalance — apply right rotation at 30: 20 becomes root, 10 is left child, 30 is right child. Final tree: root=20(10, 30), perfectly balanced.' },
    { question: 'What type of rotation fixes an LR imbalance?', solution: 'An LR imbalance (inserted into RIGHT subtree of LEFT child) requires two rotations: first a LEFT rotation on the left child, then a RIGHT rotation on the unbalanced node. This converts the LR case to an LL case then fixes it.' },
    { question: 'MCQ: After inserting into an AVL tree, at most how many rotations are needed to rebalance?\n A) 1\n B) 2\n C) O(log n)\n D) O(n)', solution: 'B) 2 — at most one double rotation (LR or RL) is needed after any single insertion. Deletion may require O(log n) rotations up the tree.' },
    { question: 'MCQ: The height of an AVL tree with n nodes is:\n A) O(n)\n B) O(log n)\n C) O(n log n)\n D) O(√n)', solution: 'B) O(log n) — specifically at most 1.44 log₂(n+2), guaranteed by the balance factor invariant.' },
    { question: 'Insert 10, 20, 30, 40, 50, 25 into an AVL tree step by step and show all rotations.', solution: 'Insert 10,20,30: RR imbalance at 10 → left rotate → root=20(10,30). Insert 40: RR at 30 → left rotate → root=20(10,30(_,40)) wait BF at 20 = -1 ok. Insert 50: RR at 30 → left rotate at 30 → 20(10,40(30,50)). Insert 25: goes to 30.left, BF at 40 = +1 wait — 25 < 40, goes left to 30, 25 < 30, goes left — RL at 40: right rotate 30 gives 25 as root of subtree, then left rotate 40. Final: root=20(10,40(30(25,_),50)).' },
    { question: 'Interview: Why are AVL trees preferred in databases over plain BSTs?', solution: 'Plain BSTs degrade to O(n) for sorted insertions — common in databases where primary keys are often sequential (auto-increment IDs). AVL trees guarantee O(log n) worst-case for search, insert, delete. For a database table with 1 million rows, O(log n) ≈ 20 comparisons vs O(n) = 1,000,000. The rotation overhead (at most 2 per insert) is negligible compared to this guarantee. Modern databases use B-Trees (a generalisation) for disk efficiency.' },
  ],
  exampleProblems: [],
}

export default function AVLTreesPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
