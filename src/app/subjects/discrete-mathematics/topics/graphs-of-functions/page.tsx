'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiCode } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Introduction to Graphs of Functions',
  explanationSections: [
    {
      title: '📊 Floor and Ceiling Functions',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-400 font-semibold text-lg">Floor Function <MathRenderer math="\lfloor x \rfloor" /></p>
            <p className="text-gray-300">(also called greatest integer function): Returns the largest integer less than or equal to x.</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-blue-400 font-semibold text-lg">Ceiling Function <MathRenderer math="\lceil x \rceil" /></p>
            <p className="text-gray-300">Returns the smallest integer greater than or equal to x.</p>
          </div>
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <p className="text-amber-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><MathRenderer math="\lfloor x \rfloor \le x < \lfloor x \rfloor + 1" /></li>
              <li><MathRenderer math="\lceil x \rceil - 1 < x \le \lceil x \rceil" /></li>
              <li><MathRenderer math="\lfloor -x \rfloor = -\lceil x \rceil" /></li>
              <li><MathRenderer math="\lceil -x \rceil = -\lfloor x \rfloor" /></li>
            </ul>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-lime-300 font-semibold mb-2">Applications:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Array indexing</li>
              <li>Binary search algorithms</li>
              <li>Memory allocation</li>
              <li>Rounding operations</li>
            </ul>
          </div>
        </div>
      ),
      formula: '\\lfloor x \\rfloor = \\max\\{n \\in \\mathbb{Z} \\mid n \\leq x\\}',
      functionGraph: {
        type: 'floor' as const,
        title: 'Floor Function ⌊x⌋',
      },
    },
    {
      title: '📈 Exponential Functions',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Exponential functions</span> are of the form <MathRenderer math="f(x) = a^x" />, where <MathRenderer math="a > 0" /> and <MathRenderer math="a \neq 1" />.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Base 2:</span> <MathRenderer math="f(x) = 2^x" /> (common in CS for binary)</li>
              <li><span className="text-cyan-300">Base e:</span> <MathRenderer math="f(x) = e^x" /> (natural exponential)</li>
              <li><span className="text-cyan-300">Growth:</span> Exponential growth is very rapid</li>
              <li><span className="text-cyan-300">Inverse:</span> Logarithm function</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Applications:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Algorithm complexity (exponential time)</li>
              <li>Population growth models</li>
              <li>Compound interest</li>
              <li>Binary tree node counting</li>
            </ul>
          </div>
        </div>
      ),
      formula: 'f(x) = a^x, \\quad a > 0, a \\neq 1',
      functionGraph: {
        type: 'exponential' as const,
        title: 'Exponential Function 2ˣ',
      },
    },
    {
      title: '🔢 Boolean Functions',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">Boolean functions</span> map inputs to <MathRenderer math="\{0, 1\}" /> or <MathRenderer math="\{\text{false, true}\}" />.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Common Boolean Functions:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Identity:</span> <MathRenderer math="f(x) = x" /></li>
              <li><span className="text-cyan-300">Negation:</span> <MathRenderer math="f(x) = \neg x" /> or <MathRenderer math="f(x) = 1 - x" /></li>
              <li><span className="text-cyan-300">Threshold:</span> <MathRenderer math="f(x) = 1 \text{ if } x \ge t, \text{ else } 0" /></li>
              <li><span className="text-cyan-300">Step function:</span> <MathRenderer math="f(x) = 1 \text{ if } x \ge 0, \text{ else } 0" /></li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Applications:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Logic gates</li>
              <li>Decision making in algorithms</li>
              <li>Activation functions in neural networks</li>
              <li>Conditional statements</li>
            </ul>
          </div>
        </div>
      ),
      functionGraph: {
        type: 'boolean' as const,
        title: 'Boolean Step Function',
      },
    },
    {
      title: '📐 Function Graphs',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Graphing functions</span> helps visualize behavior and properties.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Key Features:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Domain:</span> Set of all possible x-values</li>
              <li><span className="text-cyan-300">Range:</span> Set of all possible y-values</li>
              <li><span className="text-cyan-300">Intercepts:</span> Points where graph crosses axes</li>
              <li><span className="text-cyan-300">Asymptotes:</span> Lines the graph approaches but never reaches</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">For CS Functions:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Floor/Ceiling: Step functions with jumps</li>
              <li>Exponential: Rapid growth curves</li>
              <li>Boolean: Binary step functions</li>
              <li>Polynomial: Smooth curves</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '💻 Applications in Computer Science',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-blue-400 font-semibold">Real-World Uses:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Floor/Ceiling:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li><span className="text-cyan-300">Array indexing:</span> <MathRenderer math="\lfloor n/2 \rfloor" /> for binary search midpoint</li>
                <li><span className="text-cyan-300">Pagination:</span> <MathRenderer math="\lceil \text{total}/\text{items} \rceil" /> for page count</li>
                <li><span className="text-cyan-300">Time complexity:</span> <MathRenderer math="\lfloor \log_2(n) \rfloor" /> for binary search depth</li>
              </ul>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-amber-300 font-semibold mb-2">Exponential:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li><span className="text-cyan-300">Binary trees:</span> <MathRenderer math="2^n" /> nodes at level n</li>
                <li><span className="text-cyan-300">Exponential algorithms:</span> <MathRenderer math="O(2^n)" /> time complexity</li>
                <li><span className="text-cyan-300">Memory addressing:</span> <MathRenderer math="2^n" /> addresses for n-bit addresses</li>
              </ul>
            </div>
            <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
              <p className="text-amber-300 font-semibold mb-2">Boolean:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li><span className="text-cyan-300">Conditional logic:</span> if-else statements</li>
                <li><span className="text-cyan-300">Activation functions:</span> Neural network thresholds</li>
                <li><span className="text-cyan-300">Filtering:</span> Boolean masks in data processing</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: (
        <span>
          Evaluate <MathRenderer math="\lfloor 3.7 \rfloor" />, <MathRenderer math="\lceil 3.7 \rceil" />, <MathRenderer math="\lfloor -3.7 \rfloor" />, and <MathRenderer math="\lceil -3.7 \rceil" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><MathRenderer math="\lfloor 3.7 \rfloor = 3" /> (largest integer ≤ 3.7)</li>
            <li><MathRenderer math="\lceil 3.7 \rceil = 4" /> (smallest integer ≥ 3.7)</li>
            <li><MathRenderer math="\lfloor -3.7 \rfloor = -4" /> (largest integer ≤ -3.7)</li>
            <li><MathRenderer math="\lceil -3.7 \rceil = -3" /> (smallest integer ≥ -3.7)</li>
          </ul>
        </div>
      ),
      formula: '\\lfloor 3.7 \\rfloor = 3, \\quad \\lceil 3.7 \\rceil = 4, \\quad \\lfloor -3.7 \\rfloor = -4, \\quad \\lceil -3.7 \\rceil = -3',
    },
    {
      question: 'If a binary tree has n levels, how many nodes are at the deepest level?',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">In a full binary tree, level k has <MathRenderer math="2^k" /> nodes.</p>
          <p className="text-gray-300">The deepest level is level (n-1) (0-indexed) or level n (1-indexed).</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>If levels are 0-indexed: deepest level has <MathRenderer math="2^{n-1}" /> nodes</li>
              <li>If levels are 1-indexed: deepest level has <MathRenderer math="2^n" /> nodes</li>
            </ul>
          </div>
          <p className="text-green-400">For a complete binary tree with n levels (1-indexed), the deepest level has at most <MathRenderer math="2^{n-1}" /> nodes.</p>
        </div>
      ),
      formula: '\\text{nodes at level } k = 2^k',
    },
    {
      question: 'Express "x is non-negative" as a Boolean function.',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300"><MathRenderer math="f(x) = 1 \text{ if } x \ge 0, \text{ else } 0" /></p>
          <p className="text-gray-300">Or using Iverson bracket notation:</p>
          <p className="text-gray-300"><MathRenderer math="f(x) = [x \ge 0]" /></p>
          <p className="text-green-400">This is a step function that returns 1 for non-negative inputs and 0 for negative inputs.</p>
        </div>
      ),
      functionGraph: {
        type: 'boolean' as const,
        title: 'Boolean Function [x ≥ 0]',
      },
    },
    {
      question: 'How many pages are needed to display 150 items if each page shows 25 items?',
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="\text{Number of pages} = \lceil 150/25 \rceil = \lceil 6 \rceil = 6" />
          <p className="text-green-400">We use ceiling because even if the last page is not full, we still need that page.</p>
        </div>
      ),
      formula: '\\lceil 150/25 \\rceil = \\lceil 6 \\rceil = 6',
    },
    {
      question: 'What is the time complexity of binary search in terms of floor function?',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Binary search on a sorted array of n elements has time complexity <MathRenderer math="O(\log_2(n))" />.</p>
          <p className="text-gray-300">The number of comparisons needed is approximately <MathRenderer math="\lfloor \log_2(n) \rfloor + 1" />.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">For example:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><MathRenderer math="n = 8: \lfloor \log_2(8) \rfloor + 1 = 3 + 1 = 4" /> comparisons</li>
              <li><MathRenderer math="n = 16: \lfloor \log_2(16) \rfloor + 1 = 4 + 1 = 5" /> comparisons</li>
            </ul>
          </div>
        </div>
      ),
      formula: '\\text{comparisons} = \\lfloor \\log_2(n) \\rfloor + 1',
    },
    {
      question: (
        <span>
          Graph the function <MathRenderer math="f(x) = \lfloor x \rfloor" /> for x in [-3, 3].
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">The floor function creates a step function:</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <ul className="list-none text-gray-300 space-y-1">
              <li>For x in [-3, -2): <MathRenderer math="f(x) = -3" /></li>
              <li>For x in [-2, -1): <MathRenderer math="f(x) = -2" /></li>
              <li>For x in [-1, 0): <MathRenderer math="f(x) = -1" /></li>
              <li>For x in [0, 1): <MathRenderer math="f(x) = 0" /></li>
              <li>For x in [1, 2): <MathRenderer math="f(x) = 1" /></li>
              <li>For x in [2, 3): <MathRenderer math="f(x) = 2" /></li>
              <li>For x = 3: <MathRenderer math="f(3) = 3" /></li>
            </ul>
          </div>
          <p className="text-green-400">The graph consists of horizontal line segments, with jumps at integer values.</p>
        </div>
      ),
      functionGraph: {
        type: 'floor' as const,
        title: 'Floor Function Graph',
      },
    },
  ],
  exampleProblems: [
    {
      problem: 'A binary search algorithm searches through 1000 sorted elements. How many comparisons are needed in the worst case?',
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="\lfloor \log_2(1000) \rfloor + 1 = \lfloor 9.966 \rfloor + 1 = 9 + 1 = 10 \text{ comparisons}" />
        </div>
      ),
      steps: [
        {
          step: 'Apply binary search formula',
          explanation: (
            <MathRenderer math="\text{Worst case comparisons} = \lfloor \log_2(n) \rfloor + 1" />
          ),
        },
        {
          step: 'Calculate log₂(1000)',
          explanation: (
            <MathRenderer math="\log_2(1000) \approx 9.966" />
          ),
        },
        {
          step: 'Apply floor function',
          explanation: (
            <MathRenderer math="\lfloor 9.966 \rfloor = 9" />
          ),
        },
        {
          step: 'Add 1',
          explanation: '9 + 1 = 10 comparisons',
        },
      ],
      formula: '\\lfloor \\log_2(1000) \\rfloor + 1 = 10',
    },
    {
      problem: (
        <span>
          If <MathRenderer math="f(x) = 2^x" />, find f(0), f(1), f(2), f(-1), and f(1/2).
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <ul className="list-none text-gray-300 space-y-1">
            <li><MathRenderer math="f(0) = 2^0 = 1" /></li>
            <li><MathRenderer math="f(1) = 2^1 = 2" /></li>
            <li><MathRenderer math="f(2) = 2^2 = 4" /></li>
            <li><MathRenderer math="f(-1) = 2^{-1} = 1/2 = 0.5" /></li>
            <li><MathRenderer math="f(1/2) = 2^{1/2} = \sqrt{2} \approx 1.414" /></li>
          </ul>
        </div>
      ),
      steps: [
        {
          step: 'Apply exponential function',
          explanation: (
            <MathRenderer math="\text{For each } x, \text{ calculate } 2^x" />
          ),
        },
        {
          step: 'Handle negative exponents',
          explanation: (
            <MathRenderer math="2^{-n} = 1/(2^n)" />
          ),
        },
        {
          step: 'Handle fractional exponents',
          explanation: (
            <MathRenderer math="2^{1/2} = \sqrt{2}" />
          ),
        },
      ],
      functionGraph: {
        type: 'exponential' as const,
        title: 'Graph of f(x) = 2ˣ',
      },
    },
    {
      problem: 'Design a Boolean function that returns 1 if x is even, 0 if x is odd.',
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="f(x) = 1 - (x \pmod 2) \text{ or } f(x) = [x \pmod 2 = 0]" />
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">For integer x:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>If x is even: <MathRenderer math="x \pmod 2 = 0" />, so <MathRenderer math="f(x) = 1" /></li>
              <li>If x is odd: <MathRenderer math="x \pmod 2 = 1" />, so <MathRenderer math="f(x) = 0" /></li>
            </ul>
          </div>
        </div>
      ),
      steps: [
        {
          step: 'Use modulo operation',
          explanation: 'x mod 2 gives 0 for even, 1 for odd',
        },
        {
          step: 'Convert to Boolean',
          explanation: (
            <MathRenderer math="f(x) = 1 - (x \pmod 2) \text{ or use Iverson bracket}" />
          ),
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
