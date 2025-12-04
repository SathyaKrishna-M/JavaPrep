'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiCheckCircle } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Proof as Quantified Statement',
  explanationSections: [
    {
      title: '✅ Understanding Proofs',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">A proof</span> is a valid argument that establishes the truth of a mathematical statement.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Universal Statements:</p>
            <p className="text-gray-300">To prove <MathRenderer math="\forall x P(x)" />, we must show <MathRenderer math="P(x)" /> is true for every x in the domain.</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-amber-300 font-semibold mb-2">Existential Statements:</p>
            <p className="text-gray-300">To prove <MathRenderer math="\exists x P(x)" />, we need to find at least one specific x where <MathRenderer math="P(x)" /> is true.</p>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-lime-300 font-semibold mb-2">Key Principle:</p>
            <p className="text-gray-300">A proof is a demonstration that a statement is always true (for universal) or sometimes true (for existential).</p>
          </div>
        </div>
      ),
    },
    {
      title: '➡️ Direct Proof',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">Direct Proof</span> proves a statement by assuming the premise and showing the conclusion follows.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Structure for <MathRenderer math="\forall x (P(x) \rightarrow Q(x))" />:</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              <li>Assume <MathRenderer math="P(x)" /> is true for arbitrary x</li>
              <li>Show <MathRenderer math="Q(x)" /> must be true</li>
              <li>Conclude <MathRenderer math="\forall x (P(x) \rightarrow Q(x))" /></li>
            </ol>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Example:</p>
            <p className="text-gray-300">Prove: <MathRenderer math="\forall n \in \mathbb{Z} (\text{n is even} \rightarrow n^2 \text{ is even})" /></p>
            <p className="text-cyan-300 mt-2 font-semibold">Proof:</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              <li>Let n be an arbitrary even integer</li>
              <li>Then <MathRenderer math="n = 2k" /> for some integer k</li>
              <li><MathRenderer math="n^2 = (2k)^2 = 4k^2 = 2(2k^2)" /></li>
              <li>Since <MathRenderer math="2k^2" /> is an integer, <MathRenderer math="n^2 = 2(2k^2)" /> is even</li>
              <li>Therefore, if n is even, then <MathRenderer math="n^2" /> is even</li>
            </ol>
          </div>
        </div>
      ),
      formula: '\\forall n \\in \\mathbb{Z} \\, (\\text{even}(n) \\rightarrow \\text{even}(n^2))',
    },
    {
      title: '📋 Proof by Exhaustion',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Proof by Exhaustion</span> (Case Analysis) proves a statement by checking all possible cases.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">When to Use:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Finite number of cases</li>
              <li>Each case can be checked directly</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Example:</p>
            <p className="text-gray-300">Prove: For any integer n, <MathRenderer math="n(n+1)" /> is even</p>
            <p className="text-cyan-300 mt-2 font-semibold">Proof:</p>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-pink-300">Case 1:</span> n is even</p>
              <ul className="list-disc list-inside ml-4">
                <li>Then <MathRenderer math="n = 2k" /> for some k</li>
                <li><MathRenderer math="n(n+1) = 2k(2k+1) = 2[k(2k+1)]" /></li>
                <li>This is even ✓</li>
              </ul>
              <p><span className="text-pink-300">Case 2:</span> n is odd</p>
              <ul className="list-disc list-inside ml-4">
                <li>Then <MathRenderer math="n = 2k+1" /> for some k</li>
                <li><MathRenderer math="n(n+1) = (2k+1)(2k+2) = (2k+1) \cdot 2(k+1) = 2[(2k+1)(k+1)]" /></li>
                <li>This is even ✓</li>
              </ul>
              <p className="text-green-400 mt-2">Since all cases are covered, <MathRenderer math="n(n+1)" /> is always even.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '🔀 Method of Cases',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">Method of Cases</span> divides the proof into mutually exclusive cases that cover all possibilities.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Structure:</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              <li>Identify all possible cases</li>
              <li>Prove statement for each case</li>
              <li>Conclude statement is true in general</li>
            </ol>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Example:</p>
            <p className="text-gray-300">Prove: <MathRenderer math="|x| \ge 0" /> for all real x</p>
            <p className="text-cyan-300 mt-2 font-semibold">Proof:</p>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-pink-300">Case 1:</span> <MathRenderer math="x \ge 0" /></p>
              <ul className="list-disc list-inside ml-4">
                <li>Then <MathRenderer math="|x| = x \ge 0" /> ✓</li>
              </ul>
              <p><span className="text-pink-300">Case 2:</span> <MathRenderer math="x < 0" /></p>
              <ul className="list-disc list-inside ml-4">
                <li>Then <MathRenderer math="|x| = -x > 0" /> (since <MathRenderer math="x < 0" />) ✓</li>
              </ul>
              <p className="text-green-400 mt-2">Therefore, <MathRenderer math="|x| \ge 0" /> for all real x.</p>
            </div>
          </div>
        </div>
      ),
      formula: '\\forall x \\in \\mathbb{R} \\, (|x| \\geq 0)',
    },
    {
      title: '🔨 Constructive Proof',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Constructive Proof</span> for <MathRenderer math="\exists x P(x)" /> finds an explicit example.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Method:</p>
            <p className="text-gray-300">Find a specific value of x that makes <MathRenderer math="P(x)" /> true.</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Example:</p>
            <p className="text-gray-300">Prove: <MathRenderer math="\exists x \in \mathbb{Z} (x^2 = 4)" /></p>
            <p className="text-cyan-300 mt-2 font-semibold">Proof:</p>
            <p className="text-gray-300">Let <MathRenderer math="x = 2" />. Then <MathRenderer math="x^2 = 2^2 = 4" />.</p>
            <p className="text-green-400">Therefore, there exists an integer x such that <MathRenderer math="x^2 = 4" />.</p>
          </div>
        </div>
      ),
      formula: '\\exists x \\in \\mathbb{Z} \\, (x^2 = 4)',
    },
    {
      title: '❓ Non-Constructive Proof',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">Non-Constructive Proof</span> proves existence without finding the specific example.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Method:</p>
            <p className="text-gray-300">Show that the object must exist (often by contradiction or other indirect means).</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Example:</p>
            <p className="text-gray-300">Prove: There exist irrational numbers a and b such that <MathRenderer math="a^b" /> is rational.</p>
            <p className="text-cyan-300 mt-2 font-semibold">Proof:</p>
            <p className="text-gray-300">Consider <MathRenderer math="\sqrt{2}^{\sqrt{2}}" />. Either:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="text-pink-300">Case 1:</span> <MathRenderer math="\sqrt{2}^{\sqrt{2}}" /> is rational → Done (take <MathRenderer math="a = b = \sqrt{2}" />)</li>
              <li><span className="text-pink-300">Case 2:</span> <MathRenderer math="\sqrt{2}^{\sqrt{2}}" /> is irrational → Then <MathRenderer math="(\sqrt{2}^{\sqrt{2}})^{\sqrt{2}} = \sqrt{2}^2 = 2" /> is rational
                <ul className="list-disc list-inside ml-4">
                  <li>Done (take <MathRenderer math="a = \sqrt{2}^{\sqrt{2}}, b = \sqrt{2}" />)</li>
                </ul>
              </li>
            </ul>
            <p className="text-green-400 mt-2">In either case, such numbers exist.</p>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: (
        <span>
          Prove by direct proof: If n is an odd integer, then <MathRenderer math="n^2" /> is odd.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Let n be an arbitrary odd integer.</p>
          <p className="text-gray-300">Then <MathRenderer math="n = 2k + 1" /> for some integer k.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-gray-300"><MathRenderer math="n^2 = (2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1" /></p>
          </div>
          <p className="text-gray-300">Since <MathRenderer math="2k^2 + 2k" /> is an integer, <MathRenderer math="n^2 = 2m + 1" /> for <MathRenderer math="m = 2k^2 + 2k" />.</p>
          <p className="text-green-400 font-semibold">Therefore, <MathRenderer math="n^2" /> is odd.</p>
          <p className="text-gray-300">Since n was arbitrary, if n is odd, then <MathRenderer math="n^2" /> is odd.</p>
        </div>
      ),
      formula: 'n = 2k + 1 \\Rightarrow n^2 = 2(2k^2 + 2k) + 1',
    },
    {
      question: (
        <span>
          Prove by cases: For any integer n, <MathRenderer math="n^2 + n" /> is even.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Case 1: n is even</p>
            <p className="text-gray-300"><MathRenderer math="n = 2k" /> for some integer k</p>
            <p className="text-gray-300"><MathRenderer math="n^2 + n = (2k)^2 + 2k = 4k^2 + 2k = 2(2k^2 + k)" /></p>
            <p className="text-green-400">This is even ✓</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-cyan-300 font-semibold">Case 2: n is odd</p>
            <p className="text-gray-300"><MathRenderer math="n = 2k + 1" /> for some integer k</p>
            <p className="text-gray-300"><MathRenderer math="n^2 + n = (2k + 1)^2 + (2k + 1) = 4k^2 + 4k + 1 + 2k + 1 = 4k^2 + 6k + 2 = 2(2k^2 + 3k + 1)" /></p>
            <p className="text-green-400">This is even ✓</p>
          </div>
          <p className="text-gray-300 mt-2">Since all cases are covered, <MathRenderer math="n^2 + n" /> is always even.</p>
        </div>
      ),
    },
    {
      question: (
        <span>
          Give a constructive proof: There exists an integer x such that <MathRenderer math="x^2 - 5x + 6 = 0" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">We need to find x such that <MathRenderer math="x^2 - 5x + 6 = 0" />.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-gray-300">Factoring: <MathRenderer math="(x - 2)(x - 3) = 0" /></p>
            <p className="text-gray-300">So <MathRenderer math="x = 2" /> or <MathRenderer math="x = 3" /></p>
          </div>
          <p className="text-gray-300">Let <MathRenderer math="x = 2" />. Then:</p>
          <p className="text-gray-300"><MathRenderer math="x^2 - 5x + 6 = 4 - 10 + 6 = 0" /> ✓</p>
          <p className="text-green-400 font-semibold">Therefore, there exists an integer (specifically x = 2) such that <MathRenderer math="x^2 - 5x + 6 = 0" />.</p>
        </div>
      ),
    },
  ],
  exampleProblems: [
    {
      problem: (
        <span>
          Prove: For all integers n, if n is divisible by 6, then n is divisible by 3.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-green-400 font-semibold">If n is divisible by 6, then n is divisible by 3</p>
        </div>
      ),
      steps: [
        {
          step: 'Assume premise',
          explanation: (
            <span>
              Let n be an integer divisible by 6. Then <MathRenderer math="n = 6k" /> for some integer k.
            </span>
          ),
        },
        {
          step: 'Express in terms of 3',
          explanation: (
            <MathRenderer math="n = 6k = 3(2k)" />
          ),
        },
        {
          step: 'Conclude',
          explanation: (
            <span>
              Since 2k is an integer, <MathRenderer math="n = 3(2k)" /> shows n is divisible by 3.
            </span>
          ),
        },
      ],
      formula: '6 \\mid n \\Rightarrow n = 6k = 3(2k) \\Rightarrow 3 \\mid n',
    },
  ],
}

export default function ProofAsQuantifiedStatementPage() {
  return <DMTopicPage content={content} />
}
