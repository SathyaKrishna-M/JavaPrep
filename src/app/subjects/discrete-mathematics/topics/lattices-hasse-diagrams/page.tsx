'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'Lattices & Hasse Diagrams',
  explanationSections: [
    {
      title: '📊 Partial Orders',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">A partial order</span> is a relation that is reflexive, antisymmetric, and transitive.

<span class="text-amber-300 font-semibold">Notation:</span>
Often denoted by ≤, ⊆, or |

<span class="text-lime-300 font-semibold">Properties:</span>

• <span class="text-cyan-300">Reflexive:</span> a ≤ a for all a
• <span class="text-cyan-300">Antisymmetric:</span> If a ≤ b and b ≤ a, then a = b
• <span class="text-cyan-300">Transitive:</span> If a ≤ b and b ≤ c, then a ≤ c

<span class="text-pink-300 font-semibold">Examples:</span>
• Divisibility on positive integers: a ≤ b if a | b
• Subset relation: A ≤ B if A ⊆ B
• Less than or equal on real numbers`,
      formula: 'a \\leq b \\text{ if } a \\mid b',
    },
    {
      title: '🔗 Lattices',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">A lattice</span> is a partially ordered set (poset) where every pair of elements has both a least upper bound (join) and a greatest lower bound (meet).

<span class="text-amber-300 font-semibold">Key Concepts:</span>

• <span class="text-cyan-300">Join (a ∨ b):</span> Least upper bound of a and b
• <span class="text-cyan-300">Meet (a ∧ b):</span> Greatest lower bound of a and b
• <span class="text-cyan-300">Least Element:</span> Element ≤ all other elements (if exists)
• <span class="text-cyan-300">Greatest Element:</span> Element ≥ all other elements (if exists)

<span class="text-lime-300 font-semibold">Types:</span>
• <span class="text-cyan-300">Bounded Lattice:</span> Has both least and greatest elements
• <span class="text-cyan-300">Distributive Lattice:</span> Meet and join distribute over each other
• <span class="text-cyan-300">Complemented Lattice:</span> Every element has a complement`,
      formula: 'a \\vee b = \\text{lub}(a, b), \\quad a \\wedge b = \\text{glb}(a, b)',
    },
    {
      title: '📈 Hasse Diagrams',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">A Hasse diagram</span> is a graphical representation of a finite partially ordered set.

<span class="text-amber-300 font-semibold">Rules:</span>

• <span class="text-cyan-300">Elements:</span> Represented as nodes (circles/points)
• <span class="text-cyan-300">Relations:</span> Draw edge from a to b if a < b and there is no c such that a < c < b
• <span class="text-cyan-300">Direction:</span> Smaller elements are drawn below larger elements
• <span class="text-cyan-300">Transitivity:</span> Don't draw edges that can be inferred from transitivity

<span class="text-lime-300 font-semibold">Properties:</span>
• Minimal elements appear at the bottom
• Maximal elements appear at the top
• Chains (totally ordered subsets) appear as vertical paths`,
    },
    {
      title: '🎯 Drawing Hasse Diagrams',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Steps to draw:</span>

1. <span class="text-cyan-300">List all elements</span>
2. <span class="text-cyan-300">Identify minimal elements</span> (no elements below them)
3. <span class="text-cyan-300">Place minimal elements at bottom</span>
4. <span class="text-cyan-300">For each level, place elements that cover elements below</span>
5. <span class="text-cyan-300">Draw edges only for covering relations</span>

<span class="text-amber-300 font-semibold">Example:</span>
For the poset ({1, 2, 3, 4, 6, 12}, |) where | is divisibility:
• Minimal: 1 (at bottom)
• Level 1: 2, 3 (cover 1)
• Level 2: 4, 6 (cover 2 and 3 respectively)
• Maximal: 12 (at top, covers 4 and 6)`,
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
      content: `<span class="text-cyan-400 font-semibold">Common Lattices:</span>

<span class="text-amber-300 font-semibold">1. Power Set Lattice:</span>
• Elements: All subsets of a set
• Order: Subset relation (⊆)
• Join: Union (∪)
• Meet: Intersection (∩)
• Least: Empty set (∅)
• Greatest: Universal set

<span class="text-amber-300 font-semibold">2. Divisibility Lattice:</span>
• Elements: Positive divisors of n
• Order: Divisibility (|)
• Join: LCM (least common multiple)
• Meet: GCD (greatest common divisor)

<span class="text-amber-300 font-semibold">3. Boolean Lattice:</span>
• Elements: All n-tuples of 0s and 1s
• Order: Component-wise ≤
• Join: Component-wise max
• Meet: Component-wise min`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Draw the Hasse diagram for the poset ({1, 2, 3, 4, 5, 6}, |) where | is divisibility.',
      solution: 'Minimal element: 1\n\nLevel 1: 2, 3, 5 (prime numbers, cover 1)\nLevel 2: 4 (covers 2), 6 (covers 2 and 3)\n\nEdges:\n1 → 2, 1 → 3, 1 → 5\n2 → 4, 2 → 6\n3 → 6\n\nNote: 4 and 6 are maximal elements (nothing above them).',
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
      question: 'For the power set of {a, b}, find the join and meet of {a} and {b}.',
      solution: 'Power set: P({a, b}) = {∅, {a}, {b}, {a, b}}\n\nJoin (least upper bound):\n{a} ∨ {b} = {a} ∪ {b} = {a, b}\n\nThe smallest set containing both {a} and {b} is {a, b}.\n\nMeet (greatest lower bound):\n{a} ∧ {b} = {a} ∩ {b} = ∅\n\nThe largest set contained in both {a} and {b} is ∅.',
      formula: '\\{a\\} \\vee \\{b\\} = \\{a, b\\}, \\quad \\{a\\} \\wedge \\{b\\} = \\emptyset',
    },
    {
      question: 'Determine if ({1, 2, 3, 4, 6, 12}, |) forms a lattice.',
      solution: 'Check if every pair has both join and meet.\n\nFor 2 and 3:\n• Join: Need smallest element divisible by both 2 and 3, which is 6. ✓\n• Meet: Need largest element that divides both 2 and 3, which is 1. ✓\n\nFor 4 and 6:\n• Join: LCM(4, 6) = 12, and 12 is in the set. ✓\n• Meet: GCD(4, 6) = 2, and 2 is in the set. ✓\n\nChecking all pairs confirms this is a lattice.\n\nLeast element: 1\nGreatest element: 12',
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
      question: 'Find the minimal and maximal elements in the poset ({2, 3, 4, 6, 8, 12, 24}, |).',
      solution: 'Minimal elements: Elements with no divisors in the set (except themselves)\n• 2: Only 2 divides 2, so minimal ✓\n• 3: Only 3 divides 3, so minimal ✓\n\nMaximal elements: Elements that divide no other elements in the set\n• 24: 24 divides no other element in the set, so maximal ✓\n\nNote: In a poset, there can be multiple minimal and maximal elements.',
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
      question: 'Draw the Hasse diagram for the power set of {x, y} ordered by ⊆.',
      solution: 'Power set: P({x, y}) = {∅, {x}, {y}, {x, y}}\n\nHasse diagram:\n• Bottom: ∅ (least element)\n• Level 1: {x}, {y} (both cover ∅)\n• Top: {x, y} (covers both {x} and {y})\n\nEdges:\n∅ → {x}\n∅ → {y}\n{x} → {x, y}\n{y} → {x, y}',
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
      problem: 'Draw the Hasse diagram for ({1, 2, 3, 4, 6, 12}, |) and identify the least and greatest elements.',
      solution: 'Least element: 1, Greatest element: 12',
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
      problem: 'For the lattice of divisors of 12, find 4 ∨ 6 and 4 ∧ 6.',
      solution: '4 ∨ 6 = 12, 4 ∧ 6 = 2',
      steps: [
        {
          step: 'Find join (least upper bound)',
          explanation: '4 ∨ 6 = LCM(4, 6) = 12. The smallest number divisible by both 4 and 6 is 12.',
        },
        {
          step: 'Find meet (greatest lower bound)',
          explanation: '4 ∧ 6 = GCD(4, 6) = 2. The largest number that divides both 4 and 6 is 2.',
        },
      ],
      formula: '4 \\vee 6 = \\text{LCM}(4, 6) = 12, \\quad 4 \\wedge 6 = \\text{GCD}(4, 6) = 2',
    },
  ],
}

export default function LatticesPage() {
  return <DMTopicPage content={content} />
}

