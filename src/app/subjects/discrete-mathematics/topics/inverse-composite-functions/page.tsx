'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Inverse & Composite Functions',
  explanationSections: [
    {
      title: '🔄 Composite Functions',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">The composition</span> of functions <MathRenderer math="f: A \rightarrow B" /> and <MathRenderer math="g: B \rightarrow C" /> is denoted <MathRenderer math="(g \circ f): A \rightarrow C" />.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Definition:</p>
            <MathRenderer display math="(g \circ f)(x) = g(f(x))" />
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Associative:</span> <MathRenderer math="(h \circ g) \circ f = h \circ (g \circ f)" /></li>
              <li><span className="text-cyan-300">Identity:</span> <MathRenderer math="f \circ I = I \circ f = f" />, where I is the identity function</li>
              <li><span className="text-cyan-300">Composition of bijections:</span> If f and g are bijective, then <MathRenderer math="g \circ f" /> is bijective</li>
            </ul>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-pink-300 font-semibold mb-2">Note:</p>
            <p className="text-gray-300">For composition to be defined, the codomain of f must match the domain of g.</p>
          </div>
        </div>
      ),
      formula: '(g \\circ f)(x) = g(f(x))',
      mermaid: `%%{init: {'flowchart': {'defaultRenderer': 'elk', 'curve': 'linear'}, 'graph': {'curve': 'linear'}}}%%
flowchart LR
    subgraph Set A
    a1((x))
    end
    subgraph Set B
    b1((f(x)))
    end
    subgraph Set C
    c1((g(f(x))))
    end
    a1 -- f --> b1
    b1 -- g --> c1
    a1 -- g o f --> c1
    style a1 fill:#1e293b,stroke:#3b82f6,stroke-width:2px
    style b1 fill:#1e293b,stroke:#10b981,stroke-width:2px
    style c1 fill:#1e293b,stroke:#ec4899,stroke-width:2px`,
    },
    {
      title: '↩️ Inverse Functions',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">The inverse</span> of a bijective function <MathRenderer math="f: A \rightarrow B" /> is <MathRenderer math="f^{-1}: B \rightarrow A" /> such that:
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><MathRenderer math="f^{-1}(f(a)) = a" /> for all <MathRenderer math="a \in A" /></li>
              <li><MathRenderer math="f(f^{-1}(b)) = b" /> for all <MathRenderer math="b \in B" /></li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Existence:</p>
            <p className="text-gray-300">A function has an inverse if and only if it is bijective (one-to-one and onto).</p>
          </div>
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <p className="text-cyan-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Uniqueness:</span> If an inverse exists, it is unique</li>
              <li><span className="text-cyan-300">Inverse of inverse:</span> <MathRenderer math="(f^{-1})^{-1} = f" /></li>
              <li><span className="text-cyan-300">Inverse of composition:</span> <MathRenderer math="(g \circ f)^{-1} = f^{-1} \circ g^{-1}" /></li>
            </ul>
          </div>
        </div>
      ),
      formula: 'f^{-1}(f(a)) = a, \\quad f(f^{-1}(b)) = b',
      mermaid: `%%{init: {'flowchart': {'defaultRenderer': 'elk', 'curve': 'linear'}, 'graph': {'curve': 'linear'}}}%%
flowchart LR
    subgraph Domain A
    a1((a))
    end
    subgraph Codomain B
    b1((y))
    end
    a1 -- f --> b1
    b1 -- f⁻¹ --> a1
    style a1 fill:#1e293b,stroke:#3b82f6,stroke-width:2px
    style b1 fill:#1e293b,stroke:#10b981,stroke-width:2px`,
    },
    {
      title: '📐 Finding Inverses',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Method to find inverse:</span>
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-gray-300">For a function <MathRenderer math="f: A \rightarrow B" />:</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1 mt-2">
              <li>Verify f is bijective</li>
              <li>Set <MathRenderer math="y = f(x)" /></li>
              <li>Solve for x in terms of y</li>
              <li>Replace y with x to get <MathRenderer math="f^{-1}(x)" /></li>
            </ol>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Example:</p>
            <p className="text-gray-300"><MathRenderer math="f(x) = 2x + 3" /></p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
              <li>Step 1: f is bijective (linear function with non-zero slope)</li>
              <li>Step 2: <MathRenderer math="y = 2x + 3" /></li>
              <li>Step 3: <MathRenderer math="y - 3 = 2x" />, so <MathRenderer math="x = (y - 3)/2" /></li>
              <li>Step 4: <MathRenderer math="f^{-1}(x) = (x - 3)/2" /></li>
            </ul>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-pink-300 font-semibold mb-2">Verification:</p>
            <MathRenderer display math="f^{-1}(f(x)) = f^{-1}(2x + 3) = \frac{(2x + 3) - 3}{2} = x" />
          </div>
        </div>
      ),
      formula: 'f(x) = 2x + 3 \\Rightarrow f^{-1}(x) = \\frac{x - 3}{2}',
    },
    {
      title: '🔗 Composition with Inverses',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-blue-400 font-semibold">Key Relationships:</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Identity:</span> <MathRenderer math="f \circ f^{-1} = I_B" /> and <MathRenderer math="f^{-1} \circ f = I_A" /></li>
              <li><span className="text-cyan-300">Inverse of composition:</span> <MathRenderer math="(g \circ f)^{-1} = f^{-1} \circ g^{-1}" /></li>
            </ul>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-pink-300 font-semibold mb-2">Note the order reversal:</p>
            <p className="text-gray-300">The inverse of <MathRenderer math="g \circ f" /> is <MathRenderer math="f^{-1} \circ g^{-1}" /> (not <MathRenderer math="g^{-1} \circ f^{-1}" />)</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Example:</p>
            <p className="text-gray-300">If <MathRenderer math="f(x) = x + 1" /> and <MathRenderer math="g(x) = 2x" />, then:</p>
            <MathRenderer display math="(g \circ f)(x) = g(f(x)) = g(x + 1) = 2(x + 1) = 2x + 2" />
            <MathRenderer display math="(g \circ f)^{-1}(x) = f^{-1}(g^{-1}(x)) = f^{-1}(x/2) = x/2 - 1" />
            <p className="text-gray-300 mt-2">Verification:</p>
            <MathRenderer display math="(g \circ f)^{-1}((g \circ f)(x)) = (g \circ f)^{-1}(2x + 2) = (2x + 2)/2 - 1 = x" />
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: (
        <span>
          If <MathRenderer math="f(x) = 3x - 2" /> and <MathRenderer math="g(x) = x^2" />, find <MathRenderer math="(g \circ f)(x)" /> and <MathRenderer math="(f \circ g)(x)" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <MathRenderer display math="(g \circ f)(x) = g(f(x)) = g(3x - 2) = (3x - 2)^2 = 9x^2 - 12x + 4" />
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <MathRenderer display math="(f \circ g)(x) = f(g(x)) = f(x^2) = 3(x^2) - 2 = 3x^2 - 2" />
          </div>
          <p className="text-gray-300">Note: <MathRenderer math="(g \circ f) \neq (f \circ g)" />, so composition is not commutative.</p>
        </div>
      ),
      formula: '(g \\circ f)(x) = 9x^2 - 12x + 4, \\quad (f \\circ g)(x) = 3x^2 - 2',
    },
    {
      question: (
        <span>
          Find the inverse of <MathRenderer math="f(x) = \frac{2x + 1}{x - 3}" />, where <MathRenderer math="x \neq 3" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Step 1: Verify f is bijective (one-to-one and onto its range)</p>
          <p className="text-gray-300">Step 2: Set <MathRenderer math="y = \frac{2x + 1}{x - 3}" /></p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-gray-300">Step 3: Solve for x:</p>
            <MathRenderer display math="y(x - 3) = 2x + 1" />
            <MathRenderer display math="yx - 3y = 2x + 1" />
            <MathRenderer display math="yx - 2x = 3y + 1" />
            <MathRenderer display math="x(y - 2) = 3y + 1" />
            <MathRenderer display math="x = \frac{3y + 1}{y - 2}, \text{ where } y \neq 2" />
          </div>
          <p className="text-green-400 font-semibold">Step 4: <MathRenderer math="f^{-1}(x) = \frac{3x + 1}{x - 2}, \text{ where } x \neq 2" /></p>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Verification:</p>
            <MathRenderer display math="f^{-1}(f(x)) = f^{-1}\left(\frac{2x + 1}{x - 3}\right) = \frac{3(\frac{2x + 1}{x - 3}) + 1}{(\frac{2x + 1}{x - 3}) - 2}" />
            <p className="text-gray-300">After simplification, this equals x. ✓</p>
          </div>
        </div>
      ),
      formula: 'f^{-1}(x) = \\frac{3x + 1}{x - 2}, \\quad x \\neq 2',
    },
    {
      question: (
        <span>
          If <MathRenderer math="f: A \rightarrow B" /> and <MathRenderer math="g: B \rightarrow C" /> are both bijective, prove that <MathRenderer math="g \circ f" /> is bijective.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">We need to show <MathRenderer math="g \circ f" /> is both one-to-one and onto.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">One-to-one (Injective):</p>
            <p className="text-gray-300">Assume <MathRenderer math="(g \circ f)(a_1) = (g \circ f)(a_2)" /></p>
            <p className="text-gray-300">Then <MathRenderer math="g(f(a_1)) = g(f(a_2))" /></p>
            <p className="text-gray-300">Since g is one-to-one, <MathRenderer math="f(a_1) = f(a_2)" /></p>
            <p className="text-gray-300">Since f is one-to-one, <MathRenderer math="a_1 = a_2" /></p>
            <p className="text-green-400">Therefore, <MathRenderer math="g \circ f" /> is one-to-one. ✓</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-cyan-300 font-semibold">Onto (Surjective):</p>
            <p className="text-gray-300">Let <MathRenderer math="c \in C" />. Since g is onto, there exists <MathRenderer math="b \in B" /> such that <MathRenderer math="g(b) = c" />.</p>
            <p className="text-gray-300">Since f is onto, there exists <MathRenderer math="a \in A" /> such that <MathRenderer math="f(a) = b" />.</p>
            <p className="text-gray-300">Therefore, <MathRenderer math="(g \circ f)(a) = g(f(a)) = g(b) = c" /></p>
            <p className="text-green-400">So <MathRenderer math="g \circ f" /> is onto. ✓</p>
          </div>
          <p className="text-gray-300">Since <MathRenderer math="g \circ f" /> is both one-to-one and onto, it is bijective.</p>
        </div>
      ),
    },
    {
      question: (
        <span>
          If <MathRenderer math="f(x) = x + 5" /> and <MathRenderer math="g(x) = 2x" />, find <MathRenderer math="(f \circ g)^{-1}(x)" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Method 1: Find composition first, then inverse</p>
            <MathRenderer display math="(f \circ g)(x) = f(g(x)) = f(2x) = 2x + 5" />
            <p className="text-gray-300">To find inverse: <MathRenderer math="y = 2x + 5" />, so <MathRenderer math="x = (y - 5)/2" /></p>
            <p className="text-green-400">Therefore, <MathRenderer math="(f \circ g)^{-1}(x) = (x - 5)/2" /></p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-cyan-300 font-semibold">Method 2: Use <MathRenderer math="(g \circ f)^{-1} = f^{-1} \circ g^{-1}" /></p>
            <p className="text-gray-300"><MathRenderer math="f^{-1}(x) = x - 5" /></p>
            <p className="text-gray-300"><MathRenderer math="g^{-1}(x) = x/2" /></p>
            <MathRenderer display math="(f \circ g)^{-1}(x) = g^{-1}(f^{-1}(x)) = g^{-1}(x - 5) = (x - 5)/2" />
          </div>
          <p className="text-gray-300">Both methods give the same result.</p>
        </div>
      ),
      formula: '(f \\circ g)^{-1}(x) = \\frac{x - 5}{2}',
    },
    {
      question: (
        <span>
          Determine if <MathRenderer math="f(x) = x^2" /> has an inverse on <MathRenderer math="\mathbb{R}" />. If not, find a domain where it does.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-red-400"><MathRenderer math="f(x) = x^2" /> is not one-to-one on <MathRenderer math="\mathbb{R}" /> because <MathRenderer math="f(2) = f(-2) = 4" />.</p>
          <p className="text-gray-300">Therefore, f does not have an inverse on <MathRenderer math="\mathbb{R}" />.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-gray-300">However, if we restrict the domain to <MathRenderer math="[0, \infty)" /> (non-negative reals), then f is one-to-one and onto <MathRenderer math="[0, \infty)" />.</p>
            <p className="text-green-400 font-semibold">On this restricted domain:</p>
            <MathRenderer display math="f^{-1}(x) = \sqrt{x} \text{ (the positive square root)}" />
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Verification:</p>
            <p className="text-gray-300"><MathRenderer math="f^{-1}(f(x)) = f^{-1}(x^2) = \sqrt{x^2} = x" /> for <MathRenderer math="x \ge 0" /> ✓</p>
            <p className="text-gray-300"><MathRenderer math="f(f^{-1}(x)) = f(\sqrt{x}) = (\sqrt{x})^2 = x" /> for <MathRenderer math="x \ge 0" /> ✓</p>
          </div>
        </div>
      ),
      functionGraph: {
        type: 'quadratic' as const,
        title: 'Graph of f(x) = x²',
      },
    },
  ],
  exampleProblems: [
    {
      problem: (
        <span>
          Given <MathRenderer math="f(x) = 2x + 1" /> and <MathRenderer math="g(x) = x^2 - 3" />, find <MathRenderer math="(f \circ g)(x)" /> and <MathRenderer math="(g \circ f)(x)" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="(f \circ g)(x) = 2x^2 - 5, \quad (g \circ f)(x) = 4x^2 + 4x - 2" />
        </div>
      ),
      steps: [
        {
          step: 'Find (f ∘ g)(x)',
          explanation: (
            <MathRenderer math="(f \circ g)(x) = f(g(x)) = f(x^2 - 3) = 2(x^2 - 3) + 1 = 2x^2 - 6 + 1 = 2x^2 - 5" />
          ),
        },
        {
          step: 'Find (g ∘ f)(x)',
          explanation: (
            <MathRenderer math="(g \circ f)(x) = g(f(x)) = g(2x + 1) = (2x + 1)^2 - 3 = 4x^2 + 4x + 1 - 3 = 4x^2 + 4x - 2" />
          ),
        },
        {
          step: 'Note',
          explanation: (
            <MathRenderer math="\text{Composition is not commutative: } (f \circ g) \neq (g \circ f)" />
          ),
        },
      ],
      formula: '(f \\circ g)(x) = 2x^2 - 5, \\quad (g \\circ f)(x) = 4x^2 + 4x - 2',
    },
    {
      problem: (
        <span>
          Find the inverse of <MathRenderer math="f(x) = \frac{x + 2}{x - 1}" />, where <MathRenderer math="x \neq 1" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="f^{-1}(x) = \frac{x + 2}{x - 1}, \text{ where } x \neq 1" />
        </div>
      ),
      steps: [
        {
          step: 'Set y = f(x)',
          explanation: (
            <MathRenderer math="y = \frac{x + 2}{x - 1}" />
          ),
        },
        {
          step: 'Solve for x',
          explanation: (
            <div className="space-y-2">
              <MathRenderer display math="y(x - 1) = x + 2" />
              <MathRenderer display math="yx - y = x + 2" />
              <MathRenderer display math="yx - x = y + 2" />
              <MathRenderer display math="x(y - 1) = y + 2" />
              <MathRenderer display math="x = \frac{y + 2}{y - 1}, \text{ where } y \neq 1" />
            </div>
          ),
        },
        {
          step: 'Replace y with x',
          explanation: (
            <MathRenderer math="f^{-1}(x) = \frac{x + 2}{x - 1}, \text{ where } x \neq 1" />
          ),
        },
        {
          step: 'Verify',
          explanation: (
            <MathRenderer math="f^{-1}(f(x)) = f^{-1}\left(\frac{x + 2}{x - 1}\right) = x" />
          ),
        },
      ],
      formula: 'f^{-1}(x) = \\frac{x + 2}{x - 1}, \\quad x \\neq 1',
    },
  ],
}

export default function InverseAndCompositeFunctionsPage() {
  return <DMTopicPage content={content} />
}
