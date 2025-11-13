'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiCode } from 'react-icons/fi'

const content = {
  title: 'Introduction to Graphs of Functions',
  explanationSections: [
    {
      title: '📊 Floor and Ceiling Functions',
      icon: <FiCode className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Floor Function</span> ⌊x⌋ (also called greatest integer function):
Returns the largest integer less than or equal to x.

<span class="text-blue-400 font-semibold">Ceiling Function</span> ⌈x⌉:
Returns the smallest integer greater than or equal to x.

<span class="text-amber-300 font-semibold">Properties:</span>

• <span class="text-cyan-300">⌊x⌋ ≤ x < ⌊x⌋ + 1</span>
• <span class="text-cyan-300">⌈x⌉ - 1 < x ≤ ⌈x⌉</span>
• <span class="text-cyan-300">⌊-x⌋ = -⌈x⌉</span>
• <span class="text-cyan-300">⌈-x⌉ = -⌊x⌋</span>

<span class="text-lime-300 font-semibold">Applications:</span>
• Array indexing
• Binary search algorithms
• Memory allocation
• Rounding operations`,
      formula: '\\lfloor x \\rfloor = \\max\\{n \\in \\mathbb{Z} \\mid n \\leq x\\}',
      functionGraph: {
        type: 'floor' as const,
        title: 'Floor Function ⌊x⌋',
      },
    },
    {
      title: '📈 Exponential Functions',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">Exponential functions</span> are of the form f(x) = aˣ, where a > 0 and a ≠ 1.

<span class="text-amber-300 font-semibold">Properties:</span>

• <span class="text-cyan-300">Base 2:</span> f(x) = 2ˣ (common in CS for binary)
• <span class="text-cyan-300">Base e:</span> f(x) = eˣ (natural exponential)
• <span class="text-cyan-300">Growth:</span> Exponential growth is very rapid
• <span class="text-cyan-300">Inverse:</span> Logarithm function

<span class="text-lime-300 font-semibold">Applications:</span>
• Algorithm complexity (exponential time)
• Population growth models
• Compound interest
• Binary tree node counting`,
      formula: 'f(x) = a^x, \\quad a > 0, a \\neq 1',
      functionGraph: {
        type: 'exponential' as const,
        title: 'Exponential Function 2ˣ',
      },
    },
    {
      title: '🔢 Boolean Functions',
      icon: <FiCode className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Boolean functions</span> map inputs to {0, 1} or {false, true}.

<span class="text-amber-300 font-semibold">Common Boolean Functions:</span>

• <span class="text-cyan-300">Identity:</span> f(x) = x
• <span class="text-cyan-300">Negation:</span> f(x) = ¬x or f(x) = 1 - x
• <span class="text-cyan-300">Threshold:</span> f(x) = 1 if x ≥ t, else 0
• <span class="text-cyan-300">Step function:</span> f(x) = 1 if x ≥ 0, else 0

<span class="text-lime-300 font-semibold">Applications:</span>
• Logic gates
• Decision making in algorithms
• Activation functions in neural networks
• Conditional statements`,
      functionGraph: {
        type: 'boolean' as const,
        title: 'Boolean Step Function',
      },
    },
    {
      title: '📐 Function Graphs',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">Graphing functions</span> helps visualize behavior and properties.

<span class="text-amber-300 font-semibold">Key Features:</span>

• <span class="text-cyan-300">Domain:</span> Set of all possible x-values
• <span class="text-cyan-300">Range:</span> Set of all possible y-values
• <span class="text-cyan-300">Intercepts:</span> Points where graph crosses axes
• <span class="text-cyan-300">Asymptotes:</span> Lines the graph approaches but never reaches

<span class="text-lime-300 font-semibold">For CS Functions:</span>
• Floor/Ceiling: Step functions with jumps
• Exponential: Rapid growth curves
• Boolean: Binary step functions
• Polynomial: Smooth curves`,
    },
    {
      title: '💻 Applications in Computer Science',
      icon: <FiCode className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Real-World Uses:</span>

<span class="text-amber-300 font-semibold">Floor/Ceiling:</span>
• <span class="text-cyan-300">Array indexing:</span> ⌊n/2⌋ for binary search midpoint
• <span class="text-cyan-300">Pagination:</span> ⌈total/itemsPerPage⌉ for page count
• <span class="text-cyan-300">Time complexity:</span> ⌊log₂(n)⌋ for binary search depth

<span class="text-amber-300 font-semibold">Exponential:</span>
• <span class="text-cyan-300">Binary trees:</span> 2ⁿ nodes at level n
• <span class="text-cyan-300">Exponential algorithms:</span> O(2ⁿ) time complexity
• <span class="text-cyan-300">Memory addressing:</span> 2ⁿ addresses for n-bit addresses

<span class="text-amber-300 font-semibold">Boolean:</span>
• <span class="text-cyan-300">Conditional logic:</span> if-else statements
• <span class="text-cyan-300">Activation functions:</span> Neural network thresholds
• <span class="text-cyan-300">Filtering:</span> Boolean masks in data processing`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Evaluate ⌊3.7⌋, ⌈3.7⌉, ⌊-3.7⌋, and ⌈-3.7⌉.',
      solution: '⌊3.7⌋ = 3 (largest integer ≤ 3.7)\n⌈3.7⌉ = 4 (smallest integer ≥ 3.7)\n⌊-3.7⌋ = -4 (largest integer ≤ -3.7)\n⌈-3.7⌉ = -3 (smallest integer ≥ -3.7)',
      formula: '\\lfloor 3.7 \\rfloor = 3, \\quad \\lceil 3.7 \\rceil = 4, \\quad \\lfloor -3.7 \\rfloor = -4, \\quad \\lceil -3.7 \\rceil = -3',
    },
    {
      question: 'If a binary tree has n levels, how many nodes are at the deepest level?',
      solution: 'In a full binary tree, level k has 2ᵏ nodes.\nThe deepest level is level (n-1) (0-indexed) or level n (1-indexed).\n\nIf levels are 0-indexed: deepest level has 2ⁿ⁻¹ nodes\nIf levels are 1-indexed: deepest level has 2ⁿ nodes\n\nFor a complete binary tree with n levels (1-indexed), the deepest level has at most 2ⁿ⁻¹ nodes.',
      formula: '\\text{nodes at level } k = 2^k',
    },
    {
      question: 'Express "x is non-negative" as a Boolean function.',
      solution: 'f(x) = 1 if x ≥ 0, else 0\n\nOr using Iverson bracket notation:\nf(x) = [x ≥ 0]\n\nThis is a step function that returns 1 for non-negative inputs and 0 for negative inputs.',
      functionGraph: {
        type: 'boolean' as const,
        title: 'Boolean Function [x ≥ 0]',
      },
    },
    {
      question: 'How many pages are needed to display 150 items if each page shows 25 items?',
      solution: 'Number of pages = ⌈150/25⌉ = ⌈6⌉ = 6\n\nWe use ceiling because even if the last page is not full, we still need that page.',
      formula: '\\lceil 150/25 \\rceil = \\lceil 6 \\rceil = 6',
    },
    {
      question: 'What is the time complexity of binary search in terms of floor function?',
      solution: 'Binary search on a sorted array of n elements has time complexity O(log₂(n)).\n\nThe number of comparisons needed is approximately ⌊log₂(n)⌋ + 1.\n\nFor example:\n• n = 8: ⌊log₂(8)⌋ + 1 = 3 + 1 = 4 comparisons\n• n = 16: ⌊log₂(16)⌋ + 1 = 4 + 1 = 5 comparisons',
      formula: '\\text{comparisons} = \\lfloor \\log_2(n) \\rfloor + 1',
    },
    {
      question: 'Graph the function f(x) = ⌊x⌋ for x in [-3, 3].',
      solution: 'The floor function creates a step function:\n\nFor x in [-3, -2): f(x) = -3\nFor x in [-2, -1): f(x) = -2\nFor x in [-1, 0): f(x) = -1\nFor x in [0, 1): f(x) = 0\nFor x in [1, 2): f(x) = 1\nFor x in [2, 3): f(x) = 2\nFor x = 3: f(3) = 3\n\nThe graph consists of horizontal line segments, with jumps at integer values.',
      functionGraph: {
        type: 'floor' as const,
        title: 'Floor Function Graph',
      },
    },
  ],
  exampleProblems: [
    {
      problem: 'A binary search algorithm searches through 1000 sorted elements. How many comparisons are needed in the worst case?',
      solution: '⌊log₂(1000)⌋ + 1 = ⌊9.966⌋ + 1 = 9 + 1 = 10 comparisons',
      steps: [
        {
          step: 'Apply binary search formula',
          explanation: 'Worst case comparisons = ⌊log₂(n)⌋ + 1',
        },
        {
          step: 'Calculate log₂(1000)',
          explanation: 'log₂(1000) ≈ 9.966',
        },
        {
          step: 'Apply floor function',
          explanation: '⌊9.966⌋ = 9',
        },
        {
          step: 'Add 1',
          explanation: '9 + 1 = 10 comparisons',
        },
      ],
      formula: '\\lfloor \\log_2(1000) \\rfloor + 1 = 10',
    },
    {
      problem: 'If f(x) = 2ˣ, find f(0), f(1), f(2), f(-1), and f(1/2).',
      solution: 'f(0) = 2⁰ = 1\nf(1) = 2¹ = 2\nf(2) = 2² = 4\nf(-1) = 2⁻¹ = 1/2 = 0.5\nf(1/2) = 2^(1/2) = √2 ≈ 1.414',
      steps: [
        {
          step: 'Apply exponential function',
          explanation: 'For each x, calculate 2ˣ',
        },
        {
          step: 'Handle negative exponents',
          explanation: '2⁻ⁿ = 1/(2ⁿ)',
        },
        {
          step: 'Handle fractional exponents',
          explanation: '2^(1/2) = √2',
        },
      ],
      functionGraph: {
        type: 'exponential' as const,
        title: 'Graph of f(x) = 2ˣ',
      },
    },
    {
      problem: 'Design a Boolean function that returns 1 if x is even, 0 if x is odd.',
      solution: 'f(x) = 1 - (x mod 2) or f(x) = [x mod 2 = 0]\n\nFor integer x:\n• If x is even: x mod 2 = 0, so f(x) = 1\n• If x is odd: x mod 2 = 1, so f(x) = 0',
      steps: [
        {
          step: 'Use modulo operation',
          explanation: 'x mod 2 gives 0 for even, 1 for odd',
        },
        {
          step: 'Convert to Boolean',
          explanation: 'f(x) = 1 - (x mod 2) or use Iverson bracket',
        },
      ],
      functionGraph: {
        type: 'boolean' as const,
        title: 'Even/Odd Boolean Function',
      },
    },
  ],
}

export default function FunctionsForComputerSciencePage() {
  return <DMTopicPage content={content} />
}

