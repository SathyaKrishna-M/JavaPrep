'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiLayers } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Nested Quantifiers',
  explanationSections: [
    {
      title: '🌀 Understanding Nested Quantifiers',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">Nested quantifiers</span> occur when one quantifier is within the scope of another.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Order Matters!</p>
            <p className="text-gray-300">The order of quantifiers affects the meaning of the statement.</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Example:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <MathRenderer math="\forall x \exists y P(x, y)" /> means "For every x, there exists a y such that P(x, y)"
                <p className="ml-6 text-gray-400">- y can depend on x</p>
              </li>
              <li>
                <MathRenderer math="\exists y \forall x P(x, y)" /> means "There exists a y such that for all x, P(x, y)"
                <p className="ml-6 text-gray-400">- y must work for all x</p>
              </li>
            </ul>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-pink-300 font-semibold mb-2">Key Point:</p>
            <p className="text-gray-300">These are NOT equivalent in general!</p>
            <MathRenderer display math="\forall x \exists y P(x,y) \neq \exists y \forall x P(x,y)" />
          </div>
        </div>
      ),
      formula: '\\forall x \\, \\exists y \\, P(x,y) \\neq \\exists y \\, \\forall x \\, P(x,y)',
    },
    {
      title: '📊 Common Patterns',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-400 font-semibold mb-2">Pattern 1: <MathRenderer math="\forall x \exists y" /></p>
              <p className="text-gray-300">"For every x, there exists a y"</p>
              <div className="mt-2 text-sm text-gray-400">
                <p>Example: <MathRenderer math="\forall x \exists y (x + y = 0)" /></p>
                <p>- For every number x, there exists y = -x such that x + y = 0</p>
                <p className="text-green-400 font-semibold">- True</p>
              </div>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-400 font-semibold mb-2">Pattern 2: <MathRenderer math="\exists y \forall x" /></p>
              <p className="text-gray-300">"There exists a y such that for all x"</p>
              <div className="mt-2 text-sm text-gray-400">
                <p>Example: <MathRenderer math="\exists y \forall x (x + y = x)" /></p>
                <p>- There exists y = 0 such that for all x, x + 0 = x</p>
                <p className="text-green-400 font-semibold">- True</p>
              </div>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-400 font-semibold mb-2">Pattern 3: <MathRenderer math="\forall x \forall y" /></p>
              <p className="text-gray-300">"For all x and for all y"</p>
              <div className="mt-2 text-sm text-gray-400">
                <p>Example: <MathRenderer math="\forall x \forall y (x + y = y + x)" /></p>
                <p>- Commutative property of addition</p>
                <p className="text-green-400 font-semibold">- True</p>
              </div>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-400 font-semibold mb-2">Pattern 4: <MathRenderer math="\exists x \exists y" /></p>
              <p className="text-gray-300">"There exists x and there exists y"</p>
              <div className="mt-2 text-sm text-gray-400">
                <p>Example: <MathRenderer math="\exists x \exists y (x + y = 5)" /></p>
                <p>- There exist numbers such that their sum is 5</p>
                <p className="text-green-400 font-semibold">- True</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '🔄 Negating Nested Quantifiers',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-cyan-400 font-semibold">To negate nested quantifiers:</p>
          <p className="text-gray-300">Work from the outside in, flipping each quantifier and negating the predicate.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Example 1:</p>
              <MathRenderer display math="\neg(\forall x \exists y P(x, y)) \equiv \exists x \forall y \neg P(x, y)" />
              <div className="mt-2 text-sm text-gray-400">
                <p className="text-lime-300 font-semibold">Step by step:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li><MathRenderer math="\neg(\forall x \exists y P(x, y))" /></li>
                  <li><MathRenderer math="\exists x \neg(\exists y P(x, y))" /> [Flip <MathRenderer math="\forall" /> to <MathRenderer math="\exists" />]</li>
                  <li><MathRenderer math="\exists x \forall y \neg P(x, y)" /> [Flip <MathRenderer math="\exists" /> to <MathRenderer math="\forall" />, negate P]</li>
                </ol>
              </div>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Example 2:</p>
              <MathRenderer display math="\neg(\exists x \forall y P(x, y)) \equiv \forall x \exists y \neg P(x, y)" />
            </div>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30 text-center">
            <p className="text-pink-300 font-semibold mb-2">Rule:</p>
            <p className="text-gray-300">Move negation inward, flipping each quantifier as you go.</p>
          </div>
        </div>
      ),
      formula: '\\neg(\\forall x \\, \\exists y \\, P(x,y)) \\equiv \\exists x \\, \\forall y \\, \\neg P(x,y)',
    },
    {
      title: '🌐 Domain Definitions',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-blue-400 font-semibold">Specifying Domains:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Explicit Domain:</p>
              <MathRenderer display math="\forall x \in \mathbb{R} (x^2 \ge 0)" />
              <p className="text-gray-300 text-sm mt-1">"For all real numbers x, x squared is greater than or equal to 0"</p>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Multiple Domains:</p>
              <MathRenderer display math="\forall x \in \mathbb{Z} \exists y \in \mathbb{Z} (y = x + 1)" />
              <p className="text-gray-300 text-sm mt-1">"For every integer x, there exists an integer y such that y = x + 1"</p>
            </div>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Common Domains:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><MathRenderer math="\mathbb{N}" />: Natural numbers {'{0, 1, 2, ...}'}</li>
              <li><MathRenderer math="\mathbb{Z}" />: Integers {'{..., -2, -1, 0, 1, 2, ...}'}</li>
              <li><MathRenderer math="\mathbb{R}" />: Real numbers</li>
              <li><MathRenderer math="\mathbb{Q}" />: Rational numbers</li>
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
          Translate to English: <MathRenderer math="\forall x \exists y (x < y)" /> where domain is integers
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">
            "For every integer x, there exists an integer y such that x is less than y"
          </p>
          <p className="text-green-400">
            This is true. For any integer x, we can choose <MathRenderer math="y = x + 1" />.
          </p>
        </div>
      ),
      formula: '\\forall x \\, \\exists y \\, (x < y)',
    },
    {
      question: (
        <span>
          Is <MathRenderer math="\exists y \forall x (x < y)" /> true for integers?
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-red-400 font-semibold">No, this is false.</p>
          <p className="text-gray-300">
            Translation: "There exists an integer y such that for all integers x, x is less than y"
          </p>
          <p className="text-gray-300">
            This claims there is a largest integer, which is false. No matter what y we choose, we can find <MathRenderer math="x = y + 1" /> such that x is not less than y.
          </p>
        </div>
      ),
      formula: '\\exists y \\, \\forall x \\, (x < y)',
    },
    {
      question: (
        <span>
          Negate: <MathRenderer math="\forall x \exists y (x + y = 0)" />
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Using the negation rule:</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
            <MathRenderer display math="\neg(\forall x \exists y (x + y = 0)) \equiv \exists x \forall y \neg(x + y = 0) \equiv \exists x \forall y (x + y \neq 0)" />
          </div>
          <p className="text-gray-300">
            Meaning: "There exists x such that for all y, x + y ≠ 0"
          </p>
          <p className="text-red-400">
            This is false (counterexample: for any x, choose y = -x)
          </p>
        </div>
      ),
      formula: '\\neg(\\forall x \\, \\exists y \\, (x + y = 0)) \\equiv \\exists x \\, \\forall y \\, (x + y \\neq 0)',
    },
  ],
  exampleProblems: [
    {
      problem: 'Express in logical notation: "For every real number x, there exists a real number y such that x + y = 0"',
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="\forall x \in \mathbb{R} \exists y \in \mathbb{R} (x + y = 0)" />
        </div>
      ),
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
          explanation: (
            <MathRenderer math="P(x, y): x + y = 0" />
          ),
        },
        {
          step: 'Combine',
          explanation: (
            <MathRenderer math="\forall x \in \mathbb{R} \exists y \in \mathbb{R} (x + y = 0)" />
          ),
        },
      ],
      formula: '\\forall x \\in \\mathbb{R} \\, \\exists y \\in \\mathbb{R} \\, (x + y = 0)',
    },
  ],
}

export default function NestedQuantifiersPage() {
  return <DMTopicPage content={content} />
}
