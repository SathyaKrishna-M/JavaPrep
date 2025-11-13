'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiCheckCircle } from 'react-icons/fi'

const content = {
  title: 'Proof as Quantified Statement',
  explanationSections: [
    {
      title: '✅ Understanding Proofs',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">A proof</span> is a valid argument that establishes the truth of a mathematical statement.

<span class="text-amber-300 font-semibold">Universal Statements:</span>
To prove ∀x P(x), we must show P(x) is true for every x in the domain.

<span class="text-amber-300 font-semibold">Existential Statements:</span>
To prove ∃x P(x), we need to find at least one specific x where P(x) is true.

<span class="text-lime-300 font-semibold">Key Principle:</span>
A proof is a demonstration that a statement is always true (for universal) or sometimes true (for existential).`,
    },
    {
      title: '➡️ Direct Proof',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Direct Proof</span> proves a statement by assuming the premise and showing the conclusion follows.

<span class="text-amber-300 font-semibold">Structure for ∀x (P(x) → Q(x)):</span>
1. Assume P(x) is true for arbitrary x
2. Show Q(x) must be true
3. Conclude ∀x (P(x) → Q(x))

<span class="text-lime-300 font-semibold">Example:</span>
Prove: ∀n ∈ ℤ (n is even → n² is even)

<span class="text-cyan-300">Proof:</span>
1. Let n be an arbitrary even integer
2. Then n = 2k for some integer k
3. n² = (2k)² = 4k² = 2(2k²)
4. Since 2k² is an integer, n² = 2(2k²) is even
5. Therefore, if n is even, then n² is even`,
      formula: '\\forall n \\in \\mathbb{Z} \\, (\\text{even}(n) \\rightarrow \\text{even}(n^2))',
    },
    {
      title: '📋 Proof by Exhaustion',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">Proof by Exhaustion</span> (Case Analysis) proves a statement by checking all possible cases.

<span class="text-amber-300 font-semibold">When to Use:</span>
• Finite number of cases
• Each case can be checked directly

<span class="text-lime-300 font-semibold">Example:</span>
Prove: For any integer n, n(n+1) is even

<span class="text-cyan-300">Proof:</span>
Case 1: n is even
- Then n = 2k for some k
- n(n+1) = 2k(2k+1) = 2[k(2k+1)]
- This is even ✓

Case 2: n is odd
- Then n = 2k+1 for some k
- n(n+1) = (2k+1)(2k+2) = (2k+1)·2(k+1) = 2[(2k+1)(k+1)]
- This is even ✓

Since all cases are covered, n(n+1) is always even.`,
    },
    {
      title: '🔀 Method of Cases',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Method of Cases</span> divides the proof into mutually exclusive cases that cover all possibilities.

<span class="text-amber-300 font-semibold">Structure:</span>
1. Identify all possible cases
2. Prove statement for each case
3. Conclude statement is true in general

<span class="text-lime-300 font-semibold">Example:</span>
Prove: |x| ≥ 0 for all real x

<span class="text-cyan-300">Proof:</span>
Case 1: x ≥ 0
- Then |x| = x ≥ 0 ✓

Case 2: x < 0
- Then |x| = -x > 0 (since x < 0) ✓

Therefore, |x| ≥ 0 for all real x.`,
      formula: '\\forall x \\in \\mathbb{R} \\, (|x| \\geq 0)',
    },
    {
      title: '🔨 Constructive Proof',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">Constructive Proof</span> for ∃x P(x) finds an explicit example.

<span class="text-amber-300 font-semibold">Method:</span>
Find a specific value of x that makes P(x) true.

<span class="text-lime-300 font-semibold">Example:</span>
Prove: ∃x ∈ ℤ (x² = 4)

<span class="text-cyan-300">Proof:</span>
Let x = 2. Then x² = 2² = 4.
Therefore, there exists an integer x such that x² = 4.`,
      formula: '\\exists x \\in \\mathbb{Z} \\, (x^2 = 4)',
    },
    {
      title: '❓ Non-Constructive Proof',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Non-Constructive Proof</span> proves existence without finding the specific example.

<span class="text-amber-300 font-semibold">Method:</span>
Show that the object must exist (often by contradiction or other indirect means).

<span class="text-lime-300 font-semibold">Example:</span>
Prove: There exist irrational numbers a and b such that aᵇ is rational.

<span class="text-cyan-300">Proof:</span>
Consider √2^√2. Either:
- Case 1: √2^√2 is rational → Done (take a = b = √2)
- Case 2: √2^√2 is irrational → Then (√2^√2)^√2 = √2² = 2 is rational
  → Done (take a = √2^√2, b = √2)

In either case, such numbers exist.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Prove by direct proof: If n is an odd integer, then n² is odd.',
      solution: 'Let n be an arbitrary odd integer.\nThen n = 2k + 1 for some integer k.\n\nn² = (2k + 1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1\n\nSince 2k² + 2k is an integer, n² = 2m + 1 for m = 2k² + 2k.\nTherefore, n² is odd.\n\nSince n was arbitrary, if n is odd, then n² is odd.',
      formula: 'n = 2k + 1 \\Rightarrow n^2 = 2(2k^2 + 2k) + 1',
    },
    {
      question: 'Prove by cases: For any integer n, n² + n is even.',
      solution: 'Case 1: n is even\nn = 2k for some integer k\nn² + n = (2k)² + 2k = 4k² + 2k = 2(2k² + k)\nThis is even ✓\n\nCase 2: n is odd\nn = 2k + 1 for some integer k\nn² + n = (2k + 1)² + (2k + 1) = 4k² + 4k + 1 + 2k + 1 = 4k² + 6k + 2 = 2(2k² + 3k + 1)\nThis is even ✓\n\nSince all cases are covered, n² + n is always even.',
    },
    {
      question: 'Give a constructive proof: There exists an integer x such that x² - 5x + 6 = 0.',
      solution: 'We need to find x such that x² - 5x + 6 = 0.\n\nFactoring: (x - 2)(x - 3) = 0\nSo x = 2 or x = 3\n\nLet x = 2. Then:\nx² - 5x + 6 = 4 - 10 + 6 = 0 ✓\n\nTherefore, there exists an integer (specifically x = 2) such that x² - 5x + 6 = 0.',
    },
  ],
  exampleProblems: [
    {
      problem: 'Prove: For all integers n, if n is divisible by 6, then n is divisible by 3.',
      solution: 'If n is divisible by 3, then n is divisible by 3',
      steps: [
        {
          step: 'Assume premise',
          explanation: 'Let n be an integer divisible by 6. Then n = 6k for some integer k.',
        },
        {
          step: 'Express in terms of 3',
          explanation: 'n = 6k = 3(2k)',
        },
        {
          step: 'Conclude',
          explanation: 'Since 2k is an integer, n = 3(2k) shows n is divisible by 3.',
        },
      ],
      formula: '6 \\mid n \\Rightarrow n = 6k = 3(2k) \\Rightarrow 3 \\mid n',
    },
  ],
}

export default function ProofAsQuantifiedStatementPage() {
  return <DMTopicPage content={content} />
}

