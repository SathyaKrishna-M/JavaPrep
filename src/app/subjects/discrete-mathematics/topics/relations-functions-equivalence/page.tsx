'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'Relations, Functions & Equivalence',
  explanationSections: [
    {
      title: '🔗 Relations',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">A relation</span> R from set A to set B is a subset of A × B.

<span class="text-amber-300 font-semibold">Notation:</span>
• (a, b) ∈ R means a is related to b
• We write a R b
• R ⊆ A × B

<span class="text-lime-300 font-semibold">Types of Relations:</span>

• <span class="text-cyan-300">Reflexive:</span> (a, a) ∈ R for all a ∈ A
• <span class="text-cyan-300">Symmetric:</span> If (a, b) ∈ R, then (b, a) ∈ R
• <span class="text-cyan-300">Transitive:</span> If (a, b) ∈ R and (b, c) ∈ R, then (a, c) ∈ R
• <span class="text-cyan-300">Antisymmetric:</span> If (a, b) ∈ R and (b, a) ∈ R, then a = b`,
      formula: 'R \\subseteq A \\times B',
    },
    {
      title: '⚙️ Functions',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">A function</span> f: A → B is a relation where each element of A maps to exactly one element of B.

<span class="text-amber-300 font-semibold">Properties:</span>

• <span class="text-cyan-300">Domain:</span> Set A (all possible inputs)
• <span class="text-cyan-300">Codomain:</span> Set B (all possible outputs)
• <span class="text-cyan-300">Range:</span> {f(a) | a ∈ A} ⊆ B (actual outputs)
• <span class="text-cyan-300">One-to-One (Injective):</span> f(a₁) = f(a₂) implies a₁ = a₂
• <span class="text-cyan-300">Onto (Surjective):</span> For every b ∈ B, there exists a ∈ A such that f(a) = b
• <span class="text-cyan-300">Bijective:</span> Both one-to-one and onto`,
      formula: 'f: A \\rightarrow B, \\quad \\forall a \\in A, \\exists! b \\in B: f(a) = b',
    },
    {
      title: '🔄 Equivalence Relations',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">An equivalence relation</span> is a relation that is reflexive, symmetric, and transitive.

<span class="text-amber-300 font-semibold">Properties:</span>

• <span class="text-cyan-300">Reflexive:</span> a ~ a for all a
• <span class="text-cyan-300">Symmetric:</span> If a ~ b, then b ~ a
• <span class="text-cyan-300">Transitive:</span> If a ~ b and b ~ c, then a ~ c

<span class="text-lime-300 font-semibold">Equivalence Classes:</span>

If ~ is an equivalence relation on A, the equivalence class of a ∈ A is:
[a] = {x ∈ A | x ~ a}

<span class="text-pink-300 font-semibold">Partition:</span>
Equivalence classes partition the set A into disjoint subsets.`,
      formula: '[a] = \\{x \\in A \\mid x \\sim a\\}',
    },
    {
      title: '📊 Partial Orders',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">A partial order</span> is a relation that is reflexive, antisymmetric, and transitive.

<span class="text-amber-300 font-semibold">Notation:</span>
Often denoted by ≤ or ⊆

<span class="text-lime-300 font-semibold">Properties:</span>

• <span class="text-cyan-300">Reflexive:</span> a ≤ a
• <span class="text-cyan-300">Antisymmetric:</span> If a ≤ b and b ≤ a, then a = b
• <span class="text-cyan-300">Transitive:</span> If a ≤ b and b ≤ c, then a ≤ c

<span class="text-pink-300 font-semibold">Examples:</span>
• Divisibility relation on positive integers
• Subset relation on power set
• Less than or equal on real numbers`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Determine if the relation R = {(1,1), (2,2), (3,3), (1,2), (2,1)} on A = {1, 2, 3} is an equivalence relation.',
      solution: 'Check each property:\n\nReflexive: (1,1), (2,2), (3,3) ∈ R ✓\nAll elements are related to themselves.\n\nSymmetric: (1,2) ∈ R and (2,1) ∈ R ✓\nThe relation is symmetric.\n\nTransitive: (1,2) ∈ R and (2,1) ∈ R, but we need (1,1) ∈ R ✓\n(1,1) is in R, so transitive property holds.\n\nSince R is reflexive, symmetric, and transitive, it is an equivalence relation.',
    },
    {
      question: 'Is the function f: ℝ → ℝ defined by f(x) = x² one-to-one? Onto?',
      solution: 'One-to-One (Injective)?\nNo. For example, f(2) = 4 and f(-2) = 4, so different inputs map to the same output.\n\nOnto (Surjective)?\nNo. There is no real number x such that f(x) = -1, since x² ≥ 0 for all x ∈ ℝ.\n\nTherefore, f is neither one-to-one nor onto.',
      functionGraph: {
        type: 'quadratic' as const,
        title: 'Graph of f(x) = x²',
      },
    },
    {
      question: 'Define an equivalence relation on ℤ by a ~ b if a - b is divisible by 3. Find the equivalence classes.',
      solution: 'This is the "congruence modulo 3" relation.\n\nEquivalence classes:\n[0] = {..., -6, -3, 0, 3, 6, ...} (numbers ≡ 0 mod 3)\n[1] = {..., -5, -2, 1, 4, 7, ...} (numbers ≡ 1 mod 3)\n[2] = {..., -4, -1, 2, 5, 8, ...} (numbers ≡ 2 mod 3)\n\nThese three classes partition ℤ into disjoint subsets.',
      formula: '[a] = \\{b \\in \\mathbb{Z} \\mid a \\equiv b \\pmod{3}\\}',
    },
    {
      question: 'Prove that the relation "divides" (|) on positive integers is a partial order.',
      solution: 'We need to show reflexivity, antisymmetry, and transitivity.\n\nReflexive: For any positive integer a, a | a because a = a × 1. ✓\n\nAntisymmetric: If a | b and b | a, then there exist integers k, m such that:\nb = ak and a = bm\nSubstituting: a = (ak)m = a(km)\nSince a ≠ 0, we have km = 1, so k = m = 1 (or k = m = -1, but we\'re dealing with positive integers)\nTherefore, a = b. ✓\n\nTransitive: If a | b and b | c, then:\nb = ak and c = bm for some integers k, m\nc = (ak)m = a(km)\nTherefore, a | c. ✓\n\nSince all three properties hold, "divides" is a partial order.',
    },
    {
      question: 'How many functions are there from a set A with 3 elements to a set B with 4 elements?',
      solution: 'For each element in A, we can choose any of the 4 elements in B as its image.\n\nElement 1: 4 choices\nElement 2: 4 choices\nElement 3: 4 choices\n\nTotal functions = 4 × 4 × 4 = 4³ = 64\n\nIn general, if |A| = m and |B| = n, there are n^m functions from A to B.',
      formula: '|B|^{|A|} = 4^3 = 64',
    },
    {
      question: 'Determine if R = {(a,b) | a and b are students in the same class} is an equivalence relation.',
      solution: 'Check each property:\n\nReflexive: Is every student in the same class as themselves?\nYes, by definition. ✓\n\nSymmetric: If student a is in the same class as student b, is b in the same class as a?\nYes, "same class" is symmetric. ✓\n\nTransitive: If a is in the same class as b, and b is in the same class as c, is a in the same class as c?\nYes, if they share a class with b, they must all be in that same class. ✓\n\nTherefore, R is an equivalence relation.\n\nThe equivalence classes are the different classes, and each class is an equivalence class.',
    },
  ],
  exampleProblems: [
    {
      problem: 'Let A = {1, 2, 3} and B = {a, b}. List all functions from A to B.',
      solution: 'There are 2³ = 8 functions:\n\nf₁: 1→a, 2→a, 3→a\nf₂: 1→a, 2→a, 3→b\nf₃: 1→a, 2→b, 3→a\nf₄: 1→a, 2→b, 3→b\nf₅: 1→b, 2→a, 3→a\nf₆: 1→b, 2→a, 3→b\nf₇: 1→b, 2→b, 3→a\nf₈: 1→b, 2→b, 3→b',
      steps: [
        {
          step: 'Count total functions',
          explanation: 'For each of 3 elements in A, choose 1 of 2 elements in B: 2³ = 8',
        },
        {
          step: 'List all combinations',
          explanation: 'Systematically list all possible mappings.',
        },
      ],
      formula: '|B|^{|A|} = 2^3 = 8',
    },
    {
      problem: 'Find the equivalence classes of the relation R on ℤ defined by a R b if |a| = |b|.',
      solution: 'Equivalence classes:\n[0] = {0}\n[1] = {-1, 1}\n[2] = {-2, 2}\n[3] = {-3, 3}\n...\n[n] = {-n, n} for n > 0',
      steps: [
        {
          step: 'Check it\'s an equivalence relation',
          explanation: 'Reflexive: |a| = |a| ✓\nSymmetric: If |a| = |b|, then |b| = |a| ✓\nTransitive: If |a| = |b| and |b| = |c|, then |a| = |c| ✓',
        },
        {
          step: 'Find equivalence classes',
          explanation: 'Each class contains a number and its negative (except 0).',
        },
      ],
    },
  ],
}

export default function RelationsFunctionsEquivalencePage() {
  return <DMTopicPage content={content} />
}

