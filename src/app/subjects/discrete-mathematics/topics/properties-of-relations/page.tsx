'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'Properties of Relations',
  explanationSections: [
    {
      title: '🔄 Equivalence Relations',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">An equivalence relation</span> is a relation that is reflexive, symmetric, and transitive.

<span class="text-amber-300 font-semibold">Properties:</span>

• <span class="text-cyan-300">Reflexive:</span> (a, a) ∈ R for all a ∈ A
• <span class="text-cyan-300">Symmetric:</span> If (a, b) ∈ R, then (b, a) ∈ R
• <span class="text-cyan-300">Transitive:</span> If (a, b) ∈ R and (b, c) ∈ R, then (a, c) ∈ R

<span class="text-lime-300 font-semibold">Equivalence Classes:</span>
If ~ is an equivalence relation on A, the equivalence class of a ∈ A is:
[a] = {x ∈ A | x ~ a}

<span class="text-pink-300 font-semibold">Partition:</span>
Equivalence classes partition the set A into disjoint subsets.`,
      formula: '[a] = \\{x \\in A \\mid x \\sim a\\}',
    },
    {
      title: '📐 Partial Order Relations',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">A partial order</span> is a relation that is reflexive, antisymmetric, and transitive.

<span class="text-amber-300 font-semibold">Properties:</span>

• <span class="text-cyan-300">Reflexive:</span> (a, a) ∈ R for all a
• <span class="text-cyan-300">Antisymmetric:</span> If (a, b) ∈ R and (b, a) ∈ R, then a = b
• <span class="text-cyan-300">Transitive:</span> If (a, b) ∈ R and (b, c) ∈ R, then (a, c) ∈ R

<span class="text-lime-300 font-semibold">Notation:</span>
Often denoted by ≤ or ⊆

<span class="text-pink-300 font-semibold">Examples:</span>
• Divisibility relation on positive integers
• Subset relation on power set
• Less than or equal on real numbers`,
      formula: 'a \\leq b \\text{ if } a \\mid b',
    },
    {
      title: '🔗 Posets (Partially Ordered Sets)',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">A poset</span> is a set together with a partial order relation.

<span class="text-amber-300 font-semibold">Properties:</span>

• <span class="text-cyan-300">Comparable:</span> Elements a and b are comparable if a ≤ b or b ≤ a
• <span class="text-cyan-300">Incomparable:</span> Elements that are not comparable

<span class="text-lime-300 font-semibold">Examples:</span>

• <span class="text-cyan-300">(ℤ, ≤):</span> All integers are comparable
• <span class="text-cyan-300">(P(A), ⊆):</span> Not all subsets are comparable
  - {1,2} and {2,3} are incomparable (neither is subset of the other)`,
    },
    {
      title: '⛓️ Chains and Antichains',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Chain:</span>
A subset of a poset where every pair of elements is comparable.

<span class="text-amber-300 font-semibold">Example:</span>
In (ℤ, ≤), the set {1, 2, 3, 4, 5} is a chain.

<span class="text-blue-400 font-semibold">Antichain:</span>
A subset of a poset where no two distinct elements are comparable.

<span class="text-amber-300 font-semibold">Example:</span>
In (P({1,2,3}), ⊆), the set {{1}, {2}, {3}} is an antichain.

<span class="text-lime-300 font-semibold">Properties:</span>
• Maximum chain length = height of poset
• Maximum antichain size = width of poset`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Determine if the relation R = {(1,1), (2,2), (3,3), (1,2), (2,1)} on A = {1, 2, 3} is an equivalence relation.',
      solution: 'Check each property:\n\n<span class="text-cyan-300">Reflexive:</span> (1,1), (2,2), (3,3) ∈ R ✓\nAll elements are related to themselves.\n\n<span class="text-cyan-300">Symmetric:</span> (1,2) ∈ R and (2,1) ∈ R ✓\nThe relation is symmetric.\n\n<span class="text-cyan-300">Transitive:</span> (1,2) ∈ R and (2,1) ∈ R, but we need (1,1) ∈ R ✓\n(1,1) is in R, so transitive property holds.\n\nSince R is reflexive, symmetric, and transitive, it is an equivalence relation.',
    },
    {
      question: 'Prove that the relation "divides" (|) on positive integers is a partial order.',
      solution: 'We need to show reflexivity, antisymmetry, and transitivity.\n\n<span class="text-cyan-300">Reflexive:</span> For any positive integer a, a | a because a = a × 1. ✓\n\n<span class="text-cyan-300">Antisymmetric:</span> If a | b and b | a, then there exist integers k, m such that:\nb = ak and a = bm\nSubstituting: a = (ak)m = a(km)\nSince a ≠ 0, we have km = 1, so k = m = 1 (for positive integers)\nTherefore, a = b. ✓\n\n<span class="text-cyan-300">Transitive:</span> If a | b and b | c, then:\nb = ak and c = bm for some integers k, m\nc = (ak)m = a(km)\nTherefore, a | c. ✓\n\nSince all three properties hold, "divides" is a partial order.',
    },
    {
      question: 'Find the equivalence classes of the relation R on ℤ defined by a R b if a - b is divisible by 3.',
      solution: 'This is the "congruence modulo 3" relation.\n\nEquivalence classes:\n[0] = {..., -6, -3, 0, 3, 6, ...} (numbers ≡ 0 mod 3)\n[1] = {..., -5, -2, 1, 4, 7, ...} (numbers ≡ 1 mod 3)\n[2] = {..., -4, -1, 2, 5, 8, ...} (numbers ≡ 2 mod 3)\n\nThese three classes partition ℤ into disjoint subsets.',
      formula: '[a] = \\{b \\in \\mathbb{Z} \\mid a \\equiv b \\pmod{3}\\}',
    },
  ],
  exampleProblems: [
    {
      problem: 'Prove that the relation R on ℝ defined by x R y if |x| = |y| is an equivalence relation.',
      solution: 'R is an equivalence relation',
      steps: [
        {
          step: 'Prove reflexive',
          explanation: 'For any x ∈ ℝ, |x| = |x|, so (x, x) ∈ R. ✓',
        },
        {
          step: 'Prove symmetric',
          explanation: 'If (x, y) ∈ R, then |x| = |y|, so |y| = |x|, therefore (y, x) ∈ R. ✓',
        },
        {
          step: 'Prove transitive',
          explanation: 'If (x, y) ∈ R and (y, z) ∈ R, then |x| = |y| and |y| = |z|, so |x| = |z|, therefore (x, z) ∈ R. ✓',
        },
        {
          step: 'Conclusion',
          explanation: 'Since R is reflexive, symmetric, and transitive, R is an equivalence relation.',
        },
      ],
    },
  ],
}

export default function PropertiesOfRelationsPage() {
  return <DMTopicPage content={content} />
}

