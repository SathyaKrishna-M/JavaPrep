'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiShield, FiAlertTriangle, FiRepeat, FiCheckCircle } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Proof Methods',
  explanationSections: [
    {
      title: '🛡️ Direct Proof',
      icon: <FiShield className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">Direct Proof</span> is the most common form of proof. It assumes that the hypothesis <MathRenderer math="p" /> is true and shows that the conclusion <MathRenderer math="q" /> must also be true.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Structure:</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              <li>Assume <MathRenderer math="p" /> is true.</li>
              <li>Use axioms, definitions, and previously proven theorems.</li>
              <li>Deduce that <MathRenderer math="q" /> is true.</li>
            </ol>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Example:</p>
            <p className="text-gray-300">Prove that if <MathRenderer math="n" /> is an odd integer, then <MathRenderer math="n^2" /> is odd.</p>
            <div className="mt-2 text-gray-300">
              <span className="text-gray-400 italic">Proof:</span> Assume <MathRenderer math="n" /> is odd. Then <MathRenderer math="n = 2k + 1" /> for some integer <MathRenderer math="k" />.
              <div className="my-2 pl-4 border-l-2 border-gray-600">
                <MathRenderer display math="n^2 = (2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1" />
              </div>
              Since <MathRenderer math="2k^2 + 2k" /> is an integer, <MathRenderer math="n^2" /> is odd.
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '⚠️ Proof by Contraposition',
      icon: <FiRepeat className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">Proof by Contraposition</span> is an indirect proof method. To prove <MathRenderer math="p \rightarrow q" />, we prove its contrapositive <MathRenderer math="\neg q \rightarrow \neg p" />.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Logic:</p>
            <MathRenderer display math="p \rightarrow q \equiv \neg q \rightarrow \neg p" />
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Example:</p>
            <p className="text-gray-300">Prove that if <MathRenderer math="3n + 2" /> is odd, then <MathRenderer math="n" /> is odd.</p>
            <div className="mt-2 text-gray-300">
              <span className="text-gray-400 italic">Proof (by Contraposition):</span> Assume <MathRenderer math="n" /> is even (negation of conclusion).
              <p className="mt-1">Then <MathRenderer math="n = 2k" />.</p>
              <div className="my-2 pl-4 border-l-2 border-gray-600">
                <MathRenderer display math="3n + 2 = 3(2k) + 2 = 6k + 2 = 2(3k + 1)" />
              </div>
              <p>This is even, which contradicts the hypothesis that <MathRenderer math="3n + 2" /> is odd? No, we showed that if <MathRenderer math="n" /> is even, then <MathRenderer math="3n+2" /> is even.</p>
              <p className="mt-1">Thus, <MathRenderer math="\neg q \rightarrow \neg p" /> is true, so <MathRenderer math="p \rightarrow q" /> is true.</p>
            </div>
          </div>
        </div>
      ),
      truthTable: {
        title: 'Truth Table: Contrapositive Equivalence',
        headers: ['p', 'q', 'p → q', '¬q', '¬p', '¬q → ¬p'],
        rows: [
          ['T', 'T', 'T', 'F', 'F', 'T'],
          ['T', 'F', 'F', 'T', 'F', 'F'],
          ['F', 'T', 'T', 'F', 'T', 'T'],
          ['F', 'F', 'T', 'T', 'T', 'T'],
        ],
      },
    },
    {
      title: '🚫 Proof by Contradiction',
      icon: <FiAlertTriangle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">Proof by Contradiction</span> (Reductio ad Absurdum) assumes the statement to be proven is false and shows that this assumption leads to a contradiction (a statement that is always false, like <MathRenderer math="1=0" /> or <MathRenderer math="r \land \neg r" />).
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Structure:</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              <li>Assume <MathRenderer math="\neg p" /> is true.</li>
              <li>Derive a contradiction <MathRenderer math="q \land \neg q" />.</li>
              <li>Conclude that <MathRenderer math="\neg p" /> is false, so <MathRenderer math="p" /> must be true.</li>
            </ol>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Example:</p>
            <p className="text-gray-300">Prove that <MathRenderer math="\sqrt{2}" /> is irrational.</p>
            <div className="mt-2 text-gray-300">
              <span className="text-gray-400 italic">Proof:</span> Assume <MathRenderer math="\sqrt{2}" /> is rational. Then <MathRenderer math="\sqrt{2} = a/b" /> where <MathRenderer math="a, b" /> have no common factors.
              <div className="my-2 pl-4 border-l-2 border-gray-600">
                <MathRenderer display math="2 = a^2/b^2 \implies 2b^2 = a^2" />
              </div>
              <p>So <MathRenderer math="a^2" /> is even, implying <MathRenderer math="a" /> is even (<MathRenderer math="a=2k" />).</p>
              <div className="my-2 pl-4 border-l-2 border-gray-600">
                <MathRenderer display math="2b^2 = (2k)^2 = 4k^2 \implies b^2 = 2k^2" />
              </div>
              <p>So <MathRenderer math="b^2" /> is even, implying <MathRenderer math="b" /> is even.</p>
              <p className="text-red-400 mt-2 font-semibold">Contradiction:</p>
              <p><MathRenderer math="a" /> and <MathRenderer math="b" /> have a common factor of 2.</p>
              <p className="mt-1">Thus, <MathRenderer math="\sqrt{2}" /> is irrational.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '✅ Comparison of Methods',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="uppercase tracking-wider border-b-2 border-slate-700">
              <tr>
                <th scope="col" className="px-6 py-4 text-cyan-400">Method</th>
                <th scope="col" className="px-6 py-4 text-cyan-400">Strategy</th>
                <th scope="col" className="px-6 py-4 text-cyan-400">Use When</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="px-6 py-4 font-medium text-white">Direct Proof</td>
                <td className="px-6 py-4 text-slate-300">Assume <MathRenderer math="p" />, derive <MathRenderer math="q" /></td>
                <td className="px-6 py-4 text-slate-300">Direct implication is clear</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-6 py-4 font-medium text-white">Contraposition</td>
                <td className="px-6 py-4 text-slate-300">Assume <MathRenderer math="\neg q" />, derive <MathRenderer math="\neg p" /></td>
                <td className="px-6 py-4 text-slate-300">"Not <MathRenderer math="q" />" gives more info than <MathRenderer math="p" /></td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-6 py-4 font-medium text-white">Contradiction</td>
                <td className="px-6 py-4 text-slate-300">Assume <MathRenderer math="\neg p" />, derive contradiction</td>
                <td className="px-6 py-4 text-slate-300">Proving non-existence or irrationality</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: 'Prove that the sum of two odd integers is even.',
      solution: (
        <div className="space-y-4">
          <p className="text-cyan-400 font-semibold">Direct Proof:</p>
          <p className="text-gray-300">Let <MathRenderer math="m" /> and <MathRenderer math="n" /> be two odd integers.</p>
          <p className="text-gray-300">By definition, <MathRenderer math="m = 2k + 1" /> and <MathRenderer math="n = 2j + 1" /> for some integers <MathRenderer math="k, j" />.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
            <MathRenderer display math="\begin{aligned} m + n &= (2k + 1) + (2j + 1) \\ &= 2k + 2j + 2 \\ &= 2(k + j + 1) \end{aligned}" />
          </div>
          <p className="text-gray-300">Since <MathRenderer math="k + j + 1" /> is an integer, <MathRenderer math="2(k + j + 1)" /> is even.</p>
          <p className="text-green-400">Therefore, the sum of two odd integers is even.</p>
        </div>
      ),
    },
    {
      question: (
        <span>
          Prove that if <MathRenderer math="n^2" /> is even, then <MathRenderer math="n" /> is even.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-cyan-400 font-semibold">Proof by Contraposition:</p>
          <p className="text-gray-300">
            We want to prove <MathRenderer math="p \rightarrow q" /> where <MathRenderer math="p" />: "<MathRenderer math="n^2" /> is even" and <MathRenderer math="q" />: "<MathRenderer math="n" /> is even".
          </p>
          <p className="text-gray-300">
            Contrapositive: <MathRenderer math="\neg q \rightarrow \neg p" /> ("If <MathRenderer math="n" /> is odd, then <MathRenderer math="n^2" /> is odd").
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
            <p className="text-gray-300 mb-2">Assume <MathRenderer math="n" /> is odd.</p>
            <p className="text-gray-300 mb-2">Then <MathRenderer math="n = 2k + 1" />.</p>
            <MathRenderer display math="n^2 = (2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1" />
          </div>
          <p className="text-gray-300">This is in the form <MathRenderer math="2m + 1" />, so <MathRenderer math="n^2" /> is odd.</p>
          <p className="text-green-400">Since we proved the contrapositive, the original statement is true.</p>
        </div>
      ),
    },
    {
      question: 'Prove that there is no largest prime number.',
      solution: (
        <div className="space-y-4">
          <p className="text-cyan-400 font-semibold">Proof by Contradiction:</p>
          <p className="text-gray-300">Assume there is a largest prime number, say <MathRenderer math="P" />.</p>
          <p className="text-gray-300">Let <MathRenderer math="S" /> be the set of all primes <MathRenderer math="\{p_1, p_2, ..., P\}" />.</p>
          <p className="text-gray-300">Consider the number <MathRenderer math="N = (p_1 \times p_2 \times ... \times P) + 1" />.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><MathRenderer math="N" /> is clearly larger than <MathRenderer math="P" />.</li>
              <li><MathRenderer math="N" /> is not divisible by any prime in <MathRenderer math="S" /> (it leaves a remainder of 1 when divided by any <MathRenderer math="p_i" />).</li>
            </ul>
          </div>
          <p className="text-gray-300">Therefore, <MathRenderer math="N" /> is either prime itself or divisible by a prime larger than <MathRenderer math="P" />.</p>
          <p className="text-gray-300">In either case, there exists a prime larger than <MathRenderer math="P" />.</p>
          <p className="text-red-400 font-semibold mt-2">Contradiction!</p>
          <p className="text-gray-300">Our assumption that <MathRenderer math="P" /> is the largest prime is false.</p>
          <p className="text-green-400">Therefore, there is no largest prime number.</p>
        </div>
      ),
    },
  ],
  exampleProblems: [
    {
      problem: 'Prove that for all integers n, if 3n + 2 is even, then n is even.',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">We will use proof by contraposition.</p>
        </div>
      ),
      steps: [
        {
          step: 'State the contrapositive',
          explanation: (
            <span>
              Original: If <MathRenderer math="3n + 2" /> is even (<MathRenderer math="p" />), then <MathRenderer math="n" /> is even (<MathRenderer math="q" />).
              <br />
              Contrapositive: If <MathRenderer math="n" /> is odd (<MathRenderer math="\neg q" />), then <MathRenderer math="3n + 2" /> is odd (<MathRenderer math="\neg p" />).
            </span>
          ),
        },
        {
          step: 'Assume hypothesis of contrapositive',
          explanation: (
            <span>
              Assume <MathRenderer math="n" /> is odd. So <MathRenderer math="n = 2k + 1" /> for some integer <MathRenderer math="k" />.
            </span>
          ),
        },
        {
          step: 'Substitute and simplify',
          explanation: (
            <MathRenderer display math="3n + 2 = 3(2k + 1) + 2 = 6k + 3 + 2 = 6k + 5 = 6k + 4 + 1 = 2(3k + 2) + 1" />
          ),
        },
        {
          step: 'Conclusion',
          explanation: (
            <span>
              <MathRenderer math="2(3k + 2) + 1" /> is an odd integer. Thus, <MathRenderer math="3n + 2" /> is odd. Since the contrapositive is true, the original statement is true.
            </span>
          ),
        },
      ],
    },
  ],
}

export default function ProofMethodsPage() {
  return <DMTopicPage content={content} />
}
