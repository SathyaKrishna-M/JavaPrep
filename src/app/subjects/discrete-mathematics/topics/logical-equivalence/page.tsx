'use client'

import DMTopicPage, { TruthTableData } from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'Logical Equivalence',
  explanationSections: [
    {
      title: '⚖️ Definition of Logical Equivalence',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Two propositions</span> are logically equivalent if they have the same truth value in every possible case.

<span class="text-amber-300 font-semibold">Notation:</span>
p ≡ q or p ⇔ q means "p is logically equivalent to q"

<span class="text-lime-300 font-semibold">Method to Prove:</span>
Construct truth tables for both propositions. If all rows match, they are equivalent.

<span class="text-pink-300 font-semibold">Example:</span>
p → q is equivalent to ¬p ∨ q`,
      formula: 'p \\equiv q \\text{ if } p \\leftrightarrow q \\text{ is a tautology}',
    },
    {
      title: '📐 Laws of Logical Equivalence',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Fundamental Laws:</span>

<span class="text-amber-300 font-semibold">Identity Laws:</span>
• p ∧ T ≡ p
• p ∨ F ≡ p

<span class="text-amber-300 font-semibold">Domination Laws:</span>
• p ∨ T ≡ T
• p ∧ F ≡ F

<span class="text-amber-300 font-semibold">Idempotent Laws:</span>
• p ∨ p ≡ p
• p ∧ p ≡ p

<span class="text-amber-300 font-semibold">Double Negation:</span>
• ¬(¬p) ≡ p

<span class="text-amber-300 font-semibold">Commutative Laws:</span>
• p ∨ q ≡ q ∨ p
• p ∧ q ≡ q ∧ p

<span class="text-amber-300 font-semibold">Associative Laws:</span>
• (p ∨ q) ∨ r ≡ p ∨ (q ∨ r)
• (p ∧ q) ∧ r ≡ p ∧ (q ∧ r)

<span class="text-amber-300 font-semibold">Distributive Laws:</span>
• p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)
• p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)

<span class="text-amber-300 font-semibold">De Morgan's Laws:</span>
• ¬(p ∧ q) ≡ ¬p ∨ ¬q
• ¬(p ∨ q) ≡ ¬p ∧ ¬q

<span class="text-amber-300 font-semibold">Absorption Laws:</span>
• p ∨ (p ∧ q) ≡ p
• p ∧ (p ∨ q) ≡ p

<span class="text-amber-300 font-semibold">Negation Laws:</span>
• p ∨ ¬p ≡ T
• p ∧ ¬p ≡ F`,
    },
    {
      title: '🔄 Converse, Inverse, Contrapositive',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">For the conditional p → q:</span>

<span class="text-amber-300 font-semibold">Original:</span> p → q
<span class="text-cyan-300">"If p then q"</span>

<span class="text-amber-300 font-semibold">Converse:</span> q → p
<span class="text-cyan-300">"If q then p"</span>
<span class="text-red-400">NOT equivalent to original</span>

<span class="text-amber-300 font-semibold">Inverse:</span> ¬p → ¬q
<span class="text-cyan-300">"If not p then not q"</span>
<span class="text-red-400">NOT equivalent to original</span>

<span class="text-amber-300 font-semibold">Contrapositive:</span> ¬q → ¬p
<span class="text-cyan-300">"If not q then not p"</span>
<span class="text-green-400">EQUIVALENT to original</span>

<span class="text-lime-300 font-semibold">Key Result:</span>
p → q ≡ ¬q → ¬p (Contrapositive is always equivalent)`,
      truthTable: {
        headers: ['p', 'q', 'p → q', 'q → p', '¬p → ¬q', '¬q → ¬p'],
        rows: [
          ['T', 'T', 'T', 'T', 'T', 'T'],
          ['T', 'F', 'F', 'T', 'T', 'F'],
          ['F', 'T', 'T', 'F', 'F', 'T'],
          ['F', 'F', 'T', 'T', 'T', 'T'],
        ],
        title: 'Truth Table Comparing Conditional Forms',
      },
      formula: 'p \\rightarrow q \\equiv \\neg q \\rightarrow \\neg p',
    },
  ],
  practiceQuestions: [
    {
      question: 'Prove using truth tables that p → q is equivalent to ¬p ∨ q',
      solution: 'Construct truth tables for both:\n\np | q | p → q | ¬p | ¬p ∨ q\n--|---|-------|-----|--------\nT | T |   T   |  F  |   T\nT | F |   F   |  F  |   F\nF | T |   T   |  T  |   T\nF | F |   T   |  T  |   T\n\nSince p → q and ¬p ∨ q have identical truth values in all rows, they are equivalent.',
      truthTable: {
        headers: ['p', 'q', 'p → q', '¬p', '¬p ∨ q'],
        rows: [
          ['T', 'T', 'T', 'F', 'T'],
          ['T', 'F', 'F', 'F', 'F'],
          ['F', 'T', 'T', 'T', 'T'],
          ['F', 'F', 'T', 'T', 'T'],
        ],
        title: 'Proving p → q ≡ ¬p ∨ q',
      },
      formula: 'p \\rightarrow q \\equiv \\neg p \\lor q',
    },
    {
      question: 'Prove De Morgan\'s Law: ¬(p ∧ q) ≡ ¬p ∨ ¬q',
      solution: 'Construct truth tables:\n\np | q | p ∧ q | ¬(p ∧ q) | ¬p | ¬q | ¬p ∨ ¬q\n--|---|-------|----------|-----|-----|----------\nT | T |   T   |    F     |  F  |  F  |    F\nT | F |   F   |    T     |  F  |  T  |    T\nF | T |   F   |    T     |  T  |  F  |    T\nF | F |   F   |    T     |  T  |  T  |    T\n\nSince ¬(p ∧ q) and ¬p ∨ ¬q match in all rows, they are equivalent.',
      truthTable: {
        headers: ['p', 'q', 'p ∧ q', '¬(p ∧ q)', '¬p', '¬q', '¬p ∨ ¬q'],
        rows: [
          ['T', 'T', 'T', 'F', 'F', 'F', 'F'],
          ['T', 'F', 'F', 'T', 'F', 'T', 'T'],
          ['F', 'T', 'F', 'T', 'T', 'F', 'T'],
          ['F', 'F', 'F', 'T', 'T', 'T', 'T'],
        ],
        title: 'Proving De Morgan\'s Law',
      },
    },
    {
      question: 'Find the contrapositive of "If it rains, then I stay home"',
      solution: 'Original: "If it rains, then I stay home"\nLet p = "it rains", q = "I stay home"\nOriginal: p → q\n\nContrapositive: ¬q → ¬p\n"If I do not stay home, then it does not rain"\n\nThis is logically equivalent to the original statement.',
      formula: 'p \\rightarrow q \\equiv \\neg q \\rightarrow \\neg p',
    },
  ],
  exampleProblems: [
    {
      problem: 'Simplify the expression: (p ∨ q) ∧ (p ∨ ¬q)',
      solution: '(p ∨ q) ∧ (p ∨ ¬q) ≡ p',
      steps: [
        {
          step: 'Apply distributive law',
          explanation: '(p ∨ q) ∧ (p ∨ ¬q) = p ∨ (q ∧ ¬q)',
        },
        {
          step: 'Apply negation law',
          explanation: 'q ∧ ¬q = F, so p ∨ (q ∧ ¬q) = p ∨ F',
        },
        {
          step: 'Apply identity law',
          explanation: 'p ∨ F = p',
        },
      ],
      formula: '(p \\lor q) \\land (p \\lor \\neg q) \\equiv p',
    },
  ],
}

export default function LogicalEquivalencePage() {
  return <DMTopicPage content={content} />
}

