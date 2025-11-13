'use client'

import DMTopicPage, { TruthTableData } from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiTable } from 'react-icons/fi'

const content = {
  title: 'Truth Tables & Operators',
  explanationSections: [
    {
      title: '📋 Truth Table Basics',
      icon: <FiTable className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">A truth table</span> systematically lists all possible truth value combinations for propositional variables and shows the resulting truth value of a compound proposition.

<span class="text-amber-300 font-semibold">Structure:</span>

• <span class="text-cyan-300">Input columns:</span> All propositional variables (p, q, r, ...)
• <span class="text-cyan-300">Output column:</span> The compound proposition being evaluated
• <span class="text-cyan-300">Rows:</span> All possible combinations (2ⁿ rows for n variables)

<span class="text-lime-300 font-semibold">For n variables:</span>
Number of rows = 2ⁿ

Example: 2 variables = 4 rows, 3 variables = 8 rows`,
      formula: '\\text{Number of rows} = 2^n',
    },
    {
      title: '🔢 Negation (NOT)',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Negation</span> (¬) reverses the truth value of a proposition.

<span class="text-amber-300 font-semibold">Properties:</span>
• ¬(¬p) = p (Double negation)
• ¬T = F
• ¬F = T

<span class="text-lime-300 font-semibold">Truth Table:</span>`,
      truthTable: {
        headers: ['p', '¬p'],
        rows: [
          ['T', 'F'],
          ['F', 'T'],
        ],
        title: 'Truth Table for Negation',
      },
    },
    {
      title: '➕ Conjunction (AND)',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">Conjunction</span> (∧) is true only when both propositions are true.

<span class="text-amber-300 font-semibold">Properties:</span>
• p ∧ q = q ∧ p (Commutative)
• p ∧ T = p
• p ∧ F = F
• p ∧ p = p`,
      truthTable: {
        headers: ['p', 'q', 'p ∧ q'],
        rows: [
          ['T', 'T', 'T'],
          ['T', 'F', 'F'],
          ['F', 'T', 'F'],
          ['F', 'F', 'F'],
        ],
        title: 'Truth Table for Conjunction',
      },
    },
    {
      title: '🔀 Disjunction (OR)',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Disjunction</span> (∨) is true when at least one proposition is true.

<span class="text-amber-300 font-semibold">Properties:</span>
• p ∨ q = q ∨ p (Commutative)
• p ∨ T = T
• p ∨ F = p
• p ∨ p = p`,
      truthTable: {
        headers: ['p', 'q', 'p ∨ q'],
        rows: [
          ['T', 'T', 'T'],
          ['T', 'F', 'T'],
          ['F', 'T', 'T'],
          ['F', 'F', 'F'],
        ],
        title: 'Truth Table for Disjunction',
      },
    },
    {
      title: '➡️ Conditional (Implication)',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">Conditional</span> (→) is false only when the premise is true and conclusion is false.

<span class="text-amber-300 font-semibold">Key Point:</span>
p → q is false ONLY when p = T and q = F. In all other cases, it is true.

<span class="text-lime-300 font-semibold">Equivalent Forms:</span>
• p → q = ¬p ∨ q
• "If p then q" means "not p, or q"`,
      truthTable: {
        headers: ['p', 'q', 'p → q'],
        rows: [
          ['T', 'T', 'T'],
          ['T', 'F', 'F'],
          ['F', 'T', 'T'],
          ['F', 'F', 'T'],
        ],
        title: 'Truth Table for Conditional',
      },
      formula: 'p \\rightarrow q \\equiv \\neg p \\lor q',
    },
    {
      title: '↔️ Biconditional',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Biconditional</span> (↔) is true when both propositions have the same truth value.

<span class="text-amber-300 font-semibold">Properties:</span>
• p ↔ q = q ↔ p (Commutative)
• p ↔ q = (p → q) ∧ (q → p)
• p ↔ T = p
• p ↔ F = ¬p`,
      truthTable: {
        headers: ['p', 'q', 'p ↔ q'],
        rows: [
          ['T', 'T', 'T'],
          ['T', 'F', 'F'],
          ['F', 'T', 'F'],
          ['F', 'F', 'T'],
        ],
        title: 'Truth Table for Biconditional',
      },
      formula: 'p \\leftrightarrow q \\equiv (p \\rightarrow q) \\land (q \\rightarrow p)',
    },
  ],
  practiceQuestions: [
    {
      question: 'Construct a truth table for (p ∧ q) → (p ∨ q)',
      solution: 'Truth table:\np | q | p ∧ q | p ∨ q | (p ∧ q) → (p ∨ q)\n--|---|-------|-------|-------------------\nT | T |   T   |   T   |         T\nT | F |   F   |   T   |         T\nF | T |   F   |   T   |         T\nF | F |   F   |   F   |         T\n\nThis is a tautology (always true).',
      truthTable: {
        headers: ['p', 'q', 'p ∧ q', 'p ∨ q', '(p ∧ q) → (p ∨ q)'],
        rows: [
          ['T', 'T', 'T', 'T', 'T'],
          ['T', 'F', 'F', 'T', 'T'],
          ['F', 'T', 'F', 'T', 'T'],
          ['F', 'F', 'F', 'F', 'T'],
        ],
        title: 'Truth Table for (p ∧ q) → (p ∨ q)',
      },
    },
    {
      question: 'How many rows are needed for a truth table with 3 variables?',
      solution: 'For n variables, we need 2ⁿ rows.\n\nFor 3 variables: 2³ = 8 rows\n\nEach variable can be T or F, so:\n• 1 variable: 2 rows\n• 2 variables: 4 rows\n• 3 variables: 8 rows\n• n variables: 2ⁿ rows',
      formula: '2^n = 2^3 = 8',
    },
    {
      question: 'Construct a truth table for ¬(p → q)',
      solution: 'First, construct p → q, then negate it:\n\np | q | p → q | ¬(p → q)\n--|---|-------|----------\nT | T |   T   |     F\nT | F |   F   |     T\nF | T |   T   |     F\nF | F |   T   |     F\n\nNote: ¬(p → q) is true only when p = T and q = F.',
      truthTable: {
        headers: ['p', 'q', 'p → q', '¬(p → q)'],
        rows: [
          ['T', 'T', 'T', 'F'],
          ['T', 'F', 'F', 'T'],
          ['F', 'T', 'T', 'F'],
          ['F', 'F', 'T', 'F'],
        ],
        title: 'Truth Table for ¬(p → q)',
      },
    },
  ],
  exampleProblems: [
    {
      problem: 'Construct a complete truth table for the compound proposition: (p ∨ q) ∧ ¬r',
      solution: 'Truth table with 8 rows (2³ = 8 for 3 variables):',
      steps: [
        {
          step: 'List all combinations',
          explanation: 'For 3 variables (p, q, r), we have 2³ = 8 combinations',
        },
        {
          step: 'Evaluate p ∨ q',
          explanation: 'True when at least one of p or q is true',
        },
        {
          step: 'Evaluate ¬r',
          explanation: 'Negation of r',
        },
        {
          step: 'Evaluate (p ∨ q) ∧ ¬r',
          explanation: 'True only when both (p ∨ q) and ¬r are true',
        },
      ],
      truthTable: {
        headers: ['p', 'q', 'r', 'p ∨ q', '¬r', '(p ∨ q) ∧ ¬r'],
        rows: [
          ['T', 'T', 'T', 'T', 'F', 'F'],
          ['T', 'T', 'F', 'T', 'T', 'T'],
          ['T', 'F', 'T', 'T', 'F', 'F'],
          ['T', 'F', 'F', 'T', 'T', 'T'],
          ['F', 'T', 'T', 'T', 'F', 'F'],
          ['F', 'T', 'F', 'T', 'T', 'T'],
          ['F', 'F', 'T', 'F', 'F', 'F'],
          ['F', 'F', 'F', 'F', 'T', 'F'],
        ],
        title: 'Truth Table for (p ∨ q) ∧ ¬r',
      },
    },
  ],
}

export default function TruthTablesPage() {
  return <DMTopicPage content={content} />
}

