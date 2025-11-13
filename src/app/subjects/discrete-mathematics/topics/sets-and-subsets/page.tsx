'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'Sets, Subsets, Power Set, Venn Diagrams, Set Operations, Cartesian Product',
  explanationSections: [
    {
      title: '📊 Sets and Set Notation',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">A set</span> is a collection of distinct objects, called elements or members. Sets are fundamental building blocks in discrete mathematics.

<span class="text-amber-300 font-semibold">Set Notation:</span>

• <span class="text-cyan-300">Roster Method:</span> A = {1, 2, 3, 4, 5}
• <span class="text-cyan-300">Set Builder Notation:</span> A = {x | x is a positive integer and x ≤ 5}
• <span class="text-cyan-300">Empty Set:</span> ∅ or {} (contains no elements)
• <span class="text-cyan-300">Universal Set:</span> U (contains all elements under consideration)

<span class="text-lime-300 font-semibold">Key Concepts:</span>

• <span class="text-cyan-300">Cardinality:</span> |A| denotes the number of elements in set A
• <span class="text-cyan-300">Membership:</span> x ∈ A means x is an element of A; x ∉ A means x is not an element of A
• <span class="text-cyan-300">Equality:</span> Two sets are equal if they contain exactly the same elements`,
      formula: 'A = \\{x \\mid P(x)\\}',
    },
    {
      title: '🔗 Subsets',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">A subset</span> B (denoted A ⊆ B) if every element of A is also an element of B.

<span class="text-amber-300 font-semibold">Types of Subsets:</span>

• <span class="text-cyan-300">Proper Subset:</span> A ⊂ B means A ⊆ B and A ≠ B
• <span class="text-cyan-300">Power Set:</span> P(A) is the set of all subsets of A
• <span class="text-cyan-300">Number of Subsets:</span> If |A| = n, then |P(A)| = 2ⁿ

<span class="text-lime-300 font-semibold">Example:</span>
If A = {1, 2}, then P(A) = {∅, {1}, {2}, {1, 2}}
The power set has 2² = 4 elements.`,
      formula: '|P(A)| = 2^{|A|}',
    },
    {
      title: '🎨 Venn Diagrams',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">Venn diagrams</span> are visual representations of sets using circles or other shapes to show relationships between sets.

<span class="text-amber-300 font-semibold">Uses:</span>

• Visualize set relationships
• Understand set operations
• Solve problems involving multiple sets
• Illustrate intersections and unions

<span class="text-lime-300 font-semibold">Common Regions:</span>

• <span class="text-cyan-300">Intersection:</span> Elements in both sets (A ∩ B)
• <span class="text-cyan-300">Union:</span> Elements in either set (A ∪ B)
• <span class="text-cyan-300">Difference:</span> Elements in A but not in B (A - B)
• <span class="text-cyan-300">Complement:</span> Elements not in A (A')`,
      vennDiagram: {
        sets: [
          { label: 'A', color: '#3b82f6' },
          { label: 'B', color: '#10b981' },
        ],
        regions: [
          { label: 'A ∩ B', sets: ['A', 'B'] },
        ],
      },
    },
    {
      title: '⚙️ Set Operations',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Set operations</span> allow us to combine and manipulate sets.

<span class="text-amber-300 font-semibold">Basic Operations:</span>

• <span class="text-cyan-300">Union (A ∪ B):</span> All elements in A or B or both
• <span class="text-cyan-300">Intersection (A ∩ B):</span> Elements common to both A and B
• <span class="text-cyan-300">Difference (A - B):</span> Elements in A but not in B
• <span class="text-cyan-300">Complement (A'):</span> Elements in U but not in A
• <span class="text-cyan-300">Symmetric Difference (A ⊕ B):</span> Elements in A or B but not in both

<span class="text-lime-300 font-semibold">Properties:</span>

• <span class="text-cyan-300">Commutative:</span> A ∪ B = B ∪ A, A ∩ B = B ∩ A
• <span class="text-cyan-300">Associative:</span> (A ∪ B) ∪ C = A ∪ (B ∪ C)
• <span class="text-cyan-300">Distributive:</span> A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)`,
      formula: 'A \\cup B = \\{x \\mid x \\in A \\text{ or } x \\in B\\}',
    },
    {
      title: '📦 Cartesian Product',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">Cartesian Product</span> A × B is the set of all ordered pairs (a, b) where a ∈ A and b ∈ B.

<span class="text-amber-300 font-semibold">Properties:</span>

• <span class="text-cyan-300">Cardinality:</span> |A × B| = |A| × |B|
• <span class="text-cyan-300">Order Matters:</span> (a, b) ≠ (b, a) if a ≠ b
• <span class="text-cyan-300">n-ary Product:</span> A₁ × A₂ × ... × Aₙ for n sets

<span class="text-lime-300 font-semibold">Example:</span>
If A = {1, 2} and B = {a, b}, then:
A × B = {(1, a), (1, b), (2, a), (2, b)}
|A × B| = 2 × 2 = 4`,
      formula: 'A \\times B = \\{(a, b) \\mid a \\in A \\text{ and } b \\in B\\}',
    },
  ],
  practiceQuestions: [
    {
      question: 'Find the power set of A = {a, b, c}.',
      solution: 'The power set P(A) contains all subsets of A.\n\nSubsets:\n1. ∅ (empty set)\n2. {a}\n3. {b}\n4. {c}\n5. {a, b}\n6. {a, c}\n7. {b, c}\n8. {a, b, c}\n\nTherefore, P(A) = {∅, {a}, {b}, {c}, {a, b}, {a, c}, {b, c}, {a, b, c}}\n\nNote: |P(A)| = 2³ = 8, which matches our count.',
    },
    {
      question: 'If A = {1, 2, 3} and B = {2, 3, 4}, find A ∪ B, A ∩ B, and A - B.',
      solution: 'A ∪ B (Union): All elements in A or B or both\nA ∪ B = {1, 2, 3, 4}\n\nA ∩ B (Intersection): Elements common to both sets\nA ∩ B = {2, 3}\n\nA - B (Difference): Elements in A but not in B\nA - B = {1}',
      vennDiagram: {
        sets: [
          { label: 'A', color: '#3b82f6' },
          { label: 'B', color: '#10b981' },
        ],
        regions: [
          { label: '1', sets: ['A'] },
          { label: '2, 3', sets: ['A', 'B'] },
          { label: '4', sets: ['B'] },
        ],
      },
    },
    {
      question: 'If |A| = 5 and |B| = 3, what is |A × B|?',
      solution: 'The cardinality of the Cartesian product is the product of the cardinalities of the individual sets.\n\n|A × B| = |A| × |B|\n|A × B| = 5 × 3 = 15\n\nTherefore, A × B contains 15 ordered pairs.',
      formula: '|A \\times B| = |A| \\times |B| = 5 \\times 3 = 15',
    },
    {
      question: 'Prove that A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C) using set builder notation.',
      solution: 'We need to show that both sets contain the same elements.\n\nLeft side: A ∪ (B ∩ C)\n= {x | x ∈ A or x ∈ (B ∩ C)}\n= {x | x ∈ A or (x ∈ B and x ∈ C)}\n\nRight side: (A ∪ B) ∩ (A ∪ C)\n= {x | x ∈ (A ∪ B) and x ∈ (A ∪ C)}\n= {x | (x ∈ A or x ∈ B) and (x ∈ A or x ∈ C)}\n\nUsing distributive law of logic:\n= {x | x ∈ A or (x ∈ B and x ∈ C)}\n\nBoth sides are equal, proving the distributive property.',
      formula: 'A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)',
    },
    {
      question: 'How many subsets does a set with n elements have?',
      solution: 'A set with n elements has 2ⁿ subsets.\n\nThis can be proven by considering that for each element, we have two choices: include it in a subset or exclude it.\n\nFor n elements:\n• Element 1: 2 choices (include/exclude)\n• Element 2: 2 choices\n• ...\n• Element n: 2 choices\n\nTotal subsets = 2 × 2 × ... × 2 (n times) = 2ⁿ\n\nThis includes the empty set (all elements excluded) and the set itself (all elements included).',
      formula: '|P(A)| = 2^{|A|} = 2^n',
    },
    {
      question: 'If A = {x, y, z} and B = {1, 2}, find A × B and B × A.',
      solution: 'A × B = {(a, b) | a ∈ A and b ∈ B}\nA × B = {(x, 1), (x, 2), (y, 1), (y, 2), (z, 1), (z, 2)}\n\nB × A = {(b, a) | b ∈ B and a ∈ A}\nB × A = {(1, x), (1, y), (1, z), (2, x), (2, y), (2, z)}\n\nNote: A × B ≠ B × A (Cartesian product is not commutative)\n|A × B| = |B × A| = 3 × 2 = 6',
    },
    {
      question: 'Draw a Venn diagram for three sets A, B, and C showing all possible regions.',
      solution: 'A three-set Venn diagram has 8 regions:\n\n1. A only (not in B or C)\n2. B only (not in A or C)\n3. C only (not in A or B)\n4. A ∩ B only (not in C)\n5. A ∩ C only (not in B)\n6. B ∩ C only (not in A)\n7. A ∩ B ∩ C (in all three)\n8. None (outside all three sets)\n\nEach region represents a unique combination of membership in the three sets.',
      vennDiagram: {
        sets: [
          { label: 'A', color: '#3b82f6' },
          { label: 'B', color: '#10b981' },
          { label: 'C', color: '#f59e0b' },
        ],
      },
    },
    {
      question: 'If A ⊆ B and B ⊆ C, prove that A ⊆ C.',
      solution: 'We need to show that every element of A is also an element of C.\n\nGiven:\n• A ⊆ B means: if x ∈ A, then x ∈ B\n• B ⊆ C means: if x ∈ B, then x ∈ C\n\nProof:\nLet x be an arbitrary element of A.\nSince A ⊆ B, we have x ∈ B.\nSince B ⊆ C and x ∈ B, we have x ∈ C.\n\nTherefore, for any x ∈ A, we have x ∈ C.\nThis proves that A ⊆ C.\n\nThis demonstrates the transitive property of subset relation.',
    },
  ],
  exampleProblems: [
    {
      problem: 'Find the power set of {1, 2, 3} and verify its cardinality.',
      solution: 'P({1, 2, 3}) = {∅, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}',
      steps: [
        {
          step: 'List all subsets',
          explanation: 'Start with the empty set, then single elements, then pairs, then the full set.',
        },
        {
          step: 'Count elements',
          explanation: 'We have 8 subsets: 1 empty set, 3 single-element sets, 3 two-element sets, and 1 three-element set.',
        },
        {
          step: 'Verify using formula',
          explanation: '|P(A)| = 2³ = 8, which matches our count.',
        },
      ],
      formula: '|P(A)| = 2^{|A|} = 2^3 = 8',
    },
    {
      problem: 'Given A = {1, 2, 3, 4, 5}, B = {3, 4, 5, 6, 7}, and C = {5, 6, 7, 8, 9}, find (A ∪ B) ∩ C.',
      solution: '(A ∪ B) ∩ C = {5, 6, 7}',
      steps: [
        {
          step: 'Find A ∪ B',
          explanation: 'A ∪ B = {1, 2, 3, 4, 5, 6, 7} (all elements in A or B)',
        },
        {
          step: 'Find intersection with C',
          explanation: '(A ∪ B) ∩ C = {5, 6, 7} (elements in both (A ∪ B) and C)',
        },
      ],
      vennDiagram: {
        sets: [
          { label: 'A', color: '#3b82f6' },
          { label: 'B', color: '#10b981' },
          { label: 'C', color: '#f59e0b' },
        ],
      },
    },
    {
      problem: 'If A has 4 elements and B has 5 elements, and |A ∩ B| = 2, find |A ∪ B|.',
      solution: '|A ∪ B| = 7',
      steps: [
        {
          step: 'Apply inclusion-exclusion principle',
          explanation: '|A ∪ B| = |A| + |B| - |A ∩ B|',
        },
        {
          step: 'Substitute values',
          explanation: '|A ∪ B| = 4 + 5 - 2 = 7',
        },
      ],
      formula: '|A \\cup B| = |A| + |B| - |A \\cap B| = 4 + 5 - 2 = 7',
    },
    {
      problem: 'Find the Cartesian product of A = {a, b} and B = {1, 2, 3}.',
      solution: 'A × B = {(a, 1), (a, 2), (a, 3), (b, 1), (b, 2), (b, 3)}',
      steps: [
        {
          step: 'List all ordered pairs',
          explanation: 'For each element in A, pair it with each element in B.',
        },
        {
          step: 'Verify cardinality',
          explanation: '|A × B| = |A| × |B| = 2 × 3 = 6, which matches our 6 ordered pairs.',
        },
      ],
    },
  ],
}

export default function SetsAndSubsetsPage() {
  return <DMTopicPage content={content} />
}

