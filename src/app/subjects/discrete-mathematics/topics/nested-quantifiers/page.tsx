'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiLayers } from 'react-icons/fi'

const content = {
  title: 'Nested Quantifiers',
  explanationSections: [
    {
      title: '🌀 Understanding Nested Quantifiers',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Nested quantifiers</span> occur when one quantifier is within the scope of another.

<span class="text-amber-300 font-semibold">Order Matters!</span>
The order of quantifiers affects the meaning of the statement.

<span class="text-lime-300 font-semibold">Example:</span>
∀x ∃y P(x, y) means "For every x, there exists a y such that P(x, y)"
- y can depend on x

∃y ∀x P(x, y) means "There exists a y such that for all x, P(x, y)"
- y must work for all x

<span class="text-pink-300 font-semibold">Key Point:</span>
These are NOT equivalent in general!`,
      formula: '\\forall x \\, \\exists y \\, P(x,y) \\neq \\exists y \\, \\forall x \\, P(x,y)',
    },
    {
      title: '📊 Common Patterns',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Pattern 1: ∀x ∃y</span>
"For every x, there exists a y"
- Example: ∀x ∃y (x + y = 0)
  - For every number x, there exists y = -x such that x + y = 0
  - True

<span class="text-blue-400 font-semibold">Pattern 2: ∃y ∀x</span>
"There exists a y such that for all x"
- Example: ∃y ∀x (x + y = x)
  - There exists y = 0 such that for all x, x + 0 = x
  - True

<span class="text-blue-400 font-semibold">Pattern 3: ∀x ∀y</span>
"For all x and for all y"
- Example: ∀x ∀y (x + y = y + x)
  - Commutative property of addition
  - True

<span class="text-blue-400 font-semibold">Pattern 4: ∃x ∃y</span>
"There exists x and there exists y"
- Example: ∃x ∃y (x + y = 5)
  - There exist numbers such that their sum is 5
  - True`,
    },
    {
      title: '🔄 Negating Nested Quantifiers',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">To negate nested quantifiers:</span>
Work from the outside in, flipping each quantifier and negating the predicate.

<span class="text-amber-300 font-semibold">Example 1:</span>
¬(∀x ∃y P(x, y)) ≡ ∃x ∀y ¬P(x, y)

<span class="text-lime-300 font-semibold">Step by step:</span>
1. ¬(∀x ∃y P(x, y))
2. ∃x ¬(∃y P(x, y))  [Flip ∀ to ∃]
3. ∃x ∀y ¬P(x, y)    [Flip ∃ to ∀, negate P]

<span class="text-amber-300 font-semibold">Example 2:</span>
¬(∃x ∀y P(x, y)) ≡ ∀x ∃y ¬P(x, y)

<span class="text-pink-300 font-semibold">Rule:</span>
Move negation inward, flipping each quantifier as you go.`,
      formula: '\\neg(\\forall x \\, \\exists y \\, P(x,y)) \\equiv \\exists x \\, \\forall y \\, \\neg P(x,y)',
    },
    {
      title: '🌐 Domain Definitions',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Specifying Domains:</span>

<span class="text-amber-300 font-semibold">Explicit Domain:</span>
∀x ∈ ℝ (x² ≥ 0)
"For all real numbers x, x squared is greater than or equal to 0"

<span class="text-amber-300 font-semibold">Implicit Domain:</span>
If domain is clear from context, we may omit it.

<span class="text-amber-300 font-semibold">Multiple Domains:</span>
∀x ∈ ℤ ∃y ∈ ℤ (y = x + 1)
"For every integer x, there exists an integer y such that y = x + 1"

<span class="text-lime-300 font-semibold">Common Domains:</span>
• ℕ: Natural numbers {0, 1, 2, ...}
• ℤ: Integers {..., -2, -1, 0, 1, 2, ...}
• ℝ: Real numbers
• ℚ: Rational numbers`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Translate to English: ∀x ∃y (x < y) where domain is integers',
      solution: '"For every integer x, there exists an integer y such that x is less than y"\n\nThis is true. For any integer x, we can choose y = x + 1.',
      formula: '\\forall x \\, \\exists y \\, (x < y)',
    },
    {
      question: 'Is ∃y ∀x (x < y) true for integers?',
      solution: 'No, this is false.\n\nTranslation: "There exists an integer y such that for all integers x, x is less than y"\n\nThis claims there is a largest integer, which is false. No matter what y we choose, we can find x = y + 1 such that x is not less than y.',
      formula: '\\exists y \\, \\forall x \\, (x < y)',
    },
    {
      question: 'Negate: ∀x ∃y (x + y = 0)',
      solution: 'Using the negation rule:\n¬(∀x ∃y (x + y = 0)) ≡ ∃x ∀y ¬(x + y = 0) ≡ ∃x ∀y (x + y ≠ 0)\n\nMeaning: "There exists x such that for all y, x + y ≠ 0"\n\nThis is false (counterexample: for any x, choose y = -x)',
      formula: '\\neg(\\forall x \\, \\exists y \\, (x + y = 0)) \\equiv \\exists x \\, \\forall y \\, (x + y \\neq 0)',
    },
  ],
  exampleProblems: [
    {
      problem: 'Express in logical notation: "For every real number x, there exists a real number y such that x + y = 0"',
      solution: '∀x ∈ ℝ ∃y ∈ ℝ (x + y = 0)',
      steps: [
        {
          step: 'Identify quantifiers',
          explanation: '"For every" = ∀, "there exists" = ∃',
        },
        {
          step: 'Identify domains',
          explanation: 'Both x and y are real numbers',
        },
        {
          step: 'Write predicate',
          explanation: 'P(x, y): x + y = 0',
        },
        {
          step: 'Combine',
          explanation: '∀x ∈ ℝ ∃y ∈ ℝ (x + y = 0)',
        },
      ],
      formula: '\\forall x \\in \\mathbb{R} \\, \\exists y \\in \\mathbb{R} \\, (x + y = 0)',
    },
  ],
}

export default function NestedQuantifiersPage() {
  return <DMTopicPage content={content} />
}

