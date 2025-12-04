'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Lattices & Hasse Diagrams',
  explanationSections: [
    {
      title: '📊 Partial Orders',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">A partial order</span> is a relation that is reflexive, antisymmetric, and transitive.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Notation:</p>
            <p className="text-gray-300">Often denoted by <MathRenderer math="\le" />, <MathRenderer math="\subseteq" />, or <MathRenderer math="|" /></p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Reflexive:</span> <MathRenderer math="a \le a" /> for all <MathRenderer math="a" /></li>
              <li><span className="text-cyan-300">Antisymmetric:</span> If <MathRenderer math="a \le b" /> and <MathRenderer math="b \le a" />, then <MathRenderer math="a = b" /></li>
              <li><span className="text-cyan-300">Transitive:</span> If <MathRenderer math="a \le b" /> and <MathRenderer math="b \le c" />, then <MathRenderer math="a \le c" /></li>
            </ul>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-pink-300 font-semibold mb-2">Examples:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Divisibility on positive integers: <MathRenderer math="a \le b" /> if <MathRenderer math="a \mid b" /></li>
              <li>Subset relation: <MathRenderer math="A \le B" /> if <MathRenderer math="A \subseteq B" /></li>
              <li>Less than or equal on real numbers</li>
            </ul>
          </div>
        </div>
      ),
      formula: 'a \\leq b \\text{ if } a \\mid b',
    },
    {
      title: '🔗 Lattices',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">A lattice</span> is a partially ordered set (poset) where every pair of elements has both a least upper bound (join) and a greatest lower bound (meet).
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Key Concepts:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Join (<MathRenderer math="a \vee b" />):</span> Least upper bound of a and b</li>
              <li><span className="text-cyan-300">Meet (<MathRenderer math="a \wedge b" />):</span> Greatest lower bound of a and b</li>
              <li><span className="text-cyan-300">Least Element:</span> Element <MathRenderer math="\le" /> all other elements (if exists)</li>
              <li><span className="text-cyan-300">Greatest Element:</span> Element <MathRenderer math="\ge" /> all other elements (if exists)</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Types:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="text-cyan-300">Bounded Lattice:</span> Has both least and greatest elements</li>
              <li><span className="text-cyan-300">Distributive Lattice:</span> Meet and join distribute over each other</li>
              <li><span className="text-cyan-300">Complemented Lattice:</span> Every element has a complement</li>
            </ul>
          </div>
        </div>
      ),
      formula: 'a \\vee b = \\text{lub}(a, b), \\quad a \\wedge b = \\text{glb}(a, b)',
    },
    {
      title: '📈 Hasse Diagrams',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">A Hasse diagram</span> is a graphical representation of a finite partially ordered set.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Rules:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Elements:</span> Represented as nodes (circles/points)</li>
              <li><span className="text-cyan-300">Relations:</span> Draw edge from a to b if <MathRenderer math="a < b" /> and there is no c such that <MathRenderer math="a < c < b" /></li>
              <li><span className="text-cyan-300">Direction:</span> Smaller elements are drawn below larger elements</li>
              <li><span className="text-cyan-300">Transitivity:</span> Don't draw edges that can be inferred from transitivity</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Minimal elements appear at the bottom</li>
              <li>Maximal elements appear at the top</li>
              <li>Chains (totally ordered subsets) appear as vertical paths</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '🎯 Drawing Hasse Diagrams',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-blue-400 font-semibold">Steps to draw:</p>
          <ol className="list-decimal list-inside text-gray-300 space-y-1">
            <li><span className="text-cyan-300">List all elements</span></li>
            <li><span className="text-cyan-300">Identify minimal elements</span> (no elements below them)</li>
            <li><span className="text-cyan-300">Place minimal elements at bottom</span></li>
            <li><span className="text-cyan-300">For each level, place elements that cover elements below</span></li>
            <li><span className="text-cyan-300">Draw edges only for covering relations</span></li>
          </ol>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Example:</p>
            <p className="text-gray-300">For the poset <MathRenderer math="(\{1, 2, 3, 4, 6, 12\}, |)" /> where | is divisibility:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
              <li>Minimal: 1 (at bottom)</li>
              <li>Level 1: 2, 3 (cover 1)</li>
              <li>Level 2: 4, 6 (cover 2 and 3 respectively)</li>
              <li>Maximal: 12 (at top, covers 4 and 6)</li>
            </ul>
          </div>
        </div>
      ),
      hasseDiagram: {
        elements: [
          { id: '1', label: '1' },
          { id: '2', label: '2' },
          { id: '3', label: '3' },
          { id: '4', label: '4' },
          { id: '6', label: '6' },
          { id: '12', label: '12' },
        ],
        relations: [
          { from: '1', to: '2' },
          { from: '1', to: '3' },
          { from: '2', to: '4' },
          { from: '2', to: '6' },
          { from: '3', to: '6' },
          { from: '4', to: '12' },
          { from: '6', to: '12' },
        ],
        highlightLeast: true,
        highlightGreatest: true,
      },
    },
    {
      title: '🔢 Lattice Examples',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-cyan-400 font-semibold">Common Lattices:</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">1. Power Set Lattice:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Elements: All subsets of a set</li>
              <li>Order: Subset relation (<MathRenderer math="\subseteq" />)</li>
              <li>Join: Union (<MathRenderer math="\cup" />)</li>
              <li>Meet: Intersection (<MathRenderer math="\cap" />)</li>
              <li>Least: Empty set (<MathRenderer math="\emptyset" />)</li>
              <li>Greatest: Universal set</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-amber-300 font-semibold mb-2">2. Divisibility Lattice:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Elements: Positive divisors of n</li>
              <li>Order: Divisibility (<MathRenderer math="|" />)</li>
              <li>Join: LCM (least common multiple)</li>
              <li>Meet: GCD (greatest common divisor)</li>
            </ul>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-amber-300 font-semibold mb-2">3. Boolean Lattice:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Elements: All n-tuples of 0s and 1s</li>
              <li>Order: Component-wise <MathRenderer math="\le" /></li>
              <li>Join: Component-wise max</li>
              <li>Meet: Component-wise min</li>
            </ul>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: (
        <span>
          Draw the Hasse diagram for the poset <MathRenderer math="(\{1, 2, 3, 4, 5, 6\}, |)" /> where | is divisibility.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Minimal element: 1</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Level 1: 2, 3, 5 (prime numbers, cover 1)</li>
              <li>Level 2: 4 (covers 2), 6 (covers 2 and 3)</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Edges:</p>
            <ul className="list-none text-gray-300 space-y-1">
              <li><MathRenderer math="1 \to 2, 1 \to 3, 1 \to 5" /></li>
              <li><MathRenderer math="2 \to 4, 2 \to 6" /></li>
              <li><MathRenderer math="3 \to 6" /></li>
            </ul>
          </div>
          <p className="text-gray-300">Note: 4 and 6 are maximal elements (nothing above them).</p>
        </div>
      ),
      hasseDiagram: {
        elements: [
          { id: '1', label: '1' },
          { id: '2', label: '2' },
          { id: '3', label: '3' },
          { id: '4', label: '4' },
          { id: '5', label: '5' },
          { id: '6', label: '6' },
        ],
        relations: [
          { from: '1', to: '2' },
          { from: '1', to: '3' },
          { from: '1', to: '5' },
          { from: '2', to: '4' },
          { from: '2', to: '6' },
          { from: '3', to: '6' },
        ],
        highlightLeast: true,
      },
    },
    {
      question: (
        <span>
          For the power set of <MathRenderer math="\{a, b\}" />, find the join and meet of <MathRenderer math="\{a\}" /> and <MathRenderer math="\{b\}" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Power set: <MathRenderer math="P(\{a, b\}) = \{\emptyset, \{a\}, \{b\}, \{a, b\}\}" /></p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Join (least upper bound):</p>
            <p className="text-gray-300"><MathRenderer math="\{a\} \vee \{b\} = \{a\} \cup \{b\} = \{a, b\}" /></p>
            <p className="text-gray-300">The smallest set containing both <MathRenderer math="\{a\}" /> and <MathRenderer math="\{b\}" /> is <MathRenderer math="\{a, b\}" />.</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-cyan-300 font-semibold">Meet (greatest lower bound):</p>
            <p className="text-gray-300"><MathRenderer math="\{a\} \wedge \{b\} = \{a\} \cap \{b\} = \emptyset" /></p>
            <p className="text-gray-300">The largest set contained in both <MathRenderer math="\{a\}" /> and <MathRenderer math="\{b\}" /> is <MathRenderer math="\emptyset" />.</p>
          </div>
        </div>
      ),
      formula: '\\{a\\} \\vee \\{b\\} = \\{a, b\\}, \\quad \\{a\\} \\wedge \\{b\\} = \\emptyset',
    },
    {
      question: (
        <span>
          Determine if <MathRenderer math="(\{1, 2, 3, 4, 6, 12\}, |)" /> forms a lattice.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Check if every pair has both join and meet.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">For 2 and 3:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="text-cyan-300">Join:</span> Need smallest element divisible by both 2 and 3, which is 6. ✓</li>
              <li><span className="text-cyan-300">Meet:</span> Need largest element that divides both 2 and 3, which is 1. ✓</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-cyan-300 font-semibold">For 4 and 6:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="text-cyan-300">Join:</span> LCM(4, 6) = 12, and 12 is in the set. ✓</li>
              <li><span className="text-cyan-300">Meet:</span> GCD(4, 6) = 2, and 2 is in the set. ✓</li>
            </ul>
          </div>
          <p className="text-green-400 font-semibold">Checking all pairs confirms this is a lattice.</p>
          <p className="text-gray-300">Least element: 1, Greatest element: 12</p>
        </div>
      ),
      hasseDiagram: {
        elements: [
          { id: '1', label: '1' },
          { id: '2', label: '2' },
          { id: '3', label: '3' },
          { id: '4', label: '4' },
          { id: '6', label: '6' },
          { id: '12', label: '12' },
        ],
        relations: [
          { from: '1', to: '2' },
          { from: '1', to: '3' },
          { from: '2', to: '4' },
          { from: '2', to: '6' },
          { from: '3', to: '6' },
          { from: '4', to: '12' },
          { from: '6', to: '12' },
        ],
        highlightLeast: true,
        highlightGreatest: true,
      },
    },
    {
      question: (
        <span>
          Find the minimal and maximal elements in the poset <MathRenderer math="(\{2, 3, 4, 6, 8, 12, 24\}, |)" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Minimal elements:</p>
            <p className="text-gray-300">Elements with no divisors in the set (except themselves)</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>2: Only 2 divides 2, so minimal ✓</li>
              <li>3: Only 3 divides 3, so minimal ✓</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-cyan-300 font-semibold">Maximal elements:</p>
            <p className="text-gray-300">Elements that divide no other elements in the set</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>24: 24 divides no other element in the set, so maximal ✓</li>
            </ul>
          </div>
          <p className="text-gray-300">Note: In a poset, there can be multiple minimal and maximal elements.</p>
        </div>
      ),
      hasseDiagram: {
        elements: [
          { id: '2', label: '2' },
          { id: '3', label: '3' },
          { id: '4', label: '4' },
          { id: '6', label: '6' },
          { id: '8', label: '8' },
          { id: '12', label: '12' },
          { id: '24', label: '24' },
        ],
        relations: [
          { from: '2', to: '4' },
          { from: '2', to: '6' },
          { from: '2', to: '8' },
          { from: '3', to: '6' },
          { from: '4', to: '8' },
          { from: '4', to: '12' },
          { from: '6', to: '12' },
          { from: '8', to: '24' },
          { from: '12', to: '24' },
        ],
        highlightLeast: true,
        highlightGreatest: true,
      },
    },
    {
      question: (
        <span>
          Draw the Hasse diagram for the power set of <MathRenderer math="\{x, y\}" /> ordered by <MathRenderer math="\subseteq" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Power set: <MathRenderer math="P(\{x, y\}) = \{\emptyset, \{x\}, \{y\}, \{x, y\}\}" /></p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Hasse diagram structure:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Bottom: <MathRenderer math="\emptyset" /> (least element)</li>
              <li>Level 1: <MathRenderer math="\{x\}, \{y\}" /> (both cover <MathRenderer math="\emptyset" />)</li>
              <li>Top: <MathRenderer math="\{x, y\}" /> (covers both <MathRenderer math="\{x\}" /> and <MathRenderer math="\{y\}" />)</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Edges:</p>
            <ul className="list-none text-gray-300 space-y-1">
              <li><MathRenderer math="\emptyset \to \{x\}" /></li>
              <li><MathRenderer math="\emptyset \to \{y\}" /></li>
              <li><MathRenderer math="\{x\} \to \{x, y\}" /></li>
              <li><MathRenderer math="\{y\} \to \{x, y\}" /></li>
            </ul>
          </div>
        </div>
      ),
      hasseDiagram: {
        elements: [
          { id: 'empty', label: '∅' },
          { id: 'x', label: '{x}' },
          { id: 'y', label: '{y}' },
          { id: 'xy', label: '{x,y}' },
        ],
        relations: [
          { from: 'empty', to: 'x' },
          { from: 'empty', to: 'y' },
          { from: 'x', to: 'xy' },
          { from: 'y', to: 'xy' },
        ],
        highlightLeast: true,
        highlightGreatest: true,
      },
    },
  ],
  exampleProblems: [
    {
      problem: (
        <span>
          Draw the Hasse diagram for <MathRenderer math="(\{1, 2, 3, 4, 6, 12\}, |)" /> and identify the least and greatest elements.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-green-400 font-semibold">Least element: 1, Greatest element: 12</p>
        </div>
      ),
      steps: [
        {
          step: 'Identify minimal element',
          explanation: '1 divides all other elements, so it is the least element.',
        },
        {
          step: 'Identify prime divisors',
          explanation: '2 and 3 are prime, so they cover 1.',
        },
        {
          step: 'Build upward',
          explanation: '4 covers 2, 6 covers both 2 and 3, and 12 covers both 4 and 6.',
        },
        {
          step: 'Identify greatest element',
          explanation: '12 is divisible by all other elements, so it is the greatest element.',
        },
      ],
      hasseDiagram: {
        elements: [
          { id: '1', label: '1' },
          { id: '2', label: '2' },
          { id: '3', label: '3' },
          { id: '4', label: '4' },
          { id: '6', label: '6' },
          { id: '12', label: '12' },
        ],
        relations: [
          { from: '1', to: '2' },
          { from: '1', to: '3' },
          { from: '2', to: '4' },
          { from: '2', to: '6' },
          { from: '3', to: '6' },
          { from: '4', to: '12' },
          { from: '6', to: '12' },
        ],
        highlightLeast: true,
        highlightGreatest: true,
      },
    },
    {
      problem: (
        <span>
          For the lattice of divisors of 12, find <MathRenderer math="4 \vee 6" /> and <MathRenderer math="4 \wedge 6" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="4 \vee 6 = 12, \quad 4 \wedge 6 = 2" />
        </div>
      ),
      steps: [
        {
          step: 'Find join (least upper bound)',
          explanation: (
            <MathRenderer math="4 \vee 6 = \text{LCM}(4, 6) = 12. \text{ The smallest number divisible by both 4 and 6 is 12.}" />
          ),
        },
        {
          step: 'Find meet (greatest lower bound)',
          explanation: (
            <MathRenderer math="4 \wedge 6 = \text{GCD}(4, 6) = 2. \text{ The largest number that divides both 4 and 6 is 2.}" />
          ),
        },
      ],
      formula: '4 \\vee 6 = \\text{LCM}(4, 6) = 12, \\quad 4 \\wedge 6 = \\text{GCD}(4, 6) = 2',
    },
  ],
}

export default function LatticesPage() {
  return <DMTopicPage content={content} />
}
